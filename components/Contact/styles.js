import {StyleSheet, Platform} from 'react-native';

import {
  avatarIconHorizontalMargin,
  avatarBorderRadius,
  midPadding,
  avatarViewWidth,
  verticalPadding,
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
    marginBottom: avatarViewWidth,
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
    height: avatarViewWidth + verticalPadding,
  },
  avatarContainer: {
    paddingHorizontal: midPadding,
    alignItems: 'center',
    alignSelf: 'center',
    height: avatarViewWidth + verticalPadding,
  },

  blueCircle: {
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
