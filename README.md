# 🚀 Universal React Native Enterprise Boilerplate

Ushbu universal React Native boilerplate (tayyor karkas) ga xush kelibsiz. U yirik (enterprise) miqyosidagi loyihalar uchun mo'ljallangan bo'lib, yuqori tezlik va barcha platformalarda (iOS, Android va Web) uzluksiz ishlash imkoniyatiga ega.

## 🧠 Falsafasi

Ushbu boilerplate'ning asosiy maqsadi — barcha zamonaviy asboblarni (tools) o'zida jamlagan, mutlaqo barqaror va ishlab chiqarish (production) darajasidagi tayyor poydevor taqdim etishdir. Bu orqali dasturchilar vaqtlarini uzoq va qiyin sozlamalarga emas, to'g'ridan-to'g'ri loyihaning biznes-mantiqi va funksiyalarini yozishga sarflashlari mumkin. U **universal** tarzda qurilgan, ya'ni Native (mobil) va Web platformalari orasidagi tafovutlarni (masalan, xavfsiz xotira (secure storage) dagi muammolarni) avtomatik hal qiladi.

## 🛠 Asosiy Texnologiyalar (Core Tech Stack)

- **Freymvork:** Expo (SDK 57) va fayllarga asoslangan routing uchun **Expo Router**.
- **Server Holatini Boshqarish (Data Fetching):** **TanStack Query (React Query)** — server holatini boshqarish, keshlash va avtomatik qayta so'rov yuborish uchun zamonaviy yechim. **Axios** asosidagi API klient bilan birgalikda ishlaydi.
- **Holatni boshqarish (State Management):** **Zustand** — yengil va tezkor global holatlar uchun (Theme, Auth va boshqalar).
- **Ma'lumotlarni saqlash (Storage):** **react-native-mmkv** (juda tezkor sinxron xotira). U **expo-secure-store** orqali shifrlanadi.
- **Stillashtirish (Styling):** **NativeWind v4** (React Native uchun Tailwind CSS) — barcha platformalarda bir xil ishlovchi dizayn tizimi.
- **Toast/Bildirishnomalar:** **sonner-native** — zamonaviy, animatsiyali toast tizimi. Reanimated asosida ishlaydi.
- **Carousel:** **react-native-reanimated-carousel** — Reanimated asosidagi yuqori samarali (performant) carousel komponenti.
- **Formalar:** **React Hook Form + Zod** — forma boshqaruvi va sxema asosidagi validatsiya tizimi.

---

## 📂 Papkalar Arxitekturasi

```text
src/
├── app/                    # Expo Router sahifalari va layoutlari (_layout.tsx va boshqalar)
├── core/                   # Loyihaning asosiy poydevori (Core qatlami)
│   ├── api/                # API klient va konfiguratsiya
│   │   ├── client.ts       # Axios instance + interceptorlar (Reauth logic)
│   │   ├── queryClient.ts  # TanStack Query konfiguratsiyasi
│   │   └── socket.ts       # WebSocket xizmati
│   ├── storage/            # Lokal xotira moduli (MMKV + SecureStore shifrlash bilan)
│   └── toast.ts            # Toast wrapper (sonner-native)
├── store/                  # Global holatni boshqarish (Zustand)
│   ├── index.ts            # Barrel export fayli
│   ├── useThemeStore.ts    # Theme holati
│   ├── useAuthStore.ts     # Autentifikatsiya holati
│   └── useAppStore.ts      # Ilova umumiy holati
├── shared/                 # Qayta ishlatiladigan resurslar
│   ├── ui/                 # UI komponentlar
│   │   ├── AppCarousel.tsx # Carousel wrapper (reanimated-carousel)
│   │   ├── FormInput.tsx   # React Hook Form input
│   │   └── FormButton.tsx  # Qayta ishlatiladigan tugma
│   ├── lib/                # Umumiy kutubxonalar
│   │   └── validation/     # Zod validatsiya sxemalari
│   │       └── loginSchema.ts
│   ├── components/         # Tizim komponentlari (ErrorBoundary, NoInternet)
│   ├── hooks/              # Qayta ishlatiladigan hook'lar
│   ├── types/              # TypeScript turlari
│   └── utils/              # Yordamchi funksiyalar
└── features/               # (Ixtiyoriy) Funksiyalar bo'yicha papkalar
```

- **`core`**: Dasturning butun ishlashiga mas'ul bo'lgan, asosan bir marta yoziladigan va kamdan-kam o'zgartiriladigan arxitektura qatlami (API klient, Xotira, Toast).
- **`store`**: Foydalanuvchining global holatlari (Theme, Auth, App) Zustand orqali boshqariladi.
- **`shared`**: Qayta ishlatiladigan UI komponentlar, hook'lar, validatsiya sxemalari va yordamchi funksiyalar.
- **`app`**: Ilovaning sahifalari va navigatsiya tizimi joylashgan papka.

---

## ✨ Tayyor Funksionalliklar

### 1. Multi-Theme Tizimi (NativeWind + Zustand)
`src/store/useThemeStore.ts` va `src/app/_layout.tsx` fayllarida joylashgan.
- `light`, `dark`, `system` va hatto maxsus mavzularni (masalan: `custom_green`, `custom_blue`) to'liq qo'llab-quvvatlaydi.
- **Expo Router** ning Navigation `ThemeProvider` va **NativeWind** ning CSS o'zgaruvchilari (CSS variables) bilan mukammal integratsiya qilingan.
- Foydalanuvchi tanlagan mavzu lokal xotirada saqlanib qoladi va ilova qayta yonganda avtomatik yuklanadi.

