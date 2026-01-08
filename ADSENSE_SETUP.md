# 📢 Google AdSense Kurulum Rehberi

## Adım 1: Google AdSense Hesabı Oluşturma

1. **AdSense'e kaydolun**: https://www.google.com/adsense/
2. **Website URL'nizi ekleyin**: Vercel deploy sonrası aldığınız URL
3. **Hesap onayı bekleme süresi**: 1-2 hafta sürebilir
4. **Publisher ID'nizi alın**: `ca-pub-XXXXXXXXXXXXXX` formatında

## Adım 2: AdSense Ad Units (Reklam Birimleri) Oluşturma

1. AdSense Dashboard → **Ads** → **By ad unit**
2. **Create ad unit** butonuna tıklayın
3. Her sayfa bölümü için ayrı ad unit oluşturun:

### Önerilen Ad Units:

#### 1. Hero Banner (Landing Page Üst)
- **Name**: Hero Banner
- **Size**: Responsive (Auto)
- **Ad format**: Display ads
- Slot ID'yi not edin (örn: `1234567890`)

#### 2. Features Rectangle
- **Name**: Features Rectangle
- **Size**: 300x250 (Medium Rectangle)
- **Ad format**: Display ads
- Slot ID'yi not edin (örn: `1234567891`)

#### 3. Footer Banner
- **Name**: Footer Banner
- **Size**: Responsive (Auto)
- **Ad format**: Display ads
- Slot ID'yi not edin (örn: `1234567892`)

#### 4. Generator Top
- **Name**: Generator Top
- **Size**: 300x250 (Medium Rectangle)
- **Ad format**: Display ads
- Slot ID'yi not edin (örn: `1234567893`)

#### 5. Generator Bottom
- **Name**: Generator Bottom
- **Size**: 300x250 (Medium Rectangle)
- **Ad format**: Display ads
- Slot ID'yi not edin (örn: `1234567894`)

## Adım 3: Environment Variables Ayarlama

### Local Development (.env.local)

Proje kök dizininde `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_HERO=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_FEATURES=1234567891
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=1234567892
NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR=1234567893
NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR_BOTTOM=1234567894
```

### Vercel Deployment

1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. Her bir değişkeni ekleyin:
   - **Name**: `NEXT_PUBLIC_ADSENSE_ID`
   - **Value**: Publisher ID'niz
   - **Environment**: Production, Preview, Development (hepsini seçin)
   - **Save**

3. Tüm slot ID'leri için aynı işlemi tekrarlayın
4. Yeni bir deploy yapın (otomatik olabilir)

## Adım 4: AdSense Policy Uyumluluğu

### Önemli Kurallar:

✅ **Yapılması Gerekenler:**
- Reklam tıklamalarını manuel olarak artırmayın
- Reklamlara "Click here" gibi yönlendirici metin eklemeyin
- Reklamların yanına yanıltıcı etiketler koymayın
- Kullanıcı deneyimini bozmadan reklamları yerleştirin

❌ **Yasak Olanlar:**
- Reklamları içerikle karıştırmak
- Reklam tıklamaları için teşvik vermek
- Reklam bloklayıcıları engellemeye çalışmak
- Otomatik tıklama sistemleri kullanmak

### Sayfa İçeriği Gereksinimleri:

- ✅ Yeterli içerik olmalı (QR generator tool'umuz var ✅)
- ✅ Kullanışlı ve kaliteli içerik
- ✅ Kolay navigasyon
- ✅ Privacy Policy ve Terms of Service sayfaları (eklenmeli)

## Adım 5: Test ve Doğrulama

### Test Checklist:

- [ ] Tüm reklam birimleri görünüyor mu?
- [ ] Reklamlar responsive mi?
- [ ] Reklamlar içeriği bozmuyor mu?
- [ ] Mobile görünümde reklamlar düzgün mü?
- [ ] AdSense dashboard'da trafik görünüyor mu?

### Debug Mode:

Development modda reklamlar görünmeyebilir. Production deploy sonrası kontrol edin.

## Adım 6: Performans Optimizasyonu

### Önerilen Ayarlar:

1. **Lazy Loading**: Reklamlar zaten `afterInteractive` strategy ile yükleniyor ✅
2. **Ad Limit**: Her sayfada maksimum 3 reklam (şu an uygun)
3. **Placement**: Reklamlar içeriği bozmadan yerleştirildi ✅

## 📊 Reklam Yerleşimleri

### Landing Page (/)
- ✅ Hero section'dan sonra (Banner)
- ✅ Features section içinde (Rectangle)
- ✅ Footer'dan önce (Banner)

### Generator Page (/generator)
- ✅ Generator'dan önce (Rectangle)
- ✅ Generator'dan sonra (Rectangle)

## 💰 Gelir Optimizasyonu İpuçları

1. **Above the fold reklamlar**: Hero section'daki reklam önemli
2. **İçerik reklamları**: Features section'daki rectangle iyi performans gösterir
3. **Responsive reklamlar**: Mobil trafik için kritik
4. **Reklam çeşitliliği**: Farklı boyutlar ve formatlar deneyin

## 🐛 Sorun Giderme

### Reklamlar Görünmüyor

1. Publisher ID doğru mu kontrol edin
2. AdSense hesabınız onaylandı mı?
3. Environment variables doğru ayarlanmış mı?
4. Browser console'da hata var mı kontrol edin
5. Ad blocker devre dışı mı?

### Düşük Gelir

1. Reklam yerleşimlerini optimize edin
2. Daha fazla trafik çekmeye odaklanın
3. SEO iyileştirmeleri yapın
4. Reklam formatlarını deneyin (Auto ads vs Display ads)

## 📝 Notlar

- AdSense onay süreci 1-2 hafta sürebilir
- İlk gelirler birkaç hafta sonra görünmeye başlar
- CTR (Click-Through Rate) %1-2 normal kabul edilir
- RPM (Revenue Per Mille) sektöre göre değişir

## 🔗 Yararlı Linkler

- [AdSense Policy Center](https://support.google.com/adsense/answer/48182)
- [AdSense Help Center](https://support.google.com/adsense/)
- [Ad Placement Policy](https://support.google.com/adsense/answer/1346295)

---

**İyi kazançlar! 💰**
