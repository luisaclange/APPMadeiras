import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { database } from '../../database';
import { CalcModel } from '../../database/models/calcModel';
import { BoxAlert, Container, FloatingButton, TextAlert } from './styles';
import CardCalc from '../../components/historic/cardCalc';
import Header from '../../components/historic/header';
import Background from '../../components/historic/background/index';
import LoadingPage from '../../components/global/loadingPage';
import ButtonDark from '../../components/global/buttons/buttonDark';

export default function Historic() {
  // Navegação
  const navigation = useNavigation();

  // Variáveis
  const [data, setData] = useState<CalcModel[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Buscar dados
  const GetData = useCallback(async () => {
    const aux = await database.get<CalcModel>('calcs').query().fetch();

    setData(aux.sort((a, b) => a.created_at - b.created_at));
    setRefresh(false);
    setIsLoading(false);
  }, []);

  // Buscar dados quando atualizar
  useEffect(() => {
    GetData();
  }, [refresh]);

  // Buscar dados quando a tela entra em foco
  useFocusEffect(
    React.useCallback(() => {
      GetData();
    }, [GetData]),
  );

  return (
    <Container>
      <Header />
      <Background>
        {!isLoading ? (
          <FlatList
            refreshing={refresh}
            onRefresh={() => {
              GetData();
            }}
            ListEmptyComponent={
              <BoxAlert>
                <TextAlert>Não há cálculos ainda...</TextAlert>
              </BoxAlert>
            }
            contentContainerStyle={{
              flexGrow: 1,
              padding: RFValue(16, 700),
            }}
            data={data}
            renderItem={(item) => {
              return (
                <CardCalc
                  item={item.item}
                  setRefresh={setRefresh}
                />
              );
            }}
          />
        ) : (
          <LoadingPage />
        )}
      </Background>

      <FloatingButton>
        <ButtonDark
          text='Novo cálculo'
          style={{ width: RFValue(230, 700) }}
          onPress={() => {
            navigation.dispatch(CommonActions.navigate('NewCalc1'))
          }}
        />
      </FloatingButton>
    </Container>
  );
}
