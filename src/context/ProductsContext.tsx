import { createContext, useEffect, useState } from "react";
import { ImagePickerResponse } from "react-native-image-picker";
import cafeApi from "../api/cafeApi";
import { Product, ProductsResponse } from "../interfaces/products";

interface ProductsContextProps {
    products: Product[];
    loadProducts: () => Promise<void>;
    addProduct: ( categoryId: string, productName: string ) => Promise<Product>;
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    // deleteProduct: ( id: string ) => Promise<void>;
    loadProductById: ( id: string ) => Promise<Product>;
    uploadImage: ( productId: string, data: any ) => Promise<void>;
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

    const loadProductById = async( id: string ): Promise<Product> => {
        const { data } = await cafeApi.get<Product>( `/product/${ id }` )
        return data
    }

    const addProduct = async( categoryId: string, productName: string ): Promise<Product> => {
        const { data } = await cafeApi.post<Product>( '/product', {
            name: productName,
            category: categoryId,
        })
        setProducts([ ...products, data ])
        return data
    }

    const updateProduct = async( categoryId: string, productName: string, productId: string ) => {
        const { data } = await cafeApi.put<Product>( `/product/${ productId }`, {
            name: productName,
            category: categoryId,
        })
        setProducts( products.map( product => {
            return ( product._id === productId )
                ? data
                : product
        }))
    }

    const uploadImage = async( productId: string, data: ImagePickerResponse ) => {
        const params = {
            type: data.assets![0].type!,
            name: data.assets![0].fileName!,
            uri: data.assets![0].uri!,
        }

        const fileToUpload = JSON.parse( JSON.stringify(params))

        const formData = new FormData()
        formData.append( 'file', fileToUpload )

        try{
            await cafeApi.put( `/upload/product/${ productId }`, formData, {
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            } )
        }catch( error ){
            console.log( error )
        }
    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            loadProductById,
            addProduct,
            updateProduct,
            uploadImage,
        }}>
            { children }
        </ProductsContext.Provider>
    )
}