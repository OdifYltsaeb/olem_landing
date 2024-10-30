import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExclamationCircle,
    faExclamationTriangle,
    faInfoCircle,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

const Alert = function ({ type = 'info', text, className = '' }) {
    const svgs = {
        error: faExclamationCircle,
        warning: faExclamationTriangle,
        info: faInfoCircle,
        success: faCheckCircle,
    };

    const cssClass = {
        error: 'alert-error',
        warning: 'alert-warning',
        info: 'alert-info',
        success: 'alert-success',
    };

    return (
        <div className={classNames('alert', cssClass[type], className)}>
            <div>
                <FontAwesomeIcon icon={svgs[type]} />
                <label className="ml-3">{text}</label>
            </div>
        </div>
    );
};

export default Alert;
