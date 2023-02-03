import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import {Picker} from '@react-native-picker/picker';

import { ProductStackParams } from '../navigation/ProductsNavigator'

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route, navigation }: Props) => {

    const { name = '', id } = route.params
    
    const [selectedLanguage, setSelectedLanguage] = useState();

    useEffect(() => {
      navigation.setOptions({
        title: name,
      })
    }, [])
    
    return (
        <View style={ styles.container }>
            <ScrollView>
                <Text style={ styles.lablel }>Nombre del producto:</Text>
                <TextInput 
                    placeholder='Ingrese el nombre'
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    style={ styles.textInput }
                />
                <Text style={ styles.lablel }>Categoria:</Text>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
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