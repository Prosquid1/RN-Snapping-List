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
    onContactItemPressed,
    userImage,
}) => {
  return (
    <TouchableOpacity key={key} onPress={() => onContactItemPressed(index)}>
      <Image style={styles.profileImageItem} source={userImage} />
    </TouchableOpacity>
  );
};

ProfileImageItem.propTypes = {
    index: PropTypes.number.isRequired,
    key: PropTypes.number.isRequired,
    onContactItemPressed: PropTypes.func.isRequired,
    userImage: PropTypes.object.isRequired
  };

export default ProfileImageItem;
