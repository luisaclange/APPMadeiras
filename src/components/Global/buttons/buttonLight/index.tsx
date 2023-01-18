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

export default function ButtonLight({ text, onPress, style }: IProps) {
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

ButtonLight.defaultProps = {
	style: undefined,
	onPress: undefined,
};
