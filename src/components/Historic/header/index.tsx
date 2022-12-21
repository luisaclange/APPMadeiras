import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import Logo from '../../../assets/svgs/logo.svg';
import { Container, IconBox } from './styles';
import Filter from '../../../assets/svgs/filter.svg';
import Find from '../../../assets/svgs/find.svg';

export default function Header() {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.dispatch(CommonActions.navigate('Home'));
        }}
      >
        <Logo
          width={RFValue(115, 700)}
          style={{
            marginLeft: RFValue(16, 700),
            marginBottom: RFValue(8, 700),
          }}
        />
      </TouchableWithoutFeedback>

      <Container>
        <IconBox
          onPress={() => {
            navigation.dispatch(CommonActions.navigate('Historic'));
          }}
        >
          <Find />
        </IconBox>

        <IconBox
          onPress={() => {
            navigation.dispatch(CommonActions.navigate('Filter'));
          }}
        >
          <Filter />
        </IconBox>

      </Container>
    </Container>
  );
}
