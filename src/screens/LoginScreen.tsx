import React from 'react'
import { Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginTheme } from '../theme/loginTheme'

export const LoginScreen = () => {
  return (
    <>
        <Background />

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
            // TODO: on change and value
          />

          <Text style={ loginTheme.inputLabel }>Password</Text>
          <TextInput 
            placeholder='*************'
            placeholderTextColor="rgba(255,255,255,0.6)"
            underlineColorAndroid='white'
            autoCapitalize='none'
            autoCorrect={ false }
            style={[ 
              loginTheme.input,
              ( Platform.OS === 'ios' ) && loginTheme.inputIOS,
            ]}
            // TODO: on change and value
          />

          <View style={ loginTheme.loginButtonContainer }>
            <TouchableOpacity
              activeOpacity={ 0.7 }
              style={ loginTheme.loginButton }
            >
              <Text style={ loginTheme.loginButtonText }>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={ loginTheme.loginButtonContainer }>
            <TouchableOpacity
              activeOpacity={ 0.7 }
            >
              <Text style={ loginTheme.newAccountText }>
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </>
  )
}
