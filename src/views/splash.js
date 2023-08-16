import { useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import Logo from '../../assets/logo2.png'
const Splash = (props) => {
    console.log(props.navigation);
    useEffect(() => {
        const timer = setTimeout(() => {
          props.navigation.navigate('Home');
        }, 3000);
    }, []);
    
  return (
    <View style={styles.container}>
      <Image style={styles.logoSplash} source={Logo}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#007BFF',
        alignItems:'center',
        justifyContent:'center'
    },
    logoSplash:{
        width:250,
        height:250,
        
        objectFit:'contain'
    }
})