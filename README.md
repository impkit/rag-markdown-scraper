# ◈ RAG Markdown Scraper by ImpKit

**Extract clean, LLM-ready data from any webpage in one click.**

RAG Markdown Scraper is a focused, lightweight browser extension designed for AI engineers, data scientists, and RAG (Retrieval-Augmented Generation) developers. It strips away the web's "noise" and delivers structured Markdown with rich YAML metadata.

---

## ✨ Key Features

- **Noise-Free Extraction:** Powered by Mozilla's Readability engine to remove ads, sidebars, and menus.
- **RAG-Native Metadata:** Automatically generates a YAML frontmatter block with:
  - `title`: Page title (YAML-escaped)
  - `url`: Direct source link
  - `site_name`: Domain or site title
  - `excerpt`: Short summary/description
  - `scraped_at`: ISO 8601 timestamp
  - `length`: Content character count
- **Privacy First:** 100% client-side processing. Your data never leaves your machine.
- **Atomic & Fast:** No bloat, no complex UI. Just the data you need for your LLM context.

## 🚀 How to Install (Early Access)

Since we are in the "Early Imp" stage, you can install the extension manually in developer mode:

1. **Download** this repository as a ZIP and extract it.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** (toggle in the top right).
4. Click **"Load unpacked"** and select the folder where you extracted the files.

## 🛠 Tech Stack

- **Manifest V3** (Chrome Extension API)
- [Readability.js](https://github.com) - Content extraction.
- [Turndown.js](https://github.com) - HTML to Markdown conversion.

---

## ❤️ Support & Community

This is a "Project of the Day" by **ImpKit**. We are currently focused on improving the tool and gathering feedback.

- **Feedback:** Found a bug? Have a feature request? Please [open an Issue](https://github.com).
- **Support:** If you like what we're building, simply **Star ⭐** this repository. It helps our imps work harder!
- **Future Updates:** Payment gateways and a Pro version are coming soon. Follow this repo to stay tuned.

## 📬 Contact

Reach us at **impkit.dev@gmail.com** for inquiries or collaboration.

---
*Built with atomic precision by ImpKit Labs.*
