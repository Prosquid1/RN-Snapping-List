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
  TouchableOpacity,
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

  const [isDraggingTop, setIsDraggingTop] = useState(false);
  const [isDraggingMain, setIsDraggingMain] = useState(false);

  const [contactOffset, setContactOffset] = useState({x: 0, y: 0});
  const [detailsOffset, setDetailsOffset] = useState({x: 0, y: 0});

  const rows = 'abcdefghijklmnopqrstuvwxyz'.split('');

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

  const onDetailScrollAnimationEnd = (event) => {
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
          scrollEventThrottle={16}
          onScroll={onContactScroll}>
          {rows.map((item, index) => (
            <TouchableOpacity onPress={() => onContactItemPressed(index)}>
              {/* <TouchableOpacity onPress={onContactItemPressed(index)}> */}
              <View style={styles.blueCircle}>
                <Text style={styles.title}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    marginTop: blueCircleHorizontalMargin,
  },
  detailsScrollViewContainer: {
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: profileViewWidth,
    marginTop: 3,
  },
  detailsScrollViewItem: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'red',
  },
  scrollView: {
    elevation: 500,
    paddingStart: 0,
    paddingEnd: 0,
    height: profileViewWidth + 30,
    backgroundColor: 'white',
    shadowColor: '#8DB6D0',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    marginTop: 1,
    shadowRadius: 3,
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
    borderColor: '#8DB6D0',
  },
  title: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 30,
  },
});

export default Contact;
