// Same-origin, optional metadata only. Download links work without JavaScript.
fetch("downloads.json")
  .then(response => response.ok ? response.json() : Promise.reject())
  .then(metadata => {
    for (const platform of ["extension", "macos", "windows"]) {
      const bytes = metadata.assets?.[platform]?.bytes;
      if (!Number.isSafeInteger(bytes) || bytes <= 0) continue;
      const label = document.querySelector(`[data-size="${platform}"]`);
      if (label) label.textContent = bytes < 1048576 ? `${Math.ceil(bytes / 1024)} KiB` : `${(bytes / 1048576).toFixed(1)} MiB`;
    }
  })
  .catch(() => {});
