// Lecture 04 — Compute & Storage Part II (Storage)
addLecture(`
<section class="page" id="l04" style="--accent:var(--l04)">
  <div class="lec-head">
    <div class="kicker">Lecture 04 · Cloud Computing</div>
    <h1>Compute &amp; Storage — Part II </h1>
    <p class="lead">Outline: <b>Software-defined storage → CAP theorem → Block storage → File storage → Object storage → Other important aspects</b>.</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l04-sds" data-ch="l04">
    <h2><span class="n">1</span>Software-Defined Storage (SDS)</h2>
    <div class="box key"><b>Definition</b>Software Defined Storage (SDS) is a storage architecture that <b>abstracts data storage resources from its underlying hardware</b>.</div>
    <p>Same idea as software-defined compute: software manages the storage, the disks underneath are generic and can be pooled and grown.</p>
  </article>

  <article class="chapter" id="l04-cap" data-ch="l04">
    <h2><span class="n">2</span>CAP Theorem</h2>
    <div class="box key"><b>Statement</b>It is <b>impossible</b> for a distributed data store to simultaneously provide <b>more than two</b> of these three guarantees:</div>
    <div class="grid3">
      <div class="tile"><h4>C — Consistency</h4>Every read receives the <b>most recent write</b> or an error.</div>
      <div class="tile"><h4>A — Availability</h4>Every request receives a (non-error) response — <b>without the guarantee</b> it contains the most recent write.</div>
      <div class="tile"><h4>P — Partition tolerance</h4>The system <b>continues to operate</b> despite any number of messages being dropped/delayed by the network between nodes.</div>
    </div>
    <h3>Pick any two</h3>
    <div class="cap" id="capPick"><button data-k="C">Consistency</button><button data-k="A">Availability</button><button data-k="P">Partition<br>tolerance</button></div>
    <div class="box eg" id="capOut"><b>Choose two circles</b>to see what you give up.</div>
    <h3>When a network partition happens…</h3>
    <div class="grid2">
      <div class="tile"><h4>Cancel the operation</h4>Decreases <b>availability</b> but ensures <b>consistency</b> (CP).</div>
      <div class="tile"><h4>▶ Proceed with the operation</h4>Provides <b>availability</b> but risks <b>inconsistency</b> (AP).</div>
    </div>
    <div class="box exam"><b>Exam tip</b>In the presence of a network partition, we must choose between <b>consistency and availability</b>. (Partitions happen in real networks, so P is usually a must.)</div>
    <div class="box mem"><b>Memory hook: a group chat with bad Wi-Fi </b>Either wait until everyone's synced (Consistent, but you can't send now) or send anyway (Available, but some see old messages).</div>
  </article>

  <article class="chapter" id="l04-types" data-ch="l04">
    <h2><span class="n">3</span>Three Types of Storage</h2>
    <div class="row"><button class="chip on" data-st="block">Block</button><button class="chip" data-st="file">File</button><button class="chip" data-st="object">Object</button></div>
    <div id="stOut" style="margin-top:12px"></div>
    <div class="table-wrap" style="margin-top:14px"><table>
      <tr><th></th><th>Block</th><th>File</th><th>Object</th></tr>
      <tr><td>Manages data as</td><td>Blocks in sectors &amp; tracks</td><td>A file hierarchy</td><td>Objects (data + metadata + unique ID)</td></tr>
      <tr><td>Access</td><td>Attached to a server; formatted as a file system</td><td>Over a shared network (NFS, SMB)</td><td>HTTPS, APIs, SDKs</td></tr>
      <tr><td>Good for</td><td>Transactional/structured data: file systems, databases, logs</td><td>Shared folders between many servers</td><td>Unstructured data at huge scale: images, backups, websites</td></tr>
      <tr><td>AWS</td><td>Elastic Block Storage (EBS)</td><td>Elastic File System (EFS)</td><td>Simple Storage Service (S3)</td></tr>
      <tr><td>Azure</td><td>Azure Disks (Page Blob)</td><td>Azure Files</td><td>Azure Blobs</td></tr>
    </table></div>
    <div class="box mem"><b>Memory hook</b>Block = <b>LEGO bricks</b> (raw pieces, fast) · File = <b>filing cabinet</b> (folders, shared) · Object = <b>valet parking</b> (hand over the car, get a ticket ID, metadata on the ticket).</div>
    <h3>Game: which storage type?</h3>
    <div class="game" data-game="l04"></div>
  </article>

  <article class="chapter" id="l04-obj" data-ch="l04">
    <h2><span class="n">4</span>Object Storage Features</h2>
    <div class="grid2">
      <div class="tile"><h4>Versioning</h4>Keep multiple versions of an object; recover from overwrites/deletes.</div>
      <div class="tile"><h4>Web Hosting</h4>Serve a static website directly from object storage.</div>
      <div class="tile"><h4>Encryption</h4><b>Client side</b> (you encrypt before upload) or <b>Server side</b> with:<ul><li>Service-managed keys</li><li>Customer-managed keys</li><li>Customer-provided keys</li></ul></div>
      <div class="tile"><h4>Immutability</h4>Data can't be changed or deleted:<ul><li><b>Time-based retention</b> (locked for X days)</li><li><b>Legal hold</b> (locked until the hold is removed)</li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook: "VEWI" — "Very Expensive Wedding Invitations"</b>Versioning · Encryption · Web hosting · Immutability.</div>
  </article>

  <article class="chapter" id="l04-tiers" data-ch="l04">
    <h2><span class="n">5</span>Object Storage Tiers</h2>
    <p>CSPs offer different <b>access tiers</b> for different use cases. Rule: <b>the less often you access data, the cheaper it is to store — but the more it costs / longer it takes to read it back.</b></p>
    <input type="range" min="0" max="3" value="0" id="tierRange">
    <div class="mod-steps"><span>Accessed daily</span><span>Unknown pattern</span><span>Monthly</span><span>Rarely / years</span></div>
    <div class="grid2" style="margin-top:12px">
      <div class="calc"><small class="hint">AWS S3</small><h3 id="tierAws" style="margin:4px 0"></h3></div>
      <div class="calc"><small class="hint">Azure Blob</small><h3 id="tierAz" style="margin:4px 0"></h3></div>
    </div>
    <p class="hint" id="tierTxt" style="margin-top:8px"></p>
    <div class="grid2">
      <div class="tile"><h4>AWS</h4>Standard · Intelligent-Tiering · Infrequent Access · Glacier</div>
      <div class="tile"><h4>Azure</h4>Hot · Cold · Archive</div>
    </div>
    <div class="box mem"><b>Memory hook</b>Azure is a <b>thermometer</b> : Hot → Cold → Archive. AWS ends in <b>Glacier</b> = frozen, rarely touched.</div>
  </article>

  <article class="chapter" id="l04-other" data-ch="l04">
    <h2><span class="n">6</span>Other Important Aspects of Cloud Storage</h2>
    <div class="grid3">
      <div class="tile"><h4>Archiving &amp; Backup</h4>Cheap long-term copies of data (cold/archive tiers) for recovery and compliance.</div>
      <div class="tile"><h4>Hybrid Storage</h4>Combine on-premises storage with cloud storage (e.g. keep hot data local, tier the rest to cloud).</div>
      <div class="tile"><h4>Bulk Data Transfer</h4>Moving very large data sets (TB/PB) into the cloud, sometimes with physical transfer devices instead of the internet.</div>
    </div>
  </article>

  ${studyTabs("l04")}
</section>`,
`<div class="tile" style="--c:var(--l04)"><h4>L04 · Storage</h4><ul>
  <li>SDS: abstracts storage resources from hardware</li>
  <li>CAP: max 2 of Consistency, Availability, Partition tolerance; on partition choose C or A</li>
  <li>Block: blocks with IDs, IOPS, DBs/logs — EBS / Azure Disks</li>
  <li>File: hierarchy over network, NFS/SMB — EFS / Azure Files</li>
  <li>Object: data + metadata + unique ID, HTTPS/API/SDK — S3 / Azure Blobs</li>
  <li>Object features: versioning, encryption (client/server; service-, customer-managed, customer-provided keys), web hosting, immutability (time-based, legal hold)</li>
  <li>Tiers: AWS Standard, Intelligent-Tiering, IA, Glacier · Azure Hot, Cold, Archive</li>
  <li>Other: archiving & backup, hybrid storage, bulk data transfer</li></ul></div>`);

