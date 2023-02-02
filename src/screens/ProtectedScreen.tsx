import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'

export const ProtectedScreen = () => {

  const { user, token, logOut } = useContext( AuthContext )
  return (
    <View style={ styles.container }>
        <Text style={ styles.title }>Protected Screen</Text>
        <Button 
          title='LogOut'
          onPress={ logOut }
        />
        <Text>
          { JSON.stringify( user, null, 4 ) }
        </Text>
        <Text>
          { token }
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})