---
description: Automatically stage, commit, and push major updates and design/code milestones to GitHub repository
---

# GitHub Auto-Sync Rule

- **Target Repository:** `https://github.com/aswin1237/task-manager-app-beta`
- **Default Branch:** `main`
- **Git Binary Location:** `C:\Users\aswin\AppData\Local\Programs\Git\cmd\git.exe`

## Workflow Trigger
Whenever a major update, design revision, milestone, or batch of file changes is completed in this workspace:
1. Stage all relevant workspace files:
   ```powershell
   & "C:\Users\aswin\AppData\Local\Programs\Git\cmd\git.exe" add -A
   ```
2. Commit with a clear, descriptive message summarizing the changes:
   ```powershell
   & "C:\Users\aswin\AppData\Local\Programs\Git\cmd\git.exe" commit -m "<descriptive message>"
   ```
3. Push changes directly to the remote repository:
   ```powershell
   & "C:\Users\aswin\AppData\Local\Programs\Git\cmd\git.exe" push origin main
   ```
4. Confirm to the user that changes are live on their GitHub repo with a link.
