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
import { WoodType } from "../../../archive/WoodProperties/WoodType";
import { Kmod } from "../../../archive/WoodProperties/Kmod";
import { DicotyledonClass } from "../../../archive/WoodProperties/DicotyledonClass";
import { Checkbox } from "../../../components/NewCalc/Checkbox";
import { FieldSelectWoods } from "../../../components/NewCalc/FieldSelectWoods";

interface props {
    pass: any;
}

let schema = yup.object().shape({
    woodType: yup.string(),
    woodName: yup.string().required('Campo obrigatório'),
    // dicotyledonClass: yup.string().when('woodClass', {
    //     is: (woodClass) => woodClass === 'Kmod3_Dicotiledonia',
    //     then: yup.string().required('Campo obrigatório')
    // })
})

export default function NewCalc2({ pass }: props) {

    const { setStage2 } = useContext(DataContext);

    const { control, handleSubmit, formState: { errors }, watch } = useForm<Data['stage2']>(
        { resolver: yupResolver(schema) }
    );

    function handleDataRegister(data: Data['stage2']) {
        setStage2(data);
        //@ts-ignore
        pass(3);
    }

    return (
        <Background>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    <ProgressBar stage={2} />
                    <TitleSection title="Etapa 2" subtitle="Características da madeira" />
                    <BackgroundFields>
                        <Checkbox
                            title="Tipo de madeira"
                            list={[
                                {
                                    value: "Madeira Serrada"
                                },
                                {
                                    value: "Madeira Roliça"
                                },
                                {
                                    value: "Madeira Lamelada Colada (MLC)"
                                },
                                {
                                    value: "Madeira Lamelada Colada Cruzada (MLCC)"
                                },
                                {
                                    value: "Madeira Laminada Colada (LVL)"
                                },
                                {
                                    value: "Madeira Recomposta"
                                },
                            ]}
                            control={control}
                            name="woodType"
                        />
                        <FieldSelectWoods
                            control={control}
                            name="woodName"
                            title="Madeira utilizada"
                            error={errors.woodName}
                        />
                        {/* <FieldSelect
                            data={dataWoodClass}
                            name="woodClass"
                            control={control}
                            title="Classificação da madeira"
                            error={errors.woodClass}
                        />
                        {
                            visible ?
                                <FieldSelect
                                    data={dataDicotyledonClass}
                                    name="dicotyledonClass"
                                    control={control}
                                    title="Classe da dicotiledônia"
                                    error={errors.dicotyledonClass}
                                />
                                :
                                <></>
                        } */}
                    </BackgroundFields>
                </View>
                <ButtonsPrevNext
                    nextAction={handleSubmit(handleDataRegister)}
                    //@ts-ignore
                    prevAction={() => { pass(1) }}
                />
            </ScrollView>
        </Background>
    )
}
