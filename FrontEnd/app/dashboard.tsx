// app/dashboard.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Platform,
  Animated, // usamos de fato
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFadeOnFocus } from '@/hooks/useFadeOnFocus';
import Logo from '../assets/dsin/logo.svg';

const H_PADDING = 24;
const COL_GAP = 28;
const ROW_GAP = 26;
const TOP_SPACING = 28;
const BOTTOM_SPACING = 36;
const MAX_TILE = 128;
const ICON_SIZE = 36;

const { width } = Dimensions.get('window');
const tileSize = Math.min(Math.floor((width - (H_PADDING * 2) - COL_GAP) / 2), MAX_TILE);

const ITEMS = [
  { key: 'talao',       label: 'Talão Eletrônico',  src: require('../assets/dsin/phone.png') },
  { key: 'registro',    label: 'Registro de Multas',src: require('../assets/dsin/bo.png') },
  { key: 'recolhimento',label: 'Recolhimento',      src: require('../assets/dsin/noParking.png') },
  { key: 'infra',       label: 'Infraestrutura',    src: require('../assets/dsin/infra.png') },
  { key: 'transporte',  label: 'Transporte',        src: require('../assets/dsin/car.png') },
  { key: 'vaga',        label: 'Vaga Especial',     src: require('../assets/dsin/cadeira.png') },
];

export default function Dashboard() {
  const router = useRouter();
  const opacity = useFadeOnFocus(280); // <- usamos este valor

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.brandWrap}>
          <Logo width={120} height={28} />
        </View>
        <TouchableOpacity
          onPress={() => router.replace('/login')}
          activeOpacity={0.9}
          style={styles.logoutBtn}
        >
          <Image source={require('../assets/dsin/sair.png')} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      {/* FADE no conteúdo */}
      <Animated.View style={{ flex: 1, opacity }}>
        <ImageBackground
          source={require('../assets/dsin/background.jpg')}
          resizeMode="cover"
          style={styles.bg}
          imageStyle={{ opacity: 0.95 }}
        >
          <View style={styles.content}>
            <View style={styles.grid}>
              {ITEMS.map((it) => (
                <TouchableOpacity
                  key={it.key}
                  activeOpacity={0.92}
                  onPress={() => alert(`Abrir: ${it.label}`)}
                  style={[styles.tile, { width: tileSize, height: tileSize }]}
                >
                  <Image source={it.src} style={styles.tileIcon} />
                  <Text style={styles.tileText}>{it.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    height: 64,
    backgroundColor: '#3D4F5A',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandWrap: { flexDirection: 'row', alignItems: 'center' },
  logoutBtn: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#4e616d',
    alignItems: 'center', justifyContent: 'center',
  },
  logoutIcon: { width: 22, height: 22, tintColor: '#fff', resizeMode: 'contain' },
  bg: { flex: 1 },
  content: {
    flex: 1,
    paddingTop: TOP_SPACING,
    paddingBottom: BOTTOM_SPACING,
    alignItems: 'center',
  },
  grid: {
    width: '100%',
    maxWidth: 720,
    paddingHorizontal: H_PADDING,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: COL_GAP,
    rowGap: ROW_GAP,
  },
  tile: {
    backgroundColor: '#F1B420',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: Platform.select({ ios: 0.18, default: 0.22 }),
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  tileIcon: { width: ICON_SIZE, height: ICON_SIZE, marginBottom: 8, resizeMode: 'contain' },
  tileText: { color: '#2F3C46', fontWeight: '700', textAlign: 'center' },
});
