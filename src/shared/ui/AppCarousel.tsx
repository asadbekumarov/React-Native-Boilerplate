import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Carousel } from 'react-native-reanimated-carousel';

interface AppCarouselProps<T> {
  /** Ma'lumotlar massivi */
  data: T[];
  /** Har bir element uchun render funksiya */
  renderItem: (info: { item: T; index: number }) => React.ReactElement;
  /** Carousel element kengligi (default: ekran kengligi) */
  itemSize?: number;
  /** Carousel balandligi */
  height?: number;
  /** Cheksiz aylanish (default: true) */
  loop?: boolean;
  /** Avtomatik o'ynash (default: false) */
  autoPlay?: boolean;
  /** Avtomatik o'ynash orasidagi vaqt ms (default: 3000) */
  autoPlayInterval?: number;
  /** Element o'zgarganda chaqiriladigan callback */
  onSnapToItem?: (index: number) => void;
  /** Pagination dots ko'rsatish (default: true) */
  showPagination?: boolean;
}

/**
 * AppCarousel — react-native-reanimated-carousel v5 asosidagi universal carousel wrapper.
 * 
 * TypeScript generic type bilan istalgan data massivi uchun ishlaydi.
 * 
 * @example
 * ```tsx
 * <AppCarousel
 *   data={images}
 *   renderItem={({ item }) => <Image source={item.uri} />}
 *   autoPlay
 *   height={200}
 * />
 * ```
 */
export function AppCarousel<T>({
  data,
  renderItem,
  itemSize: propItemSize,
  height = 200,
  loop = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  onSnapToItem,
  showPagination = true,
}: AppCarouselProps<T>) {
  const { width: screenWidth } = useWindowDimensions();
  const carouselItemSize = propItemSize ?? screenWidth;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSnapToItem = (index: number) => {
    setActiveIndex(index);
    onSnapToItem?.(index);
  };

  return (
    <View>
      <Carousel
        style={{ height }}
        itemSize={carouselItemSize}
        data={data}
        renderItem={renderItem}
        loop={loop}
        autoplay={autoPlay}
        autoplayInterval={autoPlayInterval}
        onSnapToItem={handleSnapToItem}
      />
      {showPagination && data.length > 1 && (
        <View className="flex-row justify-center items-center mt-2 gap-1.5">
          {data.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full ${
                index === activeIndex
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-secondary'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
