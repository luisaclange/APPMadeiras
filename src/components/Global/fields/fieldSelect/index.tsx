import React, { useState } from 'react';
import { Control, Controller, FieldError, FieldValues, Path, PathValue } from 'react-hook-form';
import {
  FlatList,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomModal from '../../../global/modal';
import {
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

export interface ISelect {
  value: string;
  id: string;
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
  defaultValue?: PathValue<TFieldValues, TFieldArrayName>,
  onPressAction?: () => void;
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
  onPressAction,
  ...rest
}: IProps<TFieldValues, TFieldArrayName>) {
  const [visible, setVisible] = useState(false);

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
              positionVertical='bottom'
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
                          <Icon
                            name="double-arrow"
                            color={
                              globalStyle.colors
                                .primary
                            }
                            size={RFValue(30, 700)}
                          />
                          <ItemText>
                            {item.item.value}
                          </ItemText>
                        </ItemSelect>
                      </TouchableOpacity>
                    );
                  }}
                />
              </Modal>
            </CustomModal>

            <Title error={!!error}>{title}</Title>
            <InputContainer error={!!error} onPress={() => {
              if (onPressAction) onPressAction();
              setVisible(true);
            }}>
              <Input
                value={data.find(item => item.id === value)?.value}
                editable={false}
                multiline
                {...rest}
              />
              <TouchableWithoutFeedback>
                <Icon
                  name="keyboard-arrow-down"
                  size={RFValue(30, 700)}
                  color={
                    error
                      ? globalStyle.colors.error
                      : globalStyle.colors.primary
                  }
                />
              </TouchableWithoutFeedback>
            </InputContainer>
            {error ? <Error>{error.message}</Error> : <Space />}
            <Space />
            {space ? <Space /> : null}
          </View>
        );
      }}
    />
  );
}
