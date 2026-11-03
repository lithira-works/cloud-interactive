// Lecture 06 — Cloud High Availability & Disaster Recovery
addLecture(`
<section class="page" id="l06" style="--accent:var(--l06)">
  <div class="lec-head">
    <div class="kicker">Lecture 06 · Cloud Computing</div>
    <h1>High Availability &amp; Disaster Recovery </h1>
    <p class="lead">How to keep systems running (<b>HA</b>) and how to come back after something terrible happens (<b>DR</b>). Analogy: HA = a car with a <b>spare tyre</b>; DR = <b>insurance</b> after the car is wrecked.</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l06-down" data-ch="l06">
    <h2><span class="n">1</span>Downtime &amp; Availability</h2>
    <p><b>Downtime</b> = a period when a system is unavailable (offline).</p>
    <div class="grid2">
      <div class="tile"><h4>Planned / scheduled</h4>Result of scheduled maintenance, patch installation, reboot.</div>
      <div class="tile"><h4>Unplanned / unscheduled</h4>Result of a HW / SW / network failure, security breach, physical event.</div>
    </div>
    <h3>Availability calculator</h3>
    <div class="calc">
      <div class="row"><label for="avIn"><b>Availability %</b></label><input type="number" id="avIn" value="99.9" step="0.001" min="0" max="100" style="width:140px">
        <button class="chip" data-av="99">99</button><button class="chip on" data-av="99.9">99.9</button><button class="chip" data-av="99.95">99.95</button><button class="chip" data-av="99.99">99.99</button><button class="chip" data-av="99.999">99.999</button></div>
      <div class="res" id="avOut"></div>
    </div>
    <h3>The "nines" table</h3>
    <div class="table-wrap"><table>
      <tr><th>Availability</th><th>Per year</th><th>Per month</th><th>Per day</th></tr>
      <tr><td>90% (one nine)</td><td>36.53 days</td><td>73.05 hours</td><td>2.40 hours</td></tr>
      <tr><td>95% (one and a half nines)</td><td>18.26 days</td><td>36.53 hours</td><td>1.20 hours</td></tr>
      <tr><td>99% (two nines)</td><td>3.65 days</td><td>7.31 hours</td><td>14.40 minutes</td></tr>
      <tr><td>99.5% (two and a half nines)</td><td>1.83 days</td><td>3.65 hours</td><td>7.20 minutes</td></tr>
      <tr><td><b>99.9% (three nines)</b></td><td>8.77 hours</td><td>43.83 minutes</td><td>1.44 minutes</td></tr>
      <tr><td>99.95% (three and a half nines)</td><td>4.38 hours</td><td>21.92 minutes</td><td>43.20 seconds</td></tr>
      <tr><td><b>99.99% (four nines)</b></td><td>52.60 minutes</td><td>4.38 minutes</td><td>8.64 seconds</td></tr>
      <tr><td>99.995% (four and a half nines)</td><td>26.30 minutes</td><td>2.19 minutes</td><td>4.32 seconds</td></tr>
      <tr><td><b>99.999% (five nines)</b></td><td>5.26 minutes</td><td>26.30 seconds</td><td>864 ms</td></tr>
      <tr><td>99.9999% (six nines)</td><td>31.56 seconds</td><td>2.63 seconds</td><td>86.40 ms</td></tr>
      <tr><td>99.99999% (seven nines)</td><td>3.16 seconds</td><td>262.98 ms</td><td>8.64 ms</td></tr>
      <tr><td>99.999999% (eight nines)</td><td>315.58 ms</td><td>26.30 ms</td><td>864 µs</td></tr>
      <tr><td>99.9999999% (nine nines)</td><td>31.56 ms</td><td>2.63 ms</td><td>86.40 µs</td></tr>
    </table></div>
    <div class="box mem"><b>Memory hook: each extra nine ≈ 10× less downtime</b>Remember 3 anchors: <b>99.9% ≈ 8.77 h/year</b> · <b>99.99% ≈ 52.6 min/year</b> · <b>99.999% ≈ 5.26 min/year</b>. Formula: downtime = (1 − availability) × time.</div>
  </article>

  <article class="chapter" id="l06-ha" data-ch="l06">
    <h2><span class="n">2</span>High Availability (HA)</h2>
    <div class="box key"><b>Definition</b>High availability (HA) is a characteristic of a system which aims to ensure an <b>agreed level of operational performance, usually uptime</b>, for a <b>higher-than-normal period</b>.</div>
    <h3>3 principles</h3>
    <div class="grid3">
      <div class="tile"><h4>1 · Eliminate single points of failure</h4>A SPOF is a part that, if it fails, crashes the entire system.</div>
      <div class="tile"><h4>2 · Reliable crossover</h4>Ability to switch systems <b>without losing data</b>.</div>
      <div class="tile"><h4>3 · Detect failures as they occur</h4>Know immediately when something breaks.</div>
    </div>
    <div class="box mem"><b>Memory hook: "SCD" — "Spare, Crossover, Detect"</b>Like a plane: two engines (no SPOF), autopilot takes over smoothly (crossover), warning lights (detection).</div>
  </article>

  <article class="chapter" id="l06-red" data-ch="l06">
    <h2><span class="n">3</span>Redundancy, Failover &amp; Replication</h2>
    <div class="box key"><b>Redundancy</b>The <b>duplication of critical components or functions</b> of a system to increase its reliability.</div>
    <div class="grid2">
      <div class="tile"><h4>Passive redundancy</h4>Include <b>enough excess capacity</b> in the design to cope with a performance decline. (e.g. 3 servers where 2 are enough.)</div>
      <div class="tile"><h4>Active redundancy</h4>Complex systems <b>detect failure and automatically reconfigure</b> to bypass failed items using a <b>voting scheme</b>.</div>
    </div>
    <h3>Failover / Failback</h3>
    <div class="grid2">
      <div class="tile"><h4>Failover</h4>Switching to a redundant / standby / passive instance upon failure. Uses a <b>heartbeat signal</b> to detect failures.</div>
      <div class="tile"><h4>↩ Failback</h4>Restoring the failed system back to its <b>original working state</b>.</div>
    </div>
    <div class="row" style="margin-top:10px"><button class="btn" id="foFail">Primary fails</button><button class="btn ghost" id="foBack">Fix &amp; fail back</button></div>
    <div class="grid2" style="margin-top:8px"><div class="srv" id="foP">Primary — <b>active</b> <span class="hint" id="foHb">heartbeat OK</span></div><div class="srv" id="foS">Standby — passive</div></div>
    <h3>Replication</h3>
    <p>Sharing information to ensure <b>consistency between redundant resources</b> → improves reliability, fault-tolerance, accessibility.</p>
    <div class="grid2">
      <div class="tile"><h4>Active replication</h4>The <b>same request is processed at every replica</b>.</div>
      <div class="tile"><h4>Passive replication</h4>All requests processed in <b>one replica</b>, and the <b>result transferred</b> to the others.</div>
    </div>
    <div class="box mem"><b>Memory hook</b>Active = every chef cooks the same dish. Passive = one chef cooks, then photocopies the recipe result to the others.</div>
  </article>

  <article class="chapter" id="l06-clu" data-ch="l06">
    <h2><span class="n">4</span>HA Clusters &amp; Load Balancing</h2>
    <p><b>HA cluster</b> = a group of computers supporting applications that keep providing service when components fail.</p>
    <div class="grid2">
      <div class="tile"><h4>What must be reliable</h4><ul><li>Node reliability</li><li>Storage (disk mirroring, redundant SANs)</li><li>Network</li><li>Electricity</li></ul></div>
      <div class="tile"><h4>Node configurations</h4><ul><li><b>Active/Active</b> — all nodes serve traffic</li><li><b>Active/Passive</b> — one serves, the other waits on standby</li></ul></div>
    </div>
    <h3>Load balancing</h3>
    <p>Process of <b>efficiently distributing network traffic across a group of backend servers</b>. <b>Session persistence</b>: all requests from a client go to the <b>same backend</b> for the session.</p>
    <div class="lb">
      <div>
        <div class="row"><button class="chip on" data-lb="rr">Round Robin</button><button class="chip" data-lb="lc">Least connections</button><button class="chip" data-lb="lt">Least time</button><button class="chip" data-lb="ip">IP Hash</button></div>
        <div class="row" style="margin-top:8px"><button class="btn" id="lbSend">Send request</button><button class="btn ghost" id="lbBurst">Send 10</button><button class="btn ghost" id="lbReset">Reset</button></div>
        <p class="hint" id="lbTxt" style="margin-top:8px"></p>
      </div>
      <div id="lbSrv"></div>
    </div>
    <div class="box mem"><b>Memory hook: supermarket checkouts </b>Round robin = next till in turn · Least connections = shortest queue · Least time = fastest cashier · IP hash = you always go to "your" cashier.</div>
  </article>

  <article class="chapter" id="l06-bc" data-ch="l06">
    <h2><span class="n">5</span>Business Continuity &amp; Disaster Recovery</h2>
    <div class="grid2">
      <div class="tile"><h4>Business Continuity</h4>The capability of an organization to <b>continue delivering products or services at pre-defined acceptable levels</b> following a disruptive incident.</div>
      <div class="tile"><h4>Business Continuity Planning (BCP)</h4>Creating systems of <b>prevention and recovery</b> to deal with potential threats.<br><small>BCP analysis: Business Impact Analysis · Business Threat Analysis · Business Impact Scenarios</small></div>
    </div>
    <div class="box key"><b>Disaster Recovery (DR)</b><b>Part of the BCP</b>: a set of policies, tools and procedures to enable the recovery or continuation of vital technology infrastructure after a <b>natural or human-induced disaster</b>.</div>
    <h4>5 elements of a DR plan</h4>
    <div class="chips"><span class="chip">DR team</span><span class="chip">Risk evaluation</span><span class="chip">Business-critical asset identification</span><span class="chip">Backup strategy</span><span class="chip">Testing &amp; optimization</span></div>
    <div class="box mem"><b>Memory hook: "TRABT" — "The Rabbit Always Bites Twice"</b>Team · Risk · Assets · Backup · Testing.</div>
  </article>

  <article class="chapter" id="l06-bak" data-ch="l06">
    <h2><span class="n">6</span>Backup Strategy</h2>
    <p>A <b>backup</b> is a copy of data stored elsewhere to restore the original after data loss. <b>Back up</b> (verb) = the process of taking it.</p>
    <p>Four methods. Pick one to see what gets copied each day (Sun = full backup day):</p>
    <div class="row"><button class="chip on" data-bk="full">Full</button><button class="chip" data-bk="inc">Incremental</button><button class="chip" data-bk="diff">Differential</button><button class="chip" data-bk="cdp">Near-CDP</button></div>
    <div id="bkGrid" class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:5px;margin-top:10px"></div>
    <div class="box key" id="bkTxt"></div>
  </article>

  <article class="chapter" id="l06-tiers" data-ch="l06">
    <h2><span class="n">7</span>DR Tiers (0 – 7)</h2>
    <p>Higher tier = faster recovery, less data loss, more cost. Click a tier.</p>
    <div class="ladder" id="ladder"></div>
    <div class="box eg" id="ladTxt"><b>Tier 0</b>No off-site data.</div>
    <div class="box mem"><b>Memory hook</b>0 = nothing → 1–2 = backups (2 adds a hot site) → 3 = electronic vaulting → 4 = point-in-time copies → 5 = transaction integrity → 6 = zero/little loss → 7 = fully automated.</div>
  </article>

  <article class="chapter" id="l06-obj" data-ch="l06">
    <h2><span class="n">8</span>Recovery Objectives: RTO, RPO, RCO</h2>
    <div class="grid3">
      <div class="tile"><h4>RTO</h4>Recovery <b>Time</b> Objective — targeted period in which a business process <b>must be restored</b> after a disaster.</div>
      <div class="tile"><h4>RPO</h4>Recovery <b>Point</b> Objective — targeted period in which <b>data loss is acceptable</b>.</div>
      <div class="tile"><h4>RCO</h4>Recovery <b>Consistency</b> Objective — amount of <b>data inconsistency</b> tolerated in a recovered data set.</div>
    </div>
    <div class="calc" style="margin-top:12px">
      <div class="row"><label>Last backup <input type="range" id="rpoR" min="0" max="12" value="4" style="width:140px"></label><b id="rpoV"></b>
        <label>Back online <input type="range" id="rtoR" min="0" max="12" value="6" style="width:140px"></label><b id="rtoV"></b></div>
      <div class="timeline" id="tl"></div>
    </div>
    <div class="box mem"><b>Memory hook</b>RP<b>O</b> looks <b>backwards</b> ← (how much data you lose since the last backup). RT<b>O</b> looks <b>forwards</b> → (how long until you're back). "Point" = point in the past, "Time" = time to come.</div>
    <div class="box key"><b>Cloud computing gives you</b>Scalability · Availability · Reliability — the building blocks of HA and DR.</div>
  </article>

  ${studyTabs("l06")}
</section>`,
`<div class="tile" style="--c:var(--l06)"><h4>L06 · HA & DR</h4><ul>
  <li>Downtime: planned vs unplanned · 99.9% = 8.77 h/yr, 99.99% = 52.6 min/yr, 99.999% = 5.26 min/yr</li>
  <li>HA: agreed uptime for higher-than-normal period; no SPOF, reliable crossover, failure detection</li>
  <li>Redundancy passive (excess capacity) vs active (detect + reconfigure, voting)</li>
  <li>Failover (heartbeat) / failback · Replication active (all process) vs passive (one processes, copies result)</li>
  <li>HA clusters: active/active, active/passive · LB: round robin, least connections, least time, IP hash; session persistence</li>
  <li>BC, BCP (impact/threat analysis, scenarios); DR is part of BCP</li>
  <li>DR plan: team, risk, critical assets, backup, testing</li>
  <li>Backups: full, incremental, differential, near-CDP · DR tiers 0–7</li>
  <li>RTO (time to restore), RPO (acceptable data loss), RCO (inconsistency)</li></ul></div>`);

