'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Alert from 'components/atoms/Alert';
import { fetcherWithOptions } from 'utils/axios';
import { formErrorsHandler } from 'utils/formErrors';
import FormField from './fields/FormField';

const RecoverPasswordForm = function ({ uidkey }) {
    const router = useRouter();
    const initialValues = {
        password: '',
        password_confirm: '',
    };

    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={Yup.object().shape({
                password: Yup.string().required('Enter a new password please'),
                password_confirm: Yup.string().required('Please enter new password again'),
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
                    url: '/api/user/forgot_password/token',
                    method: 'POST',
                    body: {
                        ...values,
                        uid_and_token_b64: uidkey,
                    },
                };
                fetcherWithOptions(options)
                    .then(() => {
                        actions.setSubmitting(false);
                        toast.update(toastId, {
                            render: 'Your password was successfully updated. You can now log in with it',
                            type: 'success',
                            isLoading: false,
                        });
                        actions.resetForm();
                        router.push('/login');
                    })
                    .catch((error) => {
                        actions.setSubmitting(false);
                        formErrorsHandler(error, actions);
                        const {
                            response: { data },
                        } = error;
                        actions.setStatus({
                            message: `${data.errors?.uid_and_token_b64}`,
                        });
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
                            id="password_confirm"
                            name="password_confirm"
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
                            Set the new password
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RecoverPasswordForm;
