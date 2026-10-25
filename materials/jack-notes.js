// Shows Jack's own notes (Markdown files in the jack/ folder) inside a page.
// Usage: <div class="jack-notes" data-file="workshop-log.md"></div>
// A small built-in Markdown reader: headings, lists, [ ] tick boxes, bold,
// italics, links, images, `code` and --- lines. HTML is shown as plain text.
(function () {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // Web links pass through; a file name like photos/fan.jpg points into the jack/ folder.
  const safeUrl = u => /^https?:/i.test(u) ? u : /^[\w\-\/.]+$/.test(u) && !u.includes('..') ? '../jack/' + u : '#';
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, a, u) => '<img alt="' + a + '" src="' + safeUrl(u) + '" loading="lazy">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => '<a href="' + safeUrl(u) + '" target="_blank" rel="noopener">' + t + '</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*\w])[*_]([^*_]+)[*_](?=[^*\w]|$)/g, '$1<em>$2</em>');
  }
  function render(md) {
    const out = []; let list = null, para = [];
    const flush = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
    const close = () => { if (list) { out.push('</' + list + '>'); list = null; } };
    for (const raw of md.replace(/\r/g, '').replace(/<!--[\s\S]*?-->/g, '').split('\n')) {
      const line = raw.trim();
      let m;
      if (!line) { flush(); close(); continue; }
      if ((m = line.match(/^(#{1,4})\s+(.*)/))) { flush(); close(); const n = Math.min(m[1].length + 1, 4); out.push('<h' + n + '>' + inline(m[2]) + '</h' + n + '>'); continue; }
      if (/^(-{3,}|\*{3,})$/.test(line)) { flush(); close(); out.push('<hr>'); continue; }
      if ((m = line.match(/^([-*]|\d+\.)(?:\s+(.*)|$)/))) {
        flush(); const t = /\d/.test(m[1]) ? 'ol' : 'ul';
        if (list !== t) { close(); out.push('<' + t + '>'); list = t; }
        let item = m[2] || '', box = item.match(/^\[( |x|X)\]\s*(.*)/);
        if (box) item = '<span class="tick">' + (box[1] === ' ' ? '☐' : '☑') + '</span> ' + inline(box[2]);
        else item = inline(item);
        out.push('<li>' + item + '</li>'); continue;
      }
      close(); para.push(line);
    }
    flush(); close();
    return out.join('\n');
  }
  document.querySelectorAll('.jack-notes[data-file]').forEach(el => {
    const f = el.dataset.file;
    fetch('../jack/' + f, { cache: 'no-store' })
      .then(r => { if (!r.ok) throw 0; return r.text(); })
      .then(t => { el.innerHTML = render(t); })
      .catch(() => { el.innerHTML = '<p class="dim">Couldn\'t load your notes just now. Check you\'re online and try again.</p>'; });
  });
})();
