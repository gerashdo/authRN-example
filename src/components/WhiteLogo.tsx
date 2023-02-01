import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export const WhiteLogo = () => {
  return (
    <View
        style={{
            alignItems: 'center'
        }}
    >
        <Image 
          source={ require('../assets/react-logo-white.png')}
          style={ styles.logo }
        />
    </View>
  )
}

const styles = StyleSheet.create({
    logo:{
        width: 110,
        height: 100,
    },
})
