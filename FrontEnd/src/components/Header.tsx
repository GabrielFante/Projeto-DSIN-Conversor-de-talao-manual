import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  showBack?: boolean;
  /** Slot opcional para renderizar um botão/ícone do lado direito do header */
  rightSlot?: React.ReactNode;
};

export default function Header({ showBack = false, rightSlot }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ESQUERDA: Voltar (ou espaço para manter a logo centralizada) */}
      {showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.sideBtn}
          hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.sidePlaceholder} />
      )}

      {/* CENTRO: Logo */}
      <View style={styles.center}>
        <Image
          source={require('../../assets/dsin/Dsin.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* DIREITA: rightSlot (ou placeholder para manter alinhamento) */}
      <View style={styles.sideBox}>
        {rightSlot ?? <View style={styles.sidePlaceholder} />}
      </View>
    </View>
  );
}

const SIDE_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#3D4F5A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  sideBox: {
    width: SIDE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideBtn: {
    width: SIDE_SIZE,
    height: SIDE_SIZE,
    borderRadius: SIDE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidePlaceholder: {
    width: SIDE_SIZE,
    height: SIDE_SIZE,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 110,
    height: 40,
  },
});
