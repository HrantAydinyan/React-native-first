import { View, ActivityIndicator, Text } from "react-native"

const Loading = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ActivityIndicator size="large" color="#0000ff"  />
            <Text style={{  marginTop:15  }}>Loading...</Text>
        </View>
    )
}

export default Loading