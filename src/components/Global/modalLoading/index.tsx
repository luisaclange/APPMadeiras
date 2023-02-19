import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import globalStyle from '../../../styles/globalStyle';
import { Container } from './styles';

export default function ModalLoading() {
	return (
		<Modal statusBarTranslucent visible={true} transparent>
			<Container>
				<ActivityIndicator
					color={globalStyle.colors.secondary}
					size="large"
					style={{ marginTop: 200 }}
				/>
			</Container>
		</Modal>
	);
}