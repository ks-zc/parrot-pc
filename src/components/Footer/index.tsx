/* eslint-disable max-classes-per-file */
import React from 'react';
import './style.module.scss';
import { CONFIG } from 'Src/config';
import Toast from 'Src/utils/Toast';
import Phone from './phone';

export default class Footer extends React.PureComponent {
    render() {
        if (window.innerWidth < 500) {
            return <Phone />;
        }
        return (
            <div styleName="wrap">
                <div styleName="footer">
                    <div styleName="left">
                        <div styleName="text1">JOIN OUR COMMUNITY</div>
                        <div styleName="text2">
                            Join Parrot today and be part of a revolution where creators and spreaders thrive together!
                        </div>
                    </div>

                    <div styleName="right">
                        <div
                            styleName="logo"
                            onClick={() => {
                                window.open(CONFIG.TWITTER, '_blank');
                            }}
                        >
                            <div styleName="img">
                                <img src={require('Assets/logo.png')} alt="" />
                            </div>
                            @Parrot_buzz
                        </div>
                        <img
                            src={require('Assets/logos_telegram.png')}
                            styleName="logos_telegram"
                            onClick={() => {
                                Toast.show('telegram地址未提供');
                                // window.open(CONFIG.TWITTER, '_blank');
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
