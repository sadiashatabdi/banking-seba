import React, { ReactNode } from 'react';
import {
    TextStyle,
    Text
} from 'react-native';

interface TextViewProps {
    children: ReactNode;
    style?: TextStyle;
    fontSize?: number;
    lineHeight?: number;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    marginTop?: number;
    marginBottom?: number
}

const TextView: React.FC<TextViewProps> = ({
    children,
    style,
    fontSize = 14,
    lineHeight,
    color,
    textAlign = 'left',
    marginTop,
    marginBottom
}) => {
    const customStyle = {
        fontSize, lineHeight, color, textAlign, marginTop, marginBottom
    }
    return (
        <Text style={[style, customStyle]} >
            {children}
        </Text>
    );
};


export default TextView;
