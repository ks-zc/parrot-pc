import user from './user';
import common from './common';

import { StatesType, ActionsType, createStore } from './redux';

const store = {
    user,
    common,
};

declare global {
    // eslint-disable-next-line no-undef
    type State = StatesType<typeof store>;
    // eslint-disable-next-line no-undef
    type Actions = ActionsType<typeof store>;
}

export default createStore(store);
