import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import AntDesign from "react-native-vector-icons/AntDesign";
import menu from '../../assets/icono-menu.png';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";

export default function RegisterScreen(props) {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (text) => {
        setEmail(text);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleRegisterClick = async () => {
        try {
            const response = await fetch(
                "",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, photo, password }),
                }
            );

            const data = await response.json();
            showMessage({
                message: "Success",
                description: "User register!",
                type: "success",
                animated: true,
                animationDuration: 800,
                icon: { icon: "success", position: "right" },
                style: { paddingVertical: 20, paddingHorizontal: 80 },
            });
            console.log("Registro exitoso:", data);
        } catch (error) {
            console.log("Error al registrar:", error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <AntDesign name="bars" style={styles.logo} />
                        
                    </TouchableOpacity>
                    <AntDesign name="shoppingcart" style={styles.logo} />
                </View>
                <View style={styles.content}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={handleEmailChange}
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={handleRegisterClick}
                        >
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.linkText}>
                        Already have an account?
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Login");
                            }}
                        >
                            <Text style={styles.link}>Sin up</Text>
                        </TouchableOpacity>
                    </Text>

                    <Text style={styles.linkText}>
                        Go back to
                        <TouchableOpacity
                            style={styles.link}
                            onPress={() => {
                                navigation.navigate("Home");
                            }}
                        >
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
        width: "100%",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 2,
        borderColor: "#448cdf",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: "#448cdf",
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
        color: "#448cdf",
    },
});