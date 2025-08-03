#!/usr/bin/env python3
"""
Magic Stack - Universal Magic System
Setup configuration for PyPI distribution
"""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="magic-stack",
    version="1.0.0",
    author="Avalon Institute",
    author_email="magic@avalon.dev",
    description="A universal magic system for game development",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/avalon-institute/magic-stack",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Topic :: Games/Entertainment",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
    python_requires=">=3.8",
    install_requires=[
        "numpy>=1.19.0",
        "scipy>=1.5.0",
    ],
    extras_require={
        "dev": ["pytest>=6.0", "black", "flake8"],
        "pathfinding": ["networkx>=2.5"],
        "visualization": ["matplotlib>=3.3.0"],
    },
    include_package_data=True,
    package_data={
        "magic_stack": ["core/grammar.json"],
    },
)