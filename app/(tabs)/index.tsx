import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function HomeScreen() {
  const spin = useSharedValue(0);
  const progress = useSharedValue(0);
  const router = useRouter();
  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false,
    );
    progress.value = withTiming(1, { duration: 5000, easing: Easing.linear });
    const t = setTimeout(() => {
      router.replace('/home');
    }, 5000);
    return () => clearTimeout(t);
  }, [spin, progress, router]);
  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));
  const progressStyle = useAnimatedStyle(() => ({
    width: 240 * progress.value,
  }));

  return (
    <ThemedView style={styles.container}>
      <View style={styles.top}>
        <AnimatedImage
          source={{
            uri: 'https://sys-shop.s3.ap-southeast-1.amazonaws.com/0main/DhammaZone/dhamma.png',
          }}
          style={[styles.dhamma, rotateStyle]}
          contentFit="contain"
        />
      </View>
      <View style={styles.bottom}>
        <Image
          source={{
            uri: 'https://sys-shop.s3.ap-southeast-1.amazonaws.com/0main/DhammaZone/dmz.png',
          }}
          style={styles.dmz}
          contentFit="contain"
        />
        <Image
          source={{
            uri: 'https://sys-shop.s3.ap-southeast-1.amazonaws.com/0main/DhammaZone/hands.png',
          }}
          style={styles.hands}
          contentFit="contain"
        />
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55372B',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 48,
  },
  top: {
    width: '100%',
    alignItems: 'center',
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    gap: 0,
  },
  dhamma: {
    width: 200,
    aspectRatio: 1,
    marginTop: 100
    
      },
  dmz: {
    width: 300,
    height: 150,
   
  },
  hands: {
    width: 320,
    height: 260,
    marginLeft: 10,
    marginBottom: 60,
    marginTop: -30
  },
  progressContainer: {
    width: 200,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF30',
    overflow: 'hidden',
    marginTop: -50,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD369',
    borderRadius: 5,
  },
});
