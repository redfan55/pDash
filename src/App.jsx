import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity, Shield, Cpu, Truck, Camera, Stethoscope, Search, Car,
  X, Server, Layers, Network, Database, Terminal, Zap, ArrowRight,
  Lock, Eye, Box
} from 'lucide-react';
const IMG_C885A = null;
/* ═══ DATA ═══ */
const STACK_LAYERS = [
  { id: 'software', title: "NVIDIA AI Software", subtitle: "NVIDIA AI Enterprise \u00b7 NeMo \u00b7 NIM Microservices \u00b7 Run:ai GPU Orchestration", subtitle2: "AI Enterprise · NeMo · NIM · Run:ai", color: '#22c55e', icon: Terminal },
  { id: 'k8s', title: "Hybrid Kubernetes", subtitle: "Red Hat OpenShift \u00b7 Nutanix Kubernetes Platform \u00b7 Run:ai Workload Scheduling", subtitle2: "OpenShift · Nutanix · Run:ai", color: '#3b82f6', icon: Layers },
  { id: 'networking', title: "Cisco Networking", subtitle: "Nexus 9364E-SG2 \u00b7 N9100 Spectrum-X \u00b7 Silicon One \u00b7 Nexus Hyperfabric AI \u00b7 800G Ethernet", subtitle2: "Silicon One · Spectrum-X · 800G Ethernet", color: '#a855f7', icon: Network },
  { id: 'compute', title: "Cisco Compute with NVIDIA", subtitle: "UCS C885A M8 (HGX H200) \u00b7 C880A M8 (HGX B300 Blackwell) \u00b7 C845A M8 (MGX) \u00b7 Intersight", subtitle2: "Cisco UCS · AI PODs · NVIDIA RTX PRO · B300", color: '#06b6d4', icon: Server },
  { id: 'storage', title: "Partner Storage", subtitle: "VAST Data InsightEngine \u00b7 Pure Storage \u00b7 NetApp \u00b7 Hitachi Vantara \u00b7 Nutanix Unified Storage", subtitle2: "VAST · Pure · NetApp · Hitachi · Nutanix", color: '#94a3b8', icon: Database },
];

const WRAPPER_LAYERS = [
  { id: 'security', title: "Cisco Security", subtitle: "AI Defense · Hybrid Mesh Firewall · Hypershield · Isovalent · Secure Workload", color: '#f59e0b', icon: Lock },
  { id: 'observability', title: "Cisco Observability", subtitle: "Splunk Observability Cloud · Splunk Enterprise Security · ThousandEyes · Nexus Dashboard", color: '#f97316', icon: Eye },
];

const USE_CASES = [
  { id: 'healthcare', title: 'Personalized Healthcare', side: 'left', icon: Stethoscope, color: '#fb7185',
    challenge: 'Accelerate patient diagnostics and enable personalized treatment plans at scale',
    solution: [
      { bold: 'AI-Powered Imaging:', text: 'UCS C885A servers with 8× H200 GPUs accelerate medical imaging inference for real-time diagnostics.' },
      { bold: 'Model Governance:', text: 'Cisco AI Defense ensures HIPAA-compliant model validation and data lineage across the full stack.' },
      { bold: 'Federated Learning:', text: 'Secure multi-site model training without moving patient data, enabled by Hypershield zero-trust segmentation.' },
      { bold: 'Operational Intelligence:', text: 'Splunk Observability Cloud monitors inference latency, model drift, and resource utilization in real time.' },
    ],
    outcomes: ['Sub-2ms inference for diagnostic imaging', 'HIPAA-compliant AI model governance', 'Real-time visibility into model performance', 'Reduced diagnostic turnaround by 60%', '99.7% diagnostic accuracy'],
    partners: ['NVIDIA', 'Red Hat', 'VAST Data', 'Pure Storage'],
    stat1: '< 2ms', stat1Label: 'Inference', stat2: '99.7%', stat2Label: 'Accuracy' },
  { id: 'safety', title: 'Safety & Security', side: 'left', icon: Shield, color: '#94a3b8',
    challenge: 'Deliver real-time threat detection and automated emergency response across physical and digital domains',
    solution: [
      { bold: 'Computer Vision:', text: 'Real-time video analytics on UCS C885A with H200 GPUs for instant anomaly and threat detection.' },
      { bold: 'Zero-Trust Enforcement:', text: 'Hypershield enforces zero-trust at every AI node through BlueField-3 DPU integration.' },
      { bold: 'Event Correlation:', text: 'Splunk Enterprise Security aggregates and correlates security events across the full infrastructure stack.' },
      { bold: 'Network Segmentation:', text: 'Cisco Isovalent provides eBPF-based microsegmentation to isolate critical safety workloads.' },
    ],
    outcomes: ['Sub-millisecond threat detection', 'End-to-end zero-trust AI infrastructure', '24/7 automated monitoring and response', 'Unified security event correlation', 'Reduced incident response time by 80%'],
    partners: ['NVIDIA', 'Splunk', 'Red Hat', 'Schneider Electric'],
    stat1: '< 1ms', stat1Label: 'Detection', stat2: '24/7', stat2Label: 'Monitoring' },
  { id: 'physical-ai', title: 'Physical AI', side: 'left', icon: Cpu, color: '#818cf8',
    challenge: 'Enable autonomous industrial robotics with real-time sensor fusion and precision control',
    solution: [
      { bold: 'Edge Inference:', text: 'NVIDIA NIM microservices on Cisco UCS C845A M8 (MGX) deliver low-latency AI at the industrial edge.' },
      { bold: 'High-Speed Fabric:', text: 'Nexus Hyperfabric AI provides 800G Ethernet for real-time sensor fusion and closed-loop control.' },
      { bold: 'GPU Orchestration:', text: 'Run:ai dynamically allocates GPU resources across training and inference workloads for maximum utilization.' },
      { bold: 'Digital Twin Simulation:', text: 'NVIDIA Omniverse on Cisco Compute enables physics-accurate simulation before real-world deployment.' },
    ],
    outcomes: ['10x throughput improvement', '0.01mm precision in robotic operations', 'Real-time sensor fusion at 800G line rate', 'Dynamic GPU resource optimization', 'Seamless sim-to-real deployment'],
    partners: ['NVIDIA', 'Red Hat', 'Rockwell Automation', 'Schneider Electric'],
    stat1: '10x', stat1Label: 'Throughput', stat2: '0.01mm', stat2Label: 'Precision' },
  { id: 'self-driving', title: 'Self-Driving Vehicles', side: 'left', icon: Car, color: '#3b82f6',
    challenge: 'Process massive sensor data for autonomous fleet navigation with ultra-low latency',
    solution: [
      { bold: 'Non-Blocking Fabric:', text: 'Nexus 9364E-SG2 switches with Silicon One G200 provide 51.2 Tbps non-blocking backend fabric.' },
      { bold: 'GPU Scheduling:', text: 'Run:ai dynamically orchestrates GPU resources across distributed training clusters at fleet scale.' },
      { bold: 'High-Density Compute:', text: 'UCS C885A with 8× H200 SXM GPUs and NVLink interconnect for large-scale model training.' },
      { bold: 'Secure Data Pipeline:', text: 'Cisco AI Defense validates model outputs while Hybrid Mesh Firewall secures the data pipeline end-to-end.' },
    ],
    outcomes: ['Sub-5ms end-to-end inference latency', '800G fabric speed for sensor data', 'Dynamic GPU allocation across fleet training', 'Validated model outputs for safety-critical decisions', 'Scalable infrastructure for petabyte-scale datasets'],
    partners: ['NVIDIA', 'Red Hat', 'VAST Data', 'NetApp'],
    stat1: '< 5ms', stat1Label: 'Latency', stat2: '800G', stat2Label: 'Fabric Speed' },
  { id: 'drug-research', title: 'Drug Research', side: 'right', icon: Search, color: '#34d399',
    challenge: 'Accelerate molecular discovery and reduce time-to-market for new therapeutics',
    solution: [
      { bold: 'GPU-Dense Training:', text: 'UCS C880A M8 with Blackwell Ultra HGX B300 delivers 2.4x training throughput for molecular simulations.' },
      { bold: 'RAG Pipelines:', text: 'VAST Data InsightEngine powers retrieval-augmented generation for instant access to molecular databases.' },
      { bold: 'Kubernetes Orchestration:', text: 'Red Hat OpenShift manages containerized research workloads with automated scaling and lifecycle management.' },
      { bold: 'Compliance & Audit:', text: 'Cisco AI Defense provides model lineage tracking and audit trails for FDA regulatory requirements.' },
    ],
    outcomes: ['100x faster molecular screening', '10B+ molecule database accessible via RAG', 'Automated compliance and audit trails', 'Reduced drug discovery timeline by years', 'Scalable from lab to production clusters'],
    partners: ['NVIDIA', 'Red Hat', 'VAST Data', 'Pure Storage', 'NetApp'],
    stat1: '100x', stat1Label: 'Faster', stat2: '10B+', stat2Label: 'Molecules' },
  { id: 'retail', title: 'Retail Analytics', side: 'right', icon: Activity, color: '#e879f9',
    challenge: 'Drive predictive customer analytics and optimize supply chain operations in real time',
    solution: [
      { bold: 'Rapid Model Deployment:', text: 'NVIDIA AI Enterprise on Red Hat OpenShift enables rapid deployment of recommendation and forecasting models.' },
      { bold: 'Real-Time Monitoring:', text: 'Splunk Observability Cloud monitors inference quality, cost, and performance across all retail AI workloads.' },
      { bold: 'Scalable Storage:', text: 'Pure Storage FlashBlade provides high-throughput access to customer behavior and inventory datasets.' },
      { bold: 'Secure Customer Data:', text: 'Cisco Secure Workload enforces data protection policies across distributed retail environments.' },
    ],
    outcomes: ['35% uplift in conversion rates', 'Real-time inventory and demand insights', 'Automated model performance monitoring', 'Secure handling of customer data at scale', 'Reduced stockouts by 40%'],
    partners: ['NVIDIA', 'Red Hat', 'Pure Storage', 'Splunk'],
    stat1: '35%', stat1Label: 'Uplift', stat2: 'Real-time', stat2Label: 'Insights' },
  { id: 'warehouse', title: 'Intelligent Warehouse', side: 'right', icon: Truck, color: '#fb923c',
    challenge: 'Automate warehouse logistics with computer vision and edge AI for maximum efficiency',
    solution: [
      { bold: 'Flexible GPU Scaling:', text: 'UCS C845A M8 with NVIDIA MGX enables 2-to-8 GPU scaling per node for evolving workload demands.' },
      { bold: 'Network Segmentation:', text: 'Cisco Isovalent provides Kubernetes-native network policy for secure, segmented warehouse workloads.' },
      { bold: 'Autonomous Navigation:', text: 'NVIDIA Isaac on Cisco Compute powers autonomous mobile robots with real-time path planning.' },
      { bold: 'Predictive Maintenance:', text: 'Splunk Observability monitors equipment health and predicts failures before they cause downtime.' },
    ],
    outcomes: ['50% improvement in operational efficiency', 'Sub-3 second pick-and-place cycle time', 'Secure workload segmentation at the edge', 'Predictive maintenance reduces downtime 70%', 'Dynamic GPU scaling for peak demand'],
    partners: ['NVIDIA', 'Red Hat', 'Schneider Electric', 'Rockwell Automation'],
    stat1: '50%', stat1Label: 'Efficiency', stat2: '< 3s', stat2Label: 'Pick Time' },
  { id: 'defect-detection', title: 'Defect Detection', side: 'right', icon: Camera, color: '#22d3ee',
    challenge: 'Improve operational performance and maximize production uptime with zero-tolerance quality control',
    solution: [
      { bold: 'Secure Connectivity:', text: 'Cisco securely links all production systems, from IACS devices to robots, across plant and enterprise networks.' },
      { bold: 'Predictive Maintenance:', text: 'AI predicts maintenance needs, reducing downtime and preventing production disruptions.' },
      { bold: 'Quality Control:', text: 'AI-driven analytics ensure real-time product quality by detecting and correcting deviations instantly.' },
      { bold: 'Enhanced Security:', text: 'Hybrid Mesh Firewall secures the OT-IT boundary while AI Defense validates every model output.' },
    ],
    outcomes: ['Superior uptime and quality assurance', 'E2E AI-powered network and cybersecurity', 'Real-time visibility & predictive insights', 'Anticipate and prevent failures', 'Improved product quality and efficiency'],
    partners: ['NVIDIA', 'Intel', 'AMD', 'Schneider Electric', 'Rockwell Automation'],
    stat1: '99.99%', stat1Label: 'Detection', stat2: '1000/s', stat2Label: 'Throughput' },
];

