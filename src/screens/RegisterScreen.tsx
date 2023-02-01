import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'

import { loginTheme } from '../theme/loginTheme'

interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({ navigation }:Props) => {
  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  })

  const onRegister = () => {
    console.log({ email, password })
    Keyboard.dismiss()
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
