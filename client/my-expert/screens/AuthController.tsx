import React, {FC} from 'react';
import {useTypedSelector} from "../store";
import {TabNavigator} from "./TabNavigator";
import {AuthForm} from "./AuthForm";
import {View} from "react-native";

export const AuthController: FC = () => {

  const isAuth = useTypedSelector(store => store.isAuth)

  return (
    <View style={{ flex: 1 }}>
      {
        isAuth ? (<TabNavigator />) : (<AuthForm />)
      }
    </View>
  );
};