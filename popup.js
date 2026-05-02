document.addEventListener('DOMContentLoaded', () => {

  const scrapeBtn = document.getElementById('scrapeBtn');
  const status = document.getElementById('status');

  if (scrapeBtn) {
    scrapeBtn.innerText = chrome.i18n.getMessage("btnCopy");
  }

  scrapeBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (status) {
      status.innerText = chrome.i18n.getMessage("statusParsing");
    }

    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['libs/Readability.js', 'libs/turndown.js']
      });

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapePageLogic
      });

      const result = results[0].result;

      if (result.error) {
        if (status) status.innerText = "Error: " + result.error;
      } else {
        await navigator.clipboard.writeText(result.data);
        
        if (status) status.innerText = "Copied to clipboard!";

        const originalBtnText = scrapeBtn.innerText;
        scrapeBtn.innerText = "✓ Copied!";
        
        setTimeout(() => {
          scrapeBtn.innerText = originalBtnText;
          if (status) status.innerText = "";
        }, 2000);
      }
    } catch (err) {
      if (status) status.innerText = "Fatal Error: " + err.message;
      console.error(err);
    }
  });
});

function scrapePageLogic() {
  try {
    if (typeof Readability === 'undefined' || typeof TurndownService === 'undefined') {
      return { error: "Libraries not loaded. Please refresh the page." };
    }

    const documentClone = document.cloneNode(true);
    const article = new Readability(documentClone).parse();

    if (!article) return { error: "Could not identify main content" };

    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      hr: '---'
    });

    const markdown = turndownService.turndown(article.content);
    const escapeYaml = (str) => `"${(str || '').replace(/"/g, '\\"')}"`;

    const data = [
      `---`,
      `title: ${escapeYaml(article.title)}`,
      `url: ${window.location.href}`,
      `site_name: ${escapeYaml(article.siteName || new URL(window.location.href).hostname)}`,
      `excerpt: ${escapeYaml(article.excerpt)}`,
      `scraped_at: ${new Date().toISOString()}`,
      `length: ${article.length}`,
      `---`,
      ``,
      `# ${article.title}`,
      ``,
      markdown
    ].join('\n');

    return { data };
  } catch (e) {
    return { error: e.message };
  }
}