/* ═══ LAYER INSIGHTS PER USE CASE ═══ */
const ALL_LAYERS_LIST = [
  { id: 'security', title: 'AI Security', color: '#f59e0b' },
  ...STACK_LAYERS,
  { id: 'observability', title: 'AI Observability', color: '#f97316' },
];

const LAYER_INSIGHTS = {
  'defect-detection': {
    security: 'Hybrid Mesh Firewall secures the OT-IT boundary, ensuring inspection data and AI model decisions are protected end-to-end from plant floor to enterprise.',
    software: 'NVIDIA NIM microservices power real-time defect classification models, detecting sub-millimeter flaws at full production line speed.',
    k8s: 'Red Hat OpenShift orchestrates containerized inspection workloads, auto-scaling GPU pods to match production throughput demands.',
    networking: 'Nexus 9364E-SG2 with 800G Ethernet delivers zero-loss frame transport from high-speed cameras to GPU inference nodes.',
    compute: 'UCS C885A with 8× H200 GPUs processes parallel camera streams, running multiple defect detection models simultaneously.',
    storage: 'VAST Data InsightEngine stores inspection imagery and training data with instant retrieval for model retraining pipelines.',
    observability: 'Splunk Observability monitors detection accuracy, inference latency, and camera feed health across all production lines.',
  },
  'healthcare': {
    security: 'AI Defense ensures HIPAA-compliant model governance and data lineage, protecting patient data across every inference request.',
    software: 'NVIDIA Clara and NIM microservices accelerate medical imaging inference, enabling real-time diagnostics from CT, MRI, and X-ray.',
    k8s: 'Red Hat OpenShift manages containerized diagnostic workloads with automated scaling and strict resource isolation per department.',
    networking: 'Cisco Networking provides deterministic low-latency connectivity between imaging devices, PACS systems, and GPU inference clusters.',
    compute: 'UCS C885A servers with H200 GPUs deliver sub-2ms inference for diagnostic imaging, processing multiple modalities in parallel.',
    storage: 'VAST Data and Pure Storage provide high-throughput access to medical imaging archives and patient datasets for model training.',
    observability: 'Splunk monitors model drift, inference latency, and system health, ensuring continuous diagnostic accuracy and compliance.',
  },
  'safety': {
    security: 'Hypershield enforces zero-trust at every AI node via BlueField-3 DPU integration, securing all video feeds and alert channels.',
    software: 'NVIDIA Metropolis on NIM microservices powers real-time video analytics for anomaly detection across thousands of camera feeds.',
    k8s: 'OpenShift orchestrates video analytics containers across edge and core, auto-scaling based on threat level and camera density.',
    networking: 'Nexus switches provide reliable multicast delivery of video streams with QoS prioritization for security-critical feeds.',
    compute: 'UCS servers with GPU acceleration process parallel video streams for real-time object detection and behavioral analysis.',
    storage: 'NetApp and VAST Data store months of surveillance footage with instant retrieval for forensic analysis and model retraining.',
    observability: 'Splunk Enterprise Security correlates AI-detected events across physical and cyber domains for unified threat response.',
  },
  'physical-ai': {
    security: 'Cisco Secure Workload and Isovalent enforce microsegmented network policies between robotic control planes and IT systems.',
    software: 'NVIDIA Isaac Sim and Omniverse enable digital twin simulation, while NIM microservices run real-time control inference.',
    k8s: 'Nutanix Kubernetes Platform manages distributed edge-to-core workloads, orchestrating GPU resources across robotic cells.',
    networking: 'Nexus Hyperfabric AI delivers deterministic sub-microsecond latency for closed-loop robotic control at 800G line rate.',
    compute: 'UCS C845A M8 with NVIDIA MGX provides flexible 2-to-8 GPU scaling per robotic cell for training and inference.',
    storage: 'High-throughput storage from Pure Storage provides instant access to sensor telemetry and simulation datasets.',
    observability: 'ThousandEyes and Splunk monitor network latency, robot performance, and system health across all manufacturing cells.',
  },
  'self-driving': {
    security: 'AI Defense validates every model output for safety-critical driving decisions, while Hybrid Mesh Firewall secures data pipelines.',
    software: 'NVIDIA DRIVE on NIM microservices runs perception, planning, and prediction models across distributed GPU training clusters.',
    k8s: 'Red Hat OpenShift manages fleet-scale training jobs, orchestrating thousands of GPU-hours across distributed data centers.',
    networking: 'Nexus 9364E-SG2 with Silicon One G200 provides 51.2 Tbps non-blocking fabric for massive sensor data aggregation.',
    compute: 'UCS C885A with 8× H200 GPUs and NVLink interconnect processes petabytes of LIDAR, camera, and radar training data.',
    storage: 'VAST Data InsightEngine delivers high-bandwidth access to petabyte-scale driving datasets for continuous model improvement.',
    observability: 'Splunk Observability tracks training throughput, model accuracy metrics, and infrastructure utilization across the fleet pipeline.',
  },
  'drug-research': {
    security: 'Cisco AI Defense provides model lineage tracking and audit trails meeting FDA regulatory requirements for drug development.',
    software: 'NVIDIA BioNeMo and NIM microservices accelerate molecular dynamics, protein folding, and generative chemistry workflows.',
    k8s: 'Red Hat OpenShift manages research workloads with automated scaling, enabling rapid iteration across thousands of experiments.',
    networking: 'Cisco Networking delivers high-bandwidth RDMA connectivity between GPU clusters for distributed molecular simulation.',
    compute: 'UCS C880A M8 with Blackwell B300 GPUs delivers 2.4× training throughput for large-scale molecular simulations.',
    storage: 'VAST Data InsightEngine powers RAG pipelines for instant retrieval across databases of 10B+ molecular compounds.',
    observability: 'Splunk monitors experiment pipelines, GPU utilization, and research throughput to optimize cluster scheduling and costs.',
  },
  'retail': {
    security: 'Cisco Secure Workload enforces customer data protection policies across distributed retail AI environments at every endpoint.',
    software: 'NVIDIA AI Enterprise powers recommendation engines, demand forecasting, and computer vision for in-store analytics.',
    k8s: 'Red Hat OpenShift enables rapid model deployment and A/B testing across thousands of store endpoints simultaneously.',
    networking: 'Cisco SD-WAN and Nexus switches connect edge retail locations to central AI clusters with optimized traffic routing.',
    compute: 'UCS servers with GPU acceleration run real-time recommendation inference and behavioral analytics at store scale.',
    storage: 'Pure Storage FlashBlade provides high-throughput access to customer behavior datasets and inventory management systems.',
    observability: 'Splunk Observability monitors inference quality, model drift, conversion metrics, and system performance in real time.',
  },
  'warehouse': {
    security: 'Cisco Isovalent provides eBPF-based microsegmentation to isolate autonomous robot control planes from enterprise networks.',
    software: 'NVIDIA Isaac powers autonomous mobile robots with real-time path planning, object detection, and pick optimization.',
    k8s: 'Kubernetes-native workload orchestration scales GPU pods dynamically to match real-time warehouse throughput demands.',
    networking: 'Cisco Networking delivers reliable low-latency Wi-Fi 7 and wired connectivity for real-time robot coordination.',
    compute: 'UCS C845A M8 with NVIDIA MGX provides flexible GPU scaling per warehouse zone for edge AI inference.',
    storage: 'NetApp and Nutanix Unified Storage manage inventory databases, order queues, and robot telemetry at scale.',
    observability: 'Splunk monitors equipment health, pick rates, robot performance, and predicts failures before they cause downtime.',
  },
};

/* ═══ ISOMETRIC SCENE SYSTEM ═══ */
const isoTx = (gx, gy) => 280 + (gx - gy) * 24;
const isoTy = (gx, gy, gz = 0) => 200 + (gx + gy) * 14 - gz * 20;
const isoPt = (gx, gy, gz) => `${isoTx(gx,gy)},${isoTy(gx,gy,gz)}`;

const IsoBox = ({ gx, gy, gz, w, d, h, baseColor, lit, pulse }) => {
  const top = [isoPt(gx,gy,gz+h), isoPt(gx+w,gy,gz+h), isoPt(gx+w,gy+d,gz+h), isoPt(gx,gy+d,gz+h)].join(' ');
  const right = [isoPt(gx+w,gy,gz+h), isoPt(gx+w,gy,gz), isoPt(gx+w,gy+d,gz), isoPt(gx+w,gy+d,gz+h)].join(' ');
  const left = [isoPt(gx,gy+d,gz+h), isoPt(gx+w,gy+d,gz+h), isoPt(gx+w,gy+d,gz), isoPt(gx,gy+d,gz)].join(' ');
  return (
    <g className="transition-all duration-700" style={{ opacity: lit ? 1 : 0.18 }}>
      <polygon points={left} fill={baseColor} opacity={0.35} stroke={baseColor} strokeWidth={0.5} />
      <polygon points={right} fill={baseColor} opacity={0.55} stroke={baseColor} strokeWidth={0.5} />
      <polygon points={top} fill={baseColor} opacity={0.8} stroke={baseColor} strokeWidth={0.5} />
      {pulse && <polygon points={top} fill="#fff" opacity={0.15} style={{ animation: 'scenePulse 2s ease-in-out infinite' }} />}
    </g>
  );
};

