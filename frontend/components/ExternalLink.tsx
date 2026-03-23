import { openBrowserAsync } from 'expo-web-browser';
import { type ReactNode } from 'react';
import { Linking, Platform, Pressable, StyleProp, TextStyle } from 'react-native';

type Props = {
  href: string;
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
};

export function ExternalLink({ href, children, style }: Props) {
  return (
    <Pressable
      onPress={async () => {
        if (Platform.OS === 'web') {
          await Linking.openURL(href);
          return;
        }
        await openBrowserAsync(href);
      }}
      style={style}
    >
      {children}
    </Pressable>
  );
}
