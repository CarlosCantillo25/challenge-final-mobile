import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { api, apiUrl, endpoints } from '../../utils/api'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const ProductDetailView = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await api.get(apiUrl + endpoints.product + productId);
        setProduct(data.product);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchProductDetails();
  }, [productId]);


  return (
    <ImageBackground source={require('../../assets/backgroundHome.jpg')} style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.nav1}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AntDesign name="bars" style={styles.menu} />
            </TouchableOpacity>
            <AntDesign name="shoppingcart" style={styles.logo} />
          </View>
        </View>
        <ScrollView>
          {product && (
            <View>
              <View style={styles.container1}>
                <View>
                  <View style={styles.header}>
                    <Text style={styles.brand}>{product.brand}</Text>
                    <Text style={styles.title}>{product.title}</Text>
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Technical characteristics</Text>
                    <ScrollView>
                      {/* Render your content based on the product type */}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

export default ProductDetailView

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 20,
  },
  imageBackground: {
      flex: 1,
      resizeMode: "cover", 
  },
  navbar: {
      flexDirection: 'column',
      justifyContent: 'space-between',
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
  container1: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '95%',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  brand: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
    margin: 2
  }
})