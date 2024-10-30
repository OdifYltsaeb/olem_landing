'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

import FormField from 'components/forms/fields/FormField';
import Alert from 'components/atoms/Alert';
import { fetcherWithOptions } from 'utils/axios';
import { formErrorsHandler } from 'utils/formErrors';

const LoginForm = function () {
    const router = useRouter();
    const queryClient = useQueryClient();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().required('Password is required'),
            })}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const toastId = 'loginToast';
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
                fetcherWithOptions({
                    body: values,
                    method: 'POST',
                    url: '/api/user/login',
                })
                    .then(() => {
                        actions.setSubmitting(false);
                        toast.update(toastId, {
                            render: "You've successfully logged in. Welcome back.",
                            type: 'success',
                            isLoading: false,
                        });
                        queryClient.invalidateQueries({ queryKey: ['userMe'], exact: true, refetchType: 'active' });
                        queryClient.invalidateQueries({ queryKey: ['myTag'], exact: true, refetchType: 'active' });
                        const searchParams = new URLSearchParams(document.location.search);
                        const next = searchParams.get('next');
                        if (next) {
                            router.push(next);
                        } else {
                            router.push('/dashboard');
                        }
                    })
                    .catch((error) => {
                        actions.setSubmitting(false);
                        formErrorsHandler(error, actions);
                        // display errors
                        toast.update(toastId, {
                            render: 'Something went wrong. Please try again',
                            type: 'error',
                            isLoading: false,
                        });
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
                        <FormField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
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
                            Log in
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LoginForm;
