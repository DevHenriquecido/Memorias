import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './Screens/HomeScreen'
import { IncluirMemoriaScreen } from './Screens/IncluirMemoriaScreen'


const Stack = createStackNavigator();

export default function App() {

  return (
   
    <NavigationContainer> 
      <Stack.Navigator> 
        <Stack.Screen  name="Memórias" component={HomeScreen} options={{
          headerStyle: {
          backgroundColor: '#9900cc'
          },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: 'bold' 
        }}/>
             <Stack.Screen  name="Incluir novas memórias" component={IncluirMemoriaScreen} options={{
          headerStyle: {
          backgroundColor: '#9900cc'
          },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: 'bold' 
        }}/>
       
      </Stack.Navigator> 
    </NavigationContainer>
 
  );
}
