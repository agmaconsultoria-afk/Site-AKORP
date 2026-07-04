---
name: Pushing the workspace to GitHub
description: Why shell git push fails and the only reliable way to push a Replit workspace to a user's GitHub
---

# Pushing this workspace to a user's GitHub

**Rule:** You cannot push the workspace to a user's GitHub from the shell/backend.
The only reliable path is the Replit **Git pane** button (main Git view →
"Push branch as 'origin/main'"), which the user must click.

**Why:**
- Shell `git push` fails with `remote: Invalid username or token. Password
  authentication is not supported for Git operations` — the shell has no GitHub
  credentials and no credential helper configured.
- `listConnections('github')` returns 0: the GitHub Git-provider connection is
  Replit-managed (not an OpenInt connector), so there is no access token you can
  fetch via the connectors SDK/code_execution.
- The Git pane authenticates via the user's connected GitHub account (browser
  session), which is a different, working auth path.

**How to apply:**
- Guide the user to the Replit Git pane (not the github.com website, not shell
  commands). The main Git view shows a wide "Push branch as 'origin/main'" bar
  when there are unpushed commits; after a successful push it changes to a
  "Remote Updates" view with Sync/Pull and a greyed-out Push.
- Replit auto-creates the remote repo named after the project (e.g. project
  "Site AKORP" → repo `Site-AKORP`) and sets it as `origin`. Don't assume a repo
  the user created manually is the one wired up — check `git remote -v`.
- Verify success objectively (read-only, works even without push creds if repo is
  readable): `git ls-remote --heads origin` should list `refs/heads/main`, and
  `git log origin/main -1` should match local HEAD.
