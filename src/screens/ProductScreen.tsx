import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { StackScreenProps } from '@react-navigation/stack'
import {Picker} from '@react-native-picker/picker';

import { ProductStackParams } from '../navigation/ProductsNavigator'
import { useCategories } from '../hooks/useCategories';
import { ProductsContext } from '../context/ProductsContext';
import { useForm } from '../hooks/useForm';
import { Product } from '../interfaces/products';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route, navigation }: Props) => {

    const { name = '', id = '' } = route.params
    const { categories } = useCategories()
    const { loadProductById, addProduct, updateProduct } = useContext( ProductsContext )
    const [tempImage, setTempImage] = useState<string>()

    const { _id: productId, name: productName ,category, img, onChange, form, setFormValues } = useForm({
        _id: id,
        name: name,
        category: '',
        img: '',
    })

    useEffect(() => {
      navigation.setOptions({
        title: productName.length === 0 ? 'Producto': productName ,
      })
    }, [ productName ])

    useEffect( () => {
        loadProduct()
    }, [])

    const loadProduct = async() => {
        if( id.length === 0 ) return;

        const product: Product = await loadProductById( id )
        setFormValues({
            _id: id,
            name,
            category: product.category._id,
            img: product.img || '',
        })
    }

    const saveOrUpdateProduct = async() => {
        if( id.length === 0 ){
            const newProduct = await addProduct( category, productName )
            onChange( newProduct._id, '_id' )
        }else{
            updateProduct( category, productName, productId )
        }
    }

    const takeProductPucture = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.5,
        }, ( resp ) => {
            if( resp.didCancel ) return;
            if( !resp.assets![0].uri ) return;

            setTempImage( resp.assets![0].uri )
        });
    }

    
    return (
        <View style={ styles.container }>
            <ScrollView>
                <Text style={ styles.lablel }>Nombre del producto:</Text>
                <TextInput 
                    placeholder='Ingrese el nombre'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    style={ styles.textInput }
                    value={ productName }
                    onChangeText={ ( value ) => onChange( value, 'name' ) }
                />
                <Text style={ styles.lablel }>Categoria:</Text>
                <Picker
                    selectedValue={ category }
                    onValueChange={( value ) =>
                        onChange( value, 'category' )
                    }
                >
                    {
                        categories.map( category => (
                            <Picker.Item
                                key={ category._id }
                                label={ category.name } 
                                value={ category._id } 
                            />
                        ))
                    }
                </Picker>

                <Button 
                    title='Guardar'
                    onPress={ saveOrUpdateProduct }
                    color="#066EC2"
                />

                {
                    ( productId.length > 0 ) && (
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 10,
                                justifyContent: 'center',
                                marginTop: 10
                            }}
                        >
                            <Button 
                                title='Camara'
                                onPress={ takeProductPucture }
                                color="#066EC2"
                            />
                            <Button 
                                title='Galeria'
                                onPress={ () => {} }
                                color="#066EC2"
                            />
                        </View>
                    )
                }


                {
                    (img.length > 0 && !tempImage ) && (
                        <Image 
                            source={{ uri: img }}
                            style={{
                                marginTop: 10,
                                height: 300,
                                width: '100%'
                            }}
                        />
                    )
                }

                {
                    ( tempImage ) && (
                        <Image 
                            source={{ uri: tempImage }}
                            style={{
                                marginTop: 10,
                                height: 300,
                                width: '100%'
                            }}
                        />
                    )
                }
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 20,
    },
    lablel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    textInput:{
        fontSize: 16,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 20,
        marginVertical: 10,
    }
})