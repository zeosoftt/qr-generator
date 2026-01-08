# Yazılım Geliştirme Ortamı Kurulum Özeti

## ✅ Kurulu Araçlar

### Temel Yazılımlar
- **Git** v2.52.0 - Versiyon kontrol sistemi
- **Node.js** v24.12.0 (LTS) - JavaScript runtime
- **npm** v11.7.0 - Node.js paket yöneticisi
- **Python** 3.13.11 - Python programlama dili
- **pip** 25.3 - Python paket yöneticisi
- **Docker Desktop** v29.1.3 - Konteynerizasyon platformu
- **Visual Studio Code** - Kod editörü (zaten mevcuttu)

### Yardımcı Araçlar
- **Postman** v11.79.4 - API test ve geliştirme
- **GitHub Desktop** v3.5.4 - Git GUI aracı

### Node.js Global Paketleri
- **yarn** - Alternatif paket yöneticisi
- **typescript** - TypeScript derleyici
- **ts-node** - TypeScript çalıştırma aracı
- **nodemon** - Geliştirme sunucusu için otomatik yeniden başlatma

### Python Global Paketleri
- **virtualenv** - Python sanal ortam yöneticisi
- **pipenv** - Modern Python paket ve sanal ortam yöneticisi
- **black** - Python kod formatlayıcı
- **flake8** - Python linting aracı
- **pytest** - Python test framework'ü

## 📝 Önemli Notlar

### Docker Desktop
Docker Desktop Windows'ta WSL2 (Windows Subsystem for Linux) gerektirir. Eğer Docker çalışmıyorsa:
1. Docker Desktop'ı başlatın
2. WSL2'nin kurulu olduğundan emin olun
3. Docker Desktop ayarlarından WSL2 entegrasyonunu kontrol edin

### PATH Güncellemesi
Kurulumlar tamamlandı, ancak bazı araçların PATH'e eklenmesi için PowerShell'i yeniden başlatmanız gerekebilir. Eğer bir komut bulunamazsa, terminali kapatıp yeniden açın.

### Python Sanal Ortamları
Python projeleri için her zaman sanal ortam kullanmanız önerilir:

```bash
# virtualenv ile
python -m venv myproject
myproject\Scripts\activate

# veya pipenv ile
pipenv install
pipenv shell
```

### Node.js Projeleri
Node.js projeleri için:

```bash
# npm ile
npm init
npm install <package-name>

# veya yarn ile
yarn init
yarn add <package-name>
```

## 🚀 Sonraki Adımlar

1. **Git yapılandırması:**
   ```bash
   git config --global user.name "İsminiz"
   git config --global user.email "email@example.com"
   ```

2. **Docker Desktop'ı başlatın** ve WSL2 entegrasyonunu kontrol edin

3. **VS Code/Cursor uzantıları** kurmayı düşünün:
   - ESLint (JavaScript/TypeScript linting)
   - Prettier (Kod formatlayıcı)
   - Python (Python desteği)
   - Docker (Docker desteği)
   - GitLens (Git görselleştirme)

4. **QR Generator projeniz** için hazırsınız! 🎉

## 📚 Yararlı Komutlar

```bash
# Git
git --version
git init
git clone <repo-url>

# Node.js
node --version
npm --version
npm init

# Python
python --version
pip --version
python -m venv venv

# Docker
docker --version
docker ps
docker run hello-world
```
