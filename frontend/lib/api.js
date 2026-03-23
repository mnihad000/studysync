import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { supabase } from './supabase';

function getDefaultApiBaseUrl() {
  const hostUri = Constants.expoConfig?.hostUri ?? '';
  const host = hostUri.split(':')[0];

  if (host && host !== 'localhost' && host !== '127.0.0.1') {
    return `http://${host}:8080`;
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8080';
  }

  return 'http://127.0.0.1:8080';
}

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || getDefaultApiBaseUrl();

async function parseError(response) {
  try {
    const payload = await response.json();
    if (payload?.message) {
      return payload.message;
    }
  } catch (_error) {
    // no-op: fallback below
  }
  return `Request failed (${response.status})`;
}

export async function apiRequest(path, options = {}) {
  const { accessToken, ...requestOptions } = options;
  const sessionResult = await supabase.auth.getSession();
  const sessionToken = sessionResult?.data?.session?.access_token ?? null;
  const token = accessToken || sessionToken;

  const headers = {
    'Content-Type': 'application/json',
    ...(requestOptions.headers || {}),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...requestOptions,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
