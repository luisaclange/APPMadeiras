import React from 'react';
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import ButtonDark from '../../components/global/buttons/buttonDark';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Edit from '../../assets/svgs/edit.svg'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../routes/App.routes';

export default function Results({ route }: NativeStackScreenProps<TRootStackParamList, 'Results'>) {
  const { id_calc } = route.params.params || {};

  const navigation = useNavigation()

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      imageStyle={{
        height: Dimensions.get('screen').height - RFValue(120, 700),
      }}
    >
      <TouchableOpacity onPress={() => {
        navigation.dispatch(CommonActions.navigate('NewCalc1', {
          params: { id_calc }
        }))
      }}
        style={{ marginTop: 300 }}
      >
        <Edit />
      </TouchableOpacity>
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
