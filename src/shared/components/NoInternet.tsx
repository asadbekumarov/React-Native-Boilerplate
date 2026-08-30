import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const NoInternet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnected === false) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <Text className="text-xl font-bold text-red-500 mb-2">Internet yo'q</Text>
        <Text className="text-gray-600 dark:text-gray-400 text-center px-4">
          Iltimos, internet aloqasini tekshiring va qayta urinib ko'ring.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};
