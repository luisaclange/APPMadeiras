import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { TextInputProps, View } from "react-native";
import { Dimension, Error, Input, InputContainer, Space, Title } from "./styles";

interface props extends TextInputProps {
    title: string;
    dimension?: string;
    name: string;
    control: Control<any>;
    error?: FieldError;
    space?: boolean;
}

export const FieldInput: React.FC<props> = ({ title, dimension, name, control, error, space, ...rest }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
                return (
                    <View>
                        <Title error={error ? true : false}>{title}</Title>
                        <InputContainer error={error ? true : false}>
                            <Input
                                value={value}
                                onChangeText={(text) => { onChange(text) }}
                                {...rest}
                            />
                            {
                                dimension ?
                                    <Dimension error={error ? true : false}>{dimension}</Dimension>
                                    :
                                    <></>
                            }
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
