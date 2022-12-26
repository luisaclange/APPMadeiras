import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import DataContext, { Data } from '../../../context/context';
import FieldSelect from '../../../components/global/fields/fieldSelect';
import Header, { ProgressNewCalc } from '../../../components/newCalc/header';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { Container, ContainerFields } from './styles';
import { TitleSection } from '../../../components/newCalc/titleSection';
import { schemaNewCalc3 } from '../../../validations/newCalc3';
import FieldInput from '../../../components/global/fields/fieldInput';

export default function NewCalc3() {

  // Contexto
  const { setStage3, stage2 } = useContext(DataContext);

  //Navegação
  const navigation = useNavigation();

  // Controle de formulário
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Data['stage3']>({ resolver: yupResolver(schemaNewCalc3) });

  // Guardar as informações
  function handleDataRegister(data: Data['stage3']) {
    setStage3(data);
    navigation.dispatch(CommonActions.navigate('NewCalc3'))
  }

  return (
    <Container>
      <Header title='Novo cálculo' progress={ProgressNewCalc.newCalc3} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ContainerFields>
          <TitleSection
            title="Etapa 3"
            subtitle="Dimensões da ligação"
          />
          <FieldInput
            control={control}
            name="espWood_1"
            title="Espessura - peça 1"
            error={errors.espWood_1}
            dimension="mm"
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
