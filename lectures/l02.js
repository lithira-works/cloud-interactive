// Lecture 02 — Cloud Core Services and Global Infrastructure
addLecture(`
<section class="page" id="l02" style="--accent:var(--l02)">
  <div class="lec-head">
    <div class="kicker">Lecture 02 · Cloud Computing</div>
    <h1>Cloud Core Services &amp; Global Infrastructure 🌍</h1>
    <p class="lead">Outline: <b>Global infrastructure → Benefits → Core cloud services → Shared responsibility model → Billing &amp; cost → Limits / quotas</b>.</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l02-infra" data-ch="l02">
    <h2><span class="n">1</span>What is Cloud Global Infrastructure?</h2>
    <div class="box key"><b>Definition</b>Global infrastructure is designed and built to deliver a <b>flexible, reliable, scalable, and secure</b> cloud computing environment with <b>high-quality global network performance</b>.</div>
    <ul class="clean">
      <li>A <b>collection of hardware and software resources</b> that make up the cloud.</li>
      <li>Cloud providers maintain <b>global data centers</b> with thousands of IT components: servers, physical storage devices, networking equipment.</li>
    </ul>
    <h3>Benefits of cloud infrastructure</h3>
    <div class="chips"><span class="chip">🔒 Security</span><span class="chip">✅ Availability</span><span class="chip">⚡ Performance</span><span class="chip">📈 Scalability</span><span class="chip">🤸 Flexibility</span></div>
    <div class="box mem"><b>Memory hook: "SAPSF" — "Some Apples Ponder Silly Facts"</b>Security · Availability · Performance · Scalability · Flexibility.</div>
  </article>

  <article class="chapter" id="l02-geo" data-ch="l02">
    <h2><span class="n">2</span>Region → Availability Zone → Data Center</h2>
    <p>Think of it like <b>Country → City → Building</b>. Each layer sits inside the one above.</p>
    <div class="nest"><span class="lbl">🗺 Region (e.g. Asia Pacific – Mumbai)</span>
      <div class="grid3">
        <div class="az"><b>Availability Zone A</b><br><span class="dc">🏢</span><span class="dc">🏢</span></div>
        <div class="az"><b>Availability Zone B</b><br><span class="dc">🏢</span><span class="dc">🏢</span></div>
        <div class="az"><b>Availability Zone C</b><br><span class="dc">🏢</span></div>
      </div>
      <p class="hint" style="margin-top:8px">AZs are linked by high-speed private networking. 🏢 = data center.</p>
    </div>
    <div class="grid3" style="margin-top:14px">
      <div class="tile"><h4>🗺 Region</h4><p>A geographic area. Has <b>multiple</b> Availability Zones.</p></div>
      <div class="tile"><h4>🏙 Availability Zone</h4><ul><li>A <b>fully isolated partition</b> of the global infrastructure</li><li>Made of <b>discrete data centers</b></li><li>Interconnected with other AZs by <b>high-speed private networking</b></li><li><b>You choose</b> your AZs</li></ul></div>
      <div class="tile"><h4>🏢 Data Center</h4><ul><li>Where data resides and processing happens</li><li>Redundant <b>power, networking and connectivity</b></li><li>Housed in a <b>separate facility</b></li></ul></div>
    </div>
    <p class="hint">Maps: aws.amazon.com/about-aws/global-infrastructure · azure.microsoft.com/explore/global-infrastructure</p>

    <h3>Selecting a Region — 4 factors</h3>
    <div class="chips" data-explain="reg">
      <button class="chip" data-x="Laws may say data must stay inside a country (data governance, legal requirements). This can rule regions out completely.">⚖ Data governance &amp; legal</button>
      <button class="chip" data-x="Closer region = lower latency = faster app for your users.">📍 Proximity to customers (latency)</button>
      <button class="chip" data-x="Not every service exists in every region. Check the one you need is available.">🧰 Services available</button>
      <button class="chip" data-x="Prices for the same service differ from region to region.">💲 Costs (vary by region)</button>
    </div>
    <div class="box eg" data-explain-out="reg"><b>Tap a factor</b>to see why it matters.</div>
    <div class="box mem"><b>Memory hook: "LPSC" — "Lawyers Prefer Short Contracts"</b>Legal · Proximity · Services · Cost.</div>
  </article>

  <article class="chapter" id="l02-core" data-ch="l02">
    <h2><span class="n">3</span>Core Cloud Services</h2>
    <div class="grid3">
      <div class="tile" style="text-align:center"><div style="font-size:2rem">🧮</div><h4>Compute</h4><p class="hint">Virtual machines, containers, functions</p></div>
      <div class="tile" style="text-align:center"><div style="font-size:2rem">🕸</div><h4>Network</h4><p class="hint">Virtual networks, gateways, load balancers</p></div>
      <div class="tile" style="text-align:center"><div style="font-size:2rem">🗃</div><h4>Storage</h4><p class="hint">Block, file, object storage</p></div>
    </div>
    <p style="margin-top:12px">Everything else is built on these three. The slide's <b>Azure platform services</b> map shows the wider catalogue:</p>
    <div class="grid3">
      <div class="tile"><b>Media &amp; CDN</b><br><small>Media Services, Media Analytics, Content Delivery Network</small></div>
      <div class="tile"><b>Application Platform</b><br><small>Web Apps, Mobile Apps, API Apps, Cloud Services, Service Fabric, Notification Hubs, Functions</small></div>
      <div class="tile"><b>Data</b><br><small>SQL Database, SQL Data Warehouse, DocumentDB, SQL Server Stretch DB, Redis Cache, Storage Tables, Azure Search</small></div>
      <div class="tile"><b>Integration</b><br><small>API Management, BizTalk Services, Logic Apps, Service Bus</small></div>
      <div class="tile"><b>Intelligence</b><br><small>Cognitive Services, Bot Framework, Cortana</small></div>
      <div class="tile"><b>Compute Services</b><br><small>Container Service, VM Scale Sets, Batch, RemoteApp</small></div>
      <div class="tile"><b>Developer Services</b><br><small>Visual Studio, VS Team Services, Application Insights, Xamarin, HockeyApp, Mobile Engagement</small></div>
      <div class="tile"><b>Analytics &amp; IoT</b><br><small>HDInsight, Machine Learning, Stream Analytics, Data Catalog, Data Lake, IoT Hub, Event Hubs, Data Factory, Power BI Embedded</small></div>
    </div>
  </article>

  <article class="chapter" id="l02-srm" data-ch="l02">
    <h2><span class="n">4</span>Shared Responsibility Model</h2>
    <div class="box key"><b>Definition</b>A framework establishing <b>who is responsible for securing</b> different aspects of the cloud environment — the <b>CSP</b> or the <b>customer</b>.<br>
      <b>CSP</b> = security <b>"OF"</b> the cloud &nbsp;·&nbsp; <b>Customer</b> = security <b>"IN"</b> the cloud</div>
    <div class="box mem"><b>Memory hook: renting a flat 🏢</b>The landlord (CSP) secures the <b>building</b> — walls, locks on the main door. You (customer) secure what's <b>IN</b> your flat — your stuff, who you give keys to.</div>

    <h3>AWS version (layers)</h3>
    <div class="layers">
      <div class="you"><span>Customer data</span><span>Customer</span></div>
      <div class="you"><span>Platform, applications, identity &amp; access management</span><span>Customer</span></div>
      <div class="you"><span>Operating system, network &amp; firewall configuration</span><span>Customer</span></div>
      <div class="you"><span>Client-side encryption · Server-side encryption · Network traffic protection</span><span>Customer</span></div>
      <div class="them"><span>Software: Compute · Storage · Database · Networking</span><span>AWS</span></div>
      <div class="them"><span>Hardware / global infrastructure: Regions · AZs · Edge locations</span><span>AWS</span></div>
    </div>

    <h3>Azure version — changes with the service type</h3>
    <div class="row"><button class="chip" data-srm="0">SaaS</button><button class="chip" data-srm="1">PaaS</button><button class="chip on" data-srm="2">IaaS</button><button class="chip" data-srm="3">On-prem</button></div>
    <div class="layers" id="srmAz"></div>
    <div class="legend"><span><i style="background:var(--accent)"></i>Customer</span><span><i style="background:var(--card2);border:1px dashed var(--muted)"></i>Microsoft</span><span><i style="background:linear-gradient(90deg,var(--accent) 50%,var(--card2) 50%)"></i>Shared</span></div>
    <div class="grid3" style="margin-top:12px">
      <div class="tile"><b>Always retained by customer</b><br><small>Information &amp; data · Devices (mobile, PCs) · Accounts &amp; identities</small></div>
      <div class="tile"><b>Varies by service type</b><br><small>Identity &amp; directory infrastructure · Applications · Network controls · Operating system</small></div>
      <div class="tile"><b>Transfers to cloud provider</b><br><small>Physical hosts · Physical network · Physical datacenter</small></div>
    </div>
    <div class="box exam"><b>Exam tip</b>Your <b>data, devices and accounts</b> are ALWAYS your responsibility — even in SaaS.</div>
  </article>

  <article class="chapter" id="l02-bill" data-ch="l02">
    <h2><span class="n">5</span>How do you pay? Billing &amp; Cost</h2>
    <div class="grid3">
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">🧾 Pay for what you use</div><small>tap</small></div><div class="face back">Pay only for the services you consume, with <b>no large upfront expenses</b>.</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">📦 Pay less when you use more</div><small>tap</small></div><div class="face back">Realise <b>volume-based discounts</b>.</div></div></div>
      <div class="flip" style="min-height:170px"><div class="inner"><div class="face front"><div class="big">📅 Pay less when you reserve</div><small>tap</small></div><div class="face back">Invest in <b>Reserved Instances (RIs)</b> — commit ahead, get a lower price.</div></div></div>
    </div>
    <div class="box mem"><b>Memory hook: a gym 🏋</b>Pay per visit (use) · cheaper per visit if you go a lot (volume) · cheapest with a yearly membership (reserve).</div>
  </article>

  <article class="chapter" id="l02-limits" data-ch="l02">
    <h2><span class="n">6</span>Service Limits / Quotas</h2>
    <ul class="clean">
      <li>Accounts get <b>default quotas</b>.</li>
      <li>Quotas are <b>region specific</b>.</li>
    </ul>
    <div class="grid2">
      <div class="tile plus"><h4>Soft limits</h4>Can be <b>increased on request</b>.</div>
      <div class="tile minus"><h4>Hard limits</h4><b>Cannot</b> be increased.</div>
    </div>
    <h3>Why have service limits?</h3>
    <ul class="clean"><li>Limit potential <b>excessive charges</b> (e.g. a bug spinning up 1000 VMs).</li><li>Limit <b>overuse of resources by a single entity</b> (fair sharing).</li></ul>
    <details class="ask"><summary>Your account hits the default VM limit. Can you get more?</summary>If it is a <b>soft limit</b>, yes — request an increase. If it's a <b>hard limit</b>, no.</details>
  </article>

  ${studyTabs("l02")}
</section>`,
`<div class="tile" style="--c:var(--l02)"><h4>L02 · Core Services & Infra</h4><ul>
  <li>Global infra: flexible, reliable, scalable, secure; HW+SW resources</li>
  <li>Benefits: security, availability, performance, scalability, flexibility</li>
  <li>Region ⊃ AZs (isolated, discrete DCs, private high-speed links) ⊃ data centers (redundant power/network)</li>
  <li>Choose region by: legal/governance, latency, services, cost</li>
  <li>Core services: compute, network, storage</li>
  <li>Shared responsibility: CSP = security OF cloud, customer = IN cloud; data/devices/accounts always customer</li>
  <li>Pay: for use · less when using more (volume) · less when reserving (RIs)</li>
  <li>Quotas: default, region specific; soft (raise on request) vs hard</li></ul></div>`);

