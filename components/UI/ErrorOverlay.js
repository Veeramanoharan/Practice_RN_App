import { View,StyleSheet,Text } from "react-native";
import { GlobalStyles } from "../../cosntants/GlobalStyles";

function ErrorOverlay({errorMessage}){
    return(
        <View style={styles.container}>
            <Text style={[styles.text,styles.title]}>An error occured!</Text>
            <Text style={styles.text}>{errorMessage}</Text>
            {/* <CustomButton onPress={onConfirm} style={styles.button}>Okay</CustomButton> */}
        </View>
    )}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.COLORS.PRIMARY700
    },
    text:{
        textAlign:'center',
        marginBottom: 7,
        color:'white'
    },
    title:{
        fontSize: 18,
        fontFamily:'BOLD-FONT',
    },
    button:{
      marginHorizontal: 130,
      marginVertical: 20,
    }
})