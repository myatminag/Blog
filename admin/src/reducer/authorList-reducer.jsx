export const authorListReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_AUTHOR_LIST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_AUTHOR_LIST":
            return {
                ...state,
                loading: false,
                authorsList: action.payload.authorsList,
                page: action.payload.page,
                pages: action.payload.pages
            }
        case "FAIL_AUTHOR_LIST":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "REQUEST_DELETE_AUTHOR":
            return {
                ...state,
                loadingDelete: true,
                successDelete: false
            }
        case "SUCCESS_DELETE_AUTHOR":
            return {
                ...state,
                loadingDelete: false,
                successDelete: true
            }
        case "FAIL_DELETE_AUTHOR":
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
            return state;
    }
};