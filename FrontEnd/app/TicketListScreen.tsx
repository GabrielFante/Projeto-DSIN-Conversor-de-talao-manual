import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SectionList,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '@/src/components/Header';

const Colors = {
  bg: '#EEF1F4',
  headerRow: '#E5E7EA',
  card: '#FFFFFF',
  textDark: '#1C2430',
  textMuted: '#5D6B78',
  border: '#E3E7ED',
  shadow: 'rgba(16, 24, 40, 0.08)',
  blue: '#D6EBFF',
  blueText: '#1473E6',
  green: '#E3F7E8',
  greenText: '#2E7D32',
  orange: '#FFEED6',
  orangeText: '#C77800',
  red: '#FFE3E3',
  redText: '#C62828',
  inputBg: '#FFFFFF',
  inputBorder: '#D6DADF',
};

type Priority = 'Em Análise' | 'Baixa' | 'Média' | 'Urgente';

type Ticket = {
  id: string;
  vehicle: string;
  plate: string;
  reason: string;
  date: string;
  priority: Priority;
};

// ——— mock ———
const DATA: Ticket[] = [
  { id: '1', vehicle: 'VW Kombi', plate: 'LVW-9112', reason: 'Veículo transitando em velocidade baixa', date: '2025-05-19T10:38:00Z', priority: 'Em Análise' },
  { id: '2', vehicle: 'Toyota Corolla', plate: 'ONM-5496', reason: 'Veículo acima da Velocidade', date: '2025-05-19T08:27:00Z', priority: 'Em Análise' },
  { id: '3', vehicle: 'Renault Kwid', plate: 'WGK-9852', reason: 'Veículo estacionado em zona azul', date: '2025-05-19T07:30:00Z', priority: 'Em Análise' },
  { id: '4', vehicle: 'Audi RS4', plate: 'JIS-9067', reason: 'Veículo estacionado em zona azul', date: '2024-07-16T15:28:00Z', priority: 'Baixa' },
  { id: '5', vehicle: 'Toyota Hilux', plate: 'YAR-4875', reason: 'Ultrapassagem no semáforo vermelho', date: '2024-07-16T11:45:00Z', priority: 'Baixa' },
  { id: '6', vehicle: 'Chevrolet Montana', plate: 'UAL-7896', reason: 'Veículo estacionado em cima da calçada', date: '2024-07-16T10:28:00Z', priority: 'Baixa' },
  { id: '7', vehicle: 'VW T-Cross', plate: 'AHY-1458', reason: 'Veículo estacionado em local proibido', date: '2024-05-29T23:28:00Z', priority: 'Média' },
  { id: '8', vehicle: 'VW Saveiro', plate: 'GAH-2684', reason: 'Veículo irregular', date: '2024-05-29T22:12:00Z', priority: 'Média' },
  { id: '9', vehicle: 'VW Gol', plate: 'IUO-2584', reason: 'Veículo com pneu careca', date: '2024-05-29T18:25:00Z', priority: 'Média' },
  { id: '10', vehicle: 'Fiat Uno', plate: 'TYA-2684', reason: 'Ultrapassagem proibida', date: '2024-02-18T12:35:00Z', priority: 'Urgente' },
  { id: '11', vehicle: 'Scania R440', plate: 'JAJ-1247', reason: 'Veículo acima da velocidade', date: '2024-02-18T08:21:00Z', priority: 'Urgente' },
];

const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return { day: `${dd}/${mm}/${yyyy}`, time: `${hh}:${min}` };
};

const dateKey = (iso: string) => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
};

function matchesPlate(q: string, t: Ticket) { return normalize(t.plate).includes(normalize(q)); }
function matchesVehicle(q: string, t: Ticket) { return normalize(t.vehicle).includes(normalize(q)); }
function matchesReason(q: string, t: Ticket) { return normalize(t.reason).includes(normalize(q)); }
function matchesDate(q: string, t: Ticket) {
  const { day } = fmtDate(t.date);
  const ymd = day.split('/').reverse().join('-');
  const norm = q.replace(/\s+/g, '');
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(norm)) return day === norm;     // dd/mm/yyyy
  if (/^\d{2}\/\d{2}$/.test(norm))         return day.startsWith(norm); // dd/mm
  if (/^\d{4}-\d{2}-\d{2}$/.test(norm))    return ymd === norm;     // yyyy-mm-dd
  return false;
}
function matchesTime(q: string, t: Ticket) {
  const { time } = fmtDate(t.date);
  const norm = q.replace(/\s+/g, '');
  if (/^\d{2}:\d{2}$/.test(norm)) return time.startsWith(norm);
  return false;
}

