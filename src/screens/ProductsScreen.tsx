import React, { useContext, useState } from 'react'
import { useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { ProductsContext } from '../context/ProductsContext'
import { ProductStackParams } from '../navigation/ProductsNavigator'

interface Props extends StackScreenProps<ProductStackParams, 'ProductsScreen'>{}

export const ProductsScreen = ({ navigation }: Props) => {

    const [ refreshing, setRefreshing ] = useState( false )
    const { products, loadProducts } = useContext( ProductsContext )

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity
                style={{ marginRight: 20 }}
                activeOpacity={ 0.7 }
                onPress={ () => navigation.navigate('ProductScreen', {} )}
            >
                <Text>Agregar</Text>
            </TouchableOpacity>
        )
      })
    }, [])

    const loadProductFromBackend = async() => {
        setRefreshing( true )
        await loadProducts()
        setRefreshing( false )
    }
    
    return (
        <View style={ styles.container }>
            <FlatList 
                data={ products }
                keyExtractor={ ( item ) => item._id }
                renderItem={ ({ item }) => (
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => navigation.navigate('ProductScreen', {
                            name: item.name,
                            id: item._id
                        })}
                    >
                        <Text style={ styles.productName }>{ item.name }</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={ () => (
                    <View style={ styles.itemSeparator } />
                )}

                refreshControl={ <RefreshControl 
                    refreshing={ refreshing }
                    onRefresh={ loadProductFromBackend }
                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
