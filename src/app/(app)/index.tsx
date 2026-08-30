import { View, Text } from 'react-native';
import { useAuthStore } from '@/store/useAuthStore';
import { FormButton } from '@/shared/ui/FormButton';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function AppIndexScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Text className="text-3xl font-bold text-foreground mb-2 text-center">
        React Native Boilerplate
      </Text>
      <Text className="text-lg text-secondary mb-10 text-center">
        by Asadbek Umarov
      </Text>

      {user ? (
        <FormButton
          title="Chiqish"
          onPress={logout}
          variant="outline"
          className="w-full"
        />
      ) : (
        <FormButton
          title="Tizimga Kirish"
          onPress={() => router.push('/(auth)/login')}
          className="w-full"
        />
      )}
    </View>
  );
}
