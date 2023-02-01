import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { loginTheme } from '../theme/loginTheme'

interface Props extends StackScreenProps<any,any>{}

export const LoginScreen = ({ navigation }:Props) => {

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  })

  const onLogin = () => {
    console.log({ email, password })
    Keyboard.dismiss()
  }

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={ (Platform.OS === 'ios' ) ? 'padding' : 'height' }
      >
        <View style={ loginTheme.formContainer }>
          <WhiteLogo />

          <Text style={ loginTheme.title }>Login</Text>

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
            onSubmitEditing={ onLogin }
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
            onSubmitEditing={ onLogin }
          />

          <View style={ loginTheme.loginButtonContainer }>
            <TouchableOpacity
              activeOpacity={ 0.7 }
              style={ loginTheme.loginButton }
              onPress={ onLogin }
            >
              <Text style={ loginTheme.loginButtonText }>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={ loginTheme.loginButtonContainer }>
            <TouchableOpacity
              activeOpacity={ 0.7 }
              onPress={ () => navigation.replace('RegisterScreen')}
            >
              <Text style={ loginTheme.newAccountText }>
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
