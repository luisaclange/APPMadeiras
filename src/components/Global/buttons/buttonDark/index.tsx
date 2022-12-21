import React from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { Border, Container, TextButton } from './styles';

interface IProps extends TouchableOpacityProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function ButtonDark({ text, onPress, style }: IProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Border style={style}>
        <Container>
          <TextButton>{text}</TextButton>
        </Container>
      </Border>
    </TouchableOpacity>
  );
}

ButtonDark.defaultProps = {
  style: undefined,
  onPress: undefined,
};
