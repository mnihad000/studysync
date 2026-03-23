import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { supabase } from '../lib/supabase';

const BG = '#F7F7F3';
const TEXT = '#222';

export default function ProfileScreen({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  const handleSignUp = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setStatus('Email and password are required.');
      return;
    }

    setIsWorking(true);
    const { error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
    });
    setIsWorking(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus('Sign-up complete. You can now sign in.');
  };

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setStatus('Email and password are required.');
      return;
    }

    setIsWorking(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setIsWorking(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus('Signed in.');
    setPassword('');
  };

  const handleSignOut = async () => {
    setIsWorking(true);
    const { error } = await supabase.auth.signOut();
    setIsWorking(false);
    setStatus(error ? error.message : 'Signed out.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.subtitle}>Signed in as {user.email || user.id}</Text>
          <Text style={styles.userId}>User ID: {user.id}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={handleSignOut}
            style={[styles.primaryButton, isWorking && styles.buttonDisabled]}
            disabled={isWorking}
          >
            <Text style={styles.primaryButtonText}>Sign Out</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Sign in to sync your groups.</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#666"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#666"
          />
          <View style={styles.buttonRow}>
            <Pressable
              accessibilityRole="button"
              onPress={handleSignIn}
              style={[styles.primaryButton, isWorking && styles.buttonDisabled]}
              disabled={isWorking}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={handleSignUp}
              style={[styles.outlineButton, isWorking && styles.buttonDisabled]}
              disabled={isWorking}
            >
              <Text style={styles.outlineButtonText}>Sign Up</Text>
            </Pressable>
          </View>
        </>
      )}
      {status ? <Text style={styles.status}>{status}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    color: TEXT,
    fontWeight: '600',
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
  userId: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D9D9D3',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: TEXT,
    backgroundColor: '#fff',
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#6B7B6A',
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
    flex: 1,
    borderWidth: 1,
    borderColor: '#6B7B6A',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  outlineButtonText: {
    color: '#6B7B6A',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  status: {
    color: '#444',
    fontSize: 13,
    textAlign: 'center',
  },
});
