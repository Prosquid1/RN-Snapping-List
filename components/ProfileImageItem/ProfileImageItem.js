import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import styles from './styles';

const ProfileImageItem = ({index, onAvatarItemPressed, userImage}) => {
  return (
    <TouchableOpacity
      testID={'avatarClickID'}
      onPress={() => onAvatarItemPressed(index)}>
      <Image
        testID={'avatarImg'}
        style={styles.profileImageItem}
        source={userImage}
      />
    </TouchableOpacity>
  );
};

ProfileImageItem.propTypes = {
  index: PropTypes.number.isRequired,
  onAvatarItemPressed: PropTypes.func.isRequired,
  userImage: PropTypes.number.isRequired,
};

export default ProfileImageItem;
