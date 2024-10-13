import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/cliente/Home_cli";
import Profile from "../pages/cliente/Profile_cli";
import Agendar from "../pages/cliente/Agendar";
import Agendamentos from "../pages/cliente/Historico";
import Produtos from "../pages/cliente/Produtos_cli";

const Tab = createBottomTabNavigator();
const MainTab = () => {
 
  return (
    <Tab.Navigator>
        <Tab.Screen name ="HomeScreen" component={HomeScreen} />
        <Tab.Screen name ="Produtos" component={Produtos} />
        <Tab.Screen name ="Agendar" component={Agendar} />
        <Tab.Screen name ="Agendamentos" component={Agendamentos} />
        <Tab.Screen name ="Profile" component={Profile} />
      </Tab.Navigator>
  
    );
  

};
export default MainTab;