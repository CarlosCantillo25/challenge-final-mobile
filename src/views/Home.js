import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function HomeScreen(props) {

    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        checkLoginStatus();
    }, []);

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

    const navigateHomeAppliancePage = () => {
        navigation.navigate('HomeAppliances');
    };

    const navigateGamersPage = () => {
        navigation.navigate('GamersPage');
    };

    const navigateTechPage = () => {
        navigation.navigate('TechsPage');
    };
    
    return (
        <ImageBackground source={require('../../assets/backgroundHome.jpg')} style={styles.imageBackground}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <View style={styles.nav1}>
                        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <AntDesign name="bars" style={styles.menu} />
                        </TouchableOpacity>
                        <AntDesign name="shoppingcart" style={styles.logo} />
                    </View>
                    <TextInput style={styles.searchInput} placeholder="Search..."  value={searchText} onChangeText={handleSearchChange} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={navigateHomeAppliancePage} style={styles.button}>
                        <Image source={require('../../assets/iconAppliances.png')} style={styles.buttonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateGamersPage} style={styles.button}>
                        <Image source={require('../../assets/iconGamer.png')} style={styles.buttonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateTechPage} style={styles.button}>
                        <Image source={require('../../assets/techs.png')} style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

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
    searchInput: {
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFBEB',
    },
    button: {
        padding: 10,
        alignItems: 'center',
    },
    buttonIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
});
