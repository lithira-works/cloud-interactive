// Lecture 07 — Cloud Security & Monitoring
addLecture(`
<section class="page" id="l07" style="--accent:var(--l07)">
  <div class="lec-head">
    <div class="kicker">Lecture 07 · Cloud Computing</div>
    <h1>Cloud Security &amp; Monitoring 🔐</h1>
    <p class="lead">Two halves: <b>Security</b> (software-defined security, least privilege, IAM, MFA, federation &amp; SSO, encryption, risks) and <b>Monitoring</b> (metrics, events, logs, alerts). Analogy: security = <b>locks and keys</b>; monitoring = <b>CCTV and alarms</b>.</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l07-sds" data-ch="l07">
    <h2><span class="n">1</span>Software-Defined Security</h2>
    <div class="box key"><b>Definition</b>Software-defined security (SDS) is a security model in which information security is <b>implemented, controlled and managed by security software</b>.</div>
    <p>It is <b>software-managed, policy-driven and governed</b> security where most controls — <b>intrusion detection, network segmentation, access controls</b> — are <b>automated and monitored through software</b>.</p>
  </article>

  <article class="chapter" id="l07-plop" data-ch="l07">
    <h2><span class="n">2</span>Principle of Least Privilege (PLOP)</h2>
    <div class="box key"><b>Definition</b>An information security concept: a user or a process should <b>only be granted the privileges that are essential</b> to perform its intended function.</div>
    <div class="box mem"><b>Memory hook: hotel key card 🏨</b>Your card opens <b>your room</b> and the gym — not every room in the hotel.</div>
    <details class="ask"><summary>An intern needs to read reports from one storage bucket. What permission should they get?</summary><b>Read-only access to that one bucket</b> — nothing more. Not admin, not write, not other buckets.</details>
  </article>

  <article class="chapter" id="l07-iam" data-ch="l07">
    <h2><span class="n">3</span>Identity and Access Management (IAM)</h2>
    <ul class="clean">
      <li><b>IAM solves the principle of least privilege.</b></li>
      <li>A <b>framework of policies and technologies</b> to ensure users/processes have the <b>appropriate access</b> to technology resources.</li>
      <li>Used to <b>identify, authenticate and authorize</b> users/processes.</li>
    </ul>
    <h3>IAM components — click each</h3>
    <div class="stepper">
      <div class="steps"><button class="on">🏛 Logical organization</button><button>👤 Users</button><button>👥 Groups</button><button>📜 Policies</button><button>🎭 Roles</button></div>
      <div class="panel on"><h3>Logical Organization</h3><p>The <b>logical boundaries and operating domains</b> for a given user/process (e.g. an AWS account, an Azure tenant).</p></div>
      <div class="panel"><h3>Users</h3><ul class="clean"><li>Users / applications / services that need to access resources</li><li>Have their <b>own security credentials</b></li><li>Can be part of <b>one or more groups</b></li><li><b>By default no permission</b> to do anything</li></ul></div>
      <div class="panel"><h3>Groups</h3><ul class="clean"><li>A <b>collection of users</b></li><li><b>Do not have security credentials</b> (you can't log in as a group)</li></ul></div>
      <div class="panel"><h3>Policies</h3><ul class="clean"><li>A <b>collection of permissions</b></li><li>Permissions determine whether a request is <b>allowed or denied</b></li></ul></div>
      <div class="panel"><h3>Roles</h3><ul class="clean"><li>Main component of <b>Role-Based Access Control (RBAC)</b></li><li>A <b>collection of policies</b></li><li>Can be <b>assumed</b> by users/services</li><li>When assumed, gives <b>temporary security credentials</b> for the role session</li></ul></div>
    </div>
    <h3>🎮 Try it: who can do what?</h3>
    <div class="calc">
      <div class="row"><b>User "Nimal"</b> in group <select id="iamGroup"><option value="">(no group)</option><option value="dev">Developers</option><option value="read">Auditors</option></select>
        <label class="hint"><input type="checkbox" id="iamRole"> assume role "DBAdmin"</label></div>
      <div class="res" id="iamOut"></div>
      <p class="hint" id="iamNote" style="margin:8px 0 0"></p>
    </div>
    <div class="box mem"><b>Memory hook: school 🏫</b>Organization = the school · User = a student (own ID card) · Group = a class (no ID card of its own) · Policy = the rule list · Role = a temporary "hall monitor" badge you wear for a while.</div>
  </article>

  <article class="chapter" id="l07-mfa" data-ch="l07">
    <h2><span class="n">4</span>Multi-Factor Authentication (MFA)</h2>
    <p>Access is granted only after presenting <b>two or more pieces of evidence (factors)</b>.</p>
    <div class="grid2">
      <div class="tile"><h4>🔑 Something the user has</h4>Security token, smart card</div>
      <div class="tile"><h4>🧠 Something the user knows</h4>Password, PIN</div>
      <div class="tile"><h4>🫆 Something the user is</h4>Biometrics: fingerprint, face, voice, iris</div>
      <div class="tile"><h4>📍 Somewhere the user is</h4>GPS location</div>
    </div>
    <div class="box mem"><b>Memory hook: "Have, Know, Are, Where"</b>Card in your <b>hand</b>, PIN in your <b>head</b>, finger on your <b>body</b>, phone's <b>GPS</b>.</div>
    <div class="box exam"><b>Exam trap</b>Password + PIN is <b>not</b> MFA — both are "something you know". MFA needs <b>different</b> factor types.</div>
    <h3>🎮 Game: which factor?</h3>
    <div class="game" data-game="l07"></div>
  </article>

  <article class="chapter" id="l07-fed" data-ch="l07">
    <h2><span class="n">5</span>Federated Identity &amp; Single Sign-On</h2>
    <ul class="clean">
      <li>Using many identities across many systems is tedious — different user IDs and passwords to maintain.</li>
      <li><b>Federated identity</b>: an electronic identity <b>linked and stored across multiple identity management systems</b>.</li>
      <li><b>SSO</b>: lets users move between multiple systems <b>without logging in to each one</b>, through <b>one verified identity</b>.</li>
    </ul>
    <div class="grid2">
      <div class="tile"><h4>Enterprise identity federation</h4>Use your company login (e.g. corporate directory) to access cloud apps.</div>
      <div class="tile"><h4>Web identity federation</h4>Use a public identity provider (e.g. "Sign in with Google / Facebook").</div>
    </div>
    <div class="box mem"><b>Memory hook</b>SSO = a <b>theme-park wristband</b> 🎢 — show it once at the gate, then ride everything.</div>
  </article>

  <article class="chapter" id="l07-enc" data-ch="l07">
    <h2><span class="n">6</span>Encryption Recap</h2>
    <div class="grid2">
      <div class="tile"><h4>Client-side vs server-side</h4><b>Client-side</b>: you encrypt before sending to the cloud. <b>Server-side</b>: the cloud service encrypts it after receiving.</div>
      <div class="tile"><h4>3 stages of data</h4><b>In use</b> (being processed) · <b>In transit</b> (moving over the network) · <b>At rest</b> (stored on disk)</div>
    </div>
    <h3>Types of encryption</h3>
    <div class="grid3">
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">🔑 Symmetric key</div><small>tap</small></div><div class="face back"><b>One shared key</b> encrypts and decrypts. Fast. Problem: sharing the key safely.</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">🗝🗝 Asymmetric key</div><small>tap</small></div><div class="face back"><b>Public key</b> encrypts, <b>private key</b> decrypts. Slower, but no secret-sharing problem (used in HTTPS).</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">#️⃣ Hashing</div><small>tap</small></div><div class="face back"><b>One-way</b> fingerprint of data — cannot be reversed. Used to store passwords and check integrity.</div></div></div>
    </div>
  </article>

  <article class="chapter" id="l07-risk" data-ch="l07">
    <h2><span class="n">7</span>Cloud Security Risks &amp; Threats</h2>
    <div class="chips" data-explain="risk">
      <button class="chip" data-x="Users get more access than they need, old accounts are not removed, weak passwords. Fix: IAM, least privilege, MFA.">🚪 Poor access management</button>
      <button class="chip" data-x="Sensitive data is exposed, stolen or lost. Fix: encryption, backups, access control.">💧 Data breach / leak / loss</button>
      <button class="chip" data-x="A setting is wrong — e.g. a storage bucket left public or a firewall open to the world. One of the most common cloud problems.">⚙ Misconfiguration</button>
      <button class="chip" data-x="APIs without proper authentication, validation or rate limiting can be abused.">🔌 Insecure APIs</button>
      <button class="chip" data-x="Attackers steal credentials (phishing, leaked keys) and take over an account.">🎣 Account hijacking</button>
      <button class="chip" data-x="You can't protect what you can't see — no logging or monitoring of resources and activity.">🙈 Lack of visibility</button>
      <button class="chip" data-x="Flooding a service with traffic so real users can't reach it (DDoS = from many machines).">🌊 DoS / DDoS attacks</button>
    </div>
    <div class="box eg" data-explain-out="risk"><b>Tap a threat</b>to see what it means and how to reduce it.</div>
    <div class="box mem"><b>Memory hook: "PDMIALD" — "People Don't Make It Absolutely Locked Down"</b>Poor access · Data breach · Misconfiguration · Insecure APIs · Account hijacking · Lack of visibility · DoS/DDoS.</div>
  </article>

  <article class="chapter" id="l07-mon" data-ch="l07">
    <h2><span class="n">8</span>Monitoring in Cloud</h2>
    <div class="box key"><b>Definition</b>Cloud monitoring is a method of <b>reviewing, observing, and managing the operational workflow</b> in a cloud-based IT infrastructure. Manual or automated techniques confirm the <b>availability and performance</b> of websites, servers, applications and other infrastructure.</div>
    <div class="chips"><span class="chip">Datadog</span><span class="chip">AppDynamics</span><span class="chip">Azure Monitor</span><span class="chip">Amazon CloudWatch</span></div>
    <h3>Metrics, Events &amp; Logs</h3>
    <div class="grid3">
      <div class="tile"><h4>📊 Metrics</h4><ul><li>Raw data about resource usage or behaviour</li><li>Collected via a <b>monitoring agent</b></li><li>e.g. CPU, memory, disk space usage</li></ul></div>
      <div class="tile"><h4>⚡ Events</h4><ul><li>Generated when <b>something happens</b></li><li>Capture <b>what, where, when</b></li><li>e.g. events from automation tools</li></ul></div>
      <div class="tile"><h4>📜 Logs</h4><ul><li>Information about <b>what systems have been doing</b></li><li>Extremely valuable in <b>troubleshooting</b></li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook: a car 🚗</b>Metrics = the <b>dashboard gauges</b> (speed, fuel). Events = "<b>door opened</b>" moments. Logs = the <b>trip diary</b>.</div>
  </article>

  <article class="chapter" id="l07-alert" data-ch="l07">
    <h2><span class="n">9</span>Alerts</h2>
    <p>The <b>reactive element</b> of monitoring: triggers actions based on changes in metrics / events / logs.</p>
    <div class="grid2">
      <div class="tile"><h4>Types of alerts</h4><ul><li><b>Threshold-based</b> — e.g. CPU &gt; 80%</li><li><b>Anomaly-detection-based</b> — behaviour unusual compared to normal</li><li><b>Heartbeat</b> — a regular "I'm alive" signal stops arriving</li></ul></div>
      <div class="tile"><h4>Alert outputs</h4><ul><li><b>Notifications</b> (email, SMS, chat)</li><li><b>Automated actions</b> (scale out, restart a VM)</li></ul></div>
    </div>
    <h3>🎮 CPU alarm simulator</h3>
    <div class="calc">
      <div class="row"><label>Threshold <input type="range" id="alT" min="40" max="95" value="80" style="width:140px"></label><b id="alTv"></b>
        <label class="hint"><input type="checkbox" id="alAuto" checked> automated action: scale out</label><button class="btn" id="alRun">▶ Run 20 s of traffic</button></div>
      <svg class="chart" id="alChart" viewBox="0 0 600 160"></svg>
      <div class="log" id="alLog">Press run…</div>
    </div>
  </article>

  ${studyTabs("l07")}
</section>`,
`<div class="tile" style="--c:var(--l07)"><h4>L07 · Security & Monitoring</h4><ul>
  <li>SDS: security implemented/controlled by software; policy-driven, automated</li>
  <li>PLOP: only essential privileges</li>
  <li>IAM: identify, authenticate, authorize; solves PLOP</li>
  <li>IAM parts: logical org, users (own creds, no perms by default), groups (no creds), policies (permissions), roles (RBAC, temporary creds)</li>
  <li>MFA: has, knows, is, where</li>
  <li>Federation: enterprise & web; SSO = one identity, many systems</li>
  <li>Encryption: client/server side; in use/transit/rest; symmetric, asymmetric, hashing</li>
  <li>Risks: poor access, breach, misconfiguration, insecure APIs, hijacking, no visibility, DDoS</li>
  <li>Monitoring tools: Datadog, AppDynamics, Azure Monitor, CloudWatch</li>
  <li>Metrics, events, logs · Alerts: threshold, anomaly, heartbeat → notifications / automated actions</li></ul></div>`);

