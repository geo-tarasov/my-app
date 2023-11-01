import {ActivityIndicator, View} from "react-native";
import {FC} from "react";
import {COLORS} from "../config/colors";
import styled from "styled-components/native";

export const LoaderView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Loading: FC = () => {
  return (
    <LoaderView>
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
    </LoaderView>
  );
};