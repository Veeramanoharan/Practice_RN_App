import axios from "axios";

const BACKEND_URL = 'https://react-native-app-79412-default-rtdb.firebaseio.com';

export async function postExpense(expenseData){
  const response = await axios.post( BACKEND_URL + '/expenses.json', expenseData);
  const firbaseId = response.data.name;
  return firbaseId;
}

export async function getExpense(){
  const response = await axios.get( BACKEND_URL +'/expenses.json');

//   console.log(response,"resp from get method");

  const expenses = [];

  for (const key in response.data){
    const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description
    }
    expenses.push(expenseObj)
  }

  return expenses;
}


export function updateExpense(id,expenseData){
   return axios.put(BACKEND_URL + `/expenses/${id}.json`,expenseData);
}

export async function deleteExpense(id){
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

