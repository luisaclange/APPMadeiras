import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';

interface IProps {
	children: React.ReactNode;
}

export default function Background({ children }: IProps) {
	return (
		<ImageBackground
			source={require('../../../assets/images/Background.png')}
			resizeMode='cover'
			style={{
				flexGrow: 1,
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
		</ImageBackground>
	);
}
