
import React, { Component } from 'react'

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

console.disableYellowBox = true;
import Home from './pages/home'
import Market from './pages/market'
import Detail from './pages/detail'
import TabBarItem from './components/tabBarItem'


const TabNavigator=createBottomTabNavigator(
    {
        Home: { 
            screen: Home ,
            navigationOptions: ({ navigation }) => ({
                title: '首页导航条',
                // tabBarLabel: '首页',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/index.png')}
                        selectedImage={require('./images/index_selected.png')}
                    />
                )
            })},
        Market: { 
            screen: Market,
            navigationOptions: ({ navigation }) => ({
                title:'市场概况导航条',
                // tabBarLabel: '市场概况',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/market.png')}
                        selectedImage={require('./images/market_active.png')}
                    />
                )
            })},
    },
    {
        initialRouteName: 'Home',
        // tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }
)

const RootStack = createStackNavigator({
    TabNavigator: TabNavigator,
    Detail: Detail
}, {
    navigationOptions: {
        title: '标题',
        headerStyle: { backgroundColor: '#f4511e',},
        headerTitleStyle: { color: '#fff' },
    }
}
);

// const MainStack = createStackNavigator({
//     Home:Home,
//     Detail: Detail
// });
// const RootStack=createBottomTabNavigator(
//     {
//         Main: { 
//             screen: MainStack ,
//             navigationOptions: ({ navigation }) => ({
//                 tabBarLabel: '首页',
//                 tabBarIcon: ({ focused, tintColor }) => (
//                     <TabBarItem
//                         tintColor={tintColor}
//                         focused={focused}
//                         normalImage={require('./images/index.png')}
//                         selectedImage={require('./images/index_selected.png')}
//                     />
//                 )
//             })},
//         Market: { 
//             screen: Market,
//             navigationOptions: ({ navigation }) => ({
//                 tabBarLabel: '市场概况',
//                 tabBarIcon: ({ focused, tintColor }) => (
//                     <TabBarItem
//                         tintColor={tintColor}
//                         focused={focused}
//                         normalImage={require('./images/market.png')}
//                         selectedImage={require('./images/market_active.png')}
//                     />
//                 )
//             })},
//     },
//     {
//     initialRouteName: 'Main',
//     // tabBarComponent: TabBarBottom,
//     tabBarPosition: 'bottom',
//     lazy: true,
//     tabBarOptions: {
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//     },
//     }
// )

export default class App extends Component {

    render() {
        return <RootStack/>
    }
}

