import React from 'react';
import './style.module.scss';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { connect } from 'react-redux';

const mapState = (state: State) => ({
    userInfo: state.user.userInfo,
});

class NFT extends React.PureComponent<ReturnType<typeof mapState>> {
    render() {
        const { userInfo } = this.props;
        return (
            <div styleName="home">
                <div styleName="wrap" id="wrap">
                    <div style={{ height: 90, overflow: 'hidden', position: 'absolute', top: 0, width: '100%' }}>
                        <img src={require('Assets/bg1.png')} styleName="bg1" alt="" />
                    </div>

                    <Header />
                    <div styleName="block">
                        <img styleName="nft" src={require('Assets/nft1.png')} alt="" />
                        <div styleName="title">PARROT NFT L1</div>
                        <div styleName="subtitle">
                            <div>Holding 「Parrot NFT - L1」</div>
                            to unlock 5 daily spreading spots and earn
                            <div>$SEED tokens</div>
                        </div>
                        <img
                            styleName="btn"
                            style={{ top: 328 }}
                            src={userInfo.level ? require('Assets/task.png') : require('Assets/task.png')}
                        />
                    </div>
                    <div styleName="line" />
                    <div styleName="block">
                        <img styleName="nft" src={require('Assets/nft2.png')} alt="" />
                        <div styleName="title">PARROT NFT L2</div>
                        <div styleName="subtitle">Free Mint, Open to All</div>
                        <img
                            styleName="btn"
                            style={{ top: 244 }}
                            src={userInfo.level! > 1 ? require('Assets/apply.png') : require('Assets/apply.png')}
                        />
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default connect(mapState)(NFT);
