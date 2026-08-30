# 🚀 Universal React Native Enterprise Boilerplate

Ushbu universal React Native boilerplate (tayyor karkas) ga xush kelibsiz. U yirik (enterprise) miqyosidagi loyihalar uchun mo'ljallangan bo'lib, yuqori tezlik va barcha platformalarda (iOS, Android va Web) uzluksiz ishlash imkoniyatiga ega.

## 🧠 Falsafasi

Ushbu boilerplate'ning asosiy maqsadi — barcha zamonaviy asboblarni (tools) o'zida jamlagan, mutlaqo barqaror va ishlab chiqarish (production) darajasidagi tayyor poydevor taqdim etishdir. Bu orqali dasturchilar vaqtlarini uzoq va qiyin sozlamalarga emas, to'g'ridan-to'g'ri loyihaning biznes-mantiqi va funksiyalarini yozishga sarflashlari mumkin. U **universal** tarzda qurilgan, ya'ni Native (mobil) va Web platformalari orasidagi tafovutlarni (masalan, xavfsiz xotira (secure storage) dagi muammolarni) avtomatik hal qiladi.

## 🛠 Asosiy Texnologiyalar (Core Tech Stack)

- **Freymvork:** Expo (SDK 56) va fayllarga asoslangan routing uchun **Expo Router**.
- **Ma'lumotlar bilan ishlash (Data Fetching):** **RTK Query (Redux Toolkit)** (Kesh va API so'rovlarini boshqarish uchun professional vosita).
- **Holatni boshqarish (State Management):** **Zustand** (yengil global holatlar uchun) va **Redux Toolkit** (API va keng miqyosli holatlar uchun).
- **Ma'lumotlarni saqlash (Storage):** **react-native-mmkv** (juda tezkor sinxron xotira). U **expo-secure-store** orqali shifrlanadi.
- **Stillashtirish (Styling):** **NativeWind v4** (React Native uchun Tailwind CSS) — barcha platformalarda bir xil ishlovchi dizayn tizimi.

---

## 📂 Papkalar Arxitekturasi

```text
src/
├── app/               # Expo Router sahifalari va layoutlari (_layout.tsx va boshqalar)
├── core/              # Loyihaning asosiy poydevori (Core qatlami)
│   └── storage/       # Lokal xotira moduli (MMKV + SecureStore shifrlash bilan)
├── store/             # Global holatni boshqarish (Zustand va Redux Store)
│   ├── api.ts         # RTK Query asosi va interceptorlar (Reauth logic)
│   ├── index.ts       # Redux store konfiguratsiyasi
│   └── useThemeStore.ts # Zustand asosidagi theme holati
└── features/          # (Ixtiyoriy) Funksiyalar bo'yicha papkalar (alohida komponent va hooklar)
```

- **`core`**: Dasturning butun ishlashiga mas'ul bo'lgan, asosan bir marta yoziladigan va kamdan-kam o'zgartiriladigan arxitektura qatlami (Xotira).
- **`store`**: Foydalanuvchining global holatlari (Theme, User data) va RTK Query API kesh tizimi saqlanadi.
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

### 3. Aqlli API Klient (RTK Query Refresh Token Mantiqi)
`src/store/api.ts` faylida joylashgan.
- Kesh va API so'rovlarni avtomatik muvofiqlashtirish uchun **RTK Query** dan foydalanadi.
- Barcha so'rovlarga avtomatik tarzda `Authorization: Bearer <token>` ni qo'shib yuboradi.
- **Global `baseQueryWithReauth` Interceptor**: Agar serverdan `401 Unauthorized` (Token eskirgan) xatosi kelsa, klient darhol ushbu so'rovni to'xtatib turadi, `/auth/refresh` manziliga murojaat qilib yangi token oladi, uni MMKV xotirasiga saqlaydi va uzilib qolgan eski so'rovni foydalanuvchiga bildirmasdan qayta amalga oshiradi.

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

Oмад! 🎉
