import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Historic from '../screens/Historic';
import NewCalc from '../screens/NewCalc';
import Settings from '../screens/Settings';

export default function TabBar() {

    const TabBar = createBottomTabNavigator();

    return (
        <TabBar.Navigator>

            <TabBar.Screen name='Historic' component={Historic} />

            <TabBar.Screen name='NewCalc' component={NewCalc} />

            <TabBar.Screen name='Settings' component={Settings} />

        </TabBar.Navigator>
    )
}