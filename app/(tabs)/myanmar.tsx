import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

type Sutta = {
  id: string;
  sutta_id: string;
  sutta_title: string;
  sutta_subtitle: string | null;
  text: string | null;
  text_link: string | null;
  image_link: string | null;
};

export default function MyanmarPage() {
  const [data, setData] = useState<Sutta[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const router = useRouter();

  async function load(p: number) {
    setLoading(true);
    const from = (p - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from('sutta')
      .select('id,sutta_id,sutta_title,sutta_subtitle,text,text_link,image_link,language')
      .contains('language', ['Myanmar'])
      .order('sutta_id', { ascending: true })
      .range(from, to);
    if (error) {
      setLoading(false);
      return;
    }
    setData((data as Sutta[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load(page);
  }, [page]);

  return (
    <ThemedView style={styles.container}>
      {/* <ThemedText type="title" style={styles.title}>မြန်မာဘာသာ</ThemedText> */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.replace('/home')} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#55372B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage(Math.max(1, page - 1))} style={styles.pageArrow}>
          <Ionicons name="chevron-back" size={20} color="#55372B" />
        </TouchableOpacity>
        <View style={styles.pageChips}>
          {[1,2,3,4,5,6].map((n) => (
            <TouchableOpacity key={n} style={[styles.chip, page === n && styles.chipActive]} onPress={() => setPage(n)}>
              <ThemedText style={page === n ? styles.chipTextActive : styles.chipText}>{String(n)}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.searchBtn}>
          <Ionicons name="search" size={18} color="#55372B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage(page + 1)} style={styles.pageArrow}>
          <Ionicons name="chevron-forward" size={20} color="#55372B" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.cardRow}>
              <View style={styles.cardLeft}>
                <ThemedText type="subtitle" style={styles.cardTitle}>{item.sutta_title}</ThemedText>
                {item.text ? <ThemedText numberOfLines={4} style={styles.cardText}>{item.text}</ThemedText> : null}
              </View>
              <View style={styles.cardRight}>
                <View style={styles.cardThumbWrap}>
                  {item.image_link ? (
                    <Image source={{ uri: item.image_link }} style={styles.cardThumb} contentFit="cover" />
                  ) : null}
                </View>
                {item.text_link ? (
                  <TouchableOpacity style={styles.readBtnWide} onPress={() => WebBrowser.openBrowserAsync(item.text_link!)}>
                    <ThemedText style={styles.readBtnText}>ပိုမိုဖတ်ရှုရန်</ThemedText>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          )}
        />
      )}
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#55372B', paddingTop: 100 },
  title: { alignSelf: 'center', marginVertical: 12, color: '#fff', paddingTop: 100 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 8, marginTop: 12 },
  pageArrow: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  pageChips: { flexDirection: 'row', gap: 8, flex: 1 },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#fff', minWidth: 32, alignItems: 'center' },
  chipActive: { backgroundColor: '#55372B' },
  chipText: { color: '#55372B' },
  chipTextActive: { color: '#fff' },
  searchBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  list: { padding: 16, gap: 16, marginTop: 16 },
  cardRow: { backgroundColor: '#ffffff', borderRadius: 28, padding: 16, flexDirection: 'row', gap: 12, marginBottom: 16 },
  cardLeft: { flex: 1, paddingRight: 8 },
  cardRight: { width: 150, alignItems: 'center', gap: 8, borderLeftWidth: 2, borderLeftColor: '#e9d3c6' },
  cardTitle: { fontSize: 20, color: '#55372B', alignSelf: 'center', fontWeight: 400
   },
  cardText: { fontSize: 11, color: '#55372B', paddingTop: 10, textAlign: 'justify' },
  cardThumbWrap: { width: 120, height: 120, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginLeft: 10 },
  cardThumb: { width: '100%', height: '100%' },
  readBtnWide: { backgroundColor: '#c54e36', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,alignSelf: 'center', marginLeft: 10 },
  readBtnText: { color: '#fff', fontSize: 11 },
  footer: {
    position: 'absolute',
    left: 40,
    right: 40,
    bottom: 40,
    backgroundColor: '#7e2f1fff',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerBtn: { alignItems: 'center', flex: 1 },
});
