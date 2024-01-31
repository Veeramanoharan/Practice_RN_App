import { useContext } from "react";
import Expenses_Output from "../components/ExpensesOutput/Expenses_Output";
import { Expenses_Context } from "../store/Expenses_Context";
import { getDateMinusDays } from "../util/FormattedDate";

function Recent_Expenses(){

    const expensesContext = useContext(Expenses_Context);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const currentDate = new Date();
        const resultsBefore = getDateMinusDays(currentDate, 7);

        return expense.date > resultsBefore;
    });

    return (
        <Expenses_Output expenses={recentExpenses} 
            expensesPeriod='Last 7 days' 
            fallbackText = "No expenses registered for the last 7 days"
        />
    );

}

export default Recent_Expenses;

