#!/usr/bin/env python3
"""Re-pack the self-contained index.html from the editable source.

index.html is a self-contained bundle: the `__bundler/manifest` block holds
every asset gzip+base64-encoded, and the `__bundler/template` block is the page
shell with each asset referenced by UUID. Editing the JSX in source/directions/
does nothing until those bytes are re-packed into the manifest — that's what
this does.

Scope: updates the two editable JSX entries (mime application/javascript) from
their matching files in source/directions/. It does NOT rebuild the shell,
fonts, or the React/Babel vendor bundles — those are unchanged from the
original bundler output. If you change source/BackOfficeLabs-Site-Throughput.html
(the shell) or the embedded fonts, you must re-run the original bundler instead.

Usage:  python3 build.py          # re-pack, verify round-trip, write index.html
"""
import re, json, base64, gzip, sys, os

ROOT = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(ROOT, "index.html")

# Match a decoded asset to its source file by the file's leading marker comment.
# Order matters: the more specific marker ("page sections") is checked first.
SOURCES = [
    ("page sections",          "source/directions/throughput-site-page.jsx"),
    ("// BackOfficeLabs",       "source/directions/throughput-site.jsx"),
]

MANIFEST_RE = re.compile(
    r'(<script type="__bundler/manifest">\s*)(.*?)(\s*</script>)', re.S)


def pick_source(head_text):
    for marker, path in SOURCES:
        if marker in head_text:
            return path
    return None


def main():
    html = open(INDEX, "r", encoding="utf-8").read()
    m = MANIFEST_RE.search(html)
    if not m:
        sys.exit("ERROR: could not find __bundler/manifest block in index.html")
    manifest = json.loads(m.group(2))

    updated = []
    for uuid, entry in manifest.items():
        if entry.get("mime") != "application/javascript":
            continue
        raw = base64.b64decode(entry["data"])
        if entry.get("compressed"):
            raw = gzip.decompress(raw)
        head = raw[:200].decode("utf-8", "replace")
        path = pick_source(head)
        if not path:
            print(f"  skip {uuid}: no matching source for head {head[:40]!r}")
            continue
        disk = open(os.path.join(ROOT, path), "rb").read()
        packed = gzip.compress(disk, mtime=0)
        entry["data"] = base64.b64encode(packed).decode("ascii")
        entry["compressed"] = True
        # round-trip check
        assert gzip.decompress(base64.b64decode(entry["data"])) == disk, path
        updated.append((path, len(disk)))

    if not updated:
        sys.exit("ERROR: no application/javascript entries updated")

    new_manifest = json.dumps(manifest, separators=(",", ":"), ensure_ascii=False)
    html = html[:m.start(2)] + new_manifest + html[m.end(2):]
    open(INDEX, "w", encoding="utf-8").write(html)

    print("Re-packed index.html:")
    for path, n in updated:
        print(f"  {path}  ({n:,} bytes)")


if __name__ == "__main__":
    main()
