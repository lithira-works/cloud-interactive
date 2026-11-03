// Lecture 09 — Infrastructure as Code (IaC)
addLecture(`
<section class="page" id="l09" style="--accent:var(--l09)">
  <div class="lec-head">
    <div class="kicker">Lecture 09 · Cloud Computing</div>
    <h1>Infrastructure as Code (IaC) 📜</h1>
    <p class="lead">Outline: <b>Risks in manual processes → What is IaC → Types of IaC tools → How IaC works → Tools → Benefits → Best practices → Terraform → CloudFormation</b>. Analogy: manual setup = <b>cooking from memory</b>; IaC = <b>a written recipe</b> anyone can repeat exactly.</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l09-manual" data-ch="l09">
    <h2><span class="n">1</span>The Problem: Long Manual Processes</h2>
    <p>Without IaC, <b>you</b> click through the <b>AWS Management Console</b> to build an architecture step by step: configure data storage → route your network → create your instances → build your databases.</p>
    <h3>🎮 Race: deploy to 3 regions</h3>
    <div class="grid2">
      <div class="calc"><h4>🖱 Manual (console)</h4><div class="log" id="raceM" style="min-height:130px"></div></div>
      <div class="calc"><h4>📜 IaC (template)</h4><div class="log" id="raceI" style="min-height:130px"></div></div>
    </div>
    <div class="row" style="margin-top:10px"><button class="btn" id="raceGo">▶ Start race</button></div>
    <h3>4 risks in manual processes</h3>
    <div class="grid2">
      <div class="flip" style="min-height:160px"><div class="inner"><div class="face front"><div class="big">🔁 Does not support repeatability at scale</div><small>tap</small></div><div class="face back">How will you <b>replicate deployments to multiple Regions</b>?</div></div></div>
      <div class="flip" style="min-height:160px"><div class="inner"><div class="face front"><div class="big">🕓 No version control</div><small>tap</small></div><div class="face back">How will you <b>roll back</b> the production environment to a prior version?</div></div></div>
      <div class="flip" style="min-height:160px"><div class="inner"><div class="face front"><div class="big">🧾 Lack of audit trails</div><small>tap</small></div><div class="face back">How will you ensure <b>compliance</b>? How will you <b>track changes</b> to configuration at the resource level?</div></div></div>
      <div class="flip" style="min-height:160px"><div class="inner"><div class="face front"><div class="big">🧩 Inconsistent data management</div><small>tap</small></div><div class="face back">How will you ensure <b>matching configurations</b> across multiple Amazon EC2 instances?</div></div></div>
    </div>
    <div class="box mem"><b>Memory hook: "RVAI" — "Robots Validate All Infrastructure"</b>Repeatability · Version control · Audit trails · Inconsistency.</div>
  </article>

  <article class="chapter" id="l09-what" data-ch="l09">
    <h2><span class="n">2</span>What is Infrastructure as Code?</h2>
    <div class="box key"><b>Definition</b>Infrastructure as code (IaC) is an industry term that refers to the process of <b>provisioning and managing cloud resources by defining them in a template file</b> that is both <b>human-readable and machine-consumable</b>.</div>
    <ul class="clean">
      <li>IaC lets you <b>define, provision, and manage</b> infrastructure <b>using code instead of manual configurations</b>.</li>
      <li>Configurations once done in the AWS console (or similar) are now <b>maintained as code in your repository</b>.</li>
      <li>This <b>streamlines deployments</b> and ensures <b>consistency across environments</b>.</li>
    </ul>
    <h3>Without IaC vs With IaC</h3>
    <div class="table-wrap"><table>
      <tr><th>❌ Without IaC</th><th>✅ With IaC</th></tr>
      <tr><td>Manual setup phases for each deployment</td><td>Code specifies configurations and is reused</td></tr>
      <tr><td>Teardowns and deployments are slow</td><td>Teardowns and deployments are instant</td></tr>
      <tr><td>Setups (hardware and software) are prone to errors</td><td>Setups are stored in version control</td></tr>
      <tr><td>Best practices are documented (separately)</td><td>Best practices are written inside the code</td></tr>
      <tr><td>Troubleshooting and manual work required for rollbacks</td><td>Simple and instant rollbacks</td></tr>
    </table></div>
    <div class="box exam"><b>Exam tip</b>Two key words in the definition: the template is <b>human-readable</b> (people can read it) AND <b>machine-consumable</b> (tools can run it).</div>
  </article>

  <article class="chapter" id="l09-types" data-ch="l09">
    <h2><span class="n">3</span>Four Types of IaC Tools</h2>
    <div class="stepper">
      <div class="steps"><button class="on">⚙ Configuration management</button><button>🧱 Server templating</button><button>🎼 Orchestration</button><button>🏗 Provisioning</button></div>
      <div class="panel on"><h3>Configuration management tools</h3><ul class="clean"><li>Focus on <b>installing and managing software on existing servers</b></li><li>Automate configuration tasks so <b>all servers are consistently configured</b></li><li>Examples: <b>Puppet, Chef, Ansible, SaltStack</b></li></ul></div>
      <div class="panel"><h3>Server templating tools</h3><ul class="clean"><li>Create reusable <b>"templates"</b> that define a server's configuration</li><li>Easy to spin up new servers <b>identically configured</b> to a standard</li><li>Examples: <b>Docker, Vagrant, Packer</b></li></ul></div>
      <div class="panel"><h3>Orchestration tools</h3><ul class="clean"><li>Manage the <b>interconnections and interactions</b> between parts of an infrastructure</li><li>Crucial for complex environments with many interconnected components</li><li>Examples: <b>Kubernetes, Docker Swarm, Red Hat OpenShift</b></li></ul></div>
      <div class="panel"><h3>Provisioning tools</h3><ul class="clean"><li>Focus on the <b>initial setup</b> of servers and other infrastructure</li><li>Automate provisioning new infrastructure — faster and more reliable</li><li>Examples: <b>Terraform, AWS CloudFormation, Google Cloud Deployment Manager</b></li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook: building a house 🏠 — "P-S-C-O"</b><b>P</b>rovisioning = build the empty house · <b>S</b>erver templating = a prefab room mould · <b>C</b>onfiguration mgmt = furnish every room the same · <b>O</b>rchestration = make the rooms work together.</div>
    <h3>🎮 Game: which tool type?</h3>
    <div class="game" data-game="l09"></div>
  </article>

  <article class="chapter" id="l09-how" data-ch="l09">
    <h2><span class="n">4</span>How IaC Works</h2>
    <p>The slide's diagram — click each part:</p>
    <figure class="dg dg-wide" data-dg-chips="iacflow" style="--mw:660px">
      <svg viewBox="0 0 760 270" role="group" aria-label="How IaC works: developers write infrastructure code, which is stored in version control and tested, then pushed to an automation API or server that deploys and manages infrastructure in the cloud and on premises">
        <defs><marker id="l09ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="ah" d="M0 0L10 5L0 10z"/></marker></defs>
        <rect class="bx warn" x="10" y="8" width="740" height="30" rx="8"/>
        <text class="s" x="380" y="28" text-anchor="middle">Infrastructure automation · Configuration management · Version control · Automated testing · Deployment automation</text>
        <g class="dg-node" data-chip="0" tabindex="0" role="button" aria-label="Developers">
          <rect class="bx" x="10" y="100" width="120" height="64" rx="12"/>
          <text class="t" x="70" y="128" text-anchor="middle">👩‍💻</text>
          <text class="t" x="70" y="148" text-anchor="middle">Developers</text>
        </g>
        <g class="dg-node" data-chip="1" tabindex="0" role="button" aria-label="Infrastructure code">
          <rect class="bx hl" x="200" y="100" width="150" height="64" rx="12"/>
          <text class="t" x="275" y="128" text-anchor="middle">📄 Infrastructure</text>
          <text class="t" x="275" y="146" text-anchor="middle">code</text>
        </g>
        <g class="dg-node" data-chip="2" tabindex="0" role="button" aria-label="Version control">
          <rect class="bx" x="170" y="212" width="100" height="44" rx="10"/>
          <text x="220" y="239" text-anchor="middle" font-size="12">🔀 Version ctrl</text>
        </g>
        <g class="dg-node" data-chip="3" tabindex="0" role="button" aria-label="Testing">
          <rect class="bx" x="280" y="212" width="100" height="44" rx="10"/>
          <text x="330" y="239" text-anchor="middle" font-size="12">🧪 Testing</text>
        </g>
        <g class="dg-node" data-chip="4" tabindex="0" role="button" aria-label="Automation API or server">
          <rect class="bx" x="430" y="100" width="150" height="64" rx="12"/>
          <text class="t" x="505" y="128" text-anchor="middle">⚙ Automation</text>
          <text class="t" x="505" y="146" text-anchor="middle">API / server</text>
        </g>
        <g class="dg-node" data-chip="5" tabindex="0" role="button" aria-label="Infrastructure in the cloud or on premises">
          <rect class="bx" x="650" y="64" width="100" height="50" rx="10"/>
          <text x="700" y="94" text-anchor="middle">☁ Cloud</text>
          <rect class="bx" x="650" y="150" width="100" height="50" rx="10"/>
          <text x="700" y="180" text-anchor="middle">🏢 On-prem</text>
        </g>
        <line class="ln" x1="130" y1="132" x2="196" y2="132" marker-end="url(#l09ah)"/>
        <text class="lab" x="163" y="124" text-anchor="middle">write</text>
        <line class="ln" x1="350" y1="132" x2="426" y2="132" marker-end="url(#l09ah)"/>
        <text class="lab" x="388" y="124" text-anchor="middle">push / pull</text>
        <line class="ln" x1="580" y1="124" x2="646" y2="92" marker-end="url(#l09ah)"/>
        <line class="ln" x1="580" y1="140" x2="646" y2="172" marker-end="url(#l09ah)"/>
        <text class="lab" x="612" y="136" text-anchor="middle">deploy</text>
        <line class="ln" x1="245" y1="164" x2="222" y2="208" marker-end="url(#l09ah)"/>
        <text class="lab" x="205" y="190" text-anchor="end">stored in</text>
        <line class="ln" x1="305" y1="164" x2="328" y2="208" marker-end="url(#l09ah)"/>
        <text class="lab" x="345" y="190">checked by</text>
      </svg>
    </figure>
    <div class="chips" data-explain="iacflow">
      <button class="chip" data-x="Developers WRITE the infrastructure code (the template).">👩‍💻 Developers</button>
      <button class="chip" data-x="The code describing your infrastructure. It sits at the centre of everything.">📄 Infrastructure code</button>
      <button class="chip" data-x="The code is stored in version control (e.g. Git) so changes are tracked and can be rolled back.">🔀 Version control</button>
      <button class="chip" data-x="The code is tested automatically before it changes real infrastructure.">🧪 Testing</button>
      <button class="chip" data-x="The code is pushed to (or pulled by) an automation API or server that does the work.">⚙ Automation API / server</button>
      <button class="chip" data-x="The automation deploys and manages infrastructure in the cloud AND on premises.">☁ Infrastructure (cloud / on-prem)</button>
    </div>
    <div class="box eg" data-explain-out="iacflow"><b>Flow</b>Developers → write → Infrastructure code (+ testing, + version control) → push/pull → Automation API/server → deploy/manage → infrastructure in the cloud or on premises.</div>
    <p class="hint">Banner on the diagram: Infrastructure automation · Configuration management · Version control · Automated testing · Deployment automation.</p>

    <h3>Two approaches</h3>
    <div class="row"><button class="chip on" data-ap="imp">Imperative</button><button class="chip" data-ap="dec">Declarative</button></div>
    <div class="grid2" style="margin-top:10px;align-items:start">
      <div id="apTxt"></div>
      <pre class="log" id="apCode" style="margin:0;min-height:170px"></pre>
    </div>
    <div class="box mem"><b>Memory hook: taxi 🚕</b><b>Imperative</b> = "turn left, then right, then straight 2 km" (step by step). <b>Declarative</b> = "take me to the airport" (just the destination, the driver figures it out).</div>
  </article>

  <article class="chapter" id="l09-tools" data-ch="l09">
    <h2><span class="n">5</span>Tools Used in IaC</h2>
    <div class="tools">
      <span style="--bgc:#c4b5fd">Pulumi</span><span style="--bgc:#fcd34d">Puppet</span><span style="--bgc:#fdba74">Chef</span><span style="--bgc:#d1d5db">Ansible</span><span style="--bgc:#a5b4fc">Terraform</span>
    </div>
    <p class="hint" style="text-align:center;margin-top:8px">Puppet, Chef, Ansible = configuration management · Terraform = provisioning · Pulumi = provisioning with normal programming languages.</p>
  </article>

  <article class="chapter" id="l09-ben" data-ch="l09">
    <h2><span class="n">6</span>Benefits of IaC</h2>
    <p>One <b>template</b> → many identical <b>stacks</b> (each with a load balancer + auto scaling group). Edit the template and press update:</p>
    <div class="row"><label>Instances per stack <input type="range" id="stkN" min="1" max="5" value="2" style="width:140px"></label><button class="btn" id="stkUp">Update all stacks</button><button class="btn ghost" id="stkDel">Delete stack 3</button><button class="btn ghost" id="stkReset">Reset</button></div>
    <div class="grid3" id="stacks" style="margin-top:10px"></div>
    <div class="grid2" style="margin-top:12px">
      <div class="tile"><h4>Reduce multiple matching environments</h4><ul>
        <li>Rapid deployment of complex environments</li>
        <li>Provides configuration consistency</li>
        <li>Simple clean up (deleting the stack deletes the resources created)</li>
        <li>Easy to propagate a change to all stacks — modify the template, run update stack on all stacks</li></ul></div>
      <div class="tile"><h4>Plus</h4><ul><li><b>Reusability</b></li><li><b>Repeatability</b></li><li><b>Maintainability</b></li></ul></div>
    </div>
    <h3>Key benefits</h3>
    <div class="grid3">
      <div class="tile"><h4>🔁 Consistency &amp; reproducibility</h4>Deploy the same configuration across environments reliably — no discrepancies, hidden settings or manual errors.</div>
      <div class="tile"><h4>⚡ Automation &amp; speed</h4>Create, update or destroy entire environments <b>in minutes</b> with a single script.</div>
      <div class="tile"><h4>🔀 Version control</h4>Use tools like <b>Git</b> to track changes, review history and collaborate — just like app code.</div>
    </div>
    <div class="box mem"><b>Memory hook: "RRM" — "Recipes Repeat Mechanically"</b>Reusability · Repeatability · Maintainability.</div>
  </article>

  <article class="chapter" id="l09-best" data-ch="l09">
    <h2><span class="n">7</span>IaC Best Practices</h2>
    <div class="grid2">
      <div class="tile"><h4>📝 Use little or no documentation</h4>Define specs and parameters <b>in the configuration files</b>. Extra documentation that gets out of step with the real configuration isn't needed.</div>
      <div class="tile"><h4>🔀 Version control all configuration files</h4>Put every config file under source control → flexibility, accountability, and you can monitor and <b>restore previous versions</b>.</div>
      <div class="tile"><h4>🧪 Constantly test configurations</h4>Test in test/control environments before moving changes to production. Set up <b>automated tests</b> that run when config code changes.</div>
      <div class="tile"><h4>🧩 Modular approach</h4>Divide infrastructure into <b>components</b>, then combine them by automation. Limits how many changes hit each manifest.</div>
    </div>
    <div class="box mem"><b>Memory hook: "DVTM" — "Developers Value Tested Modules"</b>Documentation-light · Version control · Test constantly · Modular.</div>
  </article>

  <article class="chapter" id="l09-tf" data-ch="l09">
    <h2><span class="n">8</span>Terraform</h2>
    <ul class="clean">
      <li><b>HashiCorp Terraform</b>: IaC tool to define <b>both cloud and on-prem</b> resources in <b>human-readable configuration files</b> you can version, reuse and share.</li>
      <li>A consistent workflow to provision and manage infrastructure <b>throughout its lifecycle</b>.</li>
      <li>Manages <b>low-level</b> components (compute, storage, networking) and <b>high-level</b> ones (DNS entries, SaaS features).</li>
      <li>Works through each platform's <b>APIs</b>. <b>Providers</b> let Terraform work with virtually any platform with an accessible API (AWS, Azure, Google Cloud, 1000+ providers).</li>
    </ul>
    <h3>Core workflow: Write → Plan → Apply</h3>
    <div class="term-wrap">
      <div><div class="term"><div class="tb"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i>&nbsp; main.tf · terraform</div>
        <div class="out" id="tfOut" style="height:260px"></div></div>
        <div class="quick"><button data-tf="write">1 · Write</button><button data-tf="plan">2 · terraform plan</button><button data-tf="apply">3 · terraform apply</button><button data-tf="change">change count = 4</button></div></div>
      <div class="state-board"><h4>☁ Real infrastructure</h4><div id="tfInfra" class="hint">nothing yet</div><h4 style="margin-top:10px">📁 State file</h4><div id="tfState" class="hint">empty</div></div>
    </div>
    <div class="grid3" style="margin-top:12px">
      <div class="tile"><h4>✍ Write</h4>Define resources, maybe across multiple providers — e.g. VMs in a VPC with security groups and a load balancer.</div>
      <div class="tile"><h4>🔍 Plan</h4>Terraform creates an <b>execution plan</b>: what it will create, update or destroy based on existing infra and your config.</div>
      <div class="tile"><h4>🚀 Apply</h4><b>On approval</b>, performs the operations in the correct order, respecting <b>dependencies</b> (e.g. recreate the VPC before scaling its VMs). Updates the state file.</div>
    </div>
    <div class="box mem"><b>Memory hook: "WPA" — like Wi-Fi security 📶</b>Write, Plan, Apply.</div>
  </article>

  <article class="chapter" id="l09-cf" data-ch="l09">
    <h2><span class="n">9</span>AWS CloudFormation</h2>
    <ul class="clean">
      <li>A service that helps you <b>model and set up AWS resources</b>, so you spend less time managing them and more time on your applications.</li>
      <li>Create a <b>template</b> describing all the AWS resources you want (e.g. EC2 instances, RDS DB instances); CloudFormation <b>provisions and configures</b> them for you.</li>
      <li>No need to create each resource individually or work out <b>what depends on what</b> — CloudFormation handles that.</li>
    </ul>
    <h3>How it works — 3 steps</h3>
    <div class="pipe">
      <div class="stage"><span class="ic">📝</span><b>1</b> Create or use an existing template</div>
      <div class="stage"><span class="ic">🪣</span><b>2</b> Save locally or in an S3 bucket</div>
      <div class="stage"><span class="ic">🏗</span><b>3</b> CloudFormation creates a <b>stack</b> from the template — constructs and configures the resources</div>
    </div>
    <div class="table-wrap"><table>
      <tr><th></th><th>Terraform</th><th>AWS CloudFormation</th></tr>
      <tr><td>By</td><td>HashiCorp</td><td>AWS</td></tr>
      <tr><td>Clouds</td><td>Multi-cloud + on-prem (via providers)</td><td>AWS only</td></tr>
      <tr><td>Unit</td><td>Configuration + state file</td><td>Template → stack</td></tr>
      <tr><td>Tool type</td><td>Provisioning</td><td>Provisioning</td></tr>
    </table></div>
  </article>

  ${studyTabs("l09")}
</section>`,
`<div class="tile" style="--c:var(--l09)"><h4>L09 · Infrastructure as Code</h4><ul>
  <li>Manual risks: no repeatability at scale, no version control, no audit trails, inconsistent configs</li>
  <li>IaC: provision & manage resources via a template that is human-readable and machine-consumable</li>
  <li>With IaC: reusable code, instant deploy/teardown, version control, best practice in code, instant rollback</li>
  <li>Tool types: config mgmt (Puppet, Chef, Ansible, SaltStack) · server templating (Docker, Vagrant, Packer) · orchestration (Kubernetes, Swarm, OpenShift) · provisioning (Terraform, CloudFormation, GCP Deployment Manager)</li>
  <li>Imperative = step-by-step commands · Declarative = desired end state</li>
  <li>Benefits: consistency, speed, version control, reusability, repeatability, maintainability</li>
  <li>Best practices: little/no docs, version control, constant testing, modular</li>
  <li>Terraform: providers + APIs; Write → Plan → Apply</li>
  <li>CloudFormation: template → (local / S3) → stack</li></ul></div>`);

