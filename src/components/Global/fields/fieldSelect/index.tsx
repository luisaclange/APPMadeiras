import React, { useState } from 'react';
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
	TextInputProps,
	TouchableOpacity,
	View,
} from 'react-native';
import DoubleArrow from '../../../../assets/svgs/doubleArrow.svg';
import Delete from '../../../../assets/svgs/delete.svg';
import ArrowUp from '../../../../assets/svgs/arrowUp.svg';
import ArrowDown from '../../../../assets/svgs/arrowDown.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomModal from '../../../global/modal';
import {
	ContainerExclude,
	Error,
	Input,
	InputContainer,
	ItemSelect,
	ItemText,
	Modal,
	SelectText,
	Space,
	Title,
} from './styles';
import globalStyle from '../../../../styles/globalStyle';
import { database } from '../../../../database';
import PopUpOneButton from '../../popUps/popUpOneButton';
import ButtonDark from '../../buttons/buttonDark';
import { CommonActions, useNavigation } from '@react-navigation/native';
import PopUpTwoButtons from '../../popUps/popUpTwoButtons';

export interface ISelect {
	value: string;
	id: string;
	isDataFile?: boolean;
}

interface IProps<
	TFieldValues extends FieldValues,
	TFieldArrayName extends Path<TFieldValues>,
> extends TextInputProps {
	title: string;
	name: TFieldArrayName;
	control: Control<TFieldValues>;
	error?: FieldError;
	data: ISelect[];
	space?: boolean;
	defaultValue?: PathValue<TFieldValues, TFieldArrayName>;
	onPress?: () => void;
	tableName?: string;
	refresh?: () => void;
	navigationScreen?: string;
}

export default function FieldSelect<
	TFieldValues extends FieldValues,
	TFieldArrayName extends Path<TFieldValues>,
>({
	title,
	space,
	error,
	name,
	control,
	data,
	defaultValue,
	tableName,
	navigationScreen,
	refresh,
	onPress
}: IProps<TFieldValues, TFieldArrayName>) {
	const [visible, setVisible] = useState(false);
	const [visibleError, setVisibleError] = useState(false);
	const [visibleQuestion, setVisibleQuestion] = useState(false);
	const [id, setId] = useState('');
	const navigation = useNavigation();

	async function DeleteItem(id: string) {
		try {
			const aux = await database.get(tableName).find(id);
			await database.write(async () => {
				aux.destroyPermanently();
			});
			refresh();
		} catch (error) {
			setVisibleError(true);
		}
	}

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { value, onChange } }) => {
				return (
					<View>
						<PopUpOneButton
							actionButton={() => setVisibleError(false)}
							message='Ops, ocorreu um erro!'
							setVisible={setVisibleError}
							textButton='Voltar'
							visible={visibleError}
						/>
						<PopUpTwoButtons
							lActionButton={() => {
								setVisibleQuestion(false);
							}}
							message='Tem certeza de que deseja excluir esse item?'
							setVisible={setVisibleQuestion}
							lTextButton='Não'
							rActionButton={() => {
								setVisibleQuestion(false);
								DeleteItem(id);
							}}
							rTextButton='Sim'
							visible={visibleQuestion}
						/>
						<CustomModal
							backdrop
							dismissOnPress
							setVisible={setVisible}
							visible={visible}
							positionVertical="bottom"
						>
							<Modal>
								<SelectText>Selecione:</SelectText>
								<FlatList
									data={data}
									contentContainerStyle={{
										borderTopWidth: RFValue(2, 700),
										borderColor: globalStyle.colors.primary,
										borderStyle: 'dashed',
									}}
									renderItem={item => {
										return (
											<TouchableOpacity
												onPress={() => {
													onChange(item.item.id);
													setVisible(false);
												}}
											>
												<ItemSelect>
													<DoubleArrow />
													<ItemText>
														{item.item.value}
													</ItemText>
													{
														item.item.isDataFile &&
														<ContainerExclude onPress={() => {
															setId(item.item.id);
															setVisibleQuestion(true);
														}}>
															<Delete />
														</ContainerExclude>
													}
												</ItemSelect>
											</TouchableOpacity>
										);
									}}
								/>
								{
									navigationScreen &&
									<ButtonDark
										text={`Novo ${navigationScreen === 'NewNail' ? 'Prego' : 'Parafuso'}`}
										style={{ marginTop: RFValue(8, 700) }}
										onPress={() => {
											setVisible(false);
											navigation.dispatch(CommonActions.navigate(navigationScreen));
										}}
									/>
								}
							</Modal>
						</CustomModal>

						<Title error={!!error}>{title}</Title>
						<InputContainer
							error={!!error}
							onPress={() => {
								if (onPress) onPress();
								setVisible(prevState => !prevState);
							}}
						>
							<Input
								value={
									data.find(item => item.id === value)?.value
								}
								editable={false}
								multiline
							/>
							{
								visible ?
									<ArrowUp color={error ? globalStyle.colors.error : globalStyle.colors.primary} />
									: <ArrowDown color={error ? globalStyle.colors.error : globalStyle.colors.primary} />
							}
						</InputContainer>
						{error ? <Error>{error.message}</Error> : <Space />}
						<Space />
						{space && <Space />}
					</View>
				);
			}}
		/>
	);
}
