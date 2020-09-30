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

const midPadding =
  DEVICE_WIDTH / 2 - profileViewWidth / 2 - blueCircleHorizontalMargin;

const Contact = () => {
  const contactIconScrollView = useRef(null);
  const detailsScrollView = useRef(null);

  const rows = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const [contactDetailHeight, setContactDetailHeight] = useState(0);

  const [contactIsScrolling, setContactIsScrolling] = useState(false);

  const onDetailScrollViewItemLayout = useCallback((event) => {
    const {height} = event.nativeEvent.layout;
    setContactDetailHeight(height);
  }, []);

  const onDragContactScroll = (event) => {
    var contentOffsetX = event.nativeEvent.contentOffset.x;
    var cellIndex = Math.floor(contentOffsetX / profileViewWidth);

    const scrollToIndex =
      contentOffsetX / profileViewWidth + cellIndex * contactDetailHeight;

    detailsScrollView.current?.scrollTo({
      x: 0,
      y: scrollToIndex,
      animated: true,
    });
  };

  const onDragContactDetailScroll = (event) => {
    var contentOffsetY = event.nativeEvent.contentOffset.y;
    var cellIndex = Math.floor(contentOffsetY / contactDetailHeight);

    const scrollToIndex =
      contentOffsetY / contactDetailHeight + cellIndex * profileViewWidth;

    contactIconScrollView.current?.scrollTo({
      x: 0,
      y: scrollToIndex,
      animated: true,
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
          snapToAlignment="start"
          snapToInterval={profileViewWidth + blueCircleHorizontalMargin * 2}
          scrollEventThrottle={36}
          onScrollEndDrag={onDragContactScroll}
          onScrollBeginDrag={onDragContactScroll}>
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
          snapToInterval={contactDetailHeight}
          scrollEventThrottle={36}
          onScrollBeginDrag={onDragContactDetailScroll}
          onScrollEndDrag={onDragContactDetailScroll}>
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
    margin: 10,

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
