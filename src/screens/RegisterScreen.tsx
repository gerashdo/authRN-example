import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'

import { loginTheme } from '../theme/loginTheme'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({ navigation }:Props) => {

  const { signUp, errorMessage, removeError } = useContext( AuthContext )

  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if( errorMessage.length === 0 ) return;
    
    Alert.alert('Registro fallido', errorMessage, [{
      text: 'Ok',
      onPress: removeError,
    }])
  }, [ errorMessage ])
  

  const onRegister = () => {
    console.log({ email, password })
    Keyboard.dismiss()

    signUp({ name, email, password })
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ 
          flex: 1,
          backgroundColor: '#066EC2',
        }}
        behavior={ (Platform.OS === 'ios' ) ? 'padding' : 'height' }
      >
        <View style={ loginTheme.formContainer }>
          <WhiteLogo />

          <Text style={ loginTheme.title }>Registro</Text>

          <Text style={ loginTheme.inputLabel }>Nombre</Text>
          <TextInput 
            placeholder='Fernando Torres'
            placeholderTextColor="rgba(255,255,255,0.6)"
            autoCapitalize='words'
            autoCorrect={ false }
            underlineColorAndroid='white'
            style={[ 
              loginTheme.input,
              ( Platform.OS === 'ios' ) && loginTheme.inputIOS,
            ]}
            onChangeText={ ( value ) => onChange( value, 'name' )}
            value={ name }
            onSubmitEditing={ onRegister }
          />

          <Text style={ loginTheme.inputLabel }>Email</Text>
          <TextInput 
            placeholder='email@mail.com'
            placeholderTextColor="rgba(255,255,255,0.6)"
            autoCapitalize='none'
            autoCorrect={ false }
            keyboardType='email-address'
            underlineColorAndroid='white'
            style={[ 
              loginTheme.input,
              ( Platform.OS === 'ios' ) && loginTheme.inputIOS,
            ]}
            onChangeText={ ( value ) => onChange( value, 'email' )}
            value={ email }
            onSubmitEditing={ onRegister }
          />

          <Text style={ loginTheme.inputLabel }>Password</Text>
          <TextInput 
            placeholder='*************'
            secureTextEntry
            placeholderTextColor="rgba(255,255,255,0.6)"
            underlineColorAndroid='white'
            autoCapitalize='none'
            autoCorrect={ false }
            style={[ 
              loginTheme.input,
              ( Platform.OS === 'ios' ) && loginTheme.inputIOS,
            ]}
            onChangeText={ ( value ) => onChange( value, 'password' )}
            value={ password }
            onSubmitEditing={ onRegister }
          />

          <View style={ loginTheme.loginButtonContainer }>
            <TouchableOpacity
              activeOpacity={ 0.7 }
              style={ loginTheme.loginButton }
              onPress={ onRegister }
            >
              <Text style={ loginTheme.loginButtonText }>Registrarme</Text>
            </TouchableOpacity>
          </View>

          {/* Back button */}
          <TouchableOpacity
            activeOpacity={ 0.7 }
            onPress={ () => navigation.replace('LoginScreen')}
            style={ loginTheme.backButton }
          >
            <Text style={ loginTheme.newAccountText }>
              Login
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </>
  )
}
