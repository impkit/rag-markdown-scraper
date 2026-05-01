document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('scrapeBtn').innerText = chrome.i18n.getMessage("btnCopy");
});

document.getElementById('scrapeBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const status = document.getElementById('status');
  
  status.innerText = chrome.i18n.getMessage("statusParsing");

  try {
    // Внедряем библиотеки по очереди
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['libs/Readability.js', 'libs/turndown.js']
    });

    // Запускаем сам скрипт парсинга
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapePageLogic // функция описана ниже
    });

    const result = results[0].result;

    if (result.error) {
      status.innerText = "Error: " + result.error;
    } else {
      // Копируем в буфер обмена
      await navigator.clipboard.writeText(result.data);
      status.innerText = "Copied to clipboard!";

    const originalBtnText = document.getElementById('scrapeBtn').innerText;
    document.getElementById('scrapeBtn').innerText = "✓ Copied!";
    setTimeout(() => {
      document.getElementById('scrapeBtn').innerText = originalBtnText;
      status.innerText = "";
    }, 2000);



    }
  } catch (err) {
    status.innerText = "Fatal Error: " + err.message;
    console.error(err);
  }
});

// Логика парсинга, которая выполнится на странице
function scrapePageLogic() {
  try {
    // 1. Проверка наличия библиотек (на случай сбоя инжекта)
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

    // Функция для безопасной вставки в YAML
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

