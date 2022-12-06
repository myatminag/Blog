export const SummaryReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_SUMMARY_DATA":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_SUMMARY_DATA":
            return {
                ...state,
                loading: false,
                summary: action.payload
            }
        case "FAIL_SUMMARY_DATA":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};