GAMES.l04 = { opts: ["Block", "File", "Object"], items: [
  { q: "A database needs very fast disk with high IOPS attached to one VM.", a: "Block", why: "Block storage suits transactional DBs; performance measured in IOPS." },
  { q: "Ten web servers must share the same folder of uploaded documents over NFS.", a: "File", why: "File storage is shared over a network with NFS/SMB." },
  { q: "Store millions of user photos, accessed through an HTTPS API.", a: "Object", why: "Object storage: data + metadata + unique ID via HTTPS/API." },
  { q: "Amazon S3", a: "Object", why: "S3 = Simple Storage Service = object storage." },
  { q: "Amazon EBS", a: "Block", why: "Elastic Block Storage." },
  { q: "Azure Files over SMB", a: "File", why: "Azure Files = file storage." },
  { q: "Host a static website and keep old versions of each page.", a: "Object", why: "Web hosting and versioning are object storage features." },
  { q: "Azure Disks (Page Blob storage)", a: "Block", why: "Azure Disks are Azure's block storage." },
]};

QUIZ.l04 = [
  { q: "Software Defined Storage…", o: ["Requires special hardware", "Abstracts storage resources from the underlying hardware", "Is only for tapes", "Is a type of RAM"], a: 1, why: "SDS abstracts data storage resources from hardware." },
  { q: "CAP theorem says a distributed data store can provide at most…", o: ["One guarantee", "Two of the three guarantees", "All three", "Four guarantees"], a: 1, why: "No more than two of C, A, P at the same time." },
  { q: "'Every read receives the most recent write or an error' is…", o: ["Availability", "Consistency", "Partition tolerance", "Durability"], a: 1, why: "Consistency." },
  { q: "'Every request gets a non-error response, maybe not the latest write' is…", o: ["Consistency", "Availability", "Partition tolerance", "Isolation"], a: 1, why: "Availability." },
  { q: "During a network partition, cancelling the operation…", o: ["Increases availability", "Ensures consistency but decreases availability", "Ensures both", "Breaks partition tolerance"], a: 1, why: "Cancel → consistent but less available. Proceed → available but maybe inconsistent." },
  { q: "Block storage performance is measured in…", o: ["IOPS", "Pixels", "Requests per day", "Objects"], a: 0, why: "IOPS = input/output operations per second." },
  { q: "Which storage is best for transactional data like databases and logs?", o: ["Object", "Block", "Archive", "CDN"], a: 1, why: "Block storage." },
  { q: "File storage protocols include…", o: ["HTTP and FTP", "NFS and SMB", "SQL and NoSQL", "TCP only"], a: 1, why: "Network File System and Server Message Block." },
  { q: "AWS's file storage service is…", o: ["S3", "EBS", "EFS", "Glacier"], a: 2, why: "Elastic File System." },
  { q: "Each object in object storage consists of…", o: ["Blocks and sectors", "Data, metadata and a globally unique identifier", "Folders and files", "Tables"], a: 1, why: "Data + metadata + unique ID." },
  { q: "Azure's object storage is called…", o: ["Azure Disks", "Azure Files", "Azure Blobs", "Azure Glacier"], a: 2, why: "Azure Blobs (AWS = S3)." },
  { q: "Which is NOT an object storage feature in the lecture?", o: ["Versioning", "Web hosting", "Immutability", "Defragmentation"], a: 3, why: "Features: versioning, encryption, web hosting, immutability." },
  { q: "Legal hold and time-based retention are types of…", o: ["Encryption", "Immutability", "Versioning", "Tiering"], a: 1, why: "Immutability options." },
  { q: "Customer-provided keys are a form of…", o: ["Server-side encryption", "Client-side compression", "Versioning", "Hashing"], a: 0, why: "Server-side encryption with service-managed, customer-managed or customer-provided keys." },
  { q: "Which is the coldest AWS tier listed?", o: ["Standard", "Intelligent Tiering", "Infrequent Access", "Glacier"], a: 3, why: "Glacier is for archive data." },
  { q: "Azure Blob tiers in the lecture are…", o: ["Hot, Cold, Archive", "Gold, Silver, Bronze", "Standard, Glacier", "Fast, Slow"], a: 0, why: "Hot, Cold, Archive." },
];

