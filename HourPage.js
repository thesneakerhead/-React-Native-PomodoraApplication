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
  Button,
} from 'react-native';

//importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


function HourPage ({route,navigation})  {
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

  
  try{
  const {data} = route.params;
  console.log(data[0].title);
  }
  
  catch(err)
  {
    const data = null;
  }
  

  
  class Timer1hr extends PureComponent{
    
  
      
     shouldComponentUpdate()
    {
      return false;
    }
    
    render(){
    
    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        
        <View style={styles.sectionStyle}>
          
          <Timer
            totalDuration={3600000}
            
            //Time Duration
            start={isTimerStart}
            //To start
            
            //To reset
            options={options3}

            
            //options for the styling
            handleFinish={() => {

              setCount(0);
            }}
            //can call a function On finish of the time
            
          />
          
        <Text style={styles.buttonText}>
              REST FOR AN HOUR
        </Text>
         
        </View>
      </View>
      <Button
      title="End Pomodoro Cycle" onPress={() => {
            
             navigation.navigate('Tasks');
            
            }}
      
      />
    </SafeAreaView>
    );
  }
  }
  return(<Timer1hr/>);
 

};

export default HourPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#0000FF'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
    color:'white'
  },
});

const options = {
  container: {
    backgroundColor: '#FFA500',
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
    backgroundColor: '#228B22',
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




