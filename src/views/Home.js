import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import productsActions from "../../redux/actions/productsActions";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchText, setSearchText] = useState("");

    const read_products = useSelector((store) => store.products.products);
    const moreViews = read_products?.filter((elemento) => elemento.Moreview === true);

    const imagesPhones = moreViews.filter(item => item.type === "Phones" || item.type === "Tabs");
    const currentPhones = imagesPhones.slice(currentSlideCarousel2, currentSlideCarousel2 + imagesPorSlide);
    const imagesDesktop = moreViews.filter(item => item.type === "NOTEBOOK" || item.type === "DESKTOP");
    const currentDesktop = imagesDesktop.slice(currentSlideCarousel3, currentSlideCarousel3 + imagesPorSlide);
    const imagesGamers = moreViews.filter(item => item.type === "pc" || item.type === "Chair" || item.type === "Mouse");
    const currentGamers = imagesGamers.slice(currentSlideCarousel4, currentSlideCarousel4 + imagesPorSlide);
    const imagesAudio = moreViews.filter(item => item.type === "TV" || item.type === "SPEAKERS" || item.type === "HEADPHONES" || item.type === "MICROPHONE" || item.type === "CAMERAS");
    const currentAudio = imagesAudio.slice(currentSlideCarousel5, currentSlideCarousel5 + imagesPorSlide);
    const imagesElectro = moreViews.filter(item => item.type === "Fridge" || item.type === "Air" || item.type === "Kitchen" || item.type === "Blender" || item.type === "Laundry");
    const currentElectro= imagesElectro.slice(currentSlideCarousel6, currentSlideCarousel6 + imagesPorSlide);
    const imagesPorSlide = 5;

    useEffect(() => {
        dispatch(productsActions.read_products());
        checkLoginStatus();
    }, [dispatch]);

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
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <AntDesign name="bars" style={styles.menu} />
                        </TouchableOpacity>
                        <AntDesign name="shoppingcart" style={styles.logo} />
                    </View>
                    <TextInput style={styles.searchInput} placeholder="Search..." value={searchText} onChangeText={handleSearchChange} />
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
                <View style={{ paddingVertical: 16, paddingHorizontal: 10, marginTop: 32 }}>
                    <Text style={{ fontSize: 20, color: 'white'  }}>More views on Phones & tabs</Text>
                    <ScrollView horizontal>
                        <ScrollView horizontal style={{  }}>
                            {currentPhones.map((item, index) => (
                                <View key={item._id} style={styles.carouselItem}>
                                    <Image source={{ uri: item.cover_photo[0] }} style={styles.carouselImage} />
                                    <Text>{item.brand}</Text>
                                    <Text style={{ paddingHorizontal: 10, textAlign: 'center' }}>{item.title}</Text>
                                    <Text>USD$ {item.price}</Text>
                                    <Text style={{ fontSize: 16, color: 'green' }}>Withdraw it NOW!</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </ScrollView>
                </View>
                <View style={{ paddingVertical: 16, paddingHorizontal: 10, marginTop: 32 }}>
                    <Text style={{ fontSize: 20, color: 'white'  }}>More views on Desktops & Notebooks</Text>
                    <ScrollView horizontal>
                        <ScrollView horizontal style={{  }}>
                            {currentDesktop.map((item, index) => (
                                <View key={item._id} style={styles.carouselItem}>
                                    <Image source={{ uri: item.cover_photo[0] }} style={styles.carouselImage} />
                                    <Text>{item.brand}</Text>
                                    <Text style={{ paddingHorizontal: 10, textAlign: 'center' }}>{item.title}</Text>
                                    <Text>USD$ {item.price}</Text>
                                    <Text style={{ fontSize: 16, color: 'green' }}>Withdraw it NOW!</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </ScrollView>
                </View>
                <View style={{ paddingVertical: 16, paddingHorizontal: 10, marginTop: 32 }}>
                    <Text style={{ fontSize: 20, color: 'white'  }}>More views on Gamers</Text>
                    <ScrollView horizontal>
                        <ScrollView horizontal style={{  }}>
                            {currentGamers.map((item, index) => (
                                <View key={item._id} style={styles.carouselItem}>
                                    <Image source={{ uri: item.cover_photo[0] }} style={styles.carouselImage} />
                                    <Text>{item.brand}</Text>
                                    <Text style={{ paddingHorizontal: 10, textAlign: 'center' }}>{item.title}</Text>
                                    <Text>USD$ {item.price}</Text>
                                    <Text style={{ fontSize: 16, color: 'green' }}>Withdraw it NOW!</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </ScrollView>
                </View>
                <View style={{ paddingVertical: 16, paddingHorizontal: 10, marginTop: 32 }}>
                    <Text style={{ fontSize: 20, color: 'white'  }}>More views on Audio & Video</Text>
                    <ScrollView horizontal>
                        <ScrollView horizontal style={{  }}>
                            {currentAudio.map((item, index) => (
                                <View key={item._id} style={styles.carouselItem}>
                                    <Image source={{ uri: item.cover_photo[0] }} style={styles.carouselImage} />
                                    <Text>{item.brand}</Text>
                                    <Text style={{ paddingHorizontal: 10, textAlign: 'center' }}>{item.title}</Text>
                                    <Text>USD$ {item.price}</Text>
                                    <Text style={{ fontSize: 16, color: 'green' }}>Withdraw it NOW!</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </ScrollView>
                </View>
                <View style={{ paddingVertical: 16, paddingHorizontal: 10, marginTop: 32 }}>
                    <Text style={{ fontSize: 20, color: 'white'  }}>More views on Appliances</Text>
                    <ScrollView horizontal>
                        <ScrollView horizontal style={{  }}>
                            {currentElectro.map((item, index) => (
                                <View key={item._id} style={styles.carouselItem}>
                                    <Image source={{ uri: item.cover_photo[0] }} style={styles.carouselImage} />
                                    <Text>{item.brand}</Text>
                                    <Text style={{ paddingHorizontal: 10, textAlign: 'center' }}>{item.title}</Text>
                                    <Text>USD$ {item.price}</Text>
                                    <Text style={{ fontSize: 16, color: 'green' }}>Withdraw it NOW!</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </ScrollView>
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
    carouselButton: {
        padding: 10,
    },
    carouselItem: {
        justifyContent: 'justify-center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 300,
        width: 200,
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        margin: 10,
    },
    carouselImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});
