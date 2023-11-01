import React, {FC} from 'react';
import styled from "styled-components/native";
import {ActivityIndicator, Alert, FlatList, RefreshControl, StatusBar, TouchableOpacity, View} from "react-native";
import axios from "axios";
import {Loading} from "../components/Loading";
import {Post} from "../components/Post";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "./HomeStack";
import {IBlocks, ILesson} from "../config/types";
import {COLORS} from "../config/colors";
import $api from "../http";
import {PostBlock} from "../components/PostBlock";

interface FullPostScreenProps extends NativeStackScreenProps<StackParamList, 'FullPost'> {
  // other props ...
}

const FullPostView = styled.View`
  flex: 1;
  background-color: ${COLORS.LIGHT};
`;

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const FullPostScreen: FC<FullPostScreenProps> = ({ route, navigation }) => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<IBlocks>({ blocks: [] });
  const { id, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title
    })
    setIsLoading(true);
    $api.get<ILesson>('/posts/' + id)
      .then(({data}) => {
        console.log(JSON.parse(data.blocks));
        setData(JSON.parse(data.blocks));
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить урок');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <FullPostView>
      <FlatList
        data={data.blocks}
        renderItem={({ item }) => (
          <View style={{padding: 20}}>
            <PostBlock id={item.id} type={item.type} content={item.content} key={item.id} />
          </View>
        )}
      />
    </FullPostView>
  );
};