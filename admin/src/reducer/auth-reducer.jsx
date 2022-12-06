export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN": {
            return {
                ...state,
                authorInfo: action.payload
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                authorInfo: null
            }
        }
        default:
            return state
    }
};