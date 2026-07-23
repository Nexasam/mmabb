# Manual Deployment Commands (Copy & Paste)

Since SSH key authentication isn't set up yet, here are the exact commands to run manually.

Password: `izzeuqbj47td`

---

## Quick Backend Deployment (Most Common)

### Step 1: Package and Upload
```powershell
# Package backend files
$t="deploy_temp";if(Test-Path $t){rm -r -fo $t};xcopy /E /I /Y /Q app "$t\app" >$null;xcopy /E /I /Y /Q bootstrap "$t\bootstrap" >$null;xcopy /E /I /Y /Q config "$t\config" >$null;xcopy /E /I /Y /Q database "$t\database" >$null;xcopy /E /I /Y /Q routes "$t\routes" >$null;cp artisan "$t\" >$null;cp composer.json "$t\" >$null;cp composer.lock "$t\" >$null;tar -czf deploy.tar.gz -C $t .;rm -r -fo $t

# Upload (enter password: izzeuqbj47td)
scp deploy.tar.gz @a60$qH9VMVBDxHl@mmabconsultingandheathcare.com:~/

# Clean up
rm deploy.tar.gz
```

### Step 2: Deploy on Server
```powershell
# Connect (enter password: izzeuqbj47td)
ssh @a60$qH9VMVBDxHl@mmabconsultingandheathcare.com

# Then run this on the server:
cd ~/mmabb && tar -xzf ~/deploy.tar.gz && rm ~/deploy.tar.gz && composer install --optimize-autoloader --no-dev --no-interaction && php artisan migrate --force && php artisan config:cache && php artisan route:cache && php artisan view:cache && echo "Done!"

# Type 'exit' to disconnect
```

---

## Frontend Only Deployment

### Step 1: Build and Package
```powershell
# Build frontend
npm run build

# Package
$t="deploy_temp";if(Test-Path $t){rm -r -fo $t};xcopy /E /I /Y /Q public\build "$t\public\build" >$null;tar -czf deploy-fe.tar.gz -C $t .;rm -r -fo $t

# Upload (enter password: izzeuqbj47td)
scp deploy-fe.tar.gz @a60$qH9VMVBDxHl@mmabconsultingandheathcare.com:~/

# Clean up
rm deploy-fe.tar.gz
```

### Step 2: Deploy on Server
```powershell
# Connect (enter password: izzeuqbj47td)
ssh @a60$qH9VMVBDxHl@mmabconsultingandheathcare.com

# Then run:
cd ~/mmabb && tar -xzf ~/deploy-fe.tar.gz && rm ~/deploy-fe.tar.gz && echo "Done!"

# Type 'exit' to disconnect
```

---

## Full Deployment (Backend + Frontend)

### Step 1: Build and Package
```powershell
# Build frontend
npm run build

# Package everything
$t="deploy_temp";if(Test-Path $t){rm -r -fo $t};xcopy /E /I /Y /Q app "$t\app" >$null;xcopy /E /I /Y /Q bootstrap "$t\bootstrap" >$null;xcopy /E /I /Y /Q config "$t\config" >$null;xcopy /E /I /Y /Q database "$t\database" >$null;xcopy /E /I /Y /Q public "$t\public" >$null;xcopy /E /I /Y /Q resources "$t\resources" >$null;xcopy /E /I /Y /Q routes "$t\routes" >$null;xcopy /E /I /Y /Q storage "$t\storage" >$null;cp artisan "$t\" >$null;cp composer.json "$t\" >$null;cp composer.lock "$t\" >$null;cp .env.production "$t\.env" >$null;tar -czf deploy-full.tar.gz -C $t .;rm -r -fo $t

# Upload (enter password: izzeuqbj47td)
scp deploy-full.tar.gz @a60$qH9VMVBDxHl@mmabconsultingandheathcare.com:~/

# Clean up
rm deploy-full.tar.gz
```

### Step 2: Deploy on Server
```powershell
# Connect (enter password: izzeuqbj47td)
ssh @a60$qH9VMVBDxHl@mmabconsultingandheathcare.com

# Then run:
cd ~/mmabb && tar -xzf ~/deploy-full.tar.gz && rm ~/deploy-full.tar.gz && composer install --optimize-autoloader --no-dev --no-interaction && php artisan migrate --force && php artisan config:cache && php artisan route:cache && php artisan view:cache && echo "Done!"

# Type 'exit' to disconnect
```

---

## Common Server Commands

After connecting with SSH, you can run:

```bash
# Check routes
php artisan route:list

# Clear all caches
php artisan optimize:clear

# View logs
tail -n 50 storage/logs/laravel.log

# Check migrations
php artisan migrate:status

# Fix permissions
chmod -R 775 storage bootstrap/cache
```

---

## One-Time SSH Key Setup (Optional)

To avoid entering passwords every time:

```powershell
# Add your key to the server (enter password once)
type ~\.ssh\id_rsa.pub | ssh @a60$qH9VMVBDxHl@mmabconsultingandheathcare.com "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

After this, the automated scripts (deploy.ps1, deploy-quick.ps1, etc.) will work without passwords!
