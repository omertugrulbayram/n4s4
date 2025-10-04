# 🚀 AstroGuard - Deployment Rehberi

## Vercel Otomatik Deployment Kurulumu

### 1️⃣ GitHub Repository Oluşturma

```bash
# 1. Git repository başlat (zaten yapıldı)
git init

# 2. Dosyaları staging area'ya ekle
git add .

# 3. İlk commit
git commit -m "🌌 Initial commit: AstroGuard Meteor Simulator"

# 4. GitHub'da yeni repository oluştur (github.com'da)
# Repository adı: astroguard-meteor-simulator

# 5. Remote repository bağla
git remote add origin https://github.com/KULLANICI_ADINIZ/astroguard-meteor-simulator.git

# 6. Main branch'i GitHub'a push et
git branch -M main
git push -u origin main
```

### 2️⃣ Vercel GitHub Entegrasyonu

1. **Vercel Dashboard'a Git**: https://vercel.com/dashboard
2. **"New Project" butonuna tıkla**
3. **"Import Git Repository" seç**
4. **GitHub hesabını bağla** (eğer bağlı değilse)
5. **`astroguard-meteor-simulator` repository'sini seç**
6. **Import ve Deploy et**

### 3️⃣ Otomatik Deployment Ayarları

Vercel otomatik olarak şunları yapar:
- ✅ Her `main` branch'a push'ta otomatik deploy
- ✅ Pull request'lerde preview deployment
- ✅ Build cache optimization
- ✅ Global CDN distribution

### 4️⃣ Gelecek Güncellemeler İçin

```bash
# Değişiklik yap
git add .
git commit -m "🔥 New feature: Risk assessment improvements"
git push origin main

# Vercel otomatik olarak deploy edecek!
```

### 5️⃣ Environment Variables (Gerekirse)

Vercel Dashboard → Project → Settings → Environment Variables

```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api.com
```

### 6️⃣ Custom Domain (Opsiyonel)

Vercel Dashboard → Project → Settings → Domains
- `astroguard.com` gibi özel domain ekleyebilirsiniz

## 📊 Deployment Status

- **Production URL**: https://astroguard-meteor-simulator.vercel.app
- **GitHub Repo**: https://github.com/KULLANICI_ADINIZ/astroguard-meteor-simulator
- **Auto Deploy**: ✅ Aktif

## 🛠️ Teknik Detaylar

### Vercel Konfigürasyonu (`vercel.json`)
- Static site hosting
- Cache optimization
- Custom headers
- Route configuration

### Build Process
- Statik dosyalar (HTML, CSS, JS, JSON)
- CDN optimizasyonu
- Gzip compression
- Edge caching

### Performance
- ⚡ Global CDN
- 🚀 Edge computing
- 📱 Mobile optimization
- 🎯 SEO friendly

## 🔧 Troubleshooting

### Build Hataları
```bash
# Local test
python -m http.server 3000
# veya
npx serve .
```

### Git Sorunları
```bash
# Zorla push (dikkatli kullan)
git push -f origin main

# Branch durumu kontrol
git status
git log --oneline
```

### Vercel CLI (Opsiyonel)
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 🎯 Sonuç

Artık her kod değişikliğinde:
1. Local'de test et
2. Git'e commit et
3. GitHub'a push et
4. Vercel otomatik deploy eder
5. Canlı site güncellenir

🌌 **Happy Coding!**
