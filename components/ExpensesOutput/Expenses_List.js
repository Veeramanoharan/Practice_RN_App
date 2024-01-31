import { Text,FlatList,StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData){
    return (
        <ExpenseItem {...itemData.item}/>
    )
}

function Expenses_List({expenses}){
    return(
        <FlatList data={expenses} 
            renderItem={renderExpenseItem}
             keyExtractor={(item) => item.id}/>
    )
}

export default Expenses_List;