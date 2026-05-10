import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "A network connects computers so they can share data. Learn about LAN, MAN, WAN and how the Internet works.",
    objectives: ["Differentiate LAN, MAN and WAN.", "Identify network devices.", "Understand client–server vs peer-to-peer."],
    duration: "30 min", difficulty: "intermediate",
  },
  learn: {
    blocks: [
      { heading: "🌐 What is a Network?", body: "Two or more computers connected to share data and resources." },
      { heading: "📏 Types by Size", body: "Networks differ by area covered.", bullets: ["LAN — Local (school, home)", "MAN — Metropolitan (city)", "WAN — Wide (countries; Internet is the largest WAN)"] },
      { heading: "🧰 Devices", body: "Hub, Switch, Router, Modem, Bridge, NIC, Access Point." },
      { heading: "🤝 Models", body: "Client-Server (one main server) vs Peer-to-Peer (equal computers)." },
      { heading: "🔗 Topologies", body: "Bus, Star, Ring, Mesh, Tree." },
    ],
  },
  images: {
    items: [
      { emoji: "🌐", caption: "Networked PCs." }, { emoji: "📶", caption: "Wi-Fi router." },
      { emoji: "🔌", caption: "Switch." }, { emoji: "🖧", caption: "Star topology." },
      { emoji: "🛰️", caption: "WAN spans cities." }, { emoji: "🤝", caption: "Client–Server." },
    ],
  },
  activities: {
    items: [
      { title: "Spot the network 🔎", steps: ["Identify school's network type.", "Count devices used."] },
      { title: "Draw topologies 🎨", steps: ["Sketch Star and Mesh.", "List one pro for each."] },
      { title: "Speed test 📶", steps: ["Run an internet speed test.", "Note Mbps download/upload."] },
      { title: "Device match 🧰", steps: ["Match Router/Switch/Modem to their job."] },
      { title: "C-S vs P2P 🤝", steps: ["List one app of each (e.g., Gmail vs BitTorrent)."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Largest network is…", options: ["LAN", "MAN", "WAN", "PAN"], answerIndex: 2 },
      { type: "fill", question: "School network is usually a ___.", answer: "LAN" },
      { type: "tf", question: "Internet is a WAN.", answer: true },
      { type: "mcq", question: "Connects two networks?", options: ["Hub", "Switch", "Router", "NIC"], answerIndex: 2 },
      { type: "fill", question: "P2P means ___-to-___.", answer: "peer" },
      { type: "mcq", question: "Star topology centers on a…", options: ["Hub/Switch", "Cable", "Router only", "PC"], answerIndex: 0 },
      { type: "tf", question: "Modem converts digital ↔ analog signals.", answer: true },
      { type: "fill", question: "NIC = Network ___ Card.", answer: "Interface" },
      { type: "mcq", question: "City-wide network?", options: ["LAN", "MAN", "WAN", "PAN"], answerIndex: 1 },
      { type: "tf", question: "Hub is smarter than Switch.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "Wi-Fi router is which kind of device?", options: ["Storage", "Networking", "Output", "Input"], answerIndex: 1 },
      { type: "mcq", question: "Best topology for redundancy?", options: ["Bus", "Star", "Ring", "Mesh"], answerIndex: 3 },
      { type: "tf", question: "WAN covers a small area.", answer: false },
      { type: "fill", question: "LAN means ___ Area Network.", answer: "Local" },
      { type: "mcq", question: "Server stores…", options: ["Nothing", "Shared resources", "Only games", "Only printers"], answerIndex: 1 },
      { type: "mcq", question: "Switch works at…", options: ["Layer 2", "Physical only", "Application", "None"], answerIndex: 0 },
      { type: "tf", question: "Internet uses many protocols incl. TCP/IP.", answer: true },
      { type: "fill", question: "Wireless access point spreads ___.", answer: "Wi-Fi" },
      { type: "mcq", question: "P2P example?", options: ["Gmail", "BitTorrent", "Bank app", "Web search"], answerIndex: 1 },
      { type: "tf", question: "Topology means physical/logical layout.", answer: true },
    ],
  },
};
export default content;
