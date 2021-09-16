import React from 'react';
import { StyleSheet, Text, View, TextInput, requireNativeComponent, TouchableOpacity } from 'react-native';
import {Header} from 'react=native-elements'
export default class HomeScreen extends Component {
    constructor(){
        super();
        this.state={
            text: '',
            isSearchedPressed:false,
            isLoading:false,
            word:"Loading...",
            lexicalCategory:'', 
            definition:''
        };
    }

    getWord=(word)=>{
        var searchKey = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary"+ searchKeyword+".json"
        return fetch(url)
        .then(data=>{
            if(data.status===200){
                return data.json()
            }
            else{
                return null
            }
        })
        .then((response)=>{
            var responseObject =response
            if(responseObject){
                var wordData = responseObject.definition[0]
                var definition = wordData.description
                var lexicalCategory = wordData.wordtype

                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory
                })
            }
            else{
                this.setState({
                    "word": this.state.text,
                    "definition": "Not Found"
                })
            }
        })
    }
    render() {
        return (
            <View style={{flex:1, borderWidth:2}}>
            <Header
              backgroundColor={'purple'}
              centerComponent={{
                text: 'Pocket Dictionary',
                style: { color: '#fff', fontSize: 20 },
              }}
            />
            <View style={styles.inputBoxContainer}>
          
            <Text 
               onChangeText={text => {
                  this.setState({
                    text: text,
                    isSearchPressed: false,
                    word  : "Loading...",
                    lexicalCategory :'',
                    examples : [],
                    definition : ""
                  });
               }}
            />
             <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
            }}
            value={this.state.text}
          />
  
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>
                    <Text style={{ fontSize:18}}>
                      {this.state.definition}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
            
        )
    }
}