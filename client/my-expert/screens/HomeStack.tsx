import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {HomeScreen} from "./Home";
import {FullPostScreen} from "./FullPost";
import {COLORS} from "../config/colors";
import {StatusBar, View} from "react-native";
import React from "react";

export type StackParamList = {
  Home: undefined;
  FullPost: {
    id: string,
    title: string,
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

export const HomeStack = () => {

  return (
    <View style={{flex: 1}}>
      <Stack.Navigator screenOptions={{

        headerTintColor: COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: "bold"
        },
        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        }

      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Уроки'}} />
        <Stack.Screen name="FullPost" component={FullPostScreen} options={{title: 'Урок'}} />
      </Stack.Navigator>
    </View>
  )
}