import { useContext, useLayoutEffect, useState } from "react";
import { View,StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../cosntants/GlobalStyles";
import { Expenses_Context } from "../store/Expenses_Context";
import ExpensesForm from "../components/ManageExpense/ExpensesForm";
import { deleteExpense, postExpense, updateExpense } from "../util/API_Services";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function Manage_Expense({route,navigation}){

 const [isSubmmitting,setIsSubmitting] = useState(false);   
 const  expensesContext = useContext(Expenses_Context);
 const [error,setError] = useState();

 const editedExpenseId = route.params?.expenseId;

 const isEditing = !!editedExpenseId;   //  double exclamation infront of a value
                                      //   convert it into a boolean in JS
 
 const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId)                                     


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[isEditing,navigation]);

        
        async function deleteExpenseHandler(){
            setIsSubmitting(true);
            try{
                expensesContext.deleteExpense(editedExpenseId);
                await deleteExpense(editedExpenseId);
                navigation.goBack();
            }
            catch(error){
                setError('Could not delete the expense! Please try again later');
                setIsSubmitting(false);
            }

        }
        
        function cancelHandler(){
            navigation.goBack();

        }

        async function confirmHandler(expenseData){
            setIsSubmitting(true);
            try{
                if(isEditing){
                    expensesContext.updateExpense(
                        editedExpenseId, expenseData);
                     await updateExpense(editedExpenseId,expenseData);
                }
                else{
                   const id = await postExpense(expenseData);
                    expensesContext.addExpense({...expenseData, id: id});
                }
                navigation.goBack();
            }
            catch(error){
                setError(`Couldn't save data! please try again later`);
                setIsSubmitting(false);
            }
            
        }


        if(isSubmmitting){
            return <LoadingSpinner />
        }

       

        if(error && !isSubmmitting){
            return <ErrorOverlay errorMessage={error} />
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