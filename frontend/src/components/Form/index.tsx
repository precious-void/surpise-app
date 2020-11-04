import React, { ChangeEvent, useState } from 'react';
import './Form.scss';
import Typography from 'components/Typography';
import countries from './counrties';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { SurpriseService } from 'api/surprise-service';
import { IUser, SurpriseResponse } from 'types';

const SurpriseSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too short!').max(50, 'Name is too long!').required('Name is required'),
    birthDate: Yup.date()
        .min(new Date(1900, 1, 1), 'Your date birth must be later than 1900')
        .required('Birth date is required'),
    country: Yup.string().required('Country is required'),
});

interface FormProps {
    setSurprise: (values: SurpriseResponse) => void;
}

const Form: React.FunctionComponent<FormProps> = ({ setSurprise }) => {
    const [errorResponse, setErrorResponse] = useState<string>('');
    const { setFieldValue, handleChange, handleSubmit, values, errors } = useFormik({
        validationSchema: SurpriseSchema,
        initialValues: {
            name: '',
            birthDate: '',
            country: '',
        },
        onSubmit: (values: IUser) => {
            SurpriseService.getSurprise(values)
                .then((res) => {
                    setSurprise(res);
                })
                .catch((err) => setErrorResponse(err.response));
        },
    });

    const nameChange = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
        setFieldValue(name, value.replace(/[^A-Za-z\s]/gi, ''));
    };

    return (
        <form onSubmit={handleSubmit} className="Form">
            <div className="input full-width">
                <Typography size="label" htmlFor="name">
                    Your name
                </Typography>
                <input id="name" name="name" type="text" value={values.name} onChange={nameChange} />
            </div>
            <div className="input full-width">
                <Typography size="label" htmlFor="birth_date">
                    Date of birth
                </Typography>

                <input id="birthDate" name="birthDate" type="date" value={values.birthDate} onChange={handleChange} />
            </div>
            <div className="input full-width">
                <Typography size="label" htmlFor="country">
                    Country
                </Typography>

                <select value={values.country} onChange={handleChange} name="country">
                    <option value="">Select option</option>

                    {countries.map((item) => (
                        <option value={item[0]}>{item[0]}</option>
                    ))}
                </select>
            </div>

            <div className="mt-12 mb-12">
                {Object.values(errors).map((item, i) => (
                    <Typography key={i} size="body2" style={{ color: 'red' }}>
                        {item}
                    </Typography>
                ))}
            </div>

            {errorResponse && (
                <div className="mt-12 mb-12">
                    <Typography size="body2" style={{ color: 'red' }}>
                        {errorResponse}
                    </Typography>
                </div>
            )}

            <button className="button mt-12" type="submit">
                Submit
            </button>
        </form>
    );
};

export default Form;
