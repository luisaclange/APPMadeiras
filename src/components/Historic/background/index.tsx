import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from './styles';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
	children: React.ReactNode;
}

export default function Background({ children }: IProps) {
	return (
		<>
			<Image
				source={require('../../../assets/images/Background.png')}
				imageStyle={{
					height:
						RFValue(580, 700) +
						Dimensions.get('screen').height -
						Dimensions.get('window').height,
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
		</>
	);
}
