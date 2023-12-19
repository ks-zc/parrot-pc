import React from 'react';
import './style.module.scss';

export function Loading() {
    return (
        <img
            styleName="loading"
            style={{
                animation: 'rotate 4s infinite linear',
            }}
            src={require('Assets/loading.svg')}
        />
    );
}