### 2. Shifrlangan MMKV Xotira Zanjiri
`src/core/storage/index.ts` faylida joylashgan.
- O'ta tezkor sinxron o'qish/yozish operatsiyalari uchun **MMKV** dan foydalanadi.
- Dastur birinchi marta ishga tushganda avtomatik ravishda shifrlash kaliti (encryption key) yaratadi va uni qurilmaning o'ta xavfsiz qismida (**Expo SecureStore**) saqlab qo'yadi. So'ng, ushbu kalit orqali butun MMKV xotirasini shifrlaydi.
- **Web uchun moslashtirilgan**: Agar ilova veb-brauzerda ochilsa, shifrlash avtomatik o'chiriladi, chunki veb-platformada MMKV shifrlashni to'g'ridan-to'g'ri qo'llab-quvvatlamaydi (shu orqali xatoliklarning oldi olingan).

### 3. Aqlli API Klient (TanStack Query + Axios Interceptor)
`src/core/api/client.ts` va `src/core/api/queryClient.ts` fayllarida joylashgan.

Eski **RTK Query** yondashuvi o'rniga endi **TanStack Query + Axios** kombinatsiyasi ishlatiladi:
- **Axios interceptor** barcha so'rovlarga avtomatik tarzda `Authorization: Bearer <token>` ni qo'shib yuboradi.
- **401 Unauthorized** xatosi kelganda, interceptor avtomatik ravishda `/auth/refresh` ga murojaat qilib yangi token oladi va so'rovni qayta yuboradi.
- **Bir vaqtda bir nechta so'rov** 401 xatosiga uchrasa, faqat bitta refresh so'rovi yuboriladi va boshqa so'rovlar navbatga qo'yiladi.
- Refresh muvaffaqiyatsiz bo'lganda, **`useAuthStore.getState().logout()`** chaqiriladi — bu ham MMKV xotirasini, ham Zustand holatini bir vaqtda tozalaydi.

```typescript
// TanStack Query bilan ishlatish namunasi:
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/core/api/client';

// Ma'lumot olish
export const useUsers = () => useQuery({
  queryKey: ['users'],
  queryFn: () => apiClient.get('/users').then(res => res.data),
});

// Ma'lumot yuborish
export const useCreateUser = () => useMutation({
  mutationFn: (newUser: CreateUserDto) => apiClient.post('/users', newUser),
});
```

### 4. 🔔 Zamonaviy Toast Tizimi (sonner-native)
`src/core/toast.ts` wrapper fayli orqali ishlatiladi.

**sonner-native** — React Native uchun zamonaviy, animatsiyali toast kutubxonasi. U `react-native-reanimated` asosida ishlaydi va silliq animatsiyalarni ta'minlaydi.

- NativeWind theme'imiz (light/dark/custom) ga avtomatik moslashadi
- Wrapper pattern orqali kelajakda kutubxona almashtirilsa faqat bitta faylni o'zgartirish kifoya

```typescript
// Istalgan komponentda ishlatish:
import { toast } from '@/core/toast';

// Oddiy toast
toast('Xabar yuborildi!');

// Muvaffaqiyat toast
toast.success('Saqlandi!', { description: 'Ma\'lumotlar muvaffaqiyatli saqlandi' });

// Xato toast
toast.error('Xatolik!', { description: 'Internet aloqasini tekshiring' });
```

### 5. 🎠 Carousel Komponenti (react-native-reanimated-carousel)
`src/shared/ui/AppCarousel.tsx` faylida joylashgan.

TypeScript generic wrapper orqali istalgan ma'lumot massivi bilan ishlaydi. Ichki pagination dots NativeWind bilan stillashtirilgan.

```tsx
import { AppCarousel } from '@/shared/ui/AppCarousel';

const images = [
  { id: 1, uri: 'https://example.com/1.jpg' },
  { id: 2, uri: 'https://example.com/2.jpg' },
];

<AppCarousel
  data={images}
  renderItem={({ item }) => (
    <Image source={{ uri: item.uri }} style={{ flex: 1 }} />
  )}
  autoPlay
  height={250}
/>
```

### 6. 📝 Forma Validatsiyasi (React Hook Form + Zod)
`src/shared/ui/FormInput.tsx`, `src/shared/ui/FormButton.tsx` va `src/shared/lib/validation/` fayllarida joylashgan.

**React Hook Form** forma holatini boshqaradi, **Zod** esa sxema asosidagi validatsiyani ta'minlaydi. Qayta ishlatiladigan `FormInput` va `FormButton` komponentlari NativeWind bilan stillashtirilgan.

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/shared/lib/validation/loginSchema';
import { FormInput } from '@/shared/ui/FormInput';
import { FormButton } from '@/shared/ui/FormButton';

const { control, handleSubmit } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});

<FormInput control={control} name="email" label="Email" placeholder="email@example.com" />
<FormInput control={control} name="password" label="Parol" secureTextEntry />
<FormButton title="Kirish" onPress={handleSubmit(onSubmit)} />
```

---

## 🚀 Tezkor Ishga Tushirish (Quick Start)

Loyihani kompyuteringizda ishga tushirish uchun quyidagi qadamlarni bajaring.

### 1. Paketlarni O'rnatish
```bash
npm install
# yoki
yarn install
```

### 2. Dasturni Ishga Tushirish (Keshni tozalab)
Ushbu loyihada kompleks native modullar va NativeWind v4 ishlatilgani sababli, serverni doimo keshni tozalab ishga tushirish tavsiya etiladi.
```bash
npx expo start --clear
```

### 3. Platformalar
- iOS Simulator'ni ochish uchun klaviaturada `i` tugmasini bosing.
- Android Emulator'ni ochish uchun `a` tugmasini bosing.
- Veb brauzerda ochish uchun `w` tugmasini bosing.

Omad! 🎉
