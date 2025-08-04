# 🚀 Getting Started with Magic Stack - The Easy Way

**Time to read**: 5 minutes  
**Difficulty**: Beginner friendly  
**What you'll build**: Your first magic spell API

---

## 📦 What You Need

- Java 17+ (check with `java -version`)
- Maven (check with `mvn -version`)
- A text editor
- 5 minutes of your time

---

## 🎯 Quick Start in 3 Steps

### Step 1: Clone & Enter
```bash
git clone https://github.com/yourusername/magic-stack.git
cd magic-stack
```

### Step 2: Start the Backend
```bash
cd backends/java
mvn spring-boot:run
```

You should see:
```
🌀 MAGIC STACK STARTING...
📜 869 Magic Formulas Loading...
✅ Magic Stack Ready on http://localhost:8080
```

### Step 3: Cast Your First Spell
```bash
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"spell": "LIGHT", "power": 5}'
```

**Response**:
```json
{
  "result": "A warm light appears",
  "coordinates": {"x": 0, "y": 0, "z": 0, "t": 0, "c": 1.0, "psi": 1.0},
  "success": true
}
```

🎉 **Congrats! You just cast your first spell!**

---

## 🔮 What's Next?

1. **Explore the spells**: Check `/api/magic/list` for all 869 formulas
2. **Read the docs**: [6D System Explained](6D_SYSTEM_EXPLAINED.md)
3. **Build something**: Create your own magical game!

---

## 🤝 Need Help?

- **Discord**: discord.gg/magicstack (coming soon)
- **Issues**: github.com/magicstack/issues
- **Email**: hello@magicstack.dev

Remember: Magic is meant to be fun! Don't overthink it 🌟