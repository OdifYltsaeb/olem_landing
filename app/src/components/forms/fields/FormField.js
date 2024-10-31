/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect, getIn } from 'formik';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

const FormField = function ({
    name,
    label,
    formik,
    check,
    labelSize,
    labelClasses,
    wrapClasses,
    errorClasses,
    onChange = () => {},
    ...props
}) {
    const error = getIn(formik.errors, name, null);
    const value = getIn(formik.values, name, undefined);
    const touched = getIn(formik.touched, name, false);
    const { inputClasses, type, reactRef, ...otherProps } = props;

    let input = (
        <input
            {...otherProps}
            type={type}
            name={name}
            value={value}
            ref={reactRef}
            touched={`${touched}`}
            onChange={(e) => {
                formik.handleChange(e);
                onChange(e);
            }}
            onBlur={formik.handleBlur}
            className={classNames(inputClasses, 'input input-bordered', {
                'input-error': !!(touched && error),
            })}
        />
    );
    if (type === 'textarea') {
        input = (
            <textarea
                {...otherProps}
                name={name}
                value={value || ''}
                touched={`${touched}`}
                onChange={(e) => {
                    formik.handleChange(e);
                    onChange(e);
                }}
                onBlur={formik.handleBlur}
                className={classNames(inputClasses, 'textarea textarea-bordered', {
                    'input-error': !!(touched && error),
                })}
            />
        );
    }

    if (type === 'toggle') {
        input = (
            <input
                {...otherProps}
                type="checkbox"
                name={name}
                touched={`${touched}`}
                onChange={(e) => {
                    formik.handleChange(e);
                    onChange(e);
                }}
                onBlur={formik.handleBlur}
                className={classNames(inputClasses, 'toggle toggle-success', {
                    'input-error': !!(touched && error),
                })}
                checked={value === true}
            />
        );
    }

    if (type === 'select') {
        const { options, placeholder } = props;
        input = (
            <select
                name={name}
                value={value || ''}
                touched={`${touched}`}
                onChange={(e) => {
                    formik.handleChange(e);
                    onChange(e);
                }}
                onBlur={formik.handleBlur}
                className={classNames(inputClasses, 'select select-bordered', {
                    'input-error': !!(touched && error),
                })}
            >
                <option value="" label={placeholder || 'Select an option'} />
                {options.map((option) => (
                    <option key={`option-${option.value}`} value={option.value} label={option.label} />
                ))}
            </select>
        );
    }

    const inputComponent = (
        <>
            {input}
            {touched && error ? (
                <p className={twMerge('text-xs italic text-error mt-2', errorClasses)}>{formik.errors[name]}</p>
            ) : null}
        </>
    );

    let labelComponent = null;
    if (label) {
        labelComponent = (
            <label
                htmlFor={props.id || name}
                className={twMerge(classNames('label', labelClasses, `text-${labelSize}`, { 'cursor-pointer': check }))}
            >
                {label}
            </label>
        );
    }

    return (
        <div
            className={twMerge(classNames('flex flex-col mt-3', wrapClasses, { hidden: type === 'hidden' }))}
            key={`field-${name}`}
        >
            {labelComponent}
            {inputComponent}
        </div>
    );
};

export default connect(FormField);
