import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const CurvedBackground = () => (
  <View style={styles.container}>
    <Svg width="180" height="251" viewBox="0 0 180 251" fill="none">
      <G opacity="0.39">
        <Path
          d="M10.7805 0.701664C10.7769 -4.84252 77.2808 48.2017 98.2808 88.2017C119.281 128.202 169.281 146.702 169.281 167.202C169.281 187.702 165.281 197.701 153.281 224.201L10.7805 224.201L10.7805 154.701C10.6194 56.1103 10.8075 42.0305 10.7805 0.701664Z"
          fill="#236A34"
        />
      </G>
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    
    position: 'absolute',
    bottom: -28,
    left: -12,
  },
});

export default CurvedBackground;
