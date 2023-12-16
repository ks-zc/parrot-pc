const host = __PROD__ ? 'https://api.parrot.buzz' : 'https://api.staging.parrot.buzz';

export const CONFIG = {
    TWITTER_CALLBACK: `${host}/auth/twitter_callback`,
    API_HOST: host,
    PARROT_BIND_TWITTER: '__parrot_bind_twitter__',
    PARROT_USER: '__parrot-user__',
    PARROT_USER_FOLLOW: '__parrot-user-follow__',
    PARROT_OPENCONGRATULATIONS: '__parrot-openCongratulations__',
    UPGRADA_MODAL: '__parrot-user-upgrada-modal__',
    WEB_HOME_PAGE: 'https://www.google.com/search?q=Visit+the+Home+page',
    WEB_NFT_PAGE: 'https://www.google.com/search?q=Visit+the+NFT+page',
    RULES_PAGE: 'https://www.google.com/search?q=The+rules+of+content+to+earn',
    UPGRADE_PAGE: 'https://www.google.com/search?q=Go+Upgrade',
    IFRAME_ID: '__parrot-metamask-iframe__',
};
