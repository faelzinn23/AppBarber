import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/admin/HomeScreen";
import Profile from "../pages/admin/Profile";
import Agendamentos from "../pages/admin/Agenda/Agendamentos";
import Produtos from "../pages/admin/Produtos";
import {Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();
const MainTab = () => {
 
  return (
    <Tab.Navigator 
    screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:'blue',
      tabBarActiveBackgroundColor:'lightgrey',
      tabBarInactiveTintColor:'black'

    }}>
        <Tab.Screen 
          name ="HomeScreen" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({size,color}) => <Ionicons name="home-outline" size={size} color={color} />,
            tabBarLabel:'Inicio',
            
          }}
        />


        <Tab.Screen 
          name ="Agendamentos" 
          component={Agendamentos} 
          options={{
            tabBarIcon: ({size,color}) => <Ionicons name='calendar-outline' size={size} color={color} />,
            tabBarLabel:'Agenda',
          }}
          />

          <Tab.Screen 
            name ="Produtos" 
            component={Produtos}
            options={{
              tabBarIcon: ({size,color}) => <Ionicons name='list-outline' size={size} color={color} />,
              tabBarLabel:'Serviços',
            }} 
          />
        <Tab.Screen 
          name ="Profile" 
          component={Profile} 
          options={{
            tabBarIcon: ({size,color}) => <Ionicons name='person-outline' size={size} color={color} />,
            tabBarLabel:'Perfil',
          }}
        />
      </Tab.Navigator>
  
    );
  

};
export default MainTab;