GAMES.l07 = { opts: ["Has", "Knows", "Is", "Where"], items: [
  { q: "A 6-digit PIN", a: "Knows", why: "Something the user knows." },
  { q: "A fingerprint scan", a: "Is", why: "Biometrics = something the user is." },
  { q: "A hardware security token", a: "Has", why: "Something the user has." },
  { q: "Login only allowed from inside Sri Lanka by GPS", a: "Where", why: "Somewhere the user is (GPS location)." },
  { q: "Face recognition", a: "Is", why: "Biometric." },
  { q: "A smart card", a: "Has", why: "Something the user has." },
  { q: "A password", a: "Knows", why: "Something the user knows." },
  { q: "Voice recognition", a: "Is", why: "Biometric." },
]};

QUIZ.l07 = [
  { q: "Software-defined security is…", o: ["Security only by hardware firewalls", "Security implemented, controlled and managed by security software", "No security", "Physical guards"], a: 1, why: "Software-managed, policy-driven, automated security." },
  { q: "The Principle of Least Privilege says…", o: ["Give everyone admin", "Grant only the privileges essential to perform the function", "Deny everything always", "Share passwords"], a: 1, why: "Only essential privileges." },
  { q: "What solves the Principle of Least Privilege?", o: ["CDN", "IAM", "NAT", "RAID"], a: 1, why: "IAM solves PLOP." },
  { q: "IAM is used to…", o: ["Store files", "Identify, authenticate and authorize users/processes", "Balance load", "Back up data"], a: 1, why: "Identify, authenticate, authorize." },
  { q: "By default, a new IAM user has…", o: ["Full admin rights", "No permission to do anything", "Read access to everything", "Group credentials"], a: 1, why: "Users start with no permissions." },
  { q: "Which IAM component has NO security credentials?", o: ["User", "Group", "Role session", "Root account"], a: 1, why: "Groups are collections of users and have no credentials." },
  { q: "A collection of permissions is a…", o: ["Group", "Policy", "User", "Region"], a: 1, why: "Policy." },
  { q: "Assuming a role gives you…", o: ["Permanent credentials", "Temporary security credentials", "A new user account", "Nothing"], a: 1, why: "Roles provide temporary credentials for the session." },
  { q: "Roles are the main component of…", o: ["MFA", "RBAC (Role-Based Access Control)", "SSO", "DDoS"], a: 1, why: "Role Based Access Control." },
  { q: "Which pair is genuine MFA?", o: ["Password + PIN", "Password + fingerprint", "PIN + security question", "Two passwords"], a: 1, why: "Knows + is = two different factor types." },
  { q: "GPS location as an authentication factor is…", o: ["Something you have", "Something you know", "Something you are", "Somewhere you are"], a: 3, why: "Somewhere the user is." },
  { q: "SSO allows users to…", o: ["Use many passwords", "Move between multiple systems without logging in to each one", "Skip authentication", "Encrypt files"], a: 1, why: "One verified identity across systems." },
  { q: "The two types of identity federation are…", o: ["Public and private", "Enterprise and web", "Symmetric and asymmetric", "Hot and cold"], a: 1, why: "Enterprise identity federation and web identity federation." },
  { q: "Which encryption type cannot be reversed?", o: ["Symmetric", "Asymmetric", "Hashing", "Client-side"], a: 2, why: "Hashing is one-way." },
  { q: "The three stages of data for encryption are…", o: ["In use, in transit, at rest", "Hot, cold, archive", "Create, read, delete", "Full, incremental, differential"], a: 0, why: "Data in use, in transit, at rest." },
  { q: "A storage bucket accidentally left public is an example of…", o: ["DDoS", "Misconfiguration", "Hashing", "SSO"], a: 1, why: "Misconfiguration risk." },
  { q: "Which is a cloud monitoring service listed in the lecture?", o: ["Amazon CloudWatch", "Amazon S3", "Azure Files", "Docker Hub"], a: 0, why: "Datadog, AppDynamics, Azure Monitor, Amazon CloudWatch." },
  { q: "Raw data about CPU, memory and disk usage collected by an agent is…", o: ["Events", "Logs", "Metrics", "Alerts"], a: 2, why: "Metrics." },
  { q: "What captures what happened, where and when?", o: ["Metrics", "Events", "Policies", "Roles"], a: 1, why: "Events." },
  { q: "Which is NOT an alert type in the lecture?", o: ["Threshold based", "Anomaly detection based", "Heartbeat", "Colour based"], a: 3, why: "Threshold, anomaly detection, heartbeat." },
  { q: "Alert outputs can be…", o: ["Notifications and automated actions", "Only emails", "Only logs", "Invoices"], a: 0, why: "Notifications or automated actions." },
];

