import {View,StyleSheet,Text} from 'react-native';
import { DUMMY_EXPENSES } from '../../cosntants/DummyExpenses';
import { GlobalStyles } from '../../cosntants/GlobalStyles';
import Expenses_List from './Expenses_List';
import Expenses_Summary from './Expenses_Summary';



function Expenses_Output({expenses,expensesPeriod,fallbackText}){

    let content = <Text style={styles.fallbackText}>{fallbackText}</Text>

    if(expenses.length > 0){
        content = <Expenses_List expenses={expenses}/>
    }

    return(
        <View style={styles.container}>
            <Expenses_Summary periodName={expensesPeriod} expAmount={expenses}/>
            {content}
          
        </View>
    )
};

export default Expenses_Output;

const styles = StyleSheet.create({
    container:{
        padding:24,
        backgroundColor:GlobalStyles.COLORS.PRIMARY700,
        flex:1
    },
    fallbackText:{
        color:'white',
        fontSize:16,
        marginTop:50,
        textAlign:'center',
    }
});