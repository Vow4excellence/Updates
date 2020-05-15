import React from 'react';
import {
TextInput,
StyleSheet,
TouchableOpacity,
Text,
View,
Image,
KeyboardAvoidingView,
Alert
} from 'react-native';
import * as firebase from 'firebase';
//import TransactionScreen from './screens/BookTransactionScreen';
//import SearchScreen from './screens/SearchScreen';

export default class LoginScreen extends React.Component {
    
  constructor () {
      super();
      this.state = {
      EmailId : '',
      Password : ''
   }
  }

    login = async (EmailId, Password) =>{
      console.log(EmailId, Password);
      
    if(EmailId && Password){

        try{
            const response = await firebase.auth().signInWithEmailAndPassword(EmailId, Password)
    if(response) {
        this.props.navigation.navigate('Transactions')
    }
        }
        catch (error) {
            switch (error.code) {
     case 'auth/user-not-found' : Alert.alert ('User not Found !');
     break;
    case 'auth/invalid-email' : Alert.alert ('EmailId and Password dont match !');
    break;

            }
        }
    }
    else {
        Alert.alert('Please enter your EmailId and Password ')
    }
    }

    render(){
    return(
        <KeyboardAvoidingView style={styles.container}>
        <View>
    <Image
     source={require("../Images/booklogo.jpg")}
      style={styles.BookImage}/>

    <Text style = {styles.LoginBox}>Login Screen</Text>
    </View>
    <View>
    <TextInput
              style={styles.emailBox}
              placeholder="EmailId"
              keyboardType = 'email-address'
              onChangeText={(text)=>{
                this.setState({
                  EmailId: text
                })
              }}
              />

<TextInput
              style={styles.passwordBox}
              placeholder="Password"
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                 Password: text
                })
              }}
              /> 
              </View>
              <View>
              <TouchableOpacity
              style={styles.submitButton}
              onPress={()=>{
                this.login(this.state.EmailId, this.state.Password)
              }}
              >
              <Text style={styles.submitButtonText}>Login</Text>
            </TouchableOpacity>         
        </View>
        </KeyboardAvoidingView>
    )
 }
}

const styles = StyleSheet.create({
    LoginBox : {
       textAlign:'center',
    },
    BookImage : {
         width : 150,
         height : 150,
    },
    emailBox : {
        width: 200,
      height: 40,
      borderWidth: 1.5,
           fontSize: 20,
       paddingLeft:10,
       margin:10,
    },
    passwordBox : {
      width: 200,
      height: 40,
      borderWidth: 1.5,
           fontSize: 20,
       paddingLeft:10,
       margin:10,
    },
    container : {
      marginTop : 10,
        alignItems: 'center',
      },
      submitButton : {
        backgroundColor: '#2196F3',
        paddingTop: 10,
        width : 80,
        height:40,
        justifyContent : 'center',
        alignItems : 'center',
        
      },
      submitButtonText : {
        fontSize: 15,
        textAlign: 'center',
       
      }
}) 
