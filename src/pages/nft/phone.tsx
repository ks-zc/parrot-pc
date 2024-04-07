/* eslint-disable no-nested-ternary */
import React from 'react';
import './phone.module.scss';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { connect } from 'react-redux';
// import { openTaskModal } from 'Src/utils/openTaskModal';
// import { openLoginModal } from 'Src/utils/openLoginModal';
// import { claimSeed } from 'Src/metamask';
import { Loading } from 'Src/components/Loading';
import { withNavigation } from 'Src/utils';
import Toast from 'Src/utils/Toast';

const mapState = (state: State) => ({
    userInfo: state.user.userInfo,
});

class NFT extends React.PureComponent<ReturnType<typeof mapState>> {
    state = {
        minting: false,
    };

    render() {
        const { userInfo } = this.props;
        const { minting } = this.state;

        return (
            <div styleName="home">
                <div styleName="bg12">
                    <img src={require('Assets/bg11.png')} styleName="bg2" alt="" />
                </div>
                <img src={require('Assets/bg111.png')} styleName="bg1" alt="" />
                <Header />
                <div styleName="wrap" id="wrap">
                    <div styleName="block">
                        <img styleName="nft" src={require('Assets/nft1.png')} alt="" />
                        <div styleName="title" style={{ top: 95 }}>
                            PARROT NFT L1
                        </div>
                        <div styleName="subtitle" style={{ top: 156 }}>
                            <div>Holding 「Parrot NFT - L1」</div>
                            to unlock 5 daily spreading spots and earn
                            <div>$SEED tokens</div>
                            <div styleName="text1">
                                {'Free Mint, Open to 3,000 Whitelisted\nParticipants in the Alpha Phase'}
                            </div>
                        </div>
                        {userInfo.level ? (
                            <>
                                <div styleName="btn minted">You’ve minted it!</div>
                                <div
                                    styleName="openSea"
                                    onClick={() => {
                                        Toast.show('未提供View on OpenSea地址');
                                    }}
                                >
                                    View on OpenSea
                                    <img styleName="arrow" src={require('Assets/arrow.svg')} alt="" />
                                </div>
                            </>
                        ) : (
                            <img
                                styleName="btn"
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
                        <div styleName="title">PARROT NFT L2</div>
                        <div styleName="subtitle">
                            Holding 「Parrot NFT - L2」
                            <div>to unlock 3 Posts & 10 spreading spots daily</div>
                            <div>and earn more $SEED</div>
                            <div styleName="text1">Free Mint, Open to 150 Whitelisted & Eligible</div>
                            <div>Applicants</div>
                        </div>
                        {userInfo.level! > 1 ? (
                            <div styleName="btn minted">You’ve minted it!</div>
                        ) : minting ? (
                            <div styleName="btn minting">
                                <Loading />
                                Minting...
                            </div>
                        ) : (
                            <img
                                styleName="btn"
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