type SuggestionKind = 'Placa' | 'Veículo' | 'Motivo' | 'Data' | 'Hora';
type Suggestion = { value: string; kind: SuggestionKind };

function uniqueBy<T>(arr: T[], key: (x: T) => string) {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of arr) {
    const k = key(it);
    if (!seen.has(k)) { seen.add(k); out.push(it); }
  }
  return out;
}

function buildSuggestions(q: string, data: Ticket[], limit = 8): Suggestion[] {
  const nq = normalize(q);
  if (!nq) return [];

  const byPlate: Suggestion[] = data
    .map(t => t.plate)
    .filter(p => normalize(p).startsWith(nq))
    .map(v => ({ value: v, kind: 'Placa' }));

  const byVehicle: Suggestion[] = data
    .map(t => t.vehicle)
    .filter(v => normalize(v).startsWith(nq))
    .map(v => ({ value: v, kind: 'Veículo' }));

  const byReason: Suggestion[] = data
    .map(t => t.reason)
    .filter(v => normalize(v).startsWith(nq))
    .map(v => ({ value: v, kind: 'Motivo' }));

  const byDate: Suggestion[] = data
    .map(t => fmtDate(t.date).day)
    .filter(d => d.startsWith(q) || d.replace(/\//g, '').startsWith(nq))
    .map(v => ({ value: v, kind: 'Data' }));

  const byTime: Suggestion[] = data
    .map(t => fmtDate(t.date).time)
    .filter(h => h.startsWith(q))
    .map(v => ({ value: v, kind: 'Hora' }));

  const all = uniqueBy<Suggestion>(
    [...byPlate, ...byVehicle, ...byReason, ...byDate, ...byTime],
    x => `${x.kind}|${x.value}`
  );

  return all.slice(0, limit);
}

const priorityStyle = (p: Priority) => {
  switch (p) {
    case 'Em Análise': return { bg: Colors.blue, fg: Colors.blueText };
    case 'Baixa':      return { bg: Colors.green, fg: Colors.greenText };
    case 'Média':      return { bg: Colors.orange, fg: Colors.orangeText };
    case 'Urgente':    return { bg: Colors.red, fg: Colors.redText };
  }
};

const Badge = ({ text }: { text: Priority }) => {
  const { bg, fg } = priorityStyle(text);
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color: fg }]}>{text}</Text>
    </View>
  );
};

const ListItem = ({ item }: { item: Ticket }) => {
  const { day, time } = fmtDate(item.date);
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.colVehicle}>
          <Text style={styles.vehicle}>{item.vehicle}</Text>
        </View>

        <View style={styles.colPlate}>
          <Text style={styles.plate}>{item.plate}</Text>
        </View>

        <View style={styles.colReason}>
          <Text style={styles.reason} numberOfLines={3}>{item.reason}</Text>
        </View>

        <View style={styles.colDate}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateTime}>{time}</Text>
        </View>

        <View style={styles.colPrio}>
          <Badge text={item.priority} />
        </View>
      </View>
    </View>
  );
};

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.th, { flex: 1.0 }]}>Veículo</Text>
    <Text style={[styles.th, { flex: 0.9 }]}>Placa</Text>
    <Text style={[styles.th, { flex: 1.4 }]}>Motivo</Text>
    <Text style={[styles.th, { flex: 0.9 }]}>Data</Text>
    <Text style={[styles.th, { flex: 0.9, textAlign: 'right' }]}>Prioridade</Text>
  </View>
);

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionText}>{title}</Text>
  </View>
);

const SuggestionChip = ({ kind }: { kind: SuggestionKind }) => {
  const map: Record<SuggestionKind, { bg: string; fg: string }> = {
    Placa:   { bg: '#EAF3FF', fg: '#1158CC' },
    Veículo: { bg: '#EAF7EF', fg: '#256D3D' },
    Motivo:  { bg: '#FFF4E5', fg: '#A85E00' },
    Data:    { bg: '#EEEFF3', fg: '#394150' },
    Hora:    { bg: '#EEEFF3', fg: '#394150' },
  };
  const { bg, fg } = map[kind];
  return (
    <View style={{ backgroundColor: bg, paddingHorizontal: 8, height: 22, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: fg, fontSize: 11, fontWeight: '700' }}>{kind}</Text>
    </View>
  );
};

