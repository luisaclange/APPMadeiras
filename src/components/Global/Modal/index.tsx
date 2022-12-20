import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Backdrop, Modal, PopUp } from './styles';

interface Props {
    children: any;
    visible: boolean;
    setVisible: any;
    backdrop: boolean;
    dismissOnPress: boolean;
    positionVertical?: string;
    positionHorizontal?: string;
}

export default function CustomModal({
    children,
    visible,
    setVisible,
    backdrop,
    dismissOnPress,
    positionVertical,
    positionHorizontal,
}: Props) {
    return (
        <Modal statusBarTranslucent visible={visible} transparent>
            <View>
                <TouchableWithoutFeedback
                    onPress={
                        dismissOnPress
                            ? () => {
                                setVisible(false);
                            }
                            : () => { }
                    }
                >
                    <Backdrop backdrop={backdrop} />
                </TouchableWithoutFeedback>

                <PopUp
                    style={{
                        justifyContent: positionVertical
                            ? positionVertical === 'top'
                                ? 'flex-start'
                                : positionVertical === 'bottom'
                                    ? 'flex-end'
                                    : 'center'
                            : 'center',
                        alignItems: positionHorizontal
                            ? positionHorizontal === 'left'
                                ? 'flex-start'
                                : positionHorizontal === 'right'
                                    ? 'flex-end'
                                    : 'center'
                            : 'center',
                    }}
                >
                    {children}
                </PopUp>
            </View>
        </Modal>
    );
}
