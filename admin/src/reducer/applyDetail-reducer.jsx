export const applyDetailReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_APPLY_DETAIL":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_APPLY_DETAIL":
            return {
                ...state,
                loading: false,
                apply: action.payload
            }
        case "FAIL_APPLY_DETAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    };
};