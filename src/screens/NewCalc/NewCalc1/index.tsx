import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { TitleSection } from '../../../components/newCalc/titleSection';
import DataContext, { Data } from '../../../context/context';
import { Kmod } from '../../../archive/4_WoodProperties/Kmod';
import FieldSelect from '../../../components/global/fields/fieldSelect';
import Header, { ProgressNewCalc } from '../../../components/newCalc/header';
import { Container, ContainerFields } from './styles';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { schemaNewCalc1 } from '../../../validations/newCalc1';
import FieldInput from '../../../components/global/fields/fieldInput';
import FieldSelectWoods from '../../../components/newCalc/fieldSelectWoods';

export default function NewCalc1() {

  // Contexto
  const { setStage1 } = useContext(DataContext);

  //Navegação
  const navigation = useNavigation();

  // Dados para o select
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

  // Controle de formulário
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Data['stage1']>({ resolver: yupResolver(schemaNewCalc1) });

  // Guardar as informações
  function handleDataRegister(data: Data['stage1']) {
    setStage1({
      ...data,
      woodType: data.woodType === "madeiraSerrada" ? "madeiraSerrada" : 'madeiraRecomposta',
    });
    navigation.dispatch(CommonActions.navigate('NewCalc2'))
  }

  return (
    <Container>
      <Header title='Novo cálculo' progress={ProgressNewCalc.newCalc1} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ContainerFields>
          <TitleSection
            title="Etapa 1"
            subtitle="Características do ambiente e da madeira"
          />
          <FieldInput
            control={control}
            name='description'
            title='Descrição'
            error={errors.description}
          />
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
          <FieldSelectWoods
            control={control}
            name="woodName"
            title="Madeira utilizada"
            error={errors.woodName}
          />
          <FieldSelect
            data={[
              {
                id: 'madeiraSerrada',
                value: 'Madeira Serrada',
              },
              {
                id: 'madeiraRolica',
                value: 'Madeira Roliça',
              },
              {
                id: 'madeiraMLC',
                value: 'Madeira Lamelada Colada (MLC)',
              },
              {
                id: 'madeiraMLCC',
                value: 'Madeira Lamelada Colada Cruzada (MLCC)',
              },
              {
                id: 'madeiraLVL',
                value: 'Madeira Laminada Colada (LVL)',
              },
              {
                id: 'madeiraRecomposta',
                value: 'Madeira Recomposta',
              },
            ]}
            control={control}
            name="woodType"
            title="Tipo de madeira"
            error={errors.woodType}
          />
        </ContainerFields>
      </ScrollView>
      <ButtonsPrevNext
        prevAction={() => (navigation.goBack())}
        nextAction={handleSubmit(handleDataRegister)}
      />
    </Container>
  );
}
