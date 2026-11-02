// Lecture 01 — Introduction to Cloud Computing
addLecture(`
<section class="page" id="l01" style="--accent:var(--l01)">
  <div class="lec-head">
    <div class="kicker">Lecture 01 · Cloud Computing</div>
    <h1>Introduction to Cloud Computing ☁️</h1>
    <p class="lead">Outline: <b>Evolution of IT infrastructure → Characteristics → Service models → Deployment models → Cloud service providers → Benefits</b>. Big analogy for the whole lecture: <b>cloud is like electricity from the grid</b>.</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l01-evo" data-ch="l01">
    <h2><span class="n">1</span>Evolution of IT Infrastructure</h2>
    <p>IT went through <b>5 stages</b>. Click each one.</p>
    <div class="stepper">
      <div class="steps">
        <button class="on">① Mainframe / Minicomputers</button>
        <button>② Personal Computer</button>
        <button>③ Client / Server</button>
        <button>④ Web-based Enterprise Apps</button>
        <button>⑤ Cloud / Mobile</button>
      </div>
      <div class="panel on"><h3>Mainframe / Minicomputers</h3><p>One huge central computer shared by everyone through terminals. Very expensive, owned only by big organisations.</p></div>
      <div class="panel"><h3>Personal Computer</h3><p>Every user gets their own computer on the desk. Computing moves to individuals.</p></div>
      <div class="panel"><h3>Client / Server Computing</h3><p>Desktop "clients" ask central "servers" for data and services over a local network.</p></div>
      <div class="panel"><h3>Web-based Enterprise Applications</h3><p>Apps run on servers and are used through a web browser over the internet.</p></div>
      <div class="panel"><h3>Cloud Computing / Mobile Computing</h3><p>Computing resources are rented on demand over the internet and used from anywhere, on any device.</p></div>
    </div>
    <div class="box mem"><b>Memory hook: "My Pet Cat Watches Clouds"</b>Mainframe → PC → Client/Server → Web → Cloud.</div>
  </article>

  <article class="chapter" id="l01-elec" data-ch="l01">
    <h2><span class="n">2</span>The History of Electricity (the analogy)</h2>
    <div class="grid2">
      <div class="tile minus"><h4>🏭 Mid 1800s — factories made their own power</h4><p>They used their own dynamos and generators. Problems:</p><ul>
        <li>Spend a lot of money to buy, install and maintain</li>
        <li>Need specially skilled engineers</li>
        <li>Need spare parts for the equipment</li>
        <li>Higher operating costs — an overhead to the business</li></ul>
        <p style="margin-top:8px">Lots of money, time and effort on something that is <b>neither the core business nor the core skill</b>.</p></div>
      <div class="tile plus"><h4>⚡ Late 1800s — electricity providers</h4><p>Providers ran many generators and sent power to customers over wires. Customers paid a monthly cost. Advantages:</p><ul>
        <li>No need to buy and maintain expensive machines</li>
        <li>No need for specially skilled engineers</li>
        <li>Just connect to the grid and consume power</li>
        <li>No upfront payment — pay for what you consume</li>
        <li>Anyone can consume it; easy to get connected</li></ul></div>
    </div>
    <h3>Cloud computing and the IT industry</h3>
    <p>The IT industry uses cloud computing <b>the same way we use electricity</b>.</p>
    <div class="grid2">
      <div class="tile"><h4>Before cloud</h4><ul><li>Every company had its own data center — expensive to build and maintain</li><li>Had to keep specialised engineers for it</li><li>Deviated from the core business</li></ul></div>
      <div class="tile"><h4>With cloud</h4><ul><li>No need to maintain a data center</li><li>Consume resources as you wish, pay for what you consume</li><li>Focus more on the core business</li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook</b>Own generator = own data center. Power grid = cloud provider. Electricity bill = pay-as-you-go cloud bill.</div>
  </article>

  <article class="chapter" id="l01-trad" data-ch="l01">
    <h2><span class="n">3</span>Traditional IT: building an e-commerce website</h2>
    <p>The old way takes <b>6 – 12 months</b> before you can go live:</p>
    <div class="pipe">
      <div class="stage"><span class="ic">🤔</span><b>Decision to go ahead</b><br><small>Select vendors · POC &amp; evaluate · Architectures · Negotiations</small><br><b>1–2 months</b></div>
      <div class="stage"><span class="ic">🧾</span><b>PO issued</b><br><small>HW shipment · HW/SW licences · Contracts / SLAs</small><br><b>2–3 months</b></div>
      <div class="stage"><span class="ic">🔌</span><b>HW implementation</b><br><small>DC preparation · Cabling &amp; rack mounting · HW installation</small><br><b>1–2 months</b></div>
      <div class="stage"><span class="ic">💻</span><b>SW implementation</b><br><small>Implement · Test · Deploy · UAT</small><br><b>2–4 months</b></div>
      <div class="stage"><span class="ic">🚀</span><b>Go live</b></div>
    </div>

    <h3>Inefficiencies in traditional IT vs the cloud way</h3>
    <div class="row"><button class="chip on" data-cap="trad">Traditional IT</button><button class="chip" data-cap="cloud">The cloud way</button></div>
    <svg class="chart" id="capChart" viewBox="0 0 600 260" role="img" aria-label="IT capacity versus load over time"></svg>
    <div class="legend"><span><i style="background:var(--muted)"></i>Load forecast</span><span><i style="background:var(--accent)"></i>Actual load</span><span><i style="background:#facc15"></i>Allocated capacity</span><span><i style="background:rgba(74,222,128,.5)"></i>Waste</span><span><i style="background:rgba(248,113,113,.6)"></i>Under-supply</span></div>
    <div class="box key" id="capTxt"></div>

    <h3>Cloud: a better alternative</h3>
    <div class="grid2">
      <div class="tile"><b>1 · Provision environments in minutes</b><br>Servers, networks, storage, databases, apps.</div>
      <div class="tile"><b>2 · Pay as you go (PAYG)</b><br>Pay for what you provision as you use it.</div>
      <div class="tile"><b>3 · Add / remove capacity</b><br>As and when required.</div>
      <div class="tile"><b>4 · Destroy and stop paying</b><br>If you don't need it any more.</div>
    </div>
  </article>

  <article class="chapter" id="l01-why" data-ch="l01">
    <h2><span class="n">4</span>Why do we need cloud?</h2>
    <div class="grid3">
      <div class="tile"><h4>🏃 Business agility</h4><ul><li>Faster time-to-market</li><li>Foster innovation</li><li>Flexibility and scalability</li><li>Focus on core business</li></ul></div>
      <div class="tile"><h4>😊 Customer experience</h4><ul><li>Always available services</li><li>Multiple venues / regions</li></ul></div>
      <div class="tile"><h4>💰 Cost</h4><ul><li>Pay-as-you-go</li><li>Transform <b>CAPEX</b> (capital expenditure) into <b>OPEX</b> (operational expenditure)</li><li>Cost savings</li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook: "ACE" — Agility, Customer experience, Expense</b></div>
    <div class="box exam"><b>Exam tip</b>CAPEX = big upfront purchase (buying servers). OPEX = ongoing running cost (monthly cloud bill). Cloud turns CAPEX into OPEX.</div>
  </article>

  <article class="chapter" id="l01-nist" data-ch="l01">
    <h2><span class="n">5</span>NIST Definition of Cloud</h2>
    <div class="box key"><b>NIST (National Institute of Standards and Technology)</b>Cloud computing is a model for enabling <b>ubiquitous, convenient, on-demand network access</b> to a <b>shared pool of configurable computing resources</b> (e.g., networks, servers, storage, applications, and services) that can be <b>rapidly provisioned and released</b> with <b>minimal management effort or service provider interaction</b>.</div>
    <details class="ask"><summary>Fill the blank: "…a shared pool of ______ computing resources"</summary><b>configurable</b></details>
    <details class="ask"><summary>Fill the blank: "…rapidly provisioned and released with minimal ______"</summary><b>management effort or service provider interaction</b></details>
    <details class="ask"><summary>Is cloud a technology or a model?</summary>Cloud is <b>not a technology</b>. It is a <b>business model</b> or a <b>delivery model</b>. The underlying technology behind cloud is <b>virtualization</b>.</details>
  </article>

  <article class="chapter" id="l01-char" data-ch="l01">
    <h2><span class="n">6</span>5 Essential Characteristics of Cloud</h2>
    <div class="box mem"><b>Memory hook: "Only Rich Rabbits Buy Muffins"</b>On-demand self-service · Resource pooling · Rapid elasticity · Broad network access · Measured service.</div>
    <div class="grid3">
      <div class="flip" style="min-height:190px"><div class="inner"><div class="face front"><div class="big">🛒 On-demand self-service</div><small>tap</small></div>
        <div class="face back"><ul><li>Consumers provision computing resources themselves (virtual servers, network, storage)</li><li>Whenever you need it</li><li><b>No interaction with the provider</b> needed</li></ul></div></div></div>
      <div class="flip" style="min-height:190px"><div class="inner"><div class="face front"><div class="big">🏊 Resource pooling</div><small>tap</small></div>
        <div class="face back"><ul><li>Provider's resources are <b>pooled</b></li><li>Dynamically assigned and reassigned to demand</li><li>Customer doesn't know the exact location</li><li>May choose location at a higher level (region, country)</li></ul></div></div></div>
      <div class="flip" style="min-height:190px"><div class="inner"><div class="face front"><div class="big">🪀 Rapid elasticity</div><small>tap</small></div>
        <div class="face back"><ul><li>Elastically provision and release resources</li><li>Can happen <b>automatically</b> in line with demand</li></ul></div></div></div>
      <div class="flip" style="min-height:190px"><div class="inner"><div class="face front"><div class="big">📶 Broad network access</div><small>tap</small></div>
        <div class="face back"><ul><li>Capabilities available over the network</li><li>Accessed through standard mechanisms by <b>heterogeneous clients</b> (phones, laptops…)</li></ul></div></div></div>
      <div class="flip" style="min-height:190px"><div class="inner"><div class="face front"><div class="big">📏 Measured service</div><small>tap</small></div>
        <div class="face back"><ul><li>Resources controlled and optimised with <b>metering</b></li><li><b>Pay-per-use</b></li><li>Usage monitored, controlled and reported</li></ul></div></div></div>
    </div>
  </article>

  <article class="chapter" id="l01-svc" data-ch="l01">
    <h2><span class="n">7</span>Cloud Service Models — IaaS, PaaS, SaaS</h2>
    <p>Press a model to see <b>who manages each layer</b>. The more "as a service", the less you manage.</p>
    <div class="row"><button class="chip" data-sm="onprem">On-premises</button><button class="chip on" data-sm="iaas">IaaS</button><button class="chip" data-sm="paas">PaaS</button><button class="chip" data-sm="saas">SaaS</button></div>
    <div class="layers" id="smLayers"></div>
    <div class="legend"><span><i style="background:var(--accent)"></i>You manage</span><span><i style="background:var(--card2);border:1px dashed var(--muted)"></i>Provider manages</span></div>
    <div class="grid3" style="margin-top:14px">
      <div class="tile"><h4>IaaS — Infrastructure</h4><ul><li>Consumers provision servers, databases, networks and other resources</li><li>Consumers create their own platforms and deploy apps on top</li><li>Provider manages the physical infrastructure and the <b>virtualization layer</b></li></ul><p class="hint">Examples: Compute, CDN, Storage, Service management, Backup &amp; recovery</p></div>
      <div class="tile"><h4>PaaS — Platform</h4><ul><li>Consumers deploy apps they created or acquired; can change hosting configuration</li><li>Apps must use the languages, libraries, services and tools the provider supports</li><li>Provider manages infrastructure <b>and the platform</b></li></ul><p class="hint">Examples: Business intelligence, Database, Dev &amp; test, Integration, App deployment</p></div>
      <div class="tile"><h4>SaaS — Software</h4><ul><li>Use the provider's application running on cloud</li><li>Consumer does <b>not</b> manage infrastructure or application</li><li>Maybe limited user-specific configuration</li></ul><p class="hint">Examples: Email &amp; office, CRM, Collaboration, Content/document mgmt, ERP</p></div>
    </div>
    <div class="box mem"><b>Memory hook: Pizza 🍕</b>IaaS = rent a kitchen (you cook). PaaS = takeaway pizza (you just serve it). SaaS = eat at the restaurant (just eat).</div>
  </article>

  <article class="chapter" id="l01-actors" data-ch="l01">
    <h2><span class="n">8</span>NIST Reference Architecture — 5 Actors</h2>
    <p>The NIST diagram shows the <b>Cloud Provider</b> in the middle (Service orchestration with SaaS/PaaS/IaaS layers, Resource abstraction &amp; control layer, Physical resource layer of hardware and facility; Cloud service management with business support, provisioning/configuration, portability/interoperability; plus Security and Privacy). Around it: Consumer, Auditor (security, privacy-impact and performance audits), Broker (service intermediation, aggregation, arbitrage), and the Carrier along the bottom.</p>
    <div class="chips" data-explain="actor">
      <button class="chip" data-x="A person or organization that maintains a business relationship with, and uses service from, Cloud Providers.">👤 Cloud Consumer</button>
      <button class="chip" data-x="A person, organization, or entity responsible for making a service available to interested parties.">🏢 Cloud Provider</button>
      <button class="chip" data-x="A party that can conduct independent assessment of cloud services, information system operations, performance and security of the cloud implementation.">🔍 Cloud Auditor</button>
      <button class="chip" data-x="An entity that manages the use, performance and delivery of cloud services, and negotiates relationships between Cloud Providers and Cloud Consumers.">🤝 Cloud Broker</button>
      <button class="chip" data-x="An intermediary that provides connectivity and transport of cloud services from Cloud Providers to Cloud Consumers.">🚚 Cloud Carrier</button>
    </div>
    <div class="box eg" data-explain-out="actor"><b>Tap an actor</b>to see the NIST definition.</div>
    <div class="box mem"><b>Memory hook: a wedding 💍</b>Consumer = guest, Provider = caterer, Auditor = food inspector, Broker = wedding planner, Carrier = delivery van.</div>
  </article>

  <article class="chapter" id="l01-deploy" data-ch="l01">
    <h2><span class="n">9</span>Cloud Deployment Models</h2>
    <div class="grid2">
      <div class="flip" style="min-height:250px"><div class="inner"><div class="face front"><div class="big">🌍 Public Cloud</div><small>like a public bus</small></div>
        <div class="face back"><ul><li>Open use by the general public</li><li>Operated by a service provider; on the provider's premises</li><li>Cost-effective · virtually unlimited scalability · zero maintenance · continuous uptime</li><li>Low level of data security · access over internet · multi-tenant · regulatory compliance</li></ul></div></div></div>
      <div class="flip" style="min-height:250px"><div class="inner"><div class="face front"><div class="big">🏠 Private Cloud</div><small>like your own car</small></div>
        <div class="face back"><ul><li>Exclusive use by a <b>single organization</b> (many business units may use it)</li><li>Owned/managed by the org, a third party or both; on or off premises</li><li>High data security · less risky · single tenant &amp; compliance · reliable</li><li>Expensive · management overhead</li></ul></div></div></div>
      <div class="flip" style="min-height:250px"><div class="inner"><div class="face front"><div class="big">🔀 Hybrid Cloud</div><small>car to the station, then bus</small></div>
        <div class="face back"><ul><li><b>Combination of private and public</b> clouds</li><li>Portability of data and apps via standard or proprietary tech</li><li>Secure and safe · cost-effective · flexibility &amp; scalability · portability between private &amp; public · data transfer</li></ul></div></div></div>
      <div class="flip" style="min-height:250px"><div class="inner"><div class="face front"><div class="big">🏘 Community Cloud</div><small>like a school bus</small></div>
        <div class="face back"><ul><li>Exclusive use by a <b>specific community</b> with shared concerns (security, regulation, compliance)</li><li>Owned by a community org, third party or both</li><li>Example: <b>Government clouds</b></li></ul></div></div></div>
    </div>
    <h3>🎮 Game: which deployment model?</h3>
    <div class="game" data-game="l01"></div>
  </article>

  <article class="chapter" id="l01-csp" data-ch="l01">
    <h2><span class="n">10</span>Cloud Service Providers (CSPs)</h2>
    <p>There are close to <b>300</b> CSPs in the world. <b>Top 6</b>: AWS, Microsoft Azure, Google Cloud Platform (GCP), IBM Cloud, Alibaba Cloud, Oracle Cloud Infrastructure (OCI).</p>
    <div class="row"><button class="chip on" data-ms="a">Lecture figures</button><button class="chip" data-ms="b">Statista Q1 2024 chart</button></div>
    <div id="msBars" style="margin-top:10px"></div>
    <div class="box key" id="msTxt"></div>
    <div class="box mem"><b>Memory hook</b>Top 3 = <b>A-A-G</b> (AWS, Azure, Google) ≈ 60% of the market. AWS has been top since 2017.</div>
  </article>

  ${studyTabs("l01")}
</section>`,
`<div class="tile" style="--c:var(--l01)"><h4>L01 · Intro to Cloud</h4><ul>
  <li>Evolution: Mainframe → PC → Client/Server → Web → Cloud/Mobile</li>
  <li>Electricity analogy: own generator → grid, pay for use</li>
  <li>Traditional e-commerce rollout: 6–12 months; waste + under-supply</li>
  <li>Cloud: provision in minutes, PAYG, add/remove, destroy &amp; stop paying</li>
  <li>Why: agility, customer experience, cost (CAPEX → OPEX)</li>
  <li>NIST: ubiquitous, convenient, on-demand network access to shared pool of configurable resources, rapidly provisioned/released, minimal effort</li>
  <li>5 characteristics: on-demand self-service, resource pooling, rapid elasticity, broad network access, measured service</li>
  <li>Cloud = business/delivery model; tech = virtualization</li>
  <li>IaaS / PaaS / SaaS · Actors: consumer, provider, auditor, broker, carrier</li>
  <li>Public, private, hybrid, community · AWS 33%, Azure 20%, GCP 7%</li></ul></div>`);

