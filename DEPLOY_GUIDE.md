# 🚀 Deploy Rehberi - GitHub + Vercel

## Adım 1: GitHub Repository Oluşturma

### Yöntem 1: GitHub Web Arayüzü (Önerilen)

1. **GitHub'a giriş yapın**: https://github.com
2. **Yeni repository oluşturun**:
   - Sağ üstteki "+" butonuna tıklayın
   - "New repository" seçin
   - Repository adı: `qr-generator` (veya istediğiniz isim)
   - Açıklama: "Modern QR Code Generator with Premium Features"
   - **Public** veya **Private** seçin
   - ⚠️ **ÖNEMLİ**: "Initialize this repository with README" seçeneğini **İŞARETLEMEYİN**
   - "Create repository" butonuna tıklayın

3. **Repository URL'ini kopyalayın** (örn: `https://github.com/KULLANICI_ADI/qr-generator.git`)

### Yöntem 2: GitHub CLI ile (Opsiyonel)

```bash
# GitHub CLI kurulumu (eğer yoksa)
winget install --id GitHub.cli

# Giriş yapın
gh auth login

# Repository oluşturun
gh repo create qr-generator --public --source=. --remote=origin --push
```

## Adım 2: Local Repository'yi GitHub'a Bağlama

Terminal'de aşağıdaki komutları çalıştırın:

```bash
# GitHub'dan aldığınız URL'i buraya yapıştırın
git remote add origin https://github.com/KULLANICI_ADI/qr-generator.git

# Branch adını main yapın (Vercel genelde main branch'i bekler)
git branch -M main

# Tüm kodları GitHub'a gönderin
git push -u origin main
```

## Adım 3: Vercel'e Deploy

### Yöntem 1: Vercel Web Arayüzü (Önerilen - En Kolay)

1. **Vercel'e giriş yapın**: https://vercel.com
   - GitHub hesabınızla giriş yapın (önerilir)

2. **Yeni proje oluşturun**:
   - "Add New..." → "Project" tıklayın
   - GitHub repository'nizi seçin (`qr-generator`)
   - "Import" butonuna tıklayın

3. **Proje ayarları**:
   - Framework Preset: **Next.js** (otomatik algılanır)
   - Root Directory: `./` (varsayılan)
   - Build Command: `npm run build` (varsayılan)
   - Output Directory: `.next` (varsayılan)
   - Install Command: `npm install` (varsayılan)

4. **Environment Variables** (şimdilik gerekmez, sonra ekleyebilirsiniz):
   - Henüz bir şey eklemenize gerek yok

5. **Deploy**:
   - "Deploy" butonuna tıklayın
   - 2-3 dakika içinde deploy tamamlanır
   - Size bir URL verilecek (örn: `qr-generator.vercel.app`)

### Yöntem 2: Vercel CLI ile

```bash
# Vercel'e giriş yapın
vercel login

# Projeyi deploy edin
vercel

# Production deploy için
vercel --prod
```

## Adım 4: Otomatik Deploy Ayarları

Vercel, GitHub repository'nize bağlandığında otomatik olarak:
- ✅ Her `push` işleminde otomatik deploy yapar
- ✅ Pull Request'lerde preview deploy oluşturur
- ✅ Production ve preview URL'leri otomatik verilir

## 🎉 Tamamlandı!

Projeniz artık canlıda! Şunları yapabilirsiniz:

- **Ana URL**: `https://qr-generator.vercel.app` (veya size verilen URL)
- **Kod değişikliklerinde**: GitHub'a push yapın, otomatik deploy olur
- **Custom domain**: Vercel dashboard'dan kendi domain'inizi ekleyebilirsiniz

## 📝 Sonraki Adımlar

### Environment Variables (İleride Gerekebilir)

Eğer database veya API key'ler eklemeniz gerekirse:

1. Vercel Dashboard → Projeniz → Settings → Environment Variables
2. Key-Value çiftleri ekleyin
3. Deploy'u yenileyin

### Örnek Environment Variables:
```
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_KEY=your_api_key
```

## 🐛 Sorun Giderme

### Build Hatası
- `.next` klasörünü silin ve yeniden deploy edin
- `package.json`'daki tüm bağımlılıkların kurulu olduğundan emin olun

### 404 Hatası
- Routing için `next.config.js` ayarlarını kontrol edin
- Dynamic routes doğru şekilde yapılandırıldığından emin olun

### Environment Variables Çalışmıyor
- Değişkenleri ekledikten sonra yeni bir deploy yapın
- `NEXT_PUBLIC_` prefix'i ile başlayanlar client-side'da kullanılabilir

---

**İyi çalışmalar! 🚀**
