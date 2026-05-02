# ◈ RAG Markdown Scraper by ImpKit

**Extract clean, LLM-ready data from any webpage in one click.**

RAG Markdown Scraper is a focused, lightweight browser extension designed for AI engineers, data scientists, and RAG (Retrieval-Augmented Generation) developers. It strips away the web's "noise" and delivers structured Markdown with rich YAML metadata.

---

## 📸 Visual Demo

<details>
  <summary>Click to view Visual Demo (Screenshots)</summary>

### 1. Identify the target content
![Source Page](./assets/01_context.png)

### 2. Run the Scraper (One-click)
![Extension Popup](./assets/02_interface.png)

### 3. Get Structured Markdown + YAML
![Resulting Markdown](./assets/03_output.png)

</details>

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

Install the extension manually in developer mode:

1. **Download** this repository as a ZIP and extract it.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** (toggle in the top right).
4. Click **"Load unpacked"** and select the folder where you extracted the files.

## 🛠 Tech Stack

- **Manifest V3** (Chrome Extension API)
- [Readability.js](https://github.com/mozilla/readability) — Content extraction engine by Mozilla.
- [Turndown.js](https://github.com/mixmark-io/turndown) — HTML to Markdown conversion.

---

## ❤️ Support & Community

ImpKit creates atomic, high-utility tools for the AI ecosystem. If this scraper saved you LLM tokens or manual cleanup, feel free to support our development:

- **Solana (SOL):** `4tEi58Phj4VMFn1u3R9ojfLEPz7CbZHtGdmXxsHR17rV`
- **USDT (TRC-20):** `TT5yhYk9tFeazFSBbVxYBofAf1wyMarMBu`

---

- **Feedback:** Found a bug? Have a feature request? Please [open an Issue](https://github.com).
- **Support:** If you are not into crypto, simply **Star ⭐** this repository. Every star helps us grow!
- **Roadmap:** Pro version with batch export and custom YAML templates is in development.

## 📬 Contact

Reach us at **impkit.dev@gmail.com** for inquiries or collaboration.

---
*Built with atomic precision by ImpKit Labs.*
