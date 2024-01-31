import { View,StyleSheet,Pressable,Text } from "react-native";
import { GlobalStyles } from "../../cosntants/GlobalStyles";
import FormattedDate from "../../util/FormattedDate";
import { useNavigation } from "@react-navigation/native";


function ExpenseItem({id,description,date,amount}){

    const navigation = useNavigation();

    function expensePressHandler(){
        navigation.navigate('Manage expense',{
            expenseId: id
        });
    }

    return(
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.expense_item}>
                <View>
                    <Text style={[styles.text_base,styles.description]}>{description}</Text>
                    <Text style={styles.text_base}>{FormattedDate(date)}</Text>
                </View>
                <View style={styles.amount_container}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>

        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    expense_item:{
        padding:12,
        marginVertical:8,
        backgroundColor:GlobalStyles.COLORS.PRIMARY500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:5,
        elevation:2,
        shadowColor:GlobalStyles.COLORS.GRAY500,
        shadowRadius:3,
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.4
    },
    text_base:{
        color:GlobalStyles.COLORS.PRIMARY50,
    },
    description:{
        marginBottom:5,
        fontSize:18,
        fontFamily:'BOLD-FONT',
        // fontWeight:'bold'
    },
    amount_container:{
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 3,
        minWidth:70
    },
    amount:{
        color:GlobalStyles.COLORS.PRIMARY500,
        fontFamily:'BOLD-FONT'
    },
    pressed:{
        opacity:0.75
    }

});