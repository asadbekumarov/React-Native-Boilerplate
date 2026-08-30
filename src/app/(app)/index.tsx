import { View, Text } from 'react-native';
import { useAuthStore } from '@/store/useAuthStore';
import { FormButton } from '@/shared/ui/FormButton';
import { useTranslation } from 'react-i18next';

export default function AppIndexScreen() {
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Text className="text-3xl font-bold text-foreground mb-2">
        {t('auth.welcome')}
      </Text>
      <Text className="text-lg text-secondary mb-10">Email: {user?.email}</Text>

      <FormButton
        title="Chiqish"
        onPress={logout}
        variant="outline"
        className="w-full"
      />
    </View>
  );
}
