# QR Code Generator 🎯

Modern, kullanıcı dostu ve özelleştirilebilir QR kod oluşturucu uygulaması. Next.js 14, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## ✨ Özellikler

### QR Kod Türleri
- 📝 **Text** - Düz metin QR kodları
- 🔗 **URL** - Web sitesi linkleri
- ✉️ **Email** - E-posta adresleri (konu ile)
- 📞 **Phone** - Telefon numaraları
- 💬 **SMS** - SMS mesajları
- 📶 **WiFi** - WiFi ağ bilgileri (WPA/WPA2/WEP)

### Özelleştirme Seçenekleri
- 🎨 Özelleştirilebilir renkler (QR kod ve arka plan)
- 📏 Boyut ayarı (128px - 512px)
- 🛡️ Hata düzeltme seviyeleri (L, M, Q, H)
- 📐 Kenar boşluğu ayarı
- 🌓 Dark mode desteği

### İndirme Seçenekleri
- 📥 PNG formatında indirme
- 📥 SVG formatında indirme (ölçeklenebilir)

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın veya indirin**
   ```bash
   cd qr-generator
   ```

2. **Bağımlılıkları kurun**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 📦 Production Build

```bash
# Build oluştur
npm run build

# Production sunucusunu başlat
npm start
```

## 🛠️ Teknolojiler

- **Next.js 14** - React framework (App Router)
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **qrcode** - QR kod oluşturma kütüphanesi (backend)
- **qrcode.react** - React QR kod bileşeni (frontend)

## 📁 Proje Yapısı

```
qr-generator/
├── app/
│   ├── api/
│   │   └── qrcode/
│   │       └── route.ts       # QR kod API endpoint
│   ├── globals.css            # Global stiller
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Ana sayfa
├── components/
│   ├── QRCodeGenerator.tsx    # Ana bileşen
│   ├── QRCodeOptions.tsx      # Özelleştirme seçenekleri
│   ├── QRCodePreview.tsx      # QR kod önizleme ve indirme
│   └── QRTypeSelector.tsx     # QR kod türü seçici
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Kullanım

1. **QR kod türünü seçin** - Üst kısımdaki ikonlardan birini seçin
2. **İçeriği girin** - Seçilen türe göre ilgili alanları doldurun
3. **Özelleştirin** - Renk, boyut ve diğer ayarları yapın
4. **Önizleyin** - Sağ tarafta canlı önizlemeyi görün
5. **İndirin** - PNG veya SVG formatında indirin

## 🌐 API Kullanımı

QR kod oluşturma için API endpoint'i:

```typescript
POST /api/qrcode

Body:
{
  text: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  marginSize?: number;
  includeMargin?: boolean;
  format?: 'png' | 'svg';
}
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen:
1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📧 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
