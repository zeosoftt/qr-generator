# 🚀 Hızlı Deploy - Vercel CLI

Vercel GitHub sync çalışmıyorsa, CLI ile direkt deploy edin:

## Adım 1: Vercel'e Login

```bash
vercel login
```

Browser açılacak, GitHub hesabınızla giriş yapın.

## Adım 2: Projeyi Link Et

```bash
# Mevcut projeyi link et
vercel link

# Veya yeni proje oluştur
vercel
```

## Adım 3: Production Deploy

```bash
# Production'a deploy et
vercel --prod
```

## Alternatif: GitHub Webhook'u Tetikle

1. **GitHub Repository** → **Settings** → **Webhooks**
2. Vercel webhook'unu bulun
3. **"Recent Deliveries"** → Son event'e tıklayın
4. **"Redeliver"** butonuna tıklayın

Bu, Vercel'e GitHub'dan yeni bir push olduğunu bildirir.

---

**En Hızlı Yol**: `vercel --prod` komutu ile direkt deploy edin!
