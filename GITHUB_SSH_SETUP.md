# GitHub SSH Setup Guide

## Your SSH Public Key

Copy this key and add it to GitHub:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCsFxGZMnHe/njuo6s133sOSNJ/2JPaI5xAnn5Io5vsyf0QXWmWYPXRciPuMVc+Y9z5ktjtjYG1Ro2ugaYUnW+igkM9sQNlte47Va+WnHtAl4ZnnuPz6xfG1ID96zLH3c5OUnKur/2QA1hKeaRk2efh0V/Qfatpm4Q9LRNeEPvXKQ5Atog2jhMe6L2RJLe+UajbGJiS3ygRtJUYj53IOHDCvjBbiLohn0w1jRHPE/smJvp2HSPLonG1rBpMhwZWSpyIaP8eMmIh/XSh4IIGnEztkHNyjW/yd6fmjh/Xj0GwJvqa0fVwo9o6mI09hGIo/uz0ajzrHMoYqXEQ7ks17Wmsh6KT55M+f/E9jHjrEaX/cglmKv2M1FTIRgE9g82LjJpzCNsEaHbrnecNBbLdSiNlqz0IQ0MucK6fWRifx8nqnUNXWJLsBEWHCzbiQsm/anYG3zL/poTyh7uD3jTxIfd2lGQga3aopbquyDoWxCR0tEAtoYlRylOGJN7jA9iRZDLsoic/spkgDOnwO2jr69xbJWhqPMrKyzImVweEz8q/3DG92UV9kFnyR3u0nvij2X55ggBZZ/ytSY/sA3BJ8M7aPiolQOwNTpdRcXrc8MymeW/i3RYyhijJDCT6StgwenCvJXPRBDVXlXy3R59O+8i3SHAnGBnQeMg9rBTSY93/Uw== user@STARMIND
```

## Step 1: Add SSH Key to GitHub

1. **Go to GitHub SSH Settings:**
   - Visit: https://github.com/settings/keys
   - Or: GitHub → Settings → SSH and GPG keys

2. **Click "New SSH key"**

3. **Add your key:**
   - **Title:** `Windows PC - STARMIND`
   - **Key:** Paste the SSH key above (the entire line starting with `ssh-rsa`)
   - **Key type:** Authentication Key

4. **Click "Add SSH key"**

## Step 2: Switch Remote from HTTPS to SSH

After adding the key to GitHub, run this command:

```powershell
cd c:\Users\USER\mmabb
git remote set-url origin git@github.com:Nexasam/mmabb.git
```

## Step 3: Verify Connection

Test your SSH connection:

```powershell
ssh -T git@github.com
```

You should see:
```
Hi Nexasam! You've successfully authenticated, but GitHub does not provide shell access.
```

## Step 4: Test Push/Pull

Now you can use Git without entering your password:

```powershell
# Check status
git status

# Add files
git add .

# Commit
git commit -m "Update favicon and video"

# Push (no password needed!)
git push origin main
```

## Benefits of SSH over HTTPS

✅ No password prompts when pushing/pulling
✅ More secure authentication
✅ Works seamlessly with Git operations
✅ No need for personal access tokens

## Current Repository

- **Repository:** https://github.com/Nexasam/mmabb
- **HTTPS URL:** `https://github.com/Nexasam/mmabb.git`
- **SSH URL:** `git@github.com:Nexasam/mmabb.git`

## Troubleshooting

**If you get "Permission denied":**
1. Make sure you added the correct SSH key to GitHub
2. Check your SSH key is loaded: `ssh-add -l`
3. Test connection again: `ssh -T git@github.com`

**If SSH asks for a passphrase:**
- Your SSH key is protected with a passphrase (good for security!)
- Enter it when prompted
- You can use `ssh-agent` to remember it for your session

## Next Steps

After setting up SSH, you can:
1. Commit your recent changes (favicon, video updates)
2. Push to GitHub without password prompts
3. Set up GitHub Actions for automated deployments (optional)
