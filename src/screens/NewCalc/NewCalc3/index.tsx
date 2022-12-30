import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import DataContext, { Data } from '../../../context/context';
import FieldSelect from '../../../components/global/fields/fieldSelect';
import Header, { ProgressNewCalc } from '../../../components/newCalc/header';
import { ButtonsPrevNext } from '../../../components/newCalc/buttonsPrevNext';
import { Container, ContainerFields, ImageCorte } from './styles';
import { TitleSection } from '../../../components/newCalc/titleSection';
import { schemaNewCalc3 } from '../../../validations/newCalc3';
import FieldInput from '../../../components/global/fields/fieldInput';
import { database } from '../../../database';
import { CalcModel } from '../../../database/models/calcModel';
import PopUpOneButton from '../../../components/global/popUps/popUpOneButton';
import { Q } from '@nozbe/watermelondb';

export default function NewCalc3() {

  // Contexto
  const { stage1, stage2 } = useContext(DataContext);

  //Navegação
  const navigation = useNavigation();

  // Variáveis
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [id, setId] = useState<string>();

  // Controle de formulário
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Data['stage3']>({ resolver: yupResolver(schemaNewCalc3) });

  // Guardar as informações
  async function handleDataRegister(data: Data['stage3']) {
    try {
      const calcs = database.get<CalcModel>('calcs');
      const date = Number(new Date()) - 3600000;
      await database.write(async () => {
        const calc = await calcs.create(newCalc => {
          // Parte 1
          newCalc.charging = stage1.charging;
          newCalc.description = stage1.description;
          newCalc.humidityClass = stage1.humidityClass;
          newCalc.woodType = stage1.woodType;
          newCalc.woodName = stage1.woodName;

          // Parte 2
          newCalc.calc = stage2.calc;
          newCalc.ligationType = stage2.ligationType;
          newCalc.nailType = stage2.nailType;

          // Parte 3
          newCalc.espWood_1 = Number(data.espWood_1);
          newCalc.espWood_2 = Number(data.espWood_2);
          newCalc.nailDimension = data.nailDimension || 'jdjfkb';
          newCalc.numberNails = Number(data.numberNails) || 0;
          newCalc.tractiveForce = Number(data.tractiveForce) || 0;
          newCalc.widthWood = Number(data.widthWood);

          // Outros
          newCalc.created_at = date;
          newCalc.updated_at = date;
          newCalc.visualized_at = 0;
        })

        setId(calc.id);
      })

      setVisibleSuccess(true);
    } catch (error) {
      console.error(error)
      setVisibleError(true);
    }
  }

  return (
    <Container>
      <PopUpOneButton
        actionButton={() => {
          setVisibleSuccess(false);
          navigation.dispatch(CommonActions.navigate('Result', {
            params: { id }
          }))
        }}
        message="Cálculo cadastrado com sucesso!"
        setVisible={setVisibleSuccess}
        textButton="Resultados"
        visible={visibleSuccess}
      />
      <PopUpOneButton
        actionButton={() => {
          setVisibleError(false);
        }}
        message="Ops! Ocorreu um erro. Tente novamente mais tarde"
        setVisible={setVisibleError}
        textButton="OK"
        visible={visibleError}
      />
      <Header title='Novo cálculo' progress={ProgressNewCalc.newCalc3} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ContainerFields>
          <TitleSection
            title="Etapa 3"
            subtitle="Dimensões da ligação"
          />
          <ImageCorte
            source={stage2.ligationType === "corteSimples" ? require('../../../assets/images/dimensoes/cortesimples.png') : require('../../../assets/images/dimensoes/corteduplo.png')}
            resizeMode={'center'}
          />
          <FieldInput
            control={control}
            name="espWood_1"
            title="Espessura - peça 1 (t1)"
            error={errors.espWood_1}
            dimension="mm"
          />
          <FieldInput
            control={control}
            name="espWood_2"
            title="Espessura - peça 2 (t2)"
            error={errors.espWood_2}
            dimension="mm"
          />
          <FieldInput
            control={control}
            name="widthWood"
            title="Largura das peças (L)"
            error={errors.widthWood}
            dimension="mm"
          />
          <FieldSelect
            data={[]}
            control={control}
            name="nailDimension"
            title="Pino utilizado"
          />
          {
            stage2.calc === "nailQtde" ? <FieldInput
              control={control}
              name="numberNails"
              title="Quantidade de pinos"
              error={errors.numberNails}
              dimension="un"
            /> : <FieldInput
              control={control}
              name="tractiveForce"
              title="Força solicitante (Sd)"
              error={errors.tractiveForce}
              dimension="KN"
            />
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
