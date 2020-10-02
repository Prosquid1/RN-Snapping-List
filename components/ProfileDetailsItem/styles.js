import {StyleSheet} from 'react-native';
import {
  verticalPadding
} from '../dimensions';


export default StyleSheet.create({
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
  detailsScrollViewItem: {
    alignContent: 'center',
    padding: verticalPadding,
  }
});