const SCENE_DEFS = {
  'defect-detection': [
    { gx:0,gy:0,gz:0,w:11,d:7,h:0.1, color:'#1a2744', layers:[] },
    { gx:1,gy:2.8,gz:0.1,w:9,d:1.2,h:0.2, color:'#3b82f6', layers:['compute','storage'], label:'Conveyor Belt' },
    { gx:3.5,gy:0.5,gz:0.1,w:0.5,d:0.5,h:3, color:'#a855f7', layers:['networking','software'], label:'Camera 1' },
    { gx:7,gy:0.5,gz:0.1,w:0.5,d:0.5,h:3, color:'#a855f7', layers:['networking','software'], label:'Camera 2' },
    { gx:5,gy:4.5,gz:0.1,w:1,d:1,h:1.8, color:'#22c55e', layers:['k8s','software'], label:'Robot Arm' },
    { gx:0.5,gy:5,gz:0.1,w:1.8,d:1.2,h:2, color:'#06b6d4', layers:['compute'], label:'GPU Server' },
    { gx:9,gy:5,gz:0.1,w:1.5,d:1.2,h:1.8, color:'#f97316', layers:['observability'], label:'Dashboard' },
    { gx:3,gy:3,gz:0.3,w:0.5,d:0.5,h:0.4, color:'#22d3ee', layers:['software'] },
    { gx:5.5,gy:3,gz:0.3,w:0.5,d:0.5,h:0.4, color:'#22d3ee', layers:['software'] },
    { gx:8,gy:3,gz:0.3,w:0.5,d:0.5,h:0.4, color:'#f43f5e', layers:['software'] },
  ],
  'healthcare': [
    { gx:0,gy:0,gz:0,w:11,d:7,h:0.1, color:'#1a2744', layers:[] },
    { gx:1,gy:1,gz:0.1,w:2.5,d:1.5,h:0.3, color:'#fb7185', layers:['compute','software'], label:'MRI Scanner' },
    { gx:1,gy:1,gz:0.4,w:1,d:1.5,h:1.5, color:'#fb7185', layers:['compute','software'] },
    { gx:4.5,gy:1,gz:0.1,w:2,d:1.2,h:0.2, color:'#818cf8', layers:['k8s'], label:'Patient Bed' },
    { gx:7.5,gy:0.5,gz:0.1,w:1.5,d:1,h:2, color:'#06b6d4', layers:['compute'], label:'Compute' },
    { gx:7.5,gy:2,gz:0.1,w:1.5,d:1,h:2, color:'#94a3b8', layers:['storage'], label:'PACS Storage' },
    { gx:1,gy:4.5,gz:0.1,w:2,d:1.5,h:1.5, color:'#f97316', layers:['observability'], label:'Monitoring' },
    { gx:4.5,gy:4,gz:0.1,w:2,d:1.5,h:1.8, color:'#22c55e', layers:['software'], label:'AI Diagnostics' },
    { gx:8,gy:4.5,gz:0.1,w:2,d:1.5,h:1.5, color:'#f59e0b', layers:['security'], label:'Compliance' },
  ],
  'safety': [
    { gx:0,gy:0,gz:0,w:11,d:7,h:0.1, color:'#1a2744', layers:[] },
    { gx:3,gy:1.5,gz:0.1,w:4,d:3,h:2.5, color:'#94a3b8', layers:['security'], label:'Facility' },
    { gx:0.5,gy:0.5,gz:0.1,w:0.4,d:0.4,h:3, color:'#a855f7', layers:['networking'], label:'Cam 1' },
    { gx:9,gy:0.5,gz:0.1,w:0.4,d:0.4,h:3, color:'#a855f7', layers:['networking'], label:'Cam 2' },
    { gx:0.5,gy:5.5,gz:0.1,w:0.4,d:0.4,h:3, color:'#a855f7', layers:['networking'], label:'Cam 3' },
    { gx:8,gy:5,gz:0.1,w:2.5,d:1.5,h:1.8, color:'#f97316', layers:['observability'], label:'SOC' },
    { gx:0.5,gy:3,gz:0.1,w:2,d:1.2,h:1.5, color:'#06b6d4', layers:['compute','software'], label:'Edge AI' },
    { gx:9,gy:3,gz:0.1,w:1.5,d:1.2,h:2, color:'#22c55e', layers:['k8s'], label:'Orchestrator' },
  ],
  'physical-ai': [
    { gx:0,gy:0,gz:0,w:11,d:7,h:0.1, color:'#1a2744', layers:[] },
    { gx:3,gy:1.5,gz:0.1,w:1.2,d:1.2,h:0.3, color:'#818cf8', layers:['k8s','software'], label:'Robot Base' },
    { gx:3.3,gy:1.8,gz:0.4,w:0.6,d:0.6,h:2.5, color:'#818cf8', layers:['software'] },
    { gx:5.5,gy:1,gz:0.1,w:3,d:2,h:0.3, color:'#3b82f6', layers:['compute'], label:'Assembly Table' },
    { gx:0.5,gy:0.5,gz:0.1,w:2,d:1.5,h:2, color:'#06b6d4', layers:['compute'], label:'GPU Node' },
    { gx:0.5,gy:3.5,gz:0.1,w:2,d:1.5,h:1.5, color:'#22c55e', layers:['software'], label:'Digital Twin' },
    { gx:9,gy:1,gz:0.1,w:1.5,d:1.2,h:1.8, color:'#a855f7', layers:['networking'], label:'5G/800G Hub' },
    { gx:5.5,gy:4.5,gz:0.1,w:2.5,d:1.5,h:1.5, color:'#f97316', layers:['observability'], label:'Monitoring' },
    { gx:9,gy:4.5,gz:0.1,w:1.5,d:1.5,h:1.8, color:'#f59e0b', layers:['security'], label:'Secure Edge' },
  ],
  'self-driving': [
    { gx:0,gy:0,gz:0,w:11,d:7,h:0.1, color:'#1a2744', layers:[] },
    { gx:1,gy:2.5,gz:0.1,w:8,d:1.5,h:0.1, color:'#334155', layers:[] },
    { gx:3,gy:2.6,gz:0.2,w:2,d:1,h:0.8, color:'#3b82f6', layers:['software','compute'], label:'AV Vehicle' },
    { gx:6.5,gy:2.6,gz:0.2,w:1.5,d:1,h:0.8, color:'#3b82f6', layers:['software'] },
    { gx:1,gy:0.5,gz:0.1,w:0.5,d:0.5,h:2.5, color:'#a855f7', layers:['networking'], label:'LIDAR Tower' },
    { gx:9,gy:0.5,gz:0.1,w:0.5,d:0.5,h:2.5, color:'#a855f7', layers:['networking'], label:'RSU' },
    { gx:7,gy:5,gz:0.1,w:3,d:1.5,h:2.2, color:'#06b6d4', layers:['compute','storage'], label:'Data Center' },
    { gx:0.5,gy:5,gz:0.1,w:2.5,d:1.5,h:1.5, color:'#f97316', layers:['observability'], label:'Fleet Ops' },
    { gx:4,gy:5,gz:0.1,w:2,d:1.5,h:1.8, color:'#22c55e', layers:['k8s'], label:'Training Cluster' },
  ],
  'drug-research': [
    { gx:0,gy:0,gz:0,w:11,d:7,h:0.1, color:'#1a2744', layers:[] },
    { gx:1,gy:1,gz:0.1,w:3,d:2,h:0.3, color:'#34d399', layers:['software'], label:'Lab Bench' },
    { gx:1.5,gy:1.2,gz:0.4,w:0.8,d:0.8,h:1.5, color:'#34d399', layers:['software'] },
    { gx:3,gy:1.2,gz:0.4,w:0.8,d:0.8,h:1, color:'#818cf8', layers:['k8s'], label:'Sequencer' },
    { gx:6,gy:0.5,gz:0.1,w:2,d:1.5,h:2.2, color:'#06b6d4', layers:['compute'], label:'HPC Cluster' },
    { gx:9,gy:0.5,gz:0.1,w:1.5,d:1.5,h:2.2, color:'#94a3b8', layers:['storage'], label:'Molecule DB' },
    { gx:1,gy:4.5,gz:0.1,w:2.5,d:2,h:1.8, color:'#a855f7', layers:['networking'], label:'RDMA Fabric' },
    { gx:5,gy:4.5,gz:0.1,w:2.5,d:1.5,h:1.5, color:'#f97316', layers:['observability'], label:'Pipeline Monitor' },
    { gx:8.5,gy:4,gz:0.1,w:2,d:1.5,h:1.8, color:'#f59e0b', layers:['security'], label:'FDA Compliance' },
  ],
  'retail': [
    { gx:0,gy:0,gz:0,w:11,d:7,h:0.1, color:'#1a2744', layers:[] },
    { gx:1,gy:0.5,gz:0.1,w:1,d:3,h:2, color:'#e879f9', layers:['software'], label:'Shelf A' },
    { gx:3,gy:0.5,gz:0.1,w:1,d:3,h:2, color:'#e879f9', layers:['software'], label:'Shelf B' },
    { gx:5,gy:1,gz:0.1,w:2.5,d:1.5,h:0.8, color:'#818cf8', layers:['k8s'], label:'Checkout' },
    { gx:8,gy:0.5,gz:0.1,w:2.5,d:2,h:2, color:'#06b6d4', layers:['compute'], label:'Edge Server' },
    { gx:1,gy:4.5,gz:0.1,w:3,d:2,h:1.5, color:'#a855f7', layers:['networking'], label:'SD-WAN Hub' },
    { gx:5,gy:4.5,gz:0.1,w:2.5,d:1.5,h:1.5, color:'#f97316', layers:['observability'], label:'Analytics' },
    { gx:8.5,gy:4,gz:0.1,w:2,d:2,h:2, color:'#94a3b8', layers:['storage'], label:'Customer DB' },
  ],
  'warehouse': [
    { gx:0,gy:0,gz:0,w:11,d:7,h:0.1, color:'#1a2744', layers:[] },
    { gx:0.5,gy:0.5,gz:0.1,w:1,d:2,h:2.5, color:'#fb923c', layers:['storage'], label:'Rack A' },
    { gx:2.5,gy:0.5,gz:0.1,w:1,d:2,h:2.5, color:'#fb923c', layers:['storage'], label:'Rack B' },
    { gx:4.5,gy:0.5,gz:0.1,w:1,d:2,h:2.5, color:'#fb923c', layers:['storage'], label:'Rack C' },
    { gx:7,gy:1,gz:0.1,w:1,d:1,h:0.8, color:'#22c55e', layers:['software','k8s'], label:'AGV Robot' },
    { gx:6,gy:3.5,gz:0.1,w:4,d:1,h:0.2, color:'#3b82f6', layers:['compute'], label:'Conveyor' },
    { gx:0.5,gy:4.5,gz:0.1,w:2.5,d:2,h:1.8, color:'#06b6d4', layers:['compute'], label:'Edge Compute' },
    { gx:4,gy:5,gz:0.1,w:2.5,d:1.5,h:1.5, color:'#a855f7', layers:['networking'], label:'Wi-Fi 7 Hub' },
    { gx:8,gy:5,gz:0.1,w:2.5,d:1.5,h:1.5, color:'#f97316', layers:['observability'], label:'Control Tower' },
  ],
};

const UseCaseScene = ({ useCaseId, activeLayer, color }) => {
  const elements = SCENE_DEFS[useCaseId] || SCENE_DEFS['defect-detection'];
  return (
    <svg viewBox="0 0 560 380" className="w-full h-full">
      {/* Grid */}
      {[...Array(12)].map((_, i) => <line key={`gx${i}`} x1={isoTx(i,0)} y1={isoTy(i,0)} x2={isoTx(i,7)} y2={isoTy(i,7)} stroke="rgba(100,140,200,0.05)" strokeWidth="0.5" />)}
      {[...Array(8)].map((_, i) => <line key={`gy${i}`} x1={isoTx(0,i)} y1={isoTy(0,i)} x2={isoTx(11,i)} y2={isoTy(11,i)} stroke="rgba(100,140,200,0.05)" strokeWidth="0.5" />)}
      {/* Data flow lines */}
      {elements.filter(e => e.layers.length > 0 && e.h > 0.5).map((el, i, arr) => {
        if (i === 0 || !arr[i-1]) return null;
        const prev = arr[i-1];
        const anyLit = !activeLayer || el.layers.includes(activeLayer) || prev.layers.includes(activeLayer);
        return <line key={`fl${i}`} x1={isoTx(el.gx+el.w/2,el.gy+el.d/2)} y1={isoTy(el.gx+el.w/2,el.gy+el.d/2,el.gz+el.h/2)} x2={isoTx(prev.gx+prev.w/2,prev.gy+prev.d/2)} y2={isoTy(prev.gx+prev.w/2,prev.gy+prev.d/2,prev.gz+prev.h/2)}
          stroke={anyLit ? 'rgba(100,160,255,0.25)' : 'rgba(100,160,255,0.04)'} strokeWidth={anyLit && activeLayer ? 1.5 : 0.8} strokeDasharray="5 4"
          className="transition-all duration-500" style={anyLit && activeLayer ? { animation: 'dataFlow 1.5s linear infinite' } : {}} />;
      })}
      {/* Boxes */}
      {elements.map((el, i) => {
        const isFloor = el.layers.length === 0;
        const lit = isFloor || !activeLayer || el.layers.includes(activeLayer);
        const matchColor = (lit && activeLayer && el.layers.includes(activeLayer)) ? (ALL_LAYERS_LIST.find(l => l.id === activeLayer)?.color || el.color) : el.color;
        return (
          <g key={i}>
            <IsoBox gx={el.gx} gy={el.gy} gz={el.gz} w={el.w} d={el.d} h={el.h} baseColor={isFloor ? el.color : matchColor} lit={lit} pulse={lit && !!activeLayer && el.layers.includes(activeLayer)} />
            {el.label && lit && !isFloor && (
              <text x={isoTx(el.gx+el.w/2, el.gy+el.d/2)} y={isoTy(el.gx+el.w/2, el.gy+el.d/2, el.gz+el.h) - 5}
                textAnchor="middle" fill={activeLayer && el.layers.includes(activeLayer) ? '#fff' : 'rgba(180,200,230,0.45)'} fontSize="7.5" fontWeight="700" letterSpacing="0.04em"
                className="transition-all duration-500" style={activeLayer && el.layers.includes(activeLayer) ? { textShadow: `0 0 8px ${matchColor}` } : {}}>
                {el.label}
              </text>
            )}
          </g>
        );
      })}
      {/* Scan beams from tall elements */}
      {elements.filter(e => e.h >= 2.5 && e.w <= 0.6).map((el, i) => {
        const lit = !activeLayer || el.layers.includes(activeLayer);
        const beamColor = activeLayer && el.layers.includes(activeLayer) ? (ALL_LAYERS_LIST.find(l=>l.id===activeLayer)?.color || el.color) : el.color;
        return lit ? (
          <line key={`sc${i}`} x1={isoTx(el.gx+el.w/2, el.gy+el.d/2)} y1={isoTy(el.gx+el.w/2, el.gy+el.d/2, el.gz+el.h)}
            x2={isoTx(el.gx+el.w/2, el.gy+el.d/2+2)} y2={isoTy(el.gx+el.w/2, el.gy+el.d/2+2, el.gz+0.3)}
            stroke={beamColor} strokeWidth="1.5" opacity={0.5}
            style={{ animation: 'scenePulse 2s ease-in-out infinite', animationDelay: `${i * 0.7}s` }} />
        ) : null;
      })}
    </svg>
  );
};

