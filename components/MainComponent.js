import React,{Component} from 'react';

import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import {Platform,View} from 'react-native';
import {createStackNavigator,createAppContainer, createDrawerNavigator} from 'react-navigation';


const menuNavigator=createStackNavigator({
    Menu:{screen:Menu},
    DishDetail:{screen:DishDetail}
},
{
    initialRouteName:'Menu',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        }
    }

});

const MenuNavigator = createAppContainer(menuNavigator);


const homeNavigator=createStackNavigator({
    Home:{screen:Home}
},
{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        }
    }

});

const HomeNavigator = createAppContainer(homeNavigator);

const aboutNavigator=createStackNavigator({
    About:{screen:About}
},
{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        }
    }

});

const AboutNavigator = createAppContainer(aboutNavigator);

const contactNavigator=createStackNavigator({
    Contact:{screen:Contact}
},
{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        }
    }

});

const ContactNavigator = createAppContainer(contactNavigator);


const mainNavigator=createDrawerNavigator({
    Home:{
        screen:HomeNavigator,
        navigationOptions:{
            title:'Home',
            drawerLabel:'Home'
        }
    },
    About:{
        screen:AboutNavigator,
        navigationOptions:{
            title:'About Us',
            drawerLabel:'About Us'
        }
    },
    Menu:{
        screen:MenuNavigator,
        navigationOptions:{
            title:'Menu',
            drawerLabel:'Menu'
        }
    },
    Contact:{
        screen:ContactNavigator,
        navigationOptions:{
            title:'Contact Us',
            drawerLabel:'Contact Us'
        }
    }

},
{
    drawerBackgroundColor:'#D1C4E9'
});

const MainNavigator = createAppContainer(mainNavigator);


class Main extends Component
{
    onDishSelect(dishId)
    {
        this.setState({selectedDish:dishId})
    }

    render()
    {
        return(
            <View style={{flex:1,paddingTop:Platform.OS==='ios'?0:Expo.Constants.statusBarHeight}}>
                <MainNavigator/>

            </View>
        );
    }
}

export default Main;