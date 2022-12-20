import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { Background } from '../../../components/global/background';
import { Header } from '../../../components/historic/header';
import { BackgroundFields } from '../../../components/newCalc/backgroundFields';
import { ProgressBar } from '../../../components/newCalc/progressBar';
import { TitleSection } from '../../../components/newCalc/titleSection';
import DataContext, { Data } from '../../../context/context';
import { FieldSelect } from '../../../components/newCalc/fields/fieldSelect';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { WoodType } from '../../../archive/WoodProperties/WoodType';
import { Kmod } from '../../../archive/WoodProperties/Kmod';
import { DicotyledonClass } from '../../../archive/WoodProperties/DicotyledonClass';
import { Checkbox } from '../../../components/newCalc/checkbox';
import { FieldSelectWoods } from '../../../components/newCalc/fields/fieldSelectWoods';

const schema = yup.object().shape({
    woodType: yup.string(),
    woodName: yup.string().required('Campo obrigatório'),
    // dicotyledonClass: yup.string().when('woodClass', {
    //     is: (woodClass) => woodClass === 'Kmod3_Dicotiledonia',
    //     then: yup.string().required('Campo obrigatório')
    // })
});

export default function NewCalc2({ pass }: any) {
    const { setStage2 } = useContext(DataContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Data['stage2']>({ resolver: yupResolver(schema) });

    function handleDataRegister(data: Data['stage2']) {
        setStage2(data);
        // @ts-ignore
        pass(3);
    }

    return (
        <Background>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    <ProgressBar stage={2} />
                    <TitleSection
                        title="Etapa 2"
                        subtitle="Características da madeira"
                    />
                    <BackgroundFields>
                        <Checkbox
                            title="Tipo de madeira"
                            list={[
                                {
                                    value: 'Madeira Serrada',
                                },
                                {
                                    value: 'Madeira Roliça',
                                },
                                {
                                    value: 'Madeira Lamelada Colada (MLC)',
                                },
                                {
                                    value: 'Madeira Lamelada Colada Cruzada (MLCC)',
                                },
                                {
                                    value: 'Madeira Laminada Colada (LVL)',
                                },
                                {
                                    value: 'Madeira Recomposta',
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
                    // @ts-ignore
                    prevAction={() => {
                        pass(1);
                    }}
                />
            </ScrollView>
        </Background>
    );
}
