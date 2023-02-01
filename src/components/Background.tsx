import React from 'react'
import { StyleSheet, View } from 'react-native'

export const Background = () => {
  return (
    <View
        style={ styles.container }
    />
  )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: -250,
        height: 1300,
        width: 800,
        backgroundColor: '#066EC2',
        transform: [
            { rotate: '-70deg' }
        ]
    }
})
