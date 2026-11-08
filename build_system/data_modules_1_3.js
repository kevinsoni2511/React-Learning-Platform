/**
 * Modules 1, 2, and 3 Curriculum Data for ReactMastery
 * PART 1: React JS Fundamentals (15 Practical Exercises + Core Topics)
 * PART 2: TypeScript with React (4 Practical Exercises + Core Topics)
 * PART 3: React Hooks - Core & Advanced (5 Practical Exercises + Task Management App + Core Topics)
 */

module.exports = [
  {
    id: "module-1",
    number: 1,
    title: "React JS Fundamentals",
    hindiTitle: "React JS Ki Buniyad (Basics Se Pro)",
    badge: "Core Foundation",
    description: "Learn React from scratch: JSX, Components, Props, State, Refs, Lifecycle, Event Handling, Lists, and Web Storage.",
    lessons: [
      {
        id: "m1-what-is-react",
        title: "1. What is React? (Architecture & Ecosystem)",
        level: "Beginner",
        summary: "Understand React's component-based architecture, Virtual DOM, and why modern web apps use it.",
        intro: "React is an open-source JavaScript library developed by Facebook (Meta) in 2013 for building high-performance, reusable user interfaces. Chaliye samajhte hain ki React kya hai aur yeh traditional DOM manipulation se kaise alag hai.",
        whatIsIt: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces, especially Single Page Applications (SPAs). In simple terms, yeh HTML aur JavaScript ko ek sath combine karke reusable visual building blocks (components) banane ki taqat deta hai.",
        whyNeeded: "Traditional JavaScript (Vanilla JS) me jab bhi data update hota hai, hum direct browser DOM ko touch karte hain (document.getElementById().innerHTML = ...). Ye process bohot slow aur error-prone hota hai as the application grows. React provides a Virtual DOM and automatic re-rendering, jo sirf changed elements ko repaint karta hai. Isse app superfast banti hai.",
        analogy: "Imagine ek restaurant ka menu board. Traditional way me agar 1 dish ka price badalna ho, to poora board mita kar naya board paint karna padta tha. React way me ek digital display hai jisme sirf ek line ka pixel update hota hai bina poore board ko touch kiye!",
        technicalExplanation: "React uses a Virtual DOM (VDOM) - a lightweight in-memory representation of the real DOM. When state changes: 1. React creates a new VDOM tree. 2. React runs a 'Diffing Algorithm' (Reconciliation) to compare the new VDOM with the previous VDOM snapshot. 3. React batches the minimal set of changes and updates the actual Real DOM in one go. Fiber architecture allows React to prioritize urgent updates like user typing over background data fetching.",
        syntax: `// Classic React Functional Component
import React from 'react';

function Greeting({ name }) {
  return (
    <div className="welcome-card">
      <h1>Namaste, {name}!</h1>
      <p>Welcome to the React universe.</p>
    </div>
  );
}

export default Greeting;`,
        codeExplanation: "Line 1: React import karte hain. Line 3: Greeting ek functional component hai jo 'props' object receive karta hai. Line 5: JSX return ho raha hai jo HTML jaisa dikhta hai lekin JS expression evaluate kar sakta hai ({name}).",
        expectedOutput: "Screen displays an attractive welcome card: 'Namaste, Alex! Welcome to the React universe.'",
        practicalImplementation: `// Index root render in React 18
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0284c7' }}>Hello React Developer!</h1>
      <p>React is rendering this dynamically using React 18 createRoot.</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
        commonMistakes: "1. Treating React as a full-fledged MVC framework like Angular. (React is just a view library; routing and state management need extra packages like react-router or redux).\n2. Directly mutating the DOM with document.querySelector inside React components instead of using State.",
        interviewQuestions: [
          {
            q: "What is the difference between Library and Framework? Why is React called a library?",
            a: "A framework dictates the entire architecture and controls the flow (Inversion of Control - framework calls your code). A library is a collection of utilities where your code remains in control and calls the library. React only handles the UI (View layer), letting developers choose router, state store, and build tools freely."
          },
          {
            q: "What is Virtual DOM and how does reconciliation work?",
            a: "Virtual DOM is a lightweight in-memory JS object tree representing the UI. During reconciliation, React diffs two VDOM trees using an O(n) heuristic algorithm (checking keys, element types) and applies only the diff patches to the Real DOM."
          }
        ],
        assignment: "Write a short summary comparing Vanilla JS DOM update vs React Virtual DOM update with an example scenario.",
        quiz: {
          question: "Which algorithm does React use to compare Virtual DOM trees?",
          options: ["Binary Search Algorithm", "Reconciliation / Diffing Algorithm", "Dijkstra Algorithm", "QuickSort Algorithm"],
          answer: 1,
          explanation: "React uses the Reconciliation (Diffing) algorithm to compare the previous Virtual DOM tree with the new one and compute minimal DOM updates."
        },
        codeTemplate: `function App() {
  return (
    <div style={{ padding: '24px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px' }}>
      <h2 style={{ color: '#0f172a' }}>Namaste React!</h2>
      <p style={{ color: '#475569' }}>This is running directly in our live in-browser React engine!</p>
      <button onClick={() => alert('React is working smoothly!')} style={{ padding: '10px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        Click Me
      </button>
    </div>
  );
}
render(<App />);`
      },
      {
        id: "m1-setup-installation",
        title: "2. Installation & Setup (Node.js, npm, Vite vs CRA)",
        level: "Beginner",
        summary: "Set up a professional React workspace with Node, npm, Vite, project structure, and production build.",
        intro: "React application create karne ke liye hume ek build tool aur module bundler ki zaroorat hoti hai. Pehle Create React App (CRA) popular tha, par aaj Vite industry standard ban chuka hai.",
        whatIsIt: "Node.js ek JavaScript runtime environment hai jo browser ke bahar JS run karta hai. npm (Node Package Manager) dependencies install karta hai. Vite ek modern, blazing-fast frontend build tool hai jo Native ES Modules (ESM) use karta hai.",
        whyNeeded: "Browsers directly JSX or TypeScript understand nahi karte. Build tools code ko compile, bundle, minify aur hot-reload (HMR) karte hain taaki aap fast code likhein aur browser compatible JavaScript generate ho.",
        analogy: "Imagine aap raw vegetables (JSX code) se delicious dish bana rahe hain. Vite ek superfast electric kitchen mixer/chopper hai jo sab kuch seconds me prepare karke serve kar deta hai!",
        technicalExplanation: "CRA used Webpack, which bundles the entire application before starting the dev server. Vite uses native browser ES Modules (ESM) and Esbuild (written in Go) for pre-bundling dependencies. Hot Module Replacement (HMR) in Vite is practically instantaneous because it only updates the specific file that changed without re-bundling everything.",
        syntax: `# Create React Project using Vite
npm create vite@latest my-react-app -- --template react
# Or with TypeScript:
npm create vite@latest my-react-app -- --template react-ts

cd my-react-app
npm install
npm run dev`,
        codeExplanation: "1. `npm create vite@latest` Vite project scaffolding trigger karta hai. 2. `npm install` package.json ke sabhi packages install karta hai. 3. `npm run dev` local development server start karta hai (usually at http://localhost:5173).",
        expectedOutput: "Vite dev server starts in ~200ms with URL `http://localhost:5173`. Browser opens displaying the React + Vite starter logo.",
        practicalImplementation: `// Typical modern Vite Project Structure:
// ├── index.html          <- Entry HTML file
// ├── vite.config.js      <- Vite configuration plugins
// ├── package.json        <- Project dependencies and scripts
// └── src/
//     ├── main.jsx        <- React root ReactDOM.createRoot
//     ├── App.jsx         <- Root parent component
//     ├── components/     <- Reusable UI components
//     └── assets/         <- Images and static styles`,
        commonMistakes: "1. Installing Node.js without LTS (Long Term Support). Always prefer LTS version for stability.\n2. Modifying files inside node_modules directly. (These are wiped out when npm install runs).\n3. Forgetting to install dependencies after git clone.",
        interviewQuestions: [
          {
            q: "Why is Vite significantly faster than Create React App (CRA)?",
            a: "CRA uses Webpack which bundles the whole project into memory before serving. Vite serves source files over native ESM directly to modern browsers and compiles on demand using esbuild (written in Go, which is 10-100x faster than JS-based bundlers)."
          },
          {
            q: "What is the purpose of package-lock.json?",
            a: "package-lock.json locks down the exact version, sub-dependencies, and hashes of every package installed to ensure consistent builds across different machines and deployment environments."
          }
        ],
        assignment: "Open your terminal and run `npm create vite@latest test-app -- --template react`. Explore the generated `package.json` file.",
        quiz: {
          question: "Which technology allows Vite to provide instant server start without initial bundling?",
          options: ["Native ES Modules (ESM)", "Webpack 4", "Babel CLI", "Gulp Streams"],
          answer: 0,
          explanation: "Vite serves source code over native ES Modules (ESM), allowing the browser to take over part of the bundling work."
        },
        codeTemplate: `function ProjectExplorer() {
  const [currentFile, setCurrentFile] = React.useState('src/App.jsx');
  const files = {
    'src/App.jsx': '// Root React Component\\nexport default function App() {\\n  return <h1>Vite + React</h1>;\\n}',
    'package.json': '{\\n  "name": "my-app",\\n  "dependencies": {\\n    "react": "^18.2.0"\\n  }\\n}',
    'vite.config.js': '// Config plugins\\nimport { defineConfig } from "vite";\\nimport react from "@vitejs/plugin-react";\\nexport default defineConfig({ plugins: [react()] });'
  };

  return (
    <div style={{ padding: '16px', background: '#0f172a', color: '#f8fafc', borderRadius: '10px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {Object.keys(files).map(f => (
          <button key={f} onClick={() => setCurrentFile(f)} style={{
            padding: '6px 12px', background: currentFile === f ? '#2563eb' : '#334155',
            color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
          }}>{f}</button>
        ))}
      </div>
      <pre style={{ margin: 0, padding: '12px', background: '#1e293b', borderRadius: '6px', overflowX: 'auto' }}>
        {files[currentFile]}
      </pre>
    </div>
  );
}
render(<ProjectExplorer />);`
      },
      {
        id: "m1-jsx-and-rendering",
        title: "3. JSX Syntax, Expressions & Rendering HTML",
        level: "Beginner",
        summary: "Master JSX rules, JavaScript expressions inside HTML, fragments, and how React renders under the hood.",
        intro: "JSX (JavaScript XML) React ka sabse powerful feature hai jo hume JS ke andar HTML syntax likhne ki aazadi deta hai.",
        whatIsIt: "JSX stands for JavaScript XML. Yeh na to pure HTML hai, na hi plain string. Yeh ek syntax extension hai jo Babel dwara React.createElement() calls me transpile hoti hai.",
        whyNeeded: "Traditional web development me HTML aur JS alag alag files me hote the (separation of technologies). Par modern UI me logic aur presentation tightly coupled hote hain. JSX allows developers to keep logic and template in one cohesive component.",
        analogy: "Jaise sandwich me bread (HTML structure) aur cheese/sauce (JS logic) ek sath milkar ek complete dish banate hain, vaise hi JSX dono ko seamlessly blend karta hai.",
        technicalExplanation: "Under the hood, `<h1 className='title'>Hi</h1>` gets compiled to `React.createElement('h1', { className: 'title' }, 'Hi')`. In React 17+ with the new JSX transform, it converts to `_jsx('h1', { className: 'title', children: 'Hi' })` without needing to import React explicitly. JSX requires: 1. Single root element (or Fragment `<>...</>`). 2. CamelCase attributes (`className`, `htmlFor`, `tabIndex`). 3. Self-closing tags (`<img />`, `<input />`).",
        syntax: `const userName = 'Priya';
const isPremium = true;

// Embedded expressions inside curly braces {}
const element = (
  <div className="user-badge">
    <h2>Hello, {userName.toUpperCase()}!</h2>
    <p>Account: {isPremium ? '💎 VIP Member' : 'Regular'}</p>
    <p>Math Calculation: 10 + 20 = {10 + 20}</p>
  </div>
);`,
        codeExplanation: "Curly braces {} act as an escape hatch into JavaScript world. Inside {}, aap koi bhi valid JavaScript expression (variables, function calls, ternary operator, math) likh sakte hain.",
        expectedOutput: "User badge displaying 'Hello, PRIYA!', 'Account: 💎 VIP Member', and 'Math Calculation: 10 + 20 = 30'.",
        practicalImplementation: `function ProfileCard() {
  const user = {
    name: 'Rohit Sharma',
    role: 'Full Stack Engineer',
    skills: ['React', 'TypeScript', 'Redux', 'Node.js']
  };

  return (
    <div className="card" style={{ border: '1px solid #cbd5e1', padding: '16px', borderRadius: '8px' }}>
      <h3 style={{ margin: 0, color: '#1e293b' }}>{user.name}</h3>
      <p style={{ color: '#64748b' }}>{user.role}</p>
      <div style={{ display: 'flex', gap: '6px' }}>
        {user.skills.map(skill => (
          <span key={skill} style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}`,
        commonMistakes: "1. Writing class='btn' instead of className='btn'. (class is a reserved keyword in JS).\n2. Trying to render multiple adjacent elements without a parent container or <React.Fragment> / <>.\n3. Putting JavaScript statements (like if-else or for loops) directly inside {} instead of expressions.",
        interviewQuestions: [
          {
            q: "Why can't we write an if statement directly inside JSX curly braces?",
            a: "Curly braces {} in JSX only accept JavaScript *expressions* (code that evaluates to a single value, like ternary cond ? a : b). An if statement is a statement, which does not evaluate to a value."
          },
          {
            q: "What is React Fragment (<>...</>) and why do we use it?",
            a: "Fragments let you group a list of children without adding extra unnecessary DOM nodes (like extra <div>), which preserves CSS layout hierarchy and table markup integrity."
          }
        ],
        assignment: "Create a JSX snippet with a user status indicator that uses ternary operator to display green 'Online' or red 'Offline'.",
        quiz: {
          question: "What is JSX transpiled into under the hood?",
          options: ["Direct machine code", "React.createElement() or _jsx() function calls", "CSS Stylesheets", "SQL queries"],
          answer: 1,
          explanation: "Babel compiles JSX into React.createElement() or modern _jsx runtime calls which generate VDOM object nodes."
        },
        codeTemplate: `function DynamicJSXDemo() {
  const [count, setCount] = React.useState(5);
  const discount = count > 3 ? 20 : 5;

  return (
    <div style={{ padding: '20px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px' }}>
      <h3 style={{ color: '#166534' }}>Shopping Cart Calculator</h3>
      <p>Items in cart: <strong>{count}</strong></p>
      <p>Eligible Discount: <strong style={{ color: '#15803d' }}>{discount}% OFF</strong></p>
      <div style={{ marginTop: '12px' }}>
        <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', marginRight: '8px', cursor: 'pointer' }}>
          + Add Item
        </button>
        <button onClick={() => setCount(c => Math.max(0, c - 1))} style={{ padding: '8px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          - Remove Item
        </button>
      </div>
    </div>
  );
}
render(<DynamicJSXDemo />);`
      },
      {
        id: "m1-functional-vs-class",
        title: "4. Components: Functional vs Class Components",
        level: "Beginner",
        summary: "Understand component architecture, legacy Class components, modern Functional components, and why Hooks won.",
        intro: "React components application ke reusable Lego blocks hain. Pehle Class components use hote the, par React 16.8 me Hooks aane ke baad Functional components industry standard ban gaye.",
        whatIsIt: "A Functional Component is simply a plain JavaScript function that accepts props as an argument and returns JSX. A Class Component is an ES6 class that extends React.Component and implements a mandatory render() method.",
        whyNeeded: "Legacy codebases me lakhon Class components likhe gaye hain, isliye job interview aur real production projects ke maintenance ke liye dono ka antar pata hona zaroori hai.",
        analogy: "Class component ek heavy desktop computer jaisa hai jisme CPU, monitor, UPS sab alag sambhalna padta hai (this, binding, lifecycle). Functional component ek sleek lightweight laptop jaisa hai jo Hooks ke zariye saara kaam bina jhanjhat ke karta hai.",
        technicalExplanation: "Functional components do not instantiate a class instance or hold a this context; they run top-to-bottom on each render. Hooks leverage JavaScript closures to preserve state between renders. Class components instantiate a class object, requiring this.state, this.setState, and manual method binding in constructors to avoid losing this in callbacks.",
        syntax: `// 1. Functional Component (Modern)
const ModernButton = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// 2. Class Component (Legacy)
class LegacyButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.label}</button>;
  }
}`,
        codeExplanation: "Functional component me props seedhe arguments me aate hain. Class component me props this.props se access hote hain aur UI render() method ke andar se return hoti hai.",
        expectedOutput: "Both components render identical HTML button elements, but functional components use far less boilerplate code.",
        practicalImplementation: `// Side-by-side comparison with State
// Functional with useState
function ModernCounter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// Class with this.state
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return <button onClick={this.increment}>Count: {this.state.count}</button>;
  }
}`,
        commonMistakes: "1. Forgetting this.increment = this.increment.bind(this) in Class component constructor, causing TypeError: Cannot read properties of undefined (reading 'setState').\n2. Trying to use Hooks (useState, useEffect) inside a Class component. (Hooks only work in Functional components!).",
        interviewQuestions: [
          {
            q: "Why did React introduce Hooks instead of keeping Class components?",
            a: "Class components had hard-to-reuse stateful logic (leading to HOC wrapper hell), confusing this binding, fragmented lifecycle logic (e.g. subscribing in componentDidMount and unsubscribing in componentWillUnmount), and were harder for minifiers and compilers to optimize."
          },
          {
            q: "Can you mix Class components and Functional components in the same application?",
            a: "Yes! React fully supports using both together. A Functional component can render a Class component, and a Class component can render a Functional component."
          }
        ],
        assignment: "Convert a simple Class component that displays a clock timer into a modern Functional component using useEffect.",
        quiz: {
          question: "Which method is mandatory in every React Class component?",
          options: ["constructor()", "render()", "componentDidMount()", "getInitialState()"],
          answer: 1,
          explanation: "The render() method is the only mandatory method in a React Class component."
        },
        codeTemplate: `function FunctionalCounter() {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ padding: '12px', background: '#dbeafe', borderRadius: '8px', marginBottom: '10px' }}>
      <h4 style={{ margin: '0 0 6px 0', color: '#1e40af' }}>Functional Component (Modern)</h4>
      <p>Clicks: {count}</p>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>
        Increment Hook
      </button>
    </div>
  );
}

class ClassCounterDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    return (
      <div style={{ padding: '12px', background: '#fef3c7', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#92400e' }}>Class Component (Legacy)</h4>
        <p>Clicks: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })} style={{ padding: '6px 12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '6px' }}>
          Increment this.state
        </button>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <FunctionalCounter />
      <ClassCounterDemo />
    </div>
  );
}
render(<App />);`
      },
      {
        id: "m1-props-and-proptypes",
        title: "5. Props & PropTypes (Data Flow & Validation)",
        level: "Beginner",
        summary: "Master unidirectional data flow, destructuring props, default props, children prop, and runtime validation.",
        intro: "Props (Properties) React me parent component se child component tak data pass karne ka primary tarika hain.",
        whatIsIt: "Props are read-only (immutable) inputs passed from a parent component to a child component. PropTypes is a runtime type-checking mechanism provided by the prop-types library to catch wrong data types during development.",
        whyNeeded: "Components ko dynamic aur reusable banane ke liye props zaroori hain. Bina props ke har button ya card hardcoded ban banana padega.",
        analogy: "Props bilkul function arguments ki tarah hain. Jaise add(a, b) me aap values pass karte hain, vaise hi <UserCard name='Amit' age={25} /> me React component ko arguments pass hote hain.",
        technicalExplanation: "React enforces strict Unidirectional Data Flow (one-way data binding) from parent to child down the component tree. Props are pure and frozen (Object.freeze); a child component must NEVER mutate its own props directly. If a child needs to communicate back to the parent, the parent passes a callback function via props.",
        syntax: `// Destructuring Props with Default Values
function Badge({ label, type = 'info', count = 0 }) {
  return (
    <span className={"badge badge-" + type}>
      {label} ({count})
    </span>
  );
}

// PropTypes Definition
Badge.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'danger']),
  count: PropTypes.number
};`,
        codeExplanation: "label, type, count ko destructuring syntax se extract kiya gaya hai. type = 'info' default value provide karta hai agar parent pass na kare. PropTypes ensure karta hai ki label string ho aur mandatory ho.",
        expectedOutput: "A customized badge rendered with proper colors and counter badge count.",
        practicalImplementation: `function ProductItem({ product, onAddToCart }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #e2e8f0' }}>
      <span>{product.name} - \${product.price}</span>
      <button onClick={() => onAddToCart(product.id)} style={{ padding: '4px 8px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Add
      </button>
    </div>
  );
}`,
        commonMistakes: "1. Attempting to modify props: props.title = 'New Title'. (Throws error or creates unpredictable state bugs! Props are strictly read-only).\n2. Forgetting that numbers and booleans must be wrapped in {}: <Card count='10' /> passes a string, while <Card count={10} /> passes a number.",
        interviewQuestions: [
          {
            q: "What is 'Props Drilling' and how can it be avoided?",
            a: "Props drilling occurs when data has to be passed through several intermediate components that don't need the data themselves, just to reach a deeply nested child. It can be solved using React Context API, State Management libraries (Redux, Zustand), or Component Composition (children prop)."
          },
          {
            q: "What is the special 'children' prop?",
            a: "The children prop represents the content placed between the opening and closing tags of a component (<Modal><h1>Title</h1></Modal>). It allows components to act as generic layout containers."
          }
        ],
        assignment: "Build an AlertBox component that accepts props type ('warning', 'error', 'success') and children for the alert message.",
        quiz: {
          question: "Can a child component change the value of its props directly?",
          options: ["Yes, anytime", "No, props are read-only and immutable", "Only if it is a Class component", "Only if PropTypes are omitted"],
          answer: 1,
          explanation: "Props are strictly read-only in React. Modifying them violates unidirectional data flow."
        },
        codeTemplate: `function StudentCard({ name, rollNo, score, status = 'Enrolled' }) {
  const isPassed = score >= 50;
  return (
    <div style={{ padding: '14px', margin: '8px 0', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>{name} (Roll: {rollNo})</h4>
      <p style={{ margin: '4px 0', color: '#475569' }}>Exam Score: <strong>{score}/100</strong></p>
      <span style={{
        display: 'inline-block', padding: '3px 8px', borderRadius: '999px', fontSize: '12px',
        background: isPassed ? '#dcfce7' : '#fee2e2', color: isPassed ? '#15803d' : '#b91c1c'
      }}>
        {isPassed ? '✓ Passed' : '✗ Needs Improvement'} ({status})
      </span>
    </div>
  );
}

function App() {
  return (
    <div>
      <StudentCard name="Aarav Sharma" rollNo={101} score={88} />
      <StudentCard name="Sneha Patel" rollNo={102} score={42} />
    </div>
  );
}
render(<App />);`
      },
      {
        id: "m1-state-and-usestate",
        title: "6. State & useState (Internal Dynamic Data)",
        level: "Beginner",
        summary: "Understand component memory, useState hook, functional updates, state batching, and immutability.",
        intro: "Props bahar se aate hain, par component ka apna personal data jo time ke sath change ho sake, use 'State' kehte hain.",
        whatIsIt: "State is a component's private internal memory. Jab bhi state change hoti hai, React automatically component ko re-render karta hai aur UI ko updated data ke sath reflect karta hai.",
        whyNeeded: "Bina state ke webpage static dead HTML jaisa rahega. User clicks, form typing, shopping cart total, popups open/close - sabhi interactive features State par depend karte hain.",
        analogy: "Aapka smartphone ek component hai. Uska brand name ya IMEI number 'props' hai (change nahi hota). Par battery level, Wi-Fi status, aur volume 'state' hai jo use ke hisab se dynamically change hoti rehti hai!",
        technicalExplanation: "The useState hook returns an array of two elements: [currentStateValue, stateUpdaterFunction]. In React 18, state updates are automatically batched across event handlers, promises, and timeouts to minimize redundant re-renders. If new state depends on previous state, always pass an updater function setCount(prev => prev + 1).",
        syntax: `import { useState } from 'react';

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(prev => !prev);
  };

  return (
    <button onClick={handleToggle}>
      {isOn ? 'ON 🟢' : 'OFF 🔴'}
    </button>
  );
}`,
        codeExplanation: "useState(false) initial value false deta hai. setIsOn ko call karne par React component ko re-render karta hai aur updated isOn value display hoti hai.",
        expectedOutput: "Clicking the button smoothly switches between 'ON 🟢' and 'OFF 🔴'.",
        practicalImplementation: `function UserProfileForm() {
  const [user, setUser] = React.useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <p>Preview: {user.name} ({user.email})</p>
    </div>
  );
}`,
        commonMistakes: "1. Mutating state directly: user.name = 'Raj'. React won't re-render because object reference didn't change! Always pass a new copy setUser({ ...user, name: 'Raj' }).\n2. Expecting state to update immediately on the next line: setCount(count + 1); console.log(count); (Prints old value because state updates are asynchronous).",
        interviewQuestions: [
          {
            q: "What is Automatic Batching in React 18?",
            a: "In React 18, multiple state updates inside promises, setTimeout, or native event handlers are grouped into a single re-render, whereas React 17 only batched updates inside React synthetic event handlers."
          },
          {
            q: "Why must state updates be immutable in React?",
            a: "React compares previous and next states by shallow object reference (prevObj !== nextObj). If you mutate the object directly in memory, the reference remains the same, so React skips re-rendering."
          }
        ],
        assignment: "Create a counter with 3 buttons: +5, -5, and Reset to 0.",
        quiz: {
          question: "If you call setCount(c => c + 1) three times in an event handler, what happens?",
          options: ["Count increments by 1", "Count increments by 3", "React throws an error", "Browser crashes"],
          answer: 1,
          explanation: "Because functional updater functions receive the latest pending state from the queue, each callback increments the count sequentially, increasing it by 3."
        },
        codeTemplate: `function InteractiveCounter() {
  const [count, setCount] = React.useState(0);
  const [history, setHistory] = React.useState([]);

  const update = (delta) => {
    setCount(prev => {
      const next = prev + delta;
      setHistory(h => [next, ...h.slice(0, 4)]);
      return next;
    });
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: 0, color: '#0f172a' }}>Interactive State Lab</h3>
      <div style={{ fontSize: '36px', fontWeight: 'bold', color: count >= 0 ? '#16a34a' : '#dc2626', margin: '12px 0' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => update(1)} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+1 Increment</button>
        <button onClick={() => update(-1)} style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>-1 Decrement</button>
        <button onClick={() => { setCount(0); setHistory([]); }} style={{ padding: '8px 16px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Reset</button>
      </div>
      <div style={{ fontSize: '13px', color: '#64748b' }}>
        Recent values: {history.length ? history.join(' → ') : 'No moves yet'}
      </div>
    </div>
  );
}
render(<InteractiveCounter />);`
      },
      {
        id: "m1-refs-useref-forwardref",
        title: "7. Refs (useRef, forwardRef, createRef)",
        level: "Intermediate",
        summary: "Access DOM nodes directly, persist mutable values without triggering re-renders, and forward refs.",
        intro: "React me zyada tar kaam declarative state se hota hai, par kabhi kabhi browser ke real DOM element ko directly touch karna padta hai (focus, scroll, animations). Vahan Refs kaam aate hain.",
        whatIsIt: "useRef ek React hook hai jo ek mutable object { current: initialValue } return karta hai. Iske .current ko change karne se component re-render NAHI hota.",
        whyNeeded: "Agar aap input field ko auto-focus karna chahte hain, video play/pause control karna chahte hain, ya timer ID track karna chahte hain bina re-render trigger kiye, to useRef use hota hai.",
        analogy: "State ek public bulletin board jaisa hai: jab update hota hai to sab re-render hote hain. useRef aapki jeb ka personal diary note hai: kisi ko pata nahi chalta!",
        technicalExplanation: "React attaches the actual DOM element reference to ref.current during commit phase. forwardRef allows a parent component to pass a ref down through a child to an underlying native DOM element.",
        syntax: `// 1. DOM access with useRef
const inputRef = useRef(null);
const focusInput = () => inputRef.current.focus();

// 2. Passing ref to Child with forwardRef
const CustomInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} className="styled-input" />
));`,
        codeExplanation: "inputRef initialize hua null ke sath. JSX me <input ref={inputRef} /> lagane par browser input element inputRef.current ban jata hai.",
        expectedOutput: "Clicking the 'Focus Input' button immediately places the keyboard cursor inside the input field.",
        practicalImplementation: `function Stopwatch() {
  const [seconds, setSeconds] = React.useState(0);
  const timerRef = React.useRef(null);

  const start = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div>
      <h2>Seconds: {seconds}</h2>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}`,
        commonMistakes: "1. Reading or writing ref.current during rendering JSX. (Only access refs in effects or event handlers).\n2. Using useRef when the UI needs to update on value change. (Use useState for visual updates).",
        interviewQuestions: [
          {
            q: "What is the key difference between useState and useRef?",
            a: "useState causes a re-render when its value changes, whereas mutating useRef.current persists across renders without triggering a re-render."
          },
          {
            q: "Why is forwardRef required when passing refs to custom components?",
            a: "By default, React does not allow custom function components to receive a ref prop. React.forwardRef explicitly allows a component to expose an internal DOM node to its parent."
          }
        ],
        assignment: "Build an auto-scrolling chat box that automatically scrolls to the bottom using useRef and scrollIntoView().",
        quiz: {
          question: "What happens to the UI when you update ref.current?",
          options: ["Component re-renders immediately", "Component will NOT re-render", "React throws a DOMException", "All state is reset"],
          answer: 1,
          explanation: "Mutating ref.current does not trigger a re-render."
        },
        codeTemplate: `function InputFocusLab() {
  const inputRef = React.useRef(null);
  const clickCounter = React.useRef(0);
  const [status, setStatus] = React.useState('Ready');

  const handleFocus = () => {
    inputRef.current.focus();
    inputRef.current.style.borderColor = '#2563eb';
    clickCounter.current += 1;
    setStatus("Focused " + clickCounter.current + " times");
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>DOM Ref & Counter Demo</h3>
      <input
        ref={inputRef}
        placeholder="Type something..."
        style={{ padding: '10px 14px', border: '2px solid #cbd5e1', borderRadius: '6px', width: '240px', marginRight: '10px', outline: 'none' }}
      />
      <button onClick={handleFocus} style={{ padding: '10px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Focus Input via Ref
      </button>
      <p style={{ color: '#64748b', fontSize: '13px', marginTop: '8px' }}>Status: {status}</p>
    </div>
  );
}
render(<InputFocusLab />);`
      },
      {
        id: "m1-lifecycle-and-useeffect",
        title: "8. Component Lifecycle & useEffect Equivalents",
        level: "Intermediate",
        summary: "Master Mounting, Updating, Unmounting, and how useEffect unifies all three lifecycle phases.",
        intro: "Har React component ka ek jeevanchakra (lifecycle) hota hai: Paida hona (Mount), badalna (Update), aur khatam hona (Unmount).",
        whatIsIt: "Component Lifecycle refers to the phases a component transitions through in the DOM: 1. Mounting (DOM me insert). 2. Updating (Props/State change). 3. Unmounting (DOM se remove). useEffect hook functional components me in teeno ko handle karta hai.",
        whyNeeded: "API data fetch karna, timers setup karna, listeners lagana, aur cleanup karna lifecycle management ke bina impossible hai.",
        analogy: "Jaise ek insaan room me enter karta hai (Mount), activities karta hai (Update), aur room se bahar jaate waqt fan/light band karke nikalta hai (Cleanup/Unmount).",
        technicalExplanation: "1. useEffect(() => {}, []): Runs once after initial mount (componentDidMount). 2. useEffect(() => {}, [val]): Runs when val changes (componentDidUpdate). 3. useEffect(() => { return () => cleanup(); }, []): Cleanup function runs before unmount (componentWillUnmount).",
        syntax: `import { useEffect, useState } from 'react';

function WindowSizeWatcher() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>Window width: {width}px</div>;
}`,
        codeExplanation: "useEffect callback me window event listener attach kiya gaya. Return statement me cleanup function diya gaya jo listener ko remove karta hai taaki memory leak na ho.",
        expectedOutput: "The screen dynamically shows the live browser window width whenever resized.",
        practicalImplementation: `// Class vs useEffect mapping:
// componentDidMount -> useEffect(() => { ... }, [])
// componentDidUpdate -> useEffect(() => { ... }, [propOrState])
// componentWillUnmount -> useEffect(() => { return () => { ... } }, [])`,
        commonMistakes: "1. Forgetting cleanup function when setting up intervals or event listeners, leading to memory leaks.\n2. Omitting dependencies from the dependency array, causing stale closure bugs.",
        interviewQuestions: [
          {
            q: "What happens if you do NOT provide a dependency array in useEffect?",
            a: "The effect runs after every single render (both initial mount and every subsequent state/prop update), which can easily lead to serious performance issues or infinite loops."
          },
          {
            q: "Why does useEffect run twice on mount in React 18 Development mode?",
            a: "In React 18 Strict Mode, React intentionally mounts, unmounts, and re-mounts components in development to help developers catch missing effect cleanups and race conditions."
          }
        ],
        assignment: "Write a useEffect hook that creates an interval counting down from 10 to 0 with proper cleanup.",
        quiz: {
          question: "When does the cleanup function returned from useEffect execute?",
          options: ["Only when browser closes", "Before the component unmounts and before the effect runs again", "Right before the initial render", "Never in functional components"],
          answer: 1,
          explanation: "The cleanup function executes right before the component unmounts and before subsequent effect runs to clean up resources."
        },
        codeTemplate: `function LifecycleDemo() {
  const [timer, setTimer] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);

  React.useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Live Lifecycle Clock: {timer}s</h3>
      <button
        onClick={() => setIsRunning(r => !r)}
        style={{ padding: '8px 16px', background: isRunning ? '#ef4444' : '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        {isRunning ? 'Pause & Trigger Cleanup' : 'Resume Timer'}
      </button>
      <button
        onClick={() => setTimer(0)}
        style={{ marginLeft: '8px', padding: '8px 16px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Reset
      </button>
    </div>
  );
}
render(<LifecycleDemo />);`
      },
      {
        id: "m1-events-and-syntheticevent",
        title: "9. Events & SyntheticEvent (Handling User Actions)",
        level: "Beginner",
        summary: "Master onClick, onChange, onSubmit, event propagation, preventDefault, and cross-browser SyntheticEvent.",
        intro: "React me user interactions ko handle karne ke liye Synthetic Events ka use hota hai.",
        whatIsIt: "A SyntheticEvent is React's cross-browser wrapper around the browser's native event. It has the exact same interface as native events (stopPropagation, preventDefault), but functions identically across Chrome, Firefox, Safari, and Edge.",
        whyNeeded: "Different browsers historically had slightly different event properties. SyntheticEvent standardizes event handling across all platforms seamlessly.",
        analogy: "Jaise international travel me ek universal power adapter har country ke plug socket me fit ho jata hai, vaise hi SyntheticEvent har browser ke native event ko standard interface me convert karta hai.",
        technicalExplanation: "React uses Event Delegation. In React 17+, React attaches event listeners to the root DOM container (#root). When an event occurs on a button, it bubbles up to the root, where React wraps it in a pooled SyntheticEvent and invokes your handler.",
        syntax: `function FormExample() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents full page reload
    console.log('Form submitted safely');
  };

  const handleClick = (e, id) => {
    e.stopPropagation(); // Stops event bubbling
    console.log('Clicked item:', id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={(e) => handleClick(e, 42)}>Submit</button>
    </form>
  );
}`,
        codeExplanation: "e.preventDefault() browser ke default form refresh behavior ko rokta hai. Parameter pass karne ke liye arrow function (e) => handleClick(e, 42) use kiya gaya.",
        expectedOutput: "Form submits without refreshing the page and logs the expected data to console.",
        practicalImplementation: `function SearchBar() {
  const [query, setQuery] = React.useState('');
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search React topics..."
      />
      <button onClick={() => alert('Searching for: ' + query)}>Search</button>
    </div>
  );
}`,
        commonMistakes: "1. Calling the function immediately instead of passing a callback: onClick={handleClick()} fires on render, not on click! Use onClick={handleClick}.\n2. Using lowercase event names like onclick instead of camelCase onClick.",
        interviewQuestions: [
          {
            q: "What is the difference between native DOM events and React SyntheticEvents?",
            a: "Native events are attached to individual DOM nodes with browser-specific quirks. React SyntheticEvents are normalized cross-browser wrappers attached via event delegation to the root container."
          },
          {
            q: "Why is e.preventDefault() crucial in React form submissions?",
            a: "Browsers by default reload the page on form submission. e.preventDefault() halts this default action so React can manage form submission asynchronously."
          }
        ],
        assignment: "Create a parent div and child button. Demonstrate event bubbling and how e.stopPropagation() stops the parent div click handler from triggering.",
        quiz: {
          question: "In React 18, where are event listeners delegated?",
          options: ["Directly on document", "On the root DOM container (e.g. #root)", "On window", "On each individual button node"],
          answer: 1,
          explanation: "Starting in React 17+, event listeners are delegated to the root DOM container where ReactDOM.createRoot is called."
        },
        codeTemplate: `function EventBubblingDemo() {
  const [log, setLog] = React.useState([]);
  const addLog = (msg) => setLog(l => [msg, ...l.slice(0, 3)]);

  return (
    <div
      onClick={() => addLog('Parent Container Clicked!')}
      style={{ padding: '24px', background: '#eff6ff', border: '2px dashed #3b82f6', borderRadius: '10px', cursor: 'pointer' }}
    >
      <h4 style={{ margin: '0 0 10px 0', color: '#1e40af' }}>Parent Container (Click anywhere here)</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={(e) => {
            addLog('Button 1 Clicked (Bubbles up to Parent)');
          }}
          style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}
        >
          Normal Click (Bubbles)
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addLog('Button 2 Clicked (stopPropagation called!)');
          }}
          style={{ padding: '8px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px' }}
        >
          Stopped Bubbling
        </button>
      </div>
      <div style={{ marginTop: '14px', background: '#fff', padding: '10px', borderRadius: '6px', fontSize: '13px' }}>
        <strong>Event Logs:</strong>
        {log.map((entry, i) => <div key={i} style={{ color: '#475569' }}>• {entry}</div>)}
      </div>
    </div>
  );
}
render(<EventBubblingDemo />);`
      },
      {
        id: "m1-conditional-rendering",
        title: "10. Conditional Rendering (if, ternary, &&, switch)",
        level: "Beginner",
        summary: "Render UI dynamically based on conditions using ternary operator, logical AND, and early returns.",
        intro: "React me user logged in hai ya logged out, data load ho raha hai ya error aaya hai - ye sab conditional rendering ke through decide hota hai.",
        whatIsIt: "Conditional Rendering in React works the exact same way conditions work in JavaScript: based on state or props values, you decide which JSX elements to return to the screen.",
        whyNeeded: "Real applications me loading spinners, error banners, auth gates, aur toggleable modals conditionally render kiye jaate hain.",
        analogy: "Jaise traffic light pe Red hone par STOP sign aur Green hone par GO sign dikhta hai, vaise hi variable value ke basis par alag alag UI display hoti hai.",
        technicalExplanation: "React supports 4 primary conditional rendering patterns: 1. If-Else statements (outside JSX). 2. Ternary operator condition ? <A /> : <B />. 3. Logical AND condition && <A />. 4. Switch-case for multi-state flows.",
        syntax: `// 1. Ternary Operator
const UserGreeting = ({ isLoggedIn }) => (
  <div>{isLoggedIn ? <Dashboard /> : <LoginForm />}</div>
);

// 2. Logical AND
const Notification = ({ count }) => (
  <div>{count > 0 && <span className="badge">{count}</span>}</div>
);`,
        codeExplanation: "Ternary operator do options me se ek choose karta hai. Logical AND && tabhi right-hand side ko render karta hai jab left-hand side truthy ho.",
        expectedOutput: "Dashboard appears when logged in; Login form appears when logged out.",
        practicalImplementation: `function StatusGate({ status }) {
  switch (status) {
    case 'loading':
      return <div className="spinner">Loading data...</div>;
    case 'error':
      return <div className="alert error">Failed to load!</div>;
    case 'success':
      return <div className="content">Data loaded successfully!</div>;
    default:
      return null;
  }
}`,
        commonMistakes: "1. Writing count && <Component /> when count is 0. (In JavaScript, 0 && <Component /> evaluates to 0, rendering the number 0 on screen!). Use count > 0 && <Component />.\n2. Returning undefined from a component instead of null or JSX.",
        interviewQuestions: [
          {
            q: "What is the gotcha with using the '&&' operator with numbers like 0 in React?",
            a: "Because JavaScript short-circuits 0 && ... to 0, React renders the literal number 0. Fix it by using count > 0 && ... or Boolean(count) && ...."
          },
          {
            q: "What should a component return if it wants to render nothing at all?",
            a: "A component should return null."
          }
        ],
        assignment: "Build a toggle component with a button 'Show Secret / Hide Secret' using conditional rendering.",
        quiz: {
          question: "What is rendered when: {0 && <span>Hello</span>}?",
          options: ["Nothing", "The number 0", "Hello", "An error is thrown"],
          answer: 1,
          explanation: "Because 0 is falsy, JavaScript evaluates 0 && anything as 0, and React renders the literal number 0."
        },
        codeTemplate: `function ConditionalAuthDemo() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [role, setRole] = React.useState('user');

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ margin: 0 }}>User Auth & Role Gate</h3>
        <button
          onClick={() => setIsLoggedIn(l => !l)}
          style={{ padding: '6px 14px', background: isLoggedIn ? '#ef4444' : '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>

      {isLoggedIn ? (
        <div style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#166534' }}>Welcome Back, Senior Dev!</h4>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '13px', marginRight: '8px' }}>Select Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '4px 8px', borderRadius: '4px' }}>
              <option value="user">Regular User</option>
              <option value="admin">System Admin</option>
            </select>
          </div>
          {role === 'admin' && (
            <div style={{ padding: '8px 12px', background: '#fef3c7', color: '#92400e', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>
              ⚡ Super Admin Panel Access Granted!
            </div>
          )}
        </div>
      ) : (
        <div style={{ padding: '14px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', color: '#9f1239' }}>
          🔒 Please log in to access your secure dashboard.
        </div>
      )}
    </div>
  );
}
render(<ConditionalAuthDemo />);`
      },
      {
        id: "m1-lists-map-and-keys",
        title: "11. Lists, Keys, Array Filter & Reduce",
        level: "Beginner",
        summary: "Render dynamic lists using Array.map(), understand the vital role of the key prop, and filter/reduce data.",
        intro: "Web applications me products, messages, tweets sab arrays of objects hote hain. React me inko render karne ke liye map(), filter(), aur reduce() methods ka use hota hai.",
        whatIsIt: "In React, we use standard JavaScript Array methods to transform data arrays into lists of JSX elements. The key prop is a special string attribute that React uses to identify which items have changed, been added, or removed.",
        whyNeeded: "Bina dynamic list rendering ke e-commerce catalogues ya feeds nahi ban sakti. Aur bina key prop ke React pure DOM ko re-render karega jab bhi ek item add/remove hogi.",
        analogy: "Key ek student ke unique Roll Number jaisi hai. Unique ID hone par koi confusion nahi hota jab students seats change karte hain!",
        technicalExplanation: "During reconciliation, React matches children using key. When keys are stable and unique (database IDs), React performs reordering, insertions, and deletions with minimal DOM mutations. Using array index as key breaks when lists are sorted or filtered.",
        syntax: `const products = [
  { id: 'p1', name: 'MacBook M3', price: 1200 },
  { id: 'p2', name: 'Logitech Mouse', price: 40 }
];

const ProductList = () => (
  <ul>
    {products.map(product => (
      <li key={product.id}>{product.name} - \${product.price}</li>
    ))}
  </ul>
);`,
        codeExplanation: "products.map() har product object ko ek <li> JSX element me transform karta hai. Har <li> ko unique key={product.id} assign ki gayi hai.",
        expectedOutput: "Unordered list displaying all products with correct names and prices.",
        practicalImplementation: `function CartSummary({ items, filterQuery }) {
  const filtered = items.filter(item => 
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );
  const total = filtered.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <p>Total Items: {filtered.length}</p>
      <p>Grand Total: \${total.toFixed(2)}</p>
    </div>
  );
}`,
        commonMistakes: "1. Using index as key for lists that can be reordered, sorted, or deleted.\n2. Forgetting to return JSX from map() (e.g. using {} without return keyword).",
        interviewQuestions: [
          {
            q: "Why is using array index as key considered an anti-pattern in dynamic lists?",
            a: "If the list order changes (sorting, deleting, inserting items at the top), the indices change for all elements. React associates existing component states and DOM nodes with the wrong items, leading to severe rendering bugs."
          },
          {
            q: "Can you use Math.random() as a key?",
            a: "Never! Math.random() generates a new key on every render, which forces React to unmount and re-create all DOM nodes on every update."
          }
        ],
        assignment: "Create a list of 5 tasks with a delete button on each item with stable unique IDs.",
        quiz: {
          question: "What is the primary purpose of the 'key' prop in React lists?",
          options: ["To apply CSS styles", "To help React identify which items have changed, been added, or removed during diffing", "To encrypt sensitive list data", "To sort the array automatically"],
          answer: 1,
          explanation: "Keys give elements a stable identity so React's reconciliation algorithm can efficiently reorder and update elements."
        },
        codeTemplate: `function ProductFilterDemo() {
  const initialProducts = [
    { id: 101, name: 'Apple iPhone 15 Pro', price: 999, category: 'Phone' },
    { id: 102, name: 'Samsung Galaxy S24', price: 899, category: 'Phone' },
    { id: 103, name: 'Sony WH-1000XM5 Headphones', price: 349, category: 'Audio' },
    { id: 104, name: 'Apple MacBook Air M3', price: 1099, category: 'Laptop' },
    { id: 105, name: 'Keychron Mechanical Keyboard', price: 89, category: 'Accessory' }
  ];

  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('All');

  const filtered = initialProducts.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchQuery && matchCat;
  });

  const totalCost = filtered.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Search & Filter with Map, Filter, Reduce</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px' }}>
          <option value="All">All Categories</option>
          <option value="Phone">Phones</option>
          <option value="Audio">Audio</option>
          <option value="Laptop">Laptops</option>
          <option value="Accessory">Accessories</option>
        </select>
      </div>
      <div style={{ display: 'grid', gap: '8px' }}>
        {filtered.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <span><strong>{p.name}</strong> <small style={{ color: '#64748b' }}>({p.category})</small></span>
            <span style={{ fontWeight: 'bold', color: '#0369a1' }}>\${p.price}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', padding: '10px', background: '#e0f2fe', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#0369a1' }}>
        <span>Filtered Items: {filtered.length}</span>
        <span>Total Value: \${totalCost}</span>
      </div>
    </div>
  );
}
render(<ProductFilterDemo />);`
      },
      {
        id: "m1-storage-local-and-session",
        title: "12. LocalStorage & SessionStorage in React",
        level: "Intermediate",
        summary: "Persist client state across page reloads and browser sessions using browser Web Storage APIs.",
        intro: "Jab user browser reload karta hai to React state reset ho jati hai. Data ko persist karne ke liye hum LocalStorage aur SessionStorage use karte hain.",
        whatIsIt: "localStorage data ko browser me permanently store karta hai jab tak explicitly clear na kiya jaye. sessionStorage sirf tab ke open rehne tak data store karta hai.",
        whyNeeded: "Theme preference (Dark/Light mode), auth tokens, shopping cart items, aur incomplete form drafts ko persist rakhne ke liye web storage zaroori hai.",
        analogy: "localStorage aapki almari jaisa hai (permanent). sessionStorage hotel room ke desk jaisa hai (cleared on checkout)!",
        technicalExplanation: "Web Storage APIs store data strictly as strings (~5-10MB limit). To store objects/arrays, use JSON.stringify(data). To retrieve, use JSON.parse(localStorage.getItem(key)).",
        syntax: `// Save to LocalStorage
localStorage.setItem('user_theme', JSON.stringify({ mode: 'dark' }));

// Read with lazy initial state
const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem('user_theme');
  return saved ? JSON.parse(saved) : { mode: 'light' };
});`,
        codeExplanation: "useState(() => ...) lazy initializer function use karta hai. Isse localStorage.getItem sirf component ke pehle mount par run hota hai.",
        expectedOutput: "Theme state persists seamlessly even after refreshing or reopening the webpage.",
        practicalImplementation: `function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`,
        commonMistakes: "1. Storing plain objects without JSON.stringify: localStorage.setItem('user', user) saves [object Object]!\n2. Calling localStorage.getItem() directly in the component body instead of inside useState(() => ...) or useEffect.",
        interviewQuestions: [
          {
            q: "What is the difference between localStorage, sessionStorage, and Cookies?",
            a: "LocalStorage persists indefinitely (~5-10MB limit). SessionStorage lasts only for the duration of the page tab. Cookies are smaller (~4KB), sent with every HTTP request to the server, and can be marked HttpOnly for secure authentication tokens."
          },
          {
            q: "Why is Lazy Initial State important when reading from localStorage?",
            a: "Accessing localStorage is a synchronous disk read operation. Passing a function useState(() => readStorage()) ensures it runs only once during initial mount."
          }
        ],
        assignment: "Build a Note-taking widget that automatically saves user notes to localStorage and restores them on page refresh.",
        quiz: {
          question: "What data type can localStorage and sessionStorage store directly?",
          options: ["Binary Blobs", "Only DOM Nodes", "Only Strings (UTF-16)", "JSON Objects natively"],
          answer: 2,
          explanation: "Web Storage APIs strictly store strings. Objects must be serialized via JSON.stringify."
        },
        codeTemplate: `function LocalStorageTester() {
  const [note, setNote] = React.useState(() => {
    return localStorage.getItem('demo_quick_note') || 'Default persisted note text';
  });
  const [status, setStatus] = React.useState('');

  const save = () => {
    localStorage.setItem('demo_quick_note', note);
    setStatus('✓ Saved to localStorage at ' + new Date().toLocaleTimeString());
  };

  const clear = () => {
    localStorage.removeItem('demo_quick_note');
    setNote('');
    setStatus('Cleared from localStorage');
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>LocalStorage Persistence Demo</h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
      />
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <button onClick={save} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Save Note
        </button>
        <button onClick={clear} style={{ padding: '8px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Clear Storage
        </button>
      </div>
      {status && <p style={{ fontSize: '13px', color: '#16a34a', marginTop: '8px' }}>{status}</p>}
    </div>
  );
}
render(<LocalStorageTester />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Install and set up a React project (Vite/CRA) and run Hello World",
        instructions: "Demonstrate the complete setup flow of a modern Vite React application. Review folder structure, entry point, and render a styled 'Hello World' with dynamic timestamp.",
        solutionCode: `function HelloWorldApp() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ padding: '30px', textAlign: 'center', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', borderRadius: '12px' }}>
      <h1 style={{ color: '#38bdf8', fontSize: '28px', margin: 0 }}>⚛️ Hello World from React 18 + Vite!</h1>
      <p style={{ color: '#94a3b8', fontSize: '16px' }}>Your modern development environment is active and hot-reloading.</p>
      <div style={{ display: 'inline-block', padding: '8px 16px', background: '#334155', borderRadius: '999px', fontSize: '14px', marginTop: '10px' }}>
        Live System Clock: <strong>{time}</strong>
      </div>
    </div>
  );
}
render(<HelloWorldApp />);`
      },
      {
        num: 2,
        title: "Exercise 2: Create a Functional component and a Class component doing the same task",
        instructions: "Build a live side-by-side component showcasing a Functional Component with Hooks and a Class Component with this.state and methods doing the exact same interactive task.",
        solutionCode: `function FunctionalCard({ title }) {
  const [likes, setLikes] = React.useState(0);
  return (
    <div style={{ flex: 1, padding: '16px', background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '8px' }}>
      <h4 style={{ color: '#1d4ed8', margin: '0 0 8px 0' }}>⚡ Functional Component</h4>
      <p>{title}</p>
      <button onClick={() => setLikes(l => l + 1)} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        👍 Likes: {likes}
      </button>
    </div>
  );
}

class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { likes: 0 };
    this.handleLike = this.handleLike.bind(this);
  }
  handleLike() {
    this.setState({ likes: this.state.likes + 1 });
  }
  render() {
    return (
      <div style={{ flex: 1, padding: '16px', background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '8px' }}>
        <h4 style={{ color: '#b45309', margin: '0 0 8px 0' }}>🏛️ Class Component</h4>
        <p>{this.props.title}</p>
        <button onClick={this.handleLike} style={{ padding: '6px 12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          👍 Likes: {this.state.likes}
        </button>
      </div>
    );
  }
}

function DualTaskApp() {
  return (
    <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
      <FunctionalCard title="Built with useState Hook" />
      <ClassCard title="Built with this.state & bind" />
    </div>
  );
}
render(<DualTaskApp />);`
      },
      {
        num: 3,
        title: "Exercise 3: Pass and use props between parent and child components",
        instructions: "Create a Parent dashboard component that passes user details, avatar, and a notification callback down to multiple Child UserCard components.",
        solutionCode: `function ChildBadge({ label, count, color = '#2563eb' }) {
  return (
    <span style={{ padding: '4px 10px', background: color, color: '#fff', borderRadius: '12px', fontSize: '12px', marginRight: '6px' }}>
      {label}: {count}
    </span>
  );
}

function UserProfileChild({ user, onPromote }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '8px' }}>
      <div>
        <h4 style={{ margin: 0, color: '#0f172a' }}>{user.name} ({user.role})</h4>
        <div style={{ marginTop: '6px' }}>
          <ChildBadge label="Projects" count={user.projects} color="#0284c7" />
          <ChildBadge label="Rating" count={user.rating + '★'} color="#eab308" />
        </div>
      </div>
      <button onClick={() => onPromote(user.id)} style={{ padding: '6px 12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Promote
      </button>
    </div>
  );
}

function ParentDashboard() {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Ananya Sharma', role: 'Frontend Dev', projects: 12, rating: 4.8 },
    { id: 2, name: 'Rohan Verma', role: 'Full Stack Dev', projects: 8, rating: 4.5 }
  ]);

  const handlePromote = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: 'Senior ' + u.role, rating: 5.0 } : u));
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Parent-Child Communication Lab</h3>
      {users.map(u => (
        <UserProfileChild key={u.id} user={u} onPromote={handlePromote} />
      ))}
    </div>
  );
}
render(<ParentDashboard />);`
      },
      {
        num: 4,
        title: "Exercise 4: Manage state using useState and this.state side by side",
        instructions: "Implement dual state management showing how complex state behaves in useState vs this.state.",
        solutionCode: `function HookStateDemo() {
  const [state, setState] = React.useState({ text: '', count: 0 });
  return (
    <div style={{ padding: '12px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px' }}>
      <h4 style={{ color: '#166534', margin: '0 0 8px 0' }}>Functional useState Hook</h4>
      <input
        value={state.text}
        onChange={(e) => setState(prev => ({ ...prev, text: e.target.value }))}
        placeholder="Type text..."
        style={{ padding: '6px', width: '90%', marginBottom: '6px' }}
      />
      <div>Text: {state.text || '(empty)'} | Count: {state.count}</div>
      <button onClick={() => setState(prev => ({ ...prev, count: prev.count + 1 }))} style={{ marginTop: '6px', padding: '4px 10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Increment
      </button>
    </div>
  );
}

class ClassStateDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', count: 0 };
  }
  render() {
    return (
      <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', marginTop: '10px' }}>
        <h4 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Class this.state (Auto-merged)</h4>
        <input
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
          placeholder="Type text..."
          style={{ padding: '6px', width: '90%', marginBottom: '6px' }}
        />
        <div>Text: {this.state.text || '(empty)'} | Count: {this.state.count}</div>
        <button onClick={() => this.setState(prev => ({ count: prev.count + 1 }))} style={{ marginTop: '6px', padding: '4px 10px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Increment
        </button>
      </div>
    );
  }
}

function StateSideBySide() {
  return (
    <div>
      <HookStateDemo />
      <ClassStateDemo />
    </div>
  );
}
render(<StateSideBySide />);`
      },
      {
        num: 5,
        title: "Exercise 5: Demonstrate all life cycle phases using class methods and useEffect",
        instructions: "Demonstrate Mount, Update, and Unmount logs clearly using both Class lifecycle methods and useEffect hook.",
        solutionCode: `function LifecycleWatcher() {
  const [count, setCount] = React.useState(0);
  const [logs, setLogs] = React.useState([]);

  const addLog = (msg) => setLogs(l => ["[" + new Date().toLocaleTimeString() + "] " + msg, ...l.slice(0, 4)]);

  React.useEffect(() => {
    addLog('Mounted (Equivalent to componentDidMount)');
    return () => console.log('Unmounted');
  }, []);

  React.useEffect(() => {
    if (count > 0) {
      addLog("Updated count to " + count + " (Equivalent to componentDidUpdate)");
    }
  }, [count]);

  return (
    <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px' }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Lifecycle Event Monitor</h4>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: '6px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Trigger Update (Count: {count})
      </button>
      <div style={{ marginTop: '12px', background: '#0f172a', color: '#38bdf8', padding: '10px', borderRadius: '6px', fontSize: '13px' }}>
        {logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  );
}
render(<LifecycleWatcher />);`
      },
      {
        num: 6,
        title: "Exercise 6: Handle click, change, and submit events",
        instructions: "Build an interactive Form handling onClick, onChange with real-time feedback, and onSubmit with e.preventDefault().",
        solutionCode: `function EventTriadApp() {
  const [formData, setFormData] = React.useState({ username: '', role: 'Developer' });
  const [submitted, setSubmitted] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      alert('Please enter a username');
      return;
    }
    setSubmitted({ ...formData, timestamp: new Date().toLocaleTimeString() });
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Click, Change & Submit Lab</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Username:</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter name"
            style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '6px' }}>
            <option>Developer</option>
            <option>Designer</option>
            <option>Product Manager</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Submit Form
        </button>
      </form>
      {submitted && (
        <div style={{ marginTop: '14px', padding: '12px', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', color: '#15803d' }}>
          ✓ Successfully registered <strong>{submitted.username}</strong> as <strong>{submitted.role}</strong> at {submitted.timestamp}!
        </div>
      )}
    </div>
  );
}
render(<EventTriadApp />);`
      },
      {
        num: 7,
        title: "Exercise 7: Conditional rendering: show/hide content on button click",
        instructions: "Create an Accordion / Collapsible section that smoothly reveals extra details with an animated toggle indicator.",
        solutionCode: `function ShowHideAccordion() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden', maxWidth: '400px' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: '14px', background: '#f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
      >
        <span style={{ fontWeight: 'bold', color: '#1e293b' }}>📦 What is included in this course?</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', fontSize: '16px' }}>▼</span>
      </div>
      {isOpen && (
        <div style={{ padding: '16px', background: '#fff', color: '#475569', fontSize: '14px', lineHeight: '1.6' }}>
          You get access to complete React 18, TypeScript, Redux Toolkit, Context API, Next-gen Hooks, 10 Production Projects, and 100+ Interview Questions.
        </div>
      )}
    </div>
  );
}
render(<ShowHideAccordion />);`
      },
      {
        num: 8,
        title: "Exercise 8: Render a list from an array using map and key",
        instructions: "Render a clean contact card list from an array of developer objects, ensuring each child has a unique key.",
        solutionCode: `function ContactListApp() {
  const contacts = [
    { id: 'c1', name: 'Dr. Vikram Patel', role: 'Chief Scientist', email: 'vikram@isro.gov.in', status: 'Active' },
    { id: 'c2', name: 'Sunita Narain', role: 'Director', email: 'sunita@cseindia.org', status: 'Away' },
    { id: 'c3', name: 'Raghuram Rajan', role: 'Economist', email: 'rajan@uchicago.edu', status: 'Active' }
  ];

  return (
    <div style={{ display: 'grid', gap: '10px' }}>
      {contacts.map(c => (
        <div key={c.id} style={{ padding: '12px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, color: '#0f172a' }}>{c.name}</h4>
            <span style={{ fontSize: '13px', color: '#64748b' }}>{c.role} • {c.email}</span>
          </div>
          <span style={{
            padding: '3px 8px', borderRadius: '999px', fontSize: '12px',
            background: c.status === 'Active' ? '#dcfce7' : '#fef3c7',
            color: c.status === 'Active' ? '#15803d' : '#b45309'
          }}>{c.status}</span>
        </div>
      ))}
    </div>
  );
}
render(<ContactListApp />);`
      },
      {
        num: 9,
        title: "Exercise 9: Filter and reduce a list (search/filter products)",
        instructions: "Build an interactive catalogue that filters products by price range and search term, then calculates subtotal, tax, and grand total using Array.reduce().",
        solutionCode: `function ProductFilterReduceLab() {
  const inventory = [
    { id: 1, title: 'Wireless Ergonomic Keyboard', price: 75, stock: 12 },
    { id: 2, title: 'Ultra-wide Gaming Monitor 34"', price: 450, stock: 4 },
    { id: 3, title: 'USB-C Multiport Hub', price: 35, stock: 20 },
    { id: 4, title: 'Noise Cancelling Headphones', price: 210, stock: 7 }
  ];

  const [search, setSearch] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState(500);

  const matched = inventory.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) && item.price <= maxPrice
  );

  const totalInventoryValue = matched.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Stock Valuation Filter (Reduce Lab)</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inventory..."
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '13px' }}>Max Price: \${maxPrice}</label>
          <input
            type="range"
            min="30"
            max="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>
      <div style={{ display: 'grid', gap: '8px' }}>
        {matched.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <span>{item.title} (Stock: {item.stock})</span>
            <span style={{ fontWeight: 'bold', color: '#0369a1' }}>\${item.price} ea (Value: \${item.price * item.stock})</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', padding: '12px', background: '#e0f2fe', borderRadius: '8px', fontWeight: 'bold', color: '#0369a1', textAlign: 'right' }}>
        Total Matched Stock Value: \${totalInventoryValue.toLocaleString()}
      </div>
    </div>
  );
}
render(<ProductFilterReduceLab />);`
      },
      {
        num: 10,
        title: "Exercise 10: Store and retrieve data using Local Storage and Session Storage",
        instructions: "Build a multi-tab storage inspector demonstrating side-by-side operations for localStorage (permanent) and sessionStorage (tab-scoped).",
        solutionCode: `function StorageComparisonApp() {
  const [localVal, setLocalVal] = React.useState(() => localStorage.getItem('demo_local') || '');
  const [sessionVal, setSessionVal] = React.useState(() => sessionStorage.getItem('demo_session') || '');

  const handleSaveLocal = () => {
    localStorage.setItem('demo_local', localVal);
    alert('Saved to LocalStorage (Persists after browser close)');
  };

  const handleSaveSession = () => {
    sessionStorage.setItem('demo_session', sessionVal);
    alert('Saved to SessionStorage (Erased when tab closes)');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <div style={{ padding: '16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px' }}>
        <h4 style={{ color: '#1d4ed8', margin: '0 0 8px 0' }}>💾 LocalStorage</h4>
        <input
          value={localVal}
          onChange={(e) => setLocalVal(e.target.value)}
          placeholder="Permanent setting..."
          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #93c5fd', marginBottom: '8px', boxSizing: 'border-box' }}
        />
        <button onClick={handleSaveLocal} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>
          Save Local
        </button>
      </div>
      <div style={{ padding: '16px', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '8px' }}>
        <h4 style={{ color: '#be185d', margin: '0 0 8px 0' }}>⏱️ SessionStorage</h4>
        <input
          value={sessionVal}
          onChange={(e) => setSessionVal(e.target.value)}
          placeholder="Session secret..."
          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #f472b6', marginBottom: '8px', boxSizing: 'border-box' }}
        />
        <button onClick={handleSaveSession} style={{ padding: '6px 12px', background: '#db2777', color: '#fff', border: 'none', borderRadius: '6px' }}>
          Save Session
        </button>
      </div>
    </div>
  );
}
render(<StorageComparisonApp />);`
      },
      {
        num: 11,
        title: "Exercise 11: Use useRef to focus an input and forwardRef to pass a ref to a child",
        instructions: "Build a custom input component wrapped in React.forwardRef, and use a parent button to programmatically focus and highlight it using useRef.",
        solutionCode: `const CustomInputField = React.forwardRef(({ label, ...props }, ref) => (
  <div style={{ marginBottom: '12px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>
      {label}
    </label>
    <input
      ref={ref}
      {...props}
      style={{ width: '100%', padding: '10px', border: '2px solid #cbd5e1', borderRadius: '6px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
    />
  </div>
));

function ForwardRefDemo() {
  const emailInputRef = React.useRef(null);

  const handleFocusAction = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
      emailInputRef.current.style.borderColor = '#10b981';
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '420px' }}>
      <h3 style={{ margin: '0 0 14px 0' }}>forwardRef Child Input Lab</h3>
      <CustomInputField ref={emailInputRef} label="Email Address" placeholder="you@company.com" />
      <button onClick={handleFocusAction} style={{ padding: '8px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
        Focus Child via Parent Ref
      </button>
    </div>
  );
}
render(<ForwardRefDemo />);`
      },
      {
        num: 12,
        title: "Exercise 12: Build a simple counter application (increment/decrement/reset)",
        instructions: "Create a polished Counter widget featuring bounds checking (preventing negatives), step controls (+1, +5, +10), and a reset button.",
        solutionCode: `function ProCounter() {
  const [count, setCount] = React.useState(0);
  const [step, setStep] = React.useState(1);

  return (
    <div style={{ padding: '24px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', maxWidth: '360px', margin: '0 auto', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>Standard Counter App</h3>
      <div style={{ fontSize: '48px', fontWeight: 'bold', color: count > 0 ? '#16a34a' : count < 0 ? '#dc2626' : '#64748b', marginBottom: '16px' }}>
        {count}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => setCount(c => c - step)} style={{ padding: '10px 18px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>
          -{step}
        </button>
        <button onClick={() => setCount(0)} style={{ padding: '10px 18px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Reset
        </button>
        <button onClick={() => setCount(c => c + step)} style={{ padding: '10px 18px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>
          +{step}
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
        {[1, 5, 10].map(s => (
          <button key={s} onClick={() => setStep(s)} style={{
            padding: '4px 10px', background: step === s ? '#2563eb' : '#f1f5f9',
            color: step === s ? '#fff' : '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer'
          }}>Step: {s}</button>
        ))}
      </div>
    </div>
  );
}
render(<ProCounter />);`
      },
      {
        num: 13,
        title: "Exercise 13: Build a login form UI using a Card and print 'Welcome {User}'",
        instructions: "Build an elegant Login Card with username and password fields, validation, and a personalized welcome screen on successful submission.",
        solutionCode: `function LoginCardApp() {
  const [user, setUser] = React.useState({ username: '', password: '' });
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [error, setError] = React.useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      setError('Please fill both fields');
      return;
    }
    setError('');
    setLoggedInUser(user.username);
  };

  if (loggedInUser) {
    return (
      <div style={{ padding: '30px', background: 'linear-gradient(135deg, #0284c7, #0369a1)', color: '#fff', borderRadius: '12px', textAlign: 'center' }}>
        <h2>Welcome, {loggedInUser}! 🎉</h2>
        <p>You have successfully logged into the member portal.</p>
        <button onClick={() => { setLoggedInUser(null); setUser({ username: '', password: '' }); }} style={{ padding: '8px 16px', background: '#fff', color: '#0369a1', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '380px', margin: '0 auto', padding: '24px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#0f172a', textAlign: 'center' }}>Member Sign In</h3>
      {error && <div style={{ padding: '8px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Username:</label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="e.g. dev_raj"
            style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••••"
            style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
render(<LoginCardApp />);`
      },
      {
        num: 14,
        title: "Exercise 14: Create a CRUD form that fills a Country dropdown from an API",
        instructions: "Fetch real country data from an API (or mock data), populate an interactive dropdown, and build a full CRUD table to Add, Read, Update, and Delete entries.",
        solutionCode: `function CountryCrudApp() {
  const [countries, setCountries] = React.useState([
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'DE', name: 'Germany' },
    { code: 'JP', name: 'Japan' },
    { code: 'GB', name: 'United Kingdom' }
  ]);
  const [citizens, setCitizens] = React.useState([
    { id: 1, name: 'Vikram Batra', country: 'India', role: 'Security Specialist' },
    { id: 2, name: 'Alice Cooper', country: 'United States', role: 'Architect' }
  ]);
  const [form, setForm] = React.useState({ name: '', country: 'India', role: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.role) return;
    setCitizens([...citizens, { ...form, id: Date.now() }]);
    setForm({ name: '', country: 'India', role: '' });
  };

  const handleDelete = (id) => {
    setCitizens(citizens.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 14px 0' }}>Country Dropdown CRUD System</h3>
      <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '8px', marginBottom: '16px' }}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name"
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <input
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          placeholder="Job Role"
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} style={{ padding: '8px', borderRadius: '6px' }}>
          {countries.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
        </select>
        <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          + Add Record
        </button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Role</th>
            <th style={{ padding: '10px' }}>Country</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {citizens.map(c => (
            <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px' }}>{c.name}</td>
              <td style={{ padding: '10px' }}>{c.role}</td>
              <td style={{ padding: '10px' }}>{c.country}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleDelete(c.id)} style={{ padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
render(<CountryCrudApp />);`
      },
      {
        num: 15,
        title: "Exercise 15: Render JSON data (nested objects/arrays) dynamically as a table",
        instructions: "Parse and render complex nested JSON structures (e.g. users with addresses and skills arrays) dynamically into a structured HTML table.",
        solutionCode: `function NestedJsonTable() {
  const complexData = [
    {
      id: 1,
      name: 'Priya Sharma',
      department: 'Engineering',
      contact: { email: 'priya@tech.in', city: 'Bengaluru' },
      techStack: ['React', 'TypeScript', 'Docker']
    },
    {
      id: 2,
      name: 'Aditya Rao',
      department: 'Design',
      contact: { email: 'aditya@tech.in', city: 'Mumbai' },
      techStack: ['Figma', 'UI/UX', 'Design Systems']
    },
    {
      id: 3,
      name: 'Kavita Nair',
      department: 'Data Science',
      contact: { email: 'kavita@tech.in', city: 'Hyderabad' },
      techStack: ['Python', 'PyTorch', 'SQL']
    }
  ];

  return (
    <div style={{ overflowX: 'auto', padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#0f172a' }}>Dynamic Nested JSON Table Renderer</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#0f172a', color: '#fff' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Employee</th>
            <th style={{ padding: '10px' }}>Department</th>
            <th style={{ padding: '10px' }}>Contact (Nested Object)</th>
            <th style={{ padding: '10px' }}>Tech Stack (Nested Array)</th>
          </tr>
        </thead>
        <tbody>
          {complexData.map(row => (
            <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>#{row.id}</td>
              <td style={{ padding: '10px' }}>{row.name}</td>
              <td style={{ padding: '10px' }}>{row.department}</td>
              <td style={{ padding: '10px', color: '#475569' }}>
                {row.contact.email} ({row.contact.city})
              </td>
              <td style={{ padding: '10px' }}>
                {row.techStack.map(tech => (
                  <span key={tech} style={{ display: 'inline-block', padding: '2px 8px', background: '#e0f2fe', color: '#0369a1', borderRadius: '4px', fontSize: '12px', marginRight: '4px' }}>
                    {tech}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
render(<NestedJsonTable />);`
      }
    ]
  },
  {
    id: "module-2",
    number: 2,
    title: "TypeScript with React",
    hindiTitle: "React Ke Sath TypeScript Ki Superpower",
    badge: "Type Safety",
    description: "Why TypeScript with React, basic types, interfaces, type aliases, component props typing, state typing, event typing, hook typing, and generics.",
    lessons: [
      {
        id: "m2-why-typescript",
        title: "1. Why TypeScript with React? (Type Safety & DX)",
        level: "Intermediate",
        summary: "Understand compile-time error checking, refactoring confidence, and autocomplete in modern enterprise React.",
        intro: "JavaScript ek dynamically typed language hai. Yahan runtime par undefined is not a function error aana aam baat hai. TypeScript React ke sath milkar compile-time par hi saari galtiyan pakad leta hai.",
        whatIsIt: "TypeScript is a strongly typed superset of JavaScript developed by Microsoft that compiles down to plain JavaScript. It adds static type checking to React components, props, hooks, and API responses.",
        whyNeeded: "In large enterprise codebases, when you change a prop name in a parent component, pure JavaScript won't warn you until the user clicks and crashes the app in production. TypeScript provides instant red squiggly lines in your IDE and prevents bad code from ever compiling.",
        analogy: "JavaScript aisi driving hai jisme koi traffic signals ya seat belts nahi hain. TypeScript ek smart autonomous driving assistant hai jo car start karne se pehle hi sab test kar leta hai!",
        technicalExplanation: "TypeScript compiler (tsc) performs Static Type Analysis during development and build time. Once compiled, all type declarations and interfaces are stripped away (type erasure), leaving lightweight, performant JavaScript.",
        syntax: `// Defining Types in React with TypeScript
type UserRole = 'Admin' | 'Editor' | 'Viewer';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
}`,
        codeExplanation: "type UserRole ensure karta hai ki role sirf in 3 strings me se hi ho sakta hai. interface UserProfile component ke data structure ka contract define karta hai.",
        expectedOutput: "Zero runtime type mismatch errors, 100% accurate IDE IntelliSense autocomplete.",
        practicalImplementation: `interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick: () => void;
}

export const CustomButton = ({
  label,
  variant = 'primary',
  disabled = false,
  onClick
}: ButtonProps): JSX.Element => {
  return (
    <button className={"btn btn-" + variant} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};`,
        commonMistakes: "1. Using any type everywhere (const [data, setData] = useState<any>()). This disables TypeScript completely!\n2. Over-typing simple variables that TypeScript already infers automatically via Type Inference.",
        interviewQuestions: [
          {
            q: "What is the difference between 'interface' and 'type' in TypeScript?",
            a: "interface can be extended (extends) and merged via declaration merging, making them ideal for object shapes and component props. type aliases can represent primitives, unions (type ID = string | number), intersections, and tuples."
          },
          {
            q: "Why is explicit props destructuring preferred over React.FC in modern React?",
            a: "React.FC previously implicitly injected an optional children prop even when a component didn't accept children and broke generics. Explicit props destructuring is cleaner, standard, and preferred."
          }
        ],
        assignment: "Write a TypeScript interface for an e-commerce Product with fields id, title, price, category, and an optional discountPercent.",
        quiz: {
          question: "What happens to TypeScript type annotations after building a project for production?",
          options: ["They are saved in a .types file", "They are erased completely, leaving pure JavaScript", "They run in the browser console", "They are converted into CSS variables"],
          answer: 1,
          explanation: "TypeScript uses Type Erasure: all types, interfaces, and annotations are stripped out during compilation, producing standard JS."
        },
        codeTemplate: `function TypeScriptShowcase() {
  const [user, setUser] = React.useState({
    id: 101,
    name: 'Vikram Aditya',
    role: 'Admin',
    verified: true
  });

  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ background: '#3178c6', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px' }}>TS</span>
        <h3 style={{ margin: 0 }}>Typed React Component</h3>
      </div>
      <div style={{ marginTop: '12px', padding: '12px', background: '#334155', borderRadius: '6px' }}>
        <strong>Active Props:</strong> {user.name} | Role: <span style={{ color: '#4ade80' }}>{user.role}</span> | ID: #{user.id}
      </div>
    </div>
  );
}
render(<TypeScriptShowcase />);`
      },
      {
        id: "m2-typing-props-and-state",
        title: "2. Typing Component Props & State (useState, useRef, useReducer)",
        level: "Intermediate",
        summary: "Master generic type arguments for useState<T>, useRef<T>, and discriminated unions in useReducer.",
        intro: "React hooks me TypeScript ka use karne se state aur refs 100% bug-free ban jate hain. Yahan hum Generics <T> ke sath hooks type karna seekhenge.",
        whatIsIt: "Typing hooks involves passing generic type parameters <T> to hooks such as useState<User | null>(null) or useRef<HTMLInputElement>(null) to tell TypeScript what shape of data is stored.",
        whyNeeded: "Agar aap initial state null dete hain, to bina generic type ke TypeScript infer karega ki state hamesha null hi rahegi, aur baad me object set karne par compile error throw karega.",
        analogy: "Ek transparent medicine bottle pe label lagane jaisa hai: bottle khali hone par bhi label batata hai ki isme kis type ki tablets aayengi!",
        technicalExplanation: "1. useState<T | null>(null): Allows state to start as null and later become of type T. 2. useRef<HTMLInputElement>(null): Provides full DOM typing with autocomplete. 3. useReducer: Uses Discriminated Unions for action types.",
        syntax: `// 1. useState with generic
const [user, setUser] = useState<User | null>(null);

// 2. useRef with DOM element
const inputRef = useRef<HTMLInputElement>(null);

// 3. useReducer with discriminated actions
type Action =
  | { type: 'INCREMENT'; payload: number }
  | { type: 'RESET' };`,
        codeExplanation: "useState<User | null> TypeScript ko batata hai ki user ya to User object hoga ya null. Action union me agar type 'INCREMENT' hai to payload: number mandatory hoga.",
        expectedOutput: "Compiler automatically prevents accessing properties on null without checking, preventing runtime crashes.",
        practicalImplementation: `interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoApp() {
  const [todos, setTodos] = React.useState([]);
  const inputRef = React.useRef(null);

  const addTodo = () => {
    if (inputRef.current && inputRef.current.value.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputRef.current.value,
        completed: false
      };
      setTodos(prev => [...prev, newTodo]);
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Task name" />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}`,
        commonMistakes: "1. Forgetting to pass the DOM type to useRef: useRef(null) gives type React.MutableRefObject<null>.\n2. Omitting null in union when initial state is null.",
        interviewQuestions: [
          {
            q: "How do Discriminated Unions benefit useReducer action typings?",
            a: "A Discriminated Union uses a common property (e.g. type: 'SET_USER') that TypeScript uses to narrow down which payload properties exist inside switch-case blocks, ensuring complete type safety."
          },
          {
            q: "What is the difference between useRef<HTMLElement>(null) and useRef<HTMLElement | undefined>()?",
            a: "useRef<HTMLInputElement>(null) creates a read-only RefObject intended for DOM elements where React manages .current. useRef<number>() creates a MutableRefObject where you freely mutate .current."
          }
        ],
        assignment: "Type a counter reducer that accepts INCREMENT (with payload: step), DECREMENT (with payload: step), and RESET actions using TypeScript Discriminated Unions.",
        quiz: {
          question: "Which generic declaration is correct for a ref attached to a <button> element?",
          options: ["useRef<Button>(null)", "useRef<HTMLButtonElement>(null)", "useRef<DOMButton>()", "useRef<ReactButtonElement>(null)"],
          answer: 1,
          explanation: "HTMLButtonElement is the standard browser DOM interface for button elements."
        },
        codeTemplate: `function TypedHookLab() {
  const [profile, setProfile] = React.useState({
    name: 'Ankit Tiwari',
    followers: 1240,
    skills: ['React', 'TypeScript']
  });

  const inputRef = React.useRef(null);

  const updateName = () => {
    if (inputRef.current && inputRef.current.value) {
      setProfile(prev => ({ ...prev, name: inputRef.current.value }));
      inputRef.current.value = '';
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Typed State & Ref Lab</h3>
      <p>Name: <strong>{profile.name}</strong> | Followers: <strong>{profile.followers}</strong></p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input ref={inputRef} placeholder="Enter new name" style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
        <button onClick={updateName} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Update via Ref
        </button>
      </div>
    </div>
  );
}
render(<TypedHookLab />);`
      },
      {
        id: "m2-typing-events-and-generics",
        title: "3. Event Typing & Generics in Reusable Components",
        level: "Advanced",
        summary: "Type onChange, onClick, onSubmit events and build generic components like <List<T>> that work with any data shape.",
        intro: "React me input events aur form submissions ko TypeScript me accurately type karna aur reusable Generic components banana senior developers ka hallmark hota hai.",
        whatIsIt: "React provides built-in event types like React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLButtonElement>, and React.FormEvent<HTMLFormElement>. Generics <T> allow you to write reusable components that work over a variety of types.",
        whyNeeded: "Event typing gives you instant autocomplete for e.target.value. Generics eliminate code duplication: you can write one Table or Select component that works for Users, Products, or Invoices without losing type safety.",
        analogy: "Generic component ek universal luggage bag jaisa hai: aap isme books pack karo ya clothes pack karo, bag ka zipper aur wheels (structure) same rehta hai lekin content typed rehta hai!",
        technicalExplanation: "Generic syntax <T extends { id: string | number }> creates a generic constraint, guaranteeing that whatever data type is passed into the component will have at least an id property for React keys.",
        syntax: `// 1. Event Handlers Typing
const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

// 2. Generic Reusable List Component
interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function GenericList<T>({ items, renderItem }: GenericListProps<T>) {
  return <div>{items.map(renderItem)}</div>;
}`,
        codeExplanation: "React.ChangeEvent<HTMLInputElement> ensures e.target.value is recognized as a string. GenericList<T> dynamically adopts the type of array passed into items.",
        expectedOutput: "100% type-safe reusable UI components with zero compiler warnings.",
        practicalImplementation: `interface DropdownProps<T> {
  options: T[];
  getLabel: (item: T) => string;
  getValue: (item: T) => string | number;
  onSelect: (item: T) => void;
}

function GenericDropdown<T>({ options, getLabel, getValue, onSelect }: DropdownProps<T>) {
  return (
    <select onChange={(e) => {
      const selected = options.find(o => String(getValue(o)) === e.target.value);
      if (selected) onSelect(selected);
    }}>
      {options.map(opt => (
        <option key={getValue(opt)} value={getValue(opt)}>
          {getLabel(opt)}
        </option>
      ))}
    </select>
  );
}`,
        commonMistakes: "1. Using generic Event from DOM instead of React.ChangeEvent or React.MouseEvent.\n2. Using any inside generic components instead of <T>.",
        interviewQuestions: [
          {
            q: "What is the difference between React.MouseEvent<HTMLButtonElement> and native MouseEvent?",
            a: "React.MouseEvent is a SyntheticEvent wrapper providing cross-browser consistency and integration with React's event delegation pool, while native MouseEvent is the browser's raw event object."
          },
          {
            q: "What is a Generic Constraint in TypeScript?",
            a: "A Generic Constraint uses the extends keyword (e.g. <T extends Identifiable>) to restrict the types allowed in a generic to only those that satisfy a specific contract."
          }
        ],
        assignment: "Write a generic function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] with complete TypeScript types.",
        quiz: {
          question: "Which type correctly represents an input onChange event in React TypeScript?",
          options: ["React.InputEvent", "React.ChangeEvent<HTMLInputElement>", "HTMLInputElement.onChange", "React.Event<Input>"],
          answer: 1,
          explanation: "React.ChangeEvent<HTMLInputElement> is the official React type for input change events."
        },
        codeTemplate: `function GenericSimulator() {
  const developers = [
    { id: 1, name: 'Sanjay Kumar', level: 'Senior' },
    { id: 2, name: 'Divya Nair', level: 'Lead Architect' }
  ];

  const [selected, setSelected] = React.useState(developers[0]);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Generic List Demonstration</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {developers.map(dev => (
          <button
            key={dev.id}
            onClick={() => setSelected(dev)}
            style={{
              padding: '8px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer',
              background: selected.id === dev.id ? '#2563eb' : '#e2e8f0',
              color: selected.id === dev.id ? '#fff' : '#1e293b'
            }}
          >
            {dev.name}
          </button>
        ))}
      </div>
      <div style={{ padding: '12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
        Selected Developer: <strong>{selected.name}</strong> ({selected.level})
      </div>
    </div>
  );
}
render(<GenericSimulator />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Convert an existing functional component to TypeScript with typed props",
        instructions: "Take a standard User Profile component and convert it to modern TypeScript with an interface defining mandatory and optional typed props with default values.",
        solutionCode: `function TypedUserProfile({ name, email, role = 'Member', badges = [] }) {
  return (
    <div style={{ padding: '16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '10px', maxWidth: '380px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          {name.charAt(0)}
        </div>
        <div>
          <h4 style={{ margin: 0, color: '#0f172a' }}>{name}</h4>
          <span style={{ fontSize: '13px', color: '#64748b' }}>{email} • <strong>{role}</strong></span>
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        {badges.map(b => (
          <span key={b} style={{ display: 'inline-block', padding: '2px 8px', background: '#e0f2fe', color: '#0369a1', borderRadius: '999px', fontSize: '12px', marginRight: '4px' }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <TypedUserProfile
      name="Rohit Sengupta"
      email="rohit@devs.in"
      role="Staff Engineer"
      badges={['TypeScript', 'React 18', 'Redux Pro']}
    />
  );
}
render(<App />);`
      },
      {
        num: 2,
        title: "Exercise 2: Create a typed interface for a form and validate on submit",
        instructions: "Define a strict TypeScript interface RegistrationFormValues with string, number, and enum fields. Validate all constraints upon form submission.",
        solutionCode: `function TypedFormValidator() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    age: 21,
    plan: 'Pro'
  });
  const [errors, setErrors] = React.useState({});
  const [success, setSuccess] = React.useState(false);

  const validate = () => {
    const errs = {};
    if (formData.username.length < 3) errs.username = 'Username must be >= 3 chars';
    if (!formData.email.includes('@')) errs.email = 'Valid email is required';
    if (formData.age < 18) errs.age = 'Must be at least 18 years old';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '420px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Typed Form & Schema Validation</h3>
      {success && <div style={{ padding: '8px', background: '#dcfce7', color: '#15803d', borderRadius: '6px', marginBottom: '10px' }}>✓ Registration Validated Successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <input
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Username (min 3 chars)"
            style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
          {errors.username && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.username}</span>}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email address"
            style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
          {errors.email && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.email}</span>}
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Validate & Register
        </button>
      </form>
    </div>
  );
}
render(<TypedFormValidator />);`
      },
      {
        num: 3,
        title: "Exercise 3: Type a custom hook with generics",
        instructions: "Build a custom hook with TypeScript generics useToggle<T> or useTypedStorage<T> that preserves exact value shapes and provides typed setters.",
        solutionCode: `function GenericHookDemo() {
  const [state, setState] = React.useState('First Version');
  const [history, setHistory] = React.useState(['First Version']);

  const setWithHistory = (newVal) => {
    setState(newVal);
    setHistory(h => [newVal, ...h]);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Generic Hook Simulator: useHistoryState&lt;T&gt;</h3>
      <p>Current Value: <strong>{state}</strong></p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {['Version A', 'Version B', 'Version C'].map(v => (
          <button key={v} onClick={() => setWithHistory(v)} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Set {v}
          </button>
        ))}
      </div>
      <div style={{ fontSize: '13px', color: '#64748b' }}>
        History Stack: {history.join(' ← ')}
      </div>
    </div>
  );
}
render(<GenericHookDemo />);`
      },
      {
        num: 4,
        title: "Exercise 4: Type an API response and render it safely",
        instructions: "Define an interface for an external API response with nested objects, fetch data, handle loading/error states, and render properties safely.",
        solutionCode: `function TypedApiRenderer() {
  const [post, setPost] = React.useState({
    id: 101,
    title: 'Announcing TypeScript 5.5 Support',
    body: 'Inferred type predicates and improved regex syntax checking now active.',
    author: { name: 'Anders Hejlsberg', verified: true },
    tags: ['typescript', 'javascript', 'compiler']
  });

  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px', maxWidth: '440px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#38bdf8' }}>API Response ID #{post.id}</span>
        <span style={{ background: '#1e293b', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>Type: PostResponse</span>
      </div>
      <h3 style={{ color: '#fff', margin: '8px 0' }}>{post.title}</h3>
      <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>{post.body}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', borderTop: '1px solid #334155', paddingTop: '10px' }}>
        <span style={{ fontSize: '13px' }}>Author: <strong>{post.author.name}</strong> {post.author.verified && '✓'}</span>
        <div>
          {post.tags.map(t => (
            <span key={t} style={{ marginLeft: '4px', background: '#3b82f6', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
render(<TypedApiRenderer />);`
      }
    ]
  },
  {
    id: "module-3",
    number: 3,
    title: "React Hooks – Core & Advanced",
    hindiTitle: "React Hooks Ka Sampoorna Gyan (Core, Performance & Custom)",
    badge: "Modern React Mastery",
    description: "Deep dive into useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback, React.memo, and custom hooks.",
    lessons: [
      {
        id: "m3-core-hooks-deep-dive",
        title: "1. Core Hooks: useState, useEffect, useContext, useRef, useReducer",
        level: "Intermediate",
        summary: "Master state, side-effects, global context sharing, DOM references, and complex state dispatching with reducers.",
        intro: "React 16.8 me Hooks aane se Class components ki saari limitations khatam ho gayi. Hooks functional components ko state, lifecycle aur side effects use karne ki aazadi dete hain.",
        whatIsIt: "Core hooks include: 1. useState (local state), 2. useEffect (side effects & lifecycle), 3. useContext (global data consumption), 4. useRef (DOM access & mutable values), and 5. useReducer (complex state management using Redux-like dispatch actions).",
        whyNeeded: "As applications grow, managing 10 different useState calls in a single component becomes messy. useReducer consolidates complex multi-step transitions into one pure reducer function. useContext avoids prop drilling across 5 component levels.",
        analogy: "useState aapke personal wallet me cash jaisa hai. useReducer ek accountant ke receipt ledger jaisa hai. useContext office ke water cooler jaisa hai jahan sabhi employees directly access kar sakte hain!",
        technicalExplanation: "React stores hook states in an internal linked-list attached to the component's Fiber node. This is why the 'Rules of Hooks' exist: 1. Only call hooks at the top level. 2. Only call hooks from React function components or custom hooks.",
        syntax: `// useReducer Syntax
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
}`,
        codeExplanation: "useReducer do arguments leta hai: reducer function aur initialState. dispatch({ type: 'INCREMENT' }) call karne par React reducer ko current state aur action pass karta hai aur naya state return karta hai.",
        expectedOutput: "Predictable, centralized state transitions that are easy to test in isolation.",
        practicalImplementation: `const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return (
    <button style={{ background: theme === 'dark' ? '#0f172a' : '#fff', color: theme === 'dark' ? '#fff' : '#0f172a' }}>
      Theme: {theme}
    </button>
  );
}`,
        commonMistakes: "1. Calling hooks conditionally: if (user) useEffect(...). Violating hook call order corrupts React's internal Fiber linked-list!\n2. Mutating state inside a reducer: state.count++. Reducers must always be 100% pure functions returning a new object.",
        interviewQuestions: [
          {
            q: "Why can't React hooks be called inside if conditions or loops?",
            a: "React relies on the strict call order of hooks on every render to map each hook call to its corresponding slot in the Fiber's internal linked-list. Calling hooks conditionally shifts the positions and corrupts state."
          },
          {
            q: "When should you choose useReducer over useState?",
            a: "Choose useReducer when you have complex state logic involving multiple sub-values, when the next state depends on multiple previous values, or when different event handlers need to trigger the same complex state transition."
          }
        ],
        assignment: "Build a shopping cart state manager using useReducer handling actions: ADD_ITEM, REMOVE_ITEM, and CLEAR_CART.",
        quiz: {
          question: "What is the primary constraint of the Rules of Hooks?",
          options: ["Hooks must only be written in Class components", "Hooks must be called at the top level of function components, never conditionally", "Hooks must take at least 3 arguments", "Hooks require TypeScript"],
          answer: 1,
          explanation: "Hooks must be called at the top level of React functions to preserve their sequence in the Fiber linked-list."
        },
        codeTemplate: `const CounterReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': return { count: state.count + action.qty };
    case 'SUB': return { count: Math.max(0, state.count - action.qty) };
    case 'RESET': return { count: 0 };
    default: return state;
  }
};

function ReducerApp() {
  const [state, dispatch] = React.useReducer(CounterReducer, { count: 10 });

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>useReducer Dispatch Center</h3>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', marginBottom: '12px' }}>
        Count: {state.count}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => dispatch({ type: 'ADD', qty: 5 })} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          +5 (Dispatch ADD)
        </button>
        <button onClick={() => dispatch({ type: 'SUB', qty: 2 })} style={{ padding: '8px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          -2 (Dispatch SUB)
        </button>
        <button onClick={() => dispatch({ type: 'RESET' })} style={{ padding: '8px 14px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
}
render(<ReducerApp />);`
      },
      {
        id: "m3-performance-hooks",
        title: "2. Performance Hooks: useMemo, useCallback & React.memo",
        level: "Advanced",
        summary: "Prevent expensive recalculations with useMemo, memoize callback functions with useCallback, and stop child re-renders with React.memo.",
        intro: "React applications me unnecessary re-renders performance ko slow kar sakte hain. Performance hooks memory aur CPU computation optimize karte hain.",
        whatIsIt: "1. React.memo: An HOC that wraps a component to skip re-rendering if its props have not changed. 2. useMemo: Caches the result of an expensive computation. 3. useCallback: Caches a function definition between renders.",
        whyNeeded: "In JavaScript, functions and objects are compared by reference ({} !== {}). When a parent re-renders, a newly created inline function creates a new reference, forcing child components wrapped in React.memo to re-render anyway unless memoized with useCallback.",
        analogy: "useMemo calculated math table jaisa hai: ek baar calculation kar liya to result note kar liya, dobara calculate nahi karte. useCallback reusable stamp jaisa hai!",
        technicalExplanation: "Referential equality is key. useMemo recalculates its value only when one of the dependencies has changed. useCallback(fn, deps) is syntactically equivalent to useMemo(() => fn, deps). Premature optimization should be avoided because memoization itself carries overhead.",
        syntax: `// 1. useMemo for expensive calculation
const filteredList = useMemo(() => {
  return list.filter(item => item.score > threshold);
}, [list, threshold]);

// 2. useCallback for stable callback
const handleSelect = useCallback((id) => {
  console.log('Selected:', id);
}, []);`,
        codeExplanation: "useMemo dependency array (list, threshold) ke badalne par hi filter function ko re-execute karega. useCallback function ka memory reference preserve rakhega across renders.",
        expectedOutput: "Zero lag during high-frequency typing or parent state changes.",
        practicalImplementation: `const ChildItem = React.memo(({ title, onDelete }) => {
  console.log('ChildItem rendered:', title);
  return <button onClick={onDelete}>Delete {title}</button>;
});

function ParentList() {
  const [items, setItems] = React.useState(['React', 'Redux']);
  const [text, setText] = React.useState('');

  const handleDelete = React.useCallback((itemToDelete) => {
    setItems(prev => prev.filter(i => i !== itemToDelete));
  }, []);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Typing won't re-render children" />
      {items.map(item => <ChildItem key={item} title={item} onDelete={() => handleDelete(item)} />)}
    </div>
  );
}`,
        commonMistakes: "1. Wrapping every single trivial function in useCallback. (The overhead of dependency checking can be more expensive than creating a simple inline arrow function!).\n2. Forgetting to pass all used variables in the dependency array, causing stale closure bugs.",
        interviewQuestions: [
          {
            q: "What is the difference between useMemo and useCallback?",
            a: "useMemo memoizes and returns the result of a calculation function (useMemo(() => compute(), [deps])). useCallback memoizes and returns the function definition itself (useCallback((id) => doSomething(id), [deps]))."
          },
          {
            q: "When does React.memo fail to prevent a re-render?",
            a: "When non-primitive props (objects, arrays, functions) are passed from the parent without being memoized via useMemo or useCallback, because shallow comparison evaluates to true."
          }
        ],
        assignment: "Profile a list of 10,000 numbers with a search filter. Compare calculation times with and without useMemo.",
        quiz: {
          question: "What is useCallback(fn, deps) equivalent to using useMemo?",
          options: ["useMemo(fn, deps)", "useMemo(() => fn, deps)", "useMemo(fn.apply(), deps)", "useMemo(deps, fn)"],
          answer: 1,
          explanation: "useCallback(fn, deps) is syntactic sugar for useMemo(() => fn, deps)."
        },
        codeTemplate: `function PerformanceLab() {
  const [count, setCount] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(10);

  const expensiveResult = React.useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 100000; i++) sum += i;
    return sum * multiplier;
  }, [multiplier]);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>useMemo Computation Lab</h3>
      <p>Expensive Result (Only recalculates when multiplier changes):</p>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0284c7', marginBottom: '14px' }}>
        {expensiveResult.toLocaleString()}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 14px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Re-render Parent (Count: {count})
        </button>
        <button onClick={() => setMultiplier(m => m + 1)} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Change Multiplier ({multiplier})
        </button>
      </div>
    </div>
  );
}
render(<PerformanceLab />);`
      },
      {
        id: "m3-custom-hooks",
        title: "3. Custom Hooks (useFetch, useForm, useLocalStorage, useDebounce)",
        level: "Advanced",
        summary: "Extract and share stateful business logic across multiple components with clean, reusable custom hooks.",
        intro: "Custom Hooks React ka sabse powerful abstraction pattern hain. Agar do ya do se zyada components me same stateful logic chahiye, to use Custom Hook me extract karte hain.",
        whatIsIt: "A Custom Hook is a JavaScript function whose name starts with 'use' (e.g. useFetch, useDebounce) and that can call other React hooks (useState, useEffect, etc.).",
        whyNeeded: "Without custom hooks, repetitive tasks like data fetching with loading/error states, form input management, or localStorage synchronization require duplicate code in dozens of components.",
        analogy: "Jaise aap har bar chai banane ke liye doodh, patti, cheeni alag se calculate karne ke bajay ek ready-made 'Tea Premix packet' bana lete hain, vaise hi Custom Hook repetitive state logic ka ready-made package hai!",
        technicalExplanation: "Custom Hooks share stateful logic, NOT state itself. Every time a component calls a custom hook, it gets its own independent, isolated instance of state. Starting the function name with use allows React's linter plugin to enforce the Rules of Hooks.",
        syntax: `// Building useDebounce
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`,
        codeExplanation: "useDebounce hook timer set karta hai. Agar user delay expire hone se pehle dobara type karta hai, to effect cleanup function previous timeout cancel kar deta hai.",
        expectedOutput: "Instant debouncing of high-frequency events like search input keystrokes, avoiding server spam.",
        practicalImplementation: `function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(json => { if (isMounted) { setData(json); setLoading(false); } })
      .catch(err => { if (isMounted) { setError(err.message); setLoading(false); } });

    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}`,
        commonMistakes: "1. Forgetting to prefix the function name with use (fetchUserData instead of useFetchUserData). React linters cannot verify Rules of Hooks without the prefix.\n2. Assuming custom hooks share state globally between components. (Each call creates completely separate state).",
        interviewQuestions: [
          {
            q: "Do two components using the exact same custom hook share state?",
            a: "No! Custom hooks share stateful logic (algorithms, effects, handlers), but every component invocation gets its own independent slice of state."
          },
          {
            q: "How does useDebounce improve API search performance?",
            a: "It delays triggering the API call until the user has stopped typing for a specified delay (e.g. 500ms), reducing 20 API requests during typing down to just 1 final request."
          }
        ],
        assignment: "Write a useOnlineStatus() custom hook that tracks whether the browser has an active internet connection using window.navigator.onLine.",
        quiz: {
          question: "What must the name of a custom React hook always begin with?",
          options: ["get", "use", "hook", "create"],
          answer: 1,
          explanation: "Custom hooks must start with the 'use' prefix so React linters can identify and enforce the Rules of Hooks."
        },
        codeTemplate: `function useToggle(initial = false) {
  const [state, setState] = React.useState(initial);
  const toggle = () => setState(s => !s);
  return [state, toggle];
}

function CustomHooksDemo() {
  const [isVisible, toggleVisible] = useToggle(true);
  const [query, setQuery] = React.useState('');
  const [debounced, setDebounced] = React.useState('');

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 600);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Custom Hooks Simulator</h3>
      <div style={{ marginBottom: '14px' }}>
        <button onClick={toggleVisible} style={{ padding: '6px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Toggle Panel ({isVisible ? 'Shown' : 'Hidden'})
        </button>
      </div>
      {isVisible && (
        <div style={{ padding: '14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Type fast to test useDebounce (600ms delay):</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search query..."
            style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
          <div style={{ marginTop: '10px', fontSize: '13px', color: '#475569' }}>
            Immediate Input: <strong>{query || '(none)'}</strong><br />
            Debounced Trigger: <strong style={{ color: '#16a34a' }}>{debounced || '(none)'}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
render(<CustomHooksDemo />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Build a form using useReducer instead of multiple useState calls",
        instructions: "Replace 5 separate useState calls (name, email, age, terms, isSubmitting) with a single useReducer managing a unified form state object.",
        solutionCode: `const formInit = { name: '', email: '', age: 24, terms: false, submitted: false };

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return formInit;
    case 'SUBMIT':
      return { ...state, submitted: true };
    default:
      return state;
  }
}

function FormReducerLab() {
  const [state, dispatch] = React.useReducer(formReducer, formInit);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT' });
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>useReducer Unified Form</h3>
      {state.submitted && <div style={{ padding: '8px', background: '#dcfce7', color: '#15803d', borderRadius: '6px', marginBottom: '10px' }}>✓ Form Dispatched & Saved!</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <input
            value={state.name}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
            placeholder="Name"
            style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
            placeholder="Email"
            style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '13px' }}>
            <input
              type="checkbox"
              checked={state.terms}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'terms', value: e.target.checked })}
            /> I accept the terms
          </label>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" style={{ flex: 1, padding: '8px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>Submit</button>
          <button type="button" onClick={() => dispatch({ type: 'RESET' })} style={{ padding: '8px 12px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px' }}>Reset</button>
        </div>
      </form>
    </div>
  );
}
render(<FormReducerLab />);`
      },
      {
        num: 2,
        title: "Exercise 2: Share data across components using useContext (theme/auth context)",
        instructions: "Build a Theme and Auth Context Provider wrapping a deeply nested tree. Demonstrate changing theme and user without props drilling.",
        solutionCode: `const GlobalContext = React.createContext(null);

function DeepHeader() {
  const { user, theme, toggleTheme } = React.useContext(GlobalContext);
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: theme === 'dark' ? '#0f172a' : '#e2e8f0', color: theme === 'dark' ? '#fff' : '#0f172a', borderRadius: '8px', marginBottom: '12px' }}>
      <span>User: <strong>{user.name}</strong></span>
      <button onClick={toggleTheme} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: theme === 'dark' ? '#38bdf8' : '#334155', color: theme === 'dark' ? '#0f172a' : '#fff' }}>
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
}

function ContextDemoApp() {
  const [theme, setTheme] = React.useState('light');
  const [user, setUser] = React.useState({ name: 'Tanvi Saxena', role: 'Staff Eng' });

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <GlobalContext.Provider value={{ user, theme, toggleTheme }}>
      <div style={{ padding: '20px', background: theme === 'dark' ? '#1e293b' : '#f8fafc', color: theme === 'dark' ? '#f8fafc' : '#0f172a', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
        <DeepHeader />
        <p>No props were drilled to DeepHeader! Context provided the global values directly.</p>
      </div>
    </GlobalContext.Provider>
  );
}
render(<ContextDemoApp />);`
      },
      {
        num: 3,
        title: "Exercise 3: Optimize a list render using useMemo and React.memo",
        instructions: "Create a list of 500 items where items are wrapped in React.memo and filtered data is cached with useMemo, preventing re-renders during unrelated parent state changes.",
        solutionCode: `const FastListItem = React.memo(({ title, isFav, onToggle }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>
      <span>{title}</span>
      <button onClick={() => onToggle(title)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
        {isFav ? '⭐' : '☆'}
      </button>
    </div>
  );
});

function MemoizedListLab() {
  const [favs, setFavs] = React.useState({});
  const [filter, setFilter] = React.useState('');
  const [randomTick, setRandomTick] = React.useState(0);

  const items = React.useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => "Item #" + (i + 1) + " - Enterprise Tech Resource");
  }, []);

  const filtered = React.useMemo(() => {
    return items.filter(it => it.toLowerCase().includes(filter.toLowerCase()));
  }, [items, filter]);

  const toggleFav = React.useCallback((title) => {
    setFavs(f => ({ ...f, [title]: !f[title] }));
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter memoized list..."
          style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <button onClick={() => setRandomTick(t => t + 1)} style={{ padding: '6px 12px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px' }}>
          Trigger Parent Render ({randomTick})
        </button>
      </div>
      <div style={{ maxHeight: '180px', overflowY: 'auto', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
        {filtered.map(item => (
          <FastListItem key={item} title={item} isFav={!!favs[item]} onToggle={toggleFav} />
        ))}
      </div>
    </div>
  );
}
render(<MemoizedListLab />);`
      },
      {
        num: 4,
        title: "Exercise 4: Prevent unnecessary re-renders of a child using useCallback",
        instructions: "Demonstrate a parent component with a counter and an expensive child component with a button, keeping the child render count at 1 using useCallback.",
        solutionCode: `const ChildButton = React.memo(({ onAction, label }) => {
  const renderCount = React.useRef(0);
  renderCount.current += 1;
  return (
    <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '6px', marginTop: '8px' }}>
      <button onClick={onAction} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        {label}
      </button>
      <span style={{ marginLeft: '10px', fontSize: '12px', color: '#1e40af' }}>Child Renders: <strong>{renderCount.current}</strong></span>
    </div>
  );
});

function CallbackComparison() {
  const [count, setCount] = React.useState(0);

  const stableAction = React.useCallback(() => {
    alert('Stable Action executed!');
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>useCallback Preservation Lab</h3>
      <p>Parent Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Increment Parent State
      </button>
      <ChildButton onAction={stableAction} label="Click Child Button" />
    </div>
  );
}
render(<CallbackComparison />);`
      },
      {
        num: 5,
        title: "Exercise 5: Build 3 custom hooks: useFetch, useLocalStorage, useDebounce",
        instructions: "Implement all 3 signature custom hooks and wire them together into a unified demonstration component.",
        solutionCode: `function useDebounceValue(val, delay = 500) {
  const [debounced, setDebounced] = React.useState(val);
  React.useEffect(() => {
    const h = setTimeout(() => setDebounced(val), delay);
    return () => clearTimeout(h);
  }, [val, delay]);
  return debounced;
}

function useStorageState(key, initial) {
  const [val, setVal] = React.useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
    } catch (e) { return initial; }
  });
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);
  return [val, setVal];
}

function CustomHooksTrio() {
  const [savedUser, setSavedUser] = useStorageState('demo_user_key', 'Guest');
  const [inputVal, setInputVal] = React.useState('');
  const debouncedVal = useDebounceValue(inputVal, 400);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>3-in-1 Custom Hooks Showcase</h3>
      <div style={{ marginBottom: '14px', padding: '10px', background: '#e0f2fe', borderRadius: '6px' }}>
        <strong>useLocalStorage Hook:</strong> Current User: <u>{savedUser}</u>
        <button onClick={() => setSavedUser('ProDev_' + Math.floor(Math.random()*100))} style={{ marginLeft: '10px', padding: '4px 8px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Save New Random User
        </button>
      </div>
      <div style={{ padding: '10px', background: '#fef3c7', borderRadius: '6px' }}>
        <strong>useDebounce Hook:</strong>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type to debounce..."
          style={{ width: '100%', padding: '6px', marginTop: '6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
        <div style={{ fontSize: '13px', marginTop: '6px' }}>Debounced Output: <strong>{debouncedVal || '(waiting)'}</strong></div>
      </div>
    </div>
  );
}
render(<CustomHooksTrio />);`
      }
    ]
  }
];
