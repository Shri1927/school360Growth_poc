import pythagorasVideo from "../videos/Pythagoras_Theorem_.mp4";
import quadraticVideo from "../videos/Quadratic_Equations_.mp4";
import photosynthesisVideo from "../videos/photosynthesis.mp4";
import newtonVideo from "../videos/Newton_s_Laws_of_Moti.mp4";

export interface TeachingTechnique {
  id: string;
  title: string;
  category: "Visual Proof" | "Hands-On Activity" | "Gamified Learning" | "Conceptual Hook" | "Real-World Application";
  durationMinutes: number;
  engagementRating: number; // out of 5
  overview: string;
  stepByStep: string[];
  teacherTip: string;
}

export interface MediaResource {
  id: string;
  title: string;
  type: "video" | "photo";
  durationSec?: number; // 10s - 20s for video
  aspectRatio?: string;
  caption: string;
  thumbnailBadge: string;
  videoVariant?: "pythagoras" | "quadratic" | "photosynthesis" | "newton" | "generic";
  diagramSvgType?: string;
  videoUrl?: string;
}

export interface DocumentResource {
  id: string;
  title: string;
  type: "PPT" | "PDF";
  size: string;
  pagesOrSlides: string;
  description: string;
  filename: string;
  downloadUrl?: string;
  previewHighlights: string[];
}

export interface PYQuestion {
  id: string;
  year: string;
  examName: string;
  marks: number;
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
  solutionSteps: string[];
  markingKey: string;
}

export interface TopicAiResource {
  id: string;
  subject: string;
  topicName: string;
  category: string;
  gradeLevel: string;
  shortSummary: string;
  keyFormulaeOrConcepts: string[];
  teachingTechniques: TeachingTechnique[];
  media: MediaResource[];
  documents: DocumentResource[];
  pyqs: PYQuestion[];
}

