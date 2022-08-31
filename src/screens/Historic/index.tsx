import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Background } from "../../components/Global/Background";
import { Header } from "../../components/Global/Header";
import { CardCalc } from "../../components/Historic/CardCalc";
import { database } from "../../database";
import { CalcModel } from "../../database/models/calcModel";
import { Container } from "./styles";

export default function Historic() {

    const [data, setData] = useState<CalcModel[]>([])
    const [refresh, setRefresh] = useState(false);

    async function GetData() {
        const aux = await database.get<CalcModel>('calcs').query().fetch();
        setData(aux.sort((a, b) => a.created_at < b.created_at));
        setRefresh(false);
    }

    useEffect(() => {
        GetData();
    }, [refresh])

    useFocusEffect(
        React.useCallback(() => {
            GetData();
        }, [useIsFocused()])
    );

    return (
        <Background>
            <FlatList
                refreshing={refresh}
                onRefresh={() => {
                    GetData();
                }}
                ListEmptyComponent={<Text>Não há cálculos ainda...</Text>}
                contentContainerStyle={{ flexGrow: 1, padding: RFValue(16, 700) }}
                data={data}
                renderItem={(item) => { return <CardCalc item={item.item} index={item.index + 1} setRefresh={setRefresh} /> }}
            />
        </Background>
    )
}
