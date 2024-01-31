import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Manage_Expense from './screens/Manage_Expense';
import Recent_Expenses from './screens/Recent_Expenses';
import All_Expenses from './screens/All_Expenses';
import { GlobalStyles } from './cosntants/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import IconButton from './components/UI/IconButton';
import ExpensesContext_Provider from './store/Expenses_Context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();


function TabSelector(){
  return(
    <BottomTab.Navigator 
      screenOptions={({navigation}) => ({
        headerStyle:{
          backgroundColor:GlobalStyles.COLORS.PRIMARY400},
          headerTintColor:'white',
        tabBarStyle:{
          backgroundColor:GlobalStyles.COLORS.PRIMARY400},
          tabBarActiveTintColor:GlobalStyles.COLORS.ACCENT500,
        headerRight:({tintColor}) => (<IconButton icon='add'
           color={tintColor} size={24}  buttonPress={() => {navigation.navigate('Manage expense')}}/>)
        })}
    >
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
  const [fontsLoaded] = useFonts({
    'PRIMARY-FONT': require('./assets/fonts/NeueHaasDisplay-Mediu.ttf'),
    'BOLD-FONT': require('./assets/fonts/NeueHaasDisplayBold.ttf'),
    'ITALIC-FONT': require('./assets/fonts/NeueHaasDisplay-Mediu.ttf')
});

if(!fontsLoaded){
  return <AppLoading />
}
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContext_Provider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName='Bottom Tabs'
            screenOptions={{
              headerStyle:{
                backgroundColor: GlobalStyles.COLORS.PRIMARY500},
              headerTintColor:'white',
            }}>
            <Stack.Screen name='Manage expense' 
              component={Manage_Expense}
              options={{
                presentation:'modal'
              }}/>
            <Stack.Screen name='Bottom Tabs' component={TabSelector} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContext_Provider>  
      </>  

  );
}


