import { View, Text } from 'react-native';

export default function AppIndexScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-3xl font-bold text-black mb-2 text-center">
        React Native Boilerplate
      </Text>
      <Text className="text-lg text-gray-600 mb-10 text-center">
        by Asadbek Umarov
      </Text>
    </View>
  );
}
