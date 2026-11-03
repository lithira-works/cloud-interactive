// ===== Cloud Interactive — app logic =====
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- theme ---------- */
const theme = store.get("theme", null);
if (theme) document.documentElement.dataset.theme = theme;
$("#themeBtn").onclick = () => {
  const cur = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = cur;
  store.set("theme", cur);
};

/* ---------- lecture rail + home grid (built from LECTURES) ---------- */
const LIDS = LECTURES.map(l => l.id);
$("#rail").innerHTML = LECTURES.map(l => `
  <a class="pill" href="#${l.id}" data-page="${l.id}" style="--c:var(--${l.id})" title="Lecture ${+l.n}: ${l.title}">
    <span class="pn">${l.n}</span><span class="pt"><b>${l.short}</b><small>Lecture ${+l.n}</small></span><i class="pp" data-pill="${l.id}"></i>
  </a>`).join("");
$("#lecGrid").innerHTML = LECTURES.map(l => `
  <a class="lec-card" href="#${l.id}" style="--c:var(--${l.id})">
    <span class="ic">${l.icon}</span>
    <div class="num">${l.n}</div>
    <h3>${l.title}</h3>
    <div class="tag">${l.tag}</div>
    <div class="bar"><i data-prog="${l.id}"></i></div><div class="bar-label" data-prog-label="${l.id}">0% learned</div>
  </a>`).join("");
$$(".rail-arrow").forEach(b => b.onclick = () => $("#rail").scrollBy({ left: b.dataset.dir * 360 }));

/* ---------- router ---------- */
function route() {
  const id = (location.hash || "#home").slice(1).split("-")[0];
  const page = $("#" + id) && $("#" + id).classList.contains("page") ? id : "home";
  $$(".page").forEach(p => p.classList.toggle("show", p.id === page));
  $$(".nav a, .pill").forEach(a => a.classList.toggle("active", a.dataset.page === page));
  const pill = $(`.pill[data-page="${page}"]`);
  if (pill) { const r = $("#rail"); r.scrollTo({ left: pill.offsetLeft - r.clientWidth / 2 + pill.clientWidth / 2 }); }
  if (page === "home") renderDash();
  if (page === "review") { paintBoxes(); $('[data-deck="review"]').reset(); }
  const target = location.hash.slice(1);
  const el = target.includes("-") && document.getElementById(target);
  setTimeout(() => { el ? el.scrollIntoView() : window.scrollTo(0, 0); onScroll(); }, 30);
}
window.addEventListener("hashchange", route);

/* ---------- study helpers: toast, confetti, daily streak ---------- */
const today = () => new Date().toISOString().slice(0, 10);
const addDays = (d, n) => { const t = new Date(d); t.setDate(t.getDate() + n); return t.toISOString().slice(0, 10); };
function toast(msg) {
  const t = $("#toast"); t.innerHTML = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2600);
}
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#22d3ee", "#a78bfa", "#f472b6"];
  for (let k = 0; k < 60; k++) {
    const c = document.createElement("i"); c.className = "confetti";
    c.style.cssText = `left:${Math.random() * 100}vw;background:${colors[k % colors.length]};animation-delay:${Math.random() * .4}s;transform:rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c); setTimeout(() => c.remove(), 2600);
  }
}
let days = store.get("days", []);
function touch() { const d = today(); if (!days.includes(d)) { days.push(d); store.set("days", days); } }
function streak() {
  let n = 0, d = today();
  if (!days.includes(d)) d = addDays(d, -1);
  while (days.includes(d)) { n++; d = addDays(d, -1); }
  return n;
}

/* ---------- progress + TOC ---------- */
let done = store.get("done", {});
function buildTOC() {
  LIDS.forEach(l => {
    const toc = $(`#${l} [data-toc]`);
    toc.innerHTML = "";
    $$(`#${l} .chapter`).forEach(ch => {
      const a = document.createElement("a");
      a.href = "#" + ch.id;
      a.textContent = ch.querySelector("h2").textContent.replace(/^[\d✓]+/, "").trim();
      a.className = done[ch.id] ? "done" : "";
      a.onclick = e => { e.preventDefault(); ch.scrollIntoView({ behavior: "smooth" }); };
      toc.appendChild(a);
    });
  });
}
const lecPct = l => { const chs = $$(`.chapter[data-ch="${l}"]`); return chs.length ? Math.round(chs.filter(c => done[c.id]).length / chs.length * 100) : 0; };
function updateProgress() {
  let all = 0, got = 0;
  LIDS.forEach(l => {
    const chs = $$(`.chapter[data-ch="${l}"]`);
    const n = chs.filter(c => done[c.id]).length;
    const pct = lecPct(l);
    all += chs.length; got += n;
    $(`[data-prog="${l}"]`).style.width = pct + "%";
    $(`[data-pill="${l}"]`).style.width = pct + "%";
    $(`[data-prog-label="${l}"]`).textContent = `${pct}% learned · ${n}/${chs.length} chapters`;
    const ring = $(`#${l} .ring`);
    if (ring) {
      ring.style.setProperty("--p", pct);
      ring.querySelector("b").textContent = pct + "%";
      const next = chs.find(c => !done[c.id]);
      const go = $(`#${l} [data-go]`);
      go.textContent = !n ? "▶ Start learning" : next ? "▶ Continue: chapter " + (chs.indexOf(next) + 1) : "🎉 All learned — take the quiz";
      go.dataset.go = next ? next.id : l + "-study";
    }
  });
  const p = all ? Math.round(got / all * 100) : 0;
  $("#overallBar").style.width = p + "%";
  $("#overallLbl").textContent = `${p}% of the course learned · ${got}/${all} chapters`;
  buildTOC();
}

