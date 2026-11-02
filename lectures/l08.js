// Lecture 08 — Cloud Database & Analytics Services
addLecture(`
<section class="page" id="l08" style="--accent:var(--l08)">
  <div class="lec-head">
    <div class="kicker">Lecture 08 · Cloud Computing</div>
    <h1>Cloud Database &amp; Analytics Services 🗄️</h1>
    <p class="lead">Story line: <b>how to store data</b> (SQL vs NoSQL) → <b>what you do with it</b> (OLTP vs OLAP) → NoSQL types → CAP → <b>caching</b> → <b>analytics</b> (data warehouse, data lake, real-time processing).</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l08-models" data-ch="l08">
    <h2><span class="n">1</span>Database Models: Relational vs Non-relational</h2>
    <div class="grid2">
      <div class="tile"><h4>🧾 Relational / SQL</h4><ul>
        <li>Highly structured <b>table</b> organization</li><li>Rigidly-defined formats</li><li>Dependencies among tables</li>
        <li>Enforce <b>ACID</b> (Atomicity, Consistency, Isolation, Durability)</li><li>Reduces anomalies, enforces integrity</li><li>Use <b>SQL</b> to access data</li>
        <li>MS SQL, MySQL, Oracle, PostgreSQL, Amazon RDS</li></ul></div>
      <div class="tile"><h4>📦 Non-relational / NoSQL</h4><ul>
        <li><b>Document</b> oriented</li><li>Large and complex queries</li><li>Supports <b>rapidly changing designs</b></li>
        <li>MongoDB, Cassandra, Cosmos DB, Redis, CouchDB, Aurora</li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook</b>SQL = a strict <b>Excel sheet</b> with fixed columns. NoSQL = a <b>folder of JSON notes</b> — each can look different. ACID = "<b>A</b>ll <b>C</b>ats <b>I</b>gnore <b>D</b>ogs".</div>
  </article>

  <article class="chapter" id="l08-work" data-ch="l08">
    <h2><span class="n">2</span>Database Workloads: OLTP vs OLAP</h2>
    <div class="table-wrap"><table>
      <tr><th></th><th>OLTP — Online Transaction Processing</th><th>OLAP — Online Analytical Processing</th></tr>
      <tr><td>Focus</td><td>Operational data</td><td>Historical data</td></tr>
      <tr><td>Purpose</td><td>Transaction processing</td><td>Data analysis and reporting</td></tr>
      <tr><td>Queries</td><td>Small, simple ad-hoc queries</td><td>Large, complex queries (data warehouses)</td></tr>
      <tr><td>Response</td><td>Milliseconds</td><td>Seconds to hours</td></tr>
      <tr><td>Design</td><td>Highly normalized</td><td>Typically denormalized</td></tr>
    </table></div>
    <div class="box mem"><b>Memory hook</b>OL<b>T</b>P = <b>T</b>ill at the shop 🛒 (one sale, instantly). OL<b>A</b>P = <b>A</b>nalyst's yearly report 📈 (millions of rows, takes time).</div>
    <h3>Models × workloads</h3>
    <div class="grid4">
      <div class="q2"><h4>Relational / OLTP</h4>Relational databases<br><small>Oracle, PostgreSQL, MS SQL, MySQL</small></div>
      <div class="q2"><h4>Relational / OLAP</h4>Relational analytics<br><small>Oracle, PostgreSQL, MS SQL, MySQL</small></div>
      <div class="q2"><h4>Non-relational / OLTP</h4>Key-value, columnar, documents<br><small>MongoDB, Cassandra, Riak</small></div>
      <div class="q2"><h4>Non-relational / OLAP</h4>Big-data analytics<br><small>Hadoop, HDInsight</small></div>
    </div>
    <h3>🎮 Game: OLTP or OLAP?</h3>
    <div class="game" data-game="l08w"></div>
  </article>

  <article class="chapter" id="l08-nosql" data-ch="l08">
    <h2><span class="n">3</span>Four Types of NoSQL Databases</h2>
    <div class="row"><button class="chip on" data-ns="kv">🔑 Key-Value</button><button class="chip" data-ns="doc">📄 Document</button><button class="chip" data-ns="col">🏛 Columnar</button><button class="chip" data-ns="graph">🕸 Graph</button></div>
    <div class="grid2" style="margin-top:12px;align-items:start">
      <div id="nsTxt"></div>
      <pre class="log" id="nsEx" style="margin:0;min-height:150px"></pre>
    </div>
    <h3>Comparison</h3>
    <div class="table-wrap"><table>
      <tr><th>Type</th><th>Flexibility</th><th>Complexity</th><th>Performance</th><th>Scalability</th></tr>
      <tr><td>Key-value store</td><td>High</td><td>None</td><td>High</td><td>High</td></tr>
      <tr><td>Column store</td><td>Moderate</td><td>Low</td><td>High</td><td>High</td></tr>
      <tr><td>Document</td><td>High</td><td>Low</td><td>High</td><td>Variable (High)</td></tr>
      <tr><td>Graph DB</td><td>High</td><td>High</td><td>Variable</td><td>Variable</td></tr>
    </table></div>
    <div class="box mem"><b>Memory hook: "KDCG" — "Kids Draw Colourful Giraffes"</b>Key-value = <b>locker number → bag</b> · Document = <b>JSON file</b> · Columnar = read a <b>whole column</b> fast · Graph = <b>Facebook friends map</b>.</div>
    <h3>🎮 Game: which NoSQL type?</h3>
    <div class="game" data-game="l08n"></div>
  </article>

  <article class="chapter" id="l08-cap" data-ch="l08">
    <h2><span class="n">4</span>CAP Theorem (database view)</h2>
    <svg viewBox="0 0 360 300" class="chart" style="max-width:380px" role="img" aria-label="CAP theorem Venn diagram">
      <circle cx="180" cy="100" r="85" fill="#4ade80" fill-opacity=".28" stroke="#4ade80"/>
      <circle cx="120" cy="195" r="85" fill="#38bdf8" fill-opacity=".28" stroke="#38bdf8"/>
      <circle cx="240" cy="195" r="85" fill="#fb923c" fill-opacity=".28" stroke="#fb923c"/>
      <text x="180" y="62" text-anchor="middle" font-weight="700" fill="currentColor">Consistency</text>
      <text x="85" y="235" text-anchor="middle" font-weight="700" fill="currentColor">Availability</text>
      <text x="275" y="235" text-anchor="middle" font-weight="700" fill="currentColor">Partitioning</text>
      <text x="138" y="148" text-anchor="middle" fill="currentColor" font-weight="700">CA</text>
      <text x="222" y="148" text-anchor="middle" fill="currentColor" font-weight="700">CP</text>
      <text x="180" y="225" text-anchor="middle" fill="currentColor" font-weight="700">AP</text>
      <text x="180" y="170" text-anchor="middle" fill="var(--bad)" font-size="22" font-weight="700">✕</text>
    </svg>
    <div class="grid3">
      <div class="tile"><h4>Consistency</h4>All clients see the <b>same view of data</b>, even right after an update or delete.</div>
      <div class="tile"><h4>Availability</h4>All clients can <b>find a replica of data</b>, even in case of partial node failures.</div>
      <div class="tile"><h4>Partitioning</h4>The system continues to work as expected, even in presence of <b>partial network failure</b>.</div>
    </div>
    <p class="hint">The ✕ in the middle = you can't have all three. More detail in Lecture 04.</p>
  </article>

  <article class="chapter" id="l08-cache" data-ch="l08">
    <h2><span class="n">5</span>Database Caching</h2>
    <div class="box key"><b>Definition</b>Caching is a buffering technique that <b>stores frequently requested data in temporary memory</b>. Facilitates data access and <b>reduces database workloads</b>.</div>
    <h3>🎮 Cache simulator</h3>
    <div class="calc">
      <div class="row"><span>Request product:</span><button class="chip" data-prod="1">Phone</button><button class="chip" data-prod="2">Laptop</button><button class="chip" data-prod="3">Tablet</button><button class="btn ghost" id="cacheClear">Clear cache</button></div>
      <div class="flow" style="margin-top:12px">
        <div class="node" data-cn="app"><b>📱 App</b></div><div class="arr">→</div>
        <div class="node" data-cn="cache"><b>⚡ Cache</b><small>in-memory</small><div class="mini" id="cacheItems"></div></div><div class="arr">→</div>
        <div class="node" data-cn="db"><b>🗄 Database</b><small>disk</small></div>
      </div>
      <div class="log" id="cacheLog" style="margin-top:10px">Request a product twice to see a cache hit.</div>
    </div>
    <h3>Redis vs Memcached</h3>
    <div class="table-wrap"><table>
      <tr><th></th><th>Redis</th><th>Memcached</th></tr>
      <tr><td>Type</td><td>Open source, in-memory, <b>key-value data store</b></td><td>Open source, in-memory, <b>object store</b></td></tr>
      <tr><td>Speed</td><td>Sub-millisecond</td><td>Sub-millisecond</td></tr>
      <tr><td>Data</td><td>Various structures: strings, lists, sets…</td><td>Strings and objects</td></tr>
      <tr><td>Persistence</td><td><b>Persistent</b> — cache survives reboots</td><td><b>Not persistent</b> — lost on reboot</td></tr>
      <tr><td>Extras</td><td>Read replicas, atomic operations, backup/restore, HA</td><td>Scaling out, multithreading</td></tr>
    </table></div>
    <div class="box mem"><b>Memory hook</b><b>R</b>edis <b>R</b>emembers after a <b>R</b>eboot. <b>M</b>emcached = <b>M</b>emory goes blank, but it's <b>M</b>ultithreaded.</div>
  </article>

  <article class="chapter" id="l08-dw" data-ch="l08">
    <h2><span class="n">6</span>Data Warehouse &amp; Data Lake</h2>
    <h3>Data Warehouse</h3>
    <ul class="clean">
      <li>A data management system designed to enable and support <b>business intelligence (BI)</b>, especially analytics.</li>
      <li>Intended for <b>querying and analysis only</b>; often large amounts of <b>historical</b> data.</li>
      <li>A repository for <b>structured, filtered data</b> already <b>processed</b> for a specific purpose.</li>
      <li>Data comes from many sources, e.g. application log files and transaction applications.</li>
    </ul>
    <h4>Two loading approaches — press play</h4>
    <div class="row"><button class="chip on" data-etl="etl">ETL</button><button class="chip" data-etl="elt">ELT</button><button class="btn" id="etlRun">▶ Play</button></div>
    <div class="pipe" id="etlPipe"></div>
    <p class="hint" id="etlTxt"></p>
    <h3>Data Lake</h3>
    <ul class="clean">
      <li>A storage repository holding a <b>large amount of raw data in its native format</b> until it is needed.</li>
      <li>A hierarchical data warehouse stores data in files or folders; a data lake uses a <b>flat architecture</b>.</li>
    </ul>
    <div class="table-wrap"><table>
      <tr><th>Data Warehouse</th><th>Data Lake</th></tr>
      <tr><td>Processed data</td><td>Raw data</td></tr>
      <tr><td>Data currently in use</td><td>Purpose of data not determined yet</td></tr>
      <tr><td>Used by business professionals</td><td>Used by data scientists</td></tr>
    </table></div>
    <div class="box mem"><b>Memory hook</b>Warehouse = <b>bottled water</b> 🍶 (cleaned, labelled, ready to drink). Lake = a <b>lake</b> 🏞 (raw water, use it however you like later).</div>
  </article>

  <article class="chapter" id="l08-rt" data-ch="l08">
    <h2><span class="n">7</span>Real-Time Data Processing</h2>
    <ul class="clean">
      <li>The <b>quickest</b> data processing technique — executes data in a short period and gives the most accurate output.</li>
      <li>Processing happens <b>as the data is inputted</b>, so it needs a <b>continuous stream of input</b> to give continuous output.</li>
      <li>Also known as <b>stream processing</b>.</li>
    </ul>
    <div class="row"><button class="btn" id="rtGo">▶ Start stream</button><span class="hint">Live card payments → fraud check as each one arrives</span></div>
    <div class="log" id="rtLog" style="margin-top:8px">Waiting for data…</div>
  </article>

  ${studyTabs("l08")}
</section>`,
`<div class="tile" style="--c:var(--l08)"><h4>L08 · Databases & Analytics</h4><ul>
  <li>SQL: tables, rigid, ACID, SQL (MySQL, Oracle, PostgreSQL, RDS)</li>
  <li>NoSQL: document, changing designs (MongoDB, Cassandra, Cosmos DB, Redis)</li>
  <li>OLTP: operational, ms, small queries, normalized · OLAP: historical, complex, seconds–hours, denormalized</li>
  <li>NoSQL types: key-value (sessions, carts), document (JSON, e-commerce), columnar (CMS, blogs), graph (relationships)</li>
  <li>Caching: frequently used data in memory · Redis persistent, data structures · Memcached not persistent, multithreaded</li>
  <li>Warehouse: processed, BI, business users; ETL vs ELT</li>
  <li>Lake: raw, native format, flat, data scientists</li>
  <li>Real-time = stream processing, continuous input</li></ul></div>`);

