import {createNativeStackNavigator} from '@react-navigation/native-stack';





const Stack = createNativeStackNavigator();

import Login from '../pages/login/Login';
import Cadastro from '../pages/login/Cadastro';
import MainTab from './MainTab'
import MainClientTab from './MainClientTab';

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
        <Stack.Screen 
            name="MainClientTab" 
            component={MainClientTab}
        />
        </Stack.Navigator>
)  
            
            