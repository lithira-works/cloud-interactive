// Lecture 05 — Cloud Networking
addLecture(`
<section class="page" id="l05" style="--accent:var(--l05)">
  <div class="lec-head">
    <div class="kicker">Lecture 05 · Cloud Computing</div>
    <h1>Cloud Networking </h1>
    <p class="lead">Outline: <b>Recap → SDN → NFV → Virtual networks &amp; subnets → Access control → Gateways → Peering → Hybrid connectivity → Private access → Flow logs</b>. Analogy: a virtual network is your own <b>gated housing estate</b> inside the cloud city.</p>
    <div class="toc" data-toc></div>
  </div>

  <article class="chapter" id="l05-recap" data-ch="l05">
    <h2><span class="n">1</span>Networking Recap</h2>
    <div class="grid2">
      <div class="tile"><h4>IP addresses</h4>A unique address for each device, e.g. <code>10.0.0.4</code>.</div>
      <div class="tile"><h4>Subnets / VLSM</h4>Splitting an IP range into smaller blocks. VLSM = Variable Length Subnet Masking (different sizes).</div>
      <div class="tile"><h4>Basic routing</h4>Deciding which path a packet takes to reach another network.</div>
      <div class="tile"><h4>Default gateway</h4>The router a device sends traffic to when the destination is outside its own subnet.</div>
    </div>
    <div class="box key"><b>CIDR quick rule</b>In <code>/n</code>, the number of addresses = 2<sup>(32 − n)</sup>. So /24 = 256, /25 = 128, /27 = 32, /28 = 16.</div>
  </article>

  <article class="chapter" id="l05-sdn" data-ch="l05">
    <h2><span class="n">2</span>SDN and NFV</h2>
    <h3>Software Defined Networking (SDN)</h3>
    <ul class="clean">
      <li>A <b>network management architecture</b> that enables <b>dynamic, programmable network configuration</b> to improve network performance and monitoring.</li>
      <li><b>Decouples the network control and forwarding functions</b>, so network control becomes directly programmable and the underlying infrastructure is abstracted for apps and services.</li>
    </ul>
    <h3>Network Function Virtualization (NFV)</h3>
    <ul class="clean">
      <li>Decouples <b>Physical Network Functions (PNF)</b> from proprietary hardware appliances and runs them as <b>software in virtual machines</b> → <b>Virtual Network Functions (VNFs)</b>.</li>
      <li>VNFs include firewalls, traffic control, virtual routing etc.</li>
      <li><b>Cloud-native Network Functions (CNF)</b> are the <b>successor of VNFs</b>: a software PNF running inside a <b>Linux container</b>.</li>
    </ul>
    <div class="box eg"><b>Evolution</b>PNF (hardware box) → VNF (runs in a VM) → CNF (runs in a container)</div>
    <h4>Advantages of CNF</h4>
    <div class="chips"><span class="chip">Auto scaling</span><span class="chip">Speed</span><span class="chip">Flexibility</span><span class="chip">Efficiency</span><span class="chip">Deployment — DevOps, CI/CD</span><span class="chip">Security</span><span class="chip">Monitoring</span></div>
    <h3>SDN vs NFV</h3>
    <div class="grid2">
      <div class="tile plus"><h4>Similarities</h4><ul><li>Both use network abstraction</li><li>Both depend heavily on virtualization</li></ul></div>
      <div class="tile minus"><h4>Differences</h4><ul><li>SDN separates <b>control from forwarding</b>; NFV abstracts <b>all network functions</b> from hardware</li><li>SDN defines the <b>big picture</b>; NFV delivers <b>specific functionalities</b></li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook</b>SDN = the <b>traffic control centre</b> (decides routes, big picture). NFV = replacing physical toll booths with <b>software toll booths</b> (specific functions).</div>
  </article>

  <article class="chapter" id="l05-vnet" data-ch="l05">
    <h2><span class="n">3</span>Virtual Networks &amp; Subnets</h2>
    <div class="grid2">
      <div class="tile"><h4>Virtual Network</h4><ul>
        <li>Cloud networking service that provides networking functions to cloud resources</li>
        <li><b>Logically isolated</b> from other virtual networks</li>
        <li>Has one or more <b>IP ranges</b> and one or more <b>subnets</b></li>
        <li>Can <b>peer</b> with other virtual networks if IP ranges <b>do not overlap</b></li>
        <li>AWS <b>VPC</b> (Virtual Private Cloud) · <b>Azure Virtual Network</b></li></ul></div>
      <div class="tile"><h4>Subnets</h4><ul>
        <li>Segment the virtual network IP range even further</li>
        <li>Subnet CIDR blocks <b>cannot overlap</b> within a virtual network</li>
        <li>Traffic can be restricted using <b>Access Control Lists</b></li>
        <li><b>AWS</b>: public subnets (direct outbound internet) and private subnets (no direct outbound internet)</li>
        <li><b>Azure</b>: no public/private concept — all subnets act public; private behaviour via <b>route tables</b></li></ul></div>
    </div>
    <h3>Sizing rules</h3>
    <div class="grid2">
      <div class="tile"><h4>Allowed ranges — RFC 1918 private IPs</h4><code>10.0.0.0/8</code> (10.0.0.0 – 10.255.255.255)<br><code>172.16.0.0/12</code> (172.16.0.0 – 172.31.255.255)<br><code>192.168.0.0/16</code> (192.168.0.0 – 192.168.255.255)</div>
      <div class="tile"><h4>IPv4 allowed block sizes</h4><b>Azure</b>: /2 to /29<br><b>AWS</b>: /16 to /28</div>
    </div>
    <div class="box exam"><b>5 reserved IPs in every subnet</b>1st = network address · 2nd = router · 3rd = DNS · 4th = DNS/future use · Last = broadcast. Usable = 2<sup>(32−n)</sup> − 5.</div>
    <div class="box mem"><b>Memory hook: "N-R-D-D-B" — "Never Rent Dirty Dorm Beds"</b>Network · Router · DNS · DNS/future · Broadcast.</div>

    <h3>Subnet calculator</h3>
    <div class="calc">
      <div class="row"><input type="text" id="cidrIn" value="10.0.0.0/24" style="flex:1;min-width:180px" aria-label="CIDR block">
        <button class="btn" id="cidrGo">Calculate</button>
        <button class="chip" data-cidr="10.0.0.0/24">10.0.0.0/24</button><button class="chip" data-cidr="172.16.10.128/25">172.16.10.128/25</button><button class="chip" data-cidr="192.168.0.64/27">192.168.0.64/27</button></div>
      <div class="res" id="cidrOut"></div>
      <p class="hint" id="cidrNote" style="margin:8px 0 0"></p>
    </div>
    <details class="ask"><summary>Practice: how many usable IPs in a /26?</summary>2<sup>6</sup> = 64 → 64 − 5 = <b>59</b>.</details>
    <details class="ask"><summary>Practice: can AWS create a /29 subnet?</summary><b>No</b> — AWS allows /16 to /28. Azure allows down to /29.</details>
  </article>

  <article class="chapter" id="l05-nic" data-ch="l05">
    <h2><span class="n">4</span>Virtual Network Interfaces</h2>
    <ul class="clean">
      <li>A logical component that represents the <b>network interface card (NIC)</b>.</li>
      <li>Lets a compute instance communicate with other instances and/or the internet.</li>
      <li><b>Attaches to a compute instance</b>; you can attach <b>more than one</b> to the same instance.</li>
      <li>Can have <b>one public IP</b> and <b>one or more private IPs</b>.</li>
      <li>AWS <b>Elastic Network Interface (ENI)</b> · Azure <b>Network Interface Card (NIC)</b></li>
    </ul>
  </article>

  <article class="chapter" id="l05-acl" data-ch="l05">
    <h2><span class="n">5</span>Access Controlling</h2>
    <p>Simple <b>firewall</b> to control inbound/outbound traffic to a <b>subnet</b> or <b>network interface</b>. An ACL rule contains:</p>
    <div class="chips"><span class="chip">Rule number</span><span class="chip">Protocol</span><span class="chip">Source / destination port ranges</span><span class="chip">Source / destination IP ranges</span><span class="chip">Allow / Deny action</span></div>
    <div class="table-wrap"><table>
      <tr><th>Service</th><th>Attached to</th><th>Rules</th></tr>
      <tr><td>AWS Security Group (SG)</td><td>EC2 instance</td><td><b>Stateful</b></td></tr>
      <tr><td>AWS Network ACL (NACL)</td><td>Subnet</td><td><b>Stateless</b></td></tr>
      <tr><td>Azure Network Security Group (NSG)</td><td>Subnets <b>and</b> NICs</td><td><b>Stateful</b></td></tr>
    </table></div>
    <div class="grid2">
      <div class="tile"><h4>Stateful</h4>Only specify the rule for the <b>request</b>; the response is allowed automatically.</div>
      <div class="tile"><h4>Stateless</h4>Must specify rules for the <b>request AND the response</b>.</div>
    </div>
    <div class="row" style="margin-top:12px"><button class="chip on" data-fw="sf">Stateful (SG / NSG)</button><button class="chip" data-fw="sl">Stateless (NACL)</button><label class="hint"><input type="checkbox" id="fwOut"> outbound response rule added</label><button class="btn" id="fwSend">Send request ▶</button></div>
    <div class="log" id="fwLog" style="margin-top:8px">Press send…</div>
    <div class="box mem"><b>Memory hook</b>Stateful = a <b>bouncer with a memory</b> — remembers you went in, lets you out. Stateless = a bouncer with <b>no memory</b> — checks you both ways. <b>N</b>ACL = <b>N</b>o memory.</div>
  </article>

  <article class="chapter" id="l05-gw" data-ch="l05">
    <h2><span class="n">6</span>Network Gateway Services</h2>
    <p>Virtual network functions that connect cloud resources to outside networks / the internet. Click each:</p>
    <div class="stepper">
      <div class="steps"><button class="on">Internet Gateway</button><button>NAT Gateway</button><button>VPN Gateway</button><button>Transit Gateway</button></div>
      <div class="panel on"><h3>Internet Gateway</h3><ul class="clean"><li>Connectivity between the <b>internet and the virtual network</b></li><li><b>Scales horizontally</b>, <b>no bandwidth constraints</b></li><li>AWS Internet Gateway</li><li><b>Azure has no internet gateway concept</b> — internet access is provided by default through the default gateway</li></ul></div>
      <div class="panel"><h3>NAT Gateway</h3><ul class="clean"><li>Network Address Translation for instances in <b>private subnets</b> (they can go out)</li><li><b>Prevents connections initiated from the internet</b> (nobody can come in)</li><li>Must be deployed in a <b>public subnet</b></li><li>AWS NAT Instance · AWS NAT Gateway · Azure Virtual Network NAT</li></ul>
        <div class="box eg"><b>AWS picture</b>Private subnet instance → NAT gateway (public subnet) → Internet gateway → internet.</div></div>
      <div class="panel"><h3>VPN Gateway</h3><ul class="clean"><li>Creates <b>encrypted tunnels over the public internet</b> between virtual networks and on-premises networks</li><li>Azure VPN Gateway · AWS Virtual Private Gateway</li></ul>
        <h4>Two VPN types</h4><div class="grid2"><div class="tile"><b>Site-to-site</b><br>VNet ⇄ on-prem network, or VNet ⇄ VNet</div><div class="tile"><b>Point-to-site</b><br>VNet ⇄ one client PC with VPN client software</div></div>
        <p>Azure VPN Gateway does <b>both</b>. AWS Virtual Private Gateway does <b>only site-to-site</b>; point-to-site is a separate service, <b>AWS Client VPN</b>.</p></div>
      <div class="panel"><h3>Network Transit Gateway</h3><ul class="clean"><li>Connects <b>multiple virtual networks and on-prem networks through a central hub</b></li><li>Used to be built manually with the <b>hub-and-spoke</b> model</li><li>AWS Transit Gateway · Azure Virtual WAN</li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook</b>Internet GW = the estate's <b>main gate</b>. NAT = a <b>one-way door</b> (out only). VPN = a <b>secret tunnel</b>. Transit = a <b>roundabout</b> joining many roads.</div>
    <h3>Game: which gateway / service?</h3>
    <div class="game" data-game="l05"></div>
  </article>

  <article class="chapter" id="l05-peer" data-ch="l05">
    <h2><span class="n">7</span>Network Peering &amp; Bastion Hosts</h2>
    <ul class="clean">
      <li>Connects two virtual networks so they can communicate (used to be done with VPN gateways).</li>
      <li>A VNet can peer with <b>more than one</b> VNet, even <b>across accounts / subscriptions</b>.</li>
      <li><b>Does not support transitive peering.</b></li>
      <li>AWS <b>VPC Peering</b> · Azure <b>VNet Peering</b></li>
    </ul>
    <h3>Transitive peering test</h3>
    <div class="row"><button class="chip on" data-peer="ab">Peer A–B</button><button class="chip on" data-peer="bc">Peer B–C</button><button class="chip" data-peer="ac">Peer A–C</button><button class="btn" id="peerTest">Can A reach C?</button></div>
    <svg viewBox="0 0 360 140" class="chart" style="max-width:380px" id="peerSvg"></svg>
    <div class="box eg" id="peerOut"><b>Try it</b>With only A–B and B–C, press the test.</div>
    <h3>Bastion host (jump host)</h3>
    <ul class="clean">
      <li>A special instance that gives <b>secure management access</b> to instances in <b>private subnets</b>.</li>
      <li>Connect to private instances <b>without exposing them</b> to the internet.</li>
      <li>Must be in a <b>public subnet</b> with a <b>public IP</b>. Azure offers <b>Azure Bastion</b>.</li>
    </ul>
  </article>

  <article class="chapter" id="l05-hybrid" data-ch="l05">
    <h2><span class="n">8</span>Hybrid Connectivity</h2>
    <div class="grid2">
      <div class="tile"><h4>Connect remote users</h4><ul><li>Direct internet connectivity</li><li>Through VPN — <b>Azure Point-to-Site VPN</b>, <b>AWS Client VPN</b></li></ul></div>
      <div class="tile"><h4>Connect remote networks</h4><ul><li><b>Site-to-Site VPN</b></li><li><b>Direct connectivity</b> (private dedicated line, not the internet) — <b>Azure ExpressRoute</b>, <b>AWS Direct Connect</b></li></ul></div>
    </div>
    <div class="box mem"><b>Memory hook</b>Express<b>Route</b> = Azure's private <b>route</b>. Direct <b>Connect</b> = AWS's direct <b>connection</b>. Both skip the public internet.</div>
  </article>

  <article class="chapter" id="l05-priv" data-ch="l05">
    <h2><span class="n">9</span>Private Access to Cloud Services</h2>
    <p>Reach the CSP's <b>PaaS services</b> from your virtual network <b>without going through the public internet</b>.</p>
    <div class="grid2">
      <div class="tile"><h4>Private Links</h4><ul><li>Connected to a virtual network <b>with an IP</b></li><li>Access between VNet resources and PaaS services through Private Links</li><li>Azure Private Link · AWS PrivateLink</li></ul></div>
      <div class="tile"><h4>Private / Service Endpoints</h4><ul><li>Secure, direct connectivity to Azure PaaS over an optimised route on the <b>Azure backbone</b></li><li>Traffic <b>still hits the public endpoint</b> of the PaaS service</li><li>Azure Service Endpoints</li></ul></div>
    </div>
    <div class="box exam"><b>Exam tip</b>Private Link gives the service a <b>private IP inside your VNet</b>. Service endpoint uses the backbone but still targets the service's <b>public endpoint</b>.</div>
  </article>

  <article class="chapter" id="l05-flow" data-ch="l05">
    <h2><span class="n">10</span>Network Flow Logs</h2>
    <ul class="clean">
      <li>Capture information about <b>IP traffic going in and out</b> of network interfaces.</li>
      <li>Collected <b>outside the traffic path</b> → <b>no effect on throughput or latency</b>.</li>
      <li>Stored in separate object storage (AWS S3 / Azure Blobs).</li>
      <li><b>Azure</b> flow logs come from <b>NSGs</b>; <b>AWS</b> flow logs can be for <b>VPCs, subnets and/or ENIs</b>.</li>
    </ul>
    <h4>Use cases</h4>
    <div class="chips"><span class="chip">Troubleshooting connectivity</span><span class="chip">Intrusion / anomaly detection</span><span class="chip">Archival for compliance / legal</span></div>
  </article>

  ${studyTabs("l05")}
</section>`,
`<div class="tile" style="--c:var(--l05)"><h4>L05 · Networking</h4><ul>
  <li>SDN: decouples control & forwarding; programmable</li>
  <li>NFV: PNF → VNF (VM) → CNF (container)</li>
  <li>VNet (AWS VPC / Azure VNet): isolated, IP ranges, subnets, peer if no overlap</li>
  <li>RFC 1918: 10/8, 172.16/12, 192.168/16 · AWS /16–/28, Azure /2–/29</li>
  <li>5 reserved IPs: network, router, DNS, DNS/future, broadcast → usable = 2^(32−n) − 5</li>
  <li>NIC: AWS ENI / Azure NIC; 1 public + many private IPs</li>
  <li>SG stateful (instance) · NACL stateless (subnet) · NSG stateful (subnet + NIC)</li>
  <li>Gateways: Internet (Azure none), NAT (private out only, in public subnet), VPN (S2S, P2S), Transit (AWS TGW / Azure vWAN)</li>
  <li>Peering: not transitive · Bastion in public subnet</li>
  <li>Hybrid: ExpressRoute / Direct Connect · Private Link vs Service Endpoint · Flow logs</li></ul></div>`);