GAMES.l08w = { opts: ["OLTP", "OLAP"], items: [
  { q: "Recording a single card payment at a shop checkout.", a: "OLTP", why: "Operational transaction, milliseconds." },
  { q: "Comparing total sales per region over the last 5 years.", a: "OLAP", why: "Historical analysis, large complex query." },
  { q: "Updating a customer's delivery address.", a: "OLTP", why: "Small, simple operational query." },
  { q: "A data warehouse report that takes 20 minutes to run.", a: "OLAP", why: "Data warehouses, seconds-to-hours responses." },
  { q: "Highly normalized tables tuned for fast inserts.", a: "OLTP", why: "OLTP is highly normalized." },
  { q: "Denormalized tables for BI dashboards.", a: "OLAP", why: "OLAP is typically denormalized." },
]};
GAMES.l08n = { opts: ["Key-Value", "Document", "Columnar", "Graph"], items: [
  { q: "Store each user's shopping cart by session ID.", a: "Key-Value", why: "Session data and shopping carts are the key-value use cases." },
  { q: "Product catalogue where each product is a JSON with different fields.", a: "Document", why: "Schema-less documents (JSON/XML) — e-commerce." },
  { q: "Find friends-of-friends who like the same band.", a: "Graph", why: "Relationships between connected data." },
  { q: "A blogging platform / CMS that reads whole columns of data quickly.", a: "Columnar", why: "Columnar use cases: CMS, blogging platforms." },
  { q: "Simplest model: indexed keys and values, no complexity.", a: "Key-Value", why: "Complexity: none." },
  { q: "Highest complexity of the four types.", a: "Graph", why: "Graph DB complexity: high." },
]};

