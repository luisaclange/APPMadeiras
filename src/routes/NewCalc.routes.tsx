import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import NewCalc1 from "../screens/NewCalc/NewCalc1";
import NewCalc2 from "../screens/NewCalc/NewCalc2";
import NewCalc3 from "../screens/NewCalc/NewCalc3";
import NewCalc4 from "../screens/NewCalc/NewCalc4";

export function NewCalc() {

    const [visible, setVisible] = useState<number>(1);

    return (
        <>
            {visible === 1 ? <NewCalc1 pass={setVisible} /> : null}
            {visible === 2 ? <NewCalc2 pass={setVisible} /> : null}
            {visible === 3 ? <NewCalc3 pass={setVisible} /> : null}
        </>
    )
}
