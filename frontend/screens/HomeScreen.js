import {View, Text, StyleSheet} from 'react-native';

export default function HomeScreen(){
    return(
        <View style= {StyleSheet.container}>
            <Text> Home Screen</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#E7E7DD',
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        fontSize: 18,
        color: "#333",
    },
});