#!/bin/bash

echo "=== Git LFS Installation Guide ==="
echo ""
echo "Git LFS is required to handle large files in this repository."
echo ""

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📦 macOS detected. Install Git LFS with:"
    echo ""
    echo "  brew install git-lfs"
    echo ""
    echo "Or download from: https://git-lfs.github.com/"
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Linux detected. Install Git LFS with:"
    echo ""
    echo "  # Debian/Ubuntu:"
    echo "  sudo apt-get install git-lfs"
    echo ""
    echo "  # Fedora/RHEL:"
    echo "  sudo dnf install git-lfs"
    echo ""
    echo "  # Arch:"
    echo "  sudo pacman -S git-lfs"
    
else
    echo "Please visit https://git-lfs.github.com/ for installation instructions."
fi

echo ""
echo "After installation, run:"
echo ""
echo "  git lfs install"
echo "  git lfs pull"
echo ""
echo "This will set up Git LFS and download any large files."