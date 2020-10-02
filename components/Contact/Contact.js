/**
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useRef} from 'react';
import {
  InteractionManager,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import styles from './styles';

import users from '../../assets/users';

import {avatarViewWidth, snapOffset} from '../dimensions';
import ProfileImageItem from '../ProfileImageItem';
import ProfileDetailsItem from '../ProfileDetailsItem/ProfileDetailsItem';

const Contact = () => {
  const avatarScrollView = useRef(null);
  const detailsScrollView = useRef(null);

  const [isDraggingAvatarView, setIsDraggingAvatarView] = useState(false);
  const [isDraggingDetailsView, setIsDraggingDetailsView] = useState(false);

  const [avatarViewOffset, setAvatarViewOffset] = useState({x: 0, y: 0});
  const [detailsViewOffset, setDetailsViewOffset] = useState({x: 0, y: 0});

  const [detailsViewHeight, setDetailViewHeight] = useState(0);

  const isPlatformAndroid = Platform.OS === 'android';

  const onDetailScrollViewItemLayout = useCallback((event) => {
    const {height} = event.nativeEvent.layout;
    setDetailViewHeight(height);
  }, []);

  const onAvatarsScroll = (event) => {
    if (isDraggingDetailsView) {
      return;
    }
    var contentOffsetX = event.nativeEvent.contentOffset.x;
    var cellIndex = contentOffsetX / (avatarViewWidth + snapOffset);
    const newDetailsViewOffsetY = cellIndex * detailsViewHeight;

    const newDetailsViewOffset = {x: 0, y: newDetailsViewOffsetY};

    if (isPlatformAndroid) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(
          () => detailsScrollView.current.scrollTo(newDetailsViewOffset),
          0,
        );
      });
    } else {
      setDetailsViewOffset(newDetailsViewOffset);
    }
  };

  const onDetailsScroll = (event) => {
    if (isDraggingAvatarView) {
      return;
    }
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    var cellIndex = contentOffsetY / detailsViewHeight;

    const scrollToIndex = cellIndex * (avatarViewWidth + snapOffset);
    const newAvatarOffset = {x: scrollToIndex, y: 0};

    if (isPlatformAndroid) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => avatarScrollView.current.scrollTo(newAvatarOffset), 0);
      });
    } else {
      setAvatarViewOffset(newAvatarOffset);
    }
  };

  const onAvatarItemPressed = (cellIndex) => {
    const scrollToContactOffsetX = cellIndex * (avatarViewWidth + snapOffset);
    const scrollToDetailIndex = cellIndex * detailsViewHeight;
    setIsDraggingAvatarView(true);
    setIsDraggingDetailsView(true);
    detailsScrollView.current.scrollTo({
      y: scrollToDetailIndex,
      animated: true,
    });
    avatarScrollView.current.scrollTo({
      x: scrollToContactOffsetX,
      animated: true,
    });
  };

  const onAvatarScrollAnimationEnd = () => {
    setIsDraggingAvatarView(false);
  };

  const onDetailScrollAnimationEnd = () => {
    setIsDraggingDetailsView(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigatorSeparatorLine} />
      <View>
        <ScrollView
          ref={avatarScrollView}
          style={styles.profileImageScrollView}
          contentContainerStyle={styles.avatarContainer}
          automaticallyAdjustInsets={false}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={true}
          decelerationRate={0}
          contentOffset={avatarViewOffset}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={() => setIsDraggingAvatarView(true)}
          onMomentumScrollEnd={onAvatarScrollAnimationEnd}
          snapToAlignment="start"
          snapToInterval={avatarViewWidth + snapOffset}
          scrollEventThrottle={60}
          onScroll={onAvatarsScroll}>
          {users.map((user, index) => (
            <ProfileImageItem
              key={user.id}
              index={index}
              onAvatarItemPressed={onAvatarItemPressed}
              userImage={user.image}
            />
          ))}
        </ScrollView>
      </View>

      {isDraggingDetailsView && <View style={styles.scrollingShadowView} />}

      <View
        style={styles.detailsScrollViewContainer}
        onLayout={onDetailScrollViewItemLayout}>
        <ScrollView
          ref={detailsScrollView}
          automaticallyAdjustInsets={false}
          horizontal={false}
          contentOffset={detailsViewOffset}
          pagingEnabled={false}
          scrollEnabled={true}
          decelerationRate={0}
          snapToAlignment="start"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          onScrollBeginDrag={() => setIsDraggingDetailsView(true)}
          onMomentumScrollEnd={onDetailScrollAnimationEnd}
          snapToInterval={detailsViewHeight}
          scrollEventThrottle={60}
          onScroll={onDetailsScroll}>
          {users.map((user) => (
            <ProfileDetailsItem
              key={user.id}
              detailsViewHeight={detailsViewHeight}
              user={user}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Contact;
