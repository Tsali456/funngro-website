// Funngro Revamp – minimal vanilla JS
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var list = document.getElementById('nav-list');
  if (toggle && list) {
    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && list.classList.contains('open')) { toggle.click(); toggle.focus(); }
    });
    list.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && list.classList.contains('open')) toggle.click();
    });
  }
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Company page: build a project brief the visitor can copy. Nothing is sent anywhere.
  var form = document.getElementById('brief-form');
  if (!form) return;
  var status = document.getElementById('brief-status');
  var out = document.getElementById('brief-output');
  function setErr(id, msg) { document.getElementById(id + '-err').textContent = msg; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    ['name', 'email', 'title', 'details'].forEach(function (k) { setErr(k, ''); });
    if (!f.name.value.trim()) { setErr('name', 'Enter your name.'); ok = false; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value)) { setErr('email', 'Enter a valid work email.'); ok = false; }
    if (!f.title.value.trim()) { setErr('title', 'Give the project a short title.'); ok = false; }
    if (f.details.value.trim().length < 20) { setErr('details', 'Describe the project in at least 20 characters.'); ok = false; }
    if (!ok) { status.textContent = 'Fix the highlighted fields and try again.'; return; }
    var text = 'Project brief\nContact: ' + f.name.value.trim() + ' <' + f.email.value.trim() + '>' +
      (f.org.value.trim() ? '\nCompany: ' + f.org.value.trim() : '') +
      '\nProject: ' + f.title.value.trim() + '\nType: ' + f.type.value + '\nDetails: ' + f.details.value.trim();
    out.value = text;
    out.hidden = false;
    document.getElementById('brief-actions').hidden = false;
    status.textContent = 'Brief ready. Copy it, then post it through Funngro.';
  });
  document.getElementById('copy-brief').addEventListener('click', function () {
    out.select();
    var done = function () { status.textContent = 'Brief copied to clipboard.'; };
    if (navigator.clipboard) navigator.clipboard.writeText(out.value).then(done, function () { document.execCommand('copy'); done(); });
    else { document.execCommand('copy'); done(); }
  });
})();