GAMES.l05 = { opts: ["Internet Gateway", "NAT Gateway", "VPN Gateway", "Transit Gateway", "Bastion Host"], items: [
  { q: "Instances in a private subnet need to download updates, but nobody on the internet should start a connection to them.", a: "NAT Gateway", why: "NAT gives outbound access to private subnets and blocks inbound initiated connections." },
  { q: "Connect 20 VPCs and 3 offices through one central hub.", a: "Transit Gateway", why: "Transit gateway = central hub for many networks (AWS Transit Gateway / Azure Virtual WAN)." },
  { q: "Encrypted tunnel over the internet between the office network and the VNet.", a: "VPN Gateway", why: "Site-to-site VPN via a VPN gateway." },
  { q: "Admins need to SSH into private servers without exposing them to the internet.", a: "Bastion Host", why: "Bastion/jump host in a public subnet gives secure management access." },
  { q: "Give a public subnet in an AWS VPC two-way internet access.", a: "Internet Gateway", why: "Internet gateway connects the VPC and the internet." },
  { q: "A student working from home connects their laptop to the company VNet.", a: "VPN Gateway", why: "Point-to-site VPN (Azure VPN Gateway, or AWS Client VPN)." },
]};

QUIZ.l05 = [
  { q: "SDN decouples…", o: ["Storage from compute", "Network control from forwarding functions", "Users from groups", "Data from metadata"], a: 1, why: "SDN separates control and forwarding, making control programmable." },
  { q: "NFV runs network functions such as firewalls as…", o: ["Physical appliances", "Software in virtual machines (VNFs)", "Spreadsheets", "Hardware ASICs"], a: 1, why: "NFV decouples PNFs from proprietary hardware into VNFs." },
  { q: "The successor of VNFs that runs in Linux containers is…", o: ["PNF", "CNF", "SDN", "NAT"], a: 1, why: "Cloud-native Network Functions." },
  { q: "Which is a SIMILARITY between SDN and NFV?", o: ["Both depend heavily on virtualization", "Both only work on-prem", "Both are storage services", "Neither uses abstraction"], a: 0, why: "Both use network abstraction and depend on virtualization." },
  { q: "AWS's virtual network is called…", o: ["VNet", "VPC", "VLAN", "VPN"], a: 1, why: "Virtual Private Cloud (Azure = Virtual Network)." },
  { q: "Two virtual networks can be peered only if…", o: ["They are in the same region", "Their IP ranges do not overlap", "They have no subnets", "They use IPv6"], a: 1, why: "Peering requires non-overlapping ranges." },
  { q: "Which is NOT an RFC 1918 private range?", o: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "8.8.8.0/24"], a: 3, why: "8.8.8.0/24 is public." },
  { q: "AWS allows subnet/VPC sizes between…", o: ["/2 and /29", "/16 and /28", "/8 and /32", "/24 only"], a: 1, why: "AWS /16–/28; Azure /2–/29." },
  { q: "How many usable IPs in 10.0.0.0/24 in the cloud?", o: ["256", "254", "251", "250"], a: 2, why: "256 − 5 reserved = 251." },
  { q: "How many usable IPs in 192.168.0.64/27?", o: ["32", "30", "27", "29"], a: 2, why: "2^5 = 32 − 5 = 27." },
  { q: "In 10.0.0.0/24, the first usable IP is…", o: ["10.0.0.0", "10.0.0.1", "10.0.0.4", "10.0.0.5"], a: 2, why: ".0 network, .1 router, .2 DNS, .3 future → first usable .4." },
  { q: "AWS Network ACLs are…", o: ["Stateful and attached to instances", "Stateless and attached to subnets", "Stateful and attached to subnets", "Not firewalls"], a: 1, why: "NACL = stateless, subnet level. SG = stateful, instance level." },
  { q: "Azure NSGs can be assigned to…", o: ["Only subnets", "Only NICs", "Both subnets and NICs", "Only VMs"], a: 2, why: "NSGs attach to subnets and NICs; stateful." },
  { q: "With stateless rules you must…", o: ["Specify only the request rule", "Specify rules for both request and response", "Specify nothing", "Use encryption"], a: 1, why: "Stateless needs both directions." },
  { q: "A NAT gateway must be deployed in…", o: ["A private subnet", "A public subnet", "On-premises", "Any region"], a: 1, why: "NAT gateway lives in a public subnet to reach the internet gateway." },
  { q: "Which CSP has no internet gateway concept?", o: ["AWS", "Azure", "Both", "Neither"], a: 1, why: "Azure provides internet by default through the default gateway." },
  { q: "AWS Virtual Private Gateway supports…", o: ["Only point-to-site", "Only site-to-site", "Both", "Neither"], a: 1, why: "AWS uses a separate AWS Client VPN for point-to-site." },
  { q: "A connects to B, B connects to C via peering. Can A talk to C?", o: ["Yes, automatically", "No — peering is not transitive", "Only on weekends", "Only via NAT"], a: 1, why: "Transitive peering is not supported." },
  { q: "A bastion host must be placed in…", o: ["A private subnet", "A public subnet with a public IP", "Object storage", "A NAT gateway"], a: 1, why: "It's the public entry point for managing private instances." },
  { q: "AWS's dedicated private connection from on-prem is…", o: ["ExpressRoute", "Direct Connect", "Client VPN", "Transit Gateway"], a: 1, why: "AWS Direct Connect; Azure ExpressRoute." },
  { q: "Network flow logs…", o: ["Slow down the network", "Are collected outside the traffic path with no effect on latency", "Replace firewalls", "Only work on-prem"], a: 1, why: "No effect on throughput or latency; stored in object storage." },
];

