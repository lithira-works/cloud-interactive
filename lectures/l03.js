// Lecture 03 — Compute & Storage Part I (Compute)
addLecture(`
<section class="page" id="l03" style="--accent:var(--l03)">
  <div class="lec-head">
    <div class="kicker">Lecture 03 · Cloud Computing</div>
    <h1>Compute &amp; Storage — Part I 🖥️</h1>
    <p class="lead">Outline: <b>Virtualization / containerization recap → Software-defined compute → Cloud compute services → Instance types → Tenancy &amp; purchasing options → Instance lifecycle → Placement groups</b>.</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l03-recap" data-ch="l03">
    <h2><span class="n">1</span>Virtualization &amp; Containerization Recap</h2>
    <div class="row"><button class="chip on" data-hv="t1">Type 1 hypervisor</button><button class="chip" data-hv="t2">Type 2 hypervisor</button><button class="chip" data-hv="ct">Containers</button></div>
    <div class="stack" id="hvStack" style="max-width:460px;margin:12px auto"></div>
    <div class="box key" id="hvTxt"></div>
    <div class="grid2">
      <div class="tile"><h4>Virtual machine contains</h4>Application · Dependencies · <b>Guest OS</b></div>
      <div class="tile"><h4>Container contains</h4>Application · App dependencies (shares the host OS through the Docker Engine)</div>
    </div>
    <div class="box mem"><b>Memory hook</b>Type <b>1</b> = hypervisor sits <b>1st</b> on the hardware (bare-metal). Type <b>2</b> = hypervisor is <b>2nd</b>, on top of a host OS (like VirtualBox on your laptop).</div>
  </article>

  <article class="chapter" id="l03-sdc" data-ch="l03">
    <h2><span class="n">2</span>Software-Defined Compute</h2>
    <div class="box key"><b>Definition</b>Software-defined compute is when a <b>compute function is virtualized and abstracted from the hardware</b> it resides on.</div>
    <ul class="clean">
      <li>The computational functions of a data center can be <b>pooled across any number of processing units</b>, and the workload <b>dispersed among them</b>.</li>
      <li>Hardware tends to be <b>generic and industry-standard</b>, so it can easily be <b>added to satisfy demand</b>.</li>
    </ul>
    <div class="box mem"><b>Memory hook</b>Software-defined = "the brain is software, the body is cheap standard hardware". You'll see the same idea for storage (L04), networking (L05) and security (L07).</div>
  </article>

  <article class="chapter" id="l03-svc" data-ch="l03">
    <h2><span class="n">3</span>Cloud Compute Services: EC2 vs Azure VM</h2>
    <div class="table-wrap"><table>
      <tr><th></th><th>Amazon EC2</th><th>Azure VM</th></tr>
      <tr><td>What</td><td>AWS's virtual machines in cloud</td><td>Microsoft's virtual machines in cloud</td></tr>
      <tr><td>Model</td><td>IaaS</td><td>IaaS</td></tr>
      <tr><td>Templates</td><td>Pre-configured templates — <b>AMI</b> (Amazon Machine Image)</td><td>Pre-configured templates — <b>Marketplace</b></td></tr>
      <tr><td>Billing</td><td><b>Per second</b></td><td><b>Per minute</b></td></tr>
    </table></div>
    <div class="box exam"><b>Exam tip</b>AW<b>S</b> ends in <b>S</b> → per-<b>S</b>econd. A<b>z</b>ure → per-<b>M</b>inute ("Azure is a Minute slower"). AMI belongs to AWS, Marketplace to Azure.</div>
  </article>

  <article class="chapter" id="l03-types" data-ch="l03">
    <h2><span class="n">4</span>Types of Compute Instances</h2>
    <p>Six families. Each is tuned for a different job. Tap to flip.</p>
    <div class="grid3">
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">⚖ General Purpose</div><small>tap</small></div><div class="face back">Balanced CPU, memory and networking. Web servers, small databases, dev/test.</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">🧠 Compute Optimized</div><small>tap</small></div><div class="face back">High-performance CPUs. Batch processing, gaming servers, scientific modelling, video encoding.</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">🐘 Memory Optimized</div><small>tap</small></div><div class="face back">Lots of RAM. In-memory databases, big caches, real-time big-data analytics.</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">💽 Storage Optimized</div><small>tap</small></div><div class="face back">Fast, high-throughput local disks (high IOPS). Data warehousing, large transactional DBs.</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">🎮 Accelerated Computing</div><small>tap</small></div><div class="face back">Hardware accelerators such as <b>GPUs / FPGAs</b>. Machine learning, graphics rendering.</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">🎈 Burstable Instances</div><small>tap</small></div><div class="face back">Low baseline CPU that can <b>burst</b> above it for short spikes (using credits). Cheap; good for low-traffic sites.</div></div></div>
    </div>
    <div class="box mem"><b>Memory hook: "Good Cooks Make Spicy Asian Burgers"</b>General · Compute · Memory · Storage · Accelerated · Burstable.</div>
  </article>

  <article class="chapter" id="l03-ten" data-ch="l03">
    <h2><span class="n">5</span>Tenancy Options</h2>
    <p>"Tenancy" = who else shares the physical server with you.</p>
    <div class="grid3">
      <div class="tile"><h4>🏨 Default / Shared</h4>Your VM runs on hardware <b>shared with other customers</b>. Cheapest.</div>
      <div class="tile"><h4>🏠 Dedicated Instances</h4>Your VMs run on hardware <b>dedicated to your account</b> — no other customers — but you don't control which physical server.</div>
      <div class="tile"><h4>🏰 Dedicated Hosts</h4>A <b>whole physical server</b> for you, with visibility/control of the host (sockets, cores). Useful for per-core software licences and compliance.</div>
    </div>
    <div class="box mem"><b>Memory hook: hotel 🏨</b>Shared = hostel dorm. Dedicated instance = a private room (hotel picks which). Dedicated host = you rent the whole house and know its address.</div>
  </article>

  <article class="chapter" id="l03-buy" data-ch="l03">
    <h2><span class="n">6</span>Purchasing Options</h2>
    <div class="grid2">
      <div class="tile"><h4>1 · On-demand Instances</h4>Pay by the second/minute, no commitment. Most flexible, highest price. For short or unpredictable workloads.</div>
      <div class="tile"><h4>2 · Reserved Instances</h4>Commit to 1 or 3 years → big discount. For steady, predictable workloads.</div>
      <div class="tile"><h4>3 · Spot Instances</h4>Use the provider's <b>spare capacity</b> at a huge discount, but it <b>can be taken back</b> at short notice. For fault-tolerant, interruptible jobs.</div>
      <div class="tile"><h4>4 · Savings Plan</h4>Commit to a fixed <b>spend per hour</b> for 1 or 3 years, flexible across instance types.</div>
    </div>
    <div class="box mem"><b>Memory hook: travel ✈</b>On-demand = walk-up ticket. Reserved = season ticket. Spot = last-minute standby seat (cheap, may get bumped). Savings plan = prepaid travel card.</div>
    <h3>🎮 Game: pick the purchasing option</h3>
    <div class="game" data-game="l03"></div>
  </article>

  <article class="chapter" id="l03-life" data-ch="l03">
    <h2><span class="n">7</span>Compute Instance Lifecycle</h2>
    <p>Press actions to move the instance between states, like the diagrams on the slide.</p>
    <div class="row"><button class="chip on" data-lc="ec2">AWS EC2</button><button class="chip" data-lc="az">Azure VM</button></div>
    <div class="sm" id="lcStates"></div>
    <div class="acts" id="lcActs"></div>
    <div class="box key" id="lcTxt"></div>
    <div class="grid2">
      <div class="tile"><h4>EC2 states</h4>pending → running → (rebooting) · stopping → stopped · shutting-down → terminated. <b>Stop/start only for EBS-backed instances.</b></div>
      <div class="tile"><h4>Azure VM states</h4>Starting → Running → Stopping → Stopped · Deallocating → Deallocated. From Deallocated: Start or Power off.</div>
    </div>
    <div class="box exam"><b>Exam tip</b>Terminated (EC2) is the end — it can't be started again. In Azure, <b>Stopped</b> still holds the hardware, while <b>Deallocated</b> releases it (so you stop paying for compute).</div>
  </article>

  <article class="chapter" id="l03-place" data-ch="l03">
    <h2><span class="n">8</span>Placement Groups</h2>
    <p>Control <b>where</b> your instances are placed on the physical hardware.</p>
    <div class="grid2">
      <div class="tile"><h4>AWS — Cluster</h4>Pack instances <b>close together</b> in one AZ → lowest latency, highest network throughput (HPC). Risk: one failure can hit many.</div>
      <div class="tile"><h4>AWS — Partition</h4>Split instances into <b>partitions</b> on separate racks → a rack failure only hits one partition (Hadoop, Cassandra, Kafka).</div>
      <div class="tile"><h4>AWS — Spread</h4>Each instance on <b>distinct hardware</b> → maximum isolation for a small number of critical instances.</div>
      <div class="tile"><h4>Azure — Proximity Placement Group</h4>Keep VMs <b>physically close</b> for low latency (Azure's answer to cluster).</div>
    </div>
    <div class="box mem"><b>Memory hook: "CPS" — "Close, Partitioned, Spread"</b>Cluster = huddle together 🤝 · Partition = teams on separate tables · Spread = everyone in a different room. Azure only has <b>P</b>roximity.</div>
  </article>

  ${studyTabs("l03")}
</section>`,
`<div class="tile" style="--c:var(--l03)"><h4>L03 · Compute</h4><ul>
  <li>Type 1 hypervisor on hardware; Type 2 on host OS; containers share OS via engine</li>
  <li>Software-defined compute: compute virtualized/abstracted from HW; pooled; generic HW</li>
  <li>EC2: IaaS, AMI, per-second · Azure VM: IaaS, Marketplace, per-minute</li>
  <li>Instance types: general, compute, memory, storage optimized, accelerated, burstable</li>
  <li>Tenancy: shared, dedicated instances, dedicated hosts</li>
  <li>Purchasing: on-demand, reserved, spot, savings plan</li>
  <li>EC2 lifecycle: pending, running, rebooting, stopping, stopped, shutting-down, terminated</li>
  <li>Azure: starting, running, stopping, stopped, deallocating, deallocated</li>
  <li>Placement: AWS cluster / partition / spread; Azure proximity</li></ul></div>`);

