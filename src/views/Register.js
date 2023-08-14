import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from 'axios';
import { apiUrl, endpoints } from '../../utils/api';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { Permissions, ImagePicker } from "expo";

export default function RegisterScreen(props) {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");
    const [location, setLocation] = useState("");

    const [image, setImage] = useState("https://via.placeholder.com/150");


    function handleFormSubmit(event){
        event.preventDefault()
        
        if (!email || !photo || !password || !location) {
          alert('Please complete all fields.');
          return;
        }
        
        const formData = new FormData();
        formData.append('email', email);
        formData.append('photo', photo);
        formData.append('password', password);
        formData.append('location', location);

          axios.post(apiUrl + endpoints.register, formData)
          .then(res => {
            alert('New user creation successful')
            navigation.navigate('Login')
          })
          .catch(function(error) {
          console.log(error.response)
          alert('Something went wrong, try again later')
        })
      }

      handleChooseFile = async () => {

        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        )

        if(resultPermission) {
            console.log('aaaa')
        }
      }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.navbar}>
                    <View style={styles.nav1}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <AntDesign name="bars" style={styles.menu} />
                        </TouchableOpacity>
                        <AntDesign name="shoppingcart" style={styles.logo} />
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
                        <Text style={styles.label}>Photo</Text>
                        <View>
                            <TouchableOpacity onPress={handleChooseFile} style={styles.photo}>
                                <Image style={{alignSelf: 'center', height: 150, width: 150}} source= {{uri: image}}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Location</Text>
                        <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
                        <TouchableOpacity style={styles.registerButton} onPress={handleFormSubmit} >
                            <Text style={styles.buttonText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.linkText}> Already have an account?
                        <TouchableOpacity onPress={() => { navigation.navigate("Login"); }}  >
                            <Text style={styles.link}> Log in</Text>
                        </TouchableOpacity>
                    </Text>

                    <Text style={styles.linkText}> Go back to
                        <TouchableOpacity style={styles.link} onPress={() => { navigation.navigate("Home"); }} >
                            <Text style={styles.link}> Home page</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
    },
    formContainer: {
        width: "80%",
        marginTop: "20%",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 2,
        borderColor: "#007BFF",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    linkText: {
        fontSize: 12,
        marginBottom: 5,
    },
    link: {
        color: "#007BFF",
    },
});