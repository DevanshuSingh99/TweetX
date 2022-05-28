import {LOG_IN, MY_POSTS, FEED_POSTS, ALL_USERS, RESET, USER_FOLLOW, USER_UNFOLLOW} from "./actions";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOG_IN:
            return {...state, user: action.payload};
        case ALL_USERS:
            return {...state, allUsers: action.payload};
        case USER_FOLLOW:
            return {...state, user: action.payload};
        case USER_UNFOLLOW:
            return {...state, user: action.payload};
        case RESET:
            return {};
        default:
            return state;
    }
};

export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case FEED_POSTS:
            return {...state, feedPosts: action.payload};
        case MY_POSTS:
            return {...state, myPosts: action.payload};

        default:
            return state;
    }
};
