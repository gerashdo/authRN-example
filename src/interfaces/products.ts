// Generated by https://quicktype.io

export interface ProductsResponse {
    total:    number;
    products: Product[];
}

export interface Product {
    _id:         string;
    name:        string;
    state:       boolean;
    user:        CreadoPor;
    price:       number;
    category:    Category;
    description: string;
    available:   boolean;
    img?:        string;
}

export interface Category {
    _id:  string;
    name: string;
}


// Generated by https://quicktype.io

export interface CategoriesResponse {
    total:      number;
    categories: Category[];
}

export interface Category {
    _id:   string;
    name:  string;
    state?: boolean;
    user?:  CreadoPor;
}

export interface CreadoPor {
    _id:  string;
    name: string;
}

