import React, { useContext, useEffect } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

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
    const { loadProductById } = useContext( ProductsContext )

    const { category, img, onChange, form, setFormValues } = useForm({
        _id: id,
        name: name,
        category: '',
        img: '',
    })

    useEffect(() => {
      navigation.setOptions({
        title: name,
      })
    }, [])

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

    
    return (
        <View style={ styles.container }>
            <ScrollView>
                <Text style={ styles.lablel }>Nombre del producto:</Text>
                <TextInput 
                    placeholder='Ingrese el nombre'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    style={ styles.textInput }
                    value={ name }
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
                    onPress={ () => {} }
                    color="#066EC2"
                />

                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'center',
                        marginTop: 10
                    }}
                >
                    <Button 
                        title='Guardar'
                        onPress={ () => {} }
                        color="#066EC2"
                    />
                    <Button 
                        title='Guardar'
                        onPress={ () => {} }
                        color="#066EC2"
                    />
                </View>

                {
                    img.length > 0 && (
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