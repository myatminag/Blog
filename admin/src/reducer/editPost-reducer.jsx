export const editPostReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_EDIT_POST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_EDIT_POST":
            return {
                ...state,
                loading: false
            }
        case "FAIL_EDIT_POST":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "REQUEST_POST_UPDATE": 
            return {
                ...state,
                loadingUpdate: true
            }
        case "SUCCESS_POST_UPDATE": 
            return {
                ...state,
                loadingUpdate: false
            }
        case "FAIL_POST_UPDATE": 
            return {
                ...state,
                loadingUpdate: false
            }
        case "REQUEST_UPLOAD_IMAGE":
            return {
                ...state,
                loadingUpload: true,
                errorUpload: ''
            }
        case "SUCCESS_UPLOAD_IMAGE":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: ''
            }
        case "FAIL_UPLOAD_IMAGE":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: action.payload
            }
        default:
            return state;
    }
};