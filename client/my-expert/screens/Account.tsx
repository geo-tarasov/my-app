import React, {FC} from "react";
import {Button, StatusBar, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../config/colors";
import styled from "styled-components/native";
import {useSelector} from "react-redux";
import {useAppDispatch, useTypedSelector} from "../store";
import {login, logout} from "../store/action-creators/user";

const AccountView = styled.View`
  flex: 1;
  background-color: ${COLORS.LIGHT};
  justify-content: center;
  align-items: center;
`;

export const AccountScreen: FC = () => {

  const {id, email, isActivated} = useTypedSelector(state => state.user);

  const dispatch = useAppDispatch();

  return (
      <AccountView>
        <Text style={{ marginBottom: 25 }}>
          Добрый день, {email}
        </Text>
        <Text style={{ marginBottom: 25 }}>
          {isActivated ? 'Ваш аккаунт активирован' : 'Ваш аккаунт не активирован'}
        </Text>
        <Button
          title={'Выйти'}
          color={COLORS.DANGER}
          onPress={() => dispatch(logout())}
        />
      </AccountView>
  )
}