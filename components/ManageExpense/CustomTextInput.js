import { View,Text,TextInput,StyleSheet } from "react-native";
import { GlobalStyles } from "../../cosntants/GlobalStyles";


function CustomTextInput({label,style,inputConfig,invalid}){

    const inputStyles = [styles.input]

    if(inputConfig && inputConfig.multiline){
        inputStyles.push(styles.multiline_input)
    }

    if(invalid){
        inputStyles.push(styles.invalid_input);
    }

    return(
        <View style={[styles.input_container,style]}>
            <Text style={[styles.label, invalid && styles.invalid_label]}>{label}</Text>
            <TextInput style={inputStyles} {...inputConfig}/>
        </View>
    )
}

export default CustomTextInput;

const styles = StyleSheet.create({
    input_container:{
        marginHorizontal:4,
        marginVertical: 8,
        
    },
    label:{
        fontSize: 12,
        color:GlobalStyles.COLORS.PRIMARY100,
        marginBottom: 4,
    },
    input:{
        backgroundColor:GlobalStyles.COLORS.PRIMARY100,
        padding: 6,
        borderRadius:6,
        fontSize:18,
        color:GlobalStyles.COLORS.PRIMARY700,
    },
    multiline_input:{
        minHeight:100,
        textAlignVertical:'top',
    },
    invalid_label:{
        color: GlobalStyles.COLORS.ERROR500,
    },
    invalid_input:{
        backgroundColor: GlobalStyles.COLORS.ERROR50,
    }
});