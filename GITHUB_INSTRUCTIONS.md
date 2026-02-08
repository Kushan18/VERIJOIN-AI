# GitHub Upload Instructions

Follow these steps to upload your project to GitHub for the first time:

### 1. Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `verijoin-simulator`).
3. Keep it **Public** or **Private**.
4. **Do NOT** initialize with a README, license, or `.gitignore` (we already have them).
5. Click **Create repository**.

### 2. Initialize Git Locally
Open your terminal in the project directory (`c:\Users\kusha\OneDrive\Desktop\1`) and run:

```powershell
git init
```

### 3. Add Files and Commit
Run the following commands:

```powershell
git add .
git commit -m "initial commit: Interview Simulator with White Theme"
```

### 4. Link to GitHub and Push
Copy the commands from your GitHub repository's "Quick setup" page (the ones for "push an existing repository from the command line"):

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---
**Note**: Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub details.
