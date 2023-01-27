import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Loading from '../components/Loading';
import { View } from 'react-native';
import axios from 'axios';

const PostImage = styled.Image`
    border-radius: 10px;
    width: 100%;
    height: 250px;
    margin-bottom: 12px;
`

const PostText = styled.Text`
    font-size: 18px;
    line-height: 24px;
`

const FullPost = ({ route, navigation }) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {id, title} = route.params;

    useEffect(() => {
        navigation.setOptions({
            title
        })
        setIsLoading(true)

        axios.get(`https://5c3755177820ff0014d92711.mockapi.io/articles/${id}`)
            .then(({data}) => {
                setData(data)
            })
            .catch(err => {
                console.log('error')
                Alert.alert('Error')
            })
            .finally(() => setIsLoading(false))
    }, [])

    if(isLoading) return <Loading />

    return (
        <View style={{ padding: 20 }}>
            <PostImage source={{ uri: data?.avatar ?? data?.imageUrl }} />
            <PostText>{data?.name ?? data?.text}</PostText>
        </View>
    )
}

export default FullPost