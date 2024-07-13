import React from 'react';
import {
	Container,
	IconContainer,
	ItensContainer,
	Shadow,
	Title,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';

interface IProps {
	title: string;
}

export default function Header({ title }: IProps) {
	return (
		<Container
			source={require('../../../assets/images/Background.png')}
			imageStyle={{
				height: RFValue(120, 700),
			}}
		>
			<Shadow style={{ opacity: 0.4 }} />
			<LinearGradient
				colors={['#211610', 'transparent']}
				style={{
					height: '100%',
					position: 'absolute',
					width: '100%',
					justifyContent: 'flex-end',
					paddingBottom: RFValue(16, 700),
				}}
			>
				<ItensContainer>
					<IconContainer />
					<Title>{title}</Title>
					<IconContainer />
				</ItensContainer>
			</LinearGradient>
		</Container>
	);
}
