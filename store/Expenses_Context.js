import { createContext, useReducer } from "react";
import { DUMMY_EXPENSES } from "../cosntants/DummyExpenses";



export const Expenses_Context = createContext({
    expenses:[],
    addExpense:({amount,date,description}) => {},
    deleteExpense:(id) => {},
    updateExpense:(id,amount,date,description) => {},
});


function expencesReducer(state,action){
    switch(action.type){
        case 'ADD':{
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id},...state]
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

   const[expensesState,dispatch] = useReducer(expencesReducer, DUMMY_EXPENSES);
   
   function addExpense(expenseData){
        dispatch({type:'ADD',payload: expenseData});
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