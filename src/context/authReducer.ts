import { User } from "../interfaces/users";

export interface AuthState {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
}

type AuthAction =
    | { type: 'signUp', payload: { user: User, token: string } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logOut' }

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch ( action.type ) {
        case 'addError':
            return{
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            };
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                user: action.payload.user,
                status: 'authenticated',
                token: action.payload.token
            };
        case 'notAuthenticated':
        case 'logOut':
            return {
                ...state,
                user: null,
                token: null,
                status: 'not-authenticated'
            };
        default:
            return state;
    }
}