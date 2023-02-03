import { createContext, useState } from "react";
import { Product } from "../interfaces/products";

interface ProductsContextProps {
    products: Product[];
    // loadProducts: () => Promise<void>;
    // addProduct: ( categoryId: string, productName: string ) => Promise<void>;
    // updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    // deleteProduct: ( id: string ) => Promise<void>;
    // loadProductById: ( id: string ) => Promise<Product>;
    // uploadImage: ( id: string, data: any ) => Promise<void>;
}

export const ProductsContext = createContext({} as ProductsContextProps)

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Product[]>([])

    return (
        <ProductsContext.Provider value={{
            products,
        }}>
            { children }
        </ProductsContext.Provider>
    )
}