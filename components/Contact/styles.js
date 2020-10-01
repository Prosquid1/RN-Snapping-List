import {StyleSheet} from 'react-native';
import {
  blueCircleHorizontalMargin,
  blueCircleRadius,
  contactIconPadding,
  midPadding,
  profileViewWidth,
  verticalPadding
} from '../dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigatorSeparatorLine: {
    width: '100%',
    height: 1,
    opacity: 0.3,
    backgroundColor: 'grey',
  },
  safeAreaView: {
    flex: 1,
  },
  detailsScrollViewContainer: {
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: profileViewWidth,
  },
  scrollingShadowView: {
    ...Platform.select({
      ios: {height: 0.3, opacity: 0.3, backgroundColor: 'grey'},
      android: {
        elevation: 5,
      },
    }),
  },
  profileImageScrollView: {
    paddingStart: 0,
    paddingEnd: 0,
    alignContent: 'center',
    height: profileViewWidth + verticalPadding,
    backgroundColor: 'white',
  },
  contactIconContainer: {
    paddingHorizontal: midPadding,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    height: profileViewWidth + contactIconPadding,
  },

  blueCircle: {
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
