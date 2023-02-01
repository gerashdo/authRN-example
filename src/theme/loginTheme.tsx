import { StyleSheet } from "react-native";

export const loginTheme = StyleSheet.create({
    formContainer:{
        flex: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
        height: 600,
        bottom: 70,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: "center",
        marginVertical: 20,
    },
    inputLabel:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    input:{
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
    },
    inputIOS:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingBottom: 4,
        marginTop: 10,
        marginBottom: 28,
    },
    loginButtonContainer:{
        alignItems: 'center',
        marginVertical: 10,
    },
    loginButton:{
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
    },
    newAccountText:{
        fontSize: 16,
        color: 'white',
    }
})  