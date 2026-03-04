# Claude Code Hooks — DLS-Lead

Claude Code hooks let you run scripts automatically before/after certain events.
Place this in `.claude/settings.json` under the "hooks" key.

## Recommended Hooks

### 1. Post-file-edit: Lint component CSS for token violations

Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Create",
        "command": "node .claude/hooks/lint-tokens.mjs \"$FILE_PATH\"",
        "timeout": 5000
      }
    ]
  }
}
```

### 2. Pre-commit: Validate no primitive leaks

```json
{
  "hooks": {
    "PreCommit": [
      {
        "command": "node .claude/hooks/lint-tokens.mjs --all",
        "timeout": 10000
      }
    ]
  }
}
```

## How hooks work in Claude Code

Hooks fire on events: `PreToolUse`, `PostToolUse`, `Notification`, `Stop`, `SubagentStop`.
Each hook has:
- `matcher` — regex matching tool name (Edit, Create, Bash, etc.)
- `command` — shell command to run
- `timeout` — max ms

If hook exits non-zero, Claude sees the stderr and can fix the issue automatically.
