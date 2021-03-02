import * as React from 'react';
import { Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Keyboard,TouchableHighlight} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CheckBox from 'react-native-check-box';
import { Constants } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import TimerPage from './TimerPage';
import HourPage from './HourPage';
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

class TaskPage extends React.Component {
  constructor({navigation}) {
    super();
    this.state = {
      // store temp todo
      tempTodo: '',
      isChecked: false,
      data: [],
      navigation:navigation,
    };
  }

  saveData = async () => {
    
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.state.data));

     
    } catch (error) {
      console.log('Error saving');
    }
  };

  loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('todos');
      if (value !== null) {
        console.log('Old data loaded');
        this.setState({ data: JSON.parse(value) });
      }
    } catch (error) {
      //  alert("Problem retriving data");
    }
  };

  componentDidMount = () => {
    // initial load
    this.loadData();
  };
  componentWillUnmount = () =>{
    this.saveData();
  }
  componentDidUpdate = () =>{
    this.saveData();
  }

  addTodo = () => {
    if(this.state.tempTodo!='')
    {let newTodo = {
      id: Math.random(1000000, 999999), // naive way of generating an unique
      title: this.state.tempTodo,
      done: false,
    };

    this.setState({
      tempTodo: '', // reset temp todo to empty,
      data: [...this.state.data, newTodo],
    });
    
    
    

    Keyboard.dismiss();}
    else{
      console.log("hiii");
      
    }
  };

  deleteTodo = (item) => {
    // use find index to find the item to delete
    let index = this.state.data.findIndex((each) => {
      return each.id == item.id;
    });
   

    let copy = [...this.state.data];
    copy.splice(index, 1);
    this.setState({
      data: copy,
    });
     this.saveData();
   
  };

  toggleCheckbox = (currentItem) => {
    const todos = [...this.state.data];

    // linear search to find the item to update
    let foundIndex = null;
    for (let i = 0; i < this.state.data.length; i++) {
      if (todos[i].id == currentItem.id) {
        foundIndex = i;
      }
    }
    // if we found the item
    if (foundIndex != null) {
      // clone the todo
      const newTodo = { ...currentItem };
      // inverse it's done status
      newTodo.done = !newTodo.done;

      todos[foundIndex] = newTodo;
    }

    // merge back into the state
    this.setState({
      data: todos,
    });
  };

  renderListItem = (info) => {
    let currentItem = info.item;
    return (
      
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        
        <Text style={{ paddingTop: 15, paddingLeft: 10, flex: 1 ,fontFamily:"Roboto",fontSize:20}}>
          {currentItem.title}
        </Text>
        <View style={{ paddingTop: 5 }}>
          <TouchableHighlight onPress={() => {
              this.deleteTodo(currentItem);
            }}>
            <Ionicons name="trash-outline" size={30} color="black" /> 
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <FlatList
          renderItem={this.renderListItem}
          data={this.state.data}
          keyExtractor={(item) => item.id}></FlatList>

        <TextInput
          style={styles.textbox}
          value={this.state.tempTodo}
          onChangeText={(text) => {
            this.setState({ tempTodo: text });
          }}
          placeholder={'Add Task Here'}
        />
      
       
        <Button title="Add Task" onPress={() => {
            
              this.addTodo();
            
            }}/>
            
        <Button
        title="Start Pomodoro!" onPress={() => {
            
             this.state.navigation.navigate('Work & Rest',{
               data: this.state.data,
             });
            
            }}
        
        
        />
      </KeyboardAvoidingView>
      
    );
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  textbox: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 30,
    padding: 5,
  },
});


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Tasks" component={TaskPage} />
        <Stack.Screen name="Work & Rest" component={TimerPage} options = {{headerLeft:null}}/>
        <Stack.Screen name="One Hour Break" component={HourPage} options = {{headerLeft:null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
