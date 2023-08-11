import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

export default function HomeScreen(props) {

    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    
    return (
        <View style={styles.container}>

                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <AntDesign name="bars" style={styles.menu} />
                    </TouchableOpacity>
                    <AntDesign name="shoppingcart" style={styles.logo} />
                    
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    logo: {
        width: 54,
        height: 32,
        resizeMode: 'contain',
    },
    menu: {
        width: 55,
        height: 55,
    },
});
