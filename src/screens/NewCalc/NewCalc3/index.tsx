import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { Background } from '../../../components/Global/Background';
import { BackgroundFields } from '../../../components/NewCalc/BackgroundFields';
import { ProgressBar } from '../../../components/NewCalc/ProgressBar';
import { TitleSection } from '../../../components/NewCalc/TitleSection';
import DataContext, { Data } from '../../../context/context';
import { FieldSelect } from '../../../components/NewCalc/FieldSelect';
import { ButtonsPrevNext } from '../../../components/NewCalc/ButtonsPrevNext';
import { FieldInput } from '../../../components/NewCalc/FieldInput';
import { NailDimensions } from '../../../archive/2_Dimensions/Pregos';
import { database } from '../../../database';
import { CalcModel } from '../../../database/models/calcModel';

export default function NewCalc3({ pass }: any) {
    const schema = yup.object().shape({
        widthWood: yup
            .string()
            .matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        heightWood_1: yup
            .string()
            .matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        heightWood_2: yup
            .string()
            .matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        nailDimension: yup.string().required('Campo obrigatório'),
        tractiveForce: yup
            .string()
            .matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
    });

    const { stage1, stage2, stage3, setStage3 } = useContext(DataContext);
    const navigation = useNavigation();
    const [dataNails, setDataNails] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Data['stage3']>({ resolver: yupResolver(schema) });

    async function handleDataRegister(data: Data['stage3']) {
        setStage3(data);
        await database
            .write(async () => {
                await database
                    .get<CalcModel>('calcs')
                    .create((item) => {
                        item.charging = stage1.charging;
                        item.humidityClass = stage1.humidityClass;
                        item.woodName = Number(stage2.woodName);
                        item.woodType = stage2.woodType;
                        item.tractiveForce = stage3.tractiveForce;
                        item.heightWood_1 = data.heightWood_1;
                        item.heightWood_2 = data.heightWood_2;
                        item.nailDimension = data.nailDimension;
                        item.widthWood = data.widthWood;
                        item.created_at = Number(new Date()) - 10800000;
                        item.visualized_at = 0;
                        item.updated_at = 0;
                    })
                    .then((res) => {
                        // @ts-ignore
                        console.log('esta é a resposta:', res);
                        navigation.navigate('Result', {
                            params: { id_calc: res._raw.id },
                        });
                        setTimeout(() => {
                            pass(1);
                        }, 1000);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function FilterDataNails(h1: number, h2: number) {
        const data = NailDimensions.filter((item) => {
            return item.LPP > h1 + 12 * item.JP && h2 > 12 * item.JP;
        });

        setDataNails(
            data.map((item) => {
                return {
                    value: item.name,
                    id: item.id,
                };
            }),
        );
    }

    useEffect(() => {
        if (
            watch('heightWood_1') !== undefined &&
            watch('heightWood_2') !== undefined
        ) {
            const h1 = Number(watch('heightWood_1').replace(',', '.'));
            const h2 = Number(watch('heightWood_2').replace(',', '.'));

            FilterDataNails(h1, h2);
        }
    }, [watch('heightWood_1'), watch('heightWood_2')]);

    return (
        <Background>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    <ProgressBar stage={3} />
                    <TitleSection
                        title="Etapa 3"
                        subtitle="Dimensões da ligação"
                    />
                    <BackgroundFields>
                        <FieldInput
                            name="tractiveForce"
                            control={control}
                            title="Força de tração"
                            dimension="KN"
                            error={errors.tractiveForce}
                            keyboardType="numeric"
                        />

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
                    // @ts-ignore
                    prevAction={() => {
                        pass(2);
                    }}
                />
            </ScrollView>
        </Background>
    );
}
