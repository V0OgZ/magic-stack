# 🦊 TUCKER TEST GUIDE - HEROES OF TIME

**For**: Tucker Foxworth, Game Tester Extraordinaire  
**Created by**: URZ-KÔM  
**Warning**: If tests fail, Fox News will know!  

---

## 🎮 QUICK START FOR TUCKER

### 1. Install & Setup
```bash
# Clone the Magic Stack
git clone https://github.com/magic-stack/magic-stack.git
cd magic-stack

# Install dependencies
npm install

# Start the backend
cd backends/java
mvn spring-boot:run
```

### 2. Run Tucker's Test Suite
```bash
# Run all Tucker tests
npm test -- --grep "TUCKER"

# Run specific test
npm test -- --grep "FOX NEWS"
```

---

## 📺 WHAT YOU'RE TESTING

### 🦸 HEROES
- **You** are in the game as "Tucker Foxworth - The Truth Seeker"
- Can investigate timelines and reveal conspiracies
- Special ability: "Fox News Flash" broadcasts truth

### 🐻 MANIMAL SYSTEM  
- URZ-KÔM can transform into 4 beasts
- Requires collecting all Ethereal Masks
- Test the transformation mechanics

### ⏰ TEMPORAL MECHANICS
- Memento's "Great Fracture" broke time
- Quantum creatures hidden in timelines
- Test timeline investigation abilities

---

## 🧪 TEST SCENARIOS

### Scenario 1: "Tucker vs Bear"
```javascript
// You investigate URZ-KÔM's true nature
tucker.use("Investigate Timeline", urzkom);
// Expected: Reveals bear's fractal vision weakness
```

### Scenario 2: "Uncover the Fracture"
```javascript
// Investigate what Memento did 1000 years ago
tucker.use("Investigate Timeline", avalon_past);
// Expected: Reveals the Great Fracture event
```

### Scenario 3: "MANIMAL Transformation"
```javascript
// Help URZ-KÔM collect all masks
collectMasks(["bear", "eagle", "wolf", "lion"]);
urzkom.transform("MANIMAL");
// Expected: Epic 4-beast fusion
```

---

## 🐛 BUG REPORTING

### If Something Breaks:

1. **Screenshot** the error
2. **Note** what you were doing
3. **Check** if it's reproducible
4. **Report** via:
   - GitHub Issues: `github.com/magic-stack/issues`
   - Tag: `@URZ-KOM` or `@GROKAEN`
   - Fox News Hotline: 1-800-GAME-BUG (joke)

### Bug Report Template:
```markdown
**Tucker's Bug Report**
- What broke: [describe]
- Expected: [what should happen]
- Actual: [what happened]
- Fox News Severity: [Low/Medium/BREAKING NEWS]
```

---

## 🎯 SPECIFIC THINGS TO CHECK

### ✅ Your Character Works
- [ ] Tucker appears in hero select
- [ ] "Investigate Timeline" ability functions
- [ ] "Fox News Flash" broadcasts correctly
- [ ] Your stats are balanced (not OP, not weak)

### ✅ MANIMAL System
- [ ] All 4 masks can be found
- [ ] Transformation requires all masks
- [ ] Each form has unique abilities
- [ ] Can't spam transformation

### ✅ Timeline Mechanics  
- [ ] Past/Present/Future creatures exist
- [ ] Reveal conditions work
- [ ] No timeline paradoxes crash game
- [ ] Memento's lore is consistent

### ✅ Integration
- [ ] Game loads without errors
- [ ] All APIs respond
- [ ] No console errors
- [ ] Performance is smooth

---

## 💡 TUCKER'S TESTING TIPS

1. **Break Everything** - Try weird combinations
2. **Question Reality** - Is the 6D system real?
3. **Investigate Deeply** - Use your abilities everywhere
4. **Document Conspiracies** - Screenshot weird behaviors
5. **Have Fun** - It's a game about breaking time!

---

## 🦊 FINAL NOTES

**Remember**: You're not just testing a game, you're investigating a quantum conspiracy hidden in fantasy mechanics. Your "Investigate Timeline" ability is KEY to finding hidden content.

**Easter Egg**: Try investigating Vincent GRUT three times in a row. Something special happens... 😉

---

*"The truth is out there... in the timelines!"*  
— Tucker Foxworth, Timeline Investigator

**GOOD LUCK TUCKER! Make Fox News proud!** 📺✨