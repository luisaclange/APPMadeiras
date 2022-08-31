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

interface props {
    pass: any;
}

let schema = yup.object().shape({
    woodType: yup.string().required('Campo obrigatório'),
    woodClass: yup.string().required('Campo obrigatório'),
    dicotyledonClass: yup.string().when('woodClass', {
        is: (woodClass) => woodClass === 'Kmod3_Dicotiledonia',
        then: yup.string().required('Campo obrigatório')
    })
})

export default function NewCalc2({ pass }: props) {

    const { setStage2, stage2 } = useContext(DataContext);
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);

    const dataWoodType = WoodType.map((item) => {
        return ({
            value: item.name,
            id: item.id
        })
    });

    const dataWoodClass = Kmod.kmod3.map((item) => {
        return ({
            value: item.name,
            id: item.id
        })
    })

    const dataDicotyledonClass = DicotyledonClass.map((item) => {
        return ({
            value: item.name,
            id: item.id
        })
    })

    const { control, handleSubmit, formState: { errors }, watch } = useForm<Data['stage2']>(
        { resolver: yupResolver(schema) }
    );

    function handleDataRegister(data: Data['stage2']) {
        setStage2(data);
        //@ts-ignore
        pass(3);
    }

    useEffect(() => {
        if (watch('woodClass') === 'Kmod3_Dicotiledonia') {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [watch(['woodClass'])])

    return (
        <Background>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    <ProgressBar stage={2} />
                    <TitleSection title="Etapa 2" subtitle="Características da madeira" />
                    <BackgroundFields>
                        <FieldSelect
                            data={dataWoodType}
                            name="woodType"
                            control={control}
                            title="Tipo de madeira"
                            error={errors.woodType}
                        />
                        <FieldSelect
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
                        }
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