const LAYER_DETAILS = {
  compute: {
    id: 'compute', category: 'ACCELERATED COMPUTE', title: 'Cisco Compute', color: '#06b6d4',
    desc: 'Purpose-built AI servers powered by NVIDIA accelerated computing, delivering massive GPU density for training, fine-tuning, and real-time inference at enterprise scale.',
    products: [
      { name: 'Cisco UCS C885A M8', image: IMG_C885A, desc: 'Dense 8-GPU rack server built on the NVIDIA HGX platform delivering scalable accelerated compute for LLM training, fine-tuning, large model inferencing, and RAG. Supports NVIDIA HGX H100/H200 SXM and AMD MI300X/MI350X OAM GPUs.',
        specs: [{ label: 'GPU', value: '8\u00d7 HGX H100/H200 SXM or MI300X/MI350X OAM' }, { label: 'CPU', value: '2\u00d7 AMD EPYC 9575F 64-core 5 GHz' }, { label: 'MEMORY', value: '24\u00d7 128GB DDR5 6000 MT/s' }, { label: 'FORM', value: '8RU Rack Server' }, { label: 'STORAGE', value: 'Up to 16\u00d7 U.2 NVMe SSD' }, { label: 'NETWORK', value: '8\u00d7 CX-7 400G E/W + BlueField-3 N/S' }, { label: 'MGMT', value: 'Cisco Intersight' }] },
      { name: 'Cisco UCS C880A M8', desc: 'High-density air-cooled 10RU rack server integrating 8\u00d7 NVIDIA HGX B300 NVL8 GPUs with Intel Xeon 6th Gen processors. Purpose-built for real-time LLM inference, next-level training performance, and large-volume data processing across AI factories.',
        specs: [{ label: 'GPU', value: '8\u00d7 NVIDIA HGX B300 NVL8 SXM' }, { label: 'CPU', value: '2\u00d7 Intel Xeon 6th Gen 6776P' }, { label: 'MEMORY', value: '32\u00d7 128GB DDR5 RDIMM' }, { label: 'FORM', value: '10RU Rack Server' }, { label: 'E/W NETWORK', value: '8\u00d7 ConnectX-8 800G integrated' }, { label: 'N/S NETWORK', value: 'CX-7 / B3220 / B3240 options' }, { label: 'STORAGE', value: 'Up to 8\u00d7 E1.S NVMe SSD' }] },
      { name: 'Cisco UCS C845A M8', desc: 'Scalable 2-to-8 GPU rack server built on NVIDIA MGX modular reference design. Adaptable configuration addresses GenAI fine-tuning, RAG, inference, HPC, data analytics, design simulation, and VDI workloads. Includes NVIDIA AI Enterprise 5-year license with H100/H200 NVL configs.',
        specs: [{ label: 'GPU', value: '2/4/6/8\u00d7 RTX PRO 6000, H200 NVL, H100 NVL, L40S, MI210' }, { label: 'CPU', value: '2\u00d7 5th Gen AMD EPYC' }, { label: 'FORM', value: '4RU Rack Server' }, { label: 'PLATFORM', value: 'NVIDIA MGX Reference Design' }, { label: 'STORAGE', value: 'Up to 20\u00d7 E1.S NVMe SSD' }, { label: 'NETWORK', value: '4\u00d7 400G CX-7 or BlueField-3 DPU' }, { label: 'MGMT', value: 'Cisco Intersight' }] },
      { name: 'Cisco AI PODs', desc: 'Pre-validated, CVD-based full AI lifecycle infrastructure combining Cisco UCS servers, Nexus networking, Intersight management, NVIDIA AI Enterprise, and RedHat OpenShift. Covers training, fine-tuning, and inferencing with independent scalability at each infrastructure layer. Reduces setup time up to 50% and accelerates training up to 30%.',
        specs: [{ label: 'LIFECYCLE', value: 'Training + Optimization + Inference' }, { label: 'COMPUTE', value: 'UCS C845A, C885A M8, X-Series' }, { label: 'NETWORK', value: 'Nexus 9000 Switches' }, { label: 'SOFTWARE', value: 'NVIDIA AI Enterprise + RedHat OpenShift' }, { label: 'MGMT', value: 'Cisco Intersight SaaS' }, { label: 'STORAGE', value: 'NetApp, Pure Storage, VAST Data' }, { label: 'SECURITY', value: 'AI Defense + Hypershield' }] },
      { name: 'NVIDIA BlueField-3 DPU', desc: 'Data Processing Unit that offloads networking, storage, and security from the CPU, enabling zero-trust at every AI node with hardware-accelerated encryption.',
        specs: [{ label: 'THROUGHPUT', value: '400 Gb/s' }, { label: 'CORES', value: '16\u00d7 Arm A78' }, { label: 'CRYPTO', value: 'Line-rate encryption' }, { label: 'FUNCTION', value: 'Network offload' }] },
      { name: 'Cisco Intersight', desc: 'Cloud-delivered AI infrastructure management platform providing unified lifecycle operations, policy-based automation, and firmware compliance across all UCS servers.',
        specs: [{ label: 'MODEL', value: 'SaaS / Connected' }, { label: 'SCOPE', value: 'Full UCS fleet' }, { label: 'FEATURE', value: 'Policy automation' }, { label: 'SECURITY', value: 'Firmware compliance' }] },
    ]
  },
  software: {
    id: 'software', category: 'AI SOFTWARE PLATFORM', title: 'NVIDIA AI Software', color: '#22c55e',
    desc: 'Enterprise AI software suite for building, customizing, and deploying AI models and agents at scale with optimized inference and lifecycle management.',
    products: [
      { name: 'NVIDIA AI Enterprise', desc: 'End-to-end software platform for production AI including NIM, NeMo, and RAPIDS, with enterprise support, security patches, and certified deployment on Cisco infrastructure.',
        specs: [{ label: 'INCLUDES', value: 'NIM + NeMo + RAPIDS' }, { label: 'SUPPORT', value: 'Enterprise 24/7' }, { label: 'CERTIFIED', value: 'Cisco AI PODs' }, { label: 'LICENSE', value: 'Per-GPU annual' }] },
      { name: 'NVIDIA NeMo', desc: 'Framework for building, customizing, and evaluating AI agents across their full lifecycle \u2014 from data curation and model training to guardrails and deployment.',
        specs: [{ label: 'FUNCTION', value: 'Agent lifecycle' }, { label: 'FEATURES', value: 'Data curation + eval' }, { label: 'GUARDRAILS', value: 'Built-in safety' }, { label: 'MODELS', value: 'LLM & multimodal' }] },
      { name: 'NVIDIA NIM', desc: 'Pre-optimized inference microservices delivering up to 2.6\u00d7 throughput gains. Deploy foundation models in under 5 minutes with a single API call.',
        specs: [{ label: 'SPEEDUP', value: '2.6\u00d7 throughput' }, { label: 'DEPLOY', value: '< 5 minutes' }, { label: 'INTERFACE', value: 'Single API call' }, { label: 'MODELS', value: '100+ optimized' }] },
      { name: 'NVIDIA Guardrails', desc: 'Programmable safety toolkit for controlling LLM output \u2014 enforcing topic boundaries, content filtering, and factual grounding at inference time.',
        specs: [{ label: 'FUNCTION', value: 'Output control' }, { label: 'FEATURES', value: 'Topic + content filter' }, { label: 'GROUNDING', value: 'Factual checks' }, { label: 'LATENCY', value: 'Real-time' }] },
      { name: 'Run:ai GPU Orchestration', desc: 'Dynamic GPU scheduling and resource pooling across clusters, maximizing utilization with fair allocation, quotas, and priority-based workload management.',
        specs: [{ label: 'FUNCTION', value: 'GPU scheduling' }, { label: 'FEATURE', value: 'Dynamic pooling' }, { label: 'POLICY', value: 'Quotas & priorities' }, { label: 'UTIL', value: 'Near 100% GPU' }] },
      { name: 'NVIDIA AI Blueprints', desc: 'Reference workflows for common enterprise AI use cases \u2014 from PDF extraction and RAG to digital humans and video analytics \u2014 with validated architectures.',
        specs: [{ label: 'TYPE', value: 'Reference workflows' }, { label: 'USE CASES', value: 'RAG, video, agents' }, { label: 'STACK', value: 'End-to-end' }, { label: 'STATUS', value: 'Production-ready' }] },
    ]
  },
  k8s: {
    id: 'k8s', category: 'CLOUD-NATIVE ORCHESTRATION', title: 'Hybrid Kubernetes', color: '#3b82f6',
    desc: 'Enterprise-grade Kubernetes platforms for orchestrating AI workloads at scale, with GPU-aware scheduling and cloud-native lifecycle management.',
    products: [
      { name: 'Red Hat OpenShift', desc: 'Enterprise Kubernetes platform validated for NIM deployment, providing robust container orchestration, CI/CD pipelines, and multi-cluster management.',
        specs: [{ label: 'TYPE', value: 'Enterprise K8s' }, { label: 'VALIDATED', value: 'NIM certified' }, { label: 'FEATURES', value: 'CI/CD + GitOps' }, { label: 'MGMT', value: 'Multi-cluster' }] },
      { name: 'Nutanix Kubernetes Platform', desc: 'Newly validated Kubernetes platform for AI PODs, enabling hybrid cloud orchestration with integrated compute, storage, and virtualization.',
        specs: [{ label: 'TYPE', value: 'Hybrid cloud K8s' }, { label: 'VALIDATED', value: 'AI PODs certified' }, { label: 'STORAGE', value: 'HCI integrated' }, { label: 'OPS', value: 'One-click deploy' }] },
      { name: 'Run:ai Workload Scheduling', desc: 'Dynamic GPU scheduling and resource pooling across clusters, maximizing utilization and ensuring fair allocation for concurrent AI workloads.',
        specs: [{ label: 'FUNCTION', value: 'GPU scheduling' }, { label: 'SHARING', value: 'Fractions + MIG' }, { label: 'PRIORITY', value: 'Fair-share queues' }, { label: 'SCALE', value: 'Multi-cluster' }] },
      { name: 'Cisco Isovalent', desc: 'eBPF-powered Kubernetes networking validated for inference workloads on AI PODs, delivering advanced observability, security, and load balancing.',
        specs: [{ label: 'ENGINE', value: 'eBPF kernel-level' }, { label: 'SECURITY', value: 'Network policy' }, { label: 'OBSERVE', value: 'Deep flow visibility' }, { label: 'LB', value: 'Native K8s LB' }] },
      { name: 'NVIDIA GPU Operator', desc: 'Automates GPU driver, device plugin, and monitoring deployment on Kubernetes, simplifying GPU lifecycle management across AI clusters.',
        specs: [{ label: 'FUNCTION', value: 'GPU lifecycle' }, { label: 'AUTO', value: 'Driver + plugin' }, { label: 'MONITOR', value: 'DCGM exporter' }, { label: 'COMPAT', value: 'All K8s distros' }] },
      { name: 'Slurm Integration', desc: 'Support for traditional HPC workload management alongside Kubernetes, enabling flexible scheduling for mixed AI training and batch environments.',
        specs: [{ label: 'TYPE', value: 'HPC scheduler' }, { label: 'COMPAT', value: 'K8s + bare metal' }, { label: 'JOBS', value: 'Batch + training' }, { label: 'SCALE', value: '10,000+ nodes' }] },
    ]
  },
  networking: {
    id: 'networking', category: 'NEURAL FABRIC', title: 'Cisco Networking', color: '#a855f7',
    desc: 'High-speed, lossless Ethernet fabric with Cisco Silicon One or NVIDIA Spectrum-X silicon, delivering 800G connectivity for AI backend and frontend networks.',
    products: [
      { name: 'Nexus 9364E-SG2', desc: 'High-density 2RU switch with 64\u00d7 800G ports on Cisco Silicon One G200 ASIC. Supports 51.2 Tbps bandwidth with 256MB shared packet buffer for AI clusters.',
        specs: [{ label: 'PORTS', value: '64\u00d7 800G' }, { label: 'BANDWIDTH', value: '51.2 Tbps' }, { label: 'BUFFER', value: '256 MB on-die' }, { label: 'SILICON', value: 'Cisco Silicon One' }] },
      { name: 'Cisco N9100 Series', desc: 'First NVIDIA partner switch on Spectrum-X silicon with 51.2 Tbps bandwidth. Runs NX-OS or SONiC for neocloud and sovereign AI cloud deployments.',
        specs: [{ label: 'SILICON', value: 'NVIDIA Spectrum-X' }, { label: 'BANDWIDTH', value: '51.2 Tbps' }, { label: 'OS', value: 'NX-OS or SONiC' }, { label: 'ROUTING', value: 'Adaptive AI-aware' }] },
      { name: 'Cisco Silicon One', desc: 'Converged network silicon providing unmatched programmability, efficiency, and 800G performance across both AI backend and frontend data center fabrics.',
        specs: [{ label: 'SPEED', value: '800G per port' }, { label: 'PROCESS', value: '5 nm' }, { label: 'FEATURE', value: 'Programmable' }, { label: 'USE', value: 'Spine + Leaf' }] },
      { name: 'Nexus Hyperfabric AI', desc: 'Cloud-managed full-stack AI cluster solution that reduces deployment from months to weeks with automated design, cabling plans, and guided installation.',
        specs: [{ label: 'DEPLOY', value: 'Weeks vs months' }, { label: 'MGMT', value: 'Cloud-managed' }, { label: 'AUTO', value: 'Design + cabling' }, { label: 'SCALE', value: 'Full AI cluster' }] },
      { name: 'Nexus Dashboard', desc: 'Centralized management for on-prem networks providing unified operations, automation, and visibility across Silicon One, Cloud-scale, and Spectrum-X switches.',
        specs: [{ label: 'FUNCTION', value: 'Network operations' }, { label: 'VISIBILITY', value: 'Topology + flow' }, { label: 'AUTO', value: 'Policy-driven' }, { label: 'SCOPE', value: 'All DC fabrics' }] },
      { name: '800G Optics', desc: 'Cisco-qualified optical transceivers enabling 800 Gbps links across AI backend and frontend fabrics with industry-leading reach and density.',
        specs: [{ label: 'SPEED', value: '800 Gbps' }, { label: 'FORM', value: 'OSFP + QSFP-DD' }, { label: 'REACH', value: 'Up to 10 km' }, { label: 'QUALIFIED', value: 'Cisco certified' }] },
    ]
  },
  storage: {
    id: 'storage', category: 'AI DATA INFRASTRUCTURE', title: 'Partner Storage', color: '#94a3b8',
    desc: 'High-performance, NVIDIA-certified storage solutions integrated into Cisco AI PODs for training datasets, model checkpoints, and RAG acceleration.',
    products: [
      { name: 'VAST Data InsightEngine', desc: 'First AI POD storage integration, delivering an NVIDIA AI Data Platform reference design for RAG acceleration and enterprise-scale unstructured data extraction.',
        specs: [{ label: 'INTEGRATION', value: 'First AI POD partner' }, { label: 'USE CASE', value: 'RAG acceleration' }, { label: 'PROTOCOL', value: 'NFS + S3 + GPUDirect' }, { label: 'SCALE', value: 'Exabyte-class' }] },
      { name: 'Pure Storage', desc: 'All-flash storage solutions certified for AI workloads, providing low-latency data access for GPU-dense training clusters and checkpoint management.',
        specs: [{ label: 'TYPE', value: 'All-flash array' }, { label: 'LATENCY', value: 'Sub-millisecond' }, { label: 'FEATURE', value: 'FlashBlade//S' }, { label: 'CERTIFIED', value: 'NVIDIA DGX-ready' }] },
      { name: 'NetApp', desc: 'Enterprise data management with AI-optimized storage solutions, supporting model versioning, data pipelines, and hybrid cloud AI workflows.',
        specs: [{ label: 'PLATFORM', value: 'ONTAP AI' }, { label: 'FEATURE', value: 'Model versioning' }, { label: 'HYBRID', value: 'Cloud tiering' }, { label: 'PROTOCOL', value: 'NFS + GPUDirect' }] },
      { name: 'Hitachi Vantara', desc: 'Certified high-performance storage platform delivering reliable, scalable data infrastructure for demanding enterprise AI training workloads.',
        specs: [{ label: 'TYPE', value: 'Enterprise storage' }, { label: 'CERTIFIED', value: 'NVIDIA-ready' }, { label: 'RELIABILITY', value: '99.9999% uptime' }, { label: 'SCALE', value: 'Petabyte-class' }] },
      { name: 'Nutanix Unified Storage', desc: 'Hyperconverged storage bringing unified file, block, and object storage to AI infrastructure deployments with one-click simplicity.',
        specs: [{ label: 'TYPE', value: 'HCI unified' }, { label: 'PROTOCOLS', value: 'File + Block + Obj' }, { label: 'OPS', value: 'One-click mgmt' }, { label: 'VALIDATED', value: 'AI POD certified' }] },
      { name: 'NVIDIA AI Data Platform', desc: 'Reference design for optimizing data pipelines to GPUs, ensuring storage I/O keeps pace with the throughput demands of modern AI training clusters.',
        specs: [{ label: 'FUNCTION', value: 'Pipeline optimizer' }, { label: 'FEATURE', value: 'GPUDirect Storage' }, { label: 'TARGET', value: 'Training I/O' }, { label: 'TYPE', value: 'Reference design' }] },
    ]
  },
  security: {
    id: 'security', category: 'FULL-STACK PROTECTION', title: 'Cisco Security', color: '#f59e0b',
    desc: 'Security embedded at every layer of the AI stack \u2014 protecting AI models, applications, workloads, and infrastructure with unified policy enforcement.',
    products: [
      { name: 'Cisco AI Defense', desc: 'Algorithmic red-teaming and runtime guardrails for AI models. Evaluates safety and security risks, enforces compliance with MITRE ATLAS and OPSWAT frameworks.',
        specs: [{ label: 'FUNCTION', value: 'AI model security' }, { label: 'METHOD', value: 'Algorithmic red-team' }, { label: 'COMPLIANCE', value: 'MITRE ATLAS' }, { label: 'RUNTIME', value: 'Guardrails active' }] },
      { name: 'Hybrid Mesh Firewall', desc: 'Unified security management with consistent policy across firewalls, network switches, and workload agents \u2014 deep packet inspection to infrastructure-wide coverage.',
        specs: [{ label: 'SCOPE', value: 'Network-wide' }, { label: 'POLICY', value: 'Unified across FW' }, { label: 'DPI', value: 'Deep inspection' }, { label: 'DEPLOY', value: 'FW + switch + agent' }] },
      { name: 'Cisco Hypershield', desc: 'Distributed zero-trust enforcement at every AI node via BlueField-3 DPU integration, preventing lateral movement and autonomous vulnerability response.',
        specs: [{ label: 'MODEL', value: 'Zero-trust per node' }, { label: 'ENGINE', value: 'BlueField-3 DPU' }, { label: 'RESPONSE', value: 'Autonomous patch' }, { label: 'COVERAGE', value: 'Every AI node' }] },
      { name: 'Cisco Isovalent', desc: 'eBPF-based cloud-native security providing enhanced visibility into Kubernetes interactions with consistent policy definition and enforcement.',
        specs: [{ label: 'ENGINE', value: 'eBPF kernel-level' }, { label: 'VISIBILITY', value: 'K8s flow-level' }, { label: 'POLICY', value: 'Network + identity' }, { label: 'OVERHEAD', value: 'Near-zero' }] },
      { name: 'Cisco Secure Workload', desc: 'AI/ML-powered microsegmentation that analyzes workload metadata to generate intelligent policies reducing the attack surface across AI infrastructure.',
        specs: [{ label: 'FUNCTION', value: 'Microsegmentation' }, { label: 'METHOD', value: 'ML-driven policy' }, { label: 'SCOPE', value: 'All workloads' }, { label: 'RESULT', value: 'Reduced attack surface' }] },
      { name: 'Splunk Enterprise Security', desc: 'Threat detection, investigation, and response platform correlating security events from AI Defense, Hypershield, and Isovalent across the full AI stack.',
        specs: [{ label: 'FUNCTION', value: 'TDIR platform' }, { label: 'SOURCES', value: 'Full stack correl.' }, { label: 'RESPONSE', value: 'Automated playbooks' }, { label: 'COVERAGE', value: 'AI + infrastructure' }] },
    ]
  },
  observability: {
    id: 'observability', category: 'END-TO-END VISIBILITY', title: 'Cisco Observability', color: '#f97316',
    desc: 'Complete visibility into the health, performance, security, and cost of every AI infrastructure component \u2014 from GPU utilization to model inference quality.',
    products: [
      { name: 'Splunk Observability Cloud', desc: 'Real-time monitoring of AI application stack performance, quality, and cost \u2014 including infrastructure health dashboards for Cisco AI PODs.',
        specs: [{ label: 'FUNCTION', value: 'Real-time monitoring' }, { label: 'METRICS', value: 'Perf + quality + cost' }, { label: 'DASHBOARDS', value: 'AI POD specific' }, { label: 'ALERTS', value: 'ML-driven' }] },
      { name: 'Splunk Enterprise Security', desc: 'Threat detection, investigation, and response platform extending observability to security use cases across hybrid AI environments.',
        specs: [{ label: 'FUNCTION', value: 'Security observability' }, { label: 'METHOD', value: 'TDIR + correlation' }, { label: 'SCOPE', value: 'Hybrid AI envs' }, { label: 'RESPONSE', value: 'Automated SOAR' }] },
      { name: 'Splunk AI POD Dashboards', desc: 'Purpose-built dashboards delivering end-to-end visibility across every layer of the AI stack, enabling teams to detect and resolve issues in seconds.',
        specs: [{ label: 'TYPE', value: 'Purpose-built' }, { label: 'SCOPE', value: 'All stack layers' }, { label: 'RESOLUTION', value: 'Seconds to detect' }, { label: 'VIEW', value: 'End-to-end' }] },
      { name: 'ThousandEyes', desc: 'Internet and network intelligence platform providing visibility into connectivity performance between distributed AI infrastructure components.',
        specs: [{ label: 'FUNCTION', value: 'Network intelligence' }, { label: 'SCOPE', value: 'Internet + WAN' }, { label: 'FEATURE', value: 'Path visualization' }, { label: 'INSIGHT', value: 'Hop-by-hop' }] },
      { name: 'Nexus Dashboard', desc: 'Unified network operations platform for Cisco Nexus data center fabrics, delivering topology visualization, analytics, and automated troubleshooting.',
        specs: [{ label: 'FUNCTION', value: 'DC fabric ops' }, { label: 'ANALYTICS', value: 'Flow + topology' }, { label: 'AUTO', value: 'Troubleshooting' }, { label: 'SCOPE', value: 'All Nexus fabrics' }] },
      { name: 'Cisco Intersight Monitoring', desc: 'AI infrastructure lifecycle monitoring across all UCS servers, tracking hardware health, firmware compliance, and capacity utilization from a single pane.',
        specs: [{ label: 'FUNCTION', value: 'Infra lifecycle' }, { label: 'SCOPE', value: 'All UCS servers' }, { label: 'TRACKING', value: 'Health + firmware' }, { label: 'VIEW', value: 'Single pane' }] },
    ]
  },
};