/* lecture hero: stats, progress ring, start/continue + quiz buttons, prev/next lecture */
LECTURES.forEach((l, li) => {
  const sec = $("#" + l.id), head = $(".lec-head", sec);
  const nCh = $$(".chapter", sec).length;
  head.insertAdjacentHTML("beforeend", `
    <div class="hero-stats">
      <div class="ring" style="--p:0"><b>0%</b></div>
      <div class="hs"><b>${nCh}</b><small>chapters</small></div>
      <div class="hs"><b>${(QUIZ[l.id] || []).length}</b><small>quiz questions</small></div>
      <div class="hs"><b>${(CARDS[l.id] || []).length}</b><small>flashcards</small></div>
      <div class="hs"><b>~${nCh * 6}</b><small>minutes</small></div>
      <div class="hero-btns"><button class="btn" data-go="">▶ Start learning</button><button class="btn ghost" data-quizjump>📝 Jump to quiz</button></div>
    </div>`);
  const tabs = $("[data-tabs]", sec);
  tabs.id = l.id + "-study";
  tabs.insertAdjacentHTML("beforebegin", `<h2 class="study-title">🧪 Test yourself</h2>`);
  $("[data-go]", head).onclick = e => document.getElementById(e.currentTarget.dataset.go).scrollIntoView({ behavior: "smooth" });
  $("[data-quizjump]", head).onclick = () => tabs.scrollIntoView({ behavior: "smooth" });
  const prev = LECTURES[li - 1], next = LECTURES[li + 1];
  sec.insertAdjacentHTML("beforeend", `<nav class="lec-nav">
    ${prev ? `<a href="#${prev.id}" style="--c:var(--${prev.id})"><small>← Previous</small><b>${prev.n} · ${prev.title}</b></a>` : "<span></span>"}
    ${next ? `<a href="#${next.id}" class="nx" style="--c:var(--${next.id})"><small>Next →</small><b>${next.n} · ${next.title}</b></a>` : `<a href="#exam" class="nx"><small>Finished all lectures →</small><b>🎯 Exam Mode</b></a>`}
  </nav>`);
});

/* chapters: mark as learned → tick, advance to the next chapter, celebrate a finished lecture */
$$(".chapter").forEach(ch => {
  const b = document.createElement("button");
  b.className = "done-btn";
  const num = $("h2 .n", ch), n0 = num ? num.textContent : "";
  const paint = () => {
    const on = !!done[ch.id];
    b.classList.toggle("on", on); ch.classList.toggle("learned", on);
    b.textContent = on ? "✓ Learned it!" : "☐ Mark as learned & continue";
    if (num) num.textContent = on ? "✓" : n0;
  };
  b.onclick = () => {
    done[ch.id] = !done[ch.id]; store.set("done", done); paint(); updateProgress();
    if (!done[ch.id]) return;
    touch();
    const l = ch.dataset.ch;
    if (lecPct(l) === 100) { confetti(); toast(`🎉 Lecture ${l.slice(1)} fully learned! Now lock it in with the quiz.`); }
    else toast(`✓ Nice — ${lecPct(l)}% of this lecture learned`);
    const nextCh = ch.nextElementSibling && ch.nextElementSibling.classList.contains("chapter") ? ch.nextElementSibling : document.getElementById(l + "-study");
    setTimeout(() => nextCh && nextCh.scrollIntoView({ behavior: "smooth" }), 450);
  };
  paint();
  ch.appendChild(b);
});

