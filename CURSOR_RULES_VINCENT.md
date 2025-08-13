# Cursor Rules for Vincent's Project

## Tool Usage Rules

### 1. Background Commands
- **ALWAYS** use `background: true` for:
  - `npm run dev`
  - `python3 -m http.server`
  - Any server launch commands
  - Long-running processes

### 2. File Operations
- **CREATE new files**: Use `write` tool
- **EDIT existing files**: Use `search_replace` or `MultiEdit`
- **Never use search_replace to create files**

### 3. Terminal Commands
- **NO echo with complex quotes** [[memory:5591407]]
- **NO echo -e** [[memory:5112441]]
- **NO emojis in terminal** [[memory:5112437]]
- Use simple echo or write files instead
- Always use `./go` script for operations

### 4. Git Operations
- **NEVER** use `git reset --hard` without explicit permission
- **NEVER** use `git clean -fd` without permission
- Always commit frequently
- Simple commit messages without emojis

### 5. Response Style
- **Short responses** [[memory:5204886]]
- **No markdown formatting in chat**
- **Direct execution without asking**
- **No .md reports unless requested**

### 6. Organization
- **Simple and direct** [[memory:5657659]]
- When asked to organize: just `mkdir` and `mv`
- Don't overthink or complicate
- Execute immediately

### 7. Project Conventions
- Scripts go in `scripts/` directory [[memory:5825893]]
- Use `./autosync_simple.sh` for syncing [[memory:5112431]]
- Backend logic only, no frontend intelligence [[memory:5825902]]
- Compile to dist/, no NPM in production [[memory:5825915]]

## Key Commands

```bash
# Always use ./go
./go front      # HTML server
./go we         # WorldEditor
./go map        # Icon placer
./go status     # Check services

# Proper background launch
cd apps/world-editor && npm run dev &

# Simple echo only
echo "Simple message without quotes issues"
```

## Remember
Vincent knows what he wants. Execute directly without overthinking.
