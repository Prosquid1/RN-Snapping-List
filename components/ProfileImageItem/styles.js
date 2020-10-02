import {StyleSheet} from 'react-native';
import {
  avatarIconHorizontalMargin,
  avatarBorderRadius,
  avatarViewWidth,
} from '../dimensions';

export default StyleSheet.create({
  profileImageItem: {
    height: avatarViewWidth,
    width: avatarViewWidth,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: avatarIconHorizontalMargin,
    borderRadius: avatarViewWidth / 2,
    borderWidth: avatarBorderRadius,
    borderColor: '#8DB6D0',
  },
});
