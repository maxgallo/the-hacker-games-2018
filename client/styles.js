import { StyleSheet } from 'react-native';
import * as config from './config';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    messages: {
        flex: 1
    },
    messagesContentContainer: {
        padding: 10,
        paddingTop: 40
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
    messageLeftText: {
        color: '#000'
    },
    buttons: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 10
    },
});

export default styles;
