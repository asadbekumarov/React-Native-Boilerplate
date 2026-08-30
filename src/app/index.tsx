import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/shared/lib/validation/loginSchema';
import { FormInput } from '@/shared/ui/FormInput';
import { FormButton } from '@/shared/ui/FormButton';
import { toast } from '@/core/toast';

export default function HomeScreen() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Namuna: muvaffaqiyatli login toast
    toast.success('Muvaffaqiyatli!', {
      description: `${data.email} bilan kirish amalga oshirildi`,
    });
    console.log('Login data:', data);
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
            <Text className="text-foreground text-3xl font-bold mb-2">
              Xush kelibsiz 👋
            </Text>
            <Text className="text-secondary text-base">
              Hisobingizga kirish uchun ma'lumotlarni kiriting
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
