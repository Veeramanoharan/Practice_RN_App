import { View,Text,StyleSheet } from "react-native";
import { GlobalStyles } from "../../cosntants/GlobalStyles";

function Expenses_Summary({periodName,expAmount}){
    const SumOfExp = expAmount.reduce((sum,expense) => {
        return sum + expense.amount
    },0);

    return(
        <View style={styles.container}>
                <Text style={styles.period}> {periodName} </Text>
                <Text style={styles.sum}> ${SumOfExp.toFixed(2)} </Text>
            </View>
    )
}

export default Expenses_Summary;

const styles = StyleSheet.create({
    container:{
        padding: 7,
        backgroundColor:GlobalStyles.COLORS.PRIMARY50,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    period:{
        fontSize:14,
        color:GlobalStyles.COLORS.PRIMARY400,
        fontFamily:'PRIMARY-FONT'
    },
    sum:{
        fontWeight: 'bold',
        fontSize:14,
        color:GlobalStyles.COLORS.PRIMARY500,
        fontFamily:'BOLD-FONT'
    }
});