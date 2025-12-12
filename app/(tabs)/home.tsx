import { ThemedText } from '@/components/themed-text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomePage() {
  const router = useRouter();
  return (
    <LinearGradient
      style={styles.container}
      colors={["#55372B", "#55372B", "#a935074a", "#a935074a"]}
      locations={[0, 0.35, 0.35, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.slogan}>{'ဗုဒ္ဓသာသနံ စိရံ တိဋ္ဌတု'}</ThemedText>
        <Image
          source={{ uri: 'https://sys-shop.s3.ap-southeast-1.amazonaws.com/0main/DhammaZone/home.webp' }}
          style={styles.hero}
          contentFit="cover"
        />
        <ThemedText type="title" style={styles.title}>သုတ္တန်ပိဋကတ်နှင့် အနက်အဓိပ္ပာယ်များ</ThemedText>
        <View style={styles.tilesRow}>
          <TouchableOpacity style={styles.tile} onPress={() => router.push('/pali')}>
            <View style={styles.tileImageWrap}>
              <Image
                source={{ uri: 'https://sys-shop.s3.ap-southeast-1.amazonaws.com/0main/DhammaZone/dhamma.png' }}
                style={styles.tileImage}
                contentFit="contain"
              />
            </View>
            <ThemedText style={styles.tileLabel}>ပါဠိ(မြန်မာပြန်)</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => router.push('/myanmar')}>
            <View style={styles.tileImageWrap}>
              <Image
                source={{ uri: 'https://sys-shop.s3.ap-southeast-1.amazonaws.com/0main/DhammaZone/dhamma1.jpeg' }}
                style={styles.tileImage}
                contentFit="cover"
              />
            </View>
            <ThemedText style={styles.tileLabel}>မြန်မာဘာသာ</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.replace('/home')}>
          <Ionicons name="home" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.push('/guide')}>
          <Ionicons name="book" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.push('/about')}>
          <Ionicons name="information-circle" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    padding: 16,
    gap: 16,
    paddingBottom: 100,
    marginTop: 50,
  },
  hero: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 0,
    height: 100,
    paddingTop: 20,
    color: '#55372B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  slogan: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    paddingTop: 10,
    marginBottom: -20
    },
  tilesRow: {
    flexDirection: 'row',
    gap: 16,
  },
  tile: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  tileImageWrap: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileImage: {
    width: 100,
    height: 100,
  },
  tileLabel: {
    fontSize: 16,
    color: '#55372B',
    fontWeight: 400,
    paddingTop: 15
  },
  footer: {
    position: 'absolute',
    left: 40,
    right: 40,
    bottom: 40,
    backgroundColor: '#55372bc5',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerBtn: {
    alignItems: 'center',
    flex: 1,
  },
});
