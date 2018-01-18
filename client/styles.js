import { StyleSheet } from 'react-native';
import * as config from './config';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
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
        marginBottom: 10,
        marginRight: 50,
    },
    messageRightContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    messageLeft: {
        padding: 14,
        borderRadius: 20,
        borderBottomLeftRadius: 2,
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
        padding: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
});

export default styles;
