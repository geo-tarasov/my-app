import styled from 'styled-components/native';
import {FC} from "react";

interface PostProps {
  title: string;
  imageUrl: string;
  createdAt: number;
}

const PostView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`;

const PostTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;

const PostDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

const truncateTitle = (str: string): string => {
  if (str.length >= 50) {
    return str.substring(0, 50) + '...'
  }

  return str;
}

export const Post: FC<PostProps> = ({ title, imageUrl, createdAt }) => {
    return (
        <PostView>
            <PostImage source={{ uri: imageUrl}} />
            <PostDetails>
                <PostTitle>{truncateTitle(title)}</PostTitle>
                <PostDate>{new Date(createdAt).toLocaleDateString()}</PostDate>
            </PostDetails>
        </PostView>
    )
}