GAMES.l03 = { opts: ["On-demand", "Reserved", "Spot", "Savings Plan"], items: [
  { q: "A database server that must run 24/7 for the next 3 years.", a: "Reserved", why: "Steady, predictable, long-term → reserve for the biggest discount." },
  { q: "A two-day hackathon demo — you're not sure how long you'll need it.", a: "On-demand", why: "Short, unpredictable, no commitment." },
  { q: "Rendering thousands of video frames; it's fine if a job is interrupted and retried.", a: "Spot", why: "Fault-tolerant, interruptible → spare capacity at a big discount." },
  { q: "You commit to spending a fixed $ per hour but want to switch instance families freely.", a: "Savings Plan", why: "Savings Plan = commitment to spend, flexible across instance types." },
  { q: "Testing a new app for a few hours this afternoon.", a: "On-demand", why: "Pay only for the hours, no commitment." },
  { q: "Cheapest possible batch analytics that can stop and restart any time.", a: "Spot", why: "Interruptible workloads suit spot." },
]};

QUIZ.l03 = [
  { q: "A Type 1 hypervisor runs…", o: ["On top of a host OS", "Directly on the hardware", "Inside a container", "In the browser"], a: 1, why: "Type 1 = bare-metal on hardware; Type 2 = on a host OS." },
  { q: "Which layer does a VM have that a container does not?", o: ["Application", "Dependencies", "Guest OS", "Hardware"], a: 2, why: "VMs carry a guest OS; containers share the host OS via the engine." },
  { q: "Software-defined compute means…", o: ["Compute is virtualized and abstracted from the hardware", "Only custom hardware is used", "No virtualization", "Compute runs on phones"], a: 0, why: "Compute function virtualized/abstracted; pooled across processing units; generic hardware." },
  { q: "In software-defined compute, hardware tends to be…", o: ["Proprietary and rare", "Generic and industry-standard", "Mainframes only", "Not needed"], a: 1, why: "Generic hardware is easy to add to satisfy demand." },
  { q: "Amazon EC2 bills…", o: ["Per hour", "Per minute", "Per second", "Per day"], a: 2, why: "EC2 per-second; Azure VM per-minute." },
  { q: "Azure VM pre-configured templates come from the…", o: ["AMI", "Marketplace", "Docker Hub", "App Store"], a: 1, why: "AWS = AMI, Azure = Marketplace." },
  { q: "EC2 and Azure VM are offered as…", o: ["SaaS", "PaaS", "IaaS", "FaaS"], a: 2, why: "Both are IaaS." },
  { q: "Which instance type suits machine learning with GPUs?", o: ["Burstable", "Accelerated Computing", "Storage Optimized", "General Purpose"], a: 1, why: "Accelerated computing uses GPUs/FPGAs." },
  { q: "Which instance type suits an in-memory database?", o: ["Memory Optimized", "Compute Optimized", "Burstable", "Storage Optimized"], a: 0, why: "Memory optimized = lots of RAM." },
  { q: "Which tenancy gives you a whole physical server with host-level visibility?", o: ["Default/Shared", "Dedicated Instances", "Dedicated Hosts", "Spot"], a: 2, why: "Dedicated host = entire physical server you can see/control." },
  { q: "Which purchasing option uses spare capacity and can be interrupted?", o: ["On-demand", "Reserved", "Spot", "Savings Plan"], a: 2, why: "Spot instances." },
  { q: "Which purchasing option is best for steady workloads over 1–3 years?", o: ["Spot", "Reserved Instances", "On-demand", "Free tier"], a: 1, why: "Reserved = commitment for discount." },
  { q: "In EC2, stop/start is available only for…", o: ["Spot instances", "EBS-backed instances", "Windows instances", "Dedicated hosts"], a: 1, why: "The slide marks stopping/stopped as 'EBS-backed instances only'." },
  { q: "Which EC2 state is final?", o: ["stopped", "pending", "terminated", "rebooting"], a: 2, why: "Terminated instances can't be restarted." },
  { q: "Which Azure VM state comes after 'Deallocating'?", o: ["Running", "Deallocated", "Starting", "Stopping"], a: 1, why: "Deallocating → Deallocated." },
  { q: "Which AWS placement group packs instances close together for low latency?", o: ["Spread", "Partition", "Cluster", "Proximity"], a: 2, why: "Cluster placement groups." },
  { q: "Azure's placement group type in the lecture is…", o: ["Cluster", "Spread", "Proximity Placement Group", "Partition"], a: 2, why: "Azure: Proximity Placement Groups." },
];

