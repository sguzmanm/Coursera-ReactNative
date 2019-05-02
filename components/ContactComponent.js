import React,{Component} from 'react';
import {Card,Button,Icon} from 'react-native-elements';
import {View,Text} from 'react-native';
import {MailComposer} from 'expo';
import * as Animatable from 'react-native-animatable';
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

    sendMail()
    {
        MailComposer.composeAsync({
            recipients:['confusion@food.net'],
            subject:'Enquiry',
            body:'Too whom it may concern:'
        });
    }

    render()
    {
        return(
        <View>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    title='Our Address'>
                            <Text>{this.state.address1}</Text>
                            <Text>{this.state.address2}</Text>
                            <Text>{this.state.address3}</Text>
                            <Text>Tel: {this.state.telnum} </Text>
                            <Text>Fax: {this.state.fax} </Text>
                            <Text>Email: {this.state.email} </Text>
                            <Button
                                title='Send Email'
                                buttonStyle={{backgroundColor:'#512DA8'}}
                                icon={<Icon name='envelope-o'type='font-awesome' color='#ffffff'
                                onPress={this.sendMail}/>}
                            />
                </Card>
            </Animatable.View>
        </View>

        );
    }
}

export default Contact;