CARDS.l04 = [
  ["Software Defined Storage", "Storage architecture that abstracts data storage resources from the underlying hardware"],
  ["CAP theorem", "A distributed data store can't provide more than 2 of: Consistency, Availability, Partition tolerance"],
  ["Consistency", "Every read gets the most recent write or an error"],
  ["Availability", "Every request gets a non-error response (maybe not the latest write)"],
  ["Partition tolerance", "System keeps working despite dropped/delayed messages between nodes"],
  ["On a partition…", "Cancel → consistency, less availability. Proceed → availability, risk inconsistency"],
  ["Block storage", "Blocks with IDs in sectors/tracks; DBs, file systems, logs; IOPS; AWS EBS / Azure Disks"],
  ["File storage", "File hierarchy over a shared network; NFS, SMB; AWS EFS / Azure Files"],
  ["Object storage", "Data + metadata + globally unique ID; HTTPS/API/SDK; AWS S3 / Azure Blobs"],
  ["Object storage features", "Versioning, Encryption, Web hosting, Immutability"],
  ["Server-side key options", "Service-managed, customer-managed, customer-provided keys"],
  ["Immutability types", "Time-based retention, Legal hold"],
  ["AWS S3 tiers", "Standard, Intelligent-Tiering, Infrequent Access, Glacier"],
  ["Azure Blob tiers", "Hot, Cold, Archive"],
  ["Other storage aspects", "Archiving & backup, Hybrid storage, Bulk data transfer"],
];

