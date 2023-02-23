import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from './styles';

interface IProps {
	children: React.ReactNode;
}

export default function Background({ children }: IProps) {
	return (
		<Image
			source={require('../../../assets/images/Background.png')}
			imageStyle={{
				height: '100%',
			}}
		>
			<LinearGradient
				colors={[
					'#593b2b',
					'transparent',
					'transparent',
					'transparent',
					'#593b2b',
				]}
				style={{ height: '100%' }}
			>
				{children}
			</LinearGradient>
		</Image>
	);
}
