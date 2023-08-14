import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../views/Home.js';
import DrawerNavigator from './NavigatorsDrawer.js';
import HomeAppliances from '../views/HomeAppliances.js';
import TechsPage from '../views/TechsPage.js';
import GamersPage from '../views/GamersPage.js';
import ProductDetails from '../views/ProductDetails.js';
import ProductDetailView from '../views/ProductDetailView.js';

const Stack = createStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
           }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Home&Appliances" component={HomeAppliances} />
            <Stack.Screen name="TechsPage" component={TechsPage} />
            <Stack.Screen name="GamersPage" component={GamersPage}/>
            <Stack.Screen name="ProductDetails" component={ProductDetails}/>
            <Stack.Screen name="ProductDetailView" component={ProductDetailView}/>
        </Stack.Navigator>
    )
}

export default StackNavigator