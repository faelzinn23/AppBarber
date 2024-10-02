import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/HomeScreen";
import Profile from "../pages/Profile";
import Agendar from "../pages/Agendar";
import Agendamentos from "../pages/Agendamentos";
import Produtos from "../pages/Produtos";

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
