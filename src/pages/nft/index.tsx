import React from 'react';
import './style.module.scss';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { connect } from 'react-redux';
import { openTaskModal } from 'Src/utils/openTaskModal';
import { openLoginModal } from 'Src/utils/openLoginModal';

const mapState = (state: State) => ({
    userInfo: state.user.userInfo,
});

class NFT extends React.PureComponent<ReturnType<typeof mapState>> {
    render() {
        const { userInfo } = this.props;
        return (
            <div styleName="home">
                <div styleName="wrap" id="wrap">
                    <img src={require('Assets/bg4.png')} styleName="bg4" alt="" />
                    <img src={require('Assets/bg5.png')} styleName="bg5" alt="" />

                    <Header />
                    <div styleName="block">
                        <img styleName="nft" src={require('Assets/nft1.png')} alt="" />
                        <div styleName="title" style={{ top: 95 }}>
                            PARROT NFT L1
                        </div>
                        <div styleName="subtitle" style={{ top: 156 }}>
                            <div>Holding 「Parrot NFT - L1」</div>
                            to unlock 5 daily spreading spots and earn
                            <div>$SEED tokens</div>
                            <div style={{ marginTop: 25 }}>Free Mint, Open to All</div>
                        </div>
                        {userInfo.level ? (
                            <div styleName="btn minted" style={{ top: 360 }}>
                                You’ve minted it!
                            </div>
                        ) : (
                            <img
                                styleName="btn"
                                style={{ top: 360 }}
                                onClick={() => {
                                    if (!userInfo.token) {
                                        openLoginModal();
                                        return;
                                    }
                                    openTaskModal();
                                }}
                                src={require('Assets/task.png')}
                            />
                        )}
                    </div>
                    <div styleName="line" />
                    <div styleName="block">
                        <img styleName="nft" src={require('Assets/nft2.png')} alt="" />
                        <div styleName="title" style={{ top: 61 }}>
                            PARROT NFT L2
                        </div>
                        <div styleName="subtitle" style={{ top: 122 }}>
                            Holding 「Parrot NFT - L2」
                            <div>to unlock 3 Posts & 10 spreading spots daily</div>
                            <div>and earn more $SEED</div>
                            <div style={{ marginTop: 20 }}>Free Mint, Open to Whitelisted & Eligible</div>
                            <div>Applicants</div>
                        </div>
                        {userInfo.level! > 1 ? (
                            <div styleName="btn minted" style={{ top: 359 }}>
                                You’ve minted it!
                            </div>
                        ) : (
                            <img
                                styleName="btn"
                                style={{ top: 359 }}
                                onClick={() => {
                                    if (!userInfo.token) {
                                        openLoginModal();
                                    }
                                }}
                                src={require('Assets/apply.png')}
                            />
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default connect(mapState)(NFT);
