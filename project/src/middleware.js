import { store } from "./store";

export const asyncMiddleware = store => next => action => {

    const { dispatch } = store;

    if (action.promise && action.promise instanceof Promise) {
        action.promise
            .then(res => {
                dispatch({ type: action.success, payload: res });
            });
    } else {

    };

    return next(action);
};