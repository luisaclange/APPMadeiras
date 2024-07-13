import React, { Dispatch, SetStateAction } from 'react';
import { ActivityIndicator } from 'react-native';
import globalStyle from '../../../styles/globalStyle';
import CustomModal from '../modal';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function ModalLoading({ setVisible, visible }: IProps) {
	return (
		<CustomModal backdrop setVisible={setVisible} dismissOnPress={false} visible={visible}>
			<ActivityIndicator
				color={globalStyle.colors.primary}
				size={80}
				style={{ marginTop: RFValue(80, 700) }}
			/>
		</CustomModal>
	);
}