export default function TicketListScreen() {
  const [query, setQuery] = useState('');
  const [showSug, setShowSug] = useState(true);
  const router = useRouter();

  const suggestions = useMemo(() => buildSuggestions(query, DATA, 8), [query]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return DATA;

    return DATA.filter(t =>
      matchesPlate(q, t) ||
      matchesVehicle(q, t) ||
      matchesReason(q, t) ||
      matchesDate(q, t) ||
      matchesTime(q, t)
    );
  }, [query]);

  const sections = useMemo(() => {
    const map = new Map<string, Ticket[]>();
    for (const t of filtered) {
      const key = dateKey(t.date);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => {
        const [da, ma] = a.split('/').map(Number);
        const [db, mb] = b.split('/').map(Number);
        if (ma !== mb) return mb - ma;
        return db - da;
      })
      .map(([title, data]) => ({ title, data }));
  }, [filtered]);

  const applySuggestion = (s: Suggestion) => {
    setQuery(s.value);
    setShowSug(false);
  };

  return (
    <View style={styles.screen}>
      <Header
        showBack
        rightSlot={
          <TouchableOpacity
            style={{
              width: 36, height: 36, borderRadius: 18,
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
            }}
            onPress={() => router.push('/captureScreen')}
            hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Abrir câmera"
          >
            <Ionicons name="camera-outline" size={20} color="#EAF0F5" />
          </TouchableOpacity>
        }
      />

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            placeholder="Buscar placa, datas, veículos..."
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={(t) => { setQuery(t); setShowSug(true); }}
            style={styles.input}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => {}}>
          <MaterialIcons name="filter-list" size={22} color={Colors.textDark} />
        </TouchableOpacity>
      </View>

      {showSug && suggestions.length > 0 && (
        <View style={styles.suggestBox}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={suggestions}
            keyExtractor={(it, i) => it.kind + it.value + i}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestItem} onPress={() => applySuggestion(item)}>
                <SuggestionChip kind={item.kind} />
                <Text numberOfLines={1} style={styles.suggestText}>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <TableHeader />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        SectionSeparatorComponent={() => <View style={{ height: 6 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
        renderItem={({ item }) => <ListItem item={item} />}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ color: Colors.textMuted }}>Nenhum resultado</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        style={{ flex: 1 }}
        onScrollBeginDrag={() => setShowSug(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.bg },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginHorizontal: 12,
    marginBottom: 10,
  },
  searchBox: {
    flex: 1,
    backgroundColor: Colors.inputBg,
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 12,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: { flex: 1, color: Colors.textDark, paddingVertical: 0 },

  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.inputBg,
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  suggestBox: {
    marginTop: -6,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    maxHeight: 220,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  suggestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomColor: '#F1F3F5',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  suggestText: { color: Colors.textDark, fontSize: 13, flex: 1 },

  tableHeader: {
    height: 30,
    backgroundColor: Colors.headerRow,
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  th: { fontSize: 12, color: Colors.textDark, fontWeight: '700' },

  sectionHeader: {
    alignSelf: 'center',
    backgroundColor: '#F1F3F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 6,
  },
  sectionText: { color: Colors.textMuted, fontSize: 11, fontWeight: '600' },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: Colors.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 2,
    borderColor: Colors.border,
    borderWidth: 1,
    marginHorizontal: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center' },

  colVehicle: { flex: 1.0, paddingRight: 4 },
  colPlate:   { flex: 0.9, paddingRight: 4 },
  colReason:  { flex: 1.4, paddingHorizontal: 6 },
  colDate:    { flex: 0.9 },
  colPrio:    { flex: 0.9, alignItems: 'flex-end' },

  vehicle: { color: Colors.textDark, fontWeight: '700', fontSize: 14, lineHeight: 18 },
  plate:   { color: Colors.textDark, fontWeight: '700', fontSize: 14, lineHeight: 18 },

  reason: { color: Colors.textDark, fontSize: 13, textAlign: 'center' },

  dateDay: { color: Colors.textDark, fontSize: 13, textAlign: 'left' },
  dateTime:{ color: Colors.textDark, fontSize: 13, textAlign: 'left' },

  badge: {
    paddingHorizontal: 10,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontWeight: '700', fontSize: 12 },
});
