import React,{Component} from 'react';
import {Text,View,ScrollView,StyleSheet,Picker,Switch,Button, Modal,Alert} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import {Permissions,Notifications} from 'expo';

class Reservation extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            guests:1,
            smoking:false,
            date:'',
            showModal:false
        }
    }

    static navigationOptions={
        title:'Reserve table'
    }

    handleReservation(){
        console.log(JSON.stringify(this.state));
        var msg= 'Number of Guests: '+this.state.guests+'\n'+
        'Smoking? '+ (this.state.smoking?'Yes':'No')+'\n'+
        'Date and Time: '+this.state.date;

        Alert.alert('Your reservation OK?',msg,[
            {
                text:'CANCEL',
                onPress:()=>this.resetForm(),
                style:' cancel'
            },
            {
                text:'OK',
                onPress:()=>{
                    this.presentLocalNotification(this.state.date);
                    this.resetForm()
                },
                style:' cancel'
            }
        ])
        
    }

    resetForm()
    {
        this.setState({
            guests:1,
            smoking:false,
            date:''
        });
    }

    async obtainNotificationPermission()
    {
        let permission=await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(Permissions.status!=='granted')
        {
            permission=await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status!=='granted')
            {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date)
    {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title:'Your reservation',
            body:'Reservation for '+date+' requested',
            ios:{
                sound:true
            },
            android:{
                sound:true,
                vibrate:true,
                color:'#512DA8'
            }

        })
    }

    toggleModal()
    {
        this.setState({
            showModal:!this.state.showModal
        })
    }

    render()
    {
        const items=[];
        for(var i=0;i<5;i++)
        {
            items.push()
        }
        return(
            <ScrollView>
                <Animatable.View animation='zoomIn' duration={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue,itemIndex)=>this.setState({guests:itemValue})}
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#5124A8'
                            onValueChange={(value)=>this.setState({smoking:value})}
                        >
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and time</Text>
                        <DatePicker 
                            style={{flex:2,marginRight:20}}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='Select date and time'
                            minDate='2017-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles=
                            {{
                                dateIcon:{
                                    position:'absolute',
                                    left:0,
                                    top:4,
                                    marginLeft:0
                                },
                                dateInput:{
                                    marginLeft:36
                                }
                            }

                            }
                            onDateChange={(date)=>this.setState({date:date})}

                            />
                    </View>
                    <View style={styles.formRow}>
                            <Button
                                title='Reserve'
                                color='#5124A8'
                                onPress={()=>this.handleReservation()}
                                accessibilityLabel='Learn more about the purple button'

                            >

                            </Button>
                    </View>

                </Animatable.View>
                
            </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    formRow:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        margin:20
    },
    formLabel:{
        fontSize:18,
        flex:2
    },
    formItem:{
        flex:1
    },
    modal:{
        justifyContent:'center',
        margin:20
    },
    modalTitle:{
        fontSize:24,
        fontWeight:'bold',
        backgroundColor:'#512DA8',
        textAlign:'center',
        color:'white',
        marginBottom:20
    },
    modalText:{
        fontSize:18,
        margin:10
    }
});

export default Reservation;

