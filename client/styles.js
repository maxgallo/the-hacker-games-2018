import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    messages: {
        flex: 1
    },
    messagesContentContainer: {
        padding: 10
    },
    messageLeftContainer: {
        alignItems: 'flex-start',
        marginBottom: 10
    },
    messageRightContainer: {
        alignItems: 'flex-end',
        marginBottom: 10
    },
    messageLeft: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'flex-start'
    },
    messageRight: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'blue',
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    messageLeftText: {
        color: '#000'
    },
    messageRightText: {
        color: '#fff',
        textAlign: 'right'
    },
    buttons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 10
    },
    button: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'blue'
    },
    buttonText: {
        color: '#fff'
    }
});

export default styles;
