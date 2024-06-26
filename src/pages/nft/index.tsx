/* eslint-disable no-nested-ternary */
import React from 'react';
import './style.module.scss';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { connect } from 'react-redux';
// import { openTaskModal } from 'Src/utils/openTaskModal';
// import { openLoginModal } from 'Src/utils/openLoginModal';
// import { claimSeed } from 'Src/metamask';
import { Loading } from 'Src/components/Loading';
import { withNavigation } from 'Src/utils';
import Phone from './phone';

const mapState = (state: State) => ({
    userInfo: state.user.userInfo,
});

class NFT extends React.PureComponent<ReturnType<typeof mapState>> {
    state = {
        minting: false,
    };

    render() {
        if (window.innerWidth < 500) {
            return <Phone />;
        }
        const { userInfo } = this.props;
        const { minting } = this.state;

        return (
            <div styleName="home" id="wrap">
                <div styleName="bg4">
                    <img src={require('Assets/bg1.png')} styleName="bg4-img" alt="" />
                </div>
                <img src={require('Assets/bg5.png')} styleName="bg5" alt="" />
                <Header />
                <div styleName="wrap">
                    <div styleName="block">
                        <img styleName="nft" src={require('Assets/nft1.png')} alt="" />
                        <div styleName="title" style={{ top: 85 }}>
                            PARROT NFT L1
                        </div>
                        <div styleName="subtitle" style={{ top: 135 }}>
                            <div>Holding 「Parrot NFT - L1」</div>
                            to unlock 5 daily spreading spots and earn
                            <div>$SEED tokens</div>
                            <div style={{ marginTop: 25 }}>
                                {'Free Mint, Open to 3,000 Whitelisted\nParticipants in the Alpha Phase'}
                            </div>
                        </div>
                        {userInfo.level ? (
                            <>
                                <div styleName="btn minted" style={{ top: 360 }}>
                                    You’ve minted it!
                                </div>
                                <div
                                    styleName="openSea"
                                    onClick={() => {
                                        userInfo.passportOpenseaUrl &&
                                            window.open(userInfo.passportOpenseaUrl, '_blank');
                                    }}
                                >
                                    View on OpenSea
                                    <img
                                        style={{ height: 14, marginLeft: 5 }}
                                        src={require('Assets/arrow.svg')}
                                        alt=""
                                    />
                                </div>
                            </>
                        ) : (
                            <img
                                styleName="btn"
                                style={{ top: 380 }}
                                onClick={() => {
                                    Toast.show(`PARROT NFT will be released in the next stage, Beta Phase. 
                                    The top spreaders in the Alpha Phase will be whitelisted and then earn more in creating and spreading!
                                    Stay tuned for more updates!`);
                                    // if (!userInfo.token) {
                                    //     openLoginModal();
                                    //     return;
                                    // }
                                    // openTaskModal();
                                }}
                                // src={require('Assets/task.png')}
                                src={require('Assets/mintsoon.png')}
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
                            <div style={{ marginTop: 20 }}>Free Mint, Open to 150 Whitelisted & Eligible</div>
                            <div>Applicants</div>
                        </div>
                        {userInfo.level! > 1 ? (
                            <div styleName="btn minted" style={{ top: 359 }}>
                                You’ve minted it!
                            </div>
                        ) : minting ? (
                            <div styleName="btn minting" style={{ top: 359 }}>
                                <Loading />
                                Minting...
                            </div>
                        ) : (
                            <img
                                styleName="btn"
                                style={{ top: 359 }}
                                onClick={async () => {
                                    Toast.show(`PARROT NFT will be released in the next stage, Beta Phase. 
                                    The top spreaders in the Alpha Phase will be whitelisted and then earn more in creating and spreading!
                                    Stay tuned for more updates!`);
                                    // if (!userInfo.token) {
                                    //     openLoginModal();
                                    //     return;
                                    // }
                                    // if (!userInfo.level) {
                                    //     openTaskModal();
                                    //     return;
                                    // }
                                    // if (userInfo.l2Eligible) {
                                    //     this.setState({ minting: true });
                                    //     await claimSeed(2);
                                    //     this.setState({ minting: false });
                                    //     return;
                                    // }
                                    // window.open('未提供apply地址', '_blank');
                                }}
                                // src={require('Assets/apply.png')}
                                src={require('Assets/mintsoon.png')}
                            />
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(mapState)(withNavigation(NFT));
