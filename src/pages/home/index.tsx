/* eslint-disable max-classes-per-file */
import React from 'react';
import './style.module.scss';
import { connect } from 'Src/models/redux';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Toast from 'Src/utils/Toast';
import { withNavigation } from 'Src/utils';
import { NavigateFunction } from 'react-router';
import Phone from './phone';

const mapState = (state: State) => ({});

class Home extends React.PureComponent<ReturnType<typeof mapState> & { navigate: NavigateFunction }> {
    render() {
        if (window.innerWidth < 500) {
            return <Phone navigate={this.props.navigate} />;
        }
        return (
            <div styleName="home" id="wrap">
                <img src={require('Assets/bg1.png')} styleName="bg1" alt="" />
                <img src={require('Assets/bg2.png')} styleName="bg2" alt="" />
                <div styleName="bg3-wrap">
                    <img src={require('Assets/bg3.png')} styleName="bg3" alt="" />
                </div>

                <Header />
                <div styleName="wrap">
                    <div styleName="div1">
                        <div styleName="text1">Web3 Content Social Protocol</div>
                        <div styleName="text2">Let Your Spread Earn! </div>
                        <div
                            styleName="download-btn"
                            onClick={() => {
                                Toast.show('未提供下载地址');
                            }}
                        >
                            <img styleName="chrome" src={require('Assets/chrome.svg')} alt="" />
                            <div>Install Parrot</div>
                            <img styleName="download" src={require('Assets/download.svg')} alt="" />
                        </div>
                        <img styleName="image1" src={require('Assets/image1.png')} alt="" />
                    </div>
                    <div styleName="why">Why PARROT？</div>
                    <div styleName="div-block" style={{ marginTop: 0 }}>
                        <div style={{ marginRight: 100 }}>
                            <div styleName="title">
                                <div>Reshaping</div>
                                <div>Content Creation & Spread</div>
                            </div>
                            <div styleName="subtitle" style={{ paddingRight: 100 }}>
                                In the content domain, the power of spreading is often underrated, despite its massive
                                commercial potential. PARROT is changing the game - don&apos;t miss out on being part of
                                a movement that equally values and rewards both creators and spreaders.
                            </div>
                        </div>
                        <img styleName="image2" src={require('Assets/image2.png')} alt="" />
                    </div>
                    <div styleName="div-block">
                        <img styleName="image2" src={require('Assets/image3.png')} alt="" />
                        <div style={{ marginLeft: 253 }}>
                            <div styleName="title">Dynamic Value Allocation</div>
                            <div styleName="subtitle">
                                The relationship between content creation and spread is fluid and ever-changing.
                                PARROT&apos;s cutting-edge approach dynamically adjusts value distribution - stay ahead
                                in a market that never stands still.
                            </div>
                        </div>
                    </div>
                    <div styleName="div-block">
                        <div style={{ marginRight: 100 }}>
                            <div styleName="title">
                                <div>Smart Investing in</div>
                                <div>Content Spread</div>
                            </div>
                            <div styleName="subtitle" style={{ paddingRight: 80 }}>
                                Content spread is an investment with its own risks and rewards. PARROT uniquely balances
                                these factors, offering a fair system for all. Don&apos;t be left behind in the new era
                                of content economics.
                            </div>
                        </div>
                        <img styleName="image2" src={require('Assets/image4.png')} alt="" />
                    </div>
                    <div styleName="div2">
                        <div styleName="text3">How to earn?</div>
                        <div styleName="text4">You will be rewarded with $SEED tokens by</div>
                        <img styleName="image5" src={require('Assets/image5.png')} alt="" />
                        <img styleName="share" src={require('Assets/share.png')} alt="" />
                        <div styleName="block1" style={{ top: 293 }}>
                            <img styleName="svg1" src={require('Assets/svg1.svg')} alt="" />
                            <div styleName="title1">Creating</div>
                            <div styleName="subtitle1" style={{ paddingRight: 20 }}>
                                <div>
                                    Craft original, engaging content and publish it through the PARROT platform to start
                                    accumulating $SEED tokens.
                                </div>
                                <div>
                                    The more your content resonates and engages, the greater your $SEED token earnings.
                                </div>
                            </div>
                        </div>
                        <div styleName="block1" style={{ top: 618 }}>
                            <img styleName="svg1" src={require('Assets/svg2.svg')} alt="" />
                            <div styleName="title1">Spreading</div>
                            <div styleName="subtitle1" style={{ paddingRight: 10 }}>
                                Amplify the reach of content within the PARROT network by sharing it across your
                                channels and earn $SEED tokens for your spreading efforts. Your influence has power!
                                With PARROT, it also has tangible value.
                            </div>
                        </div>
                    </div>
                </div>
                <div styleName="wrap1">
                    <div styleName="div3">
                        <div styleName="text5">Mint Parrot NFT to join us</div>
                        <div styleName="text6">
                            Secure your role in the PARROT ecosystem by minting an exclusive Parrot NFT
                        </div>
                        <div
                            styleName="mint"
                            onClick={() => {
                                this.props.navigate('/nft');
                            }}
                        >
                            GO TO MINT
                        </div>
                        <img src={require('Assets/image6.png')} styleName="image6" alt="" />
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default connect(mapState)(withNavigation(Home));
