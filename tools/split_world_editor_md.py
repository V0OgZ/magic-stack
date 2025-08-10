#!/usr/bin/env python3

import os
import re
import sys
from pathlib import Path


def slugify(text: str) -> str:
    text = text.strip().lower()
    # Replace accented characters
    accents = {
        ord("à"): "a", ord("â"): "a", ord("ä"): "a",
        ord("é"): "e", ord("è"): "e", ord("ê"): "e", ord("ë"): "e",
        ord("î"): "i", ord("ï"): "i",
        ord("ô"): "o", ord("ö"): "o",
        ord("ù"): "u", ord("û"): "u", ord("ü"): "u",
        ord("ç"): "c",
        ord("À"): "a", ord("Â"): "a", ord("Ä"): "a",
        ord("É"): "e", ord("È"): "e", ord("Ê"): "e", ord("Ë"): "e",
        ord("Î"): "i", ord("Ï"): "i",
        ord("Ô"): "o", ord("Ö"): "o",
        ord("Ù"): "u", ord("Û"): "u", ord("Ü"): "u",
        ord("Ç"): "c",
    }
    text = text.translate(accents)
    # Replace non-alphanumeric with hyphens
    text = re.sub(r"[^a-z0-9]+", "-", text)
    # Collapse multiple hyphens
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


def split_markdown_by_h1(md_content: str):
    sections = []
    current_title = None
    current_lines = []

    lines = md_content.splitlines()
    for line in lines:
        if line.startswith("# "):
            # Save previous section
            if current_title is not None:
                sections.append((current_title, "\n".join(current_lines).rstrip() + "\n"))
            current_title = line[2:].strip()
            current_lines = [line]
        else:
            if current_title is None:
                # Content before first H1 goes into a preface section
                current_title = "Preface"
                current_lines = ["# Preface", line]
            else:
                current_lines.append(line)

    if current_title is not None:
        sections.append((current_title, "\n".join(current_lines).rstrip() + "\n"))

    return sections


def write_sections(sections, out_dir: Path):
    out_dir.mkdir(parents=True, exist_ok=True)
    index_lines = ["# World Editor Documentation", "", "Generated from world-editor-spec.md", "", "## Sections", ""]
    written_files = []

    used_filenames = set()

    for idx, (title, content) in enumerate(sections, start=1):
        slug = slugify(title)
        if not slug:
            slug = f"section-{idx}"
        filename = f"{idx:02d}-{slug}.md"
        # Ensure uniqueness
        while filename in used_filenames:
            filename = f"{idx:02d}-{slug}-{len(used_filenames)}.md"
        used_filenames.add(filename)

        file_path = out_dir / filename
        file_path.write_text(content, encoding="utf-8")
        written_files.append((title, filename))

    # Build README index
    for title, filename in written_files:
        index_lines.append(f"- [{title}]({filename})")

    (out_dir / "README.md").write_text("\n".join(index_lines) + "\n", encoding="utf-8")

    return written_files


def main():
    if len(sys.argv) != 3:
        print("Usage: split_world_editor_md.py <input_md> <output_dir>")
        sys.exit(1)

    input_md = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])

    if not input_md.exists():
        print(f"Input file not found: {input_md}")
        sys.exit(2)

    md_content = input_md.read_text(encoding="utf-8")
    sections = split_markdown_by_h1(md_content)
    if not sections:
        print("No sections found (H1 headings)")
        sys.exit(3)

    written = write_sections(sections, output_dir)
    print(f"Written {len(written)} sections to {output_dir}")
    for title, filename in written:
        print(f" - {filename}: {title}")


if __name__ == "__main__":
    main()


