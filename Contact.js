/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useRef, useMemo} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import users from './assets/users';

const DEVICE_WIDTH = Dimensions.get('window').width;

const contactIconPadding = 30;
const profileViewWidth = 80;
const blueCircleRadius = 4;
const blueCircleHorizontalMargin = 12;

const snapOffset = blueCircleHorizontalMargin * 2;

const midPadding =
  DEVICE_WIDTH / 2 - profileViewWidth / 2 - blueCircleHorizontalMargin;

const Contact = () => {
  const contactIconScrollView = useRef(null);
  const detailsScrollView = useRef(null);

  const [isDraggingTop, setIsDraggingTop] = useState(false);
  const [isDraggingMain, setIsDraggingMain] = useState(false);

  const [contactOffset, setContactOffset] = useState({x: 0, y: 0});
  const [detailsOffset, setDetailsOffset] = useState({x: 0, y: 0});

  const [contactDetailHeight, setContactDetailHeight] = useState(0);

  const onDetailScrollViewItemLayout = useCallback((event) => {
    const {height} = event.nativeEvent.layout;
    setContactDetailHeight(height);
  }, []);

  const onContactScroll = (event) => {
    if (isDraggingMain) {
      return;
    }
    var contentOffsetX = event.nativeEvent.contentOffset.x;
    var cellIndex = contentOffsetX / (profileViewWidth + snapOffset);
    const scrollToIndex = cellIndex * contactDetailHeight;
    setDetailsOffset({x: 0, y: scrollToIndex});
  };

  const onDetailScroll = (event) => {
    if (isDraggingTop) {
      return;
    }
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    var cellIndex = contentOffsetY / contactDetailHeight;

    const scrollToIndex = cellIndex * (profileViewWidth + snapOffset);
    setContactOffset({x: scrollToIndex, y: 0});
  };

  const onContactItemPressed = (cellIndex) => {
    const scrollToContactOffsetX = cellIndex * (profileViewWidth + snapOffset);
    const scrollToDetailIndex = cellIndex * contactDetailHeight;
    setIsDraggingTop(true);
    setIsDraggingMain(true);
    detailsScrollView.current.scrollTo({
      y: scrollToDetailIndex,
      animated: true,
    });
    contactIconScrollView.current.scrollTo({
      x: scrollToContactOffsetX,
      animated: true,
    });
  };

  const onContactScrollAnimationEnd = () => {
    setIsDraggingTop(false);
  };

  const onDetailScrollAnimationEnd = () => {
    setIsDraggingMain(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigatorSeparatorLine} />
      <View>
        <ScrollView
          ref={contactIconScrollView}
          style={styles.scrollView}
          contentContainerStyle={styles.contactIconContainer}
          automaticallyAdjustInsets={false}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={true}
          decelerationRate={0}
          contentOffset={contactOffset}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={() => setIsDraggingTop(true)}
          onMomentumScrollEnd={onContactScrollAnimationEnd}
          snapToAlignment="start"
          snapToInterval={profileViewWidth + snapOffset}
          scrollEventThrottle={60}
          onScroll={onContactScroll}>
          {users.map((user, index) => (
            <TouchableOpacity onPress={() => onContactItemPressed(index)}>
              <Image style={styles.blueCircle} source={user.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      { isDraggingMain && <View style={styles.scrollingShadowView} /> }


      <View
        style={styles.detailsScrollViewContainer}
        onLayout={onDetailScrollViewItemLayout}>
        <ScrollView
          ref={detailsScrollView}
          automaticallyAdjustInsets={false}
          horizontal={false}
          contentOffset={detailsOffset}
          pagingEnabled={false}
          scrollEnabled={true}
          decelerationRate={0}
          snapToAlignment="start"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          onScrollBeginDrag={() => setIsDraggingMain(true)}
          onMomentumScrollEnd={onDetailScrollAnimationEnd}
          snapToInterval={contactDetailHeight}
          scrollEventThrottle={60}
          onScroll={onDetailScroll}>
          {users.map((user) => (
            <View
              style={[
                styles.detailsScrollViewItem,
                {height: contactDetailHeight},
              ]}>
              <View style={styles.namesContainer}>
                <Text style={styles.firstName}>{user.firstName}</Text>
                <Text style={styles.lastName}>{user.lastName}</Text>
              </View>

              <Text style={styles.role}>{user.role}</Text>
              <Text style={styles.aboutMe}>About Me</Text>

              <Text style={styles.bio}>{user.about}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '400'
  },
  navigatorSeparatorLine: {
    width: '100%',
    height: 1,
    opacity: 0.3,
    backgroundColor: 'grey',
  },
  safeAreaView: {
    flex: 1,
    marginTop: blueCircleHorizontalMargin,
  },
  detailsScrollViewContainer: {
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: profileViewWidth,
  },
  detailsScrollViewItem: {
    alignContent: 'center',
    padding: 20,
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
    height: profileViewWidth + 30,
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

export default Contact;
