import { View,StyleSheet,ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../cosntants/GlobalStyles";

function LoadingSpinner(){
    return(
        
        <View style={styles.container}>
            <ActivityIndicator size='large' color='white' />
        </View>
    )}

export default LoadingSpinner;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        backgroundColor: GlobalStyles.COLORS.PRIMARY700
    }
})