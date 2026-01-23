import { View, Text, StyleSheet } from 'react-native';

const BG = '#F7F7F3';
const TEXT = '#222';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Placeholder screen for MVP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    color: TEXT,
    fontWeight: '600',
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
  },
});
