import React from 'react';
import { Text,
View, 
FlatList,
StyleSheet,
TouchableOpacity,
TextInput
} from 'react-native';
import db from "../config.js"

export default class SearchScreen extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      allTransactions : [],
      search : '',
      lastVisibleTransaction : null
    }
  }
  searchTransactions = async (text) => {
    var enteredText = text.split("")
    var text = text.toUpperCase()

    if(enteredText[0].toUpperCase() === 'P'){
      const transaction = await db.collection("Transactions").where ('StudentId',
      '===', text).get()
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions : [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction : doc
        })
      })
    }
   else if (enteredText[0].toUpperCase() === 'A'){
    const transaction = await db.collection("Transactions").where ('BookId',
    '===', text).get()
    transaction.docs.map((doc) => {
      this.setState({
        allTransactions : [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction : doc
      })
    })
  }
  }

fetchMoreTransactions = async () => {
  var text = this.state.search.toUpperCase();
  var enteredText = text.split("")
// P is used for students and A is used for books.
  if(enteredText[0].toUpperCase() === 'P'){
    const query = await db.collection("Transactions").where ('StudentId',
    '===', text).startAfter(this.state.lastVisibleTransaction).limit(5).get()
    query.docs.map((doc) => {
      this.setState({
        allTransactions : [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction : doc
      })
    })
  }
 else if (enteredText[0].toUpperCase() === 'A'){
  const query = await db.collection("Transactions").where ('BookId',
  '===', text).startAfter(this.state.lastVisibleTransaction).limit(5).get()
  query.docs.map((doc) => {
    this.setState({
      allTransactions : [...this.state.allTransactions, doc.data()],
      lastVisibleTransaction : doc
    })
  })
}
}

componentDidMount = async () => {
  const transaction = await db.collection("Transactions").limit(5).get()
  transaction.docs.map((doc) =>{
    this.setState({
      allTransactions : [],
      lastVisibleTransaction : doc
    })
  })
}

    render() {
      return (
        <View style={styles.container}>
       
       <View style = {styles.searchBar}>
         <TextInput style = {styles.bar}
         placeholder = "Enter BookId or StudentId"
         onChangeText = {(text) =>{this.setState({search : text})}}
         />
         <TouchableOpacity style = {styles.searchButton}
         onPress = {()=>{
           this.searchTransactions(this.state.search)
         }}
         >
           <Text>Search</Text>
         </TouchableOpacity>
       </View>
       
        <FlatList data = {this.state.allTransactions}
        renderItem = {({item}) =>(
          <View style = {styles.table}>
            <Text>{"BookId : " + item.BookId}</Text>
            <Text>{"StudentId : " + item.StudentId}</Text>
            <Text>{"TransactionType : " + item.TransactionType}</Text>
            <Text>{"Date : " + item.date.toDate()}</Text>
          </View>
        )}
        keyExtractor = {(item,index) => index.toString()}
        onEndReached = {this.fetchMoreTransactions}
        onEndReachedThreshold = {0.7}
></FlatList>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green',
    },
    table:{
      borderBottomWidth: 2
    }
  })