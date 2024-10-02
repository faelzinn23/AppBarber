import {createNativeStackNavigator} from '@react-navigation/native-stack';





const Stack = createNativeStackNavigator();

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import MainTab from './MainTab'

export default () => (
    <Stack.Navigator
        initialRouteName="MainTab"
        screenOptions = {{headerShown:false}}>

        <Stack.Screen
            name="Login"
            component={Login}
            
        />
        <Stack.Screen 
            name="Cadastro" 
            component={Cadastro}
            
        />
        <Stack.Screen 
            name="MainTab" 
            component={MainTab}
        />
        </Stack.Navigator>
)  
            
            