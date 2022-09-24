import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import Post from '../components/Post';

import TypicodeCom, { Post as PostType } from "../models/TypicodeCom";

const typicodeCom = new TypicodeCom()

export default function PostsScreen() {

  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    typicodeCom.getPosts().then(setPosts)
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.posts}>
          {posts.map(post => <Post key={post.id} data={post}/>)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posts: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    // width: '100%',
    paddingVertical: 10,
  },
});
