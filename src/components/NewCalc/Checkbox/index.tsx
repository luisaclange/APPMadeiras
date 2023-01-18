import React from 'react';
import { Controller } from 'react-hook-form';
import { TouchableWithoutFeedback, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Item, ItemText, MarkButton, Title } from './styles';

interface IProps {
	title: string;
	list: Array<{
		value: string;
	}>;
	name: string;
	control: any;
}

export function Checkbox({ title, list, name, control }: IProps) {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={list[0].value}
			render={({ field: { value, onChange } }) => {
				return (
					<View style={{ marginBottom: RFValue(16, 700) }}>
						<Title>{title}</Title>
						{list.map((item, index) => {
							return (
								<TouchableWithoutFeedback
									onPress={() => {
										onChange(item.value);
									}}
									key={item.value}
								>
									<Item>
										<MarkButton
											isMarked={
												list[index].value === value
											}
										/>
										<ItemText>{item.value}</ItemText>
									</Item>
								</TouchableWithoutFeedback>
							);
						})}
					</View>
				);
			}}
		/>
	);
}
