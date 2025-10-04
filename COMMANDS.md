# 🚀 Vercel Otomatik Deployment Kurulumu

## ✅ TAMAMLANAN İŞLEMLER
- Git repository başlatıldı
- Vercel konfigürasyonu oluşturuldu (`vercel.json`)
- Package.json hazırlandı
- .gitignore dosyası eklendi
- İlk commit yapıldı

## 1️⃣ GitHub'da Yeni Repository Oluşturun
1. https://github.com adresine gidin
2. "New repository" butonuna tıklayın  
3. Repository adı: `astroguard-meteor-simulator`
4. **Public** olarak oluşturun
5. README, .gitignore ve license eklemeyin (zaten var)

## 2️⃣ Terminal'de Komutları Çalıştırın

**meteor-sim klasöründeyken:**

```bash
# 1. GitHub repository'yi bağla (KULLANICI_ADINIZI değiştirin!)
git remote add origin https://github.com/KULLANICI_ADINIZ/astroguard-meteor-simulator.git

# 2. GitHub'a push et (main branch zaten oluşturuldu)
git push -u origin main
```

**DİKKAT**: `KULLANICI_ADINIZ` kısmını kendi GitHub kullanıcı adınızla değiştirin!

## 3️⃣ Vercel'de GitHub Repository'yi Bağlayın

### Seçenek A: Yeni Proje Oluştur
1. https://vercel.com/dashboard adresine gidin
2. "New Project" → "Import Git Repository"
3. GitHub hesabınızı bağlayın
4. `astroguard-meteor-simulator` repository'sini seçin
5. Deploy butonuna tıklayın

### Seçenek B: Mevcut Vercel Projesini GitHub'a Bağla
1. Vercel Dashboard → Mevcut projenizi seçin
2. Settings → Git
3. "Connect Git Repository" butonuna tıklayın
4. GitHub'daki `astroguard-meteor-simulator` repo'sunu seçin
5. "Connect" butonuna tıklayın

## 4️⃣ Artık Otomatik!

Her değişiklik için:
```bash
git add .
git commit -m "✨ Yeni özellik açıklaması"
git push origin main
```

Vercel otomatik olarak deploy edecek! 🎉

## 5️⃣ Mevcut Vercel Projesini GitHub'a Bağlama

Eğer zaten Vercel'de deploy ettiyseniz:

1. Vercel Dashboard → Project Settings
2. Git → "Connect Git Repository" 
3. GitHub repository'nizi seçin
4. Artık otomatik deployment aktif!

## 📱 Komut Örnekleri

```bash
# Özellik ekledikten sonra
git add .
git commit -m "🎨 UI improvements and better animations"
git push origin main

# Bug düzeltmesi
git add .
git commit -m "🐛 Fix risk assessment calculation"
git push origin main

# Yeni bölüm ekleme
git add .
git commit -m "🚀 Add new asteroid database section"
git push origin main
```

## 🔧 Troubleshooting

Eğer sorun yaşarsanız:

```bash
# Remote kontrolü
git remote -v

# Branch kontrolü  
git branch -a

# Son commit'leri gör
git log --oneline -5

# Zorla push (dikkatli!)
git push -f origin main
```

🌌 **Happy Deployment!**
