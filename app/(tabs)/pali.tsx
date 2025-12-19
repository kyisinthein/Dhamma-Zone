import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type Sutta = {
  id: string;
  sutta_id: string;
  sutta_title: string;
  sutta_subtitle: string | null;
  text: string | null;
  text_link: string | null;
  image_link: string | null;
  fb_link: string | null;
  utube_link: string | null;
};

export default function PaliPage() {
  const [data, setData] = useState<Sutta[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [groupStart, setGroupStart] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchData, setSearchData] = useState<Sutta[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const columns = 2;
  const rowsPerPage = 2;
  const pageSize = columns * rowsPerPage;
  const router = useRouter();

  async function fetchCount() {
    const { count, error } = await supabase
      .from('sutta_pali')
      .select('*', { count: 'exact', head: true });
    if (!error && count !== null) {
      setTotalCount(count);
    }
  }

  useEffect(() => {
    fetchCount();
  }, []);

  async function load(p: number) {
    setLoading(true);
    const from = (p - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from('sutta_pali')
      .select('id,sutta_id,sutta_title,sutta_subtitle,text,text_link,image_link,fb_link,utube_link')
      .order('sutta_id', { ascending: true })
      .range(from, to);
    if (error) {
      setLoading(false);
      return;
    }
    setData((data as unknown as Sutta[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load(page);
  }, [page]);

  async function doSearch(q: string) {
    if (!q.trim()) {
      setSearchData([]);
      return;
    }
    setSearching(true);
    const { data, error } = await supabase
      .from('sutta_pali')
      .select('id,sutta_id,sutta_title,sutta_subtitle,text,text_link,image_link,fb_link,utube_link')
      .or(`sutta_title.ilike.%${q}%,sutta_subtitle.ilike.%${q}%,text.ilike.%${q}%`)
      .order('sutta_id', { ascending: true })
      .limit(20);
    if (!error) {
      setSearchData((data as unknown as Sutta[]) ?? []);
    }
    setSearching(false);
  }

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => doSearch(query), 300);
      return () => clearTimeout(t);
    }
  }, [query, searchOpen]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.actionsRow}>
          <ThemedText type="title" style={styles.headerTitle}>ပါဠိ(မြန်မာပြန်)</ThemedText>
          <View style={{ flex: 1 }} />
          {searchOpen ? (
            <View style={styles.searchWrap}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search"
                placeholderTextColor="#8b6b60"
                style={styles.searchInput}
              />
              <TouchableOpacity onPress={() => { setSearchOpen(false); setQuery(''); setSearchData([]); }} style={styles.searchBtn}>
                <Ionicons name="close" size={18} color="#55372B" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setSearchOpen(true)} style={styles.searchBtn}>
              <Ionicons name="search" size={18} color="#55372B" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {(searchOpen ? searching : loading) ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={searchOpen ? searchData : data}
          keyExtractor={(item) => item.id}
          numColumns={columns}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridList}
          renderItem={({ item }) => (
            <View style={styles.gridCard}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => (router.push({ pathname: '/sutta/[id]' as any, params: { id: item.id } } as any))}>
                <View style={styles.gridThumbWrap}>
                  {item.image_link ? (
                    <Image source={{ uri: item.image_link }} style={styles.gridThumb} contentFit="cover" />
                  ) : null}
                </View>
              </TouchableOpacity>
              <ThemedText numberOfLines={2} type="subtitle" style={styles.gridTitle}>{item.sutta_title}</ThemedText>
            </View>
          )}
        />
      )}
      {!searchOpen ? (
        <View style={styles.paginationFixed}>
          <View style={styles.pageRow}>
            <TouchableOpacity 
              onPress={() => setGroupStart(Math.max(1, groupStart - 5))} 
              style={[styles.pageArrow, groupStart <= 1 && { opacity: 0.5 }]}
              disabled={groupStart <= 1}
            >
              <Ionicons name="chevron-back" size={20} color="#55372B" />
            </TouchableOpacity>
            <View style={styles.pageChips}>
              {Array.from({ length: 5 }, (_, i) => groupStart + i)
                .filter(n => (n - 1) * pageSize < totalCount)
                .map((n) => (
                <TouchableOpacity key={n} style={[styles.chip, page === n && styles.chipActive]} onPress={() => setPage(n)}>
                  <ThemedText style={page === n ? styles.chipTextActive : styles.chipText}>{String(n)}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity 
              onPress={() => setGroupStart(groupStart + 5)} 
              style={[styles.pageArrow, (groupStart + 5 - 1) * pageSize >= totalCount && { opacity: 0.5 }]}
              disabled={(groupStart + 5 - 1) * pageSize >= totalCount}
            >
              <Ionicons name="chevron-forward" size={20} color="#55372B" />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.replace('/home')}>
          <Ionicons name="home" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn} onPress={() => router.push('/projects')}>
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
  container: { flex: 1, backgroundColor: '#55372B', paddingTop: 70 },
  topBar: { paddingHorizontal: 16, gap: 10, marginTop: 0 },
  actionsRow: { flexDirection: 'row', alignItems: 'center' },
  pageRow: { flexDirection: 'row', alignItems: 'center' },
  pageArrow: { width: 32, height: 32, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  pageChips: { flexDirection: 'row', gap: 10, flex: 1, justifyContent: 'center' },
  chip: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  chipActive: { backgroundColor: '#7e2f1fff' },
  chipText: { color: '#7e2f1fff' },
  chipTextActive: { color: '#fff' },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 400, paddingTop: 40, paddingBottom: 20 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  searchInput: { width: 160, height: 34, borderRadius: 17, backgroundColor: '#fff', paddingHorizontal: 12, color: '#55372B', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  searchBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, zIndex: 1 },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 140 },
  gridList: { paddingHorizontal: 16, paddingBottom: 220, gap: 16, marginTop: 16 },
  gridRow: { gap: 16 },
  gridCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 22, padding: 10, alignItems: 'center' },
  gridThumbWrap: { width: 150, height: 150, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' },
  gridThumb: { width: '100%', height: '100%' },
  gridTitle: { fontSize: 14, fontWeight: 400, color: '#7e2f1fff', marginTop: 10 },
  gridReadBtn: { backgroundColor: '#c54e36', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, marginTop: 10 },
  gridReadText: { color: '#fff', fontSize: 11 },
  paginationFixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 140,
    paddingHorizontal: 16,
    zIndex: 1,
  },
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
