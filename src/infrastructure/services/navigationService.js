import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = createRef();

export function navigate(name, params) {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  }
}

export function resetRoot(name, params) {
  if (navigationRef.current) {
    navigationRef.current.resetRoot({
      index: 0,
      routes: [{ name, params }],
    });
  }
}

export function push(name, params) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(name, params));
  }
}
