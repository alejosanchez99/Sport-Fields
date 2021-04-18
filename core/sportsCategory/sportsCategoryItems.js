export const generateFirstOptions = () => {
    return [
        {
            name: "Fútbol",
            uri: require("../../assets/images/futbol.png"),
            onPress: () => console.log("prueba")
        },
        {
            name: "Tenis",
            uri: require("../../assets/images/tenis.png"),
            onPress: () => console.log("prueba")
        },
        {
            name: "Baloncesto",
            uri: require("../../assets/images/baloncesto.png"),
            onPress: () => console.log("prueba")
        }
    ]
}

export const generateSecondOptions = () => {
    return [
        {
            name: "Fútbol Americano",
            uri: require("../../assets/images/futbol-americano.png"),
            onPress: () => console.log("prueba")
        },
        {
            name: "Golf",
            uri: require("../../assets/images/golf.png"),
            onPress: () => console.log("prueba")
        }
    ]
}

export const getAllOptionsSportsCategory = () => {
    const menuFirstOptions = generateFirstOptions()
    const menuSecondOptions = generateSecondOptions()

    return [
        ...menuFirstOptions,
        ...menuSecondOptions
    ]
}