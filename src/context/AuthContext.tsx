import React, { createContext, useReducer } from "react";
import { User } from "../interfaces/users";
import { authReducer, AuthState } from "./authReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: () => void;
    signOut: () => void;
    logIn: () => void;
    removeError: () => void;
}

const initialState: AuthState = {
    user: null,
    token: null,
    errorMessage: '',
    status: 'checking',
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }:any) => {

    const [ state, dispatch ] = useReducer( authReducer, initialState )

    const signIn = () => {}
    const signOut = () => {}
    const logIn = () => {}
    const removeError = () => {}

    return(
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signOut,
            logIn,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}