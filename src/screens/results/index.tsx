import React, { useCallback, useEffect, useState } from 'react';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../routes/App.routes';
import Header from '../../components/global/header';
import { Container, ContainerButtons, ContainerInfo, ContainerScroll } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import LoadingPage from '../../components/global/loadingPage';
import { CalcModel } from '../../database/models/calcModel';
import { database } from '../../database';
import PopUpOneButton from '../../components/global/popUps/popUpOneButton';
import { Kmod } from '../../archive/4_WoodProperties/Kmod';
import { NativeWoods } from '../../archive/3_NativeWood/NativeWood';

export default function Results({ route }: NativeStackScreenProps<TRootStackParamList, 'Results'>) {
  // Parâmetros
  const { id_calc } = route.params.params || {};

  // Navegação
  const navigation = useNavigation();

  // Variáveis
  const [loading, setLoading] = useState(true);
  const [visibleError, setVisibleError] = useState(false);

  // Buscar dados
  const GetData = useCallback(async () => {
    try {
      setLoading(false)
    } catch (error) {
      setVisibleError(true);
    }
  }, []);

  useEffect(() => {
    GetData();
  }, []);

  return (
    <Container>
      <PopUpOneButton
        actionButton={() => {
          setVisibleError(false);
          navigation.dispatch(CommonActions.navigate('Historic'));
        }}
        message="Ops, ocorreu um erro"
        setVisible={setVisibleError}
        textButton="Voltar"
        visible={visibleError}
      />
      <Header title='Resultados' />
      <ContainerScroll>
        {
          !loading ?
            <ContainerInfo>

            </ContainerInfo>
            :
            <LoadingPage />
        }
      </ContainerScroll>
      <ContainerButtons>
        <ButtonDark
          text="Voltar"
          onPress={() => {
            navigation.dispatch(CommonActions.navigate('Historic'));
          }}
          style={{ width: RFValue(150, 700) }}
        />
        <ButtonDark
          text="Editar"
          onPress={() => {
            navigation.dispatch(CommonActions.navigate('NewCalc1', {
              params: { id_calc }
            }))
          }}
          style={{ width: RFValue(150, 700) }}
        />
      </ContainerButtons>
    </Container>
  );
}