INITS.push(function l04() {
  // CAP picker
  const sel = new Set();
  const res = {
    CA: "<b>CA — Consistent + Available</b>Only possible if the network never partitions (e.g. a single-site traditional database). Gives up partition tolerance.",
    CP: "<b>CP — Consistent + Partition tolerant</b>When the network splits, some requests are refused (cancel) so data never goes stale. Gives up availability.",
    AP: "<b>AP — Available + Partition tolerant</b>Always answers, even during a split, but some answers may be out of date. Gives up consistency.",
  };
  const btns = document.querySelectorAll("#capPick button");
  btns.forEach(b => b.onclick = () => {
    const k = b.dataset.k;
    if (sel.has(k)) sel.delete(k); else { if (sel.size === 2) sel.delete([...sel][0]); sel.add(k); }
    btns.forEach(x => x.classList.toggle("on", sel.has(x.dataset.k)));
    const key = ["C", "A", "P"].filter(x => sel.has(x)).join("");
    document.getElementById("capOut").innerHTML = res[key] || "<b>Pick one more</b>You can only keep two — try picking a third and watch one drop out.";
  });

  // storage type viewer
  const st = {
    block: "<div class='box key'><b>Block storage</b><ul class='clean'><li>Manages data as <b>blocks within sectors and tracks</b></li><li>Each block has a <b>block ID</b></li><li>A set of blocks can be organised as a <b>file system</b></li><li>Suitable for <b>transactional / structured data</b> (file systems, databases, logs)</li><li>Optimised for block-level performance, measured in <b>IOPS</b></li><li>AWS <b>Elastic Block Storage</b> · Azure <b>Azure Disks</b> (Page Blob Storage)</li></ul></div>",
    file: "<div class='box key'><b>File storage</b><ul class='clean'><li>Manages data as a <b>file hierarchy</b></li><li>Used over a <b>shared network</b></li><li>The storage manages the underlying data on disk</li><li>The storage server uses <b>block storage with a local file system</b></li><li>Protocols: <b>NFS</b> (Network File System) and <b>SMB</b> (Server Message Block)</li><li>AWS <b>Elastic File System (EFS)</b> · Azure <b>Azure Files</b></li></ul></div>",
    object: "<div class='box key'><b>Object storage</b><ul class='clean'><li>Manages data as <b>objects</b></li><li>Each object = <b>Data + Metadata + Globally unique identifier</b></li><li>Clients access through <b>HTTPS, APIs or SDKs</b></li><li>AWS <b>Simple Storage Service (S3)</b> · Azure <b>Azure Blobs</b></li></ul></div>",
  };
  function show(k) { document.getElementById("stOut").innerHTML = st[k]; }
  document.querySelectorAll("[data-st]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-st]").forEach(x => x.classList.toggle("on", x === b)); show(b.dataset.st);
  });
  show("block");

  // tiers slider
  const T = [
    ["Standard", "Hot", "Frequently accessed data. Highest storage price, cheapest and fastest to read."],
    ["Intelligent-Tiering", "Hot → Cold (manual)", "Access pattern unknown or changing: AWS moves objects between tiers automatically."],
    ["Infrequent Access", "Cold", "Accessed maybe monthly. Cheaper storage, you pay a retrieval fee."],
    ["Glacier", "Archive", "Rarely accessed, kept for years (backups, compliance). Cheapest storage, slow and costly retrieval."],
  ];
  const r = document.getElementById("tierRange");
  function tier() { const [a, z, t] = T[r.value]; document.getElementById("tierAws").textContent = a; document.getElementById("tierAz").textContent = z; document.getElementById("tierTxt").textContent = t; }
  r.oninput = tier; tier();
});
