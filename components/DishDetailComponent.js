import React, { Component } from 'react';

import { View, Text, ScrollView, FlatList, Modal, Button,StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite,postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment))
})


function RenderDish(props) {
    const dish = props.dish;
    if (dish != null)
        return (
            <Card featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}>
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={styles.row}>
                <Icon
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => { props.favorite ? console.log('Already favorite') : props.onPress() }}
                />
                <Icon
                    raised
                    reverse
                    name='pencil' 
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() => { props.toggleModal() }}
                />
                </View>
                
            </Card>
        );
    else {
        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;
    const RenderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>
                    {item.comment}
                </Text>
                <Rating
                    imageSize={12}
                    readonly
                    startingValue={item.rating}
                    style={styles.rating}
                     />
                <Text style={{ fontSize: 12 }}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        )
    }

    return (
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={RenderCommentItem}
                keyExtractor={item => item.id.toString()} />
        </Card>
    )
}


class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            author: '',
            comment: '',
            rating: 1
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    resetForm()
    {
        this.setState({
            author: '',
            comment: '',
            rating: 1
        })
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment(dishId) {
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment)
        this.toggleModal();
    }


    render() {
        const dishId = this.props.navigation.getParam('dishId')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={()=>this.toggleModal()}
                    favorite={dishId in this.props.favorites}></RenderDish>
                <RenderComments comments={this.props.comments.comments.filter((comment) => (comment.dishId === dishId))}></RenderComments>
                <Modal
                 animationType={'slide'}
                 transparent={false}
                 visible={this.state.showModal}
                 onDismiss={()=>{this.resetForm();}}
                 onRequestClose={()=>{this.resetForm();}}>
                    <View style={styles.row}>
                        <Rating
                            ratingCount={5}
                            imageSize={60}
                            showRating
                            startingValue={this.state.rating}
                            onFinishRating={(rating)=>{this.setState({rating:rating})}}
                        />
                    </View>
                    <View style={styles.row}>
                    <Input
                        placeholder='Author'
                        leftIcon={
                            <Icon
                                name='user-o'
                                size={24}
                                color='black'
                                type='font-awesome'
                                containerStyle={{paddingRight:5}}
                          />
                        }
                        onChangeText={(text) => this.setState({author:text})}
                        value={this.state.author}
                        />
                    </View>
                    <View style={styles.row}>
                    <Input
                        placeholder='Comment'
                        leftIcon={
                            <Icon
                               name='comment-o'
                               size={24}
                               color='black'
                               type='font-awesome'
                               containerStyle={{paddingRight:5}}
                             />
                        }
                        onChangeText={(text) => this.setState({comment:text})}
                        value={this.state.comment}
                        />
                    </View>
                    <View style={styles.row}>
                    <Button onPress={()=>{this.handleComment(dishId);}}
                            color='#512DA8'
                            title='SUBMIT'
                        
                        ></Button>
                    </View>
                    <View style={styles.row}>
                    <Button onPress={()=>{this.toggleModal();}}
                            color='grey'
                            title='CANCEL'
                        
                        ></Button>
                    </View>
                </Modal>

            </ScrollView>
        );
    }
}


const styles=StyleSheet.create({
    row:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
    },
    rating:{
        padding:5,
        justifyContent:'flex-start',
        flex:1,
        alignItems:'flex-start'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);

