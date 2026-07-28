# Git Workflow with SSH

## ✅ Setup Complete!

Your GitHub SSH authentication is now configured and working perfectly!
**Automatic deployment is also enabled!** 🚀

### What was done:
- ✅ Switched from HTTPS to SSH authentication
- ✅ Connected to GitHub repository: `Nexasam/mmabb`
- ✅ Successfully pushed recent changes (favicon & video updates)
- ✅ Added deployment artifacts to `.gitignore`

## Daily Git Workflow

### 1. Check Status
```powershell
git status
```
Shows what files have changed.

### 2. Add Changes
```powershell
# Add specific files
git add filename.php

# Add all changes
git add .

# Add specific directory
git add resources/views/
```

### 3. Commit Changes
```powershell
git commit -m "Your descriptive message here"
```

**Good commit messages:**
- ✅ "Fix login validation bug"
- ✅ "Add user management page to admin"
- ✅ "Update favicon and video on homepage"

**Bad commit messages:**
- ❌ "fix"
- ❌ "changes"
- ❌ "update"

### 4. Push to GitHub
```powershell
git push origin main
```
**No password needed!** SSH handles authentication automatically.

### 5. Pull Latest Changes
```powershell
git pull origin main
```
Gets the latest code from GitHub.

## Common Commands

### View Commit History
```powershell
git log --oneline -10
```
Shows last 10 commits.

### Undo Last Commit (Keep Changes)
```powershell
git reset --soft HEAD~1
```

### Discard Local Changes
```powershell
# Discard specific file
git restore filename.php

# Discard all changes
git restore .
```

### Create New Branch
```powershell
git checkout -b feature-name
```

### Switch Branches
```powershell
git checkout main
git checkout feature-name
```

### See Differences
```powershell
# See what changed
git diff

# See what's staged
git diff --staged
```

## Quick Workflow Example

```powershell
# Make some changes to your code...

# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Add new feature"

# Push to GitHub
git push origin main
```

## Benefits of SSH

✅ **No passwords** - Push/pull without entering credentials
✅ **More secure** - Uses cryptographic keys
✅ **Faster** - No need to authenticate each time
✅ **Seamless** - Works across all Git operations

## Repository Info

- **GitHub URL:** https://github.com/Nexasam/mmabb
- **SSH Remote:** `git@github.com:Nexasam/mmabb.git`
- **Branch:** `main`

## Troubleshooting

### "Permission denied" error
```powershell
# Test SSH connection
ssh -T git@github.com

# Should see: "Hi Nexasam! You've successfully authenticated..."
```

### "Remote rejected" error
Someone else pushed changes. Pull first:
```powershell
git pull origin main
git push origin main
```

### Merge conflicts
```powershell
# Pull latest
git pull origin main

# Fix conflicts in files
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

## Recent Changes Pushed

Your latest commits include:
1. ✅ Favicon updated to use logo.webp
2. ✅ YouTube video changed to healthcare content
3. ✅ Production build assets rebuilt
4. ✅ GitHub SSH setup documentation added
5. ✅ Deployment artifacts added to .gitignore

## Next Steps

You can now:
- Make code changes locally
- Commit and push without passwords
- Collaborate with team members via GitHub
- Set up GitHub Actions for automated deployments (optional)

---

**Need help?** Check out the official [GitHub SSH documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
