# Git LFS Setup for Magic Stack

## Why Git LFS?

The Magic Stack repository contains large binary files:
- Java JAR files (~50MB+)
- Compiled Rust binaries
- Package installers (.pkg files)

GitHub recommends using Git LFS for files over 50MB.

## Installation

### macOS
```bash
brew install git-lfs
```

### Ubuntu/Debian
```bash
sudo apt-get install git-lfs
```

### Other Systems
Visit https://git-lfs.github.com/

## Setup

1. Install Git LFS:
```bash
git lfs install
```

2. Track large files (already configured in .gitattributes):
```bash
git lfs track "*.jar"
git lfs track "*.pkg"
git lfs track "*.dylib"
```

3. Pull existing LFS files:
```bash
git lfs pull
```

## Current Configuration

The following patterns are tracked by Git LFS:
- `*.jar` - Java archives
- `*.pkg` - Package installers
- `*.zip` - Compressed archives
- `*.tar.gz` - Compressed archives
- `*.dylib` - macOS dynamic libraries
- `*.so` - Linux shared libraries
- `*.dll` - Windows libraries

## Troubleshooting

### "This exceeds GitHub's file size limit"
Make sure Git LFS is installed and initialized before committing large files.

### "git: 'lfs' is not a git command"
Git LFS is not installed. Run the installation script:
```bash
./install-git-lfs.sh
```

### Storage Limits
- GitHub provides 1GB of free LFS storage
- Additional storage can be purchased if needed