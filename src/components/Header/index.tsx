/* eslint-disable max-classes-per-file */
import React from 'react';
import './style.module.scss';
import { formatAddress, formatNum } from 'Src/utils';
import { openModal } from 'Src/components/openModal';
import { Provider, actions, connect } from 'Src/models/redux';
import store from 'Models/index';
import { openLoginModal } from 'Src/utils/openLoginModal';
import { connectMainNet } from 'Src/metamask';

const mapState = (state: State) => ({
    userInfo: state.user.userInfo,
    mainnetIsConnect: state.user.mainnetIsConnect,
});

class Header extends React.PureComponent<ReturnType<typeof mapState>> {
    render() {
        const { userInfo, mainnetIsConnect } = this.props;
        return (
            <div styleName="header">
                <img styleName="parrot" src={require('Assets/parrot.png')} alt="" />
                <div styleName="btns">
                    <div styleName="btn">Launchpad</div>
                    <div styleName="btn">🔥Freemint</div>
                    <div styleName="btn">X (Twitter)</div>
                    <div styleName="btn">Whitepaper</div>
                </div>

                <div styleName="right">
                    {userInfo.address ? (
                        <div styleName="account">
                            <div styleName="balance">
                                <img src={require('Assets/balance.svg')} styleName="icon" />
                                {formatNum(userInfo.availableSeeds || 0)}
                            </div>

                            <div
                                styleName="network"
                                onClick={() => {
                                    class A extends React.PureComponent<{ mainnetIsConnect: boolean }> {
                                        render() {
                                            return (
                                                <div
                                                    styleName="mainnet"
                                                    onClick={() => {
                                                        if (!this.props.mainnetIsConnect) {
                                                            connectMainNet();
                                                        }
                                                    }}
                                                >
                                                    <img styleName="icon2" src={require('Assets/network.svg')} />
                                                    Ethereum
                                                    {this.props.mainnetIsConnect && (
                                                        <img styleName="right-cion" src={require('Assets/right.svg')} />
                                                    )}
                                                </div>
                                            );
                                        }
                                    }
                                    const B = connect((state: State) => ({
                                        mainnetIsConnect: state.user.mainnetIsConnect,
                                    }))(A);
                                    openModal(
                                        <Provider store={store}>
                                            <B />
                                        </Provider>,
                                        {
                                            style: {
                                                backgroundColor: 'transparent',
                                            },
                                            backdropClose: true,
                                            where: document.querySelector('#wrap')!,
                                        },
                                    );
                                }}
                            >
                                <img
                                    styleName="icon1"
                                    src={
                                        mainnetIsConnect
                                            ? require('Assets/network.svg')
                                            : require('Assets/nonetwork.svg')
                                    }
                                />
                                <img styleName="arrow1" src={require('Assets/arrow1.svg')} />
                                {mainnetIsConnect || <div styleName="hint">The current network is not supported.</div>}
                            </div>

                            <div
                                styleName="id"
                                onClick={() => {
                                    if (!userInfo.isTwitterLinked || userInfo.isTwitterExpired) {
                                        openLoginModal();
                                    } else {
                                        const close1 = openModal(
                                            <div
                                                styleName="logout"
                                                style={{
                                                    backgroundImage: `url(${require('Assets/logout-wrap.svg')})`,
                                                }}
                                                onClick={() => {
                                                    close1();
                                                    const close = openModal(
                                                        <div styleName="logout-confirm">
                                                            <div styleName="text1">Log out of Parrot?</div>
                                                            <div styleName="text2">@{userInfo.twitterUserName}</div>
                                                            <div styleName="btns">
                                                                <div
                                                                    styleName="btn cancel"
                                                                    onClick={() => {
                                                                        close();
                                                                    }}
                                                                >
                                                                    Cancle
                                                                </div>
                                                                <div
                                                                    styleName="btn confirm"
                                                                    onClick={() => {
                                                                        actions.user.logout();
                                                                        close();
                                                                    }}
                                                                >
                                                                    Confirm
                                                                </div>
                                                            </div>
                                                        </div>,
                                                        {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            },
                                                            where: document.querySelector('#wrap')!,
                                                        },
                                                    );
                                                }}
                                            >
                                                <img src={require('Assets/logout.svg')} styleName="logout-icon" />
                                                disconnect
                                            </div>,
                                            {
                                                style: {
                                                    backgroundColor: 'transparent',
                                                },
                                                backdropClose: true,
                                                where: document.querySelector('#wrap')!,
                                            },
                                        );
                                    }
                                }}
                            >
                                <img src={require('Assets/avatar.svg')} styleName="icon" />
                                {formatAddress(userInfo.address)}
                            </div>
                        </div>
                    ) : (
                        <div
                            styleName="login"
                            onClick={() => {
                                openLoginModal();
                            }}
                        >
                            Login
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapState)(Header);
