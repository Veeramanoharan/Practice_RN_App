import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Manage_Expense from './screens/Manage_Expense';
import Recent_Expenses from './screens/Recent_Expenses';
import All_Expenses from './screens/All_Expenses';
import { GlobalStyles } from './cosntants/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function TabSelector(){
  return(
    <BottomTab.Navigator screenOptions={
      {
        headerStyle:{
          backgroundColor:GlobalStyles.colors.accent500},
          headerTintColor:'white',
        tabBarStyle:{
          backgroundColor:GlobalStyles.colors.accent500},
          tabBarActiveTintColor:GlobalStyles.colors.primary700}
    }>
      <BottomTab.Screen name='Recent expenses' component={Recent_Expenses} 
          options={{
           title:'Recent expenses',
            tabBarLabel:'Recent',
            tabBarIcon:({color,size}) => (
              <FontAwesome5 name="hourglass-half" size={size} color={color} />)
          }}/>
      <BottomTab.Screen name='All expenses' component={All_Expenses}
          options={{
            title:'All expenses',
            tabBarLabel:'All',
            tabBarIcon:({color,size}) => (
              <FontAwesome5 name="calendar-alt" size={size} color={color} />)
          }}/>
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Bottom Tabs'>
            <Stack.Screen name='Manage expense' component={Manage_Expense}/>
            <Stack.Screen name='Bottom Tabs' component={TabSelector} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </>  

  );
}


