

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
