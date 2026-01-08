# ✅ AdSense Site Doğrulama Rehberi

## 📄 ads.txt Dosyası Oluşturuldu

✅ `public/ads.txt` dosyası oluşturuldu ve commit edildi.

İçerik:
```
google.com, pub-5570650174796895, DIRECT, f08c47fec0942fa0
```

## 🚀 Deploy Adımları

### 1. GitHub'a Push Edin

Eğer henüz GitHub'a push etmediyseniz:

```bash
# GitHub remote'u kontrol edin
git remote -v

# Eğer remote yoksa ekleyin (GitHub repo URL'nizi kullanın)
git remote add origin https://github.com/KULLANICI_ADI/qr-generator.git

# Push edin
git push -u origin main
```

### 2. Vercel'e Deploy

#### Yöntem 1: GitHub Üzerinden (Önerilen)

1. **Vercel Dashboard**: https://vercel.com
2. **New Project** → GitHub repository'nizi seçin
3. **Import** butonuna tıklayın
4. Otomatik olarak deploy başlar
5. Deploy tamamlandığında URL'iniz hazır olacak (örn: `qr-generator.vercel.app`)

#### Yöntem 2: Vercel CLI ile

```bash
# Vercel'e login (browser açılacak)
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### 3. ads.txt Dosyasını Kontrol Edin

Deploy tamamlandıktan sonra:

1. Tarayıcınızda şu URL'yi açın:
   ```
   https://YOUR-VERCEL-URL.vercel.app/ads.txt
   ```

2. Dosya içeriği görünmeli:
   ```
   google.com, pub-5570650174796895, DIRECT, f08c47fec0942fa0
   ```

3. ✅ Dosya görünüyorsa, AdSense'de doğrulama yapabilirsiniz.

## 🔍 AdSense Doğrulama

1. **AdSense Dashboard**'a gidin: https://www.google.com/adsense/
2. **Sites** bölümüne gidin
3. **"Site sahibi olduğunuzu doğrulayın"** bölümünü açın
4. **"Ads.txt snippet'i"** seçeneğini seçin
5. İçeriği kopyalayın ve kontrol edin:
   ```
   google.com, pub-5570650174796895, DIRECT, f08c47fec0942fa0
   ```
6. **"ads.txt dosyasını yayınladım"** checkbox'ını işaretleyin
7. **"Doğrula"** butonuna tıklayın

## ✅ Doğrulama Başarılı Olursa

- AdSense sitenizi kontrol edecek
- 1-2 dakika içinde doğrulama tamamlanır
- Ardından "İnceleme iste" (Request review) butonu aktif olur

## ⚠️ Sorun Giderme

### ads.txt Görünmüyor

1. **Deploy'un tamamlandığından emin olun**
   - Vercel dashboard'da deploy durumunu kontrol edin
   - Başarılı olması gerekiyor (✓ yeşil)

2. **URL'yi doğru kontrol edin**
   - `https://YOUR-URL.vercel.app/ads.txt`
   - `/ads.txt` root dizinde olmalı

3. **Cache temizleyin**
   - Browser cache'ini temizleyin (Ctrl+F5)
   - Veya incognito modda açın

4. **Dosya içeriğini kontrol edin**
   - Public klasöründe `ads.txt` dosyası olmalı
   - İçeriği doğru olmalı

### Doğrulama Başarısız

1. **ads.txt dosyasının erişilebilir olduğundan emin olun**
2. **İçeriğin tam olarak aynı olduğundan emin olun**
   - Boşluk, noktalama vb. önemli
3. **Birkaç dakika bekleyin** (propagation süresi)
4. **AdSense'de yeniden deneyin**

## 📝 Notlar

- `ads.txt` dosyası public klasöründe olmalı
- Next.js otomatik olarak `/ads.txt` URL'inde servis eder
- Dosya commit edildi ve GitHub'a push edilmeli
- Vercel deploy sonrası otomatik olarak erişilebilir olur

---

**Sonraki Adım**: Vercel'e deploy yapın ve ads.txt dosyasının erişilebilir olduğunu kontrol edin!
