import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  LoginFormData,
} from '@/shared/lib/validation/loginSchema';
import { FormInput } from '@/shared/ui/FormInput';
import { FormButton } from '@/shared/ui/FormButton';
import { toast } from '@/core/toast';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginScreen() {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Fake login logic
    setTimeout(() => {
      setUser({ id: '1', name: 'Test User', email: data.email });
      toast.success('Muvaffaqiyatli!', {
        description: `${data.email} bilan kirish amalga oshirildi`,
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 bg-background">
          <View className="mb-8">
            <Text className="text-4xl font-bold text-foreground mb-2">
              Kirish
            </Text>
            <Text className="text-lg text-secondary">
              Tizimga kirish uchun ma&apos;lumotlarni kiriting
            </Text>
          </View>

          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="email@example.com"
            keyboardType="email-address"
            autoComplete="email"
          />

          <FormInput
            control={control}
            name="password"
            label="Parol"
            placeholder="Parolingizni kiriting"
            secureTextEntry
            autoComplete="password"
          />

          <View className="mt-4">
            <FormButton
              title="Kirish"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
            />
          </View>

          <View className="mt-6 items-center">
            <Text className="text-secondary text-sm">
              React Hook Form + Zod validatsiya namunasi
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
