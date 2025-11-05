import {View, Text, StyleSheet} from 'react-native';
import upcoming from "./homepage_components/upcoming";
import Upcoming from './homepage_components/upcoming';


export default function HomeScreen(){
    return(
        <View style= {styles.container}>
            <Text></Text>
        <Upcoming/>

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