QUIZ.l08 = [
  { q: "Relational databases enforce…", o: ["BASE", "ACID", "CAP", "ETL"], a: 1, why: "Atomicity, Consistency, Isolation, Durability." },
  { q: "Which is a relational database example from the lecture?", o: ["MongoDB", "Cassandra", "PostgreSQL", "CouchDB"], a: 2, why: "MS SQL, MySQL, Oracle, PostgreSQL, Amazon RDS." },
  { q: "Which supports rapidly changing designs?", o: ["Relational/SQL", "Non-relational/NoSQL", "Spreadsheets", "Tape"], a: 1, why: "NoSQL is flexible and document-oriented." },
  { q: "OLTP focuses on…", o: ["Historical data", "Operational data", "Images", "Backups"], a: 1, why: "OLTP = operational data, transactions." },
  { q: "OLAP responses typically take…", o: ["Microseconds", "Milliseconds", "Seconds to hours", "Weeks"], a: 2, why: "Large complex queries take seconds to hours." },
  { q: "OLTP databases are usually…", o: ["Highly normalized", "Denormalized", "Unstructured", "Flat files"], a: 0, why: "OLTP normalized; OLAP denormalized." },
  { q: "Hadoop and HDInsight fit which quadrant?", o: ["Relational/OLTP", "Relational/OLAP", "Non-relational/OLTP", "Non-relational/OLAP"], a: 3, why: "Big-data analytics." },
  { q: "The key-value NoSQL use case in the lecture is…", o: ["Session data, shopping cart", "Relationships", "Blogging", "Reports"], a: 0, why: "Key-value: session data, shopping cart." },
  { q: "Document stores keep data in…", o: ["Tables only", "Documents like XML or JSON", "Graphs", "Columns only"], a: 1, why: "Schema-less documents of key-value pairs." },
  { q: "Which NoSQL type focuses on relationships?", o: ["Key-value", "Columnar", "Document", "Graph"], a: 3, why: "Graph DB presents interconnected data." },
  { q: "Which NoSQL type has 'None' complexity in the comparison table?", o: ["Key-value store", "Column store", "Document", "Graph"], a: 0, why: "Key-value: high flexibility, no complexity." },
  { q: "Caching stores…", o: ["All data on tape", "Frequently requested data in temporary memory", "Only logs", "Encrypted keys"], a: 1, why: "Reduces DB workload and speeds access." },
  { q: "Which cache survives reboots?", o: ["Memcached", "Redis", "Both", "Neither"], a: 1, why: "Redis is persistent; Memcached is not." },
  { q: "Which caching system supports multithreading and only strings/objects?", o: ["Redis", "Memcached", "MySQL", "S3"], a: 1, why: "Memcached." },
  { q: "A data warehouse contains…", o: ["Raw data in native format", "Structured, filtered, processed data", "Only images", "Only live streams"], a: 1, why: "Processed data for a specific purpose; used for BI." },
  { q: "ETL stands for…", o: ["Extract, Transform, Load", "Encrypt, Transfer, Log", "Extract, Test, Launch", "Edit, Tag, Link"], a: 0, why: "Source → staging (transform) → destination." },
  { q: "In ELT, transformation happens…", o: ["Before loading", "After loading into the destination", "Never", "On the client"], a: 1, why: "ELT: Extract, Load, then Transform in the destination." },
  { q: "A data lake stores…", o: ["Processed data for business users", "Raw data in its native format using a flat architecture", "Only SQL tables", "Only backups"], a: 1, why: "Raw data, purpose not yet determined, used by data scientists." },
  { q: "Who mainly uses a data lake?", o: ["Business professionals", "Data scientists", "Receptionists", "Network admins"], a: 1, why: "Lake → data scientists; warehouse → business professionals." },
  { q: "Real-time data processing is also known as…", o: ["Batch processing", "Stream processing", "Backup", "Archiving"], a: 1, why: "Needs a continuous stream of input." },
];

