import { useEffect, useState } from "react"

import cafeApi from '../api/cafeApi';
import { CategoriesResponse, Category } from "../interfaces/products";

export const useCategories = () => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
      loadCategories()
    }, [])
    

    const loadCategories = async() => {
        const { data } = await cafeApi.get<CategoriesResponse>( '/category')
        setCategories( data.categories )
        setIsLoading( false )
    }

    return {
        isLoading,
        categories,
    }
}
