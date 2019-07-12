import React, { useState } from 'react';
import styled from 'styled-components';
import { TextArea, Input, Button, Icon } from '@components/UI';
import PhoneInput from './PhoneInput';
import { uis, media } from '@utils';

const CallbackForm = ({ className, header, fields, submitLabel, fullWidth, defaultComment, compact }) => {
    const [isSuccess, changeSuccess] = useState(false);
    const [isFailed, changeFailed] = useState(false);
    const [values, changeValues] = useState({});
    const [errors, changeErrors] = useState([]);

    const handleChange = fieldName => value =>
        changeValues(currentValues => ({
            ...currentValues,
            [fieldName]: value,
        }));

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
            {!isSuccess && (
                <>
                    {header}
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
                        <Button fullWidth={fullWidth} onClick={() => changeFailed(false)}>
                            <Icon name="retry" />
                            Попробовать еще
                        </Button>
                    )}
                </>
            )}
            {isSuccess && (
                <>
                    <h3>Заявка отправлена</h3>
                    <p className="message">Наш менеджер свяжется с вами в течение рабочего дня с 11 до 18.</p>
                </>
            )}
        </form>
    );
};

export default styled(CallbackForm)`
    display: flex;
    flex-direction: column;

    header {
        margin-bottom: 16px;
    }

    footer {
        margin-top: 12px;
    }

    & > ${Input}, ${PhoneInput} {
        margin: 4px 0;
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

    ${Button} {
        font-size: 15px;
        font-weight: bold;
        padding: 21px 0 17px;
        margin-top: 12px;
        ${media.xs`
            margin-top: 8px;
        `}
    }
`;
