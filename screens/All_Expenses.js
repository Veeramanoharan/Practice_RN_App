import { useContext } from "react";
import {StyleSheet } from "react-native";
import Expenses_Output from "../components/ExpensesOutput/Expenses_Output";
import { Expenses_Context } from "../store/Expenses_Context";


function All_Expenses(){

   const expensesContext = useContext(Expenses_Context);

    return(
        <Expenses_Output expenses={expensesContext.expenses} 
            expensesPeriod='Total' 
            fallbackText={'No expenses registered'}
        />
    )
}

export default All_Expenses;

const styles = StyleSheet.create({

});