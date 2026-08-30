## ✨ Xususiyatlar (Features)

✅ **Expo Router** orqali faylga asoslangan (file-based) routing ✅ **Zustand &
MMKV** bilan juda tezkor State va Storage boshqaruvi ✅ **JWT Auth Flow** — 401
xatoliklarni ushlab avtomatik token refresh qilish ✅ **TanStack Query** (React
Query) — ma'lumotlarni kesh qilish va sinxronlash ✅ **Kengaytirilgan Theme
Tizimi** — Light, Dark, System va Custom mavzular (Tailwind CSS / NativeWind) ✅
**Ko'p Tillilik (i18n)** — O'zbek, Rus va Ingliz tillarini qo'llab-quvvatlash ✅
**UI Komponentlar** — tayyor Bottom Sheet, Carousel, Form elementlar ✅
**Validatsiya** — React Hook Form + Zod orqali formalarni oson boshqarish ✅
**Bildirishnomalar** — `sonner-native` orqali zamonaviy toast xabarlar ✅ **Kod
Sifati** — ESLint, Prettier va Husky pre-commit hook'lari o'rnatilgan ✅
**Reactotron** — holat, API va xatoliklarni qulay debugging qilish uchun ulangan

---

## 🛠 Texnologiyalar Stack'i

| Kategoriya                    | Texnologiya             | Versiya         | Nima uchun ishlatilgan?                                                              |
| :---------------------------- | :---------------------- | :-------------- | :----------------------------------------------------------------------------------- |
| **Freymvork va Routing**      | Expo, Expo Router       | ~57.0.0         | Faylga asoslangan kuchli marshrutizatsiya va platforma sozlamalari                   |
| **State Management**          | Zustand                 | ^5.0.15         | Global holatni (auth, theme) oson va tezkor boshqarish uchun                         |
| **Ma'lumotlar bilan ishlash** | TanStack Query, Axios   | ^5.102.8        | API so'rovlarini kesh qilish, loading state'larni ushlash va interceptorlar uchun    |
| **Styling**                   | NativeWind              | ^4.2.6          | Tailwind CSS klasslari orqali UI elementlarni osongina bezash uchun                  |
| **Formalar va Validatsiya**   | React Hook Form, Zod    | ^7.87.0, ^4.5.4 | Ishonchli, qat'iy tipli (strongly typed) va performansli formalar yaratish uchun     |
| **Saqlash (Storage)**         | React Native MMKV       | ^4.3.2          | Async Storage'ga qaraganda ancha tezroq lokal ma'lumotlar saqlash tizimi             |
| **Bildirishnomalar**          | Sonner Native           | ^0.27.0         | Foydalanuvchiga muvaffaqiyat yoki xatolik haqida zamonaviy toast xabarlar ko'rsatish |
| **Lokalizatsiya**             | i18next, react-i18next  | ^26.4.0         | Ilovani ko'p tilli qilish (uz, en, ru) va oson tarjima qilish                        |
| **Kod Sifati & Debugging**    | ESLint, Prettier, Husky | Varies          | Bir xil kod uslubini saqlash, Git commit'dan oldin xatoliklarni tekshirish           |

---

## 📂 Loyiha Strukturasi

```text
src/
├── app/          # Barcha sahifalar (routes) va layout'lar (Expo Router)
│   ├── (auth)/   # Avtorizatsiya sahifalari (Login, Register va h.k.)
│   ├── (app)/    # Asosiy himoyalangan sahifalar
│   └── _layout.tsx # Asosiy Root provider'lar
├── core/         # Loyihaning asosiy konfiguratsiyalari
│   ├── api/      # Axios client, interceptorlar va React Query sozlamalari
│   ├── i18n/     # Tarjimalar va i18next konfiguratsiyasi
│   ├── storage/  # MMKV wrapper
│   └── reactotron.ts # Reactotron konfiguratsiyasi
├── features/     # Har bir modul uchun alohida funksionalliklar (masalan, "profile", "feed")
├── shared/       # Qayta ishlatiladigan umumiy kodlar
│   ├── components/ # Hamma joyda ishlatiladigan umumiy komponentlar
│   ├── ui/       # Asosiy UI elementlar (Button, Input, BottomSheet)
│   ├── lib/      # Utility funksiyalar va validatsiya sxemalari
│   ├── hooks/    # Custom React hook'lar
│   └── types/    # Umumiy TypeScript tiplari
└── store/        # Zustand holat boshqaruvi
    ├── useAuthStore.ts
    ├── useThemeStore.ts
    └── useAppStore.ts
```

### O'rnatish qadamlari

1. Loyihani yuklab oling:

```bash
git clone <repository_url>
cd reactNative
```

2. Paketlarni o'rnating:

```bash
npm install
```

3. Environment faylini sozlang (`.env` yarating):

```bash
# .env
EXPO_PUBLIC_API_URL=https://stpos.uz
```

4. Ilovani ishga tushiring:

```bash
npm run start
# yoki to'g'ridan-to'g'ri:
npm run android   # Android emulyatori uchun
npm run ios       # iOS simulyatori uchun
```

