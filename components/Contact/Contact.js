/**
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';

import users from '../../assets/users';

import {profileViewWidth, snapOffset} from './dimensions';

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
            <TouchableOpacity
              key={user.id}
              onPress={() => onContactItemPressed(index)}>
              <Image style={styles.blueCircle} source={user.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isDraggingMain && <View style={styles.scrollingShadowView} />}

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
              key={user.id}
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

export default Contact;
