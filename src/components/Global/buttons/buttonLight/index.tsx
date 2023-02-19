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
	blackBorder?: boolean;
}

export default function ButtonLight({ text, onPress, style, blackBorder }: IProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Border style={style} blackBorder={blackBorder}>
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