---

## 🔑 Auth Flow

Loyihada xavfsiz avtorizatsiya va avtomatik token refresh jarayoni yo'lga
qo'yilgan.

**Qanday ishlaydi?**

1. Ilova ochilganda `src/app/_layout.tsx` dagi `checkAuth()` funksiyasi ishga
   tushib, MMKV'dan tokenni tekshiradi.
2. Agar foydalanuvchi tizimga kirmagan bo'lsa va himoyalangan (protected)
   sahifaga o'tishga urinsa, u `(auth)` guruhiga yo'naltiriladi.
3. Muvaffaqiyatli login qilingandan so'ng `useAuthStore` holatni yangilaydi va
   `(app)` sahifasiga o'tkazadi.
4. Agar biron-bir API so'rovi `401 Unauthorized` xatosini qaytarsa,
   `src/core/api/client.ts` dagi interceptor avtomatik ravishda `/auth/refresh`
   manziliga `refresh_token` ni yuborib tokenni yangilaydi.
5. Yangilash o'xshamasa, foydalanuvchi tizimdan to'liq chiqariladi (`logout()`).

---

## 🎨 Theme Tizimi

Ilovada Light, Dark va qo'shimcha Custom temalar mavjud bo'lib, NativeWind va
Zustand orqali boshqariladi. Mavjud temalar: `light`, `dark`, `system`,
`custom_green`, `custom_blue`.

**Qanday almashtiriladi?**

```tsx
import { useThemeStore } from '@/store/useThemeStore';

export const SettingsScreen = () => {
  const { theme, setTheme } = useThemeStore();

  return <Button onPress={() => setTheme('dark')}>Dark rejimga o'tish</Button>;
};
```

---

## 📡 API va Ma'lumotlar bilan ishlash

Biz Axios va TanStack Query'dan birgalikda foydalanamiz. Axios token qo'shish va
yangilashni o'z bo'yniga oladi, React Query esa kesh qilish va loading
holatlarini nazorat qiladi.

```tsx
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/core/api/client';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      // apiClient avtomatik ravishda Bearer token qo'shadi
      const response = await apiClient.get('/user/profile');
      return response.data;
    },
  });
};
```

---

## 🌍 Ko'p Tillilik (i18n)

Ilova standart holatda `uz` (O'zbek), `en` (Ingliz) va `ru` (Rus) tillarini
qo'llab-quvvatlaydi. Sozlamalar `src/core/i18n/index.ts` da joylashgan.
Tanlangan til MMKV orqali saqlanib qolinadi.

**Ishlatish namunasi:**

```tsx
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native';
import { StorageWrapper } from '@/core/storage';

export const Welcome = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    StorageWrapper.setItem('language', lang);
  };

  return (
    <>
      <Text>{t('welcome_message')}</Text>
      <Button title="RU" onPress={() => changeLanguage('ru')} />
    </>
  );
};
```

---

## 🧩 Qayta Ishlatiladigan Komponentlar

Loyiha tayyor UI qismlariga boy. Barcha tayyor komponentlar `src/shared/ui/`
papkasida.

**AppBottomSheet**

```tsx
import { useRef } from 'react';
import { AppBottomSheet } from '@/shared/ui/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const bottomSheetRef = useRef<BottomSheetModal>(null);
// Ochish: bottomSheetRef.current?.present();

<AppBottomSheet ref={bottomSheetRef} snapPoints={['50%', '90%']}>
  <Text>Bu Bottom Sheet ichidagi ma'lumot</Text>
</AppBottomSheet>;
```

**Toast (Sonner Native)**

```tsx
import { toast } from 'sonner-native';

// Muvaffaqiyatli xabar
toast.success('Muvaffaqiyatli saqlandi!');
// Xatolik xabari
toast.error('Xatolik yuz berdi');
```

**FormInput va FormButton**

```tsx
import { FormInput } from '@/shared/ui/FormInput';
import { FormButton } from '@/shared/ui/FormButton';
import { useForm } from 'react-hook-form';

const { control, handleSubmit } = useForm();

<FormInput
  control={control}
  name="email"
  label="Email manzil"
  placeholder="Misol: admin@mail.com"
/>
<FormButton title="Jo'natish" onPress={handleSubmit(onSubmit)} />
```

---

## 🧪 Kod Sifati

Loyihada xatoliklarni oldini olish uchun Prettier va ESLint o'rnatilgan. Husky
pre-commit hook orqali kommit qilishdan oldin kodlar tekshiriladi.

- **Lint tekshiruvi:**
  ```bash
  npm run lint
  ```
- **Kodlarni formatlash:**
  ```bash
  npm run format
  ```

---

## 📱 Platformalar

Ushbu shablon asosan quyidagilarni qo'llab-quvvatlaydi:

- **Android:** To'liq moslashtirilgan (`npm run android`)
- **iOS:** To'liq moslashtirilgan (`npm run ios`)
- **Web:** Expo Web orqali qo'llab-quvvatlanadi (`npm run web`), biroq ba'zi
  native kutubxonalar qo'shimcha moslashtirish talab qilishi mumkin.

---
