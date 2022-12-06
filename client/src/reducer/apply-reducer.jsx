export const applyReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_APPLY":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_APPLY":
            return {
                ...state,
                loading: false
            }
        case "FAIL_APPLY":
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
};