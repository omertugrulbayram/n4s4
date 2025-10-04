# ⚡ HIZLI VERCEL OTOMATIK DEPLOY KURULUMU

## 🚨 ŞU ANDA DURUM
- ✅ Git repository hazır
- ❌ GitHub'a push edilmedi
- ❌ Vercel'e bağlanmadı

## 🚀 3 ADIMDA ÇÖZÜM

### 1️⃣ GitHub Repository Oluştur (2 dakika)
1. **https://github.com/new** adresine git
2. Repository name: `astroguard-meteor-simulator`
3. **Public** seç
4. ❌ README, .gitignore ekleme (zaten var)
5. **"Create repository"** tıkla

### 2️⃣ Terminal Komutları (1 dakika)
```bash
# meteor-sim klasöründe çalıştır:

# GitHub kullanıcı adınızı KULLANICI_ADI yerine yazın!
git remote add origin https://github.com/KULLANICI_ADI/astroguard-meteor-simulator.git

# Push et
git push -u origin main
```

### 3️⃣ Vercel'e Bağla (2 dakika)

**Seçenek A: Mevcut Vercel Projesini Bağla**
1. Vercel Dashboard → Mevcut projeniz
2. Settings → Git → "Connect Git Repository"
3. `astroguard-meteor-simulator` repo'sunu seç

**Seçenek B: Yeni Proje Oluştur**
1. Vercel Dashboard → "New Project"
2. "Import Git Repository"
3. `astroguard-meteor-simulator` seç

## 🎯 SONUÇ
Artık her `git push` ile otomatik deploy!

```bash
# Kod değiştir, sonra:
git add .
git commit -m "Yeni özellik"
git push origin main
# Vercel otomatik deploy eder! 🚀
```

## ⚠️ ÖNEMLİ NOTLAR
- GitHub kullanıcı adınızı doğru yazın
- Repository adını tam olarak `astroguard-meteor-simulator` yapın
- Public repository olarak oluşturun

## 🔗 HIZLI LİNKLER
- GitHub: https://github.com/new
- Vercel: https://vercel.com/dashboard

🌌 **5 dakikada tamamlanır!**
