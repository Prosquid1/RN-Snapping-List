/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
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
  const rows = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const [contactDetailHeight, setContactDetailHeight] = useState(0);

  const onDetailScrollViewItemLayout = useCallback((event) => {
    const {width, height} = event.nativeEvent.layout;
    setContactDetailHeight(height);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
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
          onScroll={(event) => {
            var contentOffsetX = event.nativeEvent.contentOffset.x;
            var contentOffsetY = event.nativeEvent.contentOffset.y;

            var cellWidth = (DEVICE_WIDTH - 100).toFixed(2);
            var cellHeight = (DEVICE_HEIGHT - 200).toFixed(2);

            var cellIndex = Math.floor(contentOffsetX / cellWidth);

            // Round to the next cell if the scrolling will stop over halfway to the next cell.
            if (
              contentOffsetX -
                Math.floor(contentOffsetX / cellWidth) * cellWidth >
              cellWidth
            ) {
              cellIndex++;
            }

            // Adjust stopping point to exact beginning of cell.
            contentOffsetX = cellIndex * cellWidth;
            contentOffsetY = cellIndex * cellHeight;

            event.nativeEvent.contentOffsetX = contentOffsetX;
            event.nativeEvent.contentOffsetY = contentOffsetY;

            // this.setState({contentOffsetX:contentOffsetX,contentOffsetY:contentOffsetY});
            console.log('cellIndex:' + cellIndex);

            console.log('contentOffsetX:' + contentOffsetX);
            // contentOffset={{x:this.state.contentOffsetX,y:0}}
          }}>
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
          style={styles.detailsScrollView}
          automaticallyAdjustInsets={false}
          horizontal={false}
          pagingEnabled={false}
          scrollEnabled={true}
          decelerationRate={0}
          snapToAlignment="start"
          snapToInterval={profileViewWidth + blueCircleHorizontalMargin * 2}
          scrollEventThrottle={36}
          onScroll={(event) => {
            var contentOffsetX = event.nativeEvent.contentOffset.x;
            var contentOffsetY = event.nativeEvent.contentOffset.y;

            var cellWidth = (DEVICE_WIDTH - 100).toFixed(2);
            var cellHeight = (DEVICE_HEIGHT - 200).toFixed(2);

            var cellIndex = Math.floor(contentOffsetX / cellWidth);

            // Round to the next cell if the scrolling will stop over halfway to the next cell.
            if (
              contentOffsetX -
                Math.floor(contentOffsetX / cellWidth) * cellWidth >
              cellWidth
            ) {
              cellIndex++;
            }

            // Adjust stopping point to exact beginning of cell.
            contentOffsetX = cellIndex * cellWidth;
            contentOffsetY = cellIndex * cellHeight;

            event.nativeEvent.contentOffsetX = contentOffsetX;
            event.nativeEvent.contentOffsetY = contentOffsetY;

            console.log('cellIndex:' + cellIndex);

            console.log('contentOffsetX:' + contentOffsetX);
          }}>
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
    marginBottom: profileViewWidth,
  },
  detailsScrollViewItem: {
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
