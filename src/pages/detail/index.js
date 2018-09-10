import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { urlImg, urlImgEnd } from '../../config/config'

export default class Detail extends Component {
    static navigationOptions = {
        title: 'Detail'
    };
    constructor(props) {
        super(props);
        this.state = {
            listData:null
        };
    }
    componentDidMount() {
        let id = this.props.navigation.getParam('id');
        console.log('获取'+id)
        fetch('https://api-general.fang88.com/info/project/'+id)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                let listData = jsonData.data
                // listData.forEach((value, index, arr) => {
                //     let usMoney = Number(value.price * 6.42 / 10000).toFixed(2);
                //     value.usMoney = usMoney;
                // })
                this.setState({
                    listData: JSON.stringify(listData)
            })
        })
    }
    render() {
        
        return (
            <ScrollView>
                <View>
                    <Text>{this.state.listData}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
});