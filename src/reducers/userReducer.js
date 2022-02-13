import { LOGIN } from '../actions/types';

const initState = {
    userInfo:{}
}

export default (state = initState, actions) => {
    switch(actions.type){
        case LOGIN:
            console.log(actions.payload);
            return {...state, userInfo:actions.payload};
        default:
            return state;
    }
}