CARDS.l08 = [
  ["Relational / SQL", "Structured tables, rigid formats, dependencies, ACID, SQL. MS SQL, MySQL, Oracle, PostgreSQL, RDS"],
  ["ACID", "Atomicity, Consistency, Isolation, Durability"],
  ["Non-relational / NoSQL", "Document oriented, complex queries, rapidly changing designs. MongoDB, Cassandra, Cosmos DB, Redis, CouchDB"],
  ["OLTP", "Operational data, transactions, small queries, ms responses, highly normalized"],
  ["OLAP", "Historical data, analysis & reporting, large queries, data warehouses, seconds–hours, denormalized"],
  ["Models × workloads", "Rel/OLTP: relational DBs · Rel/OLAP: relational analytics · NoSQL/OLTP: key-value, columnar, docs · NoSQL/OLAP: Hadoop, HDInsight"],
  ["Key-value", "Indexed keys & values; session data, shopping cart"],
  ["Document store", "XML/JSON documents, schema-less; e-commerce, analytics"],
  ["Columnar", "Optimized to retrieve columns; CMS, blogging"],
  ["Graph", "Interconnected data, focus on relationships"],
  ["CAP (DB view)", "C: same view after update · A: find a replica despite node failures · P: works despite network failure"],
  ["Caching", "Store frequently requested data in temporary memory; reduces DB workload"],
  ["Redis", "In-memory key-value store; data structures; persistent; replicas, atomic ops, backup, HA"],
  ["Memcached", "In-memory object store; strings & objects; not persistent; scale out, multithreading"],
  ["Data warehouse", "BI system; querying/analysis only; historical, structured, processed data"],
  ["ETL vs ELT", "ETL: source → staging (transform) → destination. ELT: source → destination, transform there"],
  ["Data lake", "Raw data in native format; flat architecture; used by data scientists"],
  ["Real-time processing", "Quickest; processes as data arrives; continuous stream; = stream processing"],
];

