import { View,Text,StyleSheet } from "react-native";

function Expenses_Summary({periodName,expAmount}){
    const SumOfExp = expAmount.reduce((sum,expense) => {
        return sum + expense.amount
    },0);

    return(
        <View>
                <Text> {periodName} </Text>
                <Text> ${SumOfExp.toFixed(2)} </Text>
            </View>
    )
}

export default Expenses_Summary;