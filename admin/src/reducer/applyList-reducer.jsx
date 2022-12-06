export const applyListReducer = (state, action) => {
    switch (action.type)  {
        case "REQUEST_APPLY_LIST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_APPLY_LIST":
            return {
                ...state,
                loading: false,
                applyList: action.payload.applyList,
                page: action.payload.page,
                pages: action.payload.pages

            }
        case "FAIL_APPLY_LIST":
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        case "REQUEST_DELETE_APPLY":
            return {
                ...state,
                loadingDelete: true,
                successDelete: false
            }
        case "SUCCESS_DELETE_APPLY":
            return {
                ...state,
                loadingDelete: false,
                successDelete: true
            }
        case "FAIL_DELETE_APPLY":
            return {
                ...state,
                loadingDelete: false,
            }
        case "RESET_DELETE":
            return {
                ...state,
                loadingDelete: false,
                successDelete: false
            }
        default: 
            return state
    }
};