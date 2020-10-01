import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';

import PropTypes from "prop-types";

import styles from './styles';

const ProfileImageItem = ({
    key,
    index,
    onAvatarItemPressed,
    userImage,
}) => {
  return (
    <TouchableOpacity key={key} onPress={() => onAvatarItemPressed(index)}>
      <Image style={styles.profileImageItem} source={userImage} />
    </TouchableOpacity>
  );
};

ProfileImageItem.propTypes = {
    index: PropTypes.number.isRequired,
    key: PropTypes.number.isRequired,
    onAvatarItemPressed: PropTypes.func.isRequired,
    userImage: PropTypes.object.isRequired
  };

export default ProfileImageItem;
