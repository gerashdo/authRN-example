import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from "../api/cafeApi";
import { LoginData, LoginResponse, User } from "../interfaces/users";
import { authReducer, AuthState } from "./authReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: ( loginData: LoginData ) => void;
    signOut: () => void;
    logOut: () => void;
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
    useEffect(() => {
      checkToken()
    }, [])
    
    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token')
        
        // If there is no token
        if( !token ) return dispatch({ type: 'notAuthenticated' })

        // If there is any token
        const response = await cafeApi.get('/auth/')

        //If it has expired
        if( response.status !== 200 ){
            dispatch({ type: 'notAuthenticated' })
        }

        dispatch({
            type: 'signUp',
            payload: {
                user: response.data.user,
                token: response.data.token,
            }
        })

    }

    const signIn = async( loginData: LoginData ) => {
        try {
            const { data } = await cafeApi.post<LoginResponse>( '/auth/login', loginData )
            dispatch({
                type: 'signUp',
                payload: {
                    user: data.user,
                    token: data.token,
                }
            })

            AsyncStorage.setItem( 'token', data.token )
        } catch ( error: any ) {
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Informació incorrecta'
            })
        }
    }
    const signOut = () => {}
    const logOut = () => {}
    const removeError = () => {
        dispatch({ type: 'removeError' })
    }

    return(
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signOut,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}