/* remember where the student was, and fill the reading bar */
const seen = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) store.set("last", e.target.id); }), { rootMargin: "-40% 0px -55% 0px" });
$$(".chapter").forEach(c => seen.observe(c));
function onScroll() {
  const h = document.documentElement, onLec = LIDS.includes(($(".page.show") || {}).id);
  $("#readBar").style.width = onLec ? Math.min(100, h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%" : "0";
  $("#toTop").classList.toggle("show", h.scrollTop > 900);
}
window.addEventListener("scroll", onScroll, { passive: true });
$("#toTop").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ---------- generic: stepper, flip, chips explain, tabs ---------- */
$$(".stepper").forEach(st => {
  const btns = $$(".steps button", st), panels = $$(":scope > .panel", st);
  btns.forEach((b, i) => b.onclick = () => {
    btns.forEach(x => x.classList.remove("on")); panels.forEach(x => x.classList.remove("on"));
    b.classList.add("on"); panels[i] && panels[i].classList.add("on");
    const fig = st.previousElementSibling;
    if (fig && fig.matches("[data-dg-stepper]"))
      $$(".dg-node", fig).forEach(n => n.classList.toggle("on", +n.dataset.step === i));
  });
});
// clickable slide diagrams: a node with data-step opens that step of the next stepper
$$("[data-dg-stepper]").forEach(fig => {
  const btns = $$(".steps button", fig.nextElementSibling);
  $$(".dg-node", fig).forEach(n => {
    const go = () => btns[+n.dataset.step] && btns[+n.dataset.step].click();
    n.addEventListener("click", go);
    n.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
});
document.addEventListener("click", e => {
  const f = e.target.closest(".flip");
  if (f && !f.closest(".deck")) f.classList.toggle("on");
});
$$("[data-explain]").forEach(group => {
  const out = $(`[data-explain-out="${group.dataset.explain}"]`);
  $$("button", group).forEach(b => b.onclick = () => {
    $$("button", group).forEach(x => x.classList.remove("on")); b.classList.add("on");
    out.innerHTML = `<b>${b.textContent}</b>${b.dataset.x}`;
  });
});
// clickable slide diagrams: a node with data-chip opens that chip of the named explain group
$$("[data-dg-chips]").forEach(fig => {
  const btns = $$(`[data-explain="${fig.dataset.dgChips}"] button`), nodes = $$(".dg-node", fig);
  nodes.forEach(n => {
    const go = () => {
      nodes.forEach(x => x.classList.toggle("on", x === n));
      btns[+n.dataset.chip] && btns[+n.dataset.chip].click();
    };
    n.addEventListener("click", go);
    n.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  btns.forEach((b, i) => b.addEventListener("click", () => nodes.forEach(x => x.classList.toggle("on", +x.dataset.chip === i))));
});
$$("[data-tabs]").forEach(t => {
  const sec = t.closest(".page");
  $$("button", t).forEach(b => b.onclick = () => {
    $$("button", t).forEach(x => x.classList.remove("on")); b.classList.add("on");
    $$(".tabpanel", sec).forEach(p => p.classList.toggle("on", p.dataset.panel === b.dataset.tab));
  });
});

/* ---------- scenario games: <div class="game" data-game="key"> uses GAMES[key] ---------- */
$$("[data-game]").forEach(g => {
  g.innerHTML = `
    <div class="row" style="justify-content:space-between"><span class="hint">Scenario <span data-g="i">1</span>/<span data-g="n">0</span></span><span class="score">Score: <span data-g="s">0</span></span></div>
    <div class="scenario" data-g="q"></div>
    <div class="opts" data-g="opts"></div>
    <div class="fb" data-g="fb"></div>
    <div class="row" style="margin-top:10px"><button class="btn" data-g="next" disabled>Next ▶</button><button class="btn ghost" data-g="restart">Restart</button></div>`;
  const el = k => $(`[data-g="${k}"]`, g);
  const { opts: OPTS, items } = GAMES[g.dataset.game];
  let list, i, score, answered;
  function start() { list = shuffle(items); i = 0; score = 0; el("n").textContent = list.length; show(); }
  function show() {
    answered = false;
    if (i >= list.length) {
      el("q").innerHTML = `🎉 Finished! You scored ${score}/${list.length}. ${score >= list.length * .8 ? "Excellent — exam ready!" : "Hit Restart and try again."}`;
      el("opts").innerHTML = ""; el("fb").textContent = ""; el("next").disabled = true; return;
    }
    el("i").textContent = i + 1; el("s").textContent = score;
    el("q").textContent = list[i].q; el("fb").textContent = ""; el("next").disabled = true;
    el("opts").innerHTML = "";
    OPTS.forEach(o => {
      const b = document.createElement("button"); b.textContent = o;
      b.onclick = () => {
        if (answered) return; answered = true;
        const ok = o === list[i].a;
        if (ok) score++;
        b.classList.add(ok ? "right" : "wrong");
        $$("button", el("opts")).find(x => x.textContent === list[i].a).classList.add("right");
        el("fb").innerHTML = (ok ? "✅ Correct! " : `❌ It's <b>${list[i].a}</b>. `) + list[i].why;
        el("s").textContent = score; el("next").disabled = false;
      };
      el("opts").appendChild(b);
    });
  }
  el("next").onclick = () => { i++; show(); };
  el("restart").onclick = start;
  start();
});

/* ---------- L11: scaling demo ---------- */
(function scaling() {
  const mono = $("#monoServers"), micro = $("#microServers");
  const monoBox = () => `<div class="server"><span class="blk b-ui">UI</span><span class="blk b-srv">Orders</span><span class="blk b-srv">Users</span><span class="blk b-srv">Payments</span><span class="blk b-db">DB</span></div>`;
  const svc = (cls, name) => `<div class="server"><span class="blk ${cls}">${name}</span></div>`;
  let m = 1, o = 1;
  function draw() {
    mono.innerHTML = monoBox().repeat(m);
    micro.innerHTML = svc("b-a", "Users") + svc("b-c", "Payments") + svc("b-b", "Orders").repeat(o);
    $("#monoNote").textContent = m > 1 ? `${m} full copies — Users & Payments copied too, even though they didn't need it. Wasteful!` : "1 copy of the whole app.";
    $("#microNote").textContent = o > 1 ? `${o} Orders instances, Users & Payments untouched. Efficient!` : "Each service deployed independently.";
  }
  $("#monoAdd").onclick = () => { if (m < 5) m++; draw(); };
  $("#microAdd").onclick = () => { if (o < 8) o++; draw(); };
  $("#monoReset").onclick = () => { m = 1; draw(); };
  $("#microReset").onclick = () => { o = 1; draw(); };
  draw();
})();

/* ---------- L11: 12 factors ---------- */
(function factors() {
  const box = $("#factors");
  box.innerHTML = FACTORS.map((f, i) => `
    <div class="flip"><div class="inner">
      <div class="face front"><div class="n">${i + 1}</div><div class="big" data-name>${f[0]}</div><small>tap</small></div>
      <div class="face back"><b>${f[0]}</b><span style="margin:4px 0">${f[1]}</span><i class="hint">💡 ${f[2]}</i></div>
    </div></div>`).join("");
  let all = false, hidden = false;
  $("#f12flip").onclick = () => { all = !all; $$(".flip", box).forEach(f => f.classList.toggle("on", all)); };
  $("#f12test").onclick = e => {
    hidden = !hidden;
    $$("[data-name]", box).forEach(n => n.style.visibility = hidden ? "hidden" : "visible");
    e.target.textContent = hidden ? "Show names" : "Hide names (test me)";
  };
})();

/* ---------- L11: DevOps loop ---------- */
(function devloop() {
  const info = {
    "Plan": "Decide what to build next. Dev side of the loop.",
    "Build": "Write and compile the code.",
    "Continuous Integration": "Merge code often into a central repo; automated build + tests run.",
    "Deploy": "Release the tested build to production (Ops side).",
    "Operate": "Run and monitor the app in production.",
    "Continuous Feedback": "Learn from users and monitoring, feed it back into Plan. The loop never ends (∞), with real-time communication all around.",
  };
  const btns = $$("#devloop button");
  btns.forEach(b => b.onclick = () => {
    btns.forEach(x => x.classList.remove("on")); b.classList.add("on");
    $("#devloopOut").innerHTML = `<b>${b.textContent}</b>${info[b.textContent]}`;
  });
  btns[0].classList.add("on");
})();

/* ---------- L11: CI/CD pipeline ---------- */
(function pipeline() {
  let mode = "delivery", running = false, waitResolve = null;
  const stages = $$("#pipe .stage"), log = $("#pipeLog");
  const write = t => { log.textContent += t + "\n"; log.scrollTop = log.scrollHeight; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  $$("[data-mode]").forEach(b => b.onclick = () => {
    if (running) return;
    $$("[data-mode]").forEach(x => x.classList.remove("on")); b.classList.add("on");
    mode = b.dataset.mode;
    $("#gateLbl").textContent = mode === "delivery" ? "Manual approval" : "Automated checks";
  });
  $("#pipeApprove").onclick = () => { if (waitResolve) { waitResolve(); waitResolve = null; } };
  $("#pipeRun").onclick = async () => {
    if (running) return; running = true;
    stages.forEach(s => s.className = "stage"); log.textContent = "";
    const fail = $("#pipeFail").checked;
    const steps = [
      "Developer merges code into the central repository (CI)",
      "Build started… compiled OK",
      fail ? "Automated tests… ✗ 1 test FAILED" : "Automated tests… ✓ all passed",
      "Package created → artifact",
    ];
    for (let i = 0; i < steps.length; i++) {
      stages[i].classList.add("run"); await sleep(700);
      stages[i].classList.remove("run");
      if (i === 2 && fail) {
        stages[i].classList.add("fail"); write(steps[i]);
        write("✗ Pipeline stopped. Broken code never reaches production — that's the point of CI!");
        running = false; return;
      }
      stages[i].classList.add("ok"); write(steps[i]);
    }
    if (mode === "delivery") {
      stages[4].classList.add("wait");
      write("⏸ Continuous DELIVERY: artifact waits in production environment for human approval…");
      $("#pipeApprove").disabled = false;
      await new Promise(r => waitResolve = r);
      $("#pipeApprove").disabled = true;
      stages[4].className = "stage ok"; write("✍ Approved by a human.");
    } else {
      stages[4].classList.add("run"); await sleep(800);
      stages[4].className = "stage ok"; write("🤖 Continuous DEPLOYMENT: automated checks passed — no human needed.");
    }
    stages[5].classList.add("run"); await sleep(600);
    stages[5].className = "stage ok"; write("🚀 Deployed to production!");
    running = false;
  };
})();

/* ---------- L11: modernization slider ---------- */
(function modern() {
  const d = [
    ["Rehost", "Traditional app → existing app hosted as a <b>container or executable</b>.", 0],
    ["Refactor", "<b>Existing application + new microservices</b> added beside it.", 2],
    ["Rearchitect", "<b>Parts of the existing application rearchitected</b> into microservices.", 4],
    ["Rearchitect", "More parts rearchitected — the monolith keeps shrinking.", 6],
    ["Rearchitect / Rebuild", "<b>Transformed application</b> — fully microservices.", 9],
  ];
  const r = $("#modRange");
  function draw() {
    const [name, txt, n] = d[r.value - 1];
    const monoSize = Math.max(0, 90 - n * 10);
    let vis = monoSize ? `<i style="width:${monoSize}px;height:${monoSize}px;background:#ff9ad5"></i>` : "";
    for (let k = 0; k < n; k++) vis += `<i style="width:16px;height:16px;background:var(--l11)"></i>`;
    if (r.value == 1) vis = `<i style="width:90px;height:90px;background:#ff9ad5;outline:3px dashed var(--l12);outline-offset:3px"></i>`;
    $("#modVis").innerHTML = vis;
    $("#modTxt").innerHTML = `<h3>Step ${r.value}: ${name}</h3><p>${txt}</p>`;
  }
  r.oninput = draw; draw();
})();

/* ---------- L12: matrix ---------- */
(function matrix() {
  const envs = ["Dev", "Test", "QA", "Prod"], apps = ["Web app", "Database", "Queue", "Analytics"];
  const m = $("#matrix");
  function draw(fixed) {
    m.innerHTML = `<div class="h"></div>` + envs.map(e => `<div class="h">${e}</div>`).join("") +
      apps.map(a => `<div class="h">${a}</div>` + envs.map(() => {
        const bad = !fixed && Math.random() < .45;
        return `<div class="c ${fixed ? "ok" : bad ? "bad" : ""}">${fixed ? "✓" : bad ? "?!" : "✓?"}</div>`;
      }).join("")).join("");
    $$(".c", m).forEach(c => c.onclick = () => {
      if (fixed) return;
      c.classList.toggle("bad"); c.textContent = c.classList.contains("bad") ? "?!" : "✓?";
    });
    $("#matrixNote").textContent = fixed
      ? "📦 Every app ships with its own libraries & dependencies inside a container → works the same in every environment."
      : "Red = dependency conflict ('works on my machine' but not here). Every cell is a risk you must check.";
  }
  $("#matrixFix").onclick = () => draw(true);
  $("#matrixReset").onclick = () => draw(false);
  draw(false);
})();

/* ---------- L12: VM vs container toggle ---------- */
$$("[data-vm]").forEach(b => b.onclick = () => {
  $$("[data-vm]").forEach(x => x.classList.remove("on")); b.classList.add("on");
  const v = b.dataset.vm;
  $$("#vmView [data-v]").forEach(d => d.style.display = (v === "both" || d.dataset.v === v) ? "" : "none");
});

/* ---------- L12: architecture flow ---------- */
(function flow() {
  const steps = {
    build: [["client", 0, "You type <code>docker build</code> in the client."], ["host", 1, "Client sends it via REST API to dockerd. Daemon reads the Dockerfile and builds an <b>image</b>, stored locally."]],
    pull: [["client", 0, "You type <code>docker pull ubuntu</code>."], ["host", 1, "Daemon receives the request."], ["reg", 2, "Daemon downloads the image from the registry (Docker Hub by default) and stores it locally."]],
    run: [["client", 0, "You type <code>docker run nginx</code>."], ["host", 1, "Daemon checks for the image locally."], ["reg", 2, "Not found? It pulls from the registry."], ["host", 1, "Daemon creates + starts a <b>container</b> from the image. (run = pull + create + start)"]],
  };
  let timer;
  $$("[data-flow]").forEach(b => b.onclick = () => {
    clearTimeout(timer);
    const s = steps[b.dataset.flow]; let i = 0; const out = [];
    (function tick() {
      $$(".flow .node, .flow .arr").forEach(x => x.classList.remove("hot"));
      if (i >= s.length) return;
      const [n, a, t] = s[i];
      $(`.flow [data-n="${n}"]`).classList.add("hot");
      if (a) $(`.flow [data-a="${a}"]`).classList.add("hot");
      out.push(`${i + 1}. ${t}`);
      $("#flowOut").innerHTML = `<b>${b.textContent}</b>${out.join("<br>")}`;
      i++; timer = setTimeout(tick, 1300);
    })();
  });
})();

/* ---------- L12: Docker terminal simulator ---------- */
(function terminal() {
  const out = $("#termOut"), inp = $("#termIn");
  const images = new Set();
  const ctrs = []; // {id,name,image,state,cmd}
  const KNOWN = ["hello-world", "ubuntu", "ubuntu:14.04", "busybox", "nginx"];
  const hist = []; let hi = 0;
  const names = ["eager_turing", "happy_lovelace", "brave_hopper", "calm_babbage", "jolly_knuth"];
  const rid = () => [...Array(12)].map(() => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
  const print = (t, c = "") => { const d = document.createElement("div"); if (c) d.className = c; d.textContent = t; out.appendChild(d); out.scrollTop = out.scrollHeight; };
  const find = k => ctrs.find(c => c.name === k || c.id.startsWith(k));
  const missions = [
    ["Pull the busybox image", () => images.has("busybox")],
    ["Create a container named my_busybox from busybox (docker create --name my_busybox busybox)", () => find("my_busybox")],
    ["Start my_busybox", () => find("my_busybox")?.state === "running"],
    ["Pause it", () => find("my_busybox")?.state === "paused"],
    ["Unpause it", () => find("my_busybox")?.state === "running"],
    ["Stop it gracefully", () => find("my_busybox")?.state === "exited"],
    ["Remove the container", () => !find("my_busybox")],
    ["Remove the busybox image", () => !images.has("busybox")],
  ];
  let mi = 0;
  function refresh() {
    // names and images are typed by the user, so escape them before building HTML
    $("#imgList").innerHTML = images.size ? [...images].map(i => `<div class="ctr"><span>${esc(i)}</span><span class="hint">image</span></div>`).join("") : `<div class="hint">none — try docker pull</div>`;
    $("#ctrList").innerHTML = ctrs.length ? ctrs.map(c => `<div class="ctr"><span>${esc(c.name)}<br><small class="hint">${esc(c.image)}</small></span><span class="st ${c.state}">${c.state}</span></div>`).join("") : `<div class="hint">none</div>`;
    while (mi < missions.length && missions[mi][1]() && (mi === 0 || true)) { mi++; if (mi < missions.length) print("🎯 Mission complete! Next: " + missions[mi][0], "info"); }
    $("#mission").innerHTML = mi < missions.length ? `${mi + 1}/${missions.length}: ${missions[mi][0]}` : "🏆 All missions done! You know the full container lifecycle.";
  }
  function needImage(img) {
    if (!KNOWN.includes(img) && !images.has(img)) { print(`Unable to find image '${img}' — try: ${KNOWN.join(", ")}`, "err"); return false; }
    return true;
  }
  function pull(img) {
    if (!needImage(img)) return false;
    print(`Using default tag: latest\n${img.split(":")[0]}: Pulling from library/${img.split(":")[0]}\nStatus: Downloaded newer image for ${img}  (from Docker Hub)`);
    images.add(img); return true;
  }
  function create(img, name, cmd) {
    if (!images.has(img)) { print(`Unable to find image '${img}' locally`, "info"); if (!pull(img)) return null; }
    if (name && find(name)) { print(`Error: container name "${name}" is already in use`, "err"); return null; }
    const c = { id: rid(), name: name || names[ctrs.length % names.length] + "_" + ctrs.length, image: img, state: "created", cmd };
    ctrs.push(c); return c;
  }
  function withCtr(arg, fn) {
    if (!arg) return print("Error: container ID or name required", "err");
    const c = find(arg); if (!c) return print(`Error: No such container: ${arg}`, "err");
    fn(c);
  }
  const cmds = {
    help() {
      print(`Supported commands (just like the lecture):
  docker pull <IMAGE>            docker images
  docker create [--name N] <IMAGE>
  docker start <NAME|ID>         docker run [-it] [--name N] <IMAGE> [CMD]
  docker ps   /   docker ps -a   docker logs <NAME>
  docker attach <NAME>           docker exec -it <NAME> <CMD>
  docker pause / unpause / restart / stop / kill <NAME>
  docker kill --signal=<SIG> <NAME>
  docker rm <NAME>   docker system prune   docker rmi <IMAGE>
  clear
Images available: ${KNOWN.join(", ")}`, "info");
    },
  };
  function run(line) {
    line = line.trim(); if (!line) return;
    print("$ " + line, "cmd"); hist.push(line); hi = hist.length;
    if (line === "help") return cmds.help();
    if (line === "clear") { out.innerHTML = ""; return; }
    const p = line.split(/\s+/);
    if (p[0] !== "docker") return print(`${p[0]}: command not found (commands start with 'docker'; type help)`, "err");
    const sub = p[1], rest = p.slice(2);
    const opt = (flag) => { const i = rest.indexOf(flag); if (i >= 0) { const v = rest[i + 1]; rest.splice(i, 2); return v; } };
    switch (sub) {
      case "pull": if (!rest[0]) return print("Usage: docker pull <IMAGE>", "err"); pull(rest[0]); break;
      case "images":
        print("REPOSITORY        TAG       IMAGE ID");
        [...images].forEach(i => print(`${i.split(":")[0].padEnd(18)}${(i.split(":")[1] || "latest").padEnd(10)}${rid()}`)); break;
      case "create": {
        const name = opt("--name"); if (!rest[0]) return print("Usage: docker create [--name N] <IMAGE>", "err");
        const c = create(rest[0], name); if (c) print(c.id + "…  (created, NOT started — check with docker ps -a)"); break;
      }
      case "start": withCtr(rest[0], c => {
        if (c.state === "running") return print(c.name + " (already running)");
        c.state = c.image === "hello-world" ? "exited" : "running"; print(c.name);
        if (c.image === "hello-world") print("Hello from Docker! This message shows your installation appears to be working correctly. (container exits after printing)", "info");
      }); break;
      case "run": {
        const it = rest[0] === "-it" ? rest.shift() : null;
        const name = opt("--name"); const img = rest.shift(); const cmd = rest.join(" ");
        if (!img) return print("Usage: docker run [-it] <IMAGE> [CMD]", "err");
        print("(docker run = pull + create + start)", "info");
        const c = create(img, name, cmd); if (!c) break;
        if (img === "hello-world") { print("Hello from Docker!\nThis message shows that your installation appears to be working correctly."); c.state = "exited"; }
        else if (cmd === "ls") { print("bin  dev  etc  home  proc  root  sys  tmp  usr  var"); c.state = "exited"; }
        else if (it) { print(`/ # (interactive shell inside ${c.name} — simulated) `); c.state = "running"; }
        else if (img.startsWith("ubuntu") || img === "busybox") { c.state = "exited"; print(`(${img} had nothing to do and exited — try docker run -it ${img} sh)`, "info"); }
        else { c.state = "running"; print(c.id); }
        break;
      }
      case "ps": {
        const all = rest[0] === "-a";
        print("CONTAINER ID   IMAGE          STATUS     NAMES");
        ctrs.filter(c => all || c.state === "running" || c.state === "paused").forEach(c => print(`${c.id}   ${c.image.padEnd(14)} ${c.state.padEnd(10)} ${c.name}`));
        if (!all) print("(only running — use docker ps -a for all)", "info"); break;
      }
      case "logs": withCtr(rest[0], c => print(c.image === "hello-world" ? "Hello from Docker!" : `[${c.name}] log line 1\n[${c.name}] log line 2`)); break;
      case "attach": withCtr(rest[0], c => print(c.state === "running" ? `Attached stdin/stdout/stderr to ${c.name} (simulated)` : "You cannot attach to a stopped container, start it first", c.state === "running" ? "" : "err")); break;
      case "exec": {
        if (rest[0] === "-it") rest.shift();
        withCtr(rest[0], c => {
          if (c.state !== "running") return print(`Error: container ${c.name} is not running`, "err");
          const cmd = rest.slice(1).join(" ");
          print(cmd.startsWith("ping") ? `PING ${rest[2] || "host"}: 56 data bytes\n64 bytes: seq=0 ttl=57 time=12 ms` : `(ran '${cmd || "?"}' inside ${c.name})`);
        }); break;
      }
      case "pause": withCtr(rest[0], c => { if (c.state !== "running") return print(`Container ${c.name} is not running`, "err"); c.state = "paused"; print(c.name + "   ← SIGSTOP sent", "info"); }); break;
      case "unpause": withCtr(rest[0], c => { if (c.state !== "paused") return print(`Container ${c.name} is not paused`, "err"); c.state = "running"; print(c.name + "   ← SIGCONT sent", "info"); }); break;
      case "restart": withCtr(rest[0], c => { c.state = "running"; print(c.name + " restarted"); }); break;
      case "stop": withCtr(rest[0], c => { c.state = "exited"; print(c.name + "   ← SIGTERM sent (graceful shutdown)", "info"); }); break;
      case "kill": {
        let sig = "SIGKILL"; if (rest[0] && rest[0].startsWith("--signal=")) sig = rest.shift().split("=")[1].toUpperCase();
        withCtr(rest[0], c => {
          if (c.state !== "running" && c.state !== "paused") return print(`Container ${c.name} is not running`, "err");
          if (sig === "SIGSTOP") { c.state = "paused"; print(`${c.name} ← SIGSTOP (same as docker pause)`, "info"); }
          else if (sig === "SIGCONT") { c.state = "running"; print(`${c.name} ← SIGCONT (same as docker unpause)`, "info"); }
          else { c.state = "exited"; print(`${c.name} ← ${sig} ${sig === "SIGTERM" ? "(same as docker stop)" : "(killed immediately)"}`, "info"); }
        }); break;
      }
      case "rm": withCtr(rest[0], c => {
        if (c.state === "running" || c.state === "paused") return print(`Error: cannot remove running container ${c.name}. Stop it first.`, "err");
        ctrs.splice(ctrs.indexOf(c), 1); print(c.name);
      }); break;
      case "system":
        if (rest[0] !== "prune") return print("Usage: docker system prune", "err");
        { const gone = ctrs.filter(c => c.state === "exited" || c.state === "created"); gone.forEach(c => ctrs.splice(ctrs.indexOf(c), 1)); print(`Deleted stopped containers: ${gone.map(c => c.name).join(", ") || "none"}`); }
        break;
      case "rmi": {
        const img = rest[0]; if (!images.has(img)) return print(`Error: No such image: ${img}`, "err");
        if (ctrs.some(c => c.image === img)) return print(`Error: image is being used by a container — remove the container first`, "err");
        images.delete(img); print(`Untagged: ${img}\nDeleted: sha256:${rid()}`); break;
      }
      default: print(`docker: '${sub}' is not a docker command here. Type help.`, "err");
    }
    refresh();
  }
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") { run(inp.value); inp.value = ""; }
    else if (e.key === "ArrowUp") { if (hi > 0) inp.value = hist[--hi]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { inp.value = hi < hist.length - 1 ? hist[++hi] : (hi = hist.length, ""); }
  });
  const quick = ["help", "docker pull busybox", "docker images", "docker create --name my_busybox busybox", "docker ps -a", "docker start my_busybox", "docker ps", "docker logs my_busybox", "docker exec -it my_busybox ping www.example.com", "docker pause my_busybox", "docker unpause my_busybox", "docker stop my_busybox", "docker kill my_busybox", "docker rm my_busybox", "docker rmi busybox", "docker run hello-world", "docker run busybox ls", "docker system prune"];
  $("#quick").innerHTML = quick.map(q => `<button>${q}</button>`).join("");
  $$("#quick button").forEach(b => b.onclick = () => { run(b.textContent); inp.focus(); });
  print("Welcome to the Docker practice terminal 🐳  Type 'help' or tap a command below.", "info");
  refresh();
})();

/* ---------- L12: orchestration animation ---------- */
$("#orchRun").onclick = () => {
  const ds = $$("#orch div"); let i = 0;
  (function t() { ds.forEach(d => d.classList.remove("hot")); if (i < ds.length * 2 - 4) { const k = i < ds.length ? i : 3 + (i - ds.length) % 4; ds[k].classList.add("hot"); i++; setTimeout(t, 650); } })();
};

/* ---------- quizzes (with mistake tracking) ---------- */
// every question gets a stable id "l05:3" so mistakes can be practised later
const QID = {};
Object.entries(QUIZ).forEach(([l, qs]) => qs.forEach((q, i) => { q.id = l + ":" + i; q.l = l; QID[q.id] = q; }));
let wrong = store.get("wrong", {});
let examSet = new Set(LIDS), examMistakes = false;
function makeQuiz(el) {
  const key = el.dataset.quiz;
  let qs, i, score, missed;
  function start() {
    let pool = key === "all" ? [...examSet].flatMap(k => QUIZ[k] || []) : QUIZ[key];
    if (key === "all" && examMistakes) pool = Object.keys(wrong).map(id => QID[id]).filter(Boolean);
    if (!pool.length) { el.innerHTML = `<div class="result"><div class="big">🌟</div><p>No mistakes to practise — great work!</p></div>`; return; }
    qs = shuffle(pool).slice(0, key === "all" ? 25 : pool.length); i = 0; score = 0; missed = []; show();
  }
  el.restart = start;
  function show() {
    if (i >= qs.length) {
      const pct = Math.round(score / qs.length * 100);
      const best = store.get("best", {}); best[key] = Math.max(best[key] || 0, pct); store.set("best", best);
      if (pct >= 80) confetti();
      el.innerHTML = `<div class="result"><div class="big">${pct}%</div><p>${score} / ${qs.length} correct · best: ${best[key]}%</p>
        <p>${pct >= 80 ? "🔥 Exam ready!" : pct >= 50 ? "👍 Good — review the mistakes below, then retry." : "📚 Go back through the chapters and memory hooks, then retry."}</p>
        <div class="row" style="justify-content:center"><button class="btn" data-again>Try again</button>${missed.length ? `<button class="btn ghost" data-redo>Retry only my ${missed.length} mistakes</button>` : ""}</div></div>
        ${missed.length ? `<div class="mistakes"><h3>Review your mistakes</h3>${missed.map(q => `<div class="mk-item"><b>${q.q}</b><span>✓ ${q.o[q.a]}</span><small>${q.why}</small></div>`).join("")}</div>` : ""}`;
      $("[data-again]", el).onclick = start;
      if (missed.length) $("[data-redo]", el).onclick = () => { qs = shuffle(missed); i = 0; score = 0; missed = []; show(); };
      return;
    }
    const q = qs[i];
    const order = shuffle(q.o.map((t, k) => ({ t, k })));
    el.innerHTML = `<div class="qtop"><span>Question ${i + 1} / ${qs.length}${key === "all" ? ` · <b style="color:var(--${q.l})">L${q.l.slice(1)}</b>` : ""}</span><span>Score ${score}</span></div>
      <div class="bar" style="margin:0 0 14px"><i style="width:${i / qs.length * 100}%"></i></div>
      <div class="q">${q.q}</div><div class="ans"></div><div class="why"></div>
      <div class="row" style="margin-top:12px"><button class="btn" disabled data-next>Next ▶</button><span class="hint">keys 1–4 · Enter</span></div>`;
    const ans = $(".ans", el);
    order.forEach(({ t, k }, n) => {
      const b = document.createElement("button"); b.innerHTML = `<kbd>${n + 1}</kbd> ${t}`;
      b.onclick = () => {
        $$("button", ans).forEach(x => x.disabled = true);
        const ok = k === q.a; touch();
        if (ok) { score++; delete wrong[q.id]; } else { missed.push(q); wrong[q.id] = 1; }
        store.set("wrong", wrong); paintMistakeChip();
        b.classList.add(ok ? "right" : "wrong");
        $$("button", ans)[order.findIndex(o => o.k === q.a)].classList.add("right");
        const w = $(".why", el); w.classList.add("show");
        w.innerHTML = (ok ? "✅ <b>Correct.</b> " : "❌ <b>Not quite.</b> ") + q.why;
        $("[data-next]", el).disabled = false;
      };
      ans.appendChild(b);
    });
    $("[data-next]", el).onclick = () => { i++; show(); };
  }
  start();
}

/* exam mode: choose which lectures to include, or only past mistakes */
$("#examPick").innerHTML = `<button class="chip on" data-pick="all">All lectures</button><button class="chip" data-pick="mist" id="mistChip"></button>` +
  LECTURES.map(l => `<button class="chip" data-pick="${l.id}" style="--accent:var(--${l.id})">L${l.n} ${l.short}</button>`).join("");
function paintMistakeChip() { $("#mistChip").textContent = `❗ My mistakes (${Object.keys(wrong).length})`; }
paintMistakeChip();
$$("[data-quiz]").forEach(makeQuiz);
$$("#examPick button").forEach(b => b.onclick = () => {
  const k = b.dataset.pick, allBtn = $('#examPick [data-pick="all"]');
  if (k === "mist") { examMistakes = !examMistakes; b.classList.toggle("on", examMistakes); }
  else if (k === "all") { examMistakes = false; examSet = new Set(LIDS); $$("#examPick button").forEach(x => x.classList.toggle("on", x === allBtn)); }
  else {
    examMistakes = false; $("#mistChip").classList.remove("on");
    if (allBtn.classList.contains("on")) { examSet.clear(); allBtn.classList.remove("on"); }
    b.classList.toggle("on"); b.classList.contains("on") ? examSet.add(k) : examSet.delete(k);
    if (!examSet.size) { examSet = new Set(LIDS); allBtn.classList.add("on"); }
  }
  $('#exam [data-quiz="all"]').restart();
});

/* ---------- flashcards with spaced repetition (Leitner boxes) ---------- */
const INTERVAL = [0, 1, 3, 7, 14, 30];
// keep only well-formed saved entries, so tampered storage can't inject markup
let srs = Object.fromEntries(Object.entries(store.get("srs", {})).filter(([, v]) =>
  v && Number.isInteger(v.box) && v.box >= 0 && v.box <= 5 && /^\d{4}-\d{2}-\d{2}$/.test(v.due)));
const ALLCARDS = Object.entries(CARDS).flatMap(([l, cs]) => cs.map((c, i) => ({ id: l + ":" + i, l, f: c[0], b: c[1] })));
const isDue = c => srs[c.id] && srs[c.id].due <= today();
const dueCount = () => ALLCARDS.filter(isDue).length;
function rate(c, know) {
  const box = know ? Math.min((srs[c.id] ? srs[c.id].box : 0) + 1, 5) : 0;
  srs[c.id] = { box, due: addDays(today(), INTERVAL[box]) };
  store.set("srs", srs); touch(); paintDue();
}
function paintDue() { const n = dueCount(), b = $("#dueBadge"); b.textContent = n; b.hidden = !n; }
let reviewScope = "due";
function deckCards(key) {
  if (key !== "review") {
    const cs = ALLCARDS.filter(c => c.l === key);
    return [...cs.filter(isDue), ...cs.filter(c => !srs[c.id]), ...cs.filter(c => srs[c.id] && !isDue(c))];
  }
  if (reviewScope === "due") return shuffle(ALLCARDS.filter(isDue));
  if (reviewScope === "new") return ALLCARDS.filter(c => !srs[c.id]).slice(0, 15);
  return shuffle(ALLCARDS.filter(c => c.l === reviewScope));
}
const decks = [];
function makeDeck(el) {
  const key = el.dataset.deck;
  let cards, i;
  el.reset = () => { cards = deckCards(key); i = 0; show(); };
  function show() {
    if (!cards.length) {
      el.innerHTML = key === "review" && reviewScope === "due"
        ? `<div class="result"><div class="big">✅</div><p>Nothing due right now. Come back tomorrow — or learn some new cards.</p><button class="btn" data-new>Learn 15 new cards</button></div>`
        : `<div class="result"><div class="big">🎉</div><p>Session complete! Rated cards will come back when they're due.</p><button class="btn" data-re>Go again</button></div>`;
      const n = $("[data-new]", el); if (n) n.onclick = () => setScope("new");
      const r = $("[data-re]", el); if (r) r.onclick = () => el.reset();
      return;
    }
    i = (i + cards.length) % cards.length;
    const c = cards[i], st = srs[c.id];
    const tag = !st ? `<span class="ctag new">New</span>` : isDue(c) ? `<span class="ctag due">Due</span>` : `<span class="ctag">Box ${st.box} · next ${st.due}</span>`;
    el.innerHTML = `<div class="deck-top"><span>${key === "review" ? `<b style="color:var(--${c.l})">L${c.l.slice(1)}</b> · ` : ""}Card ${i + 1} / ${cards.length}</span>${tag}</div>
      <div class="flip"><div class="inner">
        <div class="face front"><div class="big">${c.f}</div><small>tap or Space to flip</small></div>
        <div class="face back">${c.b}</div></div></div>
      <div class="ctrl"><button class="btn ghost" data-a="prev" aria-label="Previous">◀</button>
        <button class="btn ghost again" data-a="again">🔁 Again <kbd>A</kbd></button>
        <button class="btn know" data-a="know">✓ I know it <kbd>K</kbd></button>
        <button class="btn ghost" data-a="next" aria-label="Next">▶</button></div>`;
    const card = $(".flip", el);
    card.onclick = () => card.classList.toggle("on");
    $$("[data-a]", el).forEach(btn => btn.onclick = () => act(btn.dataset.a));
  }
  function act(a) {
    if (!cards.length) return;
    const c = cards[i];
    if (a === "next") i++;
    if (a === "prev") i--;
    if (a === "know") { rate(c, true); cards.splice(i, 1); }
    if (a === "again") { rate(c, false); cards.splice(i, 1); cards.push(c); }
    show(); paintBoxes();
  }
  el.act = act;
  decks.push(el);
  el.reset();
}
$$("[data-deck]").forEach(makeDeck);

/* review page: scope chips and Leitner box overview */
function setScope(k) {
  reviewScope = k;
  $$("#reviewPick button").forEach(b => b.classList.toggle("on", b.dataset.rs === k));
  $('[data-deck="review"]').reset();
}
$("#reviewPick").innerHTML = `<button class="chip on" data-rs="due">Due today</button><button class="chip" data-rs="new">15 new cards</button>` +
  LECTURES.map(l => `<button class="chip" data-rs="${l.id}" style="--accent:var(--${l.id})">L${l.n}</button>`).join("");
$$("#reviewPick button").forEach(b => b.onclick = () => setScope(b.dataset.rs));
function paintBoxes() {
  const cnt = [0, 0, 0, 0, 0, 0]; let fresh = 0;
  ALLCARDS.forEach(c => srs[c.id] ? cnt[srs[c.id].box]++ : fresh++);
  $("#srsBoxes").innerHTML = `<div class="bx"><b>${fresh}</b><small>never seen</small></div>` +
    cnt.map((n, b) => `<div class="bx" style="--h:${b * 18}"><b>${n}</b><small>${b ? "box " + b + " · " + INTERVAL[b] + "d" : "again · today"}</small></div>`).join("");
}
paintBoxes(); paintDue();

/* ---------- home dashboard ---------- */
function renderDash() {
  const last = document.getElementById(store.get("last", ""));
  const lastL = last && LECTURES.find(l => l.id === last.dataset.ch);
  const b = Number(store.get("best", {}).all), best = Number.isFinite(b) ? Math.round(b) : null;
  const got = Object.values(done).filter(Boolean).length, all = $$(".chapter").length;
  const s = streak(), due = dueCount();
  $("#dash").innerHTML = `
    ${lastL ? `<a class="continue" href="#${last.id}" style="--c:var(--${lastL.id})"><small>Continue where you left off</small><b>${lastL.n} · ${lastL.title}</b><span>${last.querySelector("h2").textContent.replace(/^[\d✓]+/, "").trim()} →</span></a>`
      : `<a class="continue" href="#l01" style="--c:var(--l01)"><small>Start here</small><b>01 · Introduction to Cloud Computing</b><span>Begin chapter 1 →</span></a>`}
    <div class="stat"><span>🔥</span><b>${s}</b><small>day streak${s ? "" : " — study today!"}</small></div>
    <div class="stat"><span>✅</span><b>${got}<i>/${all}</i></b><small>chapters learned</small></div>
    <a class="stat" href="#review"><span>🧠</span><b>${due}</b><small>${due ? "cards due — review now" : "cards due"}</small></a>
    <a class="stat" href="#exam"><span>🎯</span><b>${best != null ? best + "%" : "—"}</b><small>best exam score</small></a>`;
}

/* ---------- cheat sheet: memory hooks & exam traps collected from every lecture ---------- */
$$("#cheatTabs button").forEach(b => b.onclick = () => {
  $$("#cheatTabs button").forEach(x => x.classList.toggle("on", x === b));
  const k = b.dataset.ct, alt = $("#cheatAlt");
  $(".cheat").hidden = k !== "sheet"; alt.hidden = k === "sheet";
  if (k === "sheet") return;
  alt.innerHTML = LECTURES.map(l => {
    const boxes = $$(`#${l.id} .box.${k}`);
    if (!boxes.length) return "";
    return `<section class="hook-group" style="--accent:var(--${l.id})"><h3><span class="pn">${l.n}</span>${l.title}</h3>
      ${boxes.map(x => `<div class="box ${k}">${x.innerHTML}</div>`).join("")}</section>`;
  }).join("");
});

/* ---------- keyboard: quiz 1–4 / Enter, flashcards Space / K / A / arrows ---------- */
const inView = el => { const r = el.getBoundingClientRect(); return el.offsetParent && r.bottom > 80 && r.top < innerHeight; };
document.addEventListener("keydown", e => {
  if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
  const deck = decks.find(d => inView(d) && $(".flip", d));
  if (deck) {
    const k = e.key.toLowerCase();
    if (e.code === "Space") { e.preventDefault(); $(".flip", deck).classList.toggle("on"); return; }
    if (k === "k") return deck.act("know");
    if (k === "a") return deck.act("again");
    if (e.key === "ArrowRight") return deck.act("next");
    if (e.key === "ArrowLeft") return deck.act("prev");
  }
  const quiz = $$(".page.show [data-quiz]").find(inView);
  if (!quiz) return;
  if (/^[1-4]$/.test(e.key)) { const b = $$(".ans button", quiz)[+e.key - 1]; if (b && !b.disabled) b.click(); }
  if (e.key === "Enter") { const n = $("[data-next]", quiz); if (n && !n.disabled) { e.preventDefault(); n.click(); } }
});

/* lecture-specific widgets registered by lectures/*.js */
INITS.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });

document.getElementById("year").textContent = new Date().getFullYear();
updateProgress();
route();
