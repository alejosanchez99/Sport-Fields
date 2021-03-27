import { StyleSheet } from "react-native";

const stylesImage = StyleSheet.create({
    image: {
        height: 200,
        width: "80%",
        marginBottom: 10
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        justifyContent: 'center',
        alignItems: 'center',
     }
});

export default stylesImage