CARDS.l03 = [
  ["Type 1 vs Type 2 hypervisor", "Type 1: on hardware (bare-metal). Type 2: on a host OS"],
  ["VM vs container contents", "VM: app + dependencies + guest OS. Container: app + dependencies, shares host OS via engine"],
  ["Software-defined compute", "Compute virtualized & abstracted from hardware; pooled across processing units; generic standard hardware"],
  ["Amazon EC2", "AWS VMs · IaaS · AMI templates · per-second billing"],
  ["Azure VM", "Microsoft VMs · IaaS · Marketplace templates · per-minute billing"],
  ["6 instance types", "General purpose, Compute optimized, Memory optimized, Storage optimized, Accelerated computing, Burstable"],
  ["3 tenancy options", "Default/shared · Dedicated instances · Dedicated hosts"],
  ["4 purchasing options", "On-demand · Reserved · Spot · Savings plan"],
  ["Spot instances", "Spare capacity, big discount, can be interrupted"],
  ["EC2 lifecycle", "pending → running ⇄ rebooting; stopping → stopped (EBS only); shutting-down → terminated"],
  ["Azure VM lifecycle", "Starting → Running → Stopping → Stopped; Deallocating → Deallocated"],
  ["AWS placement groups", "Cluster (close, low latency) · Partition (separate racks) · Spread (distinct hardware)"],
  ["Azure placement group", "Proximity Placement Group"],
];

INITS.push(function l03() {
  const hv = {
    t1: [["Virtual machines (VM · VM · VM)", "l-app"], ["Hypervisor (Type 1)", "l-hyp"], ["Hardware", "l-hw"]],
    t2: [["Virtual machines (VM · VM · VM)", "l-app"], ["Hypervisor (Type 2)", "l-hyp"], ["Host OS", "l-host"], ["Hardware", "l-hw"]],
    ct: [["Containers (C · C · C · C · C)", "l-app"], ["Dependency 1 · Dependency 2", "l-lib"], ["Docker Engine", "l-eng"], ["Host OS", "l-host"], ["Hardware", "l-hw"]],
  };
  const txt = {
    t1: "<b>Type 1 (bare-metal)</b>The hypervisor runs directly on the hardware. No host OS in between → faster. Used in data centers and the cloud.",
    t2: "<b>Type 2 (hosted)</b>The hypervisor runs as software on top of a normal host OS. Easy for desktops, but slower.",
    ct: "<b>Containerization</b>No hypervisor and no guest OS. The Docker Engine runs containers that share the host OS kernel and their dependencies.",
  };
  function draw(k) {
    document.getElementById("hvStack").innerHTML = hv[k].map(([n, c]) => `<div class="lay ${c}">${n}</div>`).join("");
    document.getElementById("hvTxt").innerHTML = txt[k];
  }
  document.querySelectorAll("[data-hv]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-hv]").forEach(x => x.classList.toggle("on", x === b)); draw(b.dataset.hv);
  });
  draw("t1");

  // lifecycle state machines; states ending in "ing" auto-advance
  const M = {
    ec2: {
      states: ["pending", "running", "rebooting", "stopping", "stopped", "shutting-down", "terminated"], start: "pending",
      acts: { running: [["Reboot", "rebooting"], ["Stop", "stopping"], ["Terminate", "shutting-down"]], stopped: [["Start", "pending"], ["Terminate", "terminated"]], terminated: [["Launch new from AMI", "pending"]] },
      auto: { pending: "running", rebooting: "running", stopping: "stopped", "shutting-down": "terminated" },
      info: { pending: "Launching from an AMI…", running: "Running — you are billed for compute.", rebooting: "Rebooting, then back to running.", stopping: "Stopping (EBS-backed only).", stopped: "Stopped — can Start again (goes back to pending) or Terminate.", "shutting-down": "Shutting down before termination.", terminated: "Terminated — gone for good. Launch a new one if needed." },
    },
    az: {
      states: ["Starting", "Running", "Stopping", "Stopped", "Deallocating", "Deallocated"], start: "Starting",
      acts: { Running: [["Stop", "Stopping"], ["Deallocate", "Deallocating"]], Stopped: [["Start", "Starting"], ["Deallocate", "Deallocating"]], Deallocated: [["Start", "Starting"], ["Power off", "Stopped"]] },
      auto: { Starting: "Running", Stopping: "Stopped", Deallocating: "Deallocated" },
      info: { Starting: "Starting up…", Running: "Running.", Stopping: "Stopping…", Stopped: "Stopped — the VM still holds its hardware allocation.", Deallocating: "Releasing the hardware…", Deallocated: "Deallocated — hardware released. Start it again or Power off." },
    },
  };
  let cur, m, timer;
  function set(s) {
    cur = s; clearTimeout(timer);
    document.getElementById("lcStates").innerHTML = m.states.map(x => `<button disabled class="${x === s ? "cur" : ""}">${x}</button>`).join("");
    const acts = m.acts[s] || [];
    document.getElementById("lcActs").innerHTML = acts.map(([l, to]) => `<button class="btn" data-to="${to}">${l}</button>`).join("") || `<span class="hint">transitioning…</span>`;
    document.querySelectorAll("#lcActs [data-to]").forEach(b => b.onclick = () => set(b.dataset.to));
    document.getElementById("lcTxt").innerHTML = `<b>${s}</b>${m.info[s]}`;
    if (m.auto[s]) timer = setTimeout(() => set(m.auto[s]), 1100);
  }
  function pick(k) { m = M[k]; set(m.start); }
  document.querySelectorAll("[data-lc]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-lc]").forEach(x => x.classList.toggle("on", x === b)); pick(b.dataset.lc);
  });
  pick("ec2");
});