GAMES.l01 = { opts: ["Public", "Private", "Hybrid", "Community"], items: [
  { q: "A startup rents servers from AWS that are shared with many other customers.", a: "Public", why: "Open use by the general public, multi-tenant, on the provider's premises." },
  { q: "A bank builds a cloud used only by its own business units, for high security.", a: "Private", why: "Exclusive use by a single organization, single tenant." },
  { q: "Several government agencies share one cloud built for their common regulations.", a: "Community", why: "Specific community with shared concerns — government clouds are the slide example." },
  { q: "A hospital keeps patient records on its own cloud but runs its public website on Azure.", a: "Hybrid", why: "Combination of private and public clouds." },
  { q: "Cheapest option, virtually unlimited scale, zero maintenance, but lowest data security.", a: "Public", why: "Those are the public cloud characteristics." },
  { q: "Most expensive with management overhead, but less risky and reliable.", a: "Private", why: "Private cloud: high security but expensive and management overhead." },
  { q: "Data and apps can move between the company's own cloud and a public provider.", a: "Hybrid", why: "Portability between private and public is a hybrid characteristic." },
]};

QUIZ.l01 = [
  { q: "Which is the correct order of IT infrastructure evolution?", o: ["PC → Mainframe → Cloud → Client/Server → Web", "Mainframe → PC → Client/Server → Web-based → Cloud/Mobile", "Client/Server → Mainframe → PC → Web → Cloud", "Web → PC → Mainframe → Cloud → Client/Server"], a: 1, why: "Mainframe/Minicomputers → PC → Client/Server → Web-based enterprise apps → Cloud/Mobile." },
  { q: "The electricity analogy shows that before providers existed, factories…", o: ["Paid monthly bills", "Generated their own electricity with dynamos and generators", "Had no electricity", "Used solar power"], a: 1, why: "Mid-1800s factories generated their own power — costly and not their core business." },
  { q: "How long does the traditional IT process to launch an e-commerce site take?", o: ["1–2 weeks", "6–12 months", "2–3 years", "1 day"], a: 1, why: "Decision (1–2m) + PO (2–3m) + HW (1–2m) + SW (2–4m) = 6–12 months." },
  { q: "In traditional IT, allocated capacity above the actual load is called…", o: ["Under-supply", "Waste of capacities", "Elasticity", "Pooling"], a: 1, why: "Fixed capacity above load = waste; load above capacity = under-supply (a barrier for innovation)." },
  { q: "Cloud transforms which type of spending into which?", o: ["OPEX into CAPEX", "CAPEX into OPEX", "OPEX into taxes", "None"], a: 1, why: "Pay-as-you-go turns capital expenditure into operational expenditure." },
  { q: "Who published the standard definition of cloud computing used in the lecture?", o: ["IEEE", "NIST", "ISO", "AWS"], a: 1, why: "National Institute of Standards and Technology." },
  { q: "Which is NOT one of NIST's 5 essential characteristics?", o: ["Resource pooling", "Rapid elasticity", "Single tenancy", "Measured service"], a: 2, why: "The 5: on-demand self-service, resource pooling, rapid elasticity, broad network access, measured service." },
  { q: "'Provision resources without any interaction with the service provider' describes…", o: ["Broad network access", "On-demand self-service", "Measured service", "Resource pooling"], a: 1, why: "On-demand self-service." },
  { q: "'Customer has no knowledge of the exact location but may specify region/country' describes…", o: ["Resource pooling", "Rapid elasticity", "Measured service", "Broad network access"], a: 0, why: "Resource pooling." },
  { q: "The underlying technology behind cloud is…", o: ["Blockchain", "Virtualization", "5G", "AI"], a: 1, why: "Cloud is a business/delivery model; the technology underneath is virtualization." },
  { q: "In IaaS, the provider manages…", o: ["The applications", "The physical infrastructure and virtualization layer", "Your data", "Your OS patches"], a: 1, why: "IaaS consumers manage OS and up; provider manages physical infra + virtualization." },
  { q: "In PaaS, apps must support…", o: ["Any language at all", "The languages, libraries, services and tools supported by the provider", "Only Java", "Only mainframe code"], a: 1, why: "PaaS restricts you to the provider's supported stack." },
  { q: "CRM, email and ERP delivered over the internet are examples of…", o: ["IaaS", "PaaS", "SaaS", "On-premises"], a: 2, why: "SaaS examples: email & office, CRM, collaboration, content management, ERP." },
  { q: "Which NIST actor negotiates relationships between providers and consumers?", o: ["Cloud Carrier", "Cloud Auditor", "Cloud Broker", "Cloud Consumer"], a: 2, why: "Broker manages use, performance and delivery, and negotiates relationships." },
  { q: "Which NIST actor provides connectivity and transport of cloud services?", o: ["Cloud Carrier", "Cloud Broker", "Cloud Auditor", "Cloud Provider"], a: 0, why: "Carrier = the intermediary for connectivity and transport." },
  { q: "Government clouds are an example of…", o: ["Public cloud", "Private cloud", "Community cloud", "Hybrid cloud"], a: 2, why: "Community cloud: shared concerns like security, regulation, compliance." },
  { q: "Which is a characteristic of private cloud?", o: ["Multi-tenant", "Low data security", "Single tenant & compliance", "Zero maintenance"], a: 2, why: "Private: high security, less risky, single tenant, reliable, expensive, management overhead." },
  { q: "According to the lecture, AWS's market share is about…", o: ["7%", "20%", "33%", "60%"], a: 2, why: "AWS 33% (since 2017), Azure 20%, GCP 7%; top 3 ≈ 60%." },
];

