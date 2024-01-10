/* eslint-disable max-classes-per-file */
import React from 'react';
import './phone.module.scss';
import { connect } from 'Src/models/redux';
import Header from 'Components/Header';
import Footer from 'Components/Footer';

const mapState = (state: State) => ({});

class Home extends React.PureComponent<ReturnType<typeof mapState>> {
    render() {
        return (
            <div styleName="home" id="wrap">
                <Header />

                <Footer />
            </div>
        );
    }
}

export default connect(mapState)(Home);
