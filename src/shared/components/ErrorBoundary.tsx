import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
          <Text className="text-2xl font-bold text-red-500 mb-4">Nimadir xato ketdi!</Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Kutilmagan texnik xatolik yuz berdi. Iltimos, ilovani qayta ishga tushiring.
          </Text>
          <TouchableOpacity 
            className="bg-blue-500 px-6 py-3 rounded-xl"
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text className="text-white font-semibold">Qayta urinish</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
