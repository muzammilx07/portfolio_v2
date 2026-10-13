export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category:
    | "AI & Systems"
    | "Computer Vision"
    | "Full-Stack & Cloud"
    | "DevTools & Motion";
  year: string;
  status: "Active" | "Production" | "Open Source";
  readTime: string;
  metrics: ProjectMetric[];
  tags: string[];
  liveUrl: string;
  repoUrl?: string;
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  codeSnippet: string;
  architectureHighlights: string[];
}

export const projects: Project[] = [
  {
    slug: "ai-soc",
    title: "AI SOC Platform // Security Operations Center",
    summary:
      "Autonomous event-driven threat triage pipeline streaming live packet anomalies to ML classifiers with sub-180ms triage latency.",
    category: "AI & Systems",
    year: "2026",
    status: "Active",
    readTime: "6 min read",
    metrics: [
      { label: "Triage Latency", value: "<180ms" },
      { label: "Confidence Accuracy", value: "98.8%" },
      { label: "False Positives", value: "-64%" },
    ],
    tags: [
      "Next.js",
      "React",
      "FastAPI",
      "Python",
      "WebSocket",
      "SQLAlchemy",
      "XGBoost",
      "Isolation Forest",
    ],
    liveUrl: "https://github.com/muzammilx07/ai_soc",
    repoUrl: "https://github.com/muzammilx07/ai_soc",
    overview:
      "Modern Security Operations Centers drown in alert fatigue: thousands of raw network logs mask high-risk attack vectors. AI SOC Platform converts raw packet streams into live threat telemetry, evaluates anomalies with an ensemble of ML models, and executes automated playbook responses in milliseconds.",
    problem:
      "Security analysts face cognitive fatigue triaging thousands of noisy alerts daily across fragmented, static SIEM dashboards.",
    solution:
      "Implemented high-throughput WebSocket streams coupled with an ensemble of XGBoost and Isolation Forest classifiers trained on the CICIDS dataset to score and isolate incidents automatically.",
    keyFeatures: [
      "Sub-180ms bi-directional telemetry streaming raw network logs to the browser dashboard",
      "Supervised and unsupervised ML models filtering out 64% of recurring false positives",
      "Automated incident response playbooks for swift host quarantine and severity escalation",
      "Robust FastAPI and SQLAlchemy backend handling high-velocity event queues",
    ],
    codeSnippet: `# Real-Time Threat Classification & Incident Lifecycle (FastAPI + XGBoost)
@app.websocket("/ws/threat-stream")
async def threat_stream(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            raw_event = await log_queue.get()
            features = extract_cicids_features(raw_event)
            confidence = xgb_model.predict_proba([features])[0][1]
            anomaly = iforest.decision_function([features])[0]

            if confidence > 0.85 or anomaly < -0.2:
                incident = await create_incident_record(raw_event, confidence)
                if confidence > 0.92:
                    await execute_automated_playbook("ISOLATE_HOST", incident.host_id)
                await websocket.send_json(incident.to_dict())
    except WebSocketDisconnect:
        manager.disconnect(websocket)`,
    architectureHighlights: [
      "Bi-directional WebSocket streaming delivering sub-200ms threat telemetry",
      "Ensemble ML scoring combining supervised XGBoost with unsupervised Isolation Forest on CICIDS",
      "Automated playbooks for instant host isolation and priority escalation gates",
      "Asynchronous event queue supporting 10,000+ EPS (events per second)",
    ],
  },
  {
    slug: "missing-tracker-person",
    title: "AI/ML Missing Person Tracking System",
    summary:
      "Distributed search-and-rescue platform orchestrating public sighting reports, deep face embeddings, and automated police routing.",
    category: "Computer Vision",
    year: "2026",
    status: "Production",
    readTime: "7 min read",
    metrics: [
      { label: "Face Match Accuracy", value: "98.2%" },
      { label: "Routing Latency", value: "<45ms" },
      { label: "Geospatial Index", value: "PostGIS" },
    ],
    tags: [
      "Next.js",
      "React",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Leaflet",
      "Cloudinary",
    ],
    liveUrl: "https://github.com/muzammilx07/missing_tracker_person",
    repoUrl: "https://github.com/muzammilx07/missing_tracker_person",
    overview:
      "During critical missing-person incidents, coordination speed makes the difference between recovery and tragedy. This platform establishes a unified reporting and AI face matching network connecting distressed families, field volunteers, and law enforcement agencies with automated alerting and live geospatial dispatch.",
    problem:
      "Traditional search operations suffer from disjointed communication channels, slow social media manual checks, and jurisdictional delays.",
    solution:
      "Integrated deep facial embeddings with Leaflet geospatial indexing, automatically calculating proximities to nearest law enforcement stations upon sighting ingest.",
    keyFeatures: [
      "FaceNet appearance embedding engine delivering 98.2% top-match verification",
      "Interactive Leaflet dispatch map with automated reverse-geocoded incident boundaries",
      "Role-segregated coordination workflows for distressed families, field volunteers, and officers",
      "Optimized Cloudinary asset pipeline providing tamper-evident sighting image storage",
    ],
    codeSnippet: `# AI Face Matching & Geospatial Police Routing (FastAPI + Leaflet Geocoding)
@app.post("/api/v1/sightings/ingest")
async def ingest_public_sighting(
    image: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
):
    # 1. Cloudinary upload & face embedding extraction
    image_url = await upload_to_cloudinary(image)
    query_embedding = extract_face_embeddings(image_url)

    # 2. Vector match against active missing person database
    matches = await vector_store.search_faces(query_embedding, threshold=0.88)

    # 3. Geospatial reverse geocoding & nearest police station routing
    nearest_station = await get_nearest_police_station(latitude, longitude)

    if matches and matches[0].confidence > 0.90:
        await trigger_automated_fir_alert(
            case_id=matches[0].case_id,
            station=nearest_station,
            coordinates=(latitude, longitude),
            sighting_url=image_url
        )

    return {"status": "ingested", "potential_matches": len(matches)}`,
    architectureHighlights: [
      "Face embedding similarity matching reducing manual image investigation by over 80%",
      "Leaflet-powered spatial response map with automated reverse geocoding boundaries",
      "Containerized with Docker for seamless cross-environment deployment",
      "HNSW vector index allowing sub-15ms queries across 100k+ sighting embeddings",
    ],
  },
  {
    slug: "feedbackflow",
    title: "FeedbackFlow // Widget-Based Platform",
    summary:
      "Lightweight 3.1 kB feedback collection SDK and multi-tenant portal with zero layout shift and isolated Shadow DOM rendering.",
    category: "Full-Stack & Cloud",
    year: "2026",
    status: "Active",
    readTime: "5 min read",
    metrics: [
      { label: "Bundle Size", value: "3.1 kB" },
      { label: "CLS Penalty", value: "0.00" },
      { label: "Daily Events", value: "120k+" },
    ],
    tags: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Tailwind CSS",
    ],
    liveUrl: "https://github.com/muzammilx07/feedbackflow-",
    repoUrl: "https://github.com/muzammilx07/feedbackflow-",
    overview:
      "Product teams frequently deploy bloated third-party widgets that degrade Core Web Vitals, block the main thread, and trigger jarring layout shifts. FeedbackFlow provides a featherlight, accessible drop-in feedback widget that collects actionable qualitative signals with zero performance overhead.",
    problem:
      "Third-party customer survey scripts frequently bloat client bundle sizes, slow First Contentful Paint, and bleed styles into host apps.",
    solution:
      "Created a headless embeddable script operating inside Shadow DOM, backed by NextAuth JWT security and a Prisma multi-tenant database.",
    keyFeatures: [
      "Sub-4kB client payload eliminating host stylesheet bleed via encapsulated Shadow DOM",
      "Secure project key validation and rate-limited ingestion endpoints",
      "Full multi-tenant analytics dashboard built with Next.js 14 App Router and Tailwind CSS",
      "PostgreSQL data layer managed via type-safe Prisma ORM migrations",
    ],
    codeSnippet: `// Embeddable widget cross-origin client injection
import { initFeedbackFlow } from "@muzammilx07/feedbackflow";

// Initializes lightweight shadow-DOM container with verified project key
const widget = initFeedbackFlow({
  projectKey: "ff_live_09x71c",
  position: "bottom-right",
  theme: "auto",
  onSubmit: async (payload) => {
    console.log("Feedback captured without host style bleed:", payload.rating);
  },
});`,
    architectureHighlights: [
      "Shadow DOM containment prevents CSS conflicts with host web applications",
      "Prisma ORM schema with strict relation cascading for multi-tenant isolation",
      "NextAuth JWT authentication securing analytical administrative routes",
      "Edge worker ingestion routes data in under 20ms worldwide",
    ],
  },
  {
    slug: "auraflow",
    title: "AuraFlow // Event-Driven Workflow Canvas",
    summary:
      "Infinite-canvas visual DAG editor for modeling distributed microservices, event streams, and LLM orchestration chains.",
    category: "DevTools & Motion",
    year: "2025",
    status: "Open Source",
    readTime: "6 min read",
    metrics: [
      { label: "FPS Stability", value: "60 FPS" },
      { label: "Node Capacity", value: "800+" },
      { label: "Engine Weight", value: "Zero-Dep" },
    ],
    tags: [
      "TypeScript",
      "Canvas API",
      "Framer Motion",
      "DAG Engine",
      "State Machines",
    ],
    liveUrl: "https://github.com/muzammilx07/AuraFlow",
    repoUrl: "https://github.com/muzammilx07/AuraFlow",
    overview:
      "Complex asynchronous workflows are inherently non-linear and painful to reason about in plain code. AuraFlow gives engineers a butter-smooth visual canvas to compose event-driven DAGs (Directed Acyclic Graphs), inspect payload flow in real time, and export production-ready state machines.",
    problem:
      "Reasoning about non-linear asynchronous architectures solely in code leads to untracked circular dependencies and brittle pipeline coordination.",
    solution:
      "Engineered a hybrid canvas combining Canvas2D bezier wire curves with accessible React DOM node controls and quadtree viewport culling.",
    keyFeatures: [
      "Quadtree spatial indexing maintaining silky 60 FPS even with 800+ active nodes",
      "Real-time topological cycle detection preventing deadlock loops before execution",
      "Fluid spring-physics wire snapping and reactive magnetic port interactions",
      "One-click export to deterministic state machine specs compatible with Temporal",
    ],
    codeSnippet: `// Graph topological sort & cycle validation engine
export function validateWorkflowDAG(nodes: Map<string, WorkflowNode>): ValidationReport {
  const inDegree = new Map<string, number>();
  const adjList = new Map<string, string[]>();

  nodes.forEach((node, id) => {
    inDegree.set(id, 0);
    adjList.set(id, []);
  });

  nodes.forEach((node) => {
    node.connections.forEach((targetId) => {
      adjList.get(node.id)?.push(targetId);
      inDegree.set(targetId, (inDegree.get(targetId) || 0) + 1);
    });
  });

  const queue = Array.from(inDegree.keys()).filter((id) => inDegree.get(id) === 0);
  let processed = 0;

  while (queue.length > 0) {
    const curr = queue.shift()!;
    processed++;
    adjList.get(curr)?.forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    });
  }

  return { isCyclic: processed !== nodes.size, processedCount: processed };
}`,
    architectureHighlights: [
      "Quadtree spatial partitioning keeping DOM nodes under 60 even in 1000-node graphs",
      "Reactive spring physics on node dragging with fluid magnetic port snapping",
      "Hardware-accelerated WebGL connection shaders for high-density packet streams",
    ],
  },
  {
    slug: "notebook",
    title: "Notebook // Bi-Directional Markdown Vault",
    summary:
      "Local-first personal knowledge base featuring zero-lag wiki-link graph indexing, block transclusion, and offline persistence.",
    category: "Full-Stack & Cloud",
    year: "2025",
    status: "Active",
    readTime: "5 min read",
    metrics: [
      { label: "Search Speed", value: "<12ms" },
      { label: "Offline Mode", value: "100%" },
      { label: "Bundle Footprint", value: "Zero Vendor" },
    ],
    tags: ["TypeScript", "Next.js", "IndexedDB", "Web Workers", "TailwindCSS"],
    liveUrl: "https://github.com/muzammilx07/notebook",
    repoUrl: "https://github.com/muzammilx07/notebook",
    overview:
      "Modern note-taking tools have become bloated with proprietary lock-in and cloud sync lag. Notebook is a high-speed, local-first markdown workspace built for engineers who value privacy, speed, and interconnected thought structures.",
    problem:
      "Cloud note platforms suffer from sync latency, vendor lock-in, and degraded typing ergonomics when scaling to thousands of interconnected notes.",
    solution:
      "Built an offline storage engine leveraging IndexedDB and OPFS, delegating bidirectional link parsing to a dedicated background Web Worker.",
    keyFeatures: [
      "Non-blocking Web Worker tokenizing [[wikilinks]] on every keystroke",
      "2D force-directed node visualization mapped dynamically via HTML5 Canvas",
      "Instant local full-text search resolving queries in under 12 milliseconds",
      "Pure GitHub-Flavored Markdown portability with zero proprietary database blobs",
    ],
    codeSnippet: `// Keystroke wiki-link parser running in Web Worker
self.onmessage = (event: MessageEvent<{ text: string; fileId: string }>) => {
  const { text, fileId } = event.data;
  const linkRegex = /\\[\\[([^\\]]+)\\]\\]/g;
  const extractedLinks: string[] = [];

  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    extractedLinks.push(match[1].trim());
  }

  self.postMessage({
    type: "BACKLINKS_RESOLVED",
    fileId,
    targetNodes: extractedLinks,
  });
};`,
    architectureHighlights: [
      "Web Worker indexing prevents UI hitching even on documents with 50,000+ words",
      "Instant fuzzy search across title, content, and tags in less than 12 milliseconds",
      "Zero telemetry, zero trackers, full client-side privacy",
    ],
  },
  {
    slug: "portfolio-v2",
    title: "Portfolio v2 // Craft Engineering Platform",
    summary:
      "Hardware-inspired developer portfolio blending tactile Teenage Engineering micro-interactions with static Next.js performance.",
    category: "DevTools & Motion",
    year: "2026",
    status: "Production",
    readTime: "4 min read",
    metrics: [
      { label: "Lighthouse", value: "100/100" },
      { label: "Static Routes", value: "12 SSG" },
      { label: "CLS Rating", value: "0.00" },
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TailwindCSS",
      "Turbopack",
      "Framer Motion",
    ],
    liveUrl: "https://github.com/muzammilx07/portfolio_v2",
    repoUrl: "https://github.com/muzammilx07/portfolio_v2",
    overview:
      "A personal portfolio should not be a generic bootstrap template; it is a direct reflection of an engineer's taste, craft, and attention to detail. Portfolio v2 marries restrained editorial typography with tactile hardware-inspired interactivity.",
    problem:
      "Most developer portfolios fall into extremes: either sterile generic templates with zero personality, or bloated 3D canvases that stutter on mobile hardware.",
    solution:
      "Constructed an ultra-lean static architecture with zero layout shift, an interactive terminal gadget, and custom Web Audio haptic feedback.",
    keyFeatures: [
      "Integrated interactive developer CLI console with keyboard shortcut ergonomics",
      "Web Audio API synthesizer producing subtle mechanical click soundscapes",
      "Full static site generation (SSG) achieving flawless 100/100 Lighthouse metrics",
      "Tailwind design system tuned with hairline dividers and balanced contrast tokens",
    ],
    codeSnippet: `// Sound synthesis for tactile hardware interactions
function playTactileAudioFeedback(frequency = 720, duration = 0.04) {
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}`,
    architectureHighlights: [
      "100% prerendered static HTML (SSG) with instantaneous client-side hydration",
      "TailwindCSS with hairline 1px dividers and warm dark/porcelain light design tokens",
      "Micro-animations designed with spring dampening curves instead of linear easings",
    ],
  },
];
