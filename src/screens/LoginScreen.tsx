import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { loginTheme } from '../theme/loginTheme'

interface Props extends StackScreenProps<any,any>{}

export const LoginScreen = ({ navigation }:Props) => {

  const { signIn, errorMessage, removeError } = useContext( AuthContext )

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  })

  useEffect(() => {
    if( errorMessage.length === 0 ) return;

    Alert.alert( 'Login Incorrecto', errorMessage, [{
      text: 'Ok',
      onPress: removeError
    }])
  }, [ errorMessage ])
  

  const onLogin = () => {
    console.log({ email, password })
    Keyboard.dismiss()

    signIn({ email, password })
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
              <Text style={ loginTheme.loginButtonText }>Iniciar sesi??n</Text>
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
