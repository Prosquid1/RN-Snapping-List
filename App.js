/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const profileViewWidth = 100;
const blueCircleRadius = 3.6;
const blueCircleHorizontalMargin = 12;

const midPadding =
  DEVICE_WIDTH / 2 - profileViewWidth / 2 - blueCircleHorizontalMargin;

const App = () => {
  const rows = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            automaticallyAdjustInsets={false}
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={true}
            decelerationRate={0}
            snapToAlignment="start"
            snapToInterval={profileViewWidth + blueCircleHorizontalMargin * 2}
            scrollEventThrottle={36}>
            {rows.map((item) => (
              <View style={styles.blueCircle}>
                <Text style={styles.title}>{item}</Text>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.doucheBagSeparator} />
        </>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  doucheBagSeparator: {
    flex: 1,
    position: 'absolute',
    height: DEVICE_HEIGHT,
    backgroundColor: 'red',
    alignSelf: 'center',
    width: 1,
  },
  scrollView: {
    paddingStart: 0,
    paddingEnd: 0,
  },
  contentContainer: {
    paddingHorizontal: midPadding,
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

export default App;
