import React from 'react';
import {
  Dimensions,
  ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function Result({ route }: any) {
  const { id_calc } = route.params.params;

  const navigation = useNavigation()

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      imageStyle={{
        height: Dimensions.get('screen').height - RFValue(120, 700),
      }}
    >
      <ButtonDark
        text="Voltar"
        onPress={() => {
          navigation.dispatch(CommonActions.navigate('Historic'));
        }}
        style={{ marginTop: 100 }}
      />
    </ImageBackground>
  );
}
