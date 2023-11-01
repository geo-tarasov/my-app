import React, {FC} from "react";
import {View, Text, FlatList} from "react-native";
import styled from "styled-components/native";
import {COLORS} from "../config/colors";
import YouTube from 'react-native-youtube-iframe';

interface PostBlockProps {
  id: number;
  type: string;
  content: string;
}

const BlockView = styled.View`
  flex: 1;
`;

const BlockText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

const BlockImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

export const PostBlock: FC<PostBlockProps> = ({ id, type, content }) => {

  switch (type) { // ФЛЕТ ЛИСТ БУДЕТ ОДИН ОБЩИЙ ДЛЯ ВСЕХ БЛОКОВ У КОТОРОГО VIEW со style={{padding: 20}} !!!
    case 'text':
      return (
        <BlockView>
          <BlockText>
            {content}
          </BlockText>
        </BlockView>
      )
    case 'photo':
      return (
        <BlockView>
          <BlockImage source={{uri: content}} />
        </BlockView>
      )
    case 'video':
      return (
        <BlockView>
          <YouTube
            videoId={content}
            height={300}
            play={true}
            onChangeState={(event) => console.log(event)}
            onReady={() => console.log('ready')}
            onError={(e) => console.log(e)}
            onPlaybackQualityChange={(q) => console.log(q)}
            volume={50}
          />
        </BlockView>
      )
    default:
      return (
        <BlockView>
        </BlockView>
      )
  }
}