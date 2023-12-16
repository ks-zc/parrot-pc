import React from 'react';
import addJSXTo from './addJSXTo';
import Modal, { ModalProps } from './modal';

export function openModal(node: React.ReactNode, options?: ModalProps) {
    const ref = React.createRef<Modal>();
    addJSXTo((remove) => {
        return (
            <Modal
                {...options}
                onHide={() => {
                    options?.onHide?.();
                    remove();
                }}
                ref={ref}
            >
                {node}
            </Modal>
        );
    });
    return () => {
        ref.current?.hide();
    };
}