QUIZ.l06 = [
  { q: "Downtime caused by a scheduled patch installation is…", o: ["Unplanned", "Planned", "A disaster", "Failback"], a: 1, why: "Planned/scheduled downtime: maintenance, patches, reboots." },
  { q: "99.9% availability allows roughly how much downtime per year?", o: ["5.26 minutes", "52.6 minutes", "8.77 hours", "3.65 days"], a: 2, why: "Three nines ≈ 8.77 hours/year." },
  { q: "99.999% (five nines) allows about…", o: ["5.26 minutes per year", "52.6 minutes per year", "8.77 hours per year", "1 day per year"], a: 0, why: "Five nines ≈ 5.26 min/year." },
  { q: "Which is NOT one of the HA principles?", o: ["Eliminate single points of failure", "Reliable crossover", "Detect failures as they occur", "Buy the cheapest hardware"], a: 3, why: "No SPOF, reliable crossover, failure detection." },
  { q: "A single point of failure is…", o: ["A backup site", "A part that, if it fails, crashes the entire system", "A load balancer algorithm", "A DR tier"], a: 1, why: "Definition of SPOF." },
  { q: "Active redundancy uses…", o: ["Only extra capacity", "Failure detection, automatic reconfiguration and a voting scheme", "Manual restarts", "Tape backups"], a: 1, why: "Passive = excess capacity; active = detect + reconfigure with voting." },
  { q: "Failover detects failures using…", o: ["A heartbeat signal", "Email", "A spreadsheet", "DNS"], a: 0, why: "Heartbeat signals detect failures." },
  { q: "Restoring a failed system back to its original working state is…", o: ["Failover", "Failback", "Replication", "Load balancing"], a: 1, why: "Failback." },
  { q: "Processing the same request at every replica is…", o: ["Passive replication", "Active replication", "Differential backup", "Session persistence"], a: 1, why: "Active replication." },
  { q: "Sending all requests from one client to the same backend server is…", o: ["Round robin", "Session persistence", "Least time", "Failover"], a: 1, why: "Session persistence." },
  { q: "Which load balancing algorithm sends traffic to the server with the fewest active connections?", o: ["Round robin", "IP hash", "Least connections", "Least time"], a: 2, why: "Least connections." },
  { q: "Disaster recovery is…", o: ["Separate from business continuity", "Part of the Business Continuity Plan", "A load balancing method", "A backup type"], a: 1, why: "DR is part of BCP." },
  { q: "Which is NOT an element of a DR plan?", o: ["DR team", "Risk evaluation", "Backup strategy", "Marketing campaign"], a: 3, why: "Team, risk, critical assets, backup, testing & optimization." },
  { q: "Which backup copies only the changes since the LAST backup of any kind?", o: ["Full", "Incremental", "Differential", "Mirror"], a: 1, why: "Incremental = since last backup. Differential = since last full." },
  { q: "Which backup copies all changes since the last FULL backup?", o: ["Incremental", "Differential", "Full", "None"], a: 1, why: "Differential grows each day until the next full." },
  { q: "DR Tier 0 means…", o: ["Zero data loss", "No off-site data", "Fully automated", "Hot site"], a: 1, why: "Tier 0 = no off-site data; Tier 6 = zero or little data loss." },
  { q: "DR Tier 7 is…", o: ["Electronic vaulting", "Point-in-time copies", "Highly automated, business-integrated solution", "Data backup, no hot site"], a: 2, why: "Tier 7 = highly automated, business-integrated." },
  { q: "The targeted period within which a business process must be restored is…", o: ["RPO", "RTO", "RCO", "SLA"], a: 1, why: "Recovery Time Objective." },
  { q: "The acceptable amount of data loss measured in time is…", o: ["RTO", "RPO", "RCO", "MTTR"], a: 1, why: "Recovery Point Objective." },
  { q: "RCO measures…", o: ["Recovery cost", "Tolerated data inconsistency in a recovered data set", "Network latency", "Downtime per day"], a: 1, why: "Recovery Consistency Objective." },
];

