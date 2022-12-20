import {
    useFocusEffect,
    useIsFocused,
    useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Background } from '../../components/global/background';
import { CardCalc } from '../../components/historic/cardCalc';
import { database } from '../../database';
import { CalcModel } from '../../database/models/calcModel';
import globalStyle from '../../styles/globalStyle';
import { BoxAlert, TextAlert } from './styles';

export default function Historic() {
    const navigation = useNavigation();

    const [data, setData] = useState<CalcModel[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [itsOk, setItsOk] = useState(false);

    async function GetData() {
        const aux = await database.get<CalcModel>('calcs').query().fetch();

        setData(aux.sort((a, b) => a.created_at < b.created_at));
        setRefresh(false);
        setItsOk(true);
    }

    useEffect(() => {
        GetData();
    }, [refresh]);

    useFocusEffect(
        React.useCallback(() => {
            GetData();
        }, [useIsFocused()]),
    );

    return (
        <Background>
            {itsOk ? (
                <FlatList
                    refreshing={refresh}
                    onRefresh={() => {
                        GetData();
                    }}
                    ListEmptyComponent={
                        <BoxAlert>
                            <TextAlert>Não há cálculos ainda...</TextAlert>
                            <TextAlert
                                style={{
                                    fontSize: RFValue(24, 700),
                                    marginTop: RFValue(16, 700),
                                }}
                            >
                                Para calcular uma nova ligação,
                            </TextAlert>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('NewCalc');
                                }}
                            >
                                <TextAlert
                                    style={{
                                        fontSize: RFValue(24, 700),
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    clique aqui
                                </TextAlert>
                            </TouchableOpacity>
                        </BoxAlert>
                    }
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: RFValue(16, 700),
                    }}
                    data={data}
                    renderItem={(item) => {
                        return (
                            <CardCalc
                                item={item.item}
                                index={item.index + 1}
                                setRefresh={setRefresh}
                            />
                        );
                    }}
                />
            ) : (
                <ActivityIndicator
                    color={globalStyle.colors.primary}
                    size="large"
                    style={{ marginTop: 100 }}
                />
            )}
        </Background>
    );
}
