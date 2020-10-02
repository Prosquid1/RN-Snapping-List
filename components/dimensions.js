import {Dimensions} from 'react-native';

export const verticalPadding = 20;

export const avatarBorderRadius = 4;
export const avatarVerticalPadding = 30;
export const avatarViewWidth = 80;
export const avatarIconHorizontalMargin = 12;

export const snapOffset = avatarIconHorizontalMargin * 2;

const DEVICE_WIDTH = Dimensions.get('window').width;

export const midPadding =
  DEVICE_WIDTH / 2 - avatarViewWidth / 2 - avatarIconHorizontalMargin;
