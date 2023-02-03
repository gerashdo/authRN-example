import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProductsContext } from '../context/ProductsContext'

export const ProductsScreen = () => {

    const { products, loadProducts } = useContext( ProductsContext )
    
    return (
        <View style={ styles.container }>
            <FlatList 
                data={ products }
                keyExtractor={ ( item ) => item._id }
                renderItem={ ({ item }) => (
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                    >
                        <Text style={ styles.productName }>{ item.name }</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={ () => (
                    <View style={ styles.itemSeparator } />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        marginVertical: 10,
    },
    productName: {
        fontSize: 20,
    },
    itemSeparator: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        marginVertical: 5,
    }
})
