import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import face from '../../assets/face.png'
import insta from '../../assets/insta.png'
import youtube from '../../assets/youtube.png'
import linked from '../../assets/linkedin.png'
const Footer = () => {
  return (
    <View style={styles.contFooter}>
      <View style={styles.info}>
    <Text style={styles.title}>Customer Support</Text>
    <Text style={styles.follow}>0800-222-1234</Text>
    <Text style={styles.follow}>MON-FRI from 09:00 to 18:00</Text>
    <Text style={styles.follow}>SA from 09:00 to 13:00</Text>
    <Text style={styles.follow}>contact@ccgi.com</Text>
      </View>
      <View style={styles.redescont}>
      <Text style={styles.follow}>Follow us on our social networks </Text>
      <View style={styles.contIcons}>
      <Image source={face}/>
      <Image source={insta}/>
      <Image source={youtube}/>
      <Image source={linked}/>
      </View>
      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    contFooter:{
    width:'100%',
    height:220,
    backgroundColor:'#007BFF',
    flexDirection:'column',
    justifyContent:'space-around',
    
    padding:15
    },
    redescont:{
      flexDirection:'column',
      alignItems:'center',
      },
    follow:{
      color:'white'
    },
    contIcons:{
    flexDirection:'row' ,
    justifyContent:'space-around',
    paddingHorizontal:25,
    paddingVertical:10,
    gap:10,
    },
    info:{
      alignItems:'center',
      gap:2
    },
    title:{
      color:'white',
fontSize:20
    }
})