# gdyn.co

Gören Duyan link shortener ve landing page.

## Proje Yapısı

```
httpdocs/                 (Git root & Web root)
├── package.json          (Ana dizinde)
├── .env.example
├── .gitignore
├── index.html           (Build çıktısı)
├── assets/              (Build çıktısı)
├── .htaccess            (Build çıktısı)
└── projects/            (Vue kaynak kodu)
    ├── src/
    ├── public/
    ├── .env             (Git'e push edilmez)
    ├── package.json
    ├── vite.config.ts
    └── ...
```

## Kurulum

### Local Development

```bash
cd projects
npm install
npm run dev
```

### Production Build

```bash
cd projects
npm run build
# Build çıktısı ana dizine (../) oluşturulur
```

## Sunucu Kurulumu

1. Plesk'te repository'yi `httpdocs` dizinine çekin
2. SSH ile bağlanın:

```bash
cd /path/to/your/httpdocs
cp .env.example .env
nano .env  # Düzenleyin (.env ana dizinde kalmalı)

cd projects
npm ci
npm run build
```

3. Document root'u `httpdocs` olarak ayarlayın

**Önemli:** `.env` dosyası ana dizinde olmalı, `projects/` içinde DEĞİL!

## Deployment

GitHub Actions otomatik olarak her push'ta:
1. Plesk webhook ile `git pull` tetiklenir
2. SSH ile sunucuya bağlanır
3. `projects/` dizinde `npm ci && npm run build` çalıştırır
4. Build çıktısı ana dizine oluşturulur

## Environment Variables

`.env` dosyasını oluşturmak için:

```bash
# Ana dizinde oluşturun (projects/ içinde DEĞİL)
cp .env.example .env
```

Gerekli değişkenler:
- `VITE_GA_ID`: Google Analytics ID (GitHub'da görünmez)
- `VITE_APP_NAME`: Uygulama adı
- `VITE_APP_URL`: Site URL'i
- `VITE_APP_TITLE`: SEO başlığı
- `VITE_APP_DESCRIPTION`: SEO açıklaması
- `VITE_OG_IMAGE`: Open Graph resmi
- Diğerleri için `.env.example` dosyasına bakın

## GitHub Secrets

Deployment için gerekli secrets:
- `SERVER_HOST`: Sunucu IP/hostname
- `SERVER_USER`: SSH kullanıcı adı
- `SERVER_PASSWORD`: SSH şifresi
- `SERVER_PORT`: SSH portu (varsayılan: 22)
- `PROJECT_PATH`: httpdocs dizini (örn: `/path/to/httpdocs`)
- `WEBHOOK_URL`: Plesk Git webhook URL'i

## Plesk Ayarları

1. **Git**: Repository'yi `httpdocs` dizinine bağlayın
2. **Document Root**: `httpdocs` (varsayılan)
3. **Node.js**: Gerekirse enable edin

## Lisans

Apache License 2.0
