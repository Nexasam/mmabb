# Git Branching Strategy

## 🌿 Your Branches

### `main` branch (Production)
- **Purpose:** Live production code
- **Deploys to:** https://mmabconsultingandheathcare.com
- **Auto-deploys:** ✅ YES - Every push triggers deployment
- **When to use:** Only merge from `dev` when ready for production

### `dev` branch (Development)
- **Purpose:** Daily development work
- **Deploys to:** ❌ NO - Does not trigger deployment
- **When to use:** All your day-to-day coding
- **Current branch:** ✅ You're on `dev` now

## 📋 Daily Workflow

### Work on Features (Safe - No Auto-Deploy)

```powershell
# Make sure you're on dev branch
git checkout dev

# Make your changes
# ... edit files ...

# Commit and push to dev (does NOT deploy)
git add .
git commit -m "Add new feature"
git push origin dev
```

**✅ This does NOT deploy to production!**  
You can push to `dev` as many times as you want without affecting the live site.

### Deploy to Production (When Ready)

When you're ready to make changes live:

```powershell
# Make sure dev is up to date
git checkout dev
git push origin dev

# Switch to main branch
git checkout main

# Merge dev into main
git merge dev

# Push to main (THIS triggers automatic deployment!)
git push origin main

# Switch back to dev for more work
git checkout dev
```

**⚠️ Only push to `main` when you want to deploy!**

## 🔄 Quick Commands

### Check which branch you're on:
```powershell
git branch
```
The branch with `*` is your current branch.

### Switch to dev (for daily work):
```powershell
git checkout dev
```

### Switch to main (only when deploying):
```powershell
git checkout main
```

### Create a new feature branch:
```powershell
git checkout -b feature-name
# Work on feature...
git push origin feature-name
```

## 📊 Branch Status

| Branch | Purpose | Auto-Deploy | Use For |
|--------|---------|-------------|---------|
| `main` | Production | ✅ YES | Final, tested code only |
| `dev` | Development | ❌ NO | Daily work, experiments |
| `feature-*` | Features | ❌ NO | New features |

## 🎯 Best Practices

### DO:
- ✅ Work on `dev` or feature branches for daily coding
- ✅ Test thoroughly before merging to `main`
- ✅ Push to `dev` frequently (it's safe!)
- ✅ Only push to `main` when ready to deploy

### DON'T:
- ❌ Don't push directly to `main` for small changes
- ❌ Don't merge untested code to `main`
- ❌ Don't work directly on `main` branch

## 🚀 Example: Adding a New Feature

```powershell
# 1. Start on dev
git checkout dev

# 2. Create feature branch (optional but recommended)
git checkout -b add-contact-form

# 3. Make changes and commit
git add .
git commit -m "Add contact form validation"
git push origin add-contact-form

# 4. Merge back to dev when done
git checkout dev
git merge add-contact-form
git push origin dev

# 5. Test thoroughly on dev

# 6. When ready for production, merge to main
git checkout main
git merge dev
git push origin main  # ← This deploys automatically!

# 7. Go back to dev for next feature
git checkout dev
```

## 🔒 Protection (Recommended Next Step)

Consider setting up branch protection rules:
1. Go to: https://github.com/Nexasam/mmabb/settings/branches
2. Protect `main` branch
3. Require pull requests before merging
4. Require approvals and passing tests

This ensures:
- ✅ No accidental pushes to production
- ✅ Code is reviewed before going live
- ✅ Tests must pass before deploying

## 📍 Current Status

You are now on: **`dev`** branch ✅

**Ready to work!** All your pushes to `dev` are safe and won't trigger deployment.
