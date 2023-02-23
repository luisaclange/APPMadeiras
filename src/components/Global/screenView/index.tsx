import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import globalStyle from '../../../styles/globalStyle';

interface IProps {
	children: React.ReactNode;
	hasFieldsInputs?: boolean;
}

export default function ScreenView({ children }: IProps) {
	return (
		<View style={{ height: '100%', backgroundColor: globalStyle.colors.secondary }}>
			<KeyboardAvoidingView behavior='height' style={{ height: '100%' }}>
				{children}
			</KeyboardAvoidingView>
		</View>
	);
}