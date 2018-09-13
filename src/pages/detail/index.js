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
            listData:{}
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
                let property_type = listData.property_type
                switch (property_type) {
                    case 'house':
                        listData.property_type_zh='独栋别墅';
                        break;
                    case 'apartmenet':
                        listData.property_type_zh = '公寓';
                        break;
                    case 'townhouse':
                        listData.property_type_zh = '联排别墅';
                        break;
                    case 'multi-family house':
                        listData.property_type_zh = '多户住宅';
                        break;
                }
                //
                let usMoney = Number(listData.price * 6.42 / 10000).toFixed(2);
                let month_rent = (listData.monthly_rent - listData.management - listData.repair - listData.vacancy - listData.insurance - listData.tax).toFixed(2)
                let roi = (month_rent * 12 * 100 / listData.price).toFixed(2);
                listData.roi=roi;
                listData.month_net_rent= month_rent
                this.setState({
                    listData: listData
            })
        })
    }
    render() {
        const listData=this.state.listData
        return (
            <ScrollView style={styles.container}>
                <View style={styles.houseList}>
                    {
                        listData.price&&(
                            <View style={styles.houselist_item} >
                                <View style={{ height: 200 }}><Image style={{ width: '100%', height: 200 }} source={{ uri: urlImg + listData.photo_json[0].path + urlImgEnd }}></Image></View>
                                <View style={styles.down}>
                                    <View style={styles.houseDetail}>
                                        <Text style={styles.detailLetter}>{listData.area} </Text>
                                        <Text> . </Text>
                                        <Text style={styles.detailLetter}> {listData.project_name}</Text>
                                    </View>
                                    <View style={styles.houseDetailDown}>
                                        <View style={styles.houseDetailRow}>
                                            <Text style={styles.symbol}>＄</Text>
                                            <Text style={styles.price}>{listData.price}</Text>
                                            <Text style={styles.symbol}>(约￥</Text>
                                            <Text style={styles.price}>{listData.usMoney}</Text>
                                            <Text style={styles.symbol}>万)</Text>
                                        </View>
                                        <View style={styles.houseDetailRow}>
                                            <Text style={styles.house_room}>{(listData.bedrooms)}居 </Text>
                                            <Text style={styles.house_room}> | </Text>
                                            <Text style={styles.house_room}> {listData.sqft}㎡</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                    
                    <View style={styles.leader_title}><Text style={{fontSize:20,color:'#222'}}>基本信息</Text></View>
                    <View style={styles.basiscInfo}>
                        <View style={styles.basiscInfo_up}>
                            <View style={styles.basiscInfo_item}>
                                <View style={styles.itme_left}>
                                    <Text style={styles.infoKey}>物业类型:</Text>
                                    <Text style={styles.infoValue}>{listData.property_type_zh}</Text>
                                </View>
                                <View style={styles.itme_right}>
                                    <Text style={styles.infoKey}>占地面积:</Text>
                                    <Text style={styles.infoValue}>{listData.sqft_total}㎡</Text>
                                </View>
                            </View>
                            <View style={styles.basiscInfo_item}>
                                <View style={styles.itme_left}>
                                    <Text style={styles.infoKey}>交房日期:</Text>
                                    <Text style={styles.infoValue}>{listData.close_date}</Text>
                                </View>
                                <View style={styles.itme_right}>
                                    <Text style={styles.infoKey}>能否贷款:</Text>
                                    <Text style={styles.infoValue}>{listData.can_loan === 0 ? '否' : '是'}</Text>
                                </View>
                            </View>
                            <View style={styles.basiscInfo_item}>
                                <View style={styles.itme_left}>
                                    <Text style={styles.infoKey}>车位:</Text>
                                    <Text style={styles.infoValue}>{listData.garage}</Text>
                                </View>
                                <View style={styles.itme_right}>
                                    <Text style={styles.infoKey}>空调设备:</Text>
                                    <Text style={styles.infoValue}>{listData.air_condition}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.leader_title} style={{ paddingTop: 25,paddingLeft:10 }}><Text style={{ fontSize: 20, color: '#222' }}>项目详情</Text></View>
                    <View  style={styles.projectDetail}>
                        <View style={styles.costLiBox}>
                            <View style={styles.costLeft}><Text style={styles.ttk}>Market Monthly Rent</Text><Text style={styles.ttv}>月租金</Text></View>
                            <View style={[styles.costRight, styles.costOne]}><Text style={styles.createValue}>${listData.monthly_rent}</Text></View>
                        </View>
                        <View  style={styles.costLiBox}>
                            <View style={styles.costLeft}><Text style={styles.ttk}>Management</Text><Text style={styles.ttv}>物管费</Text></View>
                            <View style={styles.costRight}><Text style={styles.createValue}>(${listData.management})</Text></View>
                        </View>
                        <View style={styles.costLiBox}>
                            <View style={styles.costLeft}><Text style={styles.ttk}>Repair Allotment</Text><Text style={styles.ttv}>装修费</Text></View>
                            <View style={styles.costRight}><Text style={styles.createValue}>(${listData.repair})</Text></View>
                        </View>
                        <View  style={styles.costLiBox}>
                            <View style={styles.costLeft}><Text style={styles.ttk}>Vacancy Allotment</Text><Text style={styles.ttv}>空置费</Text></View>
                            <View style={styles.costRight}><Text style={styles.createValue}>(${listData.vacancy})</Text></View>
                        </View>
                        <View  style={styles.costLiBox}>
                            <View style={styles.costLeft}><Text style={styles.ttk}>Insurance</Text><Text style={styles.ttv}>保险费</Text></View>
                            <View style={styles.costRight}><Text style={styles.createValue}>(${listData.insurance})</Text></View>
                        </View>
                        <View  style={[styles.costLiBox, styles.costBottom]}>
                            <View style={styles.costLeft}><Text style={styles.ttk}>Property Tax</Text><Text style={styles.ttv}>物业税</Text></View>
                            <View style={styles.costRight}><Text style={styles.createValue}>(${listData.tax})</Text></View>
                        </View>
                        <View  style={[styles.costLiBox, styles.costTwo]}>
                            <View style={styles.costLeft}><Text style={styles.ttk}>Your Monthly Check</Text><Text style={styles.ttv}>每月净租金</Text></View>
                            <View style={[styles.costRight, styles.costOne]}><Text style={styles.createValue}>${listData.month_net_rent}</Text></View>
                        </View>
                    </View>
                    <View style={styles.costCountBox}>
                        <View style={styles.costTitle}><Text>COST成本</Text></View>
                        <View style={styles.costValue}><Text>${listData.price}</Text></View>
                        <View style={styles.costTitle}><Text>ROI收益率</Text></View>
                        <View style={styles.costAll}><Text>{listData.roi}%</Text></View>
                    </View>
                </View>
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        marginTop: 25,
        marginBottom: 20
    },
    houseList: {
        // paddingLeft: 20,
        // paddingRight: 20
    },
    houselist_item: {
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 20,
        // marginTop: 20,
        shadowColor: '#E1E1E1',
        // shadowOffset: 20,
        // shadowOpacity: 'none',
        shadowRadius: 3,

    },
    down: {
        marginTop: 20,
        // paddingTop:10,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    houseDetail: {
        flexDirection: 'row',
        marginBottom: 8
    },
    houseDetailRow: {
        flexDirection: 'row',
        alignItems: 'center'
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
        fontSize: 13,
        // verticalAlign:'middle'
    },
    price: {
        color: '#222',
        fontSize: 18
    },
    house_room: {
        color: '#999',
        fontSize: 15
    },
    leader_title:{
        // fontSize: 20,
        // color: 'rgba(32, 32, 32, 1)',
        paddingTop:17,
        paddingLeft:10,
        paddingBottom:10,
        paddingRight:10
    },
    basiscInfo:{
        height: 'auto',
        paddingTop:9,
        paddingRight:20,
        paddingBottom:35,
        paddingLeft:10,
        borderBottomWidth: 1,
        borderBottomColor:'#ccc'
    },
    basiscInfo_item:{
        flexDirection:'row',
        justifyContent: 'space-between',
        // fontSize: 14,
        // color: '#202020',
        marginBottom: 7.5,
        // textAlign: 'left'
    },
    itme_left:{
        flex:1,
        flexDirection: 'row',
    },
    itme_right:{
        flex: 1,
        flexDirection:'row',
        // whiteSpace: 'nowrap',
        overflow: 'hidden',
        // textOverflow: 'ellipsis',
    },
    infoKey:{
        paddingRight:20,
        color:'#222',
        fontSize: 14,
    },
    infoValue:{
        color:'#999',
        fontSize:14,
    },
    projectDetail:{
        paddingLeft:10
    },
    costLiBox:{
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10
    },
    costLeft:{
        flexDirection: 'row',
        flex:3,
        marginRight:20
    },
    costRight:{
        flex: 1,
    },
    createValue:{
        color: '#F47856'
    },
    costCountBox:{
        flexDirection:'row',
        paddingBottom:50,
        paddingLeft:10
    },
    costTitle:{
        flex:1
    },
    costValue:{
        flex:1
    },
    costAll:{
        flex:1
    },
    ttk:{
        flex:1
    },
    ttv:{
        color:'#222',
        flex: 1
    }
});