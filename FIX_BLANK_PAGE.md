# Fix Blank Page Issue (Vite Dev URLs in Production)

## Problem
The HTML source shows Vite dev server URLs (`http://[::1]:5173/@vite/client`) even though the server is in production mode. This causes blank pages on mobile and other devices.

## Root Cause
Laravel detects a `public/hot` file on the server OR is somehow detecting a dev server running locally. When this file exists or dev server is detected, Laravel forces dev mode URLs into the HTML.

## Solution Steps

### Step 1: Stop ALL Local Dev Servers
**On your Windows computer**, check if any Node/Vite processes are running:

```powershell
Get-Process | Where-Object {$_.ProcessName -like "*node*"}
```

If you see any Node processes, stop them:
- Close any terminals running `npm run dev` or `composer run dev`
- Or kill them: `Stop-Process -Name node -Force`

### Step 2: Upload and Run Fix Script on Server

**On your Windows computer:**

```powershell
# Upload the fix script
scp fix-vite-production.sh izzeuqbj47td@mmabconsultingandheathcare.com:~/
```

**Then SSH to server and run:**

```bash
ssh izzeuqbj47td@mmabconsultingandheathcare.com

# Make script executable
chmod +x ~/fix-vite-production.sh

# Run it
bash ~/fix-vite-production.sh
```

### Step 3: Test in Browser

After running the fix script:

1. **Hard refresh** your browser (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
2. **Clear browser cache** completely
3. Try **incognito/private browsing mode**
4. Try on your phone again

### Step 4: Verify the Fix

View the page source and check that asset URLs now look like this:

**CORRECT (Production):**
```html
<link rel="stylesheet" href="/build/assets/app-ABC123.css" />
<script type="module" src="/build/assets/app-XYZ789.js"></script>
```

**WRONG (Dev Mode):**
```html
<script type="module" src="http://[::1]:5173/@vite/client"></script>
<link rel="stylesheet" href="http://[::1]:5173/resources/css/app.css" />
```

## If Still Not Working

If the issue persists after following all steps:

1. Check if there are any cached responses at the hosting level (GoDaddy may have server-side caching)
2. Contact GoDaddy support to clear any server-side caching
3. Wait a few minutes for any CDN/caching to expire

## Prevention

**NEVER run `npm run dev` or `composer run dev` on the production server!**

Always:
1. Build locally: `npm run build`
2. Deploy the `public/build` directory
3. Make sure `APP_ENV=production` in server `.env`
4. Keep `public/hot` file deleted on server
