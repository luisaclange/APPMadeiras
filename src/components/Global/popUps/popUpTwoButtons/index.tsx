import React, { Dispatch, SetStateAction } from 'react';
import ButtonDark from '../../buttons/buttonDark';
import CustomModal from '../../modal';
import {
	ButtonsContainer,
	Container,
	Message,
	MessageContainer,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

interface IProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	message: string;
	lActionButton: () => void;
	lTextButton: string;
	rActionButton: () => void;
	rTextButton: string;
}

export default function PopUpTwoButtons({
	setVisible,
	visible,
	message,
	lActionButton,
	lTextButton,
	rActionButton,
	rTextButton,
}: IProps) {
	return (
		<CustomModal
			backdrop
			dismissOnPress
			setVisible={setVisible}
			visible={visible}
		>
			<Container>
				<MessageContainer>
					<Message>{message}</Message>
				</MessageContainer>
				<ButtonsContainer>
					<ButtonDark onPress={lActionButton} text={lTextButton} style={{
						width: (Dimensions.get('screen').width - RFValue(64, 700)) / 2 - RFValue(8, 700),
						maxWidth: (RFValue(318, 700)) / 2 - RFValue(8, 700),
						marginRight: RFValue(8, 700)
					}} />
					<ButtonDark onPress={rActionButton} text={rTextButton} style={{
						width: (Dimensions.get('screen').width - RFValue(64, 700)) / 2 - RFValue(8, 700),
						maxWidth: (RFValue(318, 700)) / 2 - RFValue(8, 700),
						marginLeft: RFValue(8, 700)
					}} />
				</ButtonsContainer>
			</Container>
		</CustomModal>
	);
}
