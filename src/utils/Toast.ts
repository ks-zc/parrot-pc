let toast: HTMLDivElement;
let timer1: NodeJS.Timeout;
let timer2: NodeJS.Timeout;
let timer3: NodeJS.Timeout;

export default {
    show: (text?: string, duration?: number) => {
        if (!text) return;

        if (toast) {
            toast.remove?.();
            if (timer1) {
                clearTimeout(timer1);
            }
            if (timer2) {
                clearTimeout(timer2);
            }
            if (timer3) {
                clearTimeout(timer3);
            }
        }
        const isMobile = window.innerWidth < 500;
        toast = document.createElement('div');
        toast.style.zIndex = '11000';
        toast.style.position = 'fixed';
        toast.style.background = 'rgba(0, 0, 0, 0.8)';
        toast.style.bottom = '50%';
        toast.style.color = '#fff';
        toast.style.fontSize = isMobile ? '14px' : '16px';
        toast.style.display = 'flex';
        toast.style.flexDirection = 'column';
        toast.style.visibility = 'hidden';
        toast.style.alignItems = 'center';
        toast.style.justifyContent = 'center';
        // toast.style.whiteSpace = 'nowrap';
        toast.style.padding = isMobile ? '12px 24px' : '15px 34px';
        toast.style.textAlign = 'center';
        toast.style.borderRadius = isMobile ? '5px' : '6px';
        toast.style.transition = 'opacity 0.2s cubic-bezier(.42,0,0.58,1)';
        toast.style.opacity = '0';
        toast.style.fontFamily = 'ABeeZee';
        toast.style.left = '50%';
        toast.style.lineHeight = isMobile ? '20px' : '22px';
        toast.style.minWidth = isMobile ? '250px' : '316px';
        toast.style.minHeight = isMobile ? '70px' : '90px';
        toast.style.transform = 'translateX(-50%)';
        toast.className = 'ks-toast';
        toast.innerHTML = text;

        document.querySelector('body')!.appendChild(toast);
        toast.style.marginBottom = `${-toast.clientHeight / 2}px`;
        toast.style.visibility = 'visible';

        timer1 = setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);

        timer2 = setTimeout(() => {
            toast.style.opacity = '0';
            timer3 = setTimeout(() => {
                toast.remove?.();
            }, 200);
        }, (duration || 5000) - 200);
    },
};
