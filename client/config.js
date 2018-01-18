import { Dimensions } from 'react-native';

const HEADER_OFFSET = 64;
const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const buttonCss = {
    padding: 14,
    borderRadius: 20,
    backgroundColor: 'purple',
    borderBottomRightRadius: 2,
};
const buttonCssText = {
    color: '#fff',
};

export {
    HEADER_OFFSET,
    WINDOW_HEIGHT,
    buttonCss,
    buttonCssText,
};
