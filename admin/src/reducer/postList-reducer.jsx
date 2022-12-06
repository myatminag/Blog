export const PostListReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_POST_LIST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_POST_LIST":
            return {
                ...state,
                loading: false,
                postList: action.payload.postList,
                page: action.payload.page,
                pages: action.payload.pages
            }
        case "FAIL_POST_LIST":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "REQUEST_CREATE_POST":
            return {
                ...state,
                loadingWrite: true
            }
        case "SUCCESS_CREATE_POST":
            return {
                ...state,
                loadingWrite: true
            }
        case "FAIL_CREATE_POST":
            return {
                ...state,
                loadingWrite: false
            }
        case "REQUEST_DELETE_POST":
            return {
                ...state,
                loadingDelete: true,
                successDelete: false
            }
        case "SUCCESS_DELETE_POST":
            return {
                ...state,
                loadingDelete: false,
                successDelete: true
            }
        case "FAIL_DELETE_POST":
            return {
                ...state,
                loadingDelete: false,
                successDelete: false
            }
        case "RESET_DELETE_POST":
            return {
                ...state,
                loadingDelete: false,
                successDelete: false
            }
        default:
            return state;
    }
}