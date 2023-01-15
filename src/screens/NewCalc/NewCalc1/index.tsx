import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView } from 'react-native';
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../routes/App.routes';
import { CalcModel } from '../../../database/models/calcModel';
import { database } from '../../../database';
import LoadingPage from '../../../components/global/loadingPage';
import { WoodTypeData } from '../../../interfaces/WoodType';

export default function NewCalc1({ route }: NativeStackScreenProps<TRootStackParamList, 'NewCalc1'>) {
  //Navegação e parametros
  const navigation = useNavigation();
  const { id_calc } = route?.params?.params || {};

  // Contexto
  const { setStage1 } = useContext(DataContext);

  // Variáveis
  const [dataStage, setDataStage] = useState<CalcModel | Record<string, never>>({});
  const [loadingPage, setLoadingPage] = useState(true);

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

  // Buscar dados
  async function GetData() {
    try {
      if (id_calc) {
        const calc = await database.get<CalcModel>('calcs').find(id_calc);
        setDataStage(calc);
      }
    } catch (error) {
      Alert.alert('Ops, ocorreu um erro!', error.message)
    } finally {
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    GetData();
  }, [])

  // Guardar as informações
  async function handleDataRegister(data: Data['stage1']) {
    try {
      setStage1(data);

      navigation.dispatch(CommonActions.navigate('NewCalc2', { params: { id_calc } }))
    } catch (error) {
      Alert.alert('Ops, ocorreu um erro!', error.message);
    }
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
          {
            !loadingPage ? <>
              <FieldInput
                control={control}
                name='description'
                title='Descrição'
                error={errors.description}
                defaultValue={dataStage?.description}
              />
              <FieldSelect
                data={dataCharging}
                name="charging"
                control={control}
                title="Carregamento"
                error={errors.charging}
                defaultValue={dataStage?.charging}
              />
              <FieldSelect
                data={dataHumidityClass}
                name="humidityClass"
                control={control}
                title="Classe de umidade"
                error={errors.humidityClass}
                defaultValue={dataStage?.humidityClass}
              />
              <FieldSelectWoods
                control={control}
                name="woodName"
                title="Madeira utilizada"
                error={errors.woodName}
                defaultValue={dataStage?.woodName}
              />
              <FieldSelect
                data={WoodTypeData}
                control={control}
                name="woodType"
                title="Tipo de madeira"
                error={errors.woodType}
                defaultValue={dataStage?.woodType}
              />
            </>
              : <LoadingPage />
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
