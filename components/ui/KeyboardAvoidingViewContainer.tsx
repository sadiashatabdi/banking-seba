import React, { ReactNode } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ViewStyle,
} from 'react-native';

interface KeyboardAvoidingViewContainerProps {
    children: ReactNode;  // The children that will be passed into this component
    style?: ViewStyle;    // Optional styles for the container
    scrollViewStyle?: ViewStyle;  // Optional style for the ScrollView
}

const KeyboardAvoidingViewContainer: React.FC<KeyboardAvoidingViewContainerProps> = ({
    children,
    style,
    scrollViewStyle,
}) => {
    return (
        <KeyboardAvoidingView
            style={[styles.container, style]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView contentContainerStyle={[styles.scrollContainer, scrollViewStyle]}>
                    {children}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default KeyboardAvoidingViewContainer;
