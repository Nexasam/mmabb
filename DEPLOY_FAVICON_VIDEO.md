# Deploy Favicon and Video Fix

## Changes Made

### 1. Favicon Fixed ✅
Updated `resources/views/app.blade.php` to use the correct favicon files:
- Changed from `/images/logo.webp` to `/favicon.svg` (primary)
- Kept `/favicon.ico` as fallback for older browsers
- Changed Apple touch icon to `/apple-touch-icon.png`

**Before:**
```html
<link rel="icon" href="/images/logo.webp" type="image/webp">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/images/logo.webp">
```

**After:**
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

### 2. YouTube Video Changed ✅
Updated default YouTube video in `resources/js/pages/home.tsx`:
- Changed from `dQw4w9WgXcQ` (Rick Astley - Never Gonna Give You Up)
- Changed to `xwLc_gswIww` (Healthcare/nursing home care video)

The video is used in:
- Hero section (top of homepage)
- Video section (middle of homepage)

**Note:** You can still override this via the admin CMS panel by setting a custom `hero.youtube_id` value.

## Deployment Instructions

### Step 1: Upload Package

```powershell
scp favicon-video-fix.tar.gz izzeuqbj47td@mmabconsultingandheathcare.com:~/
```

### Step 2: SSH and Extract

```bash
ssh izzeuqbj47td@mmabconsultingandheathcare.com
# Password: @a60$qH9VMVBDxHl

cd ~/public_html/mmabconsultingandheathcare.com

# Extract the package (overwrites public/build and resources/views/app.blade.php)
tar -xzf ~/favicon-video-fix.tar.gz

# Clear caches
php artisan view:clear
php artisan config:clear

# Verify files
ls -la public/favicon.svg public/favicon.ico public/apple-touch-icon.png
head -20 resources/views/app.blade.php | grep favicon
```

### Step 3: Test

1. **Test Favicon:**
   - Open your website in a browser
   - Check the browser tab - you should see your logo/icon
   - Check on mobile devices (both Android and iOS)
   - Clear browser cache if you still see the old icon

2. **Test Video:**
   - Go to homepage
   - Scroll to the video sections
   - Verify the healthcare video plays (not Rick Astley!)
   - The video should be health/care related

## Files Changed

- `resources/views/app.blade.php` - Updated favicon references
- `resources/js/pages/home.tsx` - Changed default YouTube video ID
- `public/build/**/*` - Rebuilt frontend assets

## Rollback

If you need to rollback, you'll need to restore from your previous deployment or re-deploy the old version.

## Notes

- The favicon files already exist on the server (`public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`)
- No changes were needed to those files, just the HTML references
- The YouTube video can be changed anytime via the admin CMS without code changes
