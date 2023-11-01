import React from "react";
import {StatusBar, View} from "react-native";
import {HomeStack} from "./screens/HomeStack";
import {TabNavigator} from "./screens/TabNavigator";
import {COLORS} from "./config/colors";
import {SafeAreaView} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {store, useTypedSelector} from "./store";
import {AuthForm} from "./screens/AuthForm";
import {AuthController} from "./screens/AuthController";

export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <AuthController />
        <StatusBar backgroundColor={COLORS.PRIMARY} />
      </SafeAreaView>
    </Provider>
  )
}