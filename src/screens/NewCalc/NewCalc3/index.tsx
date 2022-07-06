import React, { useContext } from "react";
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
import { RFValue } from "react-native-responsive-fontsize";
import { TextWood } from "./styles";
import { WoodResistanceClasses } from "../../../Data/1_ClassesResistencia/ClassesResistencia";

export default function NewCalc3() {

    const schema = yup.object().shape({
        tractiveForce: yup.string().matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        fyk_nail: yup.string().matches(/^\d+(\,\d{1,10})?$/, 'Formato errado')
            .required('Campo obrigatório'),
        woodResistanceClass: yup.string().required('Campo obrigatório')
        // fc0k_wood: yup.string().test(),
        // ft0k_wood: yup.string().required('Campo obrigatório'),
        // dicotyledonClass: yup.string().when('woodClass', {
        //     is: (woodClass) => woodClass === 'Dicotiledônia',
        //     then: yup.string().required('Campo obrigatório')
        // })
    })

    const { setStage3, stage2 } = useContext(DataContext);
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors }, watch } = useForm<Data['stage3']>(
        { resolver: yupResolver(schema) }
    );

    const dataWoodResistanceClass = WoodResistanceClasses
        .find((item) => { return item.name === stage2.woodClass })

    const dataWoodResistanceClassSelect = dataWoodResistanceClass
        .object.map((item) => {
            return ({
                value: item.name,
                id: item.id
            })
        })

    console.log(dataWoodResistanceClass)



    function handleDataRegister(data: Data['stage3']) {
        setStage3(data);
        //@ts-ignore
        navigation.navigate('NewCalc4');
    }

    return (
        <Background>
            <Header />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    <ProgressBar stage={3} />
                    <TitleSection title="Etapa 3" subtitle="Resistências características e forças atuantes" />
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
                            name="fyk_nail"
                            control={control}
                            title="fyk - prego"
                            dimension="MPa"
                            error={errors.fyk_nail}
                            keyboardType="numeric"
                        />

                        <FieldSelect
                            data={dataWoodResistanceClassSelect}
                            name="woodResistanceClass"
                            control={control}
                            title="Classe de resistência da madeira"
                            error={errors.woodResistanceClass}
                        />
                    </BackgroundFields>
                </View>
                <ButtonsPrevNext
                    nextAction={handleSubmit(handleDataRegister)}
                    //@ts-ignore
                    prevAction={() => { navigation.navigate('NewCalc2') }}
                />
            </ScrollView>
        </Background>
    )
}
