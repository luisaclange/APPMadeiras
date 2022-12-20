import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface props {
    children: React.ReactNode;
}

export default function Background({ children }: props) {
    return (
        <LinearGradient
            colors={[
                '#593b2b',
                'transparent',
                'transparent',
                'transparent',
                '#593b2b',
            ]}
            style={{ height: '100%' }}
        >
            {children}
        </LinearGradient>
        // <Image
        //     source={require('../../../assets/Background.png')}
        //     imageStyle={{ height: Dimensions.get('screen').height - RFValue(120, 700) }}
        // >
        //     {children}
        // </Image>
    );
}