export const TOPIC_AI_DATABASE: TopicAiResource[] = [
  {
    id: "topic-pythagoras-theorem",
    subject: "Mathematics",
    topicName: "Pythagoras Theorem & Right Triangles",
    category: "Algebra & Geometry",
    gradeLevel: "Grade 10-B",
    shortSummary:
      "In any right-angled triangle, the area of the square whose side is the hypotenuse (the side opposite the right angle) is equal to the sum of the areas of the squares on the other two sides: a² + b² = c².",
    keyFormulaeOrConcepts: [
      "Core Formula: a² + b² = c² (where c is the hypotenuse)",
      "Standard Pythagorean Triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25)",
      "Converse Theorem: If a² + b² = c², the angle opposite to side c is 90°",
      "Distance Formula in 2D Geometry: d = √((x₂ - x₁)² + (y₂ - y₁)²)",
    ],
    teachingTechniques: [
      {
        id: "tech-pyth-1",
        title: "3D Visual Grid & Water Disproval/Proof Method",
        category: "Visual Proof",
        durationMinutes: 10,
        engagementRating: 4.9,
        overview:
          "Demonstrate visually how squares built on legs 'a' and 'b' contain liquid or grid units that exactly fill the square on hypotenuse 'c'.",
        stepByStep: [
          "Draw a 3-4-5 right triangle on graph grid or whiteboard.",
          "Construct a 3x3 square (9 units) on leg A and a 4x4 square (16 units) on leg B.",
          "Ask students to count total squares (9 + 16 = 25).",
          "Construct a 5x5 square (25 units) on the hypotenuse C and show exact alignment.",
        ],
        teacherTip: "Use physical square tiles or color markers so kinetic learners can physically move 25 tiles into the hypotenuse box.",
      },
      {
        id: "tech-pyth-2",
        title: "Real-World Shadow & Ladder Benchmark Exercise",
        category: "Real-World Application",
        durationMinutes: 15,
        engagementRating: 4.8,
        overview:
          "Relate the theorem to real-life construction, ladder safety angles, and smartphone GPS triangulation.",
        stepByStep: [
          "Pose the problem: A firefighter ladder must reach a 12m high window. Safety rules dictate placing the ladder base 5m away.",
          "Have students calculate exact ladder length required (13 meters) using sqrt(5² + 12²).",
          "Discuss structural stability and how builders use 3-4-5 rope loops to ensure 90° corners.",
        ],
        teacherTip: "Show a quick 15-second clip of a construction site using a 3-4-5 tape measure check.",
      },
      {
        id: "tech-pyth-3",
        title: "Pythagorean Triples Speed Drill Gamification",
        category: "Gamified Learning",
        durationMinutes: 7,
        engagementRating: 4.7,
        overview:
          "Rapid-fire group quiz to help students memorize key triples and recognize scaled multiples (e.g. 6-8-10, 9-12-15).",
        stepByStep: [
          "Split class into 2 teams.",
          "Call out two legs, e.g., 'Legs are 6 and 8, find hypotenuse!'",
          "First team to shout 10 gets a point.",
          "Introduce scale factors: (3-4-5) × 3 = (9-12-15).",
        ],
        teacherTip: "Reiterate that scaled triples always retain the right-angle property.",
      },
    ],
    media: [
      {
        id: "media-pyth-1",
        title: "15-Sec Animated Proof: Square Area Transfer (a² + b² = c²)",
        type: "video",
        durationSec: 15,
        aspectRatio: "16/9",
        caption: "Micro-animation showing 9 red squares and 16 blue squares merging into 25 purple squares on the hypotenuse.",
        thumbnailBadge: "15s Explainer Video",
        videoVariant: "pythagoras",
        videoUrl: pythagorasVideo,
      },
      {
        id: "media-pyth-2",
        title: "Right Triangle Trigonometric & Geometric Anatomy Diagram",
        type: "photo",
        aspectRatio: "4/3",
        caption: "High-resolution labeled diagram highlighting Hypotenuse, Adjacent leg, Opposite leg, and Square Projections.",
        thumbnailBadge: "Visual Concept Diagram",
        diagramSvgType: "pythagoras-diagram",
      },
      {
        id: "media-pyth-3",
        title: "20-Sec Real Life Application: Ladder against Wall Simulation",
        type: "video",
        durationSec: 20,
        aspectRatio: "16/9",
        caption: "Short motion graphic demonstrating height calculation of a leaning ladder in emergency rescue.",
        thumbnailBadge: "20s Real-World Demo",
        videoVariant: "pythagoras",
        videoUrl: pythagorasVideo,
      },
    ],
    documents: [
      {
        id: "doc-pyth-1",
        title: "Pythagoras Theorem - Complete Lesson Plan (Grade 10)",
        type: "PDF",
        size: "1.4 MB",
        pagesOrSlides: "4 Pages",
        description: "Includes learning objectives, step-by-step 45-minute lesson structure, guided questions, and homework.",
        filename: "Pythagoras_Theorem_Lesson_Plan_Grade10.pdf",
        previewHighlights: ["Learning Objectives & CBSE Standards", "5-Min Hook & 15-Min Visual Demo", "Differentiated Practice Exercises", "Exit Ticket Quiz"],
      },
      {
        id: "doc-pyth-2",
        title: "Classroom Presentation: Pythagoras Theorem & Visual Proofs",
        type: "PPT",
        size: "3.8 MB",
        pagesOrSlides: "14 Slides",
        description: "Editable slide deck with embedded animations, interactive quiz slides, and real-world examples.",
        filename: "Pythagoras_Theorem_Classroom_Presentation.pptx",
        previewHighlights: ["Animated Step-by-Step Proofs", "Interactive Student Quiz Slides", "Real World Engineering Examples", "Formula Summary Sheet"],
      },
      {
        id: "doc-pyth-3",
        title: "Practice Worksheet with Detailed Marking Solutions",
        type: "PDF",
        size: "850 KB",
        pagesOrSlides: "3 Pages",
        description: "15 practice problems ranging from basic triples to 3D coordinate applications with complete solution key.",
        filename: "Pythagoras_Worksheet_With_Solutions.pdf",
        previewHighlights: ["5 Level-1 Basic Triples", "5 Level-2 Word Problems", "5 Level-3 Olympiad Challenges", "Full Step-by-Step Marking Key"],
      },
    ],
    pyqs: [
      {
        id: "pyq-pyth-1",
        year: "2023 Board Examination",
        examName: "Class 10 CBSE Standard Mathematics",
        marks: 4,
        difficulty: "Medium",
        questionText:
          "A ladder 13m long reaches a window of a building 12m above the ground. Determine the distance of the foot of the ladder from the base of the building. If the foot of the ladder is moved 2m further away from the wall, find the new height reached by the ladder on the wall.",
        solutionSteps: [
          "Case 1: Let foot distance = x. By Pythagoras Theorem: x² + 12² = 13² => x² + 144 = 169 => x² = 25 => x = 5 meters.",
          "Case 2: New foot distance x' = 5 + 2 = 7 meters.",
          "Let new height = h'. Then 7² + h'² = 13² => 49 + h'² = 169 => h'² = 120 => h' = √120 = 2√30 ≈ 10.95 meters.",
        ],
        markingKey: "[1 Mark for initial formula] + [1 Mark for x=5m] + [1 Mark for new distance 7m] + [1 Mark for final height √120m]",
      },
      {
        id: "pyq-pyth-2",
        year: "2022 Term-2 Exam",
        examName: "Class 10 Board Assessment",
        marks: 3,
        difficulty: "Easy",
        questionText:
          "In a right triangle ABC right-angled at B, if tan A = 1, then verify that 2 sin A cos A = 1 using the Pythagoras relationship.",
        solutionSteps: [
          "Given tan A = BC/AB = 1 => BC = AB = k (say).",
          "By Pythagoras Theorem, AC = √(AB² + BC²) = √(k² + k²) = k√2.",
          "sin A = BC/AC = k / (k√2) = 1/√2.",
          "cos A = AB/AC = k / (k√2) = 1/√2.",
          "LHS = 2 sin A cos A = 2 × (1/√2) × (1/√2) = 2 × 1/2 = 1 = RHS. Hence verified.",
        ],
        markingKey: "[1 Mark for finding AC = k√2] + [1 Mark for sin A & cos A values] + [1 Mark for LHS=RHS substitution]",
      },
      {
        id: "pyq-pyth-3",
        year: "2021 Math Olympiad",
        examName: "State Level Math Talent Search",
        marks: 5,
        difficulty: "Hard",
        questionText:
          "The diagonal of a rectangular field is 16 meters more than the shorter side. If the longer side is 14 meters more than the shorter side, find the dimensions of the field.",
        solutionSteps: [
          "Let shorter side = x meters. Then Longer side = x + 14, Diagonal = x + 16.",
          "In right triangle formed by sides and diagonal: (shorter)² + (longer)² = (diagonal)².",
          "x² + (x + 14)² = (x + 16)².",
          "x² + x² + 28x + 196 = x² + 32x + 256.",
          "x² - 4x - 60 = 0 => (x - 10)(x + 6) = 0.",
          "Since side length cannot be negative, x = 10 meters.",
          "Shorter side = 10m, Longer side = 24m, Diagonal = 26m.",
        ],
        markingKey: "[1 Mark for equation setup] + [2 Marks for quadratic expansion] + [1 Mark for solving x=10] + [1 Mark for stating dimensions]",
      },
    ],
  },
  {
    id: "topic-quadratic-equations",
    subject: "Mathematics",
    topicName: "Quadratic Equations & Parabolic Graphs",
    category: "Algebra",
    gradeLevel: "Grade 10-A",
    shortSummary:
      "A quadratic equation is a second-order polynomial equation of the form ax² + bx + c = 0. Its solutions are given by the Quadratic Formula x = (-b ± √(b² - 4ac)) / (2a).",
    keyFormulaeOrConcepts: [
      "Standard Form: ax² + bx + c = 0 (a ≠ 0)",
      "Discriminant D = b² - 4ac (D > 0: 2 real roots; D = 0: 1 real root; D < 0: complex roots)",
      "Quadratic Formula: x = (-b ± √D) / (2a)",
      "Sum of roots (α + β) = -b/a, Product of roots (α β) = c/a",
    ],
    teachingTechniques: [
      {
        id: "tech-quad-1",
        title: "Parabolic Trajectory Basketball Throw Demo",
        category: "Real-World Application",
        durationMinutes: 12,
        engagementRating: 4.9,
        overview:
          "Show how a thrown ball traces a inverted parabola y = -ax² + bx + c and relate peak height to vertex.",
        stepByStep: [
          "Record a 10s video of a student throwing a basketball into a hoop.",
          "Pause video at apex to mark vertex coordinates (-b/(2a), max height).",
          "Show ground contact points as the real roots of the equation.",
        ],
        teacherTip: "Highlight that real-world projectile motion is always modeled by quadratic equations.",
      },
      {
        id: "tech-quad-2",
        title: "Algebra Tile Splitting Method for Factoring",
        category: "Hands-On Activity",
        durationMinutes: 15,
        engagementRating: 4.6,
        overview: "Use physical square tiles (x²) and rectangular bars (x) to form rectangles for factoring.",
        stepByStep: [
          "Provide tiles representing x², 5x, and 6 units.",
          "Guide students to construct a complete rectangle with dimensions (x+2) by (x+3).",
        ],
        teacherTip: "Great for kinetic learners struggling with splitting the middle term mentally.",
      },
    ],
    media: [
      {
        id: "media-quad-1",
        title: "12-Sec Visual Animation: Graphing a Parabola & Finding Roots",
        type: "video",
        durationSec: 12,
        aspectRatio: "16/9",
        caption: "Interactive curve animation displaying vertex shift and x-intercept roots as D changes value.",
        thumbnailBadge: "12s Parabola Animation",
        videoVariant: "quadratic",
        videoUrl: quadraticVideo,
      },
      {
        id: "media-quad-2",
        title: "Discriminant (b² - 4ac) Decision Tree Diagram",
        type: "photo",
        aspectRatio: "4/3",
        caption: "Flowchart diagram classifying real distinct, equal, and imaginary roots.",
        thumbnailBadge: "Discriminant Flowchart",
        diagramSvgType: "quadratic-diagram",
      },
    ],
    documents: [
      {
        id: "doc-quad-1",
        title: "Quadratic Equations Teacher Master Guide",
        type: "PDF",
        size: "2.1 MB",
        pagesOrSlides: "5 Pages",
        description: "Comprehensive lesson plans with 3 methods: Factoring, Completing the Square, and Formula.",
        filename: "Quadratic_Equations_Master_Guide.pdf",
        previewHighlights: ["Lesson Timelines", "Common Misconception Alerts", "Differentiated Worksheets"],
      },
      {
        id: "doc-quad-2",
        title: "Interactive Parabola Slides Presentation",
        type: "PPT",
        size: "4.2 MB",
        pagesOrSlides: "16 Slides",
        description: "Visual slides with step-by-step animations for completing the square.",
        filename: "Quadratic_Equations_Class Deck.pptx",
        previewHighlights: ["Animated Factorizations", "Graphing Demonstrations", "Exam Problem Walkthroughs"],
      },
    ],
    pyqs: [
      {
        id: "pyq-quad-1",
        year: "2023 Board Exam",
        examName: "Class 10 CBSE Mathematics",
        marks: 4,
        difficulty: "Medium",
        questionText:
          "Find the value of k for which the quadratic equation (k + 4)x² + (k + 1)x + 1 = 0 has equal roots.",
        solutionSteps: [
          "For equal roots, Discriminant D = b² - 4ac = 0.",
          "Here a = k + 4, b = k + 1, c = 1.",
          "(k + 1)² - 4(k + 4)(1) = 0.",
          "k² + 2k + 1 - 4k - 16 = 0 => k² - 2k - 15 = 0.",
          "(k - 5)(k + 3) = 0 => k = 5 or k = -3.",
        ],
        markingKey: "[1 Mark for D=0 condition] + [1 Mark for quadratic setup] + [2 Marks for values k=5, k=-3]",
      },
    ],
  },
  {
    id: "topic-photosynthesis",
    subject: "Science / Biology",
    topicName: "Photosynthesis & Solar Energy Conversion",
    category: "Cell Biology & Botany",
    gradeLevel: "Grade 10-B Science",
    shortSummary:
      "Photosynthesis is the process used by plants and other organisms to convert light energy into chemical energy: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂ inside Chloroplasts.",
    keyFormulaeOrConcepts: [
      "Overall Reaction: 6CO₂ + 6H₂O + photons → C₆H₁₂O₆ + 6O₂",
      "Site of Action: Chloroplast (Thylakoids for Light Reaction, Stroma for Dark/Calvin Cycle)",
      "Key Pigments: Chlorophyll a (primary), Chlorophyll b, Carotenoids",
      "Stomata Regulation: Guard cells control CO₂ intake and H₂O transpiration",
    ],
    teachingTechniques: [
      {
        id: "tech-photo-1",
        title: "Floating Leaf Disk Oxygen Production Lab",
        category: "Hands-On Activity",
        durationMinutes: 20,
        engagementRating: 4.9,
        overview:
          "Punch leaf disks, evacuate air using a syringe, submerge in baking soda water, and time how fast light causes them to float as O₂ bubbles form.",
        stepByStep: [
          "Prepare 10 spinach leaf disks.",
          "Place in syringe with sodium bicarbonate solution and pull vacuum to sink disks.",
          "Expose to bright light and measure time taken for 50% disks to float.",
        ],
        teacherTip: "Involve students in predicting if green vs red light speeds up leaf floating time.",
      },
    ],
    media: [
      {
        id: "media-photo-1",
        title: "18-Sec Micro-Animation: Light & Dark Reaction in Chloroplast",
        type: "video",
        durationSec: 18,
        aspectRatio: "16/9",
        caption: "Visual showing photons splitting water molecules to release oxygen inside thylakoid membranes.",
        thumbnailBadge: "18s Animated Cell Bio",
        videoVariant: "photosynthesis",
        videoUrl: photosynthesisVideo,
      },
      {
        id: "media-photo-2",
        title: "Cross Section of Leaf & Stomata Mechanics Diagram",
        type: "photo",
        aspectRatio: "4/3",
        caption: "High resolution diagram showing Palisade mesophyll, vascular bundle, and stomatal pore.",
        thumbnailBadge: "Leaf Anatomy Diagram",
        diagramSvgType: "photosynthesis-diagram",
      },
    ],
    documents: [
      {
        id: "doc-photo-1",
        title: "Photosynthesis Interactive Lesson Plan & Lab Sheet",
        type: "PDF",
        size: "1.8 MB",
        pagesOrSlides: "6 Pages",
        description: "Complete guide including safety procedures for light spectrum experiments.",
        filename: "Photosynthesis_Lesson_Plan_Lab.pdf",
        previewHighlights: ["Lab Safety Guide", "Chlorophyll Extraction Protocol", "Student Quiz Sheet"],
      },
      {
        id: "doc-photo-2",
        title: "Cellular Photosynthesis PPT Slide Deck",
        type: "PPT",
        size: "5.1 MB",
        pagesOrSlides: "18 Slides",
        description: "Richly illustrated slides with animations of ATP synthesis in thylakoid.",
        filename: "Photosynthesis_Class_Deck.pptx",
        previewHighlights: ["3D Chloroplast Models", "Calvin Cycle Diagram", "Interactive Review"],
      },
    ],
    pyqs: [
      {
        id: "pyq-photo-1",
        year: "2023 Science Board Exam",
        examName: "Class 10 Science",
        marks: 3,
        difficulty: "Medium",
        questionText:
          "State the three events that occur during the process of photosynthesis. Write the balanced chemical equation representing the process.",
        solutionSteps: [
          "Balanced Equation: 6CO₂ + 6H₂O (in presence of Sunlight & Chlorophyll) → C₆H₁₂O₆ + 6O₂.",
          "Three Events: 1. Absorption of light energy by chlorophyll. 2. Conversion of light energy into chemical energy and splitting of water molecules into hydrogen and oxygen. 3. Reduction of carbon dioxide to carbohydrates.",
        ],
        markingKey: "[1 Mark for balanced equation] + [2 Marks for 3 steps (0.67 marks each)]",
      },
    ],
  },
  {
    id: "topic-newtons-laws",
    subject: "Physics",
    topicName: "Newton's Laws of Motion & Friction",
    category: "Mechanics",
    gradeLevel: "Grade 9-A / 10 Science",
    shortSummary:
      "Newton's three laws of motion describe the relationship between a body and the forces acting upon it, forming the foundation of classical mechanics: Inertia, F=ma, and Action-Reaction.",
    keyFormulaeOrConcepts: [
      "1st Law (Inertia): An object remains at rest or in uniform motion unless acted upon by a net external force.",
      "2nd Law: Net Force = mass × acceleration (F = ma, or F = dp/dt).",
      "3rd Law: To every action, there is an equal and opposite reaction (F_AB = -F_BA).",
      "Momentum: p = m × v (SI Unit: kg·m/s).",
    ],
    teachingTechniques: [
      {
        id: "tech-newt-1",
        title: "Coin Flip Index Card Inertia Experiment",
        category: "Hands-On Activity",
        durationMinutes: 8,
        engagementRating: 4.8,
        overview: "Place a coin on an index card over a glass cup. Flick the card quickly away; coin drops straight down due to inertia.",
        stepByStep: [
          "Give each group a glass, index card, and heavy coin.",
          "Ask students to flick card horizontally.",
          "Discuss why coin resists moving horizontally (1st Law).",
        ],
        teacherTip: "Encourage students to flick fast to minimize frictional transfer of force.",
      },
    ],
    media: [
      {
        id: "media-newt-1",
        title: "16-Sec Motion Graphic: Rocket Thrust & Newton's 3rd Law",
        type: "video",
        durationSec: 16,
        aspectRatio: "16/9",
        caption: "Animated physics simulation showing downward gas momentum creating upward rocket acceleration.",
        thumbnailBadge: "16s Rocket Physics Video",
        videoVariant: "newton",
        videoUrl: newtonVideo,
      },
      {
        id: "media-newt-2",
        title: "Free Body Vector Force Diagram",
        type: "photo",
        aspectRatio: "4/3",
        caption: "Illustration of Normal force, Gravity, Friction, and Applied force vectors.",
        thumbnailBadge: "Vector Force Diagram",
        diagramSvgType: "newton-diagram",
      },
    ],
    documents: [
      {
        id: "doc-newt-1",
        title: "Newton's Laws Lesson Plan & Physics Experiments",
        type: "PDF",
        size: "1.6 MB",
        pagesOrSlides: "4 Pages",
        description: "Hands-on lab worksheets for calculating acceleration from different masses.",
        filename: "Newtons_Laws_Lesson_Plan.pdf",
        previewHighlights: ["F=ma Lab Sheet", "Inertia Demonstrations", "Momentum Calculations"],
      },
      {
        id: "doc-newt-2",
        title: "Interactive Force & Motion Slide Presentation",
        type: "PPT",
        size: "3.5 MB",
        pagesOrSlides: "15 Slides",
        description: "High quality vector illustrations showing real world applications like seatbelts and recoil.",
        filename: "Newtons_Laws_Classroom_Deck.pptx",
        previewHighlights: ["Car Collision Physics", "Rocket Propulsion Slides", "Problem Solving Guide"],
      },
    ],
    pyqs: [
      {
        id: "pyq-newt-1",
        year: "2022 Annual Science Exam",
        examName: "Class 9 Science",
        marks: 3,
        difficulty: "Easy",
        questionText:
          "Why does a passenger sitting in a moving bus fall backward when the bus suddenly starts moving forward? Name and state the law involved.",
        solutionSteps: [
          "Law Involved: Newton's First Law of Motion (Law of Inertia).",
          "Explanation: When the bus starts suddenly, the lower part of the passenger's body in contact with the bus floor comes into motion immediately. However, the upper body tends to remain at rest due to inertia of rest. As a result, the passenger feels a backward jerk.",
        ],
        markingKey: "[1 Mark for naming Law of Inertia] + [1 Mark for stating 1st Law] + [1 Mark for physical explanation]",
      },
    ],
  },
];

