import React, { Component } from 'react';

import { ScrollView,View,Text } from 'react-native';
import {Card} from 'react-native-elements';
import {baseUrl} from '../shared/baseUrl';
import {connect} from 'react-redux';
import { Loading } from './LoadingComponent';



const mapStateToProps=state=>{
    return{
        leaders:state.leaders,
        promotions:state.promotions,
        dishes:state.dishes
    }
}


function RenderItem(props)
{
    const item=props.item;
    if(props.isLoading)
    {
        return(
                    <Loading/>
        );
    }
    else if(props.errMess)
    {
        return(
            <View>
                    <Text>{props.errMess}</Text>
            </View>
        );
    }
    else if(item!=null)
    {
        return(
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{uri:baseUrl+item.image}}>
                
                <Text style={{margin:10}}>
                    {item.description}
                </Text>    
            </Card>
        );
    }
    else
    {
        return(
            <View/>
        )
    }
}

class Home extends Component
{
    static navigationOptions={
        title:'Home'
    }


    render()
    {
        return(
        <ScrollView>
            <RenderItem item={this.props.dishes.dishes.filter((dish)=>dish.featured===true)[0]} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}></RenderItem>
            <RenderItem item={this.props.promotions.promotions.filter((promo)=>promo.featured===true)[0]} isLoading={this.props.promotions.isLoading} errMess={this.props.promotions.errMess}></RenderItem>
            <RenderItem item={this.props.leaders.leaders.filter((lead)=>lead.featured===true)[0]} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}></RenderItem>

        </ScrollView>

        );
    }
}

export default connect(mapStateToProps)(Home);