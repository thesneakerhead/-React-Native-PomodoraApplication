// Example of React Native Timer and Stopwatch
// https://aboutreact.com/react-native-timer-stopwatch/

// import React in our code
import React, { useState,Component,PureComponent} from 'react';
import xtype from 'xtypejs'

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,FlatList,
} from 'react-native';

//importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { Ionicons } from '@expo/vector-icons';

function TimerPage ({route,navigation})  {
  const [isTimerStart, setIsTimerStart] = useState(true);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(10000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [isRest,setIsRest] = useState(false);
  const [count,setCount] = useState(0);
  const [lock1hr,setLock1hr] = useState(true);
  const [lock5,setLock5] = useState(true);
  const [lock25,setLock25] = useState(true);
  const {data} = route.params;
  
  class Timer25 extends PureComponent{
    shouldComponentUpdate()
    {
      return false;
    }

    
    render(){
    
    
    return(
    
      <SafeAreaView style={styles.container}>
      <View style ={{flex:1,borderWidth:1,width:331,minHeight:150}}>
        <TaskMenu/>
      </View>
      
        
        <View style={styles.sectionStyle}>
          
          <Timer
            totalDuration={5000}
            
            //Time Duration
            start={isTimerStart}
            //To start
            
            //To reset
            options={options}

            
            //options for the styling
            handleFinish={() => {
              setIsRest(!isRest);
            }}
            //can call a function On finish of the time
            
          />
          <Text style={{fontSize: 20,
    marginTop: 10,color:"#FFFFFF"}}>
              WORK
            </Text>
        </View>
      <View style = {{backgroundColor: '#BEBEBE',width:335,alignItems:'center'}}>
      <TouchableHighlight onPress={() => {
              navigation.navigate('Tasks')
            }}>
            <Ionicons name="close-circle-outline" size={30} color="white" /> 
          </TouchableHighlight>
      </View>
    </SafeAreaView>
    );
  }
  }
 
   class Timer5 extends PureComponent{
     
     shouldComponentUpdate()
    {
      return false;
    }
    render(){
    return(
      <SafeAreaView style={styles.container}>
      <View style ={{flex:1,borderWidth:1,width:331,minHeight:150}}>
        <TaskMenu/>
      </View>
      
        
        <View style={styles.sectionStyle2}>
          
          <Timer
            totalDuration={300000}
            
            //Time Duration
            start={isTimerStart}
            //To start
            
            //To reset
            options={options2}

            
            //options for the styling
            handleFinish={() => {
              setIsRest(!isRest);
              setCount(count+1);
            }}
            //can call a function On finish of the time
            
          />
          
            <Text style={styles.buttonText}>
              REST
            </Text>
          
         
        </View>
      
      <View style = {{backgroundColor: '#FFFFFF',width:335,alignItems:'center'}}>
      <TouchableHighlight onPress={() => {
              navigation.navigate('Tasks')
            }}>
            <Ionicons name="close-circle-outline" size={30} color="black" /> 
          </TouchableHighlight>
      </View>
    </SafeAreaView>
    );
  }



 }
 
  const renderListItem = (info) => {
    let currentItem = info.item;
    return (
      
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        
        <Text style={{ paddingLeft: 20, flex: 1 ,paddingVertical:3}}>
          {currentItem.title}
        </Text>
      </View>
    );
  };
  class TaskMenu extends PureComponent{
    render(){
      return(
        <View style = {{flexDirection:"row",height:150}}>
            <View style = {{alignItems:"flex-start",justifyContent:"flex-start",paddingRight:20,borderRightWidth:1}}>
              <Text>Tasklist:</Text>
            </View>
            <View style = {{alignItems:"baseline"}}>
              <FlatList
                renderItem={renderListItem}
                data={data}
                keyExtractor={(item) => item.id}></FlatList>
            </View>
        </View>
      )

    }
  
  }
  
  
  console.log(count);
  if (count==4)
  { 
    navigation.navigate('One Hour Break');      
  }
  
  if (isRest){
    
  return (
    
    
    <Timer5/>
    
  );}
  if (!isRest)
  {
    
    return(
       
      <Timer25/>);
  }

};

export default TimerPage;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 5,
    
    alignItems: 'center',
    justifyContent: 'center',
    width:500,
    backgroundColor:'#BEBEBE'
  },
  sectionStyle2: {
    flex: 5,
    
    alignItems: 'center',
    justifyContent: 'center',
    width:500,
    backgroundColor:'#FFFFFF'
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    backgroundColor: '#BEBEBE',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    color: '#FFF',
    marginLeft: 7,
  },
};

const options2 = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    color: '#000',
    marginLeft: 7,
  },
};

const options3 = {
  container: {
    backgroundColor: '#0000FF',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    color: '#FFF',
    marginLeft: 7,
  },
};




