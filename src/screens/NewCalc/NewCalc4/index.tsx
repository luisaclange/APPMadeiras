import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Background } from "../../../components/Global/Background";
import { Header } from "../../../components/Global/Header";
import { BackgroundFields } from "../../../components/NewCalc/BackgroundFields";
import { ProgressBar } from "../../../components/NewCalc/ProgressBar";
import { TitleSection } from "../../../components/NewCalc/TitleSection";
import DataContext, { Data } from "../../../context/context";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldSelect } from "../../../components/NewCalc/FieldSelect";
import { ButtonsPrevNext } from "../../../components/NewCalc/ButtonsPrevNext";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { FieldInput } from "../../../components/NewCalc/FieldInput";
import { NailDimensions } from "../../../Data/2_Dimensions/Pregos";

export default function NewCalc4() {

    const schema = yup.object().shape({
        widthWood: yup.string().matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        heightWood_1: yup.string().matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        heightWood_2: yup.string().matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        nailDimension: yup.string().required('Campo obrigatório'),
    })

    const { setStage4 } = useContext(DataContext);
    const navigation = useNavigation();
    const [dataNails, setDataNails] = useState([]);

    const { control, handleSubmit, formState: { errors }, watch } = useForm<Data['stage4']>(
        { resolver: yupResolver(schema) }
    );

    function handleDataRegister(data: Data['stage4']) {
        setStage4(data);
        //@ts-ignore
        navigation.navigate('Result');
    }

    function FilterDataNails(h1: number, h2: number) {

        const data = NailDimensions.filter((item) => {
            return (
                item.LPP > (h1 + 12 * item.JP) && h2 > 12 * item.JP
            )
        })
        console.log(data)
        setDataNails(data.map((item) => {
            return ({
                value: item.name,
                id: item.id
            })
        }));
    }

    useEffect(() => {
        console.log(watch('heightWood_1'))
        console.log(watch('heightWood_2'))
        if (watch('heightWood_1') !== undefined && watch('heightWood_2') !== undefined) {
            const h1: number = Number(watch('heightWood_1').replace(',', '.'))
            const h2: number = Number(watch('heightWood_2').replace(',', '.'))
            FilterDataNails(h1, h2)
        }
    }, [watch('heightWood_1'), watch('heightWood_2')])

    return (
        <Background>
            <Header />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    <ProgressBar stage={4} />
                    <TitleSection title="Etapa 4" subtitle="Dimensões da ligação" />
                    <BackgroundFields>

                        <FieldInput
                            name="widthWood"
                            control={control}
                            title="Espessura (e)"
                            dimension="mm"
                            error={errors.widthWood}
                            keyboardType="numeric"
                        />

                        <FieldInput
                            name="heightWood_1"
                            control={control}
                            title="Altura (h1)"
                            dimension="mm"
                            error={errors.heightWood_1}
                            keyboardType="numeric"
                        />

                        <FieldInput
                            name="heightWood_2"
                            control={control}
                            title="Altura (h2)"
                            dimension="mm"
                            error={errors.heightWood_2}
                            keyboardType="numeric"
                        />

                        <FieldSelect
                            data={dataNails}
                            name="nailDimension"
                            control={control}
                            title="Prego"
                            error={errors.nailDimension}
                        />

                    </BackgroundFields>
                </View>
                <ButtonsPrevNext
                    nextAction={handleSubmit(handleDataRegister)}
                    //@ts-ignore
                    prevAction={() => { navigation.navigate('NewCalc3') }}
                />
            </ScrollView>
        </Background>
    )
}