CARDS.l06 = [
  ["Downtime types", "Planned (maintenance, patch, reboot) · Unplanned (HW/SW/NW failure, breach, physical)"],
  ["Nines anchors", "99.9% = 8.77 h/yr · 99.99% = 52.6 min/yr · 99.999% = 5.26 min/yr"],
  ["High availability", "Ensure an agreed level of operational performance (usually uptime) for a higher-than-normal period"],
  ["3 HA principles", "Eliminate single points of failure · Reliable crossover · Detect failures as they occur"],
  ["Redundancy", "Duplicating critical components to increase reliability"],
  ["Passive vs active redundancy", "Passive: excess capacity. Active: detect failure, reconfigure automatically, voting scheme"],
  ["Failover / failback", "Failover: switch to standby (heartbeat). Failback: restore original system"],
  ["Active vs passive replication", "Active: same request at every replica. Passive: one processes, result copied"],
  ["HA cluster", "Group of computers that keep service running when parts fail; active/active or active/passive"],
  ["Load balancing algorithms", "Round robin, Least connections, Least time, IP hash"],
  ["Session persistence", "All requests from a client go to the same backend for the session"],
  ["Business continuity", "Continue delivering at pre-defined acceptable levels after disruption"],
  ["BCP analysis", "Business impact analysis, Business threat analysis, Business impact scenarios"],
  ["Disaster recovery", "Part of BCP: policies, tools, procedures to recover vital tech after disaster"],
  ["DR plan elements", "DR team, Risk evaluation, Critical asset identification, Backup strategy, Testing & optimization"],
  ["Backup methods", "Full, Incremental, Differential, Near Continuous Data Protection"],
  ["DR tiers", "0 none · 1 backup no hot site · 2 backup + hot site · 3 e-vaulting · 4 point-in-time · 5 transaction integrity · 6 zero/little loss · 7 automated"],
  ["RTO / RPO / RCO", "RTO: time to restore · RPO: acceptable data loss · RCO: acceptable inconsistency"],
];

