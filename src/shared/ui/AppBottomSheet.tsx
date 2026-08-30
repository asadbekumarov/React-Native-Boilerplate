import React, { useCallback, forwardRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface AppBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
}

export const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  ({ children, snapPoints = ['50%', '90%'] }, ref) => {
    // Backdrop configuration for dismiss on tap
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: 'gray' }}
        backgroundStyle={{ backgroundColor: 'white' }}
      >
        <View className="flex-1 p-4 bg-background">{children}</View>
      </BottomSheetModal>
    );
  }
);

AppBottomSheet.displayName = 'AppBottomSheet';