QUIZ.l02 = [
  { q: "Which is the correct nesting of global infrastructure?", o: ["Data center ⊃ AZ ⊃ Region", "Region ⊃ Availability Zone ⊃ Data center", "AZ ⊃ Region ⊃ Data center", "Region ⊃ Data center ⊃ AZ"], a: 1, why: "A region has multiple AZs; each AZ consists of discrete data centers." },
  { q: "An Availability Zone is…", o: ["A single server", "A fully isolated partition of the global infrastructure", "A billing account", "A type of storage"], a: 1, why: "AZs are fully isolated, made of discrete data centers, linked by high-speed private networking." },
  { q: "Which is NOT a factor when selecting a region?", o: ["Data governance / legal requirements", "Proximity to customers", "Colour of the provider's logo", "Cost"], a: 2, why: "Legal, latency, service availability, cost." },
  { q: "Choosing a region close to customers mainly reduces…", o: ["Cost", "Latency", "Security", "Quotas"], a: 1, why: "Proximity → lower latency." },
  { q: "Each data center has…", o: ["Redundant power, networking and connectivity in a separate facility", "No backup power", "Only storage", "Shared buildings with other DCs"], a: 0, why: "Redundant power, networking, connectivity; separate facility." },
  { q: "The three core cloud services are…", o: ["Compute, Network, Storage", "Email, Chat, Video", "SaaS, PaaS, IaaS", "CPU, RAM, GPU"], a: 0, why: "Compute, Network, Storage." },
  { q: "In the shared responsibility model, the CSP is responsible for…", o: ["Security IN the cloud", "Security OF the cloud", "Your passwords", "Your data"], a: 1, why: "CSP = OF the cloud; customer = IN the cloud." },
  { q: "In AWS's model, who configures the OS, network and firewall?", o: ["AWS", "Customer", "Both equally", "Nobody"], a: 1, why: "OS, network & firewall configuration is a customer layer." },
  { q: "In Azure's model, which is ALWAYS retained by the customer?", o: ["Physical hosts", "Physical datacenter", "Information and data", "Physical network"], a: 2, why: "Information & data, devices, accounts & identities are always the customer's." },
  { q: "Regions, AZs and edge locations are the responsibility of…", o: ["The customer", "The CSP", "The auditor", "The broker"], a: 1, why: "Hardware/global infrastructure = CSP." },
  { q: "'Pay less when you reserve' refers to…", o: ["Spot instances", "Reserved Instances (RIs)", "Free tier", "Volume discounts"], a: 1, why: "Reserved Instances give a lower price for a commitment." },
  { q: "'Pay less when you use more' refers to…", o: ["Volume-based discounts", "Reserved Instances", "Quotas", "Hard limits"], a: 0, why: "Volume-based discounts." },
  { q: "A soft limit…", o: ["Can never change", "Can be increased upon request", "Applies to all regions at once", "Is a security rule"], a: 1, why: "Soft = increase on request; hard = cannot be increased." },
  { q: "Service quotas are…", o: ["Global for all regions", "Region specific", "Only for storage", "Only for free accounts"], a: 1, why: "Quota is region specific." },
  { q: "One reason for service limits is to…", o: ["Make the cloud slower", "Limit potential excessive charges", "Stop all scaling", "Hide prices"], a: 1, why: "Limit excessive charges and overuse by a single entity." },
];

