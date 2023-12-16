import { createRoot } from 'react-dom/client';
import React from 'react';

/**
 * 将react组件渲染到dom中
 */
export default function addJSXTo(fn: (remove: Function) => React.ReactNode, where: Element = document.body) {
    let remove = () => {};
    if (where) {
        const div = document.createElement('div');
        where.insertAdjacentElement('beforeend', div);

        remove = () => div.remove();

        createRoot(div).render(fn(remove) as any);
    }
    return remove;
}