CARDS.l01 = [
  ["5 stages of IT evolution", "Mainframe/Mini → PC → Client/Server → Web-based enterprise apps → Cloud/Mobile"],
  ["Electricity analogy", "Own generator (costly, needs engineers, not core business) → grid (connect, pay per use)"],
  ["Traditional rollout time", "6–12 months: decision, PO, HW implementation, SW implementation, go live"],
  ["Traditional IT inefficiencies", "Waste of capacity (over-supply) and under-supply (barrier to innovation); fixed cost"],
  ["Cloud: 4 better things", "Provision in minutes · PAYG · add/remove capacity · destroy and stop paying"],
  ["Why cloud (3 groups)", "Business agility · Customer experience · Cost (CAPEX → OPEX)"],
  ["NIST definition", "Model for ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources, rapidly provisioned and released with minimal management effort or provider interaction"],
  ["5 essential characteristics", "On-demand self-service, Resource pooling, Rapid elasticity, Broad network access, Measured service"],
  ["Technology or model?", "Model (business / delivery). Underlying technology = virtualization"],
  ["IaaS", "You provision servers/DB/networks and build platforms; provider manages physical infra + virtualization"],
  ["PaaS", "You deploy your apps; provider manages infra + platform; must use supported languages/tools"],
  ["SaaS", "Use provider's app; you manage nothing but limited user settings (email, CRM, ERP)"],
  ["5 NIST actors", "Consumer, Provider, Auditor, Broker, Carrier"],
  ["Public cloud", "General public, provider premises, cheap, unlimited scale, multi-tenant, lower security"],
  ["Private cloud", "Single organization, high security, single tenant, expensive, management overhead"],
  ["Hybrid cloud", "Private + public; portability; flexible and cost-effective"],
  ["Community cloud", "Specific community with shared concerns, e.g. government clouds"],
  ["Top 6 CSPs", "AWS, Azure, GCP, IBM Cloud, Alibaba Cloud, Oracle (OCI) — top 3 ≈ 60%"],
];

