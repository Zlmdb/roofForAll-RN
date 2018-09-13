import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, Button, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { urlImg, urlImgEnd} from '../../config/config';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

export default class Home extends Component {
    static navigationOptions = {
        // title: 'Home',
        // headerStyle: {
        //     backgroundColor: '#f4511e',
        // },
        // headerTintColor: '#000',
        // headerTitleStyle: {
        //     fontWeight: 'bold',
        //     color:'#000'
        // },
    };
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder',page:1,listData:[] };
        this.toDetail = this.toDetail.bind(this)
    }
    _onPressButton() {
        Alert.alert('You tapped the button!')
    }
    
    componentDidMount() {
        console.log('componentDidMount')
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
    toDetail(id){
        // Alert.alert(id)
        console.log(id)
        // let id=e.target.getAttribute('data-id')
        this.props.navigation.navigate('Detail', { id: id})
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{height:334}}>
                    {/*<ImageBackground resizeMode='cover' source={require("../../images/banner.jpg")} style={{ width: '100%', height: 219 }}>
                        <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize:30,color:'#fff',textAlign:'center',marginTop:30}}>美国安家 找房88</Text>
                        
                            <TextInput style={{width:'80%',height: 40, borderColor: 'gray', borderWidth: 1, padding: 0,backgroundColor:'#fff',marginTop:50}}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}/>
                        </View>
                    </ImageBackground>*/}
                    <Image
                        style={{width: '100%', height: '100%'}}
                        source={{uri: 'http://img.fang88.com/82ad4c0b4f2882607f82810bea97b5bf.jpg'}}/>
                </View>
                <View style={styles.banners}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>堪萨斯城项目</Text>
                </View>
                <View style={styles.houseList}>
                    {
                        this.state.listData.map((value,index,arr)=>(
                            <TouchableOpacity
                                // onPress={this.toDetail(value.project_id)}
                                onPress={() => this.props.navigation.navigate('Detail', { id: value.project_id })}
                                key={value.project_id}
                                data-id={value.project_id}
                            >
                                <View style={styles.houselist_item} >
                                    <View style={{ height: 200 }}><Image style={{ width: '100%', height: 200 }} source={{ uri: urlImg + value.photo_json[0].path + urlImgEnd}}></Image></View>
                                    <View style={styles.down}>
                                        <View style={styles.houseDetail}>
                                            <Text style={styles.detailLetter}>{value.area} </Text>
                                            <Text> . </Text>
                                            <Text style={styles.detailLetter}> {value.project_name}</Text>
                                        </View>
                                        <View style={styles.houseDetailDown}>
                                            <View style={styles.houseDetailRow}>
                                                <Text style={styles.symbol}>＄</Text>
                                                <Text style={styles.price}>{value.price}</Text>
                                                <Text style={styles.symbol}>(约￥</Text>
                                                <Text style={styles.price}>{value.usMoney}</Text>
                                                <Text style={styles.symbol}>万)</Text>
                                            </View>
                                            <View style={styles.houseDetailRow}>
                                                <Text style={styles.house_room}>{(value.bedrooms)}居 </Text>
                                                <Text style={styles.house_room}> | </Text>
                                                <Text style={styles.house_room}> { value.sqft }㎡</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                {/*<View style={styles.containerButton}>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={this._onPressButton}
                            title="Press Me"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={this._onPressButton}
                            title="Press Me"
                            color="#841584"
                        />
                    </View>
                    <View style={styles.alternativeLayoutButtonContainer}>
                        <Button
                            onPress={this._onPressButton}
                            title="This looks great!"
                        />
                        <Button
                            onPress={this._onPressButton}
                            title="OK!"
                            color="#841584"
                        />
                    </View>
                </View>*/}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: '#f2f2f2',
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
    themeBuyHouseCon:{
        width:'100%',
        padding:20,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    themeLetter:{
        textAlign:'left',
        color:'#333',
        fontSize:15,
        borderLeftWidth:1,
        borderLeftColor:'#3caae6'
    },
    banners:{
        // justifyContent: 'space-between',
        // alignItems: 'flex-end',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 25,
        marginBottom:20
    },
    houseList:{
        paddingLeft:20,
        paddingRight:20
    },
    houselist_item:{
        width:'100%',
        backgroundColor: '#fff',
        marginBottom: 20,
        // marginTop: 20,
        shadowColor: '#E1E1E1',
        // shadowOffset: 20,
        // shadowOpacity: 'none',
        shadowRadius: 3,

    },
    down:{
        marginTop:20,
        // paddingTop:10,
        paddingBottom:20,
        paddingLeft:15,
        paddingRight:15,
    },
    houseDetail:{
        flexDirection: 'row',
        marginBottom: 8
    },
    houseDetailRow:{
        flexDirection: 'row',
        alignItems:'center'
    },
    houseDetailDown:{
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent:'space-between'
    },
    detailLetter:{
        fontWeight:'bold',
        fontSize: 18, 
        color: '#4a4a4a'
    },
    symbol:{
        color:'#999',
        fontSize:13,
        // verticalAlign:'middle'
    },
    price:{
        color:'#222',
        fontSize:18
    },
    house_room:{
        color:'#999',
        fontSize:15
    }
});