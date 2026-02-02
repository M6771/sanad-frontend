# Git Workflow Guide for Team Collaboration

## Step-by-Step Setup Process

### 1. Create a New Repository (if starting fresh)

If you're creating a new repository on GitHub/GitLab/Bitbucket:

```bash
# On GitHub/GitLab, create a new repository through the web interface
# Then initialize locally:
git init
git remote add origin <repository-url>
```

**Note:** Your repository is already initialized and connected to a remote.

---

### 2. Create Main Branch

The main branch is typically created automatically. Ensure you're on `main`:

```bash
# Check current branch
git branch

# If you need to rename 'master' to 'main' (if applicable)
git branch -M main

# Push main branch to remote
git push -u origin main
```

**Current Status:** You're already on `main` branch.

---

### 3. Create Branches for Each Team Member

Create a branch for each team member. Use a consistent naming convention:

```bash
# Option 1: Use team member names
git checkout -b feature/mohammad
git checkout -b feature/team-member-2
git checkout -b feature/team-member-3

# Option 2: Use GitHub usernames
git checkout -b dev/mohammadalsaeed
git checkout -b dev/username-2
git checkout -b dev/username-3

# Push each branch to remote
git push -u origin feature/mohammad
git push -u origin feature/team-member-2
git push -u origin feature/team-member-3
```

**Best Practice:** Use prefixes like `feature/`, `dev/`, or `task/` to organize branches.

---

### 4. Distribute Tasks

#### Option A: Using GitHub Issues/Project Board
1. Create issues for each task
2. Assign issues to team members
3. Link branches to issues (e.g., `feature/issue-123`)

#### Option B: Using a Task Management File
Create a `TASKS.md` file to track task distribution:

```markdown
## Task Distribution

### Mohammad
- [ ] Task 1: Implement authentication
- [ ] Task 2: Create login UI

### Team Member 2
- [ ] Task 3: Build dashboard
- [ ] Task 4: Add navigation

### Team Member 3
- [ ] Task 5: API integration
- [ ] Task 6: Testing
```

---

### 5. Once You Complete Something: Workflow

#### Daily Workflow for Each Team Member:

```bash
# 1. Start your day - switch to your branch
git checkout feature/your-name

# 2. Pull latest changes from main
git checkout main
git pull origin main
git checkout feature/your-name
git merge main  # or use: git rebase main

# 3. Work on your tasks
# ... make changes to files ...

# 4. Stage your changes
git add .

# 5. Commit with descriptive message
git commit -m "feat: add login functionality"

# 6. Push to your branch
git push origin feature/your-name

# 7. Create Pull Request (on GitHub/GitLab web interface)
# - Go to repository
# - Click "New Pull Request"
# - Select your branch → main
# - Add description and reviewers
# - Request review from team members
```

#### Commit Message Convention:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## Complete Workflow Example

### For Team Member Starting Work:

```bash
# 1. Clone repository (first time only)
git clone <repository-url>
cd Sanad-Capstone-Fronend

# 2. Switch to your branch
git checkout feature/your-name

# 3. Pull latest changes
git pull origin main
git merge main

# 4. Work on your task
# ... edit files ...

# 5. Commit changes
git add .
git commit -m "feat: implement user authentication"

# 6. Push to your branch
git push origin feature/your-name
```

### For Merging Completed Work:

```bash
# After Pull Request is approved:

# 1. Switch to main
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Merge the feature branch (or merge via GitHub PR)
git merge feature/your-name

# 4. Push to main
git push origin main

# 5. Update your feature branch
git checkout feature/your-name
git merge main
```

---

## Best Practices

1. **Always pull before pushing** to avoid conflicts
2. **Keep commits small and focused** - one feature/fix per commit
3. **Write clear commit messages** - describe what and why
4. **Create Pull Requests** for code review before merging to main
5. **Test before pushing** - ensure your code works
6. **Resolve conflicts early** - don't let them accumulate
7. **Keep branches up to date** - regularly merge main into your branch

---

## Handling Merge Conflicts

If you encounter conflicts:

```bash
# 1. Pull latest main
git checkout main
git pull origin main

# 2. Merge main into your branch
git checkout feature/your-name
git merge main

# 3. Resolve conflicts in your editor
# Look for <<<<<<< HEAD markers

# 4. After resolving, stage and commit
git add .
git commit -m "fix: resolve merge conflicts"

# 5. Push your changes
git push origin feature/your-name
```

---

## Quick Reference Commands

```bash
# Check status
git status

# See all branches
git branch -a

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b branch-name

# See commit history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename
```

---

## Team Member Setup Script

Run this once per team member:

```bash
# Replace 'your-name' with actual name
BRANCH_NAME="feature/your-name"

# Create and switch to your branch
git checkout -b $BRANCH_NAME

# Push branch to remote
git push -u origin $BRANCH_NAME

echo "Branch $BRANCH_NAME created and pushed successfully!"
```
