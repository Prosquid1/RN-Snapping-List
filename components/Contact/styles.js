import {StyleSheet} from 'react-native';
import {
  blueCircleHorizontalMargin,
  blueCircleRadius,
  contactIconPadding,
  midPadding,
  profileViewWidth,
  verticalPadding
} from './dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  namesContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  firstName: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 24,
  },
  lastName: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 24,
    marginStart: 4,
  },
  role: {
    alignSelf: 'center',
    color: 'grey',
    fontWeight: '400',
    marginTop: 8,
    fontSize: 18,
  },
  aboutMe: {
    alignSelf: 'flex-start',
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 20,
  },
  bio: {
    color: 'grey',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
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
  detailsScrollViewItem: {
    alignContent: 'center',
    padding: verticalPadding,
  },
  scrollingShadowView: {
    ...Platform.select({
      ios: {height: 0.3, opacity: 0.3, backgroundColor: 'grey'},
      android: {
        elevation: 5,
      },
    }),
  },
  scrollView: {
    paddingStart: 0,
    paddingEnd: 0,
    height: profileViewWidth + verticalPadding,
    backgroundColor: 'white',
  },
  contactIconContainer: {
    paddingHorizontal: midPadding,
    alignItems: 'center',
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
