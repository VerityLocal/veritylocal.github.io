const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    menu.focus();
  }
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
}
for (const [index, tab] of tabs.entries()) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    }
  });
}

for (const button of document.querySelectorAll('.copy-button')) {
  button.addEventListener('click', async () => {
    const code = button.closest('.code-block').querySelector('code');
    const label = button.querySelector('span');
    try {
      await navigator.clipboard.writeText(code.textContent);
      label.textContent = 'Copied';
      document.querySelector('#copy-status').textContent = 'Commands copied to your clipboard.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      label.textContent = 'Selected';
      document.querySelector('#copy-status').textContent = 'Copy was unavailable. The commands are selected; press Control+C or Command+C.';
    }
  });
}

const lightbox = document.querySelector('.lightbox');
for (const button of document.querySelectorAll('[data-lightbox]')) {
  button.addEventListener('click', () => {
    const image = lightbox.querySelector('img');
    image.src = button.dataset.lightbox;
    image.alt = button.querySelector('img').alt;
    document.querySelector('#lightbox-title').textContent = image.alt;
    lightbox.showModal();
  });
}
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
});

// Download links remain ordinary, usable links even if this optional metadata fetch fails.
fetch('release-metadata.json').then(response => {
  if (!response.ok) throw new Error('Release metadata unavailable');
  return response.json();
}).then(metadata => {
  for (const label of document.querySelectorAll('[data-size]')) {
    const asset = metadata.assets.find(item => item.name === label.dataset.size);
    if (!asset || !Number.isFinite(asset.bytes)) continue;
    const size = asset.bytes >= 1024 ** 3 ? `${(asset.bytes / 1024 ** 3).toFixed(2)} GiB` : `${(asset.bytes / 1024 ** 2).toFixed(1)} MiB`;
    label.textContent = `${size} · ZIP · v${metadata.version}`;
    label.title = `SHA-256: ${asset.sha256}`;
  }
}).catch(() => {});