INITS.push(function l08() {
  // NoSQL type viewer
  const ns = {
    kv: ["<div class='box key'><b>🔑 Key-Value</b><ul class='clean'><li>Indexed <b>keys and values</b></li><li>Use case: <b>session data, shopping cart</b></li><li>Flexibility high · complexity none · performance high · scalability high</li></ul></div>", 'session:8f2a  →  { "user": "amaya", "cart": [12, 40] }\nsession:91bc  →  { "user": "kasun", "cart": [] }\n\nGET session:8f2a   (one key, one value, super fast)'],
    doc: ["<div class='box key'><b>📄 Document Store</b><ul class='clean'><li>Data in documents (<b>XML, JSON</b>…)</li><li><b>Schema-less</b>; documents contain key-value pairs</li><li>Use case: <b>e-commerce, analytics</b></li></ul></div>", '{\n  "_id": "p100",\n  "name": "Phone",\n  "price": 120000,\n  "colours": ["black", "blue"],\n  "specs": { "ram": "8GB" }\n}\n// the next product can have different fields'],
    col: ["<div class='box key'><b>🏛 Columnar</b><ul class='clean'><li><b>Optimised to retrieve columns</b> of data</li><li>Use case: <b>CMS, blogging platforms</b></li><li>Flexibility moderate · complexity low · performance high</li></ul></div>", 'column "title":  [ "Cloud 101", "Docker tips", "CAP explained" ]\ncolumn "views":  [ 1200, 860, 4300 ]\n\nSUM(views) → reads only one column'],
    graph: ["<div class='box key'><b>🕸 Graph</b><ul class='clean'><li>Presents interconnected data as <b>logical graphs</b></li><li>Focus on <b>relationships</b></li><li>Flexibility high · complexity high · performance/scalability variable</li></ul></div>", '(Amaya) -[FRIEND]-> (Kasun)\n(Kasun) -[FRIEND]-> (Nimal)\n(Nimal) -[LIKES]->  (Cloud Computing)\n\nfriends-of-friends of Amaya → Nimal'],
  };
  function show(k) { document.getElementById("nsTxt").innerHTML = ns[k][0]; document.getElementById("nsEx").textContent = ns[k][1]; }
  document.querySelectorAll("[data-ns]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-ns]").forEach(x => x.classList.toggle("on", x === b)); show(b.dataset.ns);
  });
  show("kv");

  // cache simulator
  const cache = new Set(), names = { 1: "Phone", 2: "Laptop", 3: "Tablet" };
  const log = document.getElementById("cacheLog");
  const hot = ks => document.querySelectorAll("[data-cn]").forEach(n => n.classList.toggle("hot", ks.includes(n.dataset.cn)));
  const items = () => document.getElementById("cacheItems").innerHTML = [...cache].map(k => `<span>${names[k]}</span>`).join("") || "<span>empty</span>";
  document.querySelectorAll("[data-prod]").forEach(b => b.onclick = () => {
    const k = b.dataset.prod;
    if (cache.has(k)) { hot(["app", "cache"]); log.textContent = `⚡ CACHE HIT for ${names[k]} — answered from memory in ~0.4 ms. Database not touched.`; }
    else { hot(["app", "cache", "db"]); cache.add(k); log.textContent = `🐢 CACHE MISS for ${names[k]} — read from database in ~25 ms, then stored in cache for next time.`; }
    items();
  });
  document.getElementById("cacheClear").onclick = () => { cache.clear(); items(); hot([]); log.textContent = "Cache cleared (like Memcached after a reboot)."; };
  items();

  // ETL vs ELT
  let mode = "etl";
  const flows = {
    etl: [["📥", "Source"], ["⚙", "Staging: Transform"], ["🏬", "Destination (warehouse)"]],
    elt: [["📥", "Source"], ["🏬", "Destination: Load raw"], ["⚙", "Transform inside destination"]],
  };
  const txt = { etl: "ETL — Extract, Transform, Load: data is cleaned in a staging area BEFORE it reaches the destination (Source → Staging → Destination).", elt: "ELT — Extract, Load, Transform: raw data goes straight to the destination and is transformed there (Source → Destination)." };
  function etl() {
    document.getElementById("etlPipe").innerHTML = flows[mode].map(([i, l]) => `<div class="stage"><span class="ic">${i}</span>${l}</div>`).join("");
    document.getElementById("etlTxt").textContent = txt[mode];
  }
  document.querySelectorAll("[data-etl]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-etl]").forEach(x => x.classList.toggle("on", x === b)); mode = b.dataset.etl; etl();
  });
  document.getElementById("etlRun").onclick = () => {
    const st = document.querySelectorAll("#etlPipe .stage");
    st.forEach(s => s.className = "stage");
    st.forEach((s, i) => setTimeout(() => { if (i) st[i - 1].className = "stage ok"; s.classList.add("run"); if (i === st.length - 1) setTimeout(() => s.className = "stage ok", 600); }, i * 700));
  };
  etl();

  // stream processing
  let rt;
  document.getElementById("rtGo").onclick = () => {
    clearInterval(rt);
    const el = document.getElementById("rtLog"); el.textContent = ""; let n = 0;
    rt = setInterval(() => {
      const amt = Math.round(Math.random() < 0.15 ? 400000 + Math.random() * 300000 : 500 + Math.random() * 20000);
      el.textContent += `${new Date().toLocaleTimeString()}  payment Rs.${amt.toLocaleString()}  →  ${amt > 300000 ? "⚠ flagged as possible fraud" : "✓ ok"}\n`;
      el.scrollTop = el.scrollHeight;
      if (++n >= 14) { clearInterval(rt); el.textContent += "…each event processed the moment it arrived (stream processing)."; }
    }, 400);
  };
});
