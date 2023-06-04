import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Button, TouchableOpacity } from 'react-native';
import MainScreen from './Screen/MainScreen';
import MemoScreen from './Screen/MemoScreen';
import createMemo from './Screen/createMemo';
import detailMemo from './Screen/detailMemo';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const StackScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Memo"
          component={MemoScreen}
          options={{
            headerTitle: 'Memo',
            headerStyle: {
              backgroundColor: 'rgb(122,171,255)',
            },
            headerTitletStyle: {
              fontweight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Write"
          component={createMemo}
          options={{
            title: 'Memo',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={detailMemo}
          options={{
            title: 'Memo',
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="List"
        drawerPosition="right"
        drawerStyle={{
          backgroundColor: 'white',
          width: 200,
        }}
        drawerContentOptions={{
          activeTintColor: 'black',
          activeBackgroundColor: 'rgb(214,230,243)',
        }}>
        <Drawer.Screen name="List" component={MainScreen} />
        <Drawer.Screen name="Memo" component={StackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