CARDS.l07 = [
  ["Software-defined security", "Security implemented, controlled, managed by software; policy-driven; automated controls (IDS, segmentation, access)"],
  ["PLOP", "Grant only the privileges essential to perform the intended function"],
  ["IAM", "Framework of policies & tech to give appropriate access; identify, authenticate, authorize; solves PLOP"],
  ["IAM user", "Own credentials, can be in many groups, no permissions by default"],
  ["IAM group", "Collection of users; no security credentials"],
  ["IAM policy", "Collection of permissions that allow or deny requests"],
  ["IAM role", "Collection of policies, core of RBAC, assumed → temporary credentials"],
  ["MFA factors", "Has (token, card) · Knows (password, PIN) · Is (biometrics) · Where (GPS)"],
  ["Federated identity", "Electronic identity linked across multiple identity management systems"],
  ["Federation types", "Enterprise identity federation · Web identity federation"],
  ["SSO", "Move between systems without logging into each — one verified identity"],
  ["Data stages", "In use, In transit, At rest"],
  ["Encryption types", "Symmetric (one key), Asymmetric (public/private), Hashing (one-way)"],
  ["Cloud security risks", "Poor access mgmt, data breach/leak/loss, misconfiguration, insecure APIs, account hijacking, lack of visibility, DoS/DDoS"],
  ["Cloud monitoring", "Reviewing, observing, managing operational workflow; confirms availability & performance"],
  ["Monitoring tools", "Datadog, AppDynamics, Azure Monitor, Amazon CloudWatch"],
  ["Metrics / Events / Logs", "Metrics: raw usage data via agent · Events: what/where/when · Logs: what systems did, troubleshooting"],
  ["Alerts", "Reactive; threshold, anomaly detection, heartbeat → notifications or automated actions"],
];

