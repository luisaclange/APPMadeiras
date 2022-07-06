import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NewCalc1 from "../screens/NewCalc/NewCalc1";
import NewCalc2 from "../screens/NewCalc/NewCalc2";
import NewCalc3 from "../screens/NewCalc/NewCalc3";
import NewCalc4 from "../screens/NewCalc/NewCalc4";
import Result from "../screens/Result";

export function NewCalc() {

    const { Navigator, Screen } = createNativeStackNavigator();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                animation: 'none'
            }}
        >

            <Screen name='NewCalc1' component={NewCalc1} />

            <Screen name='NewCalc2' component={NewCalc2} />

            <Screen name='NewCalc3' component={NewCalc3} />

            <Screen name='NewCalc4' component={NewCalc4} />

            <Screen name='Result' component={Result} />

        </Navigator>
    )
}
