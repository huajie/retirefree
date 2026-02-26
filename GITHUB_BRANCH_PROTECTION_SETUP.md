# GitHub Branch Protection Setup

## Quick Setup (5 minutes)

1. Go to https://github.com/[your-username]/retirefree/settings/branches

2. Click **"Add branch protection rule"**

3. **Branch name pattern**: `main`

4. **Enable these settings**:

   ✅ **Require a pull request before merging**
   - Required approvals: 1
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (if you add a CODEOWNERS file later)

   ✅ **Require status checks to pass before merging**
   - ✅ Require branches to be up to date before merging
   - Search for and add: `security` (from the security-checks.yml workflow)

   ✅ **Require conversation resolution before merging**

   ✅ **Do not allow bypassing the above settings**
   - This ensures even admins follow the rules

5. Click **"Create"**

## What This Does

- ✅ Prevents direct commits to main branch
- ✅ Forces code review via pull requests
- ✅ Ensures security checks pass before merge
- ✅ Creates audit trail of all code changes
- ✅ Satisfies Plaid security question #11

## For Solo Development

Even as a solo developer, this workflow helps:
1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit
3. Push: `git push origin feature/my-feature`
4. Create PR in GitHub
5. Security checks run automatically
6. Self-review (yes, review your own code!)
7. Merge PR

This creates a paper trail for Plaid audits.

## Exception: Hotfixes

If you need emergency access (production is down), you can temporarily disable protection:
1. Go to branch settings
2. Edit the rule
3. Uncheck "Do not allow bypassing"
4. Make your fix
5. Re-enable immediately after

But document why in the commit message!
