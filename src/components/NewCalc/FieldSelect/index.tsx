import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { FlatList, TextInputProps, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import CustomModal from "../../Global/Modal";
import { Error, Input, InputContainer, ItemSelect, ItemText, Modal, SelectText, Space, Title } from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from "react-native-responsive-fontsize";
import globalStyle from "../../../styles/globalStyle";

interface props extends TextInputProps {
    title: string;
    name: string;
    control: Control<any>;
    error?: FieldError | undefined;
    data: Array<{
        value: string,
        id?: string
    }>;
    space?: boolean;
}

export const FieldSelect: React.FC<props> = ({ title, space, error, name, control, data, ...rest }) => {

    const [visible, setVisible] = useState(false);
    const [auxValue, setAuxValue] = useState<string | undefined>(undefined);

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
                                <FlatList
                                    data={data}
                                    contentContainerStyle={{
                                        borderTopWidth: RFValue(2, 700),
                                        borderColor: globalStyle.colors.primary,
                                        borderStyle: 'dashed'
                                    }}
                                    renderItem={(item) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                onChange(item.item.id);
                                                setAuxValue(item.item.value);
                                                setVisible(false);
                                            }}>
                                                <ItemSelect>
                                                    <Icon name="double-arrow" color={globalStyle.colors.primary} size={RFValue(30, 700)} />
                                                    <ItemText>{item.item.value}</ItemText>
                                                </ItemSelect>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </Modal>
                        </CustomModal>

                        <Title error={error ? true : false}>{title}</Title>
                        <InputContainer error={error ? true : false}>
                            <Input
                                value={auxValue}
                                editable={false}
                                multiline={true}
                                {...rest}
                            />
                            <TouchableWithoutFeedback onPress={() => { setVisible(true) }}>
                                <Icon
                                    name="keyboard-arrow-down"
                                    size={RFValue(30, 700)}
                                    color={error ? globalStyle.colors.error : globalStyle.colors.primary}
                                />
                            </TouchableWithoutFeedback>
                        </InputContainer>
                        {
                            error ?
                                <Error>{error.message}</Error>
                                :
                                <Space />
                        }
                        <Space />
                        {
                            space ?
                                <Space />
                                :
                                <></>
                        }
                    </View>
                )
            }}
        />
    )
}
