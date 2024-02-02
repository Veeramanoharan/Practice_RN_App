import { createContext, useReducer } from "react";


export const Expenses_Context = createContext({
    expenses:[],
    addExpense:({amount,date,description}) => {},
    setExpenses:(expenses) => {},
    deleteExpense:(id) => {},
    updateExpense:(id,amount,date,description) => {},
});


function expencesReducer(state,action){
    switch(action.type){
        case 'ADD':{
            return [{...action.payload},...state]
        }
        case 'SET':{
            const sortedPayload = action.payload.reverse();
            return sortedPayload;
        }
        case 'UPDATE':{
            const updateExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id);
            const updatableExpense = state[updateExpenseIndex];
            const updateItem = {...updatableExpense, ...action.payload.data}
            const updatedExpense = [...state];
            updatedExpense[updateExpenseIndex] = updateItem;
            return updatedExpense;
        }
        case 'DELETE':{
            return state.filter((expense) => expense.id != action.payload);
        }
        default:{
            return state;
        }
    }
}

function ExpensesContext_Provider({children}){

   const[expensesState,dispatch] = useReducer(expencesReducer, []);
   
   function addExpense(expenseData){
        dispatch({type:'ADD',payload: expenseData});
   }

   function setExpenses(expenses){
        dispatch({type:'SET',payload: expenses});
   }

   function deleteExpense(id){
        dispatch({type:'DELETE', payload: id})
   }
   function updateExpense(id,expenseData){
        dispatch({type:'UPDATE', payload:{id: id, data: expenseData}})
   }

   const propValues = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
   }

    return(
        <Expenses_Context.Provider value={propValues}>
            {children}
        </Expenses_Context.Provider>
    );

}

export default ExpensesContext_Provider;