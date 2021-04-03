import { StyleSheet } from "react-native";

const stylesImage = StyleSheet.create({
    image: {
        height: 200,
        width: "80%",
        marginBottom: 10
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageLogin: {
        height:100,
        width: "80%",
        marginVertical:20
    }, 
    backgroundImageLogin: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
    },
});

export default stylesImage