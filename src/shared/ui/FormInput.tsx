import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  /** React Hook Form control */
  control: Control<T>;
  /** Forma maydon nomi */
  name: Path<T>;
  /** Inputning yorlig'i (label) */
  label?: string;
  /** Placeholder matni */
  placeholder?: string;
}

/**
 * FormInput — React Hook Form Controller bilan integratsiya qilingan,
 * NativeWind bilan stillashtirilgan qayta ishlatiladigan input komponenti.
 * 
 * Xato mavjud bo'lganda qizil border va xato xabari ko'rsatiladi.
 * 
 * @example
 * ```tsx
 * <FormInput
 *   control={control}
 *   name="email"
 *   label="Email"
 *   placeholder="email@example.com"
 *   keyboardType="email-address"
 * />
 * ```
 */
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  ...rest
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="mb-4">
          {label && (
            <Text className="text-foreground text-sm font-medium mb-1.5">
              {label}
            </Text>
          )}
          <TextInput
            className={`bg-background text-foreground border rounded-xl px-4 py-3 text-base ${
              error
                ? 'border-red-500'
                : 'border-secondary'
            }`}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            {...rest}
          />
          {error && (
            <Text className="text-red-500 text-xs mt-1">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
