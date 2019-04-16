import React, { Component } from 'react';

import { ScrollView,View,Text } from 'react-native';
import {Card} from 'react-native-elements';
import {baseUrl} from '../shared/baseUrl';
import {connect} from 'react-redux';


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

    if(item!=null)
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
            <RenderItem item={this.props.dishes.dishes.filter((dish)=>dish.featured===true)[0]}></RenderItem>
            <RenderItem item={this.props.promotions.promotions.filter((promo)=>promo.featured===true)[0]}></RenderItem>
            <RenderItem item={this.props.leaders.leaders.filter((lead)=>lead.featured===true)[0]}></RenderItem>

        </ScrollView>

        );
    }
}

export default connect(mapStateToProps)(Home);