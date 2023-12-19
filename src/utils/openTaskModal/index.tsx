/* eslint-disable no-inner-declarations */
import React from 'react';
import './style.module.scss';
import { openModal } from 'Components/openModal';
import { CONFIG } from 'Src/config';
import { actions, getState } from '../../models/redux';
import { request } from '../request';
import Toast from '../Toast';

export function openTaskModal() {
    const close = openModal(<TaskModal close={() => close()} />, {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    return close;
}

class TaskModal extends React.PureComponent<{ close: Function }> {
    state = {
        userInfo: getState('user').userInfo,
    };

    timer: NodeJS.Timeout | null = null;

    componentWillUnmount(): void {
        this.timer && clearInterval(this.timer);
    }

    render() {
        const { userInfo } = this.state;
        const { close } = this.props;
        const bindX = userInfo.isTwitterLinked && !userInfo.isTwitterExpired;
        return (
            <div styleName="modal">
                <img styleName="close" src={require('Assets/close.svg')} onClick={() => close()} />
                <div styleName="title">Unlock Your Parrot NFT L1: Join the Flock!</div>

                <div styleName="main">
                    <div styleName="left">
                        <div styleName={`step${bindX ? '' : ' select'}`}>1</div>
                        <div styleName="bar" style={{ borderLeftStyle: bindX ? 'solid' : 'dashed' }} />
                        <div styleName={`step${bindX ? ' select' : ''}`}>2</div>
                    </div>
                    <div styleName="right">
                        <div styleName="subtitle">Bind Your X Account</div>
                        <div styleName="item" onClick={() => {}}>
                            <div styleName="text">Connect your X account to PARROT</div>
                            <div styleName="hint">
                                * X account is one-to-one with the wallet address and cannot be unbound
                            </div>
                            {bindX ? (
                                <div styleName="user">
                                    <img styleName="border" src={require('Assets/border.png')} alt="" />
                                    <img styleName="img" src={userInfo.profileImageUrl} alt="" />
                                    <div styleName="name">@{userInfo.twitterUserName}</div>
                                </div>
                            ) : (
                                <div
                                    styleName="btn"
                                    style={{ width: 228 }}
                                    onClick={async () => {
                                        const [, res] = await request<{ oauthUrl: string }>({
                                            url: `${CONFIG.API_HOST}/auth/twitter_oauth_link`,
                                        });
                                        if (res) {
                                            window.open(res.oauthUrl, '_blank');
                                            const time = Date.now();
                                            this.timer = setInterval(async () => {
                                                const str = localStorage.getItem(CONFIG.PARROT_BIND_TWITTER);
                                                if (str) {
                                                    const data = JSON.parse(str);
                                                    if (data.time > time) {
                                                        localStorage.setItem(CONFIG.PARROT_BIND_TWITTER, '');
                                                        this.timer && clearInterval(this.timer);
                                                        const [err] = await request<{ oauthUrl: string }>({
                                                            url: `${CONFIG.API_HOST}/auth/bind_twitter`,
                                                            params: { code: data.code, state: data.state },
                                                        });
                                                        if (err) {
                                                            err.message && Toast.show(err.message);
                                                        } else {
                                                            await actions.user.getUserInfo();
                                                            this.setState({ userInfo: getState('user').userInfo });
                                                        }
                                                    }
                                                }
                                            }, 500);
                                        }
                                    }}
                                >
                                    Bind X Account
                                </div>
                            )}
                        </div>

                        <div styleName="subtitle" style={{ marginTop: 36 }}>
                            Repost the Designated Tweet
                        </div>

                        <div styleName="item" onClick={async () => {}}>
                            <div styleName="text">
                                Spread your wings! Repost the specified tweet on your X account to qualify for a free
                                minted Parrot NFT L1.
                            </div>
                            <div style={{ display: 'flex', marginBottom: 32 }}>
                                <div styleName="btn" style={{ width: 113, marginRight: 12 }} onClick={() => {}}>
                                    Repost
                                </div>
                                <div
                                    styleName="btn"
                                    style={{
                                        width: 113,
                                        border: 'none',
                                        background: 'linear-gradient(0deg, #DCDFE2 0%, #DCDFE2 100%)',
                                    }}
                                    onClick={() => {}}
                                >
                                    Verify
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
