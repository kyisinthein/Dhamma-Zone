import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={[styles.headerContainer, { marginTop: 30 }]}>
            {/* <Image 
                source={{ uri: 'https://sys-shop.s3.ap-southeast-1.amazonaws.com/0main/DhammaZone/dhamma.png' }} 
                style={styles.heroImage}
                resizeMode="contain"
            /> */}
            <ThemedText type="title" style={styles.headerTitle}>Dhamma Zone Projects</ThemedText>
        </View>
        
        {/* Project 1 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Ionicons name="layers-outline" size={24} color="#8B4513" />
             <ThemedText type="subtitle" style={styles.cardTitle}>1. Dhamma Zone Projects</ThemedText>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• 18,000 Facebook followers</ThemedText>
          </View>
          <View style={styles.bulletItem}>
             <ThemedText style={[styles.bulletText, { paddingTop: 10 }]}>• 80+ သုတ္တန် ဘာသာပြန်ပြီး</ThemedText>
          </View>
           <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• 1,200 YouTube subscribers</ThemedText>
          </View>
           <View style={styles.bulletItem}>
             <ThemedText style={[styles.bulletText, { paddingTop: 10 }]}>• ခန့်မှန်း အလှူငွေ အသုံးပြုစရိတ်စုစုပေါင်း သိန်း(၂၀၀)</ThemedText>
          </View>
          
          <ThemedText style={styles.sectionSubtitle}>Future Goals:</ThemedText>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Online presence via Facebook, YouTube, and website</ThemedText>
          </View>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Fund for sponsorships, scholarships, and fellowships for monastic education and humanitarian causes</ThemedText>
          </View>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Collaborations with international Buddhist community and digital humanities scholars</ThemedText>
          </View>
        </View>

        {/* Project 2 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Ionicons name="school-outline" size={24} color="#8B4513" />
             <ThemedText type="subtitle" style={styles.cardTitle}>2. Dhamma Zone Education</ThemedText>
          </View>
           <View style={styles.separator} />
           
           <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• 80+ students</ThemedText>
          </View>
           <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• 2 years worth of lessons</ThemedText>
          </View>
           <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• 4 teachers</ThemedText>
          </View>
           <View style={styles.bulletItem}>
             <ThemedText style={[styles.bulletText, { paddingTop: 10 }]}>• ဓမ္မစကူးလ် နှင့် ဗုဒ္ဓဘာသာသင်ခန်းစာ သင်ကြားပြီး</ThemedText>
          </View>

          <ThemedText style={styles.sectionSubtitle}>Future Goals:</ThemedText>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Buddhist research on literature, history, and science</ThemedText>
          </View>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Buddhist studies through the Dhamma Zone Institute</ThemedText>
          </View>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Expansion of Tripitaka accessibility through translations, comparative studies</ThemedText>
          </View>
        </View>

        {/* Project 3 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Ionicons name="videocam-outline" size={24} color="#8B4513" />
             <ThemedText type="subtitle" style={styles.cardTitle}>3. Dhamma Zone Videos</ThemedText>
          </View>
           <View style={styles.separator} />

           <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• 100+ videos</ThemedText>
          </View>
           <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• 3 million minutes viewed</ThemedText>
          </View>
           <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• 400k one-minute views</ThemedText>
          </View>

          <ThemedText style={styles.sectionSubtitle}>Future Goals:</ThemedText>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Global video library for translations of the Sutta Pitaka</ThemedText>
          </View>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Shorts as an introduction to Buddhism</ThemedText>
          </View>
          <View style={styles.bulletItem}>
             <ThemedText style={styles.bulletText}>• Preservation of past Buddhist works</ThemedText>
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.push('/home')}>
          <Ionicons name="home" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={() => {}}>
          <Ionicons name="layers" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.push('/about')}>
          <Ionicons name="information-circle" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#55372B' }, // Cream background
  scrollContent: { paddingHorizontal: 16, paddingBottom: 120, paddingTop: 60 },
  headerContainer: { alignItems: 'center', marginBottom: 24 },
  heroImage: { width: 80, height: 80, marginBottom: 10, tintColor: '#55372B' },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold', fontFamily: 'serif' },
  
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0d6c8',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardTitle: { color: '#8B4513', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  separator: { height: 1, backgroundColor: '#e0d6c8', marginBottom: 16 },
  
  sectionSubtitle: { 
    color: '#8B4513', 
    fontSize: 16, 
    marginTop: 16, 
    marginBottom: 8, 
    fontWeight: '600',
    textDecorationLine: 'underline'
  },
  
  bulletItem: { marginBottom: 8, paddingLeft: 4 },
  bulletText: { color: '#4a3b32', fontSize: 15, lineHeight: 24 },

  footer: {
    position: 'absolute',
    left: 40,
    right: 40,
    bottom: 40,
    backgroundColor: '#c54e36bd',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  footerBtn: { alignItems: 'center', flex: 1 },
});
