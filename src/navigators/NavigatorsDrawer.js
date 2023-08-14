import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../views/Home';
import RegisterScreen from '../views/Register';
import LoginScreen from '../views/Login';
import HomeAppliances from '../views/HomeAppliances';
import TechsPage from '../views/TechsPage';
import GamersPage from '../views/GamersPage';
import ControlPanel from '../views/ControlPanel'
import ResultProducts from '../views/ResultProducts'
import ProductDetails from '../views/ProductDetails'
import ProductDetailView from '../views/ProductDetailView';
import CarritoPage from '../views/carritoPage';

const getStoredUserInfo = async () => {
  try {
    // Obtener el token almacenado en AsyncStorage.
    const token = await AsyncStorage.getItem('token');
    // Obtener el objeto de usuario almacenado en AsyncStorage.
    const userJSON = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJSON); // Parsear la cadena JSON a un objeto JavaScript.
    console.log('Token:', token);
    console.log('User:', user);
    // Devolver el token y el objeto de usuario para usarlos en otras partes de tu aplicación.
    return { token, user };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const CustomDrawerContent = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserFromStorage = async () => {
      const storedUser = await getStoredUserInfo();
      console.log(storedUser)
      setUser(storedUser?.user || null)
    };
    getUserFromStorage();
  }, [props])

  const clearStoredUserInfo = async () => {
    try {
      await AsyncStorage.removeItem('token');
      // Eliminar
      await AsyncStorage.removeItem('user');
      alert('User Logged out');
      console.log('AsyncStorage clean sucessfully');
    } catch (error) {
      console.log('Error al limpiar AsyncStorage:', error.message);
    }
  };
  
  const handleLogout = async () => {
    await clearStoredUserInfo();
    setUser(null); // Establece el usuario a null para actualizar el contenido del drawer
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: user?.photo }} style={styles.userPhoto} />
        <Text style={styles.userName}>{user?.email}</Text>
      </View>
      <DrawerItemList {...props} />
      {user?.photo ? <DrawerItem label="Sign Out" onPress={handleLogout} /> : null}
      
    </DrawerContentScrollView>
  );
};

const isLoggedIn = async () => {
  const user = await AsyncStorage.getItem('user');
  return !!user; 
};

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const loggedIn = await isLoggedIn();
      setUserLoggedIn(loggedIn);
    };
    checkUserLoggedIn();
  }, []);

  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        {!userLoggedIn ? (
          <>
          <Drawer.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
            <Drawer.Screen name='SignUp' component={RegisterScreen} options={{ headerShown: false }} />
            <Drawer.Screen name='Sign In' component={LoginScreen} options={{ headerShown: false }} />
            <Drawer.Screen name='ControlPanel' component={ControlPanel} options={{ headerShown: false }} />
            <Drawer.Screen name="HomeAppliances" component={HomeAppliances} options={{ headerShown: false }}/>
            <Drawer.Screen name="GamersPage" component={GamersPage} options={{ headerShown: false }} />
            <Drawer.Screen name="TechsPage" component={TechsPage} options={{ headerShown: false }} />
            <Drawer.Screen name="ResultProducts" component={ResultProducts} options={{ headerShown: false }} />
            <Drawer.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
            <Drawer.Screen name="ProductDetailView" component={ProductDetailView} options={{ headerShown: false }} />
            <Drawer.Screen name="carritoPage" component={CarritoPage} options={{ headerShown: false }} />
          </>
        ) : (
          <>
          <Drawer.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
          <Drawer.Screen name='ControlPanel' component={ControlPanel} options={{ headerShown: false }} />
          <Drawer.Screen name="HomeAppliances" component={HomeAppliances} />
          <Drawer.Screen name="GamersPage" component={GamersPage} options={{ headerShown: false }} />
          <Drawer.Screen name="TechsPage" component={TechsPage} options={{ headerShown: false }} />
          <Drawer.Screen name="ResultProducts" component={ResultProducts} options={{ headerShown: false }} />
          <Drawer.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
          <Drawer.Screen name="ProductDetailView" component={ProductDetailView} options={{ headerShown: false }} />
          <Drawer.Screen name="carritoPage" component={CarritoPage} options={{ headerShown: false }} />
          </>
        )}
      </Drawer.Navigator>
    </>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
