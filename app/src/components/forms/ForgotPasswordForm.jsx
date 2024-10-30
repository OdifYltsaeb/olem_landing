'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Alert from 'components/atoms/Alert';
import { fetcherWithOptions } from 'utils/axios';
import { formErrorsHandler } from 'utils/formErrors';
import FormField from './fields/FormField';

const ForgotPasswordForm = function ({ successCallback = () => {} }) {
    return (
        <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email address').required('Email is required'),
            })}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                fetcherWithOptions({
                    body: values,
                    method: 'POST',
                    url: '/api/user/forgot_password',
                })
                    .then(() => {
                        actions.setSubmitting(false);
                        successCallback();
                    })
                    .catch((error) => {
                        actions.setSubmitting(false);
                        formErrorsHandler(error, actions);
                    })
                    .then(() => {
                        // console.log('clear');
                    });
            }}
        >
            {(props) => {
                const { status, isSubmitting } = props;
                return (
                    <Form>
                        <FormField
                            id="email"
                            name="email"
                            type="text"
                            label="Email"
                            placeholder="Enter email"
                            disabled={isSubmitting}
                            labelSize={4}
                        />

                        {status !== undefined && (
                            <Alert
                                className="mt-3"
                                type={status.color === undefined ? 'info' : status.color}
                                text={status.message}
                            />
                        )}

                        <button type="submit" disabled={isSubmitting} className="btn btn-md btn-block btn-primary my-4">
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ForgotPasswordForm;
