import React, { useState } from 'react';
import styled from 'styled-components';
import { TextArea, Input, Button } from '@components/UI/atoms';
import { IconButton } from '@components/UI';
// eslint-disable-next-line import/no-named-as-default
import PhoneInput from './PhoneInput';
import { getFields } from './fieldTypes';
import { uis, media, sc } from '@utils';

const CallbackForm = ({
    className,
    header,
    title,
    subheader,
    fields = getFields('name', 'phone'),
    submitLabel = 'Оставить заявку',
    fullWidth,
    defaultComment,
    compact,
    keepHeader,
}) => {
    const [isSuccess, changeSuccess] = useState(false);
    const [isFailed, changeFailed] = useState(false);
    const [values, changeValues] = useState({});
    const [errors, changeErrors] = useState([]);

    const handleChange = fieldName => value => {
        if (errors.includes(fieldName)) changeErrors(errors.filter(n => n !== fieldName));

        changeValues(currentValues => ({
            ...currentValues,
            [fieldName]: value,
        }));
    };

    const handleInputChange = name => e => handleChange(name)(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();

        const errorFields = Object.entries(fields)
            .filter(([fieldName, { required }]) => required && !values[fieldName])
            .map(([name]) => name);

        if (errorFields.length > 0) {
            return changeErrors(errorFields);
        }

        const { name, phone, comment = defaultComment } = values;

        if (process.env.APP_ENV === 'development') {
            return Promise.resolve().then(() => changeSuccess(true));
        }

        return uis
            .send(name, phone, comment)
            .then(() => changeSuccess(true))
            .catch(() => changeFailed(true));
    };

    return (
        <form className={className} onSubmit={handleSubmit} data-compact={compact}>
            {(!isSuccess || keepHeader) &&
                (header || (
                    <header>
                        <h3>{title}</h3>
                        <p>{subheader}</p>
                    </header>
                ))}
            {!isSuccess && (
                <>
                    {Object.entries(fields).map(([name, { type = 'text', placeholder }]) => {
                        switch (type) {
                            case 'textarea':
                                return (
                                    <TextArea
                                        key={name}
                                        placeholder={placeholder}
                                        onChange={handleInputChange(name)}
                                        value={values[name]}
                                    />
                                );
                            case 'tel':
                                return (
                                    <PhoneInput
                                        key={name}
                                        className="phone-input"
                                        hasError={errors.includes(name)}
                                        onChange={handleChange(name)}
                                        value={values[name]}
                                    />
                                );
                            default:
                                return (
                                    <Input
                                        key={name}
                                        hasError={errors.includes(name)}
                                        type={type}
                                        placeholder={placeholder}
                                        onChange={handleInputChange(name)}
                                        value={values[name]}
                                    />
                                );
                        }
                    })}
                    {errors.length > 0 && <p className="error">Не заполнены обязательные поля</p>}
                    {isFailed && <p className="error">При отправке формы позникла ошибка</p>}
                    {!isFailed && (
                        <Button fullWidth={fullWidth} type="submit">
                            {submitLabel}
                        </Button>
                    )}
                    {isFailed && (
                        <IconButton icon="retry" fullWidth onClick={() => changeFailed(false)}>
                            Попробовать ещё
                        </IconButton>
                    )}
                </>
            )}
            {isSuccess && (
                <>
                    <h3>Заявка отправлена</h3>
                    <p className="message">Наш менеджер свяжется с вами в течение рабочего дня с 10 до 20.</p>
                </>
            )}
            {!isSuccess && (
                <footer>
                    Отправляя заявку, вы соглашаетесь с нашей <a href="/privacy">политикой конфиденциальности</a>.
                </footer>
            )}
        </form>
    );
};

export default styled(CallbackForm)`
    /* ${media.xsMax`
        display: none;
    `} */

    > header {
        margin-bottom: 16px;
    }

    footer {
        margin-top: 12px;
    }

    & > input,
    .phone-input,
    textarea {
        margin: 4px 0;
        width: 100%;
    }

    .error {
        text-align: center;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: 0.535714px;

        margin: 4px 0 0;

        color: #f44336;
    }

    h3 {
        margin: 0;
        margin-top: 8px;
        font-weight: 500;
        color: #232323;
        font-size: 24px;
        line-height: 32px;
        font-weight: bold;
        text-align: center;

        ${media.xs`
            margin: 0;
            line-height: 29px;
        `}
    }

    .message {
        margin: 0;
        margin-top: 12px;
        color: #232323;
        font-size: 15px;
        line-height: 24px;
        text-align: center;
        font-weight: 500;

        ${media.xs`
            margin-top: 8px;
            font-size: 16px;
        `}
    }

    > button {
        font-size: 15px;
        font-weight: bold;
        padding: 0 23px;
        margin-top: 12px;
        width: ${sc.ifProp('fullWidth')('100%', 'auto')};
        ${media.xs`
            margin-top: 8px;
        `}
    }

    .retry-button {
        display: inline-flex;
    }

    &[data-compact='true'] button {
        width: auto;
    }
`;
