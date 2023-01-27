import { View, StatusBar, Alert, FlatList,  RefreshControl, TouchableOpacity } from 'react-native';
import { useState, useEffect  } from 'react';
import Post from '../components/Post';
import axios from 'axios'
import Loading from '../components/Loading';

export default function Home({navigation}) {

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPosts = () => {
      setIsLoading(true)

      axios.get('https://5c3755177820ff0014d92711.mockapi.io/articles')
        .then(({data}) => {
            setItems(data.filter(x => x.name))
        })
        .catch(err => {
            Alert.alert('Error')
        })
        .finally(() => setIsLoading(false))
  }
  
  useEffect(fetchPosts, [])

  if(isLoading) return <Loading />

  return (
    <View>
      <FlatList 
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.name })}>
            <Post title={item.name} imageUrl={item.avatar} createdAt={item.createdAt} key={item.id} />
          </TouchableOpacity>
        )}
      />
      <StatusBar theme="auto" />
    </View>
  );
}