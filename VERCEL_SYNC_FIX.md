# 🔄 Vercel GitHub Sync Sorunu Çözümü

## Sorun: Vercel son commit'leri görmüyor

## Çözüm Adımları

### 1. GitHub Repository Kontrolü

```bash
# Son commit'leri kontrol edin
git log --oneline -5

# GitHub'a push edildi mi kontrol edin
git status

# Eğer push edilmemişse
git push origin main
```

### 2. Vercel Dashboard'da Kontrol

1. **Vercel Dashboard**: https://vercel.com
2. Projenize gidin (`qr-generator`)
3. **Settings** → **Git**
4. Kontrol edin:
   - ✅ **Connected Repository**: GitHub repository görünüyor mu?
   - ✅ **Production Branch**: `main` olarak ayarlı mı?
   - ✅ **Auto-deploy**: Açık mı?

### 3. Vercel'i Yeniden Bağlama

#### Yöntem 1: Vercel Dashboard'dan

1. **Settings** → **Git** → **Disconnect**
2. **"Connect Git Repository"** butonuna tıklayın
3. GitHub repository'nizi tekrar seçin (`zeosoftt/qr-generator`)
4. **Import** butonuna tıklayın
5. Ayarları kontrol edin ve **Deploy** yapın

#### Yöntem 2: Vercel CLI ile

```bash
# Projeyi yeniden bağla
vercel link

# Production deploy
vercel --prod
```

### 4. Manuel Deploy Tetikleme

Eğer otomatik deploy çalışmıyorsa:

1. **Vercel Dashboard** → **Deployments**
2. En üstteki deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. Production'ı seçin ve **"Redeploy"** yapın

### 5. GitHub Webhook Kontrolü

1. **GitHub Repository** → **Settings** → **Webhooks**
2. Vercel webhook'unun olduğundan emin olun
3. Son event'leri kontrol edin

## 🔍 Debug Komutları

```bash
# GitHub'daki son commit'ler
git log origin/main --oneline -5

# Local ve remote arasındaki fark
git log HEAD..origin/main --oneline

# Remote branch'i güncelle
git fetch origin

# Branch durumu
git branch -vv
```

## ✅ Kontrol Listesi

- [ ] Local'de commit var mı?
- [ ] GitHub'a push edildi mi?
- [ ] Vercel repository'ye bağlı mı?
- [ ] Production branch `main` olarak ayarlı mı?
- [ ] Auto-deploy açık mı?
- [ ] GitHub webhook çalışıyor mu?

## 🚀 Hızlı Çözüm

Eğer hızlıca deploy etmek istiyorsanız:

```bash
# Vercel CLI ile direkt deploy
vercel --prod
```

Bu, GitHub'dan bağımsız olarak direkt Vercel'e deploy eder.

---

**Not**: Vercel CLI ile direkt deploy yapmak otomatik sync'i bypass eder. GitHub entegrasyonunu düzeltmek için yukarıdaki adımları izleyin.
