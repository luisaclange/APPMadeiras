import React from 'react';
import { Container } from './styles';
import ButtonDark from '../../global/buttons/buttonDark';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
	prevAction?: () => void;
	nextAction?: () => void;
}

export function ButtonsPrevNext({ nextAction, prevAction }: IProps) {
	return (
		<Container
			style={{
				justifyContent:
					prevAction && nextAction
						? 'space-between'
						: prevAction
						? 'flex-start'
						: 'flex-end',
			}}
		>
			{prevAction ? (
				<ButtonDark
					text="Voltar"
					onPress={prevAction}
					style={{ width: RFValue(150, 700) }}
				/>
			) : null}
			{nextAction ? (
				<ButtonDark
					text="Próximo"
					onPress={nextAction}
					style={{ width: RFValue(150, 700) }}
				/>
			) : null}
		</Container>
	);
}