INITS.push(function l07() {
  // IAM sandbox
  const perms = { dev: ["read:storage", "write:storage", "start:vm"], read: ["read:storage", "read:logs"] };
  const actions = [["Read storage", "read:storage"], ["Write storage", "write:storage"], ["Start VM", "start:vm"], ["Read logs", "read:logs"], ["Delete database", "delete:db"]];
  const g = document.getElementById("iamGroup"), r = document.getElementById("iamRole");
  function iam() {
    const p = new Set(perms[g.value] || []);
    if (r.checked) p.add("delete:db");
    document.getElementById("iamOut").innerHTML = actions.map(([l, k]) => `<div class="${p.has(k) ? "u" : "r"}"><small>${l}</small><b>${p.has(k) ? "✓ Allowed" : "✗ Denied"}</b></div>`).join("");
    document.getElementById("iamNote").textContent = !g.value && !r.checked ? "A new user has NO permissions by default."
      : r.checked ? "The role gives temporary credentials with extra policies for this session only." : "Permissions come from the group's attached policies.";
  }
  g.onchange = r.onchange = iam; iam();

  // alert simulator
  const T = document.getElementById("alT"), svg = document.getElementById("alChart"), log = document.getElementById("alLog");
  const showT = () => document.getElementById("alTv").textContent = T.value + "% CPU";
  T.oninput = showT; showT();
  let running = false;
  document.getElementById("alRun").onclick = () => {
    if (running) return; running = true;
    const thr = +T.value, auto = document.getElementById("alAuto").checked;
    let data = [], servers = 1, fired = false; log.textContent = "";
    let t = 0;
    const tick = setInterval(() => {
      const demand = 35 + 60 * Math.exp(-((t - 9) ** 2) / 18) + Math.random() * 6;
      const cpu = Math.min(100, demand / servers);
      data.push(cpu);
      if (cpu > thr && !fired) {
        fired = true;
        log.textContent += `t=${t}s 🔔 Threshold alert: CPU ${cpu.toFixed(0)}% > ${thr}% → notification sent\n`;
        if (auto) { servers = 2; log.textContent += `t=${t}s 🤖 Automated action: scaled out to 2 servers\n`; }
      }
      if (fired && cpu < thr - 15 && servers === 2 && t > 14) { servers = 1; log.textContent += `t=${t}s ✅ Load dropped, scaled back in\n`; }
      const pts = data.map((v, i) => `${10 + i * 29},${150 - v * 1.4}`).join(" ");
      svg.innerHTML = `<line x1="0" x2="600" y1="${150 - thr * 1.4}" y2="${150 - thr * 1.4}" stroke="var(--bad)" stroke-dasharray="6 4"/><text x="4" y="${145 - thr * 1.4}" font-size="11" fill="var(--bad)">threshold ${thr}%</text><polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="3"/>`;
      if (++t > 20) { clearInterval(tick); running = false; if (!fired) log.textContent += "No alert fired — CPU never crossed the threshold.\n"; }
    }, 180);
  };
});
