'use client';

import React, { useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const backdropClasses =
    'bg-neutral bg-opacity-60 w-full h-full fixed top-0 right-0 bottom-0 left-0 flex flex-column justify-center ' +
    'items-center overflow-y-auto z-50';
const buttonClasses =
    'w-10 h-10 px-2 py-2 absolute top-2.5 right-2.5 hover:text-neutral hover:bg-base-100 rounded-full bg-neutral ' +
    'text-base-100 leading-none z-60 flex justify-center items-center cursor-pointer text-3xl';

const Modal = function ({
    isOpen = false,
    children,
    backdropClassName = backdropClasses,
    wrapClassName = 'bg-base-100 relative rounded-lg w-full md:w-3/4 lg:2/3 xl:1/2 h-screen shadow-xl mr-auto',
    buttonClassName = buttonClasses,
    openClassName = 'block',
    closedClassName = 'hidden',
    onCancel = () => {},
}) {
    const wrapperRef = useRef();
    const backDropClick = (event) => {
        /* avoid modal close when clicking anywhere inside the modal. Only close it when you click on the
                    backdrop */
        if (event.target === wrapperRef.current) {
            onCancel();
        }
    };

    return (
        <div
            className={classNames(backdropClassName, {
                [openClassName]: isOpen,
                [closedClassName]: !isOpen,
            })}
            ref={wrapperRef}
            onClick={backDropClick}
            onKeyUp={backDropClick}
        >
            <div id="modal-wrap" className={wrapClassName} role="dialog">
                <button type="button" onClick={() => onCancel()} className={buttonClassName} aria-label="Close">
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
