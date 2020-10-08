import 'react-native-gesture-handler';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import InitialScreen from './src/containers/InitialScreen'

export default class App extends Component {

  state={
    currentUser: { username: "", id: null },
    media: [],
    authMode: true,
    user: "",
    password: ""
  }

  componentDidMount(){
    const token = localStorage.token

    if (token) {
      //get user info if token is present 
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.errors) {
            alert(response.errors)
          } else {
            this.setState({
              currentUser: response
            })
          }
        })
      
      fetch(`http://localhost:3000/getmedia`, {
        headers: {
          "Authorization": localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(data => { 
          this.setState({ media: data })
          console.log(data)
        }
      )

    }
  }

  render(){

    
    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   },
    // });

    return (
    //will need more props
      <NavigationContainer>
        <InitialScreen user={this.state.user} password={this.state.password} />
      </NavigationContainer>

      // <View style={styles.container}>
      //   <Text>Daily Dues!</Text>
      //   <TextInput
      //     name="user"
      //     value={this.state.user}
      //     placeholder="Username"
      //     onChange={this.handleOnChange}
      //   />
      //   <TextInput
      //     name="password"
      //     value={this.state.password}
      //     secureTextEntry={true}
      //     placeholder="Password"
      //     onChange={this.handleOnChange}
      //   />
        
        
        
      //   <Button
      //     title="Login"
      //     onPress={() => Alert.alert('Simple Button pressed')}
      //   />
      //   <Button
      //     title="Register"
      //     onPress={() => Alert.alert('Simple Button pressed')}
      //   />



      //   <StatusBar style="auto" />
      // </View>
    )
  }
}