import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../views/Home';
import RegisterScreen from '../views/Register';
import LoginScreen from '../views/Login';
import HomeAppliances from '../views/HomeAppliances';
import TechsPage from '../views/TechsPage';
import GamersPage from '../views/GamersPage';
import ResultProducts from '../views/ResultProducts'
import ProductDetails from '../views/ProductDetails'
import ProductDetailView from '../views/ProductDetailView';
import SignOut from '../views/SignOut';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeAppliances" component={HomeAppliances} options={{ headerShown: false }}/>
            <Stack.Screen name="GamersPage" component={GamersPage} options={{ headerShown: false }} />
            <Stack.Screen name="TechsPage" component={TechsPage} options={{ headerShown: false }} />
            <Stack.Screen name="ResultProducts" component={ResultProducts} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetailView" component={ProductDetailView} options={{ headerShown: false }} />
            <Stack.Screen name="SignOut" component={SignOut} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default StackNavigator