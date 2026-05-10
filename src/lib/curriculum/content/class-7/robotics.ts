import type { TopicContentBundle } from "../../types";

const content: TopicContentBundle = {
  overview: {
    summary: "Robots combine sensors, actuators and a controller running code. Discover what they do and the basics behind them.",
    objectives: [
      "Define robot and robotics.",
      "Identify sensors, actuators and controllers.",
      "Recognise everyday uses of robots.",
    ],
    duration: "25 min",
    difficulty: "beginner",
  },
  learn: {
    blocks: [
      { heading: "🤖 What is a Robot?", body: "A machine that can sense, decide and act — often programmable." },
      { heading: "🧠 Three Parts", body: "Robots usually have:", bullets: [
        "Sensors — eyes/ears (camera, ultrasonic, IR, touch)",
        "Controller — the brain (microcontroller like Arduino)",
        "Actuators — motors / wheels / arms",
      ] },
      { heading: "🏭 Where used?", body: "Factories (assembly), hospitals (surgery), homes (vacuum), farms, cars (self-driving), space exploration." },
      { heading: "📜 Three Laws (sci-fi)", body: "Asimov's laws — robots must not harm humans, must obey them and must protect themselves (in that order)." },
      { heading: "💡 Did you know?", body: "Mars rovers like Perseverance are robots driven by code from Earth." },
    ],
  },
  images: {
    items: [
      { emoji: "🤖", caption: "Friendly robot." },
      { emoji: "👁️", caption: "Sensor." },
      { emoji: "🧠", caption: "Controller." },
      { emoji: "⚙️", caption: "Actuator." },
      { emoji: "🚜", caption: "Farm robot." },
      { emoji: "🚀", caption: "Mars rover." },
    ],
  },
  activities: {
    items: [
      { title: "Find the robots 🔎", steps: ["List 5 robots used at home / in news.", "Note their job."] },
      { title: "Sensor sort 👁️", steps: ["Match sensors: camera, mic, IR, touch.", "Write what each detects."] },
      { title: "Pseudo-code line follower 🛣️", steps: ["if line under sensor: go straight", "else if line on left: turn left", "else turn right"] },
      { title: "Make a paper robot 🛠️", steps: ["Draw a robot.", "Label sensors, controller, actuators."] },
      { title: "Discuss 🗣️", steps: ["Should robots replace teachers?", "Pros/cons in 5 points each."] },
    ],
  },
  practice: {
    questions: [
      { type: "mcq", question: "Robot's brain is the…", options: ["Sensor", "Actuator", "Controller", "Motor"], answerIndex: 2 },
      { type: "fill", question: "Wheels and arms are ___.", answer: "actuators" },
      { type: "tf", question: "Sensors give input data.", answer: true },
      { type: "mcq", question: "Self-driving car is a robot?", options: ["Yes", "No", "Only on track", "Only at night"], answerIndex: 0 },
      { type: "fill", question: "Asimov wrote ___ laws of robotics.", answer: "three" },
      { type: "mcq", question: "Mars Rover is operated from…", options: ["Mars", "Moon", "Earth", "Venus"], answerIndex: 2 },
      { type: "tf", question: "Vacuum robots clean homes.", answer: true },
      { type: "fill", question: "Camera is a ___.", answer: "sensor" },
      { type: "mcq", question: "Arduino is a…", options: ["Sensor", "Actuator", "Microcontroller", "Battery"], answerIndex: 2 },
      { type: "tf", question: "All robots are humanoid.", answer: false },
    ],
  },
  quiz: {
    timerSeconds: 300, passScore: 60,
    questions: [
      { type: "mcq", question: "What detects obstacles?", options: ["Motor", "Ultrasonic sensor", "Wheel", "LED"], answerIndex: 1 },
      { type: "mcq", question: "Industry robot is mainly used in…", options: ["Schools", "Factories", "Parks", "Movies"], answerIndex: 1 },
      { type: "tf", question: "Robots can be programmed.", answer: true },
      { type: "fill", question: "Surgery robots help in ___.", answer: "hospitals" },
      { type: "mcq", question: "Output device on a robot is the…", options: ["Sensor", "Camera", "Motor", "Battery"], answerIndex: 2 },
      { type: "mcq", question: "Which is NOT a sensor?", options: ["IR", "Touch", "Microphone", "Servo"], answerIndex: 3 },
      { type: "tf", question: "Robots have only mechanical parts.", answer: false },
      { type: "fill", question: "Decision-making is done by the ___.", answer: "controller" },
      { type: "mcq", question: "Best example of an at-home robot?", options: ["Roomba", "Microwave", "TV", "Fan"], answerIndex: 0 },
      { type: "tf", question: "Robots can replace humans in dangerous tasks.", answer: true },
    ],
  },
};
export default content;
