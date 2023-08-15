import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import logo from '../../assets/logo2.png'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import productsActions from '../../redux/actions/productsActions';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const navbarSearch = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const read_products = useSelector((store) => store.products.products);
    const moreViews = read_products?.filter((elemento) => elemento.Moreview === true);

    const imagesPorSlide = 5;

    const imagesPhones = moreViews.filter(item => item.type === "Phones" || item.type === "Tabs");
    const currentPhones = imagesPhones.slice(imagesPorSlide);
    const imagesDesktop = moreViews.filter(item => item.type === "NOTEBOOK" || item.type === "DESKTOP");
    const currentDesktop = imagesDesktop.slice(imagesPorSlide);
    const imagesGamers = moreViews.filter(item => item.type === "pc" || item.type === "Chair" || item.type === "Mouse");
    const currentGamers = imagesGamers.slice(imagesPorSlide);
    const imagesAudio = moreViews.filter(item => item.type === "TV" || item.type === "SPEAKERS" || item.type === "HEADPHONES" || item.type === "MICROPHONE" || item.type === "CAMERAS");
    const currentAudio = imagesAudio.slice(imagesPorSlide);
    const imagesElectro = moreViews.filter(item => item.type === "Fridge" || item.type === "Air" || item.type === "Kitchen" || item.type === "Blender" || item.type === "Laundry");
    const currentElectro= imagesElectro.slice(imagesPorSlide);

    const searchQuery = async () => {
        try {
          const storedSearchTerm = await AsyncStorage.getItem('searchTerm');
          return storedSearchTerm;
        } catch (error) {
          console.log('Error al obtener el término de búsqueda:', error);
          return null;
        }
      };

    const performSearch = () => {
        if (searchTerm === '') {
          setSearchResults([]);
        } else {
          const filtered = read_products.filter(
            (product) =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.category.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(filtered);
        }
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

      const handleSearchClick = async () => {
        if (searchTerm) {
            closeModal();
            performSearch();
            await saveSearchResultsToAsyncStorage();
            navigation.navigate('ResultProducts'); 
        }
        };

    const handleEnterKey = async (event) => {
        if (event.key === 'Enter' && searchTerm) {
        closeModal();
        performSearch();
        await saveSearchResultsToAsyncStorage();
        navigation.navigate('ResultProducts'); 
        }
    };
      
    const saveSearchResultsToAsyncStorage = async () => {
        const matchingProductIds = searchResults.map((product) => product._id);
        await AsyncStorage.setItem('search', JSON.stringify(matchingProductIds));
        await AsyncStorage.setItem('searchTerm', JSON.stringify(searchTerm));
    };

    useEffect(() => {
        dispatch(productsActions.read_products());
        checkLoginStatus();
    }, [dispatch]);

    useEffect(() => {
        performSearch();
      }, [searchTerm]);

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            setIsLoggedIn(!!token);
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
    };

  

    const navigateGamersPage = () => {
        navigation.navigate('GamersPage');
    };

    const navigateTechPage = () => {
        navigation.navigate('TechsPage');
    };

    const navigateToProductDetails = (productId) => {
        navigation.navigate('ProductDetails', { productId });
    };

    const navigateToCarritoPage = () => {
        navigation.navigate('carritoPage');
      };

  
  return (
    <View style={styles.navbar}>
    <View style={styles.nav1}> 
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <AntDesign name="bars" style={styles.menu} />
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
        <Image style={styles.logotipo} source={logo}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('carritoPage')}>
            <AntDesign  name="shoppingcart" style={styles.logo} />
        </TouchableOpacity>
    </View>
    <View>
        <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={styles.searchInput} placeholder="Find what you are looking for..." value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            <TouchableOpacity style={{ position: 'absolute', right: 20, backgroundColor:'gray',padding:10.8}} onPress={() => { setIsModalOpen(true); handleSearchClick(); }} >
                <Ionicons name="search-outline" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
        {searchResults.length > 0 && (
            <Modal animationType="slide" transparent={false} visible={isModalOpen}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <FlatList data={searchResults.slice(0, 5)} keyExtractor={(item) => item._id} renderItem={({ item }) => (
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <Image source={{ uri: item.cover_photo[0] }} style={{ width: 48, height: 48 }} />
                            <Text>{item.title}</Text>
                        </TouchableOpacity> )} 
                    />
                    {searchResults.length > 5 && (
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: '#007BFF' }} onPress={saveSearchResultsToAsyncStorage}> More Views </Text>
                        </TouchableOpacity> 
                    )}
                    <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }} onPress={closeModal}>
                        <Text style={{ color: '#007BFF' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )}
    </View>
</View>
  )
}

export default navbarSearch

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#007BFF',
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
    searchInput: {
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
        borderRadius: 8,
        width: '80%'
    },
    logotipo:{
        width:100,
        height:80
      }
})