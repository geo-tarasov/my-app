import React, {FC, useState} from 'react';
import {View, Text, TextInput, Button} from "react-native";
import {COLORS} from "../config/colors";
import styled from "styled-components/native";
import {login} from "../store/action-creators/user";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../store";

const StyledInput = styled.TextInput`
  width: 250px;
  height: 40px;
  margin-top: 20px;
  borderWidth: 3px;
  border-radius: 20px;
  border-color: ${COLORS.WHITE};
  background-color: ${COLORS.WHITE};
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const AuthForm: FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (email === '' || password === '') {
      setError("Введите логин и пароль");
      return;
    }
    try {
      dispatch(login(email, password, setError));
    } catch (e) {
      console.log(e)
    }

  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.PRIMARY,
    }}>
      <Text style={{
        color: COLORS.WHITE,
        fontWeight: 'bold',
        fontSize: 34,
      }}>
        MyApp
      </Text>
      <View style={{ marginTop: 40 }}>
        <StyledInput placeholder={'Логин'} value={email} onChangeText={e => setEmail(e)} />
        <StyledInput placeholder={'Пароль'} value={password} onChangeText={e => setPassword(e)} secureTextEntry={true} />
      </View>
      <View style={{ marginTop: 40 }}>
        <Button title={'Войти'} color={COLORS.SUCCESS} onPress={handleSubmit} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ color: COLORS.DANGER }}>{error}</Text>
      </View>
    </View>
  );
};



























