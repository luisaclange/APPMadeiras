import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { Background } from '../../../components/global/background';
import { BackgroundFields } from '../../../components/newCalc/backgroundFields';
import { ProgressBar } from '../../../components/newCalc/progressBar';
import { TitleSection } from '../../../components/newCalc/titleSection';
import DataContext, { Data } from '../../../context/context';
import { FieldSelect } from '../../../components/newCalc/fields/fieldSelect';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { Kmod } from '../../../archive/WoodProperties/Kmod';

interface props {
    pass: any;
}

const schema = yup.object({
    charging: yup.string().required('Campo obrigatório'),
    humidityClass: yup.string().required('Campo obrigatório'),
});

export default function NewCalc1({ pass }: any) {
    const { setStage1 } = useContext(DataContext);
    const navigation = useNavigation();

    const dataCharging = Kmod.kmod1.map((item) => {
        return {
            value: item.name,
            id: item.id,
        };
    });

    const dataHumidityClass = Kmod.kmod2.map((item) => {
        return {
            value: item.name,
            id: item.id,
        };
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Data['stage1']>({ resolver: yupResolver(schema) });

    function handleDataRegister(data: Data['stage1']) {
        setStage1(data);
        // @ts-ignore
        pass(2);
    }

    return (
        <Background>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    <ProgressBar stage={1} />
                    <TitleSection
                        title="Etapa 1"
                        subtitle="Características do ambiente"
                    />
                    <BackgroundFields>
                        <FieldSelect
                            data={dataCharging}
                            name="charging"
                            control={control}
                            title="Carregamento"
                            error={errors.charging}
                        />
                        <FieldSelect
                            data={dataHumidityClass}
                            name="humidityClass"
                            control={control}
                            title="Classe de umidade"
                            error={errors.humidityClass}
                        />
                    </BackgroundFields>
                </View>
                <ButtonsPrevNext
                    nextAction={handleSubmit(handleDataRegister)}
                />
            </ScrollView>
        </Background>
    );
}
