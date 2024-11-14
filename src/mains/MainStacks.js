import {createNativeStackNavigator} from '@react-navigation/native-stack';





const Stack = createNativeStackNavigator();

import Login from '../pages/login/Login';
import Cadastro from '../pages/login/Cadastro';
import MainTab from './MainTab'
import MainClientTab from './MainClientTab';
import CadastraProduto from '../pages/admin/cadastra/CadastraProduto';
import CadastraServico from '../pages/admin/cadastra/CadastraServico';
import Produtos from '../pages/admin/Produtos';


export default () => (
    <Stack.Navigator
        initialRouteName="Login"
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
        <Stack.Screen 
            name="CadastraProduto" 
            component={CadastraProduto}
        />
        <Stack.Screen 
            name="CadastraServico" 
            component={CadastraServico}
        />


        </Stack.Navigator>
)  
            
            