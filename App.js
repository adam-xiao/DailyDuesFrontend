import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default class App extends Component {

  state={
    currentUser: { username: "", id: null },
    media: [],
    authMode: true
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

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <Text>Daily Dues!</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          // onChangeText={}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          // onChangeText={}
        />
        
        
        
        <Button
          title="Login"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Button
          title="Register"
          onPress={() => Alert.alert('Simple Button pressed')}
        />



        <StatusBar style="auto" />
      </View>
    )
  }
}