import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function GuidePage() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Guide</ThemedText>
      <ThemedText>Beginner guidance and how to use the app.</ThemedText>
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
