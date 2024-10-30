import classNames from 'classnames';

import styles from './loader.module.scss';

const BarsLoader = function ({ size }) {
    return (
        <div className={classNames(styles.bars, styles[size])}>
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
        </div>
    );
};

export default BarsLoader;
