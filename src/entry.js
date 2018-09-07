
import React, { Component } from 'react'

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

console.disableYellowBox = true;
import Home from './pages/home'
import Market from './pages/market'
import TabBarItem from './components/tabBarItem'

const MainStack = createStackNavigator({
    Home:Home
});


const RootStack=createBottomTabNavigator(
    {
        Main: { 
            screen: MainStack ,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '首页',
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
                tabBarLabel: '市场概况',
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
        // navigationOptions: ({ navigation }) => ({
        //     tabBarIcon: ({ focused, tintColor }) => {
        //         const { routeName } = navigation.state;
        //         let iconName;
        //         if (routeName === 'Home') {
        //             iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        //         } else if (routeName === 'Settings') {
        //             iconName = `ios-options${focused ? '' : '-outline'}`;
        //         }
        //         // You can return any component that you like here! We usually use an
        //         // icon component from react-native-vector-icons
        //         return <Ionicons name={iconName} size={25} color={tintColor} />;
        //     },
        // }),
        initialRouteName: 'Main',
        // tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
)

export default class App extends Component {

    render() {
        return <RootStack/>
    }
}

