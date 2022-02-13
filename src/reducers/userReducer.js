import { LOGIN } from '../actions/types';

const initState = {

}

export default (state = initState, actions) => {
    switch(actions.type){
        case LOGIN:
            return;
        default:
            return state;
    }
}