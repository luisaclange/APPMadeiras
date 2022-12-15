import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ImageBackground,
    Text,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Background } from '../../components/Global/Background';
import { ButtonDark } from '../../components/Global/ButtonDark';
import { Header } from '../../components/Global/Header';
import { BackgroundFields } from '../../components/NewCalc/BackgroundFields';
import { database } from '../../database';
import { CalcModel } from '../../database/models/calcModel';
import CalcWoodDimension from '../../project';
import calcDraw from '../../project/draw/calcsDraw';
import Draw from '../../project/draw/draw';
import globalStyle from '../../styles/globalStyle';

export default function Result({ route }: any) {
    const { id_calc } = route.params.params;

    const navigation = useNavigation();

    // const [itsOk, setItsOk] = useState(false);
    // const [id, setId] = useState(false);

    // const [calc, setCalc] = useState({
    //     kmod: 0,
    //     fc0d: 0,
    //     ft0d: 0,
    //     B: 0,
    //     Blim: 0,
    //     Rvd1: 0,
    //     nNails: 0
    // });

    // const [data, setData] = useState<CalcModel>()

    async function GetCalc() {
        const auxCalc = await CalcWoodDimension(id_calc);
        console.log('Aux calc: ', auxCalc);
        // const auxData = await database.get<CalcModel>('calcs').find(id_calc);
        // setCalc(auxCalc);
        // setData(auxData);
        // setItsOk(true);
    }

    useEffect(() => {
        GetCalc();
    }, []);

    return (
        <ImageBackground
            source={require('../../assets/Background.png')}
            imageStyle={{
                height: Dimensions.get('screen').height - RFValue(120, 700),
            }}
        >
            <ButtonDark
                text="Voltar"
                onPress={() => {
                    navigation.navigate('Historic');
                }}
                style={{ marginTop: 100 }}
            />
        </ImageBackground>
    );
}

// {
//     itsOk ?
//         <BackgroundFields>
//             <Text>Kmod: {calc.kmod.toFixed(2)}</Text>
//             <Text>Fc0d: {calc.fc0d.toFixed(2)}</Text>
//             <Text>Ft0d: {calc.ft0d.toFixed(2)}</Text>
//             <Text>B: {calc.B.toFixed(2)}</Text>
//             <Text>Blim: {calc.Blim.toFixed(2)}</Text>
//             <Text>Rvd1: {calc.Rvd1.toFixed(2)}</Text>
//             <Text>Numero de pregos: {calc.nNails}</Text>
//             <Draw
//                 data={data}
//                 nails={calc.nNails}
//             />

//             {/* <Text>Borda horizontal: {bfHorizontal} mm</Text>
//     <Text>Borda vertical: {bfVertical} mm</Text>
//     <Text>numero de pregos por coluna: {nNailsColumn} pregos</Text>
//     <Text>espaço entre pregos - coluna normal: {spaceNormalColumnNails.toFixed(2)} mm</Text>
//     <Text>numero de colunas: {nColumns}</Text>
//     <Text>pregos na ultima coluna: {nNailsSpecialColumn} prego</Text>
//     <Text>Borda vertical ultima coluna: {bfVerticalSpecial} mm</Text>
//     <Text>espaço entre pregos - ultima coluna: {spaceSpecialColumnNails.toFixed(2)} mm</Text>
//     <Text>espaço entre colunas: {spaceColumns} mm</Text> */}
//         </BackgroundFields>
//         :
//         <ActivityIndicator
//             color={globalStyle.colors.primary}
//             size='large'
//             style={{ marginTop: 100 }}
//         />
// }
