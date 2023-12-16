/* eslint-disable react/static-property-placement */
import React, { MouseEvent } from 'react';
import { sleep } from 'Utils/index';
import styles from './style.module.scss';

export interface ModalProps {
    /**
     * 持续时间
     */
    duration?: number;
    /**
     * 遮罩背景的样式
     */
    style?: React.CSSProperties;
    /**
     * 遮罩背景点击事件，返回false弹窗不关闭，返回true弹窗会关闭，优先级比backdropClose高
     */
    onBackdropClick?: (e: MouseEvent<HTMLDivElement>) => boolean;
    /**
     * 弹窗关闭回调
     */
    onHide?: () => void;
    /**
     * 点击遮罩背景是否可关闭弹窗，默认true
     */
    backdropClose?: boolean;
    className?: string;
    children?: any;
    type?: 'fade' | 'right-in';
}

export default class Modal extends React.PureComponent<ModalProps> {
    arr = this.props.type === 'right-in' ? ['left', 'right'] : ['in', 'out'];

    state = {
        animation: this.arr[0],
    };

    timer: number | undefined;

    componentWillUnmount() {
        this.setState = () => {};
    }

    show = () => {
        this.timer && clearTimeout(this.timer);
        this.setState({ animation: this.arr[0] });
    };

    hide = async () => {
        const { duration = 350, onHide } = this.props;
        this.setState({ animation: this.arr[1] });
        await sleep(duration + 50);
        onHide?.();
    };

    onClick = (e: MouseEvent<HTMLDivElement>) => {
        const { onBackdropClick, backdropClose } = this.props;
        if (e.target === e.currentTarget) {
            if (onBackdropClick) {
                if (onBackdropClick(e)) {
                    this.hide();
                }
            } else if (backdropClose) {
                this.hide();
            }
        }
    };

    render() {
        const { children, duration = 350, style, className } = this.props;
        const { animation } = this.state;
        return (
            <div
                onClick={this.onClick}
                style={{
                    animationDuration: `${duration}ms`,
                    ...style,
                }}
                className={`${styles.c} ${styles[animation]} ${className}`}
            >
                {children}
            </div>
        );
    }
}
