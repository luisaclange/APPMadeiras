import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import globalStyle from '../../../styles/globalStyle';
import CustomModal from '../../global/modal';
import { Container, TextLoading } from './style';
import { LinearGradient } from 'expo-linear-gradient';

export default function ModalLoading() {
	const [visible, setVisible] = useState(true);
	return (
		<CustomModal backdrop setVisible={setVisible} dismissOnPress={false} visible={visible}>
			<Container source={require('../../../assets/images/Background.png')}
				imageStyle={{
					height: '100%',
				}}>
				<LinearGradient
					colors={[
						'#593b2b',
						'transparent',
						'transparent',
						'transparent',
						'#593b2b',
					]}
					style={{ height: '100%', alignItems: 'center' }}
				>
					<ActivityIndicator
						color={globalStyle.colors.primary}
						size={80}
						style={{ marginTop: 200 }}
					/>
					<TextLoading>Aguarde enquanto o cálculo é feito...</TextLoading>
				</LinearGradient>
			</Container>
		</CustomModal >
	);
}