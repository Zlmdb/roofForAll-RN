import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { urlImg, urlImgEnd } from '../../config/config'

export default class Market extends Component {
    static navigationOptions = {
        title: 'Market'
    };
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    componentDidMount() {
        fetch('https://api-general.fang88.com/info/list',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page: this.state.page
                })
            })
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                let listData = jsonData.data
                listData.forEach((value, index, arr) => {
                    let usMoney = Number(value.price * 6.42 / 10000).toFixed(2);
                    value.usMoney = usMoney;
                })
                this.setState({
                    listData: listData
                })
            })
    }
    render() {
        let imageArr=[
            'http://img.fang88.com/7d0149b7c127e37978f835793ce0f0fb.jpg',
            'http://img.fang88.com/7ce3fed13f5042d5af501617627e87b7.jpg',
            'http://img.fang88.com/04cba36003ed9e7939effc85218fa761.jpg',
            'http://img.fang88.com/328da9fa78726d1d5be55336562f5724.jpg',
            'http://img.fang88.com/0c5ae4926eadb5af311374fe12f0a0e6.jpg',
            'http://img.fang88.com/3f252bfaf5165f54a8b4db89c05bda8c.jpg',
            'http://img.fang88.com/37366469413a2d0eb892f2f405c7be35.jpg',
            'http://img.fang88.com/b530ada987b5d7df12356531faa55ddc.jpg',
            'http://img.fang88.com/176bde5d9a776b8df2a60aefdd3b7816.jpg',
            'http://img.fang88.com/5003890ce0e35baabe4c807810b9227d.jpg',
            'http://img.fang88.com/672f8ed7aaf83ac7cae02338fcf89c8a.jpg',
            'http://img.fang88.com/297d90e16e41e5deddde53dd7c570b20.jpg',
            'http://img.fang88.com/ed0c94e371dff2779154efcedd7766ca.jpg',
            'http://img.fang88.com/9c9dbbda8c67050baa1c4442485732b4.jpg'
        ]
        return (
            <ScrollView style={styles.container}>
                {
                    imageArr.map((value,index,arr)=>(
                        <View style={{width:'100%'}} key={index}>
                            <Image
                                style={{ width: '100%', height: 211 }}
                                source={{ uri: value }} />
                        </View>
                    ))
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        // textAlign: 'center',
        margin: 10,
    },
    instructions: {
        // textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    containerButton: {
        // flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    //
    themeBuyHouseCon: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    themeLetter: {
        textAlign: 'left',
        color: '#333',
        fontSize: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#3caae6'
    },
    banners: {
        // justifyContent: 'space-between',
        // alignItems: 'flex-end',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 40,
        marginBottom: 30
    },
    houseList: {
        paddingLeft: 20,
        paddingRight: 20
    },
    houselist_item: {
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 40,
        marginTop: 20,
        shadowColor: '#E1E1E1',
        // shadowOffset: 20,
        // shadowOpacity: 'none',
        shadowRadius: 3,

    },
    down: {
        marginTop: 20
    },
    houseDetail: {
        flexDirection: 'row',
        marginBottom: 8
    },
    houseDetailRow: {
        flexDirection: 'row',
    },
    houseDetailDown: {
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent: 'space-between'
    },
    detailLetter: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#4a4a4a'
    },
    symbol: {
        color: '#999',
        fontSize: 13
    },
    price: {
        color: '#222',
        fontSize: 18
    },
    house_room: {
        color: '#999',
        fontSize: 15
    }
});