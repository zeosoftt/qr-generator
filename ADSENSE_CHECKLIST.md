# ✅ AdSense Kurulum Kontrol Listesi

## 📋 Mevcut Durum

✅ **Publisher ID**: `ca-pub-5570650174796895` (Ayarlı)

⚠️ **Slot ID'ler**: Şu an placeholder değerler kullanılıyor (1234567890, vb.)

## 🔧 Yapılması Gerekenler

### 1. AdSense Dashboard'dan Slot ID'leri Alın

1. **AdSense Dashboard'a gidin**: https://www.google.com/adsense/
2. **Ads** → **By ad unit** bölümüne gidin
3. Her reklam birimi için ayrı ad unit oluşturun:

#### Ad Unit Oluşturma:

**a) Hero Banner**
- Name: `Hero Banner`
- Size: `Responsive` (Auto)
- Format: `Display ads`
- Slot ID'yi kopyalayın → `.env.local` dosyasındaki `NEXT_PUBLIC_ADSENSE_SLOT_HERO` değerini güncelleyin

**b) Features Rectangle**
- Name: `Features Rectangle`
- Size: `300x250` (Medium Rectangle)
- Format: `Display ads`
- Slot ID'yi kopyalayın → `NEXT_PUBLIC_ADSENSE_SLOT_FEATURES`

**c) Footer Banner**
- Name: `Footer Banner`
- Size: `Responsive` (Auto)
- Format: `Display ads`
- Slot ID'yi kopyalayın → `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER`

**d) Generator Top**
- Name: `Generator Top`
- Size: `300x250` (Medium Rectangle)
- Format: `Display ads`
- Slot ID'yi kopyalayın → `NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR`

**e) Generator Bottom**
- Name: `Generator Bottom`
- Size: `300x250` (Medium Rectangle)
- Format: `Display ads`
- Slot ID'yi kopyalayın → `NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR_BOTTOM`

### 2. .env.local Dosyasını Güncelleyin

```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-5570650174796895
NEXT_PUBLIC_ADSENSE_SLOT_HERO=GERÇEK_SLOT_ID_BURAYA
NEXT_PUBLIC_ADSENSE_SLOT_FEATURES=GERÇEK_SLOT_ID_BURAYA
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=GERÇEK_SLOT_ID_BURAYA
NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR=GERÇEK_SLOT_ID_BURAYA
NEXT_PUBLIC_ADSENSE_SLOT_GENERATOR_BOTTOM=GERÇEK_SLOT_ID_BURAYA
```

### 3. Vercel Environment Variables

Deploy sonrası Vercel'de de aynı değişkenleri ekleyin:

1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. Her bir değişkeni ekleyin (Production, Preview, Development için)
3. Yeni bir deploy yapın

## 🧪 Test

### Local Test:
```bash
npm run dev
```

- http://localhost:3000 adresine gidin
- Development modda reklamlar görünmeyebilir (normal)
- Browser Console'da AdSense hataları var mı kontrol edin

### Production Test:
- Vercel'e deploy yapın
- Production URL'de reklamları kontrol edin
- AdSense Dashboard → **Ads** → **By site** bölümünden reklam gösterimlerini izleyin

## 📊 Reklam Yerleşimleri

### Landing Page (/)
- ✅ Hero section'dan sonra (Banner)
- ✅ Features section içinde (Rectangle)
- ✅ Footer'dan önce (Banner)

### Generator Page (/generator)
- ✅ Generator'dan önce (Rectangle)
- ✅ Generator'dan sonra (Rectangle)

## ⚠️ Önemli Notlar

1. **AdSense Onayı**: Hesabınız henüz onaylanmadıysa reklamlar görünmez. Onay 1-2 hafta sürebilir.

2. **Development vs Production**: 
   - Development modda reklamlar görünmeyebilir (normal)
   - Production deploy sonrası test edin

3. **Slot ID Formatı**: 
   - Slot ID'ler sadece rakamlardan oluşur (örn: `1234567890`)
   - `ca-pub-` prefix'i Publisher ID'de kullanılır, Slot ID'de değil

4. **Reklam Politikası**: 
   - Reklamlara "Click here" gibi yönlendirici metin eklemeyin
   - Reklamları içerikle karıştırmayın
   - Kullanıcı deneyimini bozmadan yerleştirin

## 🐛 Sorun Giderme

### Reklamlar Görünmüyor
- [ ] Publisher ID doğru mu?
- [ ] Slot ID'ler gerçek değerler mi? (1234567890 placeholder değil)
- [ ] AdSense hesabı onaylandı mı?
- [ ] Production'da test ediyor musunuz?
- [ ] Browser console'da hata var mı?
- [ ] Ad blocker devre dışı mı?

### Hata Mesajları
- Browser console'u açın (F12)
- AdSense ile ilgili hataları kontrol edin
- Network tab'inde AdSense script'inin yüklendiğini kontrol edin

## 📈 Sonraki Adımlar

1. ✅ Slot ID'leri AdSense'den alın
2. ✅ .env.local dosyasını güncelleyin
3. ✅ Local'de test edin
4. ✅ Vercel'e deploy yapın
5. ✅ Vercel Environment Variables ekleyin
6. ✅ Production'da test edin
7. ✅ AdSense Dashboard'dan performansı izleyin

---

**Şu an yapılacak**: AdSense Dashboard'dan Slot ID'leri alıp .env.local dosyasını güncelleyin!
