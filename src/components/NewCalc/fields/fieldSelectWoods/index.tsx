import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
    FlatList,
    TextInput,
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
import globalStyle from '../../../../styles/globalStyle';
import { NativeWoods } from '../../../../archive/NativeWood/NativeWood';

interface IProps extends TextInputProps {
    title: string;
    name: string;
    control: Control<any>;
    error?: FieldError | undefined;
    space?: boolean;
}

export default function FieldSelectWoods({
    title,
    space,
    error,
    name,
    control,
    ...rest
}: IProps) {
    const [visible, setVisible] = useState(false);
    const [auxValue, setAuxValue] = useState<string | undefined>(undefined);
    const [data, setData] = useState(
        NativeWoods.sort((a, b) => a.name > b.name),
    );
    const [text, setText] = useState<string | undefined>();

    useEffect(() => {
        if (text) {
            const aux = NativeWoods.filter((item) =>
                item.name.toUpperCase().includes(text.toUpperCase()),
            );

            setData(aux.sort((a, b) => a.name > b.name));
        } else {
            setData(NativeWoods.sort((a, b) => a.name > b.name));
        }
    }, [text]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
                return (
                    <View>
                        <CustomModal
                            backdrop
                            dismissOnPress
                            setVisible={setVisible}
                            visible={visible}
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
                                                    setAuxValue(item.item.name);
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
                        <InputContainer error={!!error}>
                            <Input
                                value={auxValue}
                                editable={false}
                                multiline
                                {...rest}
                            />
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setVisible(true);
                                }}
                            >
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
