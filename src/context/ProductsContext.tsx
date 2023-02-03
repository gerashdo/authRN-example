import { createContext, useEffect, useState } from "react";
import cafeApi from "../api/cafeApi";
import { Product, ProductsResponse } from "../interfaces/products";

interface ProductsContextProps {
    products: Product[];
    loadProducts: () => Promise<void>;
    // addProduct: ( categoryId: string, productName: string ) => Promise<void>;
    // updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    // deleteProduct: ( id: string ) => Promise<void>;
    // loadProductById: ( id: string ) => Promise<Product>;
    // uploadImage: ( id: string, data: any ) => Promise<void>;
}

export const ProductsContext = createContext({} as ProductsContextProps)

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        loadProducts()
    }, [])
    
    const loadProducts = async() => {
        const { data } = await cafeApi.get<ProductsResponse>( '/product?limit=10' )
        // setProducts([ ...products, ...data.products ])
        setProducts([ ...data.products ])
    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
        }}>
            { children }
        </ProductsContext.Provider>
    )
}