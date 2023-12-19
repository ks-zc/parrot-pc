/* eslint-disable no-nested-ternary */
/* eslint-disable no-inner-declarations */
import React from 'react';
import './style.module.scss';
import { openModal } from 'Components/openModal';
import { CONFIG } from 'Src/config';
import store from 'Models/index';
import { Loading } from 'Src/components/Loading';
import { Provider, actions, connect } from '../../models/redux';
import { request } from '../request';
import Toast from '../Toast';

export function openTaskModal() {
    const close = openModal(
        <Provider store={store}>
            <TaskModal close={() => close()} />
        </Provider>,
        {
            style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        },
    );
    return close;
}

const mapState = (state: State) => ({
    userInfo: state.user.userInfo,
});

const disStyle: React.CSSProperties = {
    cursor: 'not-allowed',
    background: 'linear-gradient(0deg, #DCDFE2 0%, #DCDFE2 100%)',
};

const style: React.CSSProperties = {
    cursor: 'pointer',
    background: 'linear-gradient(266deg, #00ffeb 1.29%, #6a6ffb 101.04%), #fff',
};

class TaskModalC extends React.PureComponent<{ close: Function } & ReturnType<typeof mapState>> {
    timer: NodeJS.Timeout | null = null;

    state = {
        clickRepost: false,
        verifying: false,
        verified: false,
    };

    time = 0;

    componentWillUnmount(): void {
        this.timer && clearInterval(this.timer);
    }

    render() {
        const { close, userInfo } = this.props;
        const { clickRepost, verifying, verified } = this.state;
        const bindX = userInfo.isTwitterLinked && !userInfo.isTwitterExpired;
        const canVerify = !verified && clickRepost && !verifying;
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
                                <div
                                    styleName="btn"
                                    style={{
                                        width: 113,
                                        marginRight: 12,
                                        ...(bindX ? style : disStyle),
                                    }}
                                    onClick={() => {
                                        if (!bindX) {
                                            return;
                                        }
                                        this.setState({ clickRepost: true });
                                        window.open('____________', '_blank');
                                    }}
                                >
                                    Repost
                                </div>
                                <div
                                    styleName="btn"
                                    style={{
                                        width: 113,
                                        ...(canVerify || verified ? style : disStyle),
                                        cursor: verified || !canVerify ? 'not-allowed' : 'pointer',
                                    }}
                                    onClick={() => {
                                        if (canVerify) {
                                            if (Date.now() - this.time < 60000) {
                                                Toast.show('Please try again later');
                                                return;
                                            }
                                            this.setState({ verifying: true });
                                            this.time = Date.now();
                                            setTimeout(() => {
                                                Toast.show('Reposted Successfully');
                                                this.setState({ verifying: false, verified: true });
                                            }, 1000);
                                        }
                                    }}
                                >
                                    {verifying && <Loading />}
                                    {verified && <img styleName="verified" src={require('Assets/verified.svg')} />}
                                    {verified ? 'Verified' : verifying ? 'Verifying' : 'Verify'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const TaskModal = connect(mapState)(TaskModalC);
