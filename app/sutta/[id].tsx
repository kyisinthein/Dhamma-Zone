import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEvent } from 'expo';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type Sutta = {
  id: string;
  sutta_id: string;
  sutta_title: string;
  sutta_subtitle: string | null;
  text: string | null;
  image_link: string | null;
  utube_link: string | null;
  language: string[];
};

export default function SuttaDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<Sutta | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ytLoading, setYtLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from('sutta')
        .select('id,sutta_id,sutta_title,sutta_subtitle,text,image_link,utube_link,language')
        .eq('id', id)
        .single();
      if (!error) setItem(data as Sutta);
      setLoading(false);
    }
    if (id) load();
  }, [id]);

  function isDirectVideo(url?: string | null) {
    if (!url) return false;
    const lower = url.toLowerCase();
    return /\.(mp4|mov|m4v|webm|m3u8)$/.test(lower) || /amazonaws|cloudfront/.test(lower);
  }
  function isYouTube(url?: string | null) {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.includes('youtube.com') || lower.includes('youtu.be');
  }
  function toYouTubeEmbed(url?: string | null) {
    if (!url) return null;
    try {
      const u = new URL(url);
      const host = u.hostname.toLowerCase();
      let id = '';
      if (host.includes('youtu.be')) {
        id = u.pathname.replace('/', '').split('/')[0];
      } else if (host.includes('youtube.com')) {
        if (u.pathname.startsWith('/watch')) {
          id = u.searchParams.get('v') ?? '';
        } else if (u.pathname.startsWith('/embed/')) {
          id = u.pathname.split('/')[2] ?? '';
        } else if (u.pathname.startsWith('/shorts/')) {
          id = u.pathname.split('/')[2] ?? '';
        }
      }
      if (!id) return null;
      const params = new URLSearchParams({
        playsinline: '1',
        autoplay: '0',
        controls: '1',
        rel: '0',
        modestbranding: '1',
        enablejsapi: '1',
        origin: 'https://www.youtube.com',
      }).toString();
      return `https://www.youtube.com/embed/${id}?${params}`;
    } catch {
      return null;
    }
  }
  let WebViewComp: any = null;
  try {
    WebViewComp = require('react-native-webview').WebView;
  } catch {}

  useEffect(() => {
    setVideoError(null);
    setVideoLoading(false);
    setIsLoaded(false);
    setIsPlaying(false);
    setYtLoading(false);
  }, [item?.utube_link]);

  const player = useVideoPlayer(null, (player: VideoPlayer) => {
    player.loop = false;
    player.muted = false;
    player.timeUpdateEventInterval = 1;
  });

  useEffect(() => {
    if (item?.utube_link && isDirectVideo(item.utube_link)) {
      // Ensure the player is explicitly loaded with the new source
      player.replace(item.utube_link as any);
    }
  }, [item?.utube_link, player]);

  const playingEvent = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const statusEvent = useEvent(player, 'statusChange', { status: player.status, error: null as any });

  useEffect(() => {
    setIsPlaying(!!playingEvent.isPlaying);
  }, [playingEvent.isPlaying]);

  useEffect(() => {
    const s = statusEvent.status as string;
    setIsLoaded(s === 'ready' || s === 'playing' || s === 'paused');
    setVideoLoading(s === 'loading');
    if (s === 'error') {
      setVideoError('failed');
    } else {
      setVideoError(null);
    }
  }, [statusEvent.status]);

  return (
    <ThemedView style={styles.container}>
      <View style={{ height: 20 }} />

      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.inlineLoading}><ActivityIndicator /></View>
        ) : null}
          {item?.utube_link ? (
            isDirectVideo(item.utube_link) ? (
              <>
                <View style={styles.videoWrap}>
                  <VideoView
                    player={player}
                    style={styles.video}
                    contentFit="contain"
                    allowsFullscreen
                    allowsPictureInPicture
                    nativeControls
                  />
                  {videoLoading ? (
                    <View style={styles.playOverlay}>
                      <ActivityIndicator color="#ffffff" />
                    </View>
                  ) : null}
                  {!isPlaying && isLoaded && !videoLoading && !videoError ? (
                    <TouchableOpacity
                      style={styles.playOverlay}
                      onPress={() => player.play()}
                      activeOpacity={0.8}>
                      <Ionicons name="play-circle" size={56} color="#ffffff" />
                    </TouchableOpacity>
                  ) : null}
                  {videoError ? (
                    <View style={styles.playOverlay}>
                      <ThemedText style={{ color: '#fff' }}>Video cannot be played</ThemedText>
                    </View>
                  ) : null}
                </View>
                {item?.sutta_subtitle ? (
                  <View style={styles.subtitleBelow}>
                    <ThemedText style={styles.subtitleBelowText}>{item.sutta_subtitle}</ThemedText>
                  </View>
                ) : null}
              </>
            ) : (
              <>
                {isYouTube(item.utube_link) && WebViewComp && toYouTubeEmbed(item.utube_link) ? (
                  <View style={styles.videoWrap}>
                    <WebViewComp
                      style={styles.video}
                      source={{ uri: toYouTubeEmbed(item.utube_link)! }}
                      allowsFullscreenVideo
                      allowsInlineMediaPlayback
                      mediaPlaybackRequiresUserAction={false}
                      userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
                      onShouldStartLoadWithRequest={(req: { url?: string }) => {
                        const url = req.url || '';
                        // If YouTube tries to navigate out of the embed, open externally
                        if (/youtube\.com\/watch|youtu\.be|consent\.youtube\.com|accounts\.google\.com/.test(url)) {
                          WebBrowser.openBrowserAsync(url);
                          return false;
                        }
                        return true;
                      }}
                      onLoadStart={() => setYtLoading(true)}
                      onLoadEnd={() => setYtLoading(false)}
                      onError={() => {
                        setVideoError('failed');
                        setYtLoading(false);
                      }}
                    />
                    {ytLoading ? (
                      <View style={styles.playOverlay}>
                        <ActivityIndicator color="#ffffff" />
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.videoWrap}
                    activeOpacity={0.85}
                    onPress={() => {
                      if (item?.utube_link) {
                        WebBrowser.openBrowserAsync(item.utube_link);
                      }
                    }}>
                    <View style={styles.video} />
                    <View style={styles.playOverlay}>
                      <Ionicons name="open-outline" size={28} color="#ffffff" />
                      <ThemedText style={{ color: '#fff', marginTop: 6 }}>Open video</ThemedText>
                    </View>
                  </TouchableOpacity>
                )}
                {item?.sutta_subtitle ? (
                  <View style={styles.subtitleBelow}>
                    <ThemedText style={styles.subtitleBelowText}>{item.sutta_subtitle}</ThemedText>
                  </View>
                ) : null}
              </>
            )
          ) : null}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <TouchableOpacity style={styles.cardBackBtn} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={18} color="#55372B" />
              </TouchableOpacity>
              <View style={styles.cardHeaderCenter}>
                <ThemedText type="subtitle" style={styles.cardTitleCenter}>
                  {item?.sutta_title}
                </ThemedText>
              </View>
              {/* <View style={styles.langChip}>
                <ThemedText style={styles.langChipText}>
                  {item?.language?.includes('Myanmar') ? 'မြန်မာဘာသာ' : 'ပါဠိ'}
                </ThemedText>
              </View> */}
            </View>
            {/* <View style={styles.metaRow}>
              <View style={styles.metaChip}>
                <ThemedText style={styles.metaChipText}>
                  {item?.language?.includes('Myanmar') ? 'မြန်မာဘာသာ' : 'ပါဠိ'}
                </ThemedText>
              </View>
            </View> */}
            {item?.text ? <ThemedText style={styles.body}>{item.text}</ThemedText> : null}
          </View>
        </ScrollView>

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
  container: { flex: 1, backgroundColor: '#55372B', paddingTop: 40 },
  content: { padding: 16, paddingBottom: 140, gap: 16 },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 140 },
  inlineLoading: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  videoWrap: { width: '100%', height: 200, borderRadius: 20, overflow: 'hidden', backgroundColor: '#3f2a21' },
  video: { width: '100%', height: '100%' },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { backgroundColor: '#e7c1a9ff', borderRadius: 20, padding: 18 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cardBackBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderCenter: { flex: 1, alignItems: 'center', alignSelf: 'center', marginTop: -5 },
  cardTitleCenter: { color: '#55372B', fontSize: 22, fontWeight: 400, marginLeft: -15 },
  langChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f3d9c8',
    borderRadius: 12,
    marginLeft: 8,
  },
  langChipText: { color: '#55372B', fontSize: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 8, marginTop: 10, marginBottom: 4 },
  metaChipPrimary: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fde2dc',
    borderRadius: 12,
  },
  metaChipPrimaryText: { color: '#c54e36', fontSize: 12 },
  metaDivider: { width: 1, height: 14, backgroundColor: '#c9a58f' },
  metaChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f3d9c8',
    borderRadius: 10,
  },
  metaChipText: { color: '#55372B', fontSize: 12 },
  subtitleBelow: {
    alignSelf: 'center',
    marginTop: 0,
    backgroundColor: '#f3d9c8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  subtitleBelowText: { color: '#c54e36', fontSize: 11 },
  body: { color: '#55372B', fontSize: 12, marginTop: 12, lineHeight: 22, textAlign: 'justify' },
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
  },
  footerBtn: { alignItems: 'center', flex: 1 },
});
