import {StyleSheet} from 'react-native';
import {
  blueCircleHorizontalMargin,
  blueCircleRadius,
  profileViewWidth,
} from '../dimensions';

export default StyleSheet.create({
  profileImageItem: {
    height: profileViewWidth,
    width: profileViewWidth,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: blueCircleHorizontalMargin,
    borderRadius: profileViewWidth / 2,
    borderWidth: blueCircleRadius,
    borderColor: '#8DB6D0',
  },
});
