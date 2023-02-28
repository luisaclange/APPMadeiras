import React, { useEffect, useState } from 'react';
import {
	Control,
	Controller,
	FieldError,
	FieldValues,
	Path,
	PathValue,
} from 'react-hook-form';
import {
	FlatList,
	KeyboardAvoidingView,
	TextInputProps,
	TouchableOpacity,
	View,
} from 'react-native';
import DoubleArrow from '../../../assets/svgs/doubleArrow.svg';
import ArrowUp from '../../../assets/svgs/arrowUp.svg';
import ArrowDown from '../../../assets/svgs/arrowDown.svg';
import FindIcon from '../../../assets/svgs/find.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import {
	Error,
	Find,
	FindInput,
	Input,
	InputContainer,
	ItemSelect,
	ItemSubText,
	ItemText,
	Modal,
	SelectText,
	Space,
	Title,
} from './styles';
import { NativeWoods } from '../../../archive/NBRTables/NativeWood/NativeWood';
import globalStyle from '../../../styles/globalStyle';
import CustomModal from '../../global/modal';

interface IProps<
	TFieldValues extends FieldValues,
	TFieldArrayName extends Path<TFieldValues>,
> extends TextInputProps {
	title: string;
	name: TFieldArrayName;
	control: Control<TFieldValues>;
	error?: FieldError;
	space?: boolean;
	defaultValue?: PathValue<TFieldValues, TFieldArrayName>;
}

export default function FieldSelectWoods<
	TFieldValues extends FieldValues,
	TFieldArrayName extends Path<TFieldValues>,
>({
	title,
	space,
	error,
	name,
	control,
	defaultValue
}: IProps<TFieldValues, TFieldArrayName>) {
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState(
		NativeWoods.sort((a, b) => Number(a.name) - Number(b.name)),
	);
	const [text, setText] = useState<string>();

	useEffect(() => {
		if (text) {
			const aux = NativeWoods.filter(item =>
				item.name.toUpperCase().includes(text.toUpperCase()),
			);

			setData(aux.sort((a, b) => Number(a.name) - Number(b.name)));
		} else {
			setData(
				NativeWoods.sort((a, b) => Number(a.name) - Number(b.name)),
			);
		}
	}, [text]);

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { value, onChange } }) => {
				return (
					<View>
						<CustomModal
							backdrop
							dismissOnPress
							setVisible={setVisible}
							visible={visible}
							positionVertical="bottom"
						>
							<KeyboardAvoidingView behavior="padding">
								<Modal>
									<SelectText>Selecione:</SelectText>
									<Find>
										<FindInput
											placeholder="Buscar..."
											value={text}
											onChangeText={txt => {
												setText(txt);
											}}
										/>
										<FindIcon />
									</Find>
									<FlatList
										data={data}
										contentContainerStyle={{
											borderTopWidth: RFValue(2, 700),
											borderColor: globalStyle.colors.primary,
											borderStyle: 'dashed',
										}}
										keyboardShouldPersistTaps="always"
										renderItem={item => {
											return (
												<TouchableOpacity
													onPress={() => {
														onChange(item.item.id);
														setVisible(false);
														setText(undefined);
													}}
													key={`Madeira${item.item.id}`}
												>
													<ItemSelect>
														<DoubleArrow />
														<View>
															<ItemText>
																{item.item.name} #
																{item.item.class}
															</ItemText>
															<ItemSubText>
																{
																	item.item
																		.scientificName
																}
															</ItemSubText>
														</View>
													</ItemSelect>
												</TouchableOpacity>
											);
										}}
									/>
								</Modal>
							</KeyboardAvoidingView>
						</CustomModal>

						<Title error={!!error}>{title}</Title>
						<InputContainer
							error={!!error}
							onPress={() => {
								setVisible(true);
							}}
						>
							<Input
								value={
									data.find(item => item.id === value)?.name
								}
								editable={false}
								multiline
							/>
							{
								visible ? <ArrowUp color={error ? globalStyle.colors.error : globalStyle.colors.primary} /> : <ArrowDown color={error ? globalStyle.colors.error : globalStyle.colors.primary} />
							}
						</InputContainer>
						{error ? <Error>{error.message}</Error> : <Space />}
						<Space />
						{space ? <Space /> : <></>}
					</View>
				);
			}}
		/>
	);
}
