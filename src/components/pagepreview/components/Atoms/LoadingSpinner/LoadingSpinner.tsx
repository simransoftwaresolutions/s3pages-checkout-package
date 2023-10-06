import React from 'react';
import styles from '../../../../../styles/pagepreview/LoadingSpinner.module.css';

const LoadingSpinner:React.FC = () => {
    return (
        <div className={styles.loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoadingSpinner;