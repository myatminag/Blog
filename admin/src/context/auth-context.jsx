import { createContext, useReducer } from "react";

import { AuthReducer } from "../reducer/auth-reducer";

const INITIAL_STATE = {
    authorInfo: JSON.parse(localStorage.getItem('authorInfo')) || null
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    const value = {
        state,
        dispatch 
    };
    
    return (
        <AuthContext.Provider value={value}>
            { children } 
        </AuthContext.Provider>
    )
};