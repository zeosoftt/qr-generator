# 🔧 AdSense Doğrulama Sorun Giderme

## ❌ Sorun: "Siteniz doğrulanamadı"

### Olası Nedenler ve Çözümler

#### 1. ads.txt Dosyası Henüz Erişilebilir Değil

**Kontrol:**
```
https://YOUR-VERCEL-URL.vercel.app/ads.txt
```

**Çözüm:**
- Vercel deployment'ının tamamlandığından emin olun (2-3 dakika bekleyin)
- Browser cache'ini temizleyin (Ctrl+F5 veya Incognito mod)
- Dosyanın `public/ads.txt` konumunda olduğundan emin olun

#### 2. Dosya İçeriği Yanlış

**Doğru İçerik:**
```
google.com, pub-5570650174796895, DIRECT, f08c47fec0942fa0
```

**Kontrol:**
- Dosya sonunda boş satır olmamalı
- Tırnak işareti, ekstra boşluk olmamalı
- Tam olarak yukarıdaki gibi olmalı

#### 3. Deployment URL Yanlış

**Kontrol:**
- AdSense'de kayıtlı URL ile Vercel URL'si aynı olmalı
- `https://` ile başlamalı
- `/ads.txt` root dizinde olmalı (örn: `https://qr-generator.vercel.app/ads.txt`)

#### 4. Google Crawler Henüz Erişemedi

**Çözüm:**
- 24-48 saat bekleyin (Google crawler gecikebilir)
- Google Search Console'dan URL'yi test edin
- "Fetch as Google" özelliğini kullanın

## ✅ Alternatif Doğrulama Yöntemleri

### Yöntem 1: Meta Tag (Önerilen - Daha Hızlı)

Meta tag yöntemi daha hızlı çalışır. Zaten ekledik!

**AdSense'de:**
1. "Meta etiket" seçeneğini seçin
2. Verilen meta tag'i kopyalayın
3. `app/layout.tsx` dosyasında zaten ekli (verification metadata)

**Eğer AdSense farklı bir meta tag verirse:**
- `app/layout.tsx` dosyasındaki `verification.google` değerini güncelleyin

### Yöntem 2: AdSense Code Snippet

1. AdSense'de "AdSense kod snippet'i" seçeneğini seçin
2. Verilen kodu kopyalayın
3. `app/layout.tsx` dosyasındaki `<head>` bölümüne ekleyin

## 🔍 Adım Adım Kontrol Listesi

### 1. ads.txt Kontrolü

```bash
# Local'de kontrol
curl http://localhost:3000/ads.txt

# Production'da kontrol (deploy sonrası)
curl https://YOUR-VERCEL-URL.vercel.app/ads.txt
```

**Beklenen Çıktı:**
```
google.com, pub-5570650174796895, DIRECT, f08c47fec0942fa0
```

### 2. Dosya Yapısı Kontrolü

```
qr-generator/
├── public/
│   └── ads.txt  ✅ Burada olmalı
```

### 3. Deploy Kontrolü

- [ ] GitHub'a push edildi mi?
- [ ] Vercel deployment başarılı mı?
- [ ] Production URL çalışıyor mu?
- [ ] /ads.txt erişilebilir mi?

### 4. AdSense Kontrolü

- [ ] Doğru URL kayıtlı mı? (Vercel URL'si)
- [ ] 24-48 saat beklediniz mi?
- [ ] Alternatif yöntem denediniz mi? (Meta tag)

## 🚀 Hızlı Çözüm: Meta Tag Yöntemi

Meta tag yöntemi genellikle daha hızlı çalışır:

1. **AdSense Dashboard** → "Meta etiket" seçin
2. Verilen meta tag'i alın
3. `app/layout.tsx` dosyasını güncelleyin (zaten ekli, sadece değeri kontrol edin)

## 📞 Hala Çalışmıyorsa

1. **Google Search Console** ekleyin ve siteyi doğrulayın
2. **24-48 saat bekleyin** (crawler gecikmesi normal)
3. **Vercel URL'sinin doğru** olduğundan emin olun
4. **AdSense destek** ile iletişime geçin

## 💡 İpuçları

- Meta tag yöntemi genellikle daha hızlıdır
- ads.txt için 24-48 saat beklemek normaldir
- Birden fazla yöntem aynı anda kullanılabilir
- Doğrulama sonrası "İnceleme iste" butonu aktif olur

---

**Şu an yapılacak**: Meta tag yöntemini deneyin veya 24 saat bekleyip ads.txt'yi tekrar kontrol edin.