INITS.push(function l06() {
  // availability calculator
  const fmt = s => s >= 86400 ? (s / 86400).toFixed(2) + " days" : s >= 3600 ? (s / 3600).toFixed(2) + " hours" : s >= 60 ? (s / 60).toFixed(2) + " minutes" : s >= 1 ? s.toFixed(2) + " seconds" : (s * 1000).toFixed(2) + " ms";
  const inp = document.getElementById("avIn");
  function av() {
    const p = Math.min(100, Math.max(0, +inp.value || 0)), d = 1 - p / 100;
    const Y = 365.25 * 86400;
    document.getElementById("avOut").innerHTML = [["Per year", Y], ["Per month", Y / 12], ["Per week", 7 * 86400], ["Per day", 86400]]
      .map(([l, t]) => `<div class="u"><small>${l}</small><b>${fmt(d * t)}</b></div>`).join("");
  }
  inp.oninput = av;
  document.querySelectorAll("[data-av]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-av]").forEach(x => x.classList.toggle("on", x === b)); inp.value = b.dataset.av; av();
  });
  av();

  // failover demo
  const P = document.getElementById("foP"), S = document.getElementById("foS"), hb = document.getElementById("foHb");
  document.getElementById("foFail").onclick = () => {
    P.innerHTML = "Primary — <b style='color:var(--bad)'>failed</b> <span class='hint'>heartbeat lost</span>";
    S.innerHTML = "Standby — <b style='color:var(--good)'>now active (failover)</b>"; S.classList.add("flash"); P.classList.remove("flash");
  };
  document.getElementById("foBack").onclick = () => {
    P.innerHTML = "Primary — <b>active</b> <span class='hint'>heartbeat OK (failed back)</span>";
    S.innerHTML = "Standby — passive"; S.classList.remove("flash"); P.classList.add("flash");
  };

  // load balancer simulation
  const servers = [{ n: "Server A", speed: 1, c: [] }, { n: "Server B", speed: 2, c: [] }, { n: "Server C", speed: 1.5, c: [] }];
  let algo = "rr", rr = 0, client = 0;
  const desc = {
    rr: "Round robin: A → B → C → A… each server in turn.",
    lc: "Least connections: goes to the server with the fewest active connections.",
    lt: "Least time: picks the server with the fastest response (B is the fastest here) weighted by its load.",
    ip: "IP hash: a hash of the client IP picks the server, so the same client always lands on the same server (like session persistence).",
  };
  function draw(hit) {
    document.getElementById("lbSrv").innerHTML = servers.map((s, i) => `<div class="srv ${i === hit ? "flash" : ""}"><b style="min-width:70px">${s.n}</b><span class="dots">${s.c.map(c => `<i title="client ${c}"></i>`).join("")}</span><small class="hint">${s.c.length}</small></div>`).join("");
    document.getElementById("lbTxt").textContent = desc[algo];
  }
  function send() {
    client++;
    const ipClient = ["10.0.0.7", "10.0.0.8", "10.0.0.9"][client % 3];
    let i;
    if (algo === "rr") i = rr++ % 3;
    else if (algo === "lc") i = servers.reduce((b, s, k) => s.c.length < servers[b].c.length ? k : b, 0);
    else if (algo === "lt") i = servers.reduce((b, s, k) => (s.c.length + 1) / s.speed < (servers[b].c.length + 1) / servers[b].speed ? k : b, 0);
    else i = ipClient.split(".").reduce((a, o) => a + +o, 0) % 3;
    servers[i].c.push(algo === "ip" ? ipClient.split(".")[3] : client);
    // finished connections drop off randomly so least-connections has something to do
    servers.forEach(s => { if (s.c.length > 1 && Math.random() < 0.25 * s.speed) s.c.shift(); });
    draw(i);
  }
  document.querySelectorAll("[data-lb]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-lb]").forEach(x => x.classList.toggle("on", x === b)); algo = b.dataset.lb; servers.forEach(s => s.c = []); rr = 0; draw();
  });
  document.getElementById("lbSend").onclick = send;
  document.getElementById("lbBurst").onclick = () => { for (let k = 0; k < 10; k++) setTimeout(send, k * 120); };
  document.getElementById("lbReset").onclick = () => { servers.forEach(s => s.c = []); rr = 0; draw(); };
  draw();

  // backup methods
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const bk = {
    full: [d => "All data", "<b>Full backup</b>Copies <b>everything</b> every time. Easiest restore (one backup), but slowest and uses the most storage."],
    inc: [d => d ? "Changes since " + days[d - 1] : "Full", "<b>Incremental</b>Copies only what changed <b>since the last backup (of any kind)</b>. Fastest and smallest, but restore needs the full + every incremental in order."],
    diff: [d => d ? "Changes since Sun" : "Full", "<b>Differential</b>Copies everything changed <b>since the last FULL backup</b>. Grows each day; restore needs just the full + the latest differential."],
    cdp: [d => d ? "Every change, seconds later" : "Full", "<b>Near Continuous Data Protection</b>Changes are captured almost continuously (every few seconds/minutes) → very small RPO."],
  };
  function bkDraw(k) {
    document.getElementById("bkGrid").innerHTML = days.map((d, i) => {
      const size = k === "full" || !i ? 100 : k === "diff" ? 15 * i : k === "inc" ? 15 : 40;
      return `<div class="tile" style="padding:8px;text-align:center;font-size:.72rem"><b>${d}</b><div style="height:60px;display:flex;align-items:flex-end;justify-content:center;margin:4px 0"><i style="display:block;width:70%;height:${size}%;background:var(--accent);border-radius:4px"></i></div>${bk[k][0](i)}</div>`;
    }).join("");
    document.getElementById("bkTxt").innerHTML = bk[k][1];
  }
  document.querySelectorAll("[data-bk]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-bk]").forEach(x => x.classList.toggle("on", x === b)); bkDraw(b.dataset.bk);
  });
  bkDraw("full");

  // DR tiers ladder
  const T = ["No off-site data", "Data backup, no hot site", "Data backup with hot site", "Electronic vaulting", "Point-in-time copies", "Transaction integrity", "Zero or little data loss", "Highly automated, business-integrated solution"];
  const lad = document.getElementById("ladder");
  lad.innerHTML = T.map((t, i) => `<button data-t="${i}" style="margin-left:${i * 10}px"><b>Tier ${i}</b>${t}</button>`).reverse().join("");
  lad.querySelectorAll("button").forEach(b => b.onclick = () => {
    lad.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    const i = +b.dataset.t;
    document.getElementById("ladTxt").innerHTML = `<b>Tier ${i}: ${T[i]}</b>${i < 3 ? "Low cost, slow recovery, more data loss." : i < 6 ? "Middle ground: faster recovery and less data loss." : "Highest cost, fastest recovery, (almost) no data loss."}`;
  });

  // RPO / RTO timeline
  const rpo = document.getElementById("rpoR"), rto = document.getElementById("rtoR");
  function tl() {
    const W = 100, mid = 50, sc = 3.6;
    const a = mid - rpo.value * sc, b = mid + rto.value * sc;
    document.getElementById("rpoV").textContent = rpo.value + " h before";
    document.getElementById("rtoV").textContent = rto.value + " h after";
    document.getElementById("tl").innerHTML = `<div class="ln"></div>
      <div class="seg" style="left:${a}%;width:${mid - a}%;background:var(--warn)"></div>
      <div class="seg" style="left:${mid}%;width:${b - mid}%;background:var(--bad)"></div>
      <div class="mk" style="left:${a}%;color:var(--good)">last backup</div>
      <div class="mk" style="left:${mid}%;color:var(--bad)">disaster</div>
      <div class="mk" style="left:${Math.min(b, W)}%;color:var(--good)">restored</div>
      <div class="lab" style="left:${(a + mid) / 2}%;color:var(--warn)">RPO ${rpo.value}h data lost</div>
      <div class="lab" style="left:${(mid + b) / 2}%;color:var(--bad)">RTO ${rto.value}h down</div>`;
  }
  rpo.oninput = rto.oninput = tl; tl();
});
