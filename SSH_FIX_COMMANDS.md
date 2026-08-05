# Manual SSH Fix for Production Environment Issue

## Problem
Site is trying to load from local Vite dev server `[::1]:5173` instead of production build files.

## Solution Steps

### 1. Connect to Server
```bash
ssh YOUR_USERNAME@mmabconsultingandheathcare.com
```

### 2. Navigate to Application Directory
```bash
cd YOUR_DEPLOY_PATH
# This is the path where your Laravel app is deployed
# Common paths: /home/username/public_html, /var/www/html, etc.
```

### 3. Check Current Status
```bash
# Check if .env exists
ls -la .env

# View current APP_ENV setting
grep APP_ENV .env

# Check for cached config
ls -la bootstrap/cache/config.php
```

### 4. Fix .env File

**Option A: Edit existing .env**
```bash
nano .env

# Find and change these lines:
# APP_ENV=local    →    APP_ENV=production
# APP_DEBUG=true   →    APP_DEBUG=false

# Save: Ctrl+X, then Y, then Enter
```

**Option B: Copy from .env.production**
```bash
# If .env doesn't exist or is corrupted
cp .env.production .env
```

### 5. Delete Config Cache (CRITICAL!)
```bash
# This cached file is causing the issue
rm -f bootstrap/cache/config.php

# Verify deletion
ls bootstrap/cache/
```

### 6. Clear All Laravel Caches
```bash
php artisan config:clear
php artisan config:cache
php artisan cache:clear
php artisan view:clear
php artisan route:clear
```

### 7. Verify Fix
```bash
# Check environment
php artisan tinker --execute="echo config('app.env');"
# Should output: production

# Check debug mode
php artisan tinker --execute="var_dump(config('app.debug'));"
# Should output: bool(false)
```

### 8. Test in Browser
- Exit SSH: `exit`
- Open: https://mmabconsultingandheathcare.com
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Check browser console - errors should be gone!

---

## Quick One-Liner (Advanced)

If you want to run all commands at once:
```bash
cd YOUR_DEPLOY_PATH && \
cp .env.production .env && \
sed -i 's/APP_ENV=.*/APP_ENV=production/' .env && \
sed -i 's/APP_DEBUG=.*/APP_DEBUG=false/' .env && \
rm -f bootstrap/cache/config.php && \
php artisan config:clear && \
php artisan config:cache && \
php artisan cache:clear && \
php artisan view:clear && \
php artisan route:clear && \
echo "Fix complete!"
```

---

## Troubleshooting

**Can't find deploy path?**
- Check your hosting control panel (cPanel, Plesk, etc.)
- Common GoDaddy path: `/home/username/public_html`
- Ask your hosting provider

**Permission denied errors?**
```bash
# Fix permissions
chmod -R 775 storage bootstrap/cache
```

**Still seeing Vite errors?**
```bash
# Check if public/build directory exists
ls -la public/build/

# Should contain manifest.json and assets folder
# If missing, assets weren't built - check GitHub Actions deployment logs
```

**Want to see the actual error?**
```bash
# Temporarily enable debug mode to see error details
nano .env
# Change: APP_DEBUG=true
# Save and reload site
# Then change back to false after diagnosing
```

---

## After Fix is Working

1. ✅ Site loads without Vite errors
2. ✅ All images display correctly
3. ✅ CSS and JavaScript work properly

**Don't forget to delete the fix-env.php file if you uploaded it:**
```bash
rm public/fix-env.php
```

---

## Need More Help?

If issues persist after following all steps:
1. Check GitHub Actions deployment logs for build errors
2. Verify `public/build/manifest.json` exists on server
3. Check web server error logs: `tail -f storage/logs/laravel.log`
