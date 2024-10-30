'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Alert from 'components/atoms/Alert';
import { fetcherWithOptions } from 'utils/axios';
import { formErrorsHandler } from 'utils/formErrors';
import FormField from './fields/FormField';

const UserProfileForm = function ({ initial, mutate = () => {} }) {
    return (
        <Formik
            initialValues={{
                ...initial,
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Name is required'),
            })}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const toastId = 'prfileToast';
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
                    url: '/api/user/me',
                    method: 'PUT',
                    body: {
                        name: values.name,
                        email: initial.email,
                    },
                };
                fetcherWithOptions(options)
                    .then(() => {
                        actions.setSubmitting(false);
                        toast.update(toastId, {
                            render: 'Your details were successfully updated',
                            type: 'success',
                            isLoading: false,
                        });
                        mutate();
                    })
                    .catch((error) => {
                        actions.setSubmitting(false);
                        formErrorsHandler(error, actions);
                        toast.update(toastId, {
                            render: 'Something went terribly wrong. Please try again',
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
                            id="name"
                            name="name"
                            type="text"
                            label="Your name"
                            placeholder="Enter your name"
                            disabled={isSubmitting}
                            labelSize={4}
                        />
                        <FormField
                            id="email"
                            name="email"
                            type="text"
                            label="Your confirmed email address"
                            placeholder="Email address"
                            disabled
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
                            Update
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default UserProfileForm;
