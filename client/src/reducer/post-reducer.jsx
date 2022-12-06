export const postReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_FETCHING_POST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_FETCHING_POST":
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case "FAIL_FETCHING_POST":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};