'use client';

import classNames from 'classnames';
import { useIsFetching } from '@tanstack/react-query';

import styles from './globalbar.module.scss';

const GlobalLoading = function () {
    const isFetching = useIsFetching();

    if (isFetching > 0) {
        return (
            <div className="w-full h-1 fixed top-0 left-0 right-0 z-50">
                <div
                    className={classNames(
                        'h-full bg-gradient-to-r from-transparent to-primary transition-width ease-in-out duration-300',
                        styles.animate,
                    )}
                />
            </div>
        );
    }
    return '';
};

export default GlobalLoading;
