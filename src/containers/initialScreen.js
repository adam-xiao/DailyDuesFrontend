import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default class InitialScreen extends Component {
    
    handleOnChange = (event) => {
        const { target: { name, value } } = event
        this.setState({ [name]: value })
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

        return(
            <View style={styles.container}>
                <Text>Daily Dues!</Text>
                <TextInput
                name="user"
                // value={this.state.user}
                placeholder="Username"
                // onChange={this.handleOnChange}
                />
                <TextInput
                name="password"
                // value={this.state.password}
                secureTextEntry={true}
                placeholder="Password"
                // onChange={this.handleOnChange}
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