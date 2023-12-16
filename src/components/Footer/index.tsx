/* eslint-disable max-classes-per-file */
import React from 'react';
import './style.module.scss';

export default class Footer extends React.PureComponent {
    render() {
        return (
            <div styleName="footer">
                <div styleName="text1">JOIN OUR COMMUNITY</div>
                <div styleName="text2">
                    Join Parrot today and be part of a revolution where creators and spreaders thrive together!
                </div>
                <div styleName="logo">
                    <div styleName="img">
                        <img src={require('Assets/logo.png')} alt="" />
                    </div>
                    @Parrot_buzz
                </div>
            </div>
        );
    }
}
