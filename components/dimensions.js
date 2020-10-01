import {Dimensions} from 'react-native';

export const verticalPadding = 20;

export const blueCircleRadius = 4;
export const contactIconPadding = 30;
export const profileViewWidth = 80;
export const blueCircleHorizontalMargin = 12;

export const snapOffset = blueCircleHorizontalMargin * 2;

const DEVICE_WIDTH = Dimensions.get('window').width;

export const midPadding =
  DEVICE_WIDTH / 2 - profileViewWidth / 2 - blueCircleHorizontalMargin;
