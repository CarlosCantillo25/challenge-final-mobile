import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { api, apiUrl, endpoints } from '../../utils/api'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const ProductDetails = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return `USD $${amount.toFixed(0)}`;
    } else {
      return '';
    }
  };

  const navigateToProductDetailView = (productId) => {
    navigation.navigate('ProductDetailView', { productId });
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

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
            <View style={styles.container2}>
              <View style={styles.primerBloque}>
                <Text style={styles.brand}>{product.brand}</Text>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{formatCurrency(product.price)}</Text>
                <Image source={{ uri: product.cover_photo[selectedImageIndex] }} style={styles.mainImage} />
                <View style={styles.secondaryImagesContainer}>
                  {product.cover_photo.map((image, index) => (
                    <TouchableOpacity key={index} onPress={() => handleImageClick(index)} >
                      <Image source={{ uri: image }} style={styles.secondaryImage} />
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.container3}>
                  <Image source={require('../../assets/tienda.png')} style={styles.tienda} />
                  <Text style={styles.text}>Withdraw it NOW!</Text>
                </View>
                <View style={styles.container5}>
                  <TouchableOpacity onPress={() => navigateToProductDetailView(productId)}>
                    <Text style={styles.text2}>View Details</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.container4}>
                  <TouchableOpacity>
                    <Text style={styles.text1}>ADD TO CART</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.buttonBack} onPress={handleGoBack}>
            <Text style={styles.back}>GO TO BACK</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

export default ProductDetails

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
  container2:{
    alignItems: 'center',
  },
  primerBloque: {
    borderWidth: 1,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 8,
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },
  mainImage: {
    height: 250,
    resizeMode: 'contain',
    padding: 20,
  },
  secondaryImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  secondaryImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: 'green',
  },
  brand: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19
  },
  price: {
    fontWeight: '600',
    fontSize: 19,
    marginBottom: 2
  },
  tienda: {
    height: 50,
    width: 50,
    marginRight: 20
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  container4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'green',
    padding: 4,
    borderRadius: 2
  },
  text2: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  container5: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#2A81FF',
    padding: 4,
    borderRadius: 2
  },
  back: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'black',
    width: 150,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttonBack: {
    alignSelf: 'center',
    marginBottom: 20
  }
})