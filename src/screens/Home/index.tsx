import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/svgs/logo.svg';
import ButtonLight from '../../components/global/buttons/buttonLight';
import {
  Background,
  Container,
  ContainerButtons,
  ContainerText,
  Description,
} from './styles';
import PopUpOneButton from '../../components/global/popUps/popUpOneButton';

const styles = StyleSheet.create({
  buttonLight: {
    width: RFValue(250, 700),
    marginBottom: RFValue(16, 700),
  },
});

export default function Home() {
  // Navegação
  const navigation = useNavigation();

  // Variáveis
  const [visibleAboutModal, setVisibleAboutModal] = useState(false);

  return (
    <>
      <PopUpOneButton
        actionButton={() => {
          setVisibleAboutModal(false);
        }}
        message="Sobre o aplicativo"
        setVisible={setVisibleAboutModal}
        textButton="Fechar"
        visible={visibleAboutModal}
      />
      <Background source={require('../../assets/images/HomeBackground.png')}>
        <Container>
          <ContainerText>
            <Logo />
            <Description>
              Aplicativo de dimensionamento de ligações em madeira
            </Description>
          </ContainerText>
          <ContainerButtons>
            <ButtonLight
              text="Sobre"
              style={styles.buttonLight}
              onPress={() => {
                setVisibleAboutModal(true)
              }}
            />
            <ButtonLight
              text="Começar"
              style={{ width: RFValue(250, 700) }}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.navigate('Historic'),
                );
              }}
            />
          </ContainerButtons>
        </Container>
      </Background>
    </>
  );
}
