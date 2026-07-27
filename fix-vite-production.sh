#!/bin/bash
# Fix Vite production mode issue

cd ~/public_html/mmabconsultingandheathcare.com

echo "=== Checking for public/hot file ==="
if [ -f "public/hot" ]; then
    echo "FOUND: public/hot file exists - this forces dev mode!"
    rm -f public/hot
    echo "DELETED: public/hot file removed"
else
    echo "OK: No public/hot file found"
fi

echo ""
echo "=== Verifying build assets exist ==="
ls -la public/build/manifest.json
ls -l public/build/assets/ | head -10

echo ""
echo "=== Clearing all Laravel caches ==="
php artisan config:clear
php artisan view:clear
php artisan route:clear
php artisan cache:clear

echo ""
echo "=== Verifying environment ==="
echo "APP_ENV=$(grep APP_ENV .env)"
echo "APP_DEBUG=$(grep APP_DEBUG .env)"
php artisan config:show app.env

echo ""
echo "=== Checking for any Node processes (shouldn't be any on server) ==="
ps aux | grep -i node | grep -v grep || echo "No Node processes found (good!)"

echo ""
echo "=== Done! ==="
echo "Now test the site in a browser. If still seeing dev URLs:"
echo "1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)"
echo "2. Clear browser cache completely"
echo "3. Try incognito/private browsing mode"
