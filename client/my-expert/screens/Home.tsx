import axios from 'axios';
import React, {FC} from "react";
import {StatusBar, Alert, Text, FlatList, View, ActivityIndicator, RefreshControl, TouchableOpacity} from 'react-native';
import {Post} from "../components/Post";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "./HomeStack";
import styled from "styled-components/native";
import {COLORS} from "../config/colors";
import {Loading} from "../components/Loading";
import $api from "../http";
import {ILesson} from "../config/types";

interface HomeScreenProps extends NativeStackScreenProps<StackParamList, 'Home'> {
  // other props ...
}

const HomeView = styled.View`
  flex: 1;
  background-color: ${COLORS.LIGHT};
`;

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState<ILesson[]>([]);

  const fetchPosts = () => {
    setIsLoading(true);
    $api.get('/posts')
      .then(({data}) => {
        setItems(data);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить уроки');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <HomeView>
        <Loading />
      </HomeView>
    )
  }

  return (
    <HomeView>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', {id: item.id.toString(), title: item.title})}>
            <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />
    </HomeView>
  );
}
