'use client';

import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import FormField from 'components/forms/fields/FormField';
import Alert from 'components/atoms/Alert';
import { fetcherWithOptions } from 'utils/axios';

const LandingContactForm = function () {
    const states = ['clear', 'submitting', 'submitted', 'error'];
    const [formState, setFormState] = useState(states[0]);

    const reset = () => {
        setFormState(states[0]);
    };

    const form = (
        <Formik
            initialValues={{
                email: '',
                name: '',
                comments: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                name: Yup.string().required('Password is required'),
                comments: Yup.string(),
            })}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                setFormState('submitting');
                fetcherWithOptions({
                    body: values,
                    method: 'POST',
                    url: '/api/airtable/subscribe',
                })
                    .then(() => {
                        actions.setSubmitting(false);
                        setFormState('submitted');
                    })
                    .catch(() => {
                        actions.setSubmitting(false);
                        setFormState('error');
                    })
                    .then(() => {
                        // console.log('clear');
                    });
            }}
        >
            {(props) => {
                const { status, isSubmitting } = props;
                return (
                    <Form className="card-body">
                        <FormField
                            id="email"
                            name="email"
                            type="text"
                            label="Email"
                            placeholder="Enter email"
                            disabled={isSubmitting}
                            labelSize="normal"
                        />
                        <FormField
                            id="name"
                            name="name"
                            type="input"
                            label="Name"
                            placeholder="Name"
                            disabled={isSubmitting}
                            labelSize="normal"
                        />
                        <FormField
                            id="comments"
                            name="comments"
                            type="textarea"
                            label="Comments"
                            placeholder="Comment on other issues you might have had"
                            disabled={isSubmitting}
                            labelSize="normal"
                            inputClasses="h-24"
                        />

                        {status !== undefined && (
                            <Alert
                                className="mt-3"
                                type={status.color === undefined ? 'info' : status.color}
                                text={status.message}
                            />
                        )}

                        <button type="submit" disabled={isSubmitting} className="btn btn-md btn-block btn-primary my-4">
                            Subscribe
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );

    if (formState === 'clear') {
        return form;
    }
    if (formState === 'submitting') {
        return (
            <div className="relative">
                <div className="opacity-25">{form}</div>
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <span className="loading loading-infinity loading-lg" />
                </div>
            </div>
        );
    }
    if (formState === 'submitted') {
        return (
            <div className="p-4 text-center">
                <h3 className="text-4xl mb-4 lg:mb-8">Thank you!</h3>
                <p className="mb-4 lg:mb-8">We appreciate your interest</p>
                <p>
                    If you want to submit another person, then please click&nbsp;
                    <button type="button" aria-label="reset form" className="btn btn-secondary" onClick={reset}>
                        this button
                    </button>
                    &nbsp; to reset the form
                </p>
            </div>
        );
    }
    return (
        <div className="p-4 text-center">
            <h3 className="text-4xl mb-4 lg:mb-8">Error!</h3>
            <p className="mb-4 lg:mb-8">We appreciate your interest</p>
            <p>But if you&apos;re seeing this, then somethiong has gone wrong.</p>
            <p>
                <strong>Sorry!</strong>
            </p>
            <p>
                To try and fix things, click&nbsp;
                <button type="button" aria-label="reset form" className="btn btn-error" onClick={reset}>
                    this button
                </button>
                &nbsp;to reset the form
            </p>
        </div>
    );
};

export default LandingContactForm;
