import React, { Component } from 'react';
import { ListItem, Card } from 'react-native-elements';
import { View,FlatList, ScrollView, Text } from 'react-native';
import { LEADERS } from '../shared/leaders';

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history1: 'Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.',
            history2: "The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.",
            leaders: LEADERS
        }
    }

    static navigationOptions = {
        title: 'About Us'
    }


    render() {
        const renderAboutItem = ({ item, index }) => {
            return (
                <ListItem key={index}
                    title={item.name}
                    titleStyle={{
                        textDecorationStyle: 'solid',
                        fontWeight: 'bold'
                    }}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: require('./images/alberto.png') }} />
            );
        }
        return (
            <ScrollView>
                <Card
                    title='Our History'>
                    <View>
                        <Text>{this.state.history1} </Text>
                        <Text>{this.state.history2} </Text>
                    </View>
                </Card>

                <Card
                    title='Corporate Leadership'>
                    <FlatList
                        data={this.state.leaders}
                        renderItem={renderAboutItem}
                        keyExtractor={item => item.id.toString()}>
                    </FlatList>

                </Card>


            </ScrollView>
        );
    }
}

export default About;