export function searchAiTopics(query: string): TopicAiResource[] {
  if (!query || query.trim() === "") return TOPIC_AI_DATABASE;
  const q = query.toLowerCase().trim();
  return TOPIC_AI_DATABASE.filter(
    (t) =>
      t.topicName.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.shortSummary.toLowerCase().includes(q) ||
      t.keyFormulaeOrConcepts.some((c) => c.toLowerCase().includes(q))
  );
}

export function getTopicById(id: string): TopicAiResource | undefined {
  return TOPIC_AI_DATABASE.find((t) => t.id === id);
}

export function generateCustomTopicAiResource(topicName: string): TopicAiResource {
  const cleanName = topicName.trim() || "Custom Topic";
  return {
    id: `custom-${Date.now()}`,
    subject: "General Academic / Science & Math",
    topicName: cleanName,
    category: "AI Generated Topic Package",
    gradeLevel: "Secondary School (Grades 9-12)",
    shortSummary: `AI-generated teaching summary for '${cleanName}'. This core concept focuses on foundational principles, active inquiry, and structured mastery for secondary school students.`,
    keyFormulaeOrConcepts: [
      `Fundamental Definition & Axioms of ${cleanName}`,
      "Step-by-step logical decomposition and key variable relationships",
      "Practical application in real-world engineering, nature, or everyday life",
      "Common student misconceptions and self-correction strategies",
    ],
    teachingTechniques: [
      {
        id: `tech-custom-1`,
        title: `Interactive Discovery & Concept Hook for ${cleanName}`,
        category: "Conceptual Hook",
        durationMinutes: 10,
        engagementRating: 4.8,
        overview: `Engage students with an intriguing mystery question or physical demonstration related to ${cleanName}.`,
        stepByStep: [
          `Pose a thought-provoking challenge question related to ${cleanName} on the board.`,
          "Give students 2 minutes to write down hypothesis in small groups.",
          "Lead a guided inquiry discussion revealing the core mechanism.",
          "Summarize key takeaway onto anchor chart.",
        ],
        teacherTip: "Encourage active peer dialogue before revealing the final answer.",
      },
      {
        id: `tech-custom-2`,
        title: `Peer Teaching & Mind Mapping Activity`,
        category: "Gamified Learning",
        durationMinutes: 15,
        engagementRating: 4.7,
        overview: `Students create a concept mind map around ${cleanName} and teach key nodes to their partner.`,
        stepByStep: [
          "Provide chart paper or digital canvas.",
          "Assign different sub-topics of the concept to student pairs.",
          "Have pairs present 60-second elevator pitches.",
        ],
        teacherTip: "Use timer rings to keep elevator pitches punchy and energetic.",
      },
    ],
    media: [
      {
        id: `media-custom-1`,
        title: `15-Sec AI Animated Visual Explainer for ${cleanName}`,
        type: "video",
        durationSec: 15,
        aspectRatio: "16/9",
        caption: `Micro visual animation showing key motion and structural principles of ${cleanName}.`,
        thumbnailBadge: "15s AI Visual Video",
        videoVariant: "generic",
      },
      {
        id: `media-custom-2`,
        title: `Visual Mind Map & Core Concept Diagram`,
        type: "photo",
        aspectRatio: "4/3",
        caption: `Schematic diagram summarizing core principles of ${cleanName}.`,
        thumbnailBadge: "Concept Map Diagram",
        diagramSvgType: "generic-diagram",
      },
    ],
    documents: [
      {
        id: `doc-custom-1`,
        title: `${cleanName} - AI Generated Lesson Plan.pdf`,
        type: "PDF",
        size: "1.2 MB",
        pagesOrSlides: "3 Pages",
        description: `Complete 45-minute lesson plan tailored with objectives, timing, and assessment rubric for ${cleanName}.`,
        filename: `${cleanName.replace(/\s+/g, "_")}_Lesson_Plan.pdf`,
        previewHighlights: ["Lesson Timelines", "Differentiated Tasks", "Formative Assessment Rubric"],
      },
      {
        id: `doc-custom-2`,
        title: `${cleanName} - Classroom Deck.pptx`,
        type: "PPT",
        size: "3.2 MB",
        pagesOrSlides: "12 Slides",
        description: `Interactive slide deck with diagrams, bullet points, and check-for-understanding slides.`,
        filename: `${cleanName.replace(/\s+/g, "_")}_Presentation.pptx`,
        previewHighlights: ["High Impact Visuals", "Built-in Quiz Slides", "Summary Cards"],
      },
    ],
    pyqs: [
      {
        id: `pyq-custom-1`,
        year: "2023 Sample Board Question",
        examName: "Standard Academic Assessment",
        marks: 4,
        difficulty: "Medium",
        questionText: `Explain the fundamental working principle of ${cleanName} with a neat labeled diagram. State two practical applications in daily life.`,
        solutionSteps: [
          `Definition & Core Law of ${cleanName}: State the primary rule clearly.`,
          "Diagram representation: Label main components accurately.",
          "Applications: 1. Industrial engineering/natural system. 2. Household technology.",
        ],
        markingKey: "[1 Mark for definition] + [1 Mark for diagram] + [2 Marks for two valid applications]",
      },
    ],
  };
}
