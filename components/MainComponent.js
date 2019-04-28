import React,{Component} from 'react';

import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';

import {Platform,View,Image,StyleSheet,ScrollView,Text} from 'react-native';
import {createStackNavigator,createAppContainer, createDrawerNavigator,DrawerItems,SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';

import {dispatch} from 'redux';

import {connect} from 'react-redux';
import {fetchDishes,fetchComments,fetchPromos,fetchLeaders} from '../redux/ActionCreators';

const mapStateToProps=state=>({

})

const mapDispatchToProps=dispatch=>({
    fetchDishes:() =>dispatch(fetchDishes()),
    fetchComments:() =>dispatch(fetchComments()),
    fetchPromos:() =>dispatch(fetchPromos()),
    fetchLeaders:() =>dispatch(fetchLeaders())
})

const menuNavigator=createStackNavigator({
    Menu:{screen:Menu,navigationOptions:
        ({navigation})=>({
            headerLeft:<Icon name="menu" size={24} color='white'
                            onPress={()=>navigation.toggleDrawer()}/>
        })
    },
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
    Home:{screen:Home,}
},
{
    defaultNavigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name="menu" size={24} color='white' 
            onPress={()=>navigation.toggleDrawer()}/>

    })

});

const HomeNavigator = createAppContainer(homeNavigator);

const aboutNavigator=createStackNavigator({
    About:{screen:About}
},
{
    defaultNavigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name="menu" size={24} color='white' 
            onPress={()=>navigation.toggleDrawer()}/>

    })

});

const AboutNavigator = createAppContainer(aboutNavigator);

const contactNavigator=createStackNavigator({
    Contact:{screen:Contact}
},
{
    defaultNavigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name="menu" size={24} color='white' 
            onPress={()=>navigation.toggleDrawer()}/>

    })

});

const ContactNavigator = createAppContainer(contactNavigator);

const reservationNavigator=createStackNavigator({
    Reservation:{screen:Reservation}
},
{
    defaultNavigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name="menu" size={24} color='white' 
            onPress={()=>navigation.toggleDrawer()}/>

    })

});

const ReservationNavigator = createAppContainer(reservationNavigator);

const favoritesNavigator=createStackNavigator({
    Favorites:{screen:Favorites}
},
{
    defaultNavigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name="menu" size={24} color='white' 
            onPress={()=>navigation.toggleDrawer()}/>

    })

});

const FavoritesNavigator = createAppContainer(favoritesNavigator);

const CustomDrawContentComponent=(props)=>{
    return(
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{top:'always',horizontal:'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Confusion</Text>
                </View>
            </View>
            <DrawerItems {...props}/>

        </SafeAreaView>
    </ScrollView>);
}

const mainNavigator=createDrawerNavigator({
    Home:{
        screen:HomeNavigator,
        navigationOptions:{
            title:'Home',
            drawerLabel:'Home',
            drawerIcon:({tintColor})=>(
                <Icon 
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    About:{
        screen:AboutNavigator,
        navigationOptions:{
            title:'About Us',
            drawerLabel:'About Us',
            drawerIcon:({tintColor})=>(
                <Icon 
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu:{
        screen:MenuNavigator,
        navigationOptions:{
            title:'Menu',
            drawerLabel:'Menu',
            drawerIcon:({tintColor})=>(
                <Icon 
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Contact:{
        screen:ContactNavigator,
        navigationOptions:{
            title:'Contact Us',
            drawerLabel:'Contact Us',
            drawerIcon:({tintColor})=>(
                <Icon 
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Favorites:{
        screen:FavoritesNavigator,
        navigationOptions:{
            title:'My favorites',
            drawerLabel:'My favorites',
            drawerIcon:({tintColor})=>(
                <Icon 
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Reservation:{
        screen:ReservationNavigator,
        navigationOptions:{
            title:'Reserve Table',
            drawerLabel:'Reserve Table',
            drawerIcon:({tintColor})=>(
                <Icon 
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    }

},
{
    drawerBackgroundColor:'#D1C4E9',
    contentComponent:CustomDrawContentComponent
});

const MainNavigator = createAppContainer(mainNavigator);


class Main extends Component
{
    onDishSelect(dishId)
    {
        this.setState({selectedDish:dishId})
    }

    componentDidMount()
    {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
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

const styles=StyleSheet.create({
    container: {
        flex: 1,
      },
      drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
      },
      drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
      },
      drawerImage: {
        margin: 10,
        width: 80,
        height: 60
      }
})

export default connect(mapStateToProps,mapDispatchToProps)(Main);