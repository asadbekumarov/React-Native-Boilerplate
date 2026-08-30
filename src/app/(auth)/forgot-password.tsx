import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function ForgotPasswordScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Text className="text-2xl font-bold text-foreground mb-4">
        Parolni Tiklash
      </Text>
      <Link href={'/(auth)/login' as any} className="text-primary text-lg">
        Orqaga qaytish
      </Link>
    </View>
  );
}