CARDS.l05 = [
  ["SDN", "Network management architecture: dynamic, programmable; decouples control and forwarding"],
  ["NFV", "Physical network functions → software VNFs in VMs (firewalls, routing, traffic control)"],
  ["CNF", "Successor of VNF: network function in a Linux container. Auto scaling, DevOps/CI-CD, security, monitoring"],
  ["SDN vs NFV difference", "SDN separates control/forwarding (big picture); NFV abstracts all network functions (specific functions)"],
  ["Virtual network", "Logically isolated, IP ranges, subnets, peer if no overlap. AWS VPC / Azure VNet"],
  ["AWS vs Azure subnets", "AWS: public & private subnets. Azure: all public; private via route tables"],
  ["RFC 1918 ranges", "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16"],
  ["Block size limits", "AWS /16 to /28 · Azure /2 to /29"],
  ["5 reserved IPs", "Network, router, DNS, DNS/future, broadcast. Usable = 2^(32−n) − 5"],
  ["Virtual NIC", "AWS ENI / Azure NIC; attach many per instance; 1 public + many private IPs"],
  ["SG / NACL / NSG", "SG stateful on instance · NACL stateless on subnet · NSG stateful on subnet & NIC"],
  ["Stateful vs stateless", "Stateful: request rule only. Stateless: request + response rules"],
  ["Internet gateway", "VNet ⇄ internet; scales horizontally; no bandwidth limit; Azure has none"],
  ["NAT gateway", "Outbound internet for private subnets, blocks inbound; deployed in public subnet"],
  ["VPN types", "Site-to-site (network ⇄ network) · Point-to-site (one PC)"],
  ["Transit gateway", "Central hub for many networks: AWS Transit Gateway / Azure Virtual WAN"],
  ["Peering", "VNet ⇄ VNet, across accounts; NOT transitive. AWS VPC Peering / Azure VNet Peering"],
  ["Bastion host", "Jump host in public subnet with public IP for secure access to private instances"],
  ["Direct connectivity", "Azure ExpressRoute · AWS Direct Connect"],
  ["Private Link vs Service Endpoint", "Private Link: private IP in VNet. Service Endpoint: Azure backbone but still hits public endpoint"],
  ["Flow logs", "Capture IP traffic; outside traffic path; stored in S3/Blobs; Azure from NSGs, AWS from VPC/subnet/ENI"],
];

