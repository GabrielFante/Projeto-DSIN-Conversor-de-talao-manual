import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import RoundIconButton from '@/src/components/RoundIconButton';

const { width } = Dimensions.get('window');
const PALETTE = {
  header: '#3D4F5A',
  yellow: '#F1B420',
  grayDark: '#2F3C46',
  scrim: 'rgba(0,0,0,0.35)',
};

export default function CaptureScreen() {
  const router = useRouter();
  const camRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [ready, setReady] = useState(false);

  if (!permission) return <View style={{ flex: 1, backgroundColor: PALETTE.grayDark }} />;
  if (!permission.granted) {
    return (
      <View style={[styles.fill, styles.center, { backgroundColor: PALETTE.grayDark }]}>
        <RoundIconButton name="camera" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    if (!camRef.current) return;
    try {
      const photo = await camRef.current.takePictureAsync({ quality: 0.9, skipProcessing: true });
      if (photo?.uri) {
        router.push({ pathname: '/review', params: { uri: photo.uri } });
      }
    } catch (_) {}
  };

  return (
    <View style={styles.fill}>
      <CameraView
        ref={camRef}
        style={styles.fill}
        facing="back"
        onCameraReady={() => setReady(true)}
      />

      {/* botão de “galeria” no topo direito (ícone apenas) */}
      <View style={styles.topRight}>
        <RoundIconButton lib="mci" name="image-outline" />
      </View>

      {/* barra inferior com voltar, disparo e galeria */}
      <View style={styles.bottomBar}>
        <RoundIconButton name="arrow-back" onPress={() => router.back()} />

        <TouchableOpacity onPress={takePicture} activeOpacity={0.8} style={styles.shutter}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>

        <RoundIconButton lib="mci" name="image-plus" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },

  topRight: {
    position: 'absolute', top: 18, right: 18,
  },

  bottomBar: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    paddingHorizontal: 24, paddingVertical: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  shutter: {
    width: 84, height: 84, borderRadius: 42,
    borderWidth: 6, borderColor: '#ffffff',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  shutterInner: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#ffffff',
  },
});