GAMES.l09 = { opts: ["Configuration management", "Server templating", "Orchestration", "Provisioning"], items: [
  { q: "Ansible", a: "Configuration management", why: "Puppet, Chef, Ansible, SaltStack install/manage software on existing servers." },
  { q: "Terraform", a: "Provisioning", why: "Terraform, CloudFormation, Google Cloud Deployment Manager do the initial setup." },
  { q: "Packer", a: "Server templating", why: "Docker, Vagrant, Packer create reusable server templates." },
  { q: "Kubernetes", a: "Orchestration", why: "Kubernetes, Docker Swarm, OpenShift manage interconnections between parts." },
  { q: "AWS CloudFormation", a: "Provisioning", why: "Provisioning tool." },
  { q: "Chef", a: "Configuration management", why: "Configuration management tool." },
  { q: "Vagrant", a: "Server templating", why: "Server templating tool." },
  { q: "Red Hat OpenShift", a: "Orchestration", why: "Orchestration tool." },
  { q: "Make sure all 50 existing servers have the same Nginx version installed.", a: "Configuration management", why: "Installing/managing software consistently on existing servers." },
  { q: "Create the VPC, subnets and VMs from nothing.", a: "Provisioning", why: "Initial setup of infrastructure." },
]};

QUIZ.l09 = [
  { q: "Which is NOT a risk of manual processes listed in the lecture?", o: ["No version control", "Lack of audit trails", "Too much automation", "Inconsistent data management"], a: 2, why: "Risks: no repeatability at scale, no version control, no audit trails, inconsistent data management." },
  { q: "'How will you roll back production to a prior version?' relates to…", o: ["No version control", "Lack of audit trails", "Repeatability", "Consistency"], a: 0, why: "No version control → no easy rollback." },
  { q: "IaC defines resources in a template that is…", o: ["Only machine-readable", "Human-readable and machine-consumable", "Encrypted and secret", "A spreadsheet"], a: 1, why: "Exact lecture definition." },
  { q: "With IaC, teardowns and deployments are…", o: ["Slow", "Instant", "Impossible", "Manual"], a: 1, why: "Without IaC they're slow; with IaC instant." },
  { q: "With IaC, best practices are…", o: ["Documented separately", "Written inside the code", "Ignored", "Emailed"], a: 1, why: "Best practices live in the code." },
  { q: "Which tool type installs and manages software on EXISTING servers?", o: ["Provisioning", "Configuration management", "Server templating", "Orchestration"], a: 1, why: "Configuration management (Puppet, Chef, Ansible, SaltStack)." },
  { q: "Docker, Vagrant and Packer are…", o: ["Provisioning tools", "Server templating tools", "Monitoring tools", "Configuration management tools"], a: 1, why: "Server templating tools." },
  { q: "Kubernetes, Docker Swarm and OpenShift are which IaC tool type?", o: ["Orchestration", "Provisioning", "Server templating", "Configuration management"], a: 0, why: "Orchestration tools manage interconnections." },
  { q: "Terraform, CloudFormation and Google Cloud Deployment Manager are…", o: ["Provisioning tools", "Configuration management tools", "Orchestration tools", "Databases"], a: 0, why: "Provisioning tools do the initial setup." },
  { q: "Writing explicit, sequential step-by-step commands is the…", o: ["Declarative approach", "Imperative approach", "Hybrid approach", "Passive approach"], a: 1, why: "Imperative = how; declarative = what (end state)." },
  { q: "Describing the final target configuration and letting the tool work out how is the…", o: ["Imperative approach", "Declarative approach", "Manual approach", "Agile approach"], a: 1, why: "Declarative." },
  { q: "In the IaC benefits example, deleting a stack…", o: ["Keeps all resources", "Deletes the resources it created", "Deletes the template", "Breaks other stacks"], a: 1, why: "Simple clean-up: deleting the stack deletes its resources." },
  { q: "To propagate a change to all stacks you…", o: ["Edit each resource by hand", "Modify the template and run update stack on all stacks", "Delete the account", "Reboot servers"], a: 1, why: "Template change + update stack." },
  { q: "Which is a best practice for IaC?", o: ["Write long separate documentation", "Version control all configuration files", "Never test", "One giant file"], a: 1, why: "Little/no docs, version control, constant testing, modular approach." },
  { q: "Terraform is made by…", o: ["AWS", "Microsoft", "HashiCorp", "Google"], a: 2, why: "HashiCorp Terraform." },
  { q: "Terraform works with virtually any platform through…", o: ["Providers using the platform's APIs", "Only SSH", "Spreadsheets", "Only AWS"], a: 0, why: "Providers + APIs." },
  { q: "The Terraform core workflow is…", o: ["Build, Test, Deploy", "Write, Plan, Apply", "Plan, Code, Release", "Pull, Create, Start"], a: 1, why: "Write → Plan → Apply." },
  { q: "Which Terraform stage creates an execution plan of what will be created, updated or destroyed?", o: ["Write", "Plan", "Apply", "Init"], a: 1, why: "Plan." },
  { q: "AWS CloudFormation creates a ___ from a template.", o: ["Bucket", "Stack", "Container", "Region"], a: 1, why: "Template → stack." },
  { q: "Where can a CloudFormation template be saved?", o: ["Only on paper", "Locally or in an S3 bucket", "Only in GitHub", "In RAM"], a: 1, why: "Step 2: save locally or in S3." },
];