INITS.push(function l05() {
  // subnet calculator
  const ip2n = s => s.split(".").reduce((a, o) => a * 256 + +o, 0);
  const n2ip = n => [24, 16, 8, 0].map(s => Math.floor(n / 2 ** s) % 256).join(".");
  function calc(v) {
    const out = document.getElementById("cidrOut"), note = document.getElementById("cidrNote");
    const m = v.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
    if (!m || m.slice(1, 5).some(o => +o > 255) || +m[5] > 32) { out.innerHTML = ""; note.textContent = "Type a CIDR like 10.0.0.0/24"; return; }
    const p = +m[5], size = 2 ** (32 - p);
    const base = Math.floor(ip2n(m.slice(1, 5).join(".")) / size) * size;
    if (size < 8) { out.innerHTML = ""; note.textContent = "Too small — cloud subnets need room for 5 reserved IPs (smallest is /29 in Azure, /28 in AWS)."; return; }
    const cell = (c, l, val) => `<div class="${c}"><small>${l}</small><b>${val}</b></div>`;
    out.innerHTML =
      cell("r", "1st · Network address", n2ip(base)) + cell("r", "2nd · Router", n2ip(base + 1)) +
      cell("r", "3rd · DNS", n2ip(base + 2)) + cell("r", "4th · DNS / future", n2ip(base + 3)) +
      cell("r", "Last · Broadcast", n2ip(base + size - 1)) + cell("u", "First usable", n2ip(base + 4)) +
      cell("u", "Last usable", n2ip(base + size - 2)) + cell("u", "Usable IPs", `2^${32 - p} − 5 = ${size - 5}`);
    const aws = p >= 16 && p <= 28, az = p >= 2 && p <= 29;
    note.innerHTML = `AWS (/16–/28): <b>${aws ? "✓ allowed" : "✗ not allowed"}</b> · Azure (/2–/29): <b>${az ? "✓ allowed" : "✗ not allowed"}</b>`;
  }
  const inp = document.getElementById("cidrIn");
  document.getElementById("cidrGo").onclick = () => calc(inp.value);
  inp.addEventListener("keydown", e => { if (e.key === "Enter") calc(inp.value); });
  document.querySelectorAll("[data-cidr]").forEach(b => b.onclick = () => { inp.value = b.dataset.cidr; calc(b.dataset.cidr); });
  calc(inp.value);

  // stateful vs stateless firewall
  let mode = "sf";
  document.querySelectorAll("[data-fw]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-fw]").forEach(x => x.classList.toggle("on", x === b)); mode = b.dataset.fw;
  });
  document.getElementById("fwSend").onclick = () => {
    const outRule = document.getElementById("fwOut").checked, log = document.getElementById("fwLog");
    let t = "→ Client sends HTTPS request to port 443\n✓ Inbound rule 'allow TCP 443' matches — request reaches the server\n";
    if (mode === "sf") t += "← Server replies\n✓ Stateful: firewall remembers this connection, response allowed automatically\nPage loads.";
    else t += outRule ? "← Server replies on an ephemeral port\n✓ Stateless: outbound response rule matches\nPage loads." : "← Server replies on an ephemeral port\n✗ Stateless: no outbound rule for the response — DROPPED\nPage never loads. Tick the box to add the response rule.";
    log.textContent = t;
  };

  // peering
  const on = { ab: true, bc: true, ac: false };
  const pos = { A: [60, 100], B: [180, 30], C: [300, 100] };
  function drawPeer(hl) {
    const ln = (k, a, b) => on[k] ? `<line x1="${pos[a][0]}" y1="${pos[a][1]}" x2="${pos[b][0]}" y2="${pos[b][1]}" stroke="var(--accent)" stroke-width="3"/>` : "";
    document.getElementById("peerSvg").innerHTML = ln("ab", "A", "B") + ln("bc", "B", "C") + ln("ac", "A", "C") +
      Object.entries(pos).map(([n, [x, y]]) => `<circle cx="${x}" cy="${y}" r="24" fill="var(--card2)" stroke="${hl && n !== "B" ? "var(--warn)" : "var(--line)"}" stroke-width="2"/><text x="${x}" y="${y + 5}" text-anchor="middle" fill="currentColor" font-weight="700">VNet ${n}</text>`).join("");
  }
  document.querySelectorAll("[data-peer]").forEach(b => b.onclick = () => { on[b.dataset.peer] = !on[b.dataset.peer]; b.classList.toggle("on", on[b.dataset.peer]); drawPeer(); });
  document.getElementById("peerTest").onclick = () => {
    drawPeer(true);
    document.getElementById("peerOut").innerHTML = on.ac ? "<b>✓ Yes</b>A and C are peered directly, so they can talk."
      : on.ab && on.bc ? "<b>✗ No!</b>Peering is <b>not transitive</b>. A–B and B–C does not give A–C. Add a direct A–C peering (or use a transit gateway)."
      : "<b>✗ No</b>There is no direct peering between A and C.";
  };
  drawPeer();
});
