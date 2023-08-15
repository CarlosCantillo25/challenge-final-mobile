import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home.js';
import HomeAppliances from '../views/HomeAppliances.js';
import TechsPage from '../views/TechsPage.js';
import GamersPage from '../views/GamersPage.js';
import ProductDetails from '../views/ProductDetails.js';
const Stack = createStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown:false }}>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Home&Appliances" component={HomeAppliances} options={{ headerShown: false }} />
            <Stack.Screen name="TechsPage" component={TechsPage} options={{ headerShown: false }} />
            <Stack.Screen name="GamersPage" component={GamersPage} options={{ headerShown: false }}/>
            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}
export default StackNavigator