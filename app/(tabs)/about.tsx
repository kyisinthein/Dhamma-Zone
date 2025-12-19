import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AboutPage() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
            {/* <Image 
                source={{ uri: 'https://sys-shop.s3.ap-southeast-1.amazonaws.com/0main/DhammaZone/dhamma.png' }} 
                style={styles.heroImage}
                resizeMode="contain"
            /> */}
            <ThemedText type="title" style={styles.headerTitle}>About Dhamma Zone</ThemedText>
        </View>

        {/* Mission Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Ionicons name="leaf-outline" size={24} color="#8B4513" />
             <ThemedText type="subtitle" style={styles.cardTitle}>Mission</ThemedText>
          </View>
          <View style={styles.separator} />
          <ThemedText style={styles.missionText}>
            "To understand the true teachings of Buddhism"
          </ThemedText>
          <ThemedText style={styles.missionSubText}>
            Seek to spread the original messages of the Buddha.
          </ThemedText>
        </View>

        {/* Foundation Info Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Ionicons name="stats-chart-outline" size={24} color="#8B4513" />
             <ThemedText type="subtitle" style={styles.cardTitle}>Foundation Info</ThemedText>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.statRow}>
            <Ionicons name="calendar-outline" size={20} color="#55372B" style={styles.icon} />
            <ThemedText style={styles.statText}>Founded: 16 June 2021</ThemedText>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="business-outline" size={20} color="#55372B" style={styles.icon} />
            <ThemedText style={[styles.statText, { paddingTop: 10 }]}>ဓမ္မဇုန် ဖောင်ဒေးရှင်း</ThemedText>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="logo-facebook" size={20} color="#55372B" style={styles.icon} />
            <ThemedText style={styles.statText}>13,000 followers on Facebook</ThemedText>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="people-outline" size={20} color="#55372B" style={styles.icon} />
            <ThemedText style={styles.statText}>10 Members</ThemedText>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="book-outline" size={20} color="#55372B" style={styles.icon} />
            <ThemedText style={styles.statText}>80 Discourses of Buddha</ThemedText>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="school-outline" size={20} color="#55372B" style={styles.icon} />
            <ThemedText style={styles.statText}>Over 80 children attended lessons</ThemedText>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Ionicons name="time-outline" size={24} color="#8B4513" />
             <ThemedText type="subtitle" style={styles.cardTitle}>ဓမ္မဇုန် ရာဇဝင်</ThemedText>
          </View>
           <View style={styles.separator} />
          <ThemedText style={[styles.text, { paddingTop: 10 }]}>
            ဦးကျော်ဝင်းမှ အမြတ်ဇုန် ဟု မတ်လ ၂၀၁၉ တွင် အကြံဉာဏ် ထွက်ပေါ်ခဲ့ခြင်းဖြစ်သည် ။
          </ThemedText>
          <ThemedText style={[styles.text, { paddingTop: 10 }]}>
            ဝင်းမိုးဟာ ဓမ္မဇုန်ဟု ဇွန်လ ၂၀၂၁ တွင် အမည်ပြောင်းခဲ့ပြီး ဘုရားဟောသုတ္တန်များကို မြန်မာစာတန်းထိုးပြီး ထုတ်လုပ်ခဲ့သည်။
          </ThemedText>
        </View>

        {/* About Description Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Ionicons name="information-circle-outline" size={24} color="#8B4513" />
             <ThemedText type="subtitle" style={styles.cardTitle}>ဓမ္မဇုန် အကြောင်း</ThemedText>
          </View>
           <View style={styles.separator} />
          <ThemedText style={[styles.text, { paddingTop: 10 }]}>
            ဓမ္မဇုန် (Facebook Page) ကို တည်ထောင်ရခြင်း ရည်ရွယ်ချက်မှာ ဂေါတမမြတ်စွာဘုရားရှင် ဟောကြားခဲ့သော တရားဓမ္မများ၏ အနှစ်သာရများကို လေးလေးနက်နက် သိရှိနိုင်စေရန် ကိုယ်တိုင်သိမြင်ပြီး ကျင့်ကြံအားထုတ်နိုင်စေရန် ရည်ရွယ်ပါသည်။
          </ThemedText>
          <ThemedText style={[styles.text, { paddingTop: 10 }]}>
            တရားဓမ္မများ၏ အနှစ်သာရများကို ဗုဒ္ဓဘာသာဝင်သူတော်ကောင်းများအတွက် အကျိုးမြတ်များ ရရှိစေရန် ရည်ရွယ်၍ ဓမ္မဇုန် ဆရာတော် သပိတ်နှင့် သင်္ကန်း ၁၀ ဦးဖြင့် ကြီးစားထုတ်၍ ဘုရားရှင်ကိုယ်တော်မြတ်ကြီး နှုတ်တော်မှဟောကြားခဲ့သော သုတ္တန်တွင် တိတ်တဆိတ် ရေးသားထားသော ပါဠိ နှင့် မြန်မာပြန်များကို အသံထွက် စာတန်းထိုး Video များဖြင့် Page တွင် စဉ်ဆက်မပျက်တင်ပေးလျက်ရှိပါသည်။
          </ThemedText>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.push('/home')}>
          <Ionicons name="home" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.push('/projects')}>
          <Ionicons name="layers" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={() => {}}>
          <Ionicons name="information-circle" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#55372B' }, // Cream background for classic feel
  scrollContent: { paddingHorizontal: 16, paddingBottom: 120, paddingTop: 60 },
  headerContainer: { alignItems: 'center', marginBottom: 24, marginTop: 30 },
  heroImage: { width: 80, height: 80, marginBottom: 10, tintColor: '#55372B' },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold', fontFamily: 'serif' }, // Serif font for classic look
  
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
  cardTitle: { color: '#8B4513', fontSize: 20, fontWeight: 400, marginLeft: 10 },
  separator: { height: 1, backgroundColor: '#e0d6c8', marginBottom: 16 },
  
  missionText: { 
    color: '#55372B', 
    fontSize: 18, 
     
    textAlign: 'center', 
    marginBottom: 8,
    fontWeight: '500'
  },
  missionSubText: { 
    color: '#6b4e42', 
    fontSize: 15, 
    textAlign: 'center' 
  },
  
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { marginRight: 12, width: 24, textAlign: 'center' },
  statText: { color: '#55372B', fontSize: 16 },
  
  text: { color: '#4a3b32', fontSize: 16, lineHeight: 26, textAlign: 'justify' }, // Justified text for classic book feel

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
