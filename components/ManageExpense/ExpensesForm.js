import { useState } from "react";
import { View,Text,StyleSheet, Alert } from "react-native";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "../UI/CustomButton";
import FormattedDate from "../../util/FormattedDate";
import { GlobalStyles } from "../../cosntants/GlobalStyles";

function ExpensesForm({onCancel,onSubmit,submitButtonLabel,defaultValue}){
    const [inputs,setInputs] = useState({
        amount:{ value: defaultValue ? defaultValue.amount.toString() : '',
         isValid: true },
        date: { value: defaultValue ? FormattedDate(defaultValue.date) : '',
         isValid: true },
        description: {value: defaultValue ? defaultValue.description : '',
         isValid: true},
    });

    function submitHandler(){
       const expenseData = {
        amount: +inputs.amount.value,   // + infront changes the string to number
        date: new Date(inputs.date.value),
        description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            setInputs((prev) => {
                return {
                    amount: { value: prev.amount.value, isValid: amountIsValid},
                    date: { value: prev.date.value, isValid: dateIsValid},
                    description: { value: prev.description.value, isValid: descriptionIsValid}
                }
            })
            return;
        }
        onSubmit (expenseData)
    }


    function inputChangedHandler(inputIdentifier,enteredValue){
            setInputs((prev) => {
                return{
                    ...prev,
                    [inputIdentifier]: { value: enteredValue, isValid: true },
                }
            });
    }

    const formIsInvalid = !inputs.amount.isValid ||
                             !inputs.date.isValid ||
                              !inputs.description.isValid;

    return(
        <View style={styles.form_container}>
            <Text style={styles.title}>Your Expense</Text>
            
            <View style={styles.input_container}>
                
                <CustomTextInput style={styles.row_input}
                    label='Amount' 
                    invalid={!inputs.amount.isValid}
                    inputConfig={{
                        keyboardType:'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this,'amount'),
                        value: inputs.amount.value,
                }}/>


                <CustomTextInput style={styles.row_input} 
                    label='Date'
                    invalid={!inputs.date.isValid}
                    inputConfig={{
                        placeholder:'YYYY-MM-DD',
                        maxLength:10,
                        onChangeText: inputChangedHandler.bind(this,'date'),
                        value: inputs.date.value
                }}/>
            </View>     
            <CustomTextInput  
               label='Description'
               invalid={!inputs.description.isValid}
               inputConfig={{
                multiline:true,
                onChangeText: inputChangedHandler.bind(this,'description'),
                value: inputs.description.value
            }}/>

            { formIsInvalid && 
                <Text style={styles.error_text}>
                    Please check the entered data
                </Text>
            } 

            <View style={styles.button_container}>
                <CustomButton style={styles.button} 
                    mode="flat" onPress={onCancel} > 
                        Cancel </CustomButton>
                <CustomButton style={styles.button} 
                    onPress={submitHandler} > 
                    {submitButtonLabel} </CustomButton>
            </View>
        </View>
    )
}

export default ExpensesForm;


const styles = StyleSheet.create({
    input_container:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    row_input:{
        flex:  1
    },
    form_container:{
        marginTop: 50,
    },
    title:{
        fontSize:25,
        fontFamily:'BOLD-FONT',
        color:'white',
        textAlign:'center',
        marginVertical:20
    },
    button_container:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
    },
    button:{
        minWidth:100,
        marginHorizontal:6
    },
    error_text:{
        textAlign:'center',
        color:GlobalStyles.COLORS.ERROR500,
        margin: 8,
    }
  
});