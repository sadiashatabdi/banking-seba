import React from 'react';
import { View } from 'react-native';

interface GapProps {
    size: number
}

const Gap: React.FC<GapProps> = ({
    size = 0
}) => {
    return (
        <View style={{ height: size }} />
    );
};

export default Gap;
