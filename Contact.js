/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const contactIconPadding = 30;
const profileViewWidth = 100;
const blueCircleRadius = 3.6;
const blueCircleHorizontalMargin = 12;

const snapOffset = blueCircleHorizontalMargin * 2;

const midPadding =
  DEVICE_WIDTH / 2 - profileViewWidth / 2 - blueCircleHorizontalMargin;

const Contact = () => {
  const contactIconScrollView = useRef(null);
  const detailsScrollView = useRef(null);

  const [isScrollingContact, setIsScrollingContact] = useState(false);
  const [isScrollingDetails, setIsScrollingDetails] = useState(false);

  const rows = '0123456789'.split('');

  const [contactDetailHeight, setContactDetailHeight] = useState(0);

  const onDetailScrollViewItemLayout = useCallback((event) => {
    const {height} = event.nativeEvent.layout;
    setContactDetailHeight(height);
  }, []);

  const onContactScrollViewTouchStart = (event) => {
    if (isScrollingDetails) {
      setIsScrollingDetails(false);
    }
    setIsScrollingContact(true);
  };

  const onContactScrollViewTouchEnd = (event) => {
    setIsScrollingContact(false);
  };

  const onDetailScrollViewTouchStart = (event) => {
    if (isScrollingContact) {
      setIsScrollingContact(false);
    }
    setIsScrollingDetails(true);
  };

  const onDetailScrollViewTouchEnd = (event) => {
    console.log('onDetailScrollViewTouchEnd');
    setIsScrollingDetails(false);
  };

  const onContactScroll = (event) => {
    if (isScrollingDetails) {
      return;
    }
    var contentOffsetX = event.nativeEvent.contentOffset.x;
    console.log('contentOffsetX', contentOffsetX);
    var cellIndex = Math.floor(
      contentOffsetX / (profileViewWidth + blueCircleHorizontalMargin),
    );
    if (
      contentOffsetX -
        Math.floor(contentOffsetX / profileViewWidth) * profileViewWidth >
      profileViewWidth
    ) {
      cellIndex++;
    }
    console.log('cellIndex', cellIndex);
    const scrollToIndex = cellIndex * contactDetailHeight;

    detailsScrollView.current?.scrollTo({
      x: 0,
      y: scrollToIndex,
      animated: false,
    });
  };

  const onDetailScroll = (event) => {
    if (isScrollingContact) {
      return;
    }
    var contentOffsetY = event.nativeEvent.contentOffset.y;
    var cellIndex = Math.floor(contentOffsetY / contactDetailHeight);

    if (
      contentOffsetY -
        Math.floor(contentOffsetY / contactDetailHeight) * contactDetailHeight >
      contactDetailHeight
    ) {
      cellIndex++;
    }

    console.log('cellIndex', cellIndex);
    const scrollToIndex = cellIndex * (profileViewWidth + snapOffset);
    contactIconScrollView.current?.scrollTo({
      x: scrollToIndex,
      y: 0,
      animated: false,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
          onTouchStart={onContactScrollViewTouchStart}
          onTouchEnd={onContactScrollViewTouchEnd}
          snapToAlignment="start"
          snapToInterval={profileViewWidth + snapOffset}
          scrollEventThrottle={16}
          onScroll={onContactScroll}>
          {rows.map((item) => (
            <View style={styles.blueCircle}>
              <Text style={styles.title}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={styles.detailsScrollViewContainer}
        onLayout={onDetailScrollViewItemLayout}>
        <ScrollView
          ref={detailsScrollView}
          style={styles.detailsScrollView}
          automaticallyAdjustInsets={false}
          horizontal={false}
          pagingEnabled={false}
          scrollEnabled={true}
          decelerationRate={0}
          snapToAlignment="start"
          onTouchStart={onDetailScrollViewTouchStart}
          onTouchEnd={onDetailScrollViewTouchEnd}
          snapToInterval={contactDetailHeight}
          scrollEventThrottle={16}
          onScroll={onDetailScroll}>
          {rows.map((item) => (
            <View
              style={[
                styles.detailsScrollViewItem,
                {height: contactDetailHeight},
              ]}>
              <Text style={styles.title}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.horizontalLineSeparator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    marginTop: blueCircleHorizontalMargin,
    backgroundColor: 'red',
  },
  scrollViewContainer: {},
  horizontalLineSeparator: {
    height: DEVICE_HEIGHT,
    backgroundColor: 'red',
    position: 'absolute',
    marginLeft: DEVICE_WIDTH / 2,
    flex: 1,
    width: 1,
  },
  detailsScrollViewContainer: {
    backgroundColor: 'pink',
    flexGrow: 1,

    justifyContent: 'center',
    marginBottom: profileViewWidth,
  },
  detailsScrollViewItem: {
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  detailsScrollView: {
    backgroundColor: 'black',
  },
  scrollView: {
    paddingStart: 0,
    paddingEnd: 0,
    height: profileViewWidth + 30,
    backgroundColor: 'blue',
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
    borderRadius: 50,
    borderWidth: blueCircleRadius,
    borderColor: 'red',
    backgroundColor: 'blue',
  },
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
  },
});

export default Contact;
