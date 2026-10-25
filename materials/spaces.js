// Remembers ticked boxes on this device. If storage is blocked, the page still works.
document.querySelectorAll('input[type=checkbox][data-k]').forEach(cb => {
  const key = 'jackhub:' + location.pathname.split('/').pop() + ':' + cb.dataset.k;
  try { cb.checked = localStorage.getItem(key) === '1'; } catch (e) {}
  cb.addEventListener('change', () => { try { localStorage.setItem(key, cb.checked ? '1' : '0'); } catch (e) {} });
});
