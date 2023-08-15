import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Footer = () => {
  return (
    <View style={styles.contFooter}>
      <Text>Footer</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    contFooter:{
    width:'100%',
    height:200,
    backgroundColor:'#007BFF'
    },

})