CARDS.l09 = [
  ["4 risks of manual processes", "No repeatability at scale · No version control · Lack of audit trails · Inconsistent data management"],
  ["IaC definition", "Provisioning & managing cloud resources by defining them in a template that is human-readable and machine-consumable"],
  ["Without vs with IaC", "Manual/slow/error-prone/docs/hard rollback → reusable code/instant/version control/best practice in code/instant rollback"],
  ["4 IaC tool types", "Configuration management · Server templating · Orchestration · Provisioning"],
  ["Configuration management tools", "Install/manage software on existing servers: Puppet, Chef, Ansible, SaltStack"],
  ["Server templating tools", "Reusable server templates: Docker, Vagrant, Packer"],
  ["Orchestration tools", "Manage interconnections: Kubernetes, Docker Swarm, Red Hat OpenShift"],
  ["Provisioning tools", "Initial infrastructure setup: Terraform, AWS CloudFormation, Google Cloud Deployment Manager"],
  ["Imperative vs declarative", "Imperative: step-by-step commands. Declarative: describe desired end state"],
  ["IaC tools on slide", "Pulumi, Puppet, Chef, Ansible, Terraform"],
  ["IaC benefits", "Rapid deployment, consistency, simple clean-up, easy change propagation, reusability, repeatability, maintainability"],
  ["Key benefits", "Consistency & reproducibility · Automation & speed · Version control (Git)"],
  ["IaC best practices", "Little/no documentation · Version control all configs · Constantly test · Modular approach"],
  ["Terraform", "HashiCorp; cloud + on-prem in human-readable configs; low & high-level components; providers via APIs"],
  ["Terraform workflow", "Write (define) → Plan (execution plan) → Apply (on approval, respects dependencies, updates state)"],
  ["AWS CloudFormation", "Model & set up AWS resources from a template; handles dependencies"],
  ["CloudFormation steps", "1 Create/use template → 2 Save locally or S3 → 3 Create stack"],
];

