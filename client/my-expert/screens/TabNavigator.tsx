import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {HomeStack} from "../screens/HomeStack";
import {NavigationContainer} from "@react-navigation/native";
import {AccountScreen} from "./Account";
import {COLORS} from "../config/colors";
import { MaterialIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

export type TabParamList = {
    HomeTab: undefined;
    AccountTab: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: COLORS.ACCENT_2,
              tabBarInactiveTintColor: COLORS.DARK_05,
              tabBarStyle: {
                backgroundColor: COLORS.WHITE,
                height: 45,
              }
            }}>
                <Tab.Screen
                  name={'HomeTab'}
                  component={HomeStack}
                  options={{
                    title: 'Главная',
                    tabBarIcon: ({focused, color, size}) => (
                      <MaterialIcons name={'home'} size={size} color={color} />
                    ),
                  }}
                />
                <Tab.Screen
                  name={'AccountTab'}
                  component={AccountScreen}
                  options={{
                    title: 'Профиль',
                    tabBarIcon: ({focused, color, size}) => (
                      <MaterialCommunityIcons name="account" size={size} color={color} />
                    ),
                  }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

























