import { useContext, useLayoutEffect } from "react";
import { Text,View,StyleSheet } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../cosntants/GlobalStyles";
import { Expenses_Context } from "../store/Expenses_Context";


function Manage_Expense({route,navigation}){

    const  expensesContext = useContext(Expenses_Context)

 const editedExpenseId = route.params?.expenseId

 const isEditing = !!editedExpenseId   //  double exclamation infront of a value
                                      //   convert it into a boolean in JS
        useLayoutEffect(() => {
            navigation.setOptions({
                title: isEditing ? 'Edit Expense' : 'Add Expense'
            })
        },[isEditing,navigation])
        
        function deleteExpenseHandler(){
            expensesContext.deleteExpense(editedExpenseId);
            navigation.goBack();

        }
        
        function cancelHandler(){
            navigation.goBack();

        }

        function confirmHandler(){
            if(isEditing){
            expensesContext.updateExpense(
                editedExpenseId,
            {
                description:'Test1 updated value',
                amount:67.32,
                date: new Date('2024-01-28'),  
            });
        }
        else{
            expensesContext.addExpense({
                description:'Test',
                amount:18.20,
                date: new Date('2024-01-23'),  
            });
        }
            navigation.goBack();

        }

    return(
        <View style={styles.overall_container}>
            <View style={styles.button_container}>
                <CustomButton style={styles.button} mode="flat" onPress={cancelHandler} > Cancel </CustomButton>
                <CustomButton style={styles.button} onPress={confirmHandler} > {isEditing ? 'Update' : 'Add'} </CustomButton>
            </View>
            {isEditing && (
            <View style={styles.delete_container}>
                <IconButton icon='trash'
                 color={GlobalStyles.COLORS.ERROR500} 
                 size={36} buttonPress={ deleteExpenseHandler} />
            </View>
            )}

        </View>
    )
}

export default Manage_Expense;

const styles = StyleSheet.create({

    overall_container:{
        flex:1,
        padding:20,
        backgroundColor:GlobalStyles.COLORS.PRIMARY800
    },
    delete_container:{
        marginTop:12,
        paddingTop:6,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.COLORS.PRIMARY200,
        alignItems:'center',
    },
    button_container:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
    },
    button:{
        minWidth:100,
        marginHorizontal:6
    }
});