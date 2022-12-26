import React from 'react';
import { Control, Controller, FieldError, FieldValues, Path, PathValue } from 'react-hook-form';
import { TextInputProps, View } from 'react-native';
import {
  Dimension,
  Error,
  Input,
  InputContainer,
  Space,
  Title,
} from './styles';

interface IProps<
  TFieldValues extends FieldValues,
  TFieldArrayName extends Path<TFieldValues>,
>
  extends TextInputProps {
  control: Control<TFieldValues>;
  title: string;
  dimension?: string;
  name: TFieldArrayName;
  error?: FieldError;
  space?: boolean;
}

export default function FieldInput<
  TFieldValues extends FieldValues,
  TFieldArrayName extends Path<TFieldValues>,
>({
  title,
  dimension,
  name,
  control,
  error,
  space,
  ...rest
}: IProps<TFieldValues, TFieldArrayName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <View>
            <Title error={!!error}>{title}</Title>
            <InputContainer error={!!error}>
              <Input
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                }}
                {...rest}
              />
              {dimension ? (
                <Dimension error={!!error}>
                  {dimension}
                </Dimension>
              ) : null}
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
