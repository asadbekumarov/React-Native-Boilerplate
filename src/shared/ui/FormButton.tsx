import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';

type Variant = 'primary' | 'secondary' | 'outline';

interface FormButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  /** Tugma matni */
  title: string;
  /** Yuklanish holati */
  loading?: boolean;
  /** Tugma varianti */
  variant?: Variant;
}

const variantStyles: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: 'bg-primary',
    text: 'text-white',
  },
  secondary: {
    container: 'bg-secondary',
    text: 'text-white',
  },
  outline: {
    container: 'bg-transparent border-2 border-primary',
    text: 'text-primary',
  },
};

/**
 * FormButton — NativeWind bilan stillashtirilgan qayta ishlatiladigan tugma komponenti.
 * 
 * `loading` va `disabled` holatlarini qo'llab-quvvatlaydi.
 * 3 ta variant mavjud: primary, secondary, outline.
 * 
 * @example
 * ```tsx
 * <FormButton
 *   title="Kirish"
 *   onPress={handleSubmit(onSubmit)}
 *   loading={isLoading}
 * />
 * ```
 */
export function FormButton({
  title,
  loading = false,
  disabled = false,
  variant = 'primary',
  ...rest
}: FormButtonProps) {
  const styles = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`rounded-xl px-6 py-3.5 items-center justify-center ${styles.container} ${
        isDisabled ? 'opacity-50' : 'active:opacity-80'
      }`}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? undefined : '#FFFFFF'}
          size="small"
        />
      ) : (
        <Text className={`text-base font-semibold ${styles.text}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
