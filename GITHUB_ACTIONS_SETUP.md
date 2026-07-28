# GitHub Actions Automatic Deployment Setup

## What This Does

When you push code to GitHub, it will automatically:
1. ✅ Build the frontend (`npm run build`)
2. ✅ Upload files to your GoDaddy server
3. ✅ Clear Laravel caches
4. ✅ Deploy changes to live site

## Setup Steps

### Step 1: Get Your SSH Private Key

Run this command to display your SSH private key:

```powershell
Get-Content ~\.ssh\id_rsa
```

**Copy the ENTIRE output** (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)

### Step 2: Add Secrets to GitHub

1. **Go to your repository settings:**
   - Visit: https://github.com/Nexasam/mmabb/settings/secrets/actions
   - Or: GitHub → Your Repo → Settings → Secrets and variables → Actions

2. **Click "New repository secret"**

3. **Add these THREE secrets:**

#### Secret 1: SSH_PRIVATE_KEY
   - **Name:** `SSH_PRIVATE_KEY`
   - **Value:** Paste your entire SSH private key (from Step 1)
   - Click "Add secret"

#### Secret 2: SSH_USER
   - **Name:** `SSH_USER`
   - **Value:** `izzeuqbj47td`
   - Click "Add secret"

#### Secret 3: DEPLOY_PATH
   - **Name:** `DEPLOY_PATH`
   - **Value:** `/home/izzeuqbj47td/public_html/mmabconsultingandheathcare.com`
   - Click "Add secret"

### Step 3: Add SSH Public Key to Server

We need to add your SSH public key to the server's authorized keys:

```powershell
# Get your public key
Get-Content ~\.ssh\id_rsa.pub

# Copy the output, then SSH to server
ssh izzeuqbj47td@mmabconsultingandheathcare.com

# On the server, run:
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit
```

Replace `YOUR_PUBLIC_KEY_HERE` with the actual public key.

### Step 4: Test the Setup

1. **Make a small change** to any file (e.g., add a comment)
2. **Commit and push:**
   ```powershell
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```
3. **Watch the deployment:**
   - Go to: https://github.com/Nexasam/mmabb/actions
   - You should see a workflow running
   - Click on it to see the deployment progress

### Step 5: Verify Deployment

After the workflow completes (usually 2-3 minutes):
- Visit your live site: https://mmabconsultingandheathcare.com
- Your changes should be live!

## How It Works

```
Your Computer → Push to GitHub → GitHub Actions Triggers → Build Frontend → Deploy to GoDaddy → Live Site Updated
```

## GitHub Secrets Required

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `SSH_PRIVATE_KEY` | Your private key | For SSH authentication |
| `SSH_USER` | `izzeuqbj47td` | Server username |
| `DEPLOY_PATH` | `/home/izzeuqbj47td/public_html/mmabconsultingandheathcare.com` | Server path |

## Workflow File

The workflow is defined in `.github/workflows/deploy.yml`

**Triggers:**
- ✅ Automatic: When you push to `main` branch
- ✅ Manual: You can trigger it manually from GitHub Actions tab

**What it excludes from deployment:**
- ❌ `node_modules` (too large)
- ❌ `.git` (not needed on server)
- ❌ Cache files (will be regenerated)
- ❌ `.env` (keeps your server's environment config)
- ❌ `database.sqlite` (keeps your live database safe)

## Benefits

✅ **Automatic** - No manual deployment needed
✅ **Fast** - Deploy in 2-3 minutes
✅ **Consistent** - Same process every time
✅ **Safe** - Doesn't overwrite `.env` or database
✅ **Visible** - See deployment logs on GitHub

## Troubleshooting

### "Permission denied" error
- Make sure you added the SSH public key to server's `~/.ssh/authorized_keys`
- Check file permissions: `chmod 600 ~/.ssh/authorized_keys`

### "Secrets not found" error
- Verify you added all three secrets in GitHub
- Secret names are case-sensitive

### Build fails
- Check the build logs in GitHub Actions
- Make sure `package.json` dependencies are correct

### Deployment succeeds but changes not showing
- Clear your browser cache (Ctrl+Shift+R)
- Check if files were uploaded: SSH to server and verify timestamps

## Manual Trigger

You can also trigger deployment manually:
1. Go to: https://github.com/Nexasam/mmabb/actions
2. Click "Deploy to GoDaddy" workflow
3. Click "Run workflow"
4. Click the green "Run workflow" button

## Security Notes

🔒 **Your SSH private key is encrypted** in GitHub Secrets
🔒 **Only you can see the secrets** (not even collaborators)
🔒 **GitHub doesn't log secret values** in workflow output
🔒 **.env file is preserved** on the server (not overwritten)

## Next Steps After Setup

Once configured, your workflow will be:

```powershell
# 1. Make changes locally
code .

# 2. Commit changes
git add .
git commit -m "Add new feature"

# 3. Push (deployment happens automatically!)
git push origin main

# 4. Watch deployment progress
# Visit: https://github.com/Nexasam/mmabb/actions

# 5. Check live site in 2-3 minutes
# Visit: https://mmabconsultingandheathcare.com
```

That's it! No more manual deployment steps!
