import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pop } from 'cem/actions/toastr';
import { sendError } from 'cem/actions/bugsnag';

import recursiveCleanUp from 'cem/helpers/recursiveCleanUp';

import { validationErrorCodes } from 'core/constants/errors';
import { composeErrorMessage } from 'core/helpers/errors';

import set from 'lodash/set';

const pickActions = dispatch => ({
  validatorActions: bindActionCreators({ pop, sendError }, dispatch),
});

const submitValidator = (settings = { fieldsRemapping: {} }) => FormComponent =>
  connect(
    () => ({}),
    pickActions,
  )(
    class extends Component {
      /**
       * Calls 'handleSubmit' with async API validation hook.
       *
       * @param {Function} apiAction Fullfilled promise as the result of an API action.
       * @param {Function} onSuccess Callback that is called if API response succeeded (doesn't contain errors).
       * @param {Function} onFail Callback that is called if API response failed (contains errors).
       * @param {Boolean} doPreValidate ?
       *
       * @returns {Function} The result of a call to original 'handleSubmit' from 'redux-form'.
       */
      handleSubmitWithValidation(
        apiAction,
        onSuccess,
        onFail,
        doPreValidate = true,
      ) {
        return event => {
          if (event && typeof preventDefault === 'function')
            event.preventDefault();
          if (
            Object.keys(recursiveCleanUp(this.props.errors)).length &&
            doPreValidate
          ) {
            console.log(this.props.errors); // eslint-disable-line no-console
            this.props.validatorActions.pop(
              'error',
              'Проверьте обязательные поля',
            );
          }
          const handleResponse = (values, dispatch) =>
            new Promise((resolve, reject) => {
              // Returning a promise in order to reject in case server errors are returned
              apiAction(values, dispatch).then((response = {}) => {
                if (!response.errors) {
                  resolve();
                  if (typeof onSuccess === 'function') onSuccess(response);
                } else {
                  const errors = {};

                  response.errors.every(error => {
                    const errorParam =
                      settings.fieldsRemapping[error.param] || error.param;
                    const isValidationError =
                      validationErrorCodes.indexOf(error.code) > -1;

                    const errorMessage = composeErrorMessage(error);

                    if (!isValidationError) {
                      this.props.validatorActions.pop(
                        'error',
                        'Возникла критическая ошибка, обратитесь в чат',
                        errorMessage,
                      );
                      this.props.validatorActions.sendError(
                        'CriticalError',
                        `${error.code}: ${errorMessage}`,
                      );
                      return false;
                    }

                    set(errors, errorParam, errorMessage);
                    return true;
                  });

                  // TODO Avoid showing this message (as it duplicates the message from client validation)
                  if (Object.keys(errors).length) {
                    this.props.validatorActions.pop(
                      'error',
                      'Проверьте обязательные поля',
                    );
                  }

                  if (typeof onFail === 'function') onFail(response);
                  if (doPreValidate) reject(errors);
                }
              });
            });
          if (doPreValidate) this.props.handleSubmit(handleResponse)(event);
          if (!doPreValidate) handleResponse();
        };
      }

      render() {
        const { handleSubmit, validatorActions, ...restProps } = this.props; // eslint-disable-line no-unused-vars
        return (
          <FormComponent
            handleSubmit={::this.handleSubmitWithValidation}
            {...restProps}
          />
        );
      }
    },
  );

export const validatorShortcut = (
  reduxFormSettings,
  validatorSettings,
) => component =>
  reduxForm(reduxFormSettings)(submitValidator(validatorSettings)(component));

export default submitValidator;

/*
  Usage guide:
    1. Locate the component wrapped by 'redux-form' and insert 'submitValidator' between 'em:
      ```
      reduxForm(formSettings)(submitValidator()(MyComponent))
      ```

    2. Find out the function that is passed to 'handleSubmit' used within your form component and return an API related promise from it.
    E.g., in the following example such a function is `updateForm`:

      ```
      updateForm() {
       return this.props.actions.updateSomething();
      }

      <Form.Container onSubmit={handleSubmit(::this.updateForm)}>
       // ...
      </Form.Container>
      ```

    3. Optionally include 'onSuccess' and 'onFail' callback functions, to do something upon validation:

      ```
      updateForm() {
        return this.props.actions.updateSomething();
      }

      onSubmitSuccess(apiResponse) {
        // ...
      }

      onSubmitFail(apiResponse) {
        // ...
      }

      <Form.Container onSubmit={handleSubmit(::this.updateForm, ::this.onSubmitSuccess, ::this.onSubmitFail)}>
       // ...
      </Form.Container>
      ```
 */
