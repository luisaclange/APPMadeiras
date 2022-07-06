import React from "react";
import { TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from "react-native";
import { Border, Container, TextButton } from "./styles";

interface Props extends TouchableOpacityProps {
    text: string,
    style?: any,
    onPress?: any
}

export const ButtonDark = ({ text, onPress, style }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <Border style={style}>
                <Container>
                    <TextButton>{text}</TextButton>
                </Container>
            </Border>
        </TouchableOpacity>
    )
}
