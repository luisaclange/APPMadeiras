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
import { NailDimensions } from "../../../archive/2_Dimensions/Pregos";
import { database } from "../../../database";
import { CalcModel } from "../../../database/models/calcModel";

interface props {
    pass: any;
}

export default function NewCalc4({ pass }: props) {

    const schema = yup.object().shape({
        widthWood: yup.string().matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        heightWood_1: yup.string().matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        heightWood_2: yup.string().matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        nailDimension: yup.string().required('Campo obrigatório'),
    })

    const { setStage4, stage1, stage2, stage3, stage4 } = useContext(DataContext);
    const navigation = useNavigation();
    const [dataNails, setDataNails] = useState([]);

    const { control, handleSubmit, formState: { errors }, watch } = useForm<Data['stage4']>(
        { resolver: yupResolver(schema) }
    );

    async function handleDataRegister(data: Data['stage4']) {
        setStage4(data);
        await database.write(async () => {
            await database.get<CalcModel>('calcs').create(item => {
                item.charging = stage1.charging;
                item.humidityClass = stage1.humidityClass;
                item.dicotyledonClass = stage2.dicotyledonClass;
                item.woodClass = stage2.woodClass;
                item.woodType = stage2.woodType;
                item.fyk_nail = stage3.fyk_nail;
                item.tractiveForce = stage3.tractiveForce;
                item.woodResistanceClass = stage3.woodResistanceClass;
                item.heightWood_1 = data.heightWood_1;
                item.heightWood_2 = data.heightWood_2;
                item.nailDimension = data.nailDimension;
                item.widthWood = data.widthWood;
                item.created_at = Number(new Date()) - 10800000;
                item.visualized_at = 0;
                item.updated_at = 0;
            })
        }).then(res => {
            // @ts-ignore
            navigation.navigate('Result');
            setTimeout(() => { pass(1) }, 1000);
        }).catch(error => {
            console.error(error)
        })
    }

    function FilterDataNails(h1: number, h2: number) {

        const data = NailDimensions.filter((item) => {
            return (
                item.LPP > (h1 + 12 * item.JP) && h2 > 12 * item.JP
            )
        })
        setDataNails(data.map((item) => {
            return ({
                value: item.name,
                id: item.id
            })
        }));
    }

    useEffect(() => {
        if (watch('heightWood_1') !== undefined && watch('heightWood_2') !== undefined) {
            const h1: number = Number(watch('heightWood_1').replace(',', '.'))
            const h2: number = Number(watch('heightWood_2').replace(',', '.'))
            FilterDataNails(h1, h2)
        }
    }, [watch('heightWood_1'), watch('heightWood_2')])

    return (
        <Background>
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
                    prevAction={() => { pass(3) }}
                />
            </ScrollView>
        </Background>
    )
}
