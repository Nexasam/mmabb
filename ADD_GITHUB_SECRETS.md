# Add GitHub Secrets - Step by Step

## You Need to Add 3 Secrets to GitHub

### Step 1: Get Your SSH Private Key

Run this command in PowerShell:

```powershell
Get-Content ~\.ssh\id_rsa
```

**IMPORTANT:** Copy the ENTIRE output including:
- `-----BEGIN RSA PRIVATE KEY-----`
- All the lines in between
- `-----END RSA PRIVATE KEY-----`

### Step 2: Go to GitHub Secrets Page

Click this link or follow the path:

**Direct link:** https://github.com/Nexasam/mmabb/settings/secrets/actions

**Or navigate:**
1. Go to https://github.com/Nexasam/mmabb
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions" (left sidebar)

### Step 3: Add Secret #1 - SSH_PRIVATE_KEY

1. Click **"New repository secret"** button
2. Fill in:
   - **Name:** `SSH_PRIVATE_KEY` (exactly like this, case-sensitive)
   - **Secret:** Paste your entire SSH private key from Step 1
3. Click **"Add secret"**

### Step 4: Add Secret #2 - SSH_USER

1. Click **"New repository secret"** again
2. Fill in:
   - **Name:** `SSH_USER`
   - **Secret:** `izzeuqbj47td`
3. Click **"Add secret"**

### Step 5: Add Secret #3 - DEPLOY_PATH

1. Click **"New repository secret"** again
2. Fill in:
   - **Name:** `DEPLOY_PATH`
   - **Secret:** `/home/izzeuqbj47td/public_html/mmabconsultingandheathcare.com`
3. Click **"Add secret"**

## Verify Secrets Are Added

You should see 3 secrets listed:
- ✅ SSH_PRIVATE_KEY
- ✅ SSH_USER
- ✅ DEPLOY_PATH

## Test Automatic Deployment

After adding all secrets, push the GitHub Actions workflow:

```powershell
git push origin main
```

Then watch the deployment:
- Go to: https://github.com/Nexasam/mmabb/actions
- You should see "Deploy to GoDaddy" running
- Click on it to watch progress
- Takes about 2-3 minutes

## What Happens Next

Every time you push to GitHub:
1. GitHub Actions runs automatically
2. Builds your frontend
3. Uploads to your server
4. Clears caches
5. Your live site is updated!

No more manual deployment! 🎉
