export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface LoginResponse {
    user:  User;
    token: string;
}

export interface UsersResponse {
    total: number;
    users: User[];
}

export interface User {
    name:   string;
    email:  string;
    role:   string;
    state:  boolean;
    google: boolean;
    img?:   string;
    uid:    string;
}




