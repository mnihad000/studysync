import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';

const MUTED_ACCENT = '#6B7B6A';
const BG = '#F7F7F3';
const TEXT = '#222';
const BORDER = '#D9D9D3';

const initialGroups = [
  {
    id: 'g1',
    name: 'Calculus Crew',
    dailyMinutes: 45,
    streakDays: 12,
    todayMinutes: 30,
    membersMet: 3,
    membersTotal: 5,
  },
  {
    id: 'g2',
    name: 'Morning Reading',
    dailyMinutes: 30,
    streakDays: 7,
    todayMinutes: 15,
    membersMet: 2,
    membersTotal: 3,
  },
  {
    id: 'g3',
    name: 'Chem Lab Prep',
    dailyMinutes: 60,
    streakDays: 21,
    todayMinutes: 60,
    membersMet: 4,
    membersTotal: 4,
  },
];

export default function HomeScreen({ navigation }) {
  const [groups, setGroups] = useState(initialGroups);
  const [groupName, setGroupName] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [createError, setCreateError] = useState('');
  const [joinError, setJoinError] = useState('');

  const handleCreateGroup = () => {
    const name = groupName.trim();
    const minutesNumber = Number(dailyMinutes);
    if (!name) {
      setCreateError('Enter a group name.');
      return;
    }
    if (!Number.isFinite(minutesNumber) || minutesNumber <= 0) {
      setCreateError('Enter a valid number of minutes.');
      return;
    }

    const newGroup = {
      id: `g${Date.now()}`,
      name,
      dailyMinutes: minutesNumber,
      streakDays: 0,
      todayMinutes: 0,
      membersMet: 1,
      membersTotal: 1,
    };

    setGroups((prev) => [newGroup, ...prev]);
    setGroupName('');
    setDailyMinutes('');
    setCreateError('');
  };

  const handleJoinGroup = () => {
    const code = inviteCode.trim();
    if (!code) {
      setJoinError('Enter an invite code.');
      return;
    }

    const joinedGroup = {
      id: `j${Date.now()}`,
      name: `Joined Group (${code.toUpperCase()})`,
      dailyMinutes: 30,
      streakDays: 0,
      todayMinutes: 0,
      membersMet: 0,
      membersTotal: 1,
    };

    setGroups((prev) => [joinedGroup, ...prev]);
    setInviteCode('');
    setJoinError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.subtitle}>Groups and daily progress</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}
          >
            <Text style={styles.profileButtonText}>Profile</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Groups</Text>
          {groups.map((group) => {
            const progress = Math.min(
              100,
              Math.round((group.todayMinutes / group.dailyMinutes) * 100)
            );

            return (
              <View key={group.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{group.name}</Text>
                  <Text style={styles.streak}>
                    {group.streakDays} day streak
                  </Text>
                </View>
                <Text style={styles.cardMeta}>
                  Daily goal: {group.dailyMinutes} min
                </Text>
                <View style={styles.progressRow}>
                  <Text style={styles.cardMeta}>
                    Today: {group.todayMinutes}/{group.dailyMinutes} min
                  </Text>
                  <Text style={styles.cardMeta}>{progress}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[styles.progressFill, { width: `${progress}%` }]}
                  />
                </View>
                <Text style={styles.memberStatus}>
                  Members: {group.membersMet}/{group.membersTotal} met today
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create a Group</Text>
          <TextInput
            placeholder="Group name"
            placeholderTextColor="#666"
            value={groupName}
            onChangeText={setGroupName}
            style={styles.input}
          />
          <TextInput
            placeholder="Daily minutes"
            placeholderTextColor="#666"
            value={dailyMinutes}
            onChangeText={setDailyMinutes}
            keyboardType="number-pad"
            style={styles.input}
          />
          <Pressable
            accessibilityRole="button"
            onPress={handleCreateGroup}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Create Group</Text>
          </Pressable>
          {createError ? (
            <Text style={styles.errorText}>{createError}</Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Join a Group</Text>
          <TextInput
            placeholder="Invite code"
            placeholderTextColor="#666"
            value={inviteCode}
            onChangeText={setInviteCode}
            autoCapitalize="characters"
            style={styles.input}
          />
          <Pressable
            accessibilityRole="button"
            onPress={handleJoinGroup}
            style={styles.outlineButton}
          >
            <Text style={styles.outlineButtonText}>Join Group</Text>
          </Pressable>
          {joinError ? (
            <Text style={styles.errorText}>{joinError}</Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    color: TEXT,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 4,
    color: '#555',
    fontSize: 14,
  },
  profileButton: {
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  profileButtonText: {
    color: TEXT,
    fontSize: 14,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: TEXT,
    fontWeight: '600',
  },
  card: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#fff',
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: TEXT,
    fontWeight: '600',
  },
  streak: {
    fontSize: 13,
    color: MUTED_ACCENT,
    fontWeight: '600',
  },
  cardMeta: {
    color: '#444',
    fontSize: 13,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#EFEFE9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: MUTED_ACCENT,
  },
  memberStatus: {
    color: '#555',
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: TEXT,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: MUTED_ACCENT,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: MUTED_ACCENT,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  outlineButtonText: {
    color: MUTED_ACCENT,
    fontWeight: '600',
    fontSize: 14,
  },
  errorText: {
    color: '#8A2D2D',
    fontSize: 12,
  },
});