INITS.push(function l09() {
  // manual vs IaC race
  document.getElementById("raceGo").onclick = () => {
    const M = document.getElementById("raceM"), I = document.getElementById("raceI");
    M.textContent = ""; I.textContent = "";
    const manual = ["Region 1: configure storage…", "Region 1: route network…", "Region 1: create instances…", "Region 1: build database…", "Region 2: configure storage…", "Region 2: oops, wrong subnet 😬", "Region 2: fixing…", "Region 2: create instances…", "Region 3: configure storage…", "…still clicking"];
    manual.forEach((t, i) => setTimeout(() => { M.textContent += t + "\n"; M.scrollTop = M.scrollHeight; }, i * 450));
    ["$ deploy template.yaml --regions 1,2,3", "Region 1 ✓  Region 2 ✓  Region 3 ✓", "🏁 Done — identical in all 3 regions"].forEach((t, i) => setTimeout(() => { I.textContent += t + "\n"; }, 300 + i * 500));
  };

  // imperative vs declarative
  const ap = {
    imp: ["<div class='box key'><b>Imperative — step-by-step commands</b>Write explicit, sequential commands that the system executes in a precise order to reach the final setup. You say <b>HOW</b>.</div>",
      "# imperative (script)\ncreate_vpc  10.0.0.0/16\ncreate_subnet  10.0.1.0/24\nlaunch_vm  web-1\nlaunch_vm  web-2\nattach_load_balancer  web-1 web-2\n# run it twice → 4 VMs! you must check first"],
    dec: ["<div class='box key'><b>Declarative — desired end state</b>Describe the final target configuration; the tool figures out how to build or modify the environment to match it. You say <b>WHAT</b>.</div>",
      '# declarative (Terraform-style)\nresource "aws_instance" "web" {\n  count         = 2\n  instance_type = "t3.micro"\n}\n# run it twice → still exactly 2 VMs'],
  };
  function apShow(k) { document.getElementById("apTxt").innerHTML = ap[k][0]; document.getElementById("apCode").textContent = ap[k][1]; }
  document.querySelectorAll("[data-ap]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-ap]").forEach(x => x.classList.toggle("on", x === b)); apShow(b.dataset.ap);
  });
  apShow("imp");

  // template → stacks
  let stacks, n;
  const reset = () => { stacks = [2, 2, 2]; n = 2; document.getElementById("stkN").value = 2; draw(); };
  function draw(msg) {
    document.getElementById("stacks").innerHTML = stacks.map((c, i) => c === null
      ? `<div class="tile" style="opacity:.5;text-align:center"><b>Stack ${i + 1}</b><br><small>deleted — all its resources removed</small></div>`
      : `<div class="tile"><b>Stack ${i + 1}</b><div class="srv" style="margin-top:6px">⚖ Load balancer</div><div class="srv">📈 Auto Scaling group <span class="dots">${"<i></i>".repeat(c)}</span></div></div>`).join("") +
      (msg ? `<p class="hint" style="grid-column:1/-1">${msg}</p>` : "");
  }
  document.getElementById("stkN").oninput = e => { n = +e.target.value; draw(`Template now says ${n} instances. Stacks don't change until you run update.`); };
  document.getElementById("stkUp").onclick = () => { stacks = stacks.map(c => c === null ? null : n); draw("✓ Update stack ran on every stack — one template change, propagated everywhere."); };
  document.getElementById("stkDel").onclick = () => { stacks[2] = null; draw("Deleting the stack deleted the resources it created. Simple clean-up."); };
  document.getElementById("stkReset").onclick = reset;
  reset();

  // terraform simulator
  const out = document.getElementById("tfOut");
  let cfg = 0, written = false, planned = null, real = 0, vpc = false;
  const p = (t, c) => { const d = document.createElement("div"); if (c) d.className = c; d.textContent = t; out.appendChild(d); out.scrollTop = out.scrollHeight; };
  const board = () => {
    document.getElementById("tfInfra").innerHTML = real ? `🌐 VPC<br>${"🖥 VM ".repeat(real)}<br>⚖ load balancer` : "nothing yet";
    document.getElementById("tfState").innerHTML = real ? `aws_vpc.main<br>aws_instance.web × ${real}<br>aws_lb.front` : "empty";
  };
  const act = {
    write() { cfg = 2; written = true; p("✍ main.tf written:", "info"); p('resource "aws_vpc" "main" { cidr_block = "10.0.0.0/16" }\nresource "aws_instance" "web" { count = 2 }\nresource "aws_lb" "front" { … }'); },
    change() { if (!written) return p("Write the configuration first.", "err"); cfg = 4; p("✍ main.tf edited: count = 4", "info"); },
    plan() {
      if (!written) return p("Error: no configuration files. Write first.", "err");
      p("$ terraform plan", "cmd");
      if (!real) { planned = cfg; p(`Plan: ${cfg + 2} to add, 0 to change, 0 to destroy.\n  + aws_vpc.main\n  + aws_instance.web × ${cfg}\n  + aws_lb.front`); }
      else if (cfg !== real) { planned = cfg; p(`Plan: ${Math.max(0, cfg - real)} to add, 1 to change, ${Math.max(0, real - cfg)} to destroy.\n  ~ aws_lb.front (new targets)\n  ${cfg > real ? "+" : "-"} aws_instance.web × ${Math.abs(cfg - real)}`); }
      else { planned = null; p("No changes. Your infrastructure matches the configuration."); }
    },
    apply() {
      p("$ terraform apply", "cmd");
      if (planned === null) return p(written ? "Nothing to apply — run plan to see changes." : "Error: no configuration. Write first.", "err");
      p("Do you want to perform these actions? yes   (approval)", "info");
      if (!vpc) { p("aws_vpc.main: Creating… done (created first — VMs depend on it)"); vpc = true; }
      p(`aws_instance.web: now ${planned} instances`); p("aws_lb.front: targets updated");
      p("Apply complete! State file updated.", "info"); real = planned; planned = null; board();
    },
  };
  document.querySelectorAll("[data-tf]").forEach(b => b.onclick = () => act[b.dataset.tf]());
  p("Terraform practice — press 1 · Write, then plan, then apply.", "info");
  board();
});