const SIDEBAR_NAV = [
  { id: 'compute', label: 'Cisco Compute' },
  { id: 'software', label: 'NVIDIA AI Software' },
  { id: 'k8s', label: 'Hybrid Kubernetes' },
  { id: 'networking', label: 'Cisco Networking' },
  { id: 'storage', label: 'Partner Storage' },
  { id: 'security', label: 'Security' },
  { id: 'observability', label: 'Observability' },
];

const IDLE_TIMEOUT = 15000;
const CYCLE_INTERVAL = 4000;

/* ═══ PARTICLES ═══ */
const ParticleField = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); let id;
    const ps = [];
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 55; i++) ps.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .15, vy: (Math.random() - .5) * .15, r: Math.random() * 2 + .8, a: Math.random() * .2 + .04 });
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0; if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(59,130,246,${p.a})`; ctx.fill(); });
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) { const d = Math.hypot(ps[i].x - ps[j].x, ps[i].y - ps[j].y); if (d < 160) { ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.strokeStyle = `rgba(59,130,246,${.035 * (1 - d / 160)})`; ctx.lineWidth = .7; ctx.stroke(); } }
      id = requestAnimationFrame(draw);
    }; draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
};

/* ═══ USE CASE NODE ═══ */
const UseCaseNode = ({ item, isSelected, onClick, dimmed, onHoverChange }) => {
  const isLeft = item.side === 'left';
  const Icon = item.icon;
  const [hovered, setHovered] = useState(false);
  const bright = isSelected || hovered;
  const dim = dimmed && !bright;
  return (
    <button className="group flex items-center transition-all duration-500 outline-none active:scale-95"
      style={{ flexDirection: isLeft ? 'row-reverse' : 'row', gap: 24, opacity: dim ? 0.25 : 1, filter: dim ? 'saturate(0.3)' : 'none' }}
      onClick={onClick}
      onPointerEnter={() => { setHovered(true); onHoverChange?.(true); }}
      onPointerLeave={() => { setHovered(false); onHoverChange?.(false); }}>
      <div className="relative flex-shrink-0">
        {isSelected && <div className="absolute rounded-full opacity-20" style={{ inset: -12, border: `3px solid ${item.color}`, animation: 'pulseRing 2s ease-in-out infinite' }} />}
        <div className="rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            width: 120, height: 120,
            backgroundColor: bright ? `${item.color}22` : `${item.color}10`,
            border: `3px solid ${bright ? item.color : item.color + '70'}`,
            boxShadow: bright ? `0 0 35px ${item.color}40, inset 0 0 15px ${item.color}12` : `0 0 15px ${item.color}15, inset 0 0 8px ${item.color}05`,
            transform: bright ? 'scale(1.08)' : 'scale(1)',
          }}>
          <Icon className="transition-all duration-500" style={{ width: 52, height: 52, color: bright ? item.color : item.color + 'cc' }} />
        </div>
      </div>
      <div style={{ textAlign: isLeft ? 'right' : 'left', maxWidth: 220 }}>
        <div className="font-black tracking-wider uppercase leading-tight transition-colors duration-500" style={{ fontSize: 18, color: bright ? item.color : item.color + 'aa' }}>{item.title}</div>
      </div>
    </button>
  );
};

/* ═══ STACK LAYER ═══ */
const StackLayer = ({ layer, isActive, onHover, isHovered, onClick, dimmed }) => {
  const bright = isActive || isHovered;
  const dim = dimmed && !bright;
  const c = layer.color;
  return (
    <div className="flex-1 relative flex items-center transition-all duration-500 cursor-pointer active:scale-[0.98]"
      onPointerEnter={() => onHover?.(true)}
      onPointerLeave={() => onHover?.(false)}
      onClick={onClick}
      style={{
        padding: '0 28px',
        borderRadius: 14,
        gap: 14,
        border: bright ? `2px solid ${c}70` : '1.5px solid rgba(80,130,220,0.3)',
        backgroundColor: bright ? `${c}18` : 'rgba(20,40,80,0.35)',
        boxShadow: bright
          ? `0 0 25px ${c}28, inset 0 0 15px ${c}0c`
          : '0 0 8px rgba(0,0,0,0.15)',
        transform: bright ? 'scale(1.015)' : 'scale(1)',
        opacity: dim ? 0.2 : 1,
        filter: dim ? 'saturate(0.2) brightness(0.5)' : 'none',
      }}>
      {/* Solid server icon */}
      <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="flex-shrink-0 transition-all duration-500" style={{ opacity: bright ? 1 : 0.45 }}>
        <rect x="0.5" y="0.5" width="17" height="27" rx="3" fill={bright ? `${c}30` : 'rgba(40,60,100,0.5)'} stroke={bright ? `${c}66` : 'rgba(140,180,255,0.45)'} strokeWidth="1" />
        <rect x="4" y="5" width="10" height="2.5" rx="1" fill={bright ? `${c}aa` : 'rgba(140,180,255,0.35)'} />
        <rect x="4" y="10.5" width="10" height="2.5" rx="1" fill={bright ? `${c}aa` : 'rgba(140,180,255,0.35)'} />
        <rect x="4" y="16" width="10" height="2.5" rx="1" fill={bright ? `${c}aa` : 'rgba(140,180,255,0.35)'} />
        <rect x="4" y="21.5" width="10" height="2.5" rx="1" fill={bright ? `${c}aa` : 'rgba(140,180,255,0.35)'} />
      </svg>
      <span className="font-semibold transition-all duration-500" style={{
        fontSize: 19,
        letterSpacing: '0.02em',
        color: bright ? '#f0f4f8' : 'rgba(180,200,230,0.85)',
        textShadow: bright ? `0 0 15px ${c}40` : 'none',
      }}>{layer.title}</span>
    </div>
  );
};

/* ═══ HOME SCREEN ═══ */
const HomeScreen = ({ onNavigate }) => (
  <div className="flex-1 flex flex-col items-center justify-center" style={{ gap: 48, padding: 48, background: 'radial-gradient(ellipse at 50% 40%, #0a1128 0%, #020617 70%)' }}>
    <div className="text-center">
      <h1 className="font-black text-white tracking-tight" style={{ fontSize: 72, textShadow: '0 4px 60px rgba(34,211,238,0.12)' }}>Cisco Secure AI Factory</h1>
      <p className="font-bold uppercase" style={{ fontSize: 20, letterSpacing: '0.2em', color: 'rgba(34,211,238,0.45)', marginTop: 12 }}>with NVIDIA</p>
    </div>
    <div className="grid grid-cols-2 w-full" style={{ gap: 24, maxWidth: 800 }}>
      <button onClick={() => onNavigate('use-cases')}
        className="group rounded-3xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left"
        style={{ padding: 40, borderColor: 'rgba(34,211,238,0.3)', backgroundColor: 'rgba(34,211,238,0.04)' }}>
        <Box style={{ width: 48, height: 48, color: '#22d3ee', marginBottom: 16 }} />
        <h3 className="font-black text-white" style={{ fontSize: 28 }}>AI Use Cases</h3>
        <p style={{ fontSize: 16, color: '#64748b', marginTop: 8, lineHeight: 1.5 }}>Explore industry solutions powered by the Secure AI Factory</p>
      </button>
      <button className="group rounded-3xl border-2 transition-all duration-300 text-left"
        style={{ padding: 40, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <Server style={{ width: 48, height: 48, color: '#475569', marginBottom: 16 }} />
        <h3 className="font-black" style={{ fontSize: 28, color: '#64748b' }}>Architecture</h3>
        <p style={{ fontSize: 16, color: '#334155', marginTop: 8, lineHeight: 1.5 }}>Deep dive into the full-stack infrastructure</p>
      </button>
    </div>
    <div className="flex items-center" style={{ gap: 10, marginTop: 24 }}>
      <Zap style={{ width: 20, height: 20, color: '#22c55e' }} />
      <span className="font-bold uppercase" style={{ fontSize: 16, letterSpacing: '0.15em', color: 'rgba(34,197,94,0.7)' }}>Live Demo</span>
    </div>
  </div>
);

/* ═══ PRODUCT DETAIL MODAL ═══ */
const ProductDetailModal = ({ product, color, onClose }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => { setOpen(false); setTimeout(onClose, 250); };
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center ${open ? 'modal-bg-in' : 'modal-bg-out'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(24px)', padding: 48 }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className={`rounded-3xl w-full overflow-hidden border ${open ? 'modal-in' : 'modal-out'}`}
        style={{ maxWidth: 960, borderColor: `${color}25`, backgroundColor: '#0c1425' }}>
        <div className="flex" style={{ minHeight: 480 }}>
          {/* Left: Product Visual */}
          <div className="flex items-center justify-center" style={{ width: '42%', padding: 40, background: `linear-gradient(135deg, ${color}06, ${color}02)` }}>
            {product.image ? (
              <img src={product.image} alt={product.name} className="rounded-2xl w-full" style={{
                maxHeight: 380, objectFit: 'contain',
                filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.5))',
              }} />
            ) : (
              <div className="rounded-2xl flex items-center justify-center w-full" style={{
                aspectRatio: '4/3', backgroundColor: `${color}08`, border: `1.5px solid ${color}18`,
                boxShadow: `0 0 40px ${color}10, inset 0 0 30px ${color}05`,
              }}>
                <span className="font-bold text-center leading-snug" style={{ fontSize: 28, color: `${color}90`, padding: 32 }}>{product.name}</span>
              </div>
            )}
          </div>
          {/* Right: Details */}
          <div className="flex-1 flex flex-col" style={{ padding: '40px 44px' }}>
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="font-black uppercase" style={{ fontSize: 13, letterSpacing: '0.2em', color }}>PRODUCT INSIGHT</span>
                <h2 className="font-black text-white" style={{ fontSize: 40, lineHeight: 1.15, marginTop: 8, letterSpacing: '-0.01em' }}>{product.name}</h2>
              </div>
              <button onClick={handleClose} className="rounded-full flex items-center justify-center transition-colors hover:bg-white/10 active:scale-90"
                style={{ width: 44, height: 44, border: '1.5px solid rgba(255,255,255,0.12)', flexShrink: 0, marginLeft: 16 }}>
                <X style={{ width: 20, height: 20, color: '#94a3b8' }} />
              </button>
            </div>
            {/* Description */}
            <p className="text-slate-400 leading-relaxed" style={{ fontSize: 17, marginTop: 16 }}>{product.desc}</p>
            {/* Specs */}
            {product.specs && (
              <div style={{ marginTop: 28 }}>
                <span className="font-black uppercase" style={{ fontSize: 12, letterSpacing: '0.18em', color: '#475569' }}>TECHNICAL SPECIFICATIONS</span>
                <div className="flex flex-col" style={{ gap: 10, marginTop: 14 }}>
                  {product.specs.map((spec, i) => (
                    <div key={i} className="rounded-xl" style={{
                      padding: '14px 20px', border: '1.5px solid rgba(255,255,255,0.06)',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                    }}>
                      <span className="font-black uppercase" style={{ fontSize: 11, letterSpacing: '0.15em', color }}>{spec.label}</span>
                      <p className="font-bold text-white" style={{ fontSize: 17, marginTop: 2 }}>{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Buttons */}
            <div className="flex items-center mt-auto" style={{ gap: 12, paddingTop: 28 }}>
              <button onClick={handleClose}
                className="rounded-full font-bold uppercase transition-all hover:brightness-110 active:scale-95"
                style={{ padding: '14px 32px', fontSize: 13, letterSpacing: '0.12em', color: '#e2e8f0', backgroundColor: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ LAYER DETAIL SCREEN ═══ */
const LayerDetailScreen = ({ layerId }) => {
  const layer = LAYER_DETAILS[layerId];
  if (!layer) return null;
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto" style={{ background: 'radial-gradient(ellipse at 30% 15%, #0a1128 0%, #020617 70%)' }}>
      <div style={{ padding: '60px 80px 48px' }}>
        {/* Colored accent bar */}
        <div style={{ width: 56, height: 4, backgroundColor: layer.color, borderRadius: 2, marginBottom: 20 }} />
        {/* Category label */}
        <span className="font-black uppercase" style={{ fontSize: 16, letterSpacing: '0.25em', color: layer.color }}>{layer.category}</span>
        {/* Big italic title */}
        <h1 className="text-white" style={{ fontSize: 88, fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1.0, marginTop: 12 }}>{layer.title}</h1>
        {/* Description */}
        <p className="leading-relaxed" style={{ fontSize: 24, marginTop: 24, maxWidth: 820, color: '#7a8ba8', lineHeight: 1.55 }}>{layer.desc}</p>

        {/* Product Cards - 3 column grid */}
        <div className="grid grid-cols-3" style={{ gap: 16, marginTop: 56 }}>
          {layer.products.map((product, i) => {
            const isHover = hoveredProduct === i;
            return (
              <button key={i} onClick={() => setDetailProduct(product)}
                onPointerEnter={() => setHoveredProduct(i)}
                onPointerLeave={() => setHoveredProduct(null)}
                className="text-left rounded-2xl border-2 transition-all duration-300 active:scale-[0.98] flex items-center"
                style={{
                  padding: '16px 20px 16px 16px',
                  backgroundColor: isHover ? `${layer.color}0c` : '#0a1228',
                  borderColor: isHover ? `${layer.color}40` : '#0f1b35',
                  boxShadow: isHover ? `0 0 30px ${layer.color}12` : 'none',
                }}>
                {/* Colored left bar */}
                <div style={{ width: 5, height: 36, backgroundColor: layer.color, flexShrink: 0, borderRadius: 3, marginRight: 18 }} />
                {/* Product name */}
                <h3 className="font-semibold text-white transition-all duration-300" style={{ fontSize: 24, lineHeight: 1.2 }}>{product.name}</h3>
              </button>
            );
          })}
        </div>
      </div>
      {/* Product Detail Modal */}
      {detailProduct && <ProductDetailModal product={detailProduct} color={layer.color} onClose={() => setDetailProduct(null)} />}
    </div>
  );
};

/* ═══ USE CASES SCREEN ═══ */
const UseCasesScreen = ({ onNavigate }) => {
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [attractIdx, setAttractIdx] = useState(0);
  const [isIdle, setIsIdle] = useState(true);
  const [activeStack, setActiveStack] = useState([]);
  const [wrapperOn, setWrapperOn] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [hoveredWrapper, setHoveredWrapper] = useState(null);
  const [hoveredUseCase, setHoveredUseCase] = useState(null);
  const [activeModalLayer, setActiveModalLayer] = useState(null);
  const anyFocused = hoveredLayer !== null || hoveredWrapper !== null || hoveredUseCase !== null;
  const idleT = useRef(null); const cycleT = useRef(null);

  const resetIdle = useCallback(() => {
    setIsIdle(false); clearTimeout(idleT.current); clearInterval(cycleT.current);
    idleT.current = setTimeout(() => { setIsIdle(true); setSelectedUseCase(null); }, IDLE_TIMEOUT);
  }, []);

  useEffect(() => { if (isIdle && !modalOpen) { cycleT.current = setInterval(() => setAttractIdx(p => (p + 1) % USE_CASES.length), CYCLE_INTERVAL); return () => clearInterval(cycleT.current); } }, [isIdle, modalOpen]);

  useEffect(() => {
    const timers = [];
    const a = modalOpen ? selectedUseCase : (isIdle ? USE_CASES[attractIdx] : null);
    if (a) { setActiveStack([]); setWrapperOn(false); STACK_LAYERS.forEach((_, i) => timers.push(setTimeout(() => setActiveStack(p => [...p, i]), i * 100))); timers.push(setTimeout(() => setWrapperOn(true), STACK_LAYERS.length * 100 + 80)); }
    else { setActiveStack([]); setWrapperOn(false); }
    return () => timers.forEach(t => clearTimeout(t));
  }, [selectedUseCase, attractIdx, isIdle, modalOpen]);

  useEffect(() => { const e = ['pointerdown', 'pointermove', 'keydown']; e.forEach(v => window.addEventListener(v, resetIdle)); idleT.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT); return () => { e.forEach(v => window.removeEventListener(v, resetIdle)); clearTimeout(idleT.current); clearInterval(cycleT.current); }; }, [resetIdle]);
  useEffect(() => { const h = e => { if (e.key === 'Escape') closeModal(); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, []);

  const openModal = item => { resetIdle(); setSelectedUseCase(item); setActiveModalLayer(null); requestAnimationFrame(() => setModalOpen(true)); };
  const closeModal = () => { setModalOpen(false); setActiveModalLayer(null); setTimeout(() => setSelectedUseCase(null), 300); };
  const hl = isIdle ? USE_CASES[attractIdx] : null;

  return (
    <div className="flex-1 relative flex flex-col" style={{ background: 'radial-gradient(ellipse at 50% 40%, #0a1128 0%, #020617 70%)' }}>

      {/* Attract */}
      {isIdle && !modalOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 z-30 attract-pulse" style={{ bottom: 32 }}>
          <div className="rounded-2xl border border-cyan-500/30" style={{ padding: '16px 40px', backgroundColor: 'rgba(10,17,40,0.85)', backdropFilter: 'blur(12px)' }}>
            <p className="font-bold text-cyan-400 text-center" style={{ fontSize: 20 }}>Tap any use case to explore</p>
          </div>
        </div>
      )}

      {/* Layout */}
      <div className="flex-1 flex items-center justify-center" style={{ padding: '0 16px 8px' }}>
        <div className="relative w-full flex items-center justify-center" style={{ maxWidth: 1700, height: '94%' }}>

          {/* Header - absolutely centered above stack */}
          <div className="absolute left-1/2 -translate-x-1/2 z-20 text-center" style={{ top: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc((100% - 720px) / 2)', paddingBottom: 20 }}>
            <p className="font-bold uppercase" style={{ fontSize: 22, letterSpacing: '0.25em', color: 'rgba(220,230,255,0.9)', textShadow: '0 0 18px rgba(100,160,255,0.35)', marginBottom: 12 }}>Cisco Secure AI Factory</p>
            <h2 className="text-white" style={{ fontSize: 80, fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1.0 }}>AI Use Cases</h2>
          </div>
          {/* Left */}
          <div className="absolute flex flex-col justify-around z-20" style={{ left: 0, height: '96%' }}>
            {USE_CASES.filter(u => u.side === 'left').map(item => (
              <UseCaseNode key={item.id} item={item} isSelected={selectedUseCase?.id === item.id || hl?.id === item.id} onClick={() => openModal(item)}
                dimmed={anyFocused && hoveredUseCase !== item.id}
                onHoverChange={(on) => setHoveredUseCase(on ? item.id : null)} />
            ))}
          </div>

          {/* ═══ CENTRAL ASSEMBLY ═══ */}
          <div className="relative z-10" style={{ marginTop: 48 }}>
            <div className="flex items-stretch" style={{ height: 720 }}>

              {/* ── Observability (LEFT side) ── outside border */}
              {(() => { const bright = wrapperOn || hoveredWrapper === 'obs'; const dim = anyFocused && hoveredWrapper !== 'obs' && !bright; return (
              <div className="relative flex items-center justify-center transition-all duration-500 cursor-pointer"
                onPointerEnter={() => setHoveredWrapper('obs')}
                onPointerLeave={() => setHoveredWrapper(null)}
                onClick={() => onNavigate?.('layer-observability')}
                style={{ width: 48, marginRight: 8, opacity: dim ? 0.2 : 1, filter: dim ? 'saturate(0.2) brightness(0.5)' : 'none' }}>
                <div style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <span className="font-bold whitespace-nowrap transition-colors duration-500" style={{ fontSize: 22, letterSpacing: '0.06em', color: bright ? '#f97316' : 'rgba(160,190,255,0.6)' }}>AI</span>
                    <span className="font-bold whitespace-nowrap transition-colors duration-500" style={{ fontSize: 22, letterSpacing: '0.06em', color: bright ? '#f97316' : 'rgba(160,190,255,0.6)' }}>Observability</span>
                  </div>
                </div>
              </div>
              ); })()}

              {/* ── Outer border frame ── */}
              <div className="flex-1 rounded-3xl border-2 transition-all duration-700 outer-glow" style={{ borderColor: 'rgba(80,140,255,0.35)', padding: 10, minWidth: 420 }}>
                {/* Inner border frame */}
                <div className="rounded-2xl border-2 h-full flex flex-col" style={{ borderColor: 'rgba(80,140,255,0.25)', padding: '20px 20px 12px' }}>
                  <div className="flex-1 flex flex-col" style={{ gap: 14 }}>
                    {STACK_LAYERS.map((layer, idx) => (
                      <StackLayer key={layer.id} layer={layer}
                        isActive={activeStack.includes(idx)}
                        isHovered={hoveredLayer === idx}
                        onHover={(on) => setHoveredLayer(on ? idx : null)}
                        onClick={() => onNavigate?.(`layer-${layer.id}`)}
                        dimmed={anyFocused && hoveredLayer !== idx}
                      />
                    ))}
                  </div>
                  {/* Bottom label */}
                  <div className="text-center" style={{ paddingTop: 10, paddingBottom: 2 }}>
                    <span className="font-bold" style={{ fontSize: 17, letterSpacing: '0.06em', color: 'rgba(220,230,255,0.85)', textShadow: '0 0 15px rgba(100,160,255,0.3)' }}>Cisco Secure AI Factory</span>
                  </div>
                </div>
              </div>

              {/* ── Security (RIGHT side) ── outside border */}
              {(() => { const bright = wrapperOn || hoveredWrapper === 'sec'; const dim = anyFocused && hoveredWrapper !== 'sec' && !bright; return (
              <div className="relative flex items-center justify-center transition-all duration-500 cursor-pointer"
                onPointerEnter={() => setHoveredWrapper('sec')}
                onPointerLeave={() => setHoveredWrapper(null)}
                onClick={() => onNavigate?.('layer-security')}
                style={{ width: 48, marginLeft: 8, opacity: dim ? 0.2 : 1, filter: dim ? 'saturate(0.2) brightness(0.5)' : 'none' }}>
                <div style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <span className="font-bold whitespace-nowrap transition-colors duration-500" style={{ fontSize: 22, letterSpacing: '0.06em', color: bright ? '#f59e0b' : 'rgba(160,190,255,0.6)' }}>AI</span>
                    <span className="font-bold whitespace-nowrap transition-colors duration-500" style={{ fontSize: 22, letterSpacing: '0.06em', color: bright ? '#f59e0b' : 'rgba(160,190,255,0.6)' }}>Security</span>
                  </div>
                </div>
              </div>
              ); })()}

            </div>
          </div>

          {/* Right */}
          <div className="absolute flex flex-col justify-around z-20" style={{ right: 0, height: '96%' }}>
            {USE_CASES.filter(u => u.side === 'right').map(item => (
              <UseCaseNode key={item.id} item={item} isSelected={selectedUseCase?.id === item.id || hl?.id === item.id} onClick={() => openModal(item)}
                dimmed={anyFocused && hoveredUseCase !== item.id}
                onHoverChange={(on) => setHoveredUseCase(on ? item.id : null)} />
            ))}
          </div>

          {/* Spacer between nodes and stack handled by padding */}
        </div>
      </div>

      {/* ═══ MODAL ═══ */}
      {selectedUseCase && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center ${modalOpen ? 'modal-bg-in' : 'modal-bg-out'}`}
          style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(24px)', padding: 32 }}
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          {(() => {
            const activeLayer = activeModalLayer;
            const setActiveLayer = setActiveModalLayer;
            const uc = selectedUseCase;
            const insights = LAYER_INSIGHTS[uc.id] || {};
            const activeInfo = activeLayer ? ALL_LAYERS_LIST.find(l => l.id === activeLayer) : null;
            const activeProducts = activeLayer && LAYER_DETAILS[activeLayer] ? LAYER_DETAILS[activeLayer].products : [];
            return (
            <div className={`rounded-3xl w-full overflow-hidden border-2 ${modalOpen ? 'modal-in' : 'modal-out'}`}
              style={{ maxWidth: 1100, maxHeight: '94vh', backgroundColor: '#080e1e', borderColor: `${uc.color}20`, boxShadow: `0 0 100px ${uc.color}08` }}>

              {/* Header */}
              <div className="flex justify-between items-start" style={{ padding: '28px 36px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: `linear-gradient(135deg, ${uc.color}06 0%, transparent 50%)` }}>
                <div className="flex items-start" style={{ gap: 20 }}>
                  <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: 56, height: 56, backgroundColor: `${uc.color}15`, border: `1.5px solid ${uc.color}30` }}>
                    {React.createElement(uc.icon, { style: { width: 28, height: 28, color: uc.color } })}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <h3 className="font-black text-white" style={{ fontSize: 28, letterSpacing: '-0.01em' }}>{uc.title}</h3>
                    <p style={{ fontSize: 15, marginTop: 6, lineHeight: 1.55, maxWidth: 600, color: '#c8d4e3' }}>{uc.challenge}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="rounded-lg text-slate-500 hover:text-white transition-all active:scale-90 flex-shrink-0" style={{ padding: 10 }}>
                  <X style={{ width: 22, height: 22 }} />
                </button>
              </div>

              {/* Body: Left Stack + Right Detail */}
              <div className="flex" style={{ minHeight: 460, maxHeight: 'calc(94vh - 140px)' }}>

                {/* Left: Navigation */}
                <div className="flex flex-col border-r border-white/5 overflow-y-auto" style={{ width: 300, padding: '20px 16px', backgroundColor: 'rgba(4,8,18,0.4)' }}>

                  {/* Overview tab */}
                  <button
                    onClick={() => setActiveLayer(null)}
                    className="text-left rounded-xl transition-all duration-300 active:scale-[0.97]"
                    style={{
                      padding: '14px 16px', marginBottom: 6,
                      backgroundColor: !activeLayer ? `${uc.color}12` : 'transparent',
                      border: `1.5px solid ${!activeLayer ? uc.color + '35' : 'transparent'}`,
                    }}>
                    <div className="flex items-center" style={{ gap: 12 }}>
                      <div className="rounded-full flex-shrink-0 transition-all duration-300" style={{ width: 8, height: 8, backgroundColor: !activeLayer ? uc.color : `${uc.color}40`, boxShadow: !activeLayer ? `0 0 8px ${uc.color}50` : 'none' }} />
                      <span className="font-bold transition-all duration-300" style={{ fontSize: 15, color: !activeLayer ? '#f0f4f8' : '#94a3b8' }}>Overview</span>
                    </div>
                  </button>

                  {/* Divider */}
                  <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.05)', margin: '6px 8px 10px' }} />
                  <span className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: '0.18em', color: '#7a8ba0', marginBottom: 10, paddingLeft: 8 }}>Infrastructure Stack</span>

                  <div className="flex flex-col" style={{ gap: 4 }}>
                    {ALL_LAYERS_LIST.map((layer) => {
                      const isWrapper = layer.id === 'security' || layer.id === 'observability';
                      const isActive = activeLayer === layer.id;
                      return (
                        <button key={layer.id}
                          onClick={() => setActiveLayer(isActive ? null : layer.id)}
                          className="text-left rounded-xl transition-all duration-300 active:scale-[0.97]"
                          style={{
                            padding: '12px 16px',
                            marginLeft: isWrapper ? 0 : 12,
                            backgroundColor: isActive ? `${layer.color}12` : 'transparent',
                            border: `1.5px solid ${isActive ? layer.color + '35' : 'transparent'}`,
                          }}>
                          <div className="flex items-center" style={{ gap: 12 }}>
                            <div className="rounded-full transition-all duration-300 flex-shrink-0" style={{ width: 8, height: 8, backgroundColor: isActive ? layer.color : `${layer.color}40`, boxShadow: isActive ? `0 0 8px ${layer.color}50` : 'none' }} />
                            <span className="font-bold transition-all duration-300" style={{ fontSize: 15, color: isActive ? '#f0f4f8' : '#94a3b8' }}>{layer.title}</span>
                            {isWrapper && <span className="ml-auto" style={{ fontSize: 8, color: `${layer.color}50`, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>wrap</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Detail Panel */}
                <div className="flex-1 overflow-y-auto" style={{ padding: '32px 36px' }}>

                  {/* ── Overview (default) ── */}
                  {!activeLayer && (
                    <div style={{ animation: 'slideUp 0.25s ease-out' }}>
                      <div className="flex items-center" style={{ gap: 14, marginBottom: 24 }}>
                        <div style={{ width: 4, height: 28, borderRadius: 2, backgroundColor: uc.color }} />
                        <h4 className="font-black text-white" style={{ fontSize: 22 }}>Overview</h4>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 28, color: '#c8d4e3' }}>{uc.challenge}</p>

                      {/* Solution highlights */}
                      {uc.solution && (
                        <div style={{ marginBottom: 28 }}>
                          <span className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8294ab', display: 'block', marginBottom: 16 }}>How Cisco Delivers</span>
                          <div className="flex flex-col" style={{ gap: 12 }}>
                            {uc.solution.map((item, i) => (
                              <div key={i} className="rounded-xl" style={{ padding: '16px 20px', backgroundColor: 'rgba(255,255,255,0.025)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
                                <span className="font-bold text-white" style={{ fontSize: 15 }}>{item.bold}</span>
                                <p style={{ fontSize: 14, marginTop: 4, lineHeight: 1.6, color: '#a8b8cc' }}>{item.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Outcomes */}
                      {uc.outcomes && (
                        <div>
                          <span className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8294ab', display: 'block', marginBottom: 14 }}>Key Outcomes</span>
                          <div className="flex flex-wrap" style={{ gap: 8 }}>
                            {uc.outcomes.map((item, i) => (
                              <div key={i} className="flex items-center rounded-lg" style={{ padding: '8px 14px', backgroundColor: `${uc.color}0a`, border: `1px solid ${uc.color}18` }}>
                                <div className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, backgroundColor: uc.color, marginRight: 10 }} />
                                <span style={{ fontSize: 13, color: '#d0dae8' }}>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA to explore layers */}
                      <div className="rounded-xl flex items-center" style={{ padding: '16px 20px', marginTop: 32, backgroundColor: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.08)' }}>
                        <ArrowRight style={{ width: 18, height: 18, color: uc.color, marginRight: 12, transform: 'rotate(180deg)' }} />
                        <p style={{ fontSize: 14, color: '#94a3b8' }}>Select a layer on the left to see how each part of the stack powers this use case</p>
                      </div>
                    </div>
                  )}

                  {/* ── Layer Detail ── */}
                  {activeLayer && activeInfo && (
                    <div key={activeLayer} style={{ animation: 'slideUp 0.25s ease-out' }}>
                      {/* Layer title bar */}
                      <div className="flex items-center" style={{ gap: 14, marginBottom: 24 }}>
                        <div style={{ width: 4, height: 28, borderRadius: 2, backgroundColor: activeInfo.color }} />
                        <h4 className="font-black text-white" style={{ fontSize: 22 }}>{activeInfo.title}</h4>
                      </div>

                      {/* Insight card */}
                      <div className="rounded-2xl" style={{ padding: '24px 28px', marginBottom: 32, backgroundColor: `${activeInfo.color}0a`, border: `1.5px solid ${activeInfo.color}20` }}>
                        <span className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: '0.15em', color: activeInfo.color, display: 'block', marginBottom: 10 }}>Why it matters for {uc.title}</span>
                        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#d0dae8' }}>{insights[activeLayer] || ''}</p>
                      </div>

                      {/* Products */}
                      {activeProducts.length > 0 && (
                        <div>
                          <span className="font-bold uppercase" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8294ab', display: 'block', marginBottom: 14 }}>Key Products</span>
                          <div className="flex flex-col" style={{ gap: 6 }}>
                            {activeProducts.map((product, i) => (
                              <div key={i} className="flex items-center rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.025)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
                                <div style={{ width: 5, alignSelf: 'stretch', backgroundColor: activeInfo.color, flexShrink: 0 }} />
                                <span className="font-bold text-white" style={{ fontSize: 20, padding: '14px 20px' }}>{product.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

/* ═══ MAIN APP ═══ */
export default function App() {
  const [activeView, setActiveView] = useState('home');

  return (
    <div className="flex font-sans overflow-hidden select-none text-slate-100" style={{ background: '#020617', width: '100vw', height: '100vh' }}>
      <style>{`
        @keyframes fadeScaleIn { from { opacity:0; transform:scale(.92) translateY(20px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes fadeScaleOut { from { opacity:1; transform:scale(1) } to { opacity:0; transform:scale(.95) } }
        @keyframes bgIn { from { opacity:0 } to { opacity:1 } }
        @keyframes bgOut { from { opacity:1 } to { opacity:0 } }
        @keyframes pulseRing { 0%,100% { transform:scale(1); opacity:.2 } 50% { transform:scale(1.12); opacity:.06 } }
        @keyframes scanDown { 0% { top:0%; opacity:0 } 10% { opacity:1 } 90% { opacity:1 } 100% { top:85%; opacity:0 } }
        @keyframes attractPulse { 0%,100% { opacity:1 } 50% { opacity:.35 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes scenePulse { 0%,100% { opacity:0.15 } 50% { opacity:0.4 } }
        @keyframes dataFlow { from { stroke-dashoffset:9 } to { stroke-dashoffset:0 } }
        @keyframes outerGlow { 0%,100% { box-shadow:0 0 15px rgba(80,140,255,.06), inset 0 0 12px rgba(80,140,255,.03) } 50% { box-shadow:0 0 30px rgba(80,140,255,.12), inset 0 0 20px rgba(80,140,255,.05) } }
        .modal-bg-in { animation:bgIn .25s ease-out forwards }
        .modal-bg-out { animation:bgOut .25s ease-in forwards }
        .modal-in { animation:fadeScaleIn .35s cubic-bezier(.16,1,.3,1) forwards }
        .modal-out { animation:fadeScaleOut .25s ease-in forwards }
        .attract-pulse { animation:attractPulse 3s ease-in-out infinite }
        .outer-glow { animation:outerGlow 5s ease-in-out infinite }
      `}</style>

      {/* BG */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}><ParticleField /></div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute rounded-full" style={{ top: '8%', left: '15%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(59,130,246,.05) 0%, transparent 70%)' }} />
        <div className="absolute rounded-full" style={{ bottom: '8%', right: '10%', width: '35%', height: '35%', background: 'radial-gradient(circle, rgba(139,92,246,.04) 0%, transparent 70%)' }} />
      </div>

      {/* ═══ SIDEBAR ═══ */}
      <aside className="relative z-30 flex flex-col border-r border-cyan-900/15 flex-shrink-0" style={{ width: 280, backgroundColor: '#060b18' }}>
        <div className="flex-1 flex flex-col" style={{ padding: 32 }}>
          {/* Logo */}
          <div className="flex flex-col items-center" style={{ marginBottom: 12 }}>
            <div className="flex items-center" style={{ gap: 4, marginBottom: 6 }}>
              {[18, 10, 18, 10, 18].map((h, i) => <div key={i} className="rounded-full bg-white" style={{ width: 4, height: h }} />)}
            </div>
            <span className="font-black text-white" style={{ fontSize: 18, letterSpacing: '0.25em' }}>CISCO</span>
          </div>
          <div className="text-center" style={{ marginBottom: 32 }}>
            <p className="font-bold text-slate-300" style={{ fontSize: 20, lineHeight: 1.3 }}>Cisco Secure</p>
            <p className="font-bold text-slate-300" style={{ fontSize: 20, lineHeight: 1.3 }}>AI Factory</p>
          </div>

          {/* Nav Buttons */}
          <button onClick={() => setActiveView('use-cases')}
            className="w-full rounded-xl border-2 font-bold tracking-wider transition-all active:scale-95"
            style={{ padding: '18px 20px', fontSize: 15, marginBottom: 12, borderColor: activeView === 'use-cases' ? 'rgba(34,211,238,0.6)' : 'rgba(34,211,238,0.25)', backgroundColor: activeView === 'use-cases' ? 'rgba(34,211,238,0.08)' : 'transparent', color: activeView === 'use-cases' ? '#22d3ee' : '#94a3b8' }}>
            AI Use Cases
          </button>
          <button onClick={() => setActiveView('home')}
            className="w-full rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 font-bold tracking-wider text-white shadow-lg shadow-blue-600/15 active:scale-95 transition-all"
            style={{ padding: '18px 20px', fontSize: 15, marginBottom: 32 }}>
            Secure AI Factory
          </button>

          <div className="w-full bg-slate-800/50" style={{ height: 1, marginBottom: 32 }} />

          <nav className="flex-1 flex flex-col overflow-y-auto" style={{ gap: 2 }}>
            {SIDEBAR_NAV.map((item) => {
              const isActive = activeView === `layer-${item.id}`;
              const layerColor = LAYER_DETAILS[item.id]?.color || '#475569';
              return (
                <button key={item.id}
                  onClick={() => setActiveView(`layer-${item.id}`)}
                  className="text-left font-bold transition-all duration-300 rounded-lg active:scale-95"
                  style={{
                    padding: '12px 16px',
                    fontSize: 13,
                    letterSpacing: '0.08em',
                    color: isActive ? layerColor : '#64748b',
                    backgroundColor: isActive ? `${layerColor}10` : 'transparent',
                    borderLeft: isActive ? `3px solid ${layerColor}` : '3px solid transparent',
                  }}>
                  {item.label.toUpperCase()}
                </button>
              );
            })}
          </nav>

          {/* Status */}
          <div className="border-t border-white/5" style={{ paddingTop: 24 }}>
            <div className="flex items-center" style={{ gap: 10 }}>
              <Zap style={{ width: 18, height: 18, color: '#22c55e' }} />
              <span className="font-bold uppercase" style={{ fontSize: 14, letterSpacing: '0.12em', color: 'rgba(34,197,94,0.7)' }}>Live Demo</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ CONTENT ═══ */}
      <div className="flex-1 relative z-10 flex flex-col min-w-0">
        {activeView === 'home' && <HomeScreen onNavigate={setActiveView} />}
        {activeView === 'use-cases' && <UseCasesScreen onNavigate={setActiveView} />}
        {activeView.startsWith('layer-') && <LayerDetailScreen layerId={activeView.replace('layer-', '')} key={activeView} />}
      </div>
    </div>
  );
}