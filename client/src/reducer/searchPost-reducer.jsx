export const searchPostReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_POST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_POST":
            return {
                ...state,
                loading: false,
                page: action.payload.page,
                pages: action.payload.pages,
                posts: action.payload.posts,
                countPosts: action.payload.countPosts
            }
        case "FAIL_POST":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};