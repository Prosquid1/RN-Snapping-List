import React from 'react';
import {Text, View} from 'react-native';

import PropTypes from 'prop-types';

import styles from './styles';

const ProfileDetailsItem = ({contactDetailHeight, user}) => {
  return (
    <View
      key={user.id}
      style={[styles.detailsScrollViewItem, {height: contactDetailHeight}]}>
      <View style={styles.namesContainer}>
        <Text style={styles.firstName}>{user.firstName}</Text>
        <Text style={styles.lastName}>{user.lastName}</Text>
      </View>

      <Text style={styles.role}>{user.role}</Text>
      <Text style={styles.aboutMe}>About Me</Text>

      <Text style={styles.bio}>{user.about}</Text>
    </View>
  );
};

ProfileDetailsItem.propTypes = {
  contactDetailHeight: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default ProfileDetailsItem;
