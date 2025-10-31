import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import RoundIconButton from '@/src/components/RoundIconButton';

const PALETTE = {
  green: '#22c55e',
  red: '#ef4444',
  yellow: '#F1B420',
  grayBar: 'rgba(0,0,0,0.35)',
};

export default function ReviewScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();

  const sendToAnalysis = () => {
    //trocar pela requisição depois de implementar o backend
    alert('Enviado para análise!');
  };

  return (
    <View style={styles.container}>
      {!!uri && <Image source={{ uri }} style={styles.photo} resizeMode="cover" />}

      <View style={styles.frame} pointerEvents="none" />

      <View style={styles.actions}>
        <RoundIconButton lib="mat" name="close" bg={PALETTE.red} onPress={() => router.back()} />
        <RoundIconButton lib="ion" name="cloud-upload-outline" bg={PALETTE.yellow} color="#2F3C46" onPress={sendToAnalysis} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  photo: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },

  frame: {
    position: 'absolute',
    left: 40, right: 40, top: 120, bottom: 160,
    borderWidth: 4, borderColor: '#F1B420', borderRadius: 8,
  },

  actions: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    paddingHorizontal: 24, paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
  },
});