INITS.push(function l01() {
  // capacity chart: traditional vs cloud
  const svg = document.getElementById("capChart");
  const W = 600, H = 260, pad = 30;
  const load = t => 60 + t * 0.28 + 28 * Math.sin(t / 45) + 14 * Math.sin(t / 13);
  const pts = []; for (let x = 0; x <= W - pad * 2; x += 6) pts.push([x + pad, H - pad - load(x)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  function draw(mode) {
    let cap;
    if (mode === "trad") cap = x => (x < 180 ? 110 : x < 360 ? 160 : 210);
    else cap = x => load(x - pad) + 8;
    let waste = "", under = "", capPath = "";
    pts.forEach((p, i) => {
      const x = p[0], cy = H - pad - cap(x), ly = p[1];
      capPath += (i ? "L" : "M") + x.toFixed(1) + " " + cy.toFixed(1) + " ";
      if (cy < ly) waste += `<line x1="${x}" x2="${x}" y1="${cy}" y2="${ly}" stroke="rgba(74,222,128,.45)" stroke-width="6"/>`;
      else under += `<line x1="${x}" x2="${x}" y1="${ly}" y2="${cy}" stroke="rgba(248,113,113,.6)" stroke-width="6"/>`;
    });
    svg.innerHTML = `${waste}${under}
      <line x1="${pad}" y1="${H - pad}" x2="${W - 10}" y2="${H - pad}" stroke="currentColor" opacity=".4"/>
      <line x1="${pad}" y1="10" x2="${pad}" y2="${H - pad}" stroke="currentColor" opacity=".4"/>
      <text x="${W - 50}" y="${H - 10}" font-size="11" fill="currentColor">TIME</text>
      <text x="4" y="20" font-size="11" fill="currentColor">IT CAPACITY</text>
      <line x1="${pad}" y1="${H - pad - 55}" x2="${W - pad}" y2="${H - pad - 230}" stroke="var(--muted)" stroke-dasharray="5 5"/>
      <path d="${capPath}" fill="none" stroke="#facc15" stroke-width="3"/>
      <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="3"/>`;
    document.getElementById("capTxt").innerHTML = mode === "trad"
      ? "<b>Traditional IT</b>Capacity is bought in big fixed steps based on a forecast. Above the load = <b>waste of capacities</b> (paid but unused). Below the load = <b>under-supply</b> (customers suffer) — a <b>barrier for innovation</b>. Plus a fixed cost of IT capacities."
      : "<b>The cloud way</b>Capacity follows the actual load: <b>reduction of initial investments</b>, <b>reduction of over-supply</b>, <b>no under-supply</b>, and capacity can be <b>reduced when load drops</b>.";
  }
  document.querySelectorAll("[data-cap]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-cap]").forEach(x => x.classList.toggle("on", x === b)); draw(b.dataset.cap);
  });
  draw("trad");

  // service model layers
  const L = ["Applications", "Data", "Runtime", "Middleware", "Operating System", "Virtualization", "Servers", "Storage", "Networking"];
  const you = { onprem: 9, iaas: 5, paas: 2, saas: 0 };
  const names = { onprem: "On-premises: you manage everything", iaas: "IaaS: you manage OS and above", paas: "PaaS: you manage only apps and data", saas: "SaaS: provider manages everything (securing your data and accounts is still your job — see L02)" };
  function sm(k) {
    document.getElementById("smLayers").innerHTML = `<div class="hint" style="text-align:center">${names[k]}</div>` +
      L.map((n, i) => `<div class="${i < you[k] ? "you" : "them"}"><span>${n}</span><span>${i < you[k] ? "You" : "Provider"}</span></div>`).join("");
  }
  document.querySelectorAll("[data-sm]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-sm]").forEach(x => x.classList.toggle("on", x === b)); sm(b.dataset.sm);
  });
  sm("iaas");

  // market share bars
  const sets = {
    a: { rows: [["AWS", 33], ["Microsoft Azure", 20], ["Google Cloud (GCP)", 7], ["Others", 40]], txt: "<b>Lecture figures</b>Top three hold about <b>60%</b>. AWS 33% and holding since 2017; Azure 20% and rising from only 11% in 2017; GCP 7% and stable; others under 40%." },
    b: { rows: [["AWS", 31], ["Azure", 25], ["Google Cloud", 11], ["Alibaba Cloud", 4], ["Salesforce", 3], ["IBM Cloud", 2], ["Oracle", 2], ["Tencent Cloud", 2]], txt: "<b>Statista Q1 2024</b>\"Amazon maintains cloud lead as Microsoft edges closer.\" Total cloud infrastructure revenue in Q1 2024: <b>$76B</b> (Synergy Research Group)." },
  };
  function ms(k) {
    document.getElementById("msBars").innerHTML = sets[k].rows.map(([n, v]) =>
      `<div style="display:grid;grid-template-columns:150px 1fr 44px;gap:8px;align-items:center;margin-bottom:6px;font-size:.88rem"><span>${n}</span><div class="bar" style="margin:0;height:14px"><i style="width:${v * 2.4}%;background:var(--accent)"></i></div><b>${v}%</b></div>`).join("");
    document.getElementById("msTxt").innerHTML = sets[k].txt;
  }
  document.querySelectorAll("[data-ms]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-ms]").forEach(x => x.classList.toggle("on", x === b)); ms(b.dataset.ms);
  });
  ms("a");
});
