'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Alert from 'components/atoms/Alert';
import { fetcherWithOptions } from 'utils/axios';
import { formErrorsHandler } from 'utils/formErrors';
import FormField from './fields/FormField';

const SetPasswordForm = function ({ callback = () => {} }) {
    const initialValues = {
        password: '',
        password2: '',
    };

    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={Yup.object().shape({
                password: Yup.string().required('Enter a new password please'),
                password2: Yup.string().required('Please enter new password again'),
            })}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const toastId = 'passwordToast';
                toast('Please wait...', {
                    position: 'top-right',
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: 'dark',
                    toastId,
                });
                const options = {
                    url: '/api/user/set_password',
                    method: 'POST',
                    body: {
                        ...values,
                    },
                };
                fetcherWithOptions(options)
                    .then(() => {
                        actions.setSubmitting(false);
                        toast.update(toastId, {
                            render: 'Your account is now protected by password',
                            type: 'success',
                            isLoading: false,
                        });
                        actions.resetForm();
                        callback();
                    })
                    .catch((error) => {
                        actions.setSubmitting(false);
                        formErrorsHandler(error, actions);
                        toast.update(toastId, {
                            render: 'Something went wrong. See form for more information.',
                            type: 'error',
                            isLoading: false,
                        });
                    });
            }}
        >
            {(props) => {
                const { status, isSubmitting } = props;
                return (
                    <Form className="form-control">
                        <FormField
                            id="password"
                            name="password"
                            type="password"
                            label="Your new password"
                            placeholder="Enter your new password"
                            disabled={isSubmitting}
                            labelSize={4}
                        />
                        <FormField
                            id="password2"
                            name="password2"
                            type="password"
                            label="Your new password (again)"
                            placeholder="Enter your existing password (again)"
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

                        <button type="submit" disabled={isSubmitting} className="btn btn-md btn-block btn-primary my-3">
                            Set password for your account
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default SetPasswordForm;
