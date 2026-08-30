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
  registerSchema,
  RegisterFormData,
} from '@/shared/lib/validation/registerSchema';
import { FormInput } from '@/shared/ui/FormInput';
import { FormButton } from '@/shared/ui/FormButton';
import { toast } from '@/core/toast';
import { useAuthStore } from '@/store/useAuthStore';
import { Link } from 'expo-router';

export default function RegisterScreen() {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setTimeout(() => {
      setUser({ id: '2', name: data.name, email: data.email });
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerClassName="flex-grow justify-center p-6">
        <View className="mb-10">
          <Text className="text-4xl font-bold text-foreground mb-2">
            Ro&apos;yxatdan O&apos;tish
          </Text>
          <Text className="text-lg text-secondary">Yangi hisob yarating</Text>
        </View>

        <View className="gap-5">
          <FormInput
            control={control}
            name="name"
            label="Ism"
            placeholder="Ismingizni kiriting"
          />
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="Emailni kiriting"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput
            control={control}
            name="password"
            label="Parol"
            placeholder="Parolni kiriting"
            secureTextEntry
          />
          <FormButton
            title="Ro'yxatdan O'tish"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            className="mt-2"
          />

          <Link href={'/(auth)/login' as any} asChild>
            <FormButton
              title="Hisobingiz bormi? Kirish"
              variant="outline"
              className="mt-2"
            />
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
