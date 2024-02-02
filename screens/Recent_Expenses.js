import { useContext, useEffect, useState } from "react";
import Expenses_Output from "../components/ExpensesOutput/Expenses_Output";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Expenses_Context } from "../store/Expenses_Context";
import { getExpense } from "../util/API_Services";
import { getDateMinusDays } from "../util/FormattedDate";

function Recent_Expenses(){

    const[isFetchingState, setIsFetchingState] = useState(true);
    const [error,setError] = useState()
    const expensesContext = useContext(Expenses_Context);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const currentDate = new Date();
        const resultsBefore = getDateMinusDays(currentDate, 7);

        return expense.date > resultsBefore;
    });

    useEffect(() => {
       async function fetchExpenses(){
          try{
            const expense =  await getExpense();
            expensesContext.setExpenses(expense);
          }
          catch(error){
            setError('Could not fetch expenses!');
          }
          setIsFetchingState(false);
        }
        fetchExpenses();
    },[]);

    if(isFetchingState){
      return <LoadingSpinner />
    }

    if(error && !isFetchingState){
        return <ErrorOverlay errorMessage={error} />
    }

    return (
        <Expenses_Output expenses={recentExpenses} 
            expensesPeriod='Last 7 days' 
            fallbackText = "No expenses registered for the last 7 days"
        />
    );

}

export default Recent_Expenses;

