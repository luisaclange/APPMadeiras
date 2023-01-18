import React, { useEffect, useState } from 'react';
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
import { NativeWoods } from '../../../archive/3_NativeWood/NativeWood';
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
  defaultValue,
  ...rest
}: IProps<TFieldValues, TFieldArrayName>) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(
    NativeWoods.sort((a, b) => Number(a.name) - Number(b.name)),
  );
  const [text, setText] = useState<string>();

  useEffect(() => {
    if (text) {
      const aux = NativeWoods.filter((item) =>
        item.name.toUpperCase().includes(text.toUpperCase()),
      );

      setData(aux.sort((a, b) => Number(a.name) - Number(b.name)));
    } else {
      setData(NativeWoods.sort((a, b) => Number(a.name) - Number(b.name)));
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
              positionVertical='bottom'
            >
              <Modal>
                <SelectText>Selecione:</SelectText>
                <Find>
                  <FindInput
                    placeholder="Buscar..."
                    value={text}
                    onChangeText={(txt) => {
                      setText(txt);
                    }}
                  />
                  <Icon
                    name="search"
                    size={RFValue(30, 700)}
                    color={globalStyle.colors.grey}
                  />
                </Find>
                <FlatList
                  data={data}
                  contentContainerStyle={{
                    borderTopWidth: RFValue(2, 700),
                    borderColor: globalStyle.colors.primary,
                    borderStyle: 'dashed',
                  }}
                  renderItem={(item) => {
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
                          <Icon
                            name="double-arrow"
                            color={
                              globalStyle.colors
                                .primary
                            }
                            size={RFValue(30, 700)}
                          />
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
            </CustomModal>

            <Title error={!!error}>{title}</Title>
            <InputContainer error={!!error} onPress={() => {
              setVisible(true);
            }}>
              <Input
                value={data.find(item => item.id === value)?.name}
                editable={false}
                multiline
                {...rest}
              />
              <TouchableWithoutFeedback >
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
            {space ? <Space /> : <></>}
          </View>
        );
      }}
    />
  );
}
