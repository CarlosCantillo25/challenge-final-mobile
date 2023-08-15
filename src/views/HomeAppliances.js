import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView} from 'react-native'
import React from 'react'
import appliancess from '../../assets/appliances.jpg'
import productsActions from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState , useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import NavbarSearch from '../components/navbarSearch';

const HomeAppliances = (props) => {

  const dispatch = useDispatch();
  const currentPageKey = 'currentPageAppliances'; 
  const initialPage = parseInt(AsyncStorage.getItem(currentPageKey)) || 1;
  const appliances = useSelector((store) => store.products.appliances);
  const datos = appliances.products;
  const [currentPage, setCurrentPage] = useState(initialPage); 
  const page = currentPage;
  
  useEffect(() => {
    AsyncStorage.setItem(currentPageKey, currentPage.toString()); 
    dispatch(productsActions.read_pag_appliances(page));
  }, [page]);
  
  function handleNext() {
    setCurrentPage(currentPage + 1);
  }
  
  function handlePrev() {
    setCurrentPage(currentPage - 1);
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
   <NavbarSearch/>

  <Image source={appliancess} style={styles.banner}/>
  <Text style={styles.title}>Home & Appliances</Text>
 <View style={styles.cont_buton}>
  <TouchableHighlight onPress={handlePrev} disabled={appliances.prevPage === null} style={styles.boton}><Text style={styles.arrow}>Prev page</Text></TouchableHighlight>
  <Text>Page{currentPage}</Text>
  <TouchableHighlight onPress={handleNext} disabled={ appliances.nextPage === null} style={styles.boton}><Text style={styles.arrow}>Next page</Text></TouchableHighlight>
 </View>
 <View style={styles.cont_images}>
 {datos?.map((element) => (

 <TouchableHighlight key={element._id} onPress={()=>props.navigation.navigate('ProductDetails',  {productId:element._id})}  >

  <View style={styles.card}>
  <Image source={{ uri: element.cover_photo[0] }} style={styles.productImage} key={element._id}/>
  <Text>{element.title}</Text>
  <Text>USD${element.price}</Text>
  </View>
  
</TouchableHighlight>
))}
</View>
<View style={styles.cont_buton}>
  <TouchableHighlight onPress={handlePrev} disabled={appliances.prevPage === null} style={styles.boton}><Text style={styles.arrow}>Prev page</Text></TouchableHighlight>
  <Text>Page{currentPage}</Text>
  <TouchableHighlight onPress={handleNext} disabled={ appliances.nextPage === null} style={styles.boton}><Text>Next page</Text></TouchableHighlight>
 </View>
</View>
<Footer/>
</ScrollView>
  )
}

export default HomeAppliances

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  navbar: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  backgroundColor:'#007BFF'
},
nav1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 10,
},
logo: {
    width: 55,
    height: 55,
    fontSize: 40,
    color: 'white'
},
menu: {
    width: 55,
    height: 55,
    fontSize: 40,
    color: 'white'
},
banner:{
width:'100%',
height:135,
objectFit:'cover'
},
title:{
  color:'gray',
  fontSize:20,
  textAlign:'center'
},
productImage:{
  width:110,
  height:80,
  objectFit:'contain'
},
boton:{
  width:70,
  height:30,
  backgroundColor:'#007BFF',
  borderRadius:5,
  padding:2,
  justifyContent:'center',
  alignItems:'center'
},
cont_buton:{
  flexDirection:"row",
  padding:20,
  justifyContent:"center",
  gap:20
},
arrow:{
color:'white'
},
cont_images:{
flexDirection:"row",
flexWrap:"wrap",
gap:20,
justifyContent:'center'
},
card:{
  flexDirection:'column',
  justifyContent:'center',
  textAlign:'center',
  padding:8,
  alignItems:'center',
  backgroundColor:'#F2F6FD',
  height:210,
  borderRadius:10,
  borderColor:'gray',
  borderStyle:'solid',
  borderWidth:1,
  width:180,
},
scrollContainer: {
  flexGrow: 1,
  backgroundColor: 'white', // Ajusta el color de fondo según tus necesidades
},
logotipo:{
  width:100,
  height:80
}
})