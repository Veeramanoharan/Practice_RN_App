import { useContext, useLayoutEffect } from "react";
import { View,StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../cosntants/GlobalStyles";
import { Expenses_Context } from "../store/Expenses_Context";
import ExpensesForm from "../components/ManageExpense/ExpensesForm";


function Manage_Expense({route,navigation}){

 const  expensesContext = useContext(Expenses_Context)

 const editedExpenseId = route.params?.expenseId

 const isEditing = !!editedExpenseId   //  double exclamation infront of a value
                                      //   convert it into a boolean in JS
 const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId)                                     


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

        function confirmHandler(expenseData){
            if(isEditing){
            expensesContext.updateExpense(
                editedExpenseId, expenseData);
        }
        else{
            expensesContext.addExpense(expenseData);
        }
            navigation.goBack();

        }

    return(
        <View style={styles.overall_container}>
            <ExpensesForm 
                onCancel={cancelHandler} onSubmit={confirmHandler}
                submitButtonLabel={isEditing ?'Update' : 'Add'}
                defaultValue = {selectedExpense}
                />
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
    
});