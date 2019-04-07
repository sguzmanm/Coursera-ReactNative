import React,{Component} from 'react';
import {Card} from 'react-native-elements';
import {View,Text} from 'react-native';
class Contact extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            address1:'121, Clear Water Bay Road',
            address2:'Clear Water Bay, Kowloon',
            address3:'HONG KONG',
            telnum:'+852 1234 5678',
            fax:'+852 8765 4321',
            email:'confusion@food.net'
        }
    }

    static navigationOptions={
        title:'Contact Us'
    }

    render()
    {
        return(
        <Card
            title='Our Address'>
            <View>
            <Text>{this.state.address1}</Text>
            <Text>{this.state.address2}</Text>
            <Text>{this.state.address3}</Text>
            <Text>Tel: {this.state.telnum} </Text>
            <Text>Fax: {this.state.fax} </Text>
            <Text>Email: {this.state.email} </Text>

            </View>
        </Card>
        );
    }
}

export default Contact;