CARDS.l02 = [
  ["Cloud global infrastructure", "Designed to deliver a flexible, reliable, scalable, secure environment with high-quality global network performance"],
  ["5 benefits of cloud infrastructure", "Security, Availability, Performance, Scalability, Flexibility"],
  ["Region", "Geographic area containing multiple Availability Zones"],
  ["Availability Zone", "Fully isolated partition; discrete data centers; linked by high-speed private networking; you choose them"],
  ["Data center", "Where data lives and is processed; redundant power, networking, connectivity; separate facility"],
  ["4 region selection factors", "Data governance/legal · Proximity (latency) · Services available · Cost"],
  ["Core cloud services", "Compute, Network, Storage"],
  ["Shared responsibility model", "Framework of who secures what: CSP = security OF the cloud, Customer = security IN the cloud"],
  ["Azure: always customer", "Information & data, devices, accounts & identities"],
  ["Azure: varies by service", "Identity & directory infra, applications, network controls, OS"],
  ["Azure: transfers to provider", "Physical hosts, physical network, physical datacenter"],
  ["3 ways to pay", "Pay for what you use · Pay less when you use more · Pay less when you reserve (RIs)"],
  ["Soft vs hard limits", "Soft: can be increased on request. Hard: cannot be increased"],
  ["Why service limits?", "Limit excessive charges; limit overuse by a single entity. Quotas are region specific"],
];

INITS.push(function l02() {
  // Azure shared responsibility: columns SaaS, PaaS, IaaS, On-prem. c = customer, m = microsoft, s = shared
  const rows = [
    ["Information and data", "cccc"], ["Devices (mobile and PCs)", "cccc"], ["Accounts and identities", "cccc"],
    ["Identity and directory infrastructure", "sscc"], ["Applications", "mscc"], ["Network controls", "mscc"],
    ["Operating system", "mmcc"], ["Physical hosts", "mmmc"], ["Physical network", "mmmc"], ["Physical datacenter", "mmmc"],
  ];
  const cls = { c: "you", m: "them", s: "mix" }, who = { c: "Customer", m: "Microsoft", s: "Shared" };
  function draw(i) {
    document.getElementById("srmAz").innerHTML = rows.map(([n, s]) => `<div class="${cls[s[i]]}"><span>${n}</span><span>${who[s[i]]}</span></div>`).join("");
  }
  document.querySelectorAll("[data-srm]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-srm]").forEach(x => x.classList.toggle("on", x === b)); draw(+b.dataset.srm);
  });
  draw(2);
});
