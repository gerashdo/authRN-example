import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from "../api/cafeApi";
import { LoginData, LoginResponse, RegisterData, User } from '../interfaces/users';
import { authReducer, AuthState } from "./authReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: ( loginData: LoginData ) => void;
    signUp: ( registerData: RegisterData ) => void;
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
        try{
            const token = await AsyncStorage.getItem('token')
            console.log( token )
            
            // If there is no token
            if( !token ) return dispatch({ type: 'notAuthenticated' })

            // If there is any token
            const response = await cafeApi.get<LoginResponse>('/auth/')

            AsyncStorage.setItem( 'token', response.data.token )
            dispatch({
                type: 'signUp',
                payload: {
                    user: response.data.user,
                    token: response.data.token,
                }
            })
        }catch( error ){
            return dispatch({ type: 'notAuthenticated' })
        }
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
                payload: error.response.data.msg || 'Informaci?? incorrecta'
            })
        }
    }

    const signUp = async( registerData: RegisterData ) => {
        try {
            const { data } = await cafeApi.post<LoginResponse>( '/user/', registerData )
            dispatch({
                type: 'signUp',
                payload: {
                    user: data.user,
                    token: data.token,
                }
            })
            AsyncStorage.setItem( 'token', data.token )
        } catch ( error: any ) {
            const errorObject = await error.response.data
            dispatch({ 
                type: 'addError',
                payload: errorObject.errors[0].msg || 'Datos no v??lidos'
            })
        }
    }

    const logOut = () => {
        dispatch({ type: 'logOut' })
        AsyncStorage.removeItem('token')
    }

    const removeError = () => {
        dispatch({ type: 'removeError' })
    }

    return(
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}