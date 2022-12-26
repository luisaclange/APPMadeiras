import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import DataContext, { Data } from '../../../context/context';
import FieldSelect from '../../../components/global/fields/fieldSelect';
import Header, { ProgressNewCalc } from '../../../components/newCalc/header';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { Container, ContainerFields, ImageCorte } from './styles';
import { schemaNewCalc2 } from '../../../validations/newCalc2';
import { TitleSection } from '../../../components/newCalc/titleSection';

export default function NewCalc2() {

  // Contexto
  const { setStage2 } = useContext(DataContext);

  //Navegação
  const navigation = useNavigation();

  // Controle de formulário
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Data['stage2']>({ resolver: yupResolver(schemaNewCalc2) });

  // Guardar as informações
  function handleDataRegister(data: Data['stage2']) {
    setStage2(data);
    navigation.dispatch(CommonActions.navigate('NewCalc3'))
  }

  return (
    <Container>
      <Header title='Novo cálculo' progress={ProgressNewCalc.newCalc2} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ContainerFields>
          <TitleSection
            title="Etapa 2"
            subtitle="Tipo de ligação"
          />
          <FieldSelect
            control={control}
            data={[
              {
                id: "corteSimples",
                value: "Corte Simples",
              },
              {
                id: "corteDuplo",
                value: "Corte Duplo",
              }
            ]}
            name="ligationType"
            title='Tipo de ligação'
            error={errors.ligationType}
          />
          <FieldSelect
            control={control}
            data={[
              {
                id: "prego",
                value: "Prego",
              },
              {
                id: "parafusoSoberba",
                value: "Parafuso de rosca soberba",
              },
              {
                id: "parafusoPassante",
                value: "Parafuso passante",
              }
            ]}
            name="nailType"
            title='Tipo de pino metálico'
            error={errors.nailType}
          />
          <FieldSelect
            control={control}
            data={[
              {
                id: "nailQtde",
                value: "Número de pinos",
              },
              {
                id: "maxForce",
                value: "Força máxima aplicada",
              }
            ]}
            name="calc"
            title='Cálculo'
            error={errors.calc}
          />
          {
            watch('ligationType') ? <ImageCorte
              source={watch('ligationType') === 'corteSimples' ? require('../../../assets/images/cortes/cortesimples.png') : require('../../../assets/images/cortes/corteduplo.png')}
              resizeMode={'center'}
            /> : null
          }
        </ContainerFields>
      </ScrollView>
      <ButtonsPrevNext
        prevAction={() => (navigation.goBack())}
        nextAction={handleSubmit(handleDataRegister)}
      />
    </Container>
  );
}
