import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigator from './NavigatorsStack';
import RegisterScreen from '../views/Register';
import LoginScreen from '../views/Login';

const getStoredUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userJSON = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJSON); 
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
      setUser(storedUser?.user || null)
    };
    getUserFromStorage();
  }, [props])

  const clearStoredUserInfo = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      alert('User Logged out');
    } catch (error) {
      console.log('Error al limpiar AsyncStorage:', error.message);
    }
  };
  
  const handleLogout = async () => {
    await clearStoredUserInfo();
    setUser(null);
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

const Drawer = createDrawerNavigator();

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
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name='Home' component={StackNavigator} options={{ headerShown: false }} />
      {!userLoggedIn && (
        <>
          <Drawer.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
          <Drawer.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Drawer.Navigator>
  );
};


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
