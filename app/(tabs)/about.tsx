import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function AboutPage() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">About Us</ThemedText>
      <ThemedText>Dhamma Zone — sharing Dhamma teachings and guidance.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
