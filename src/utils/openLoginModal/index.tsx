/* eslint-disable no-inner-declarations */
import React from 'react';
import './style.module.scss';
import { openModal } from 'Components/openModal';
import { signInWithEthereum } from 'Src/metamask';
import { actions, getState } from '../../models/redux';
import { Require, formatAddress } from '..';
import Toast from '../Toast';

export function openLoginModal() {
    const close = openModal(<LoginModal close={() => close()} />, {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    return close;
}

class LoginModal extends React.PureComponent<{ close: Function }> {
    state = {
        userInfo: getState('user').userInfo,
    };

    render() {
        const { userInfo } = this.state;
        const list = [
            {
                text: userInfo.address ? formatAddress(userInfo.address) : 'Connect MetaMask',
                icon: Require('metamask.png'),
                background: 'rgba(248, 157, 53, 0.05)',
                borderColor: 'rgb(248, 157, 53)',
                color: '#562600',
                type: 'metaMask',
                fontSize: userInfo.address ? 14 : 12,
            },
        ] as const;
        const { close } = this.props;

        return (
            <div styleName="modal">
                <img styleName="close" src={Require('close.svg')} onClick={() => close()} />
                <div styleName="title">Please connect your wallet first</div>

                <div
                    styleName="item"
                    style={{
                        color: list[0].color,
                        background: list[0].background,
                        border: `1px solid ${list[0].borderColor}`,
                    }}
                    onClick={() => {
                        if (userInfo.address) {
                            return;
                        }
                        signInWithEthereum().then(async (data) => {
                            if (data.code === 0) {
                                actions.user.setUserInfo(data.data);
                                await actions.user.getUserInfo();
                                close();
                                this.setState({ userInfo: data.data });
                            } else {
                                data.message && Toast.show(data.message);
                            }
                        });
                    }}
                >
                    <img styleName="icon" src={list[0].icon} />
                    <div styleName="text" style={{ fontSize: list[0].fontSize }}>
                        {list[0].text}
                    </div>
                </div>
            </div>
        );
    }
}
