# Git & GitHub Guide

This guide explains how to initialize your repository and keep it updated with new changes.

## 1. Initial Setup (First Time Only)

If you haven't uploaded your project to GitHub yet, follow these steps:

1.  **Install Git**: Download and install from [git-scm.com](https://git-scm.com/download/win).
2.  **Create GitHub Repo**: Go to [github.com/new](https://github.com/new) and create a new repository (name it `verijoin`). Do **not** initialize with a README.
3.  **Run Commands**: Open your terminal in the project folder and run:
    ```powershell
    git init
    git add .
    git commit -m "initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

## 2. How to Update Changes (ongoing)

Whenever you make new changes (like the **Profile Name** and **Logout** features) and want to save them to GitHub, run:

```powershell
# 1. Prepare changes
git add .

# 2. Record changes with a message
git commit -m "added profile name and logout features"

# 3. Upload to GitHub
git push
```

---
**Tip**: Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual info from your GitHub repository URL.
