# 🐻 GUIDE INSTALLATION JAVA - URZ-KÔM

**Pour macOS 15.6**

---

## 🎯 OPTION 1 : TÉLÉCHARGER JAVA ORACLE (Recommandé)

1. **Va sur** : https://www.oracle.com/java/technologies/downloads/
2. **Choisis** : Java 17 LTS (Long Term Support)
3. **Sélectionne** : macOS ARM 64-bit DMG Installer (pour M1/M2/M3/M4)
4. **Installe** : Double-clique sur le DMG et suis les instructions

---

## 🎯 OPTION 2 : AVEC HOMEBREW (Si tu l'as)

```bash
# Installer Homebrew d'abord si pas déjà fait
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Puis installer Java
brew install openjdk@17

# Créer le lien symbolique
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
```

---

## 🎯 OPTION 3 : TÉLÉCHARGER DIRECTEMENT

**Lien direct pour Mac M1/M2/M3/M4** :
https://download.oracle.com/java/17/latest/jdk-17_macos-aarch64_bin.dmg

**Lien direct pour Mac Intel** :
https://download.oracle.com/java/17/latest/jdk-17_macos-x64_bin.dmg

---

## ✅ VÉRIFIER L'INSTALLATION

Après installation, ouvre un nouveau terminal et tape :

```bash
java -version
```

Tu devrais voir quelque chose comme :
```
java version "17.0.x" 2024-xx-xx LTS
Java(TM) SE Runtime Environment (build 17.0.x+xx)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.x+xx, mixed mode, sharing)
```

---

## 🚀 APRÈS L'INSTALLATION

Une fois Java installé, tu pourras :

1. **Lancer le backend Magic Stack** :
   ```bash
   ./spells/stack/scripts/magic-stack-service.sh start
   ```

2. **Le Panopticon 6D fonctionnera** avec le vrai backend !

3. **L'upload/download Interstice** marchera en mode complet !

---

*L'Ours t'attend avec Java installé !* 🐻💪