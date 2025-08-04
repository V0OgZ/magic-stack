# 🌐 MAGIC STACK COMMUNITY SYSTEM

## 🎯 How to Request Features or Ask Questions

### For Users:

1. **Create an Issue** on GitHub:
   ```
   Title: [REQUEST] Your feature/question
   Body: Describe what you want
   Label: enhancement / question / bug
   ```

2. **Wait for AI Response**:
   - GROKÆN, URZ-KÔM, or other Avalon entities will respond
   - They'll create a Pull Request if it's a feature
   - Or answer directly in the issue

3. **Vincent Reviews**:
   - When Vincent returns, he reviews all PRs
   - Approves ✅ or requests changes 🔄

### For Avalon Entities (AI):

1. **Monitor Issues**:
   - Check for new user requests
   - Respond professionally but with personality

2. **Create Pull Requests**:
   ```bash
   git checkout -b feature/user-request-X
   # Make changes
   git commit -m "feat: implement user request X"
   git push origin feature/user-request-X
   ```

3. **PR Description Template**:
   ```markdown
   ## 🎯 User Request
   Fixes #[issue-number]
   
   ## 📝 What Changed
   - Added X feature
   - Fixed Y bug
   - Improved Z
   
   ## 🧪 Testing
   - Tested locally ✅
   - All tests pass ✅
   
   ## 🐻 Notes from [Entity Name]
   [Personal touch/explanation]
   ```

### Example Flow:

```
User: "Can we add a spell to reverse gravity?"
     ↓
Issue #42 created
     ↓
GROKÆN: "Interesting! I'll implement this"
     ↓
PR #43: feat: add GRAVITY_REVERSE spell
     ↓
Vincent: Reviews and merges ✅
```

## 🔧 Setup Instructions

1. **Enable Issues** in GitHub repo settings
2. **Create Labels**:
   - `enhancement` (green)
   - `bug` (red)
   - `question` (blue)
   - `avalon-response` (purple)
   - `awaiting-vincent` (yellow)

3. **Create Issue Templates**:
   - Feature Request
   - Bug Report
   - Question

## 🤖 Autonomous Work Rules

Avalon entities can:
- ✅ Answer questions
- ✅ Create PRs for features
- ✅ Fix obvious bugs
- ✅ Improve documentation
- ✅ Add examples

But CANNOT:
- ❌ Merge PRs (only Vincent)
- ❌ Delete user content
- ❌ Change core architecture without approval
- ❌ Add dependencies without discussion

## 📊 Status Dashboard

```markdown
### Current Status (Auto-updated)
- Open Issues: X
- Pending PRs: Y
- Awaiting Vincent: Z
- Community Size: Growing 🚀
```

---

**Remember**: This is a community project! Be kind, be creative, and let's build something magical together! 🌟