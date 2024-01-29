import {View} from 'react-native';
import Expenses_List from './Expenses_List';
import Expenses_Summary from './exp_summary';


function Expenses_Output({expenses,exp_period}){
    return(
        <View>
            <Expenses_Summary periodName={exp_period} expAmount={expenses}/>
            <Expenses_List />
          
        </View>
    )
};

export default Expenses_Output;