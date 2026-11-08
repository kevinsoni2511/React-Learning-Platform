"""
Modules 10, 11, and 12 Curriculum Data for ReactMastery
Contains:
PART 10: Performance Optimization (3 Exercises)
PART 11: Testing React Applications (2 Exercises)
PART 12: Deployment, Git & SEO (2 Exercises)
"""

MODULES_10_TO_12 = [
    {
        "id": "module-10",
        "number": 10,
        "title": "Performance Optimization",
        "hindiTitle": "React Performance Optimization (Virtualization, Colocation & Profiling)",
        "badge": "Speed & Scalability",
        "description": "Memoization in practice, state colocation, avoiding re-render waterfalls, and virtualizing 10,000+ DOM nodes with react-window.",
        "lessons": [
            {
                "id": "m10-colocation-and-memo",
                "title": "1. Avoiding Unnecessary Re-renders & State Colocation",
                "level": "Advanced",
                "summary": "Optimize React render cycles by keeping state close to where it is used (State Colocation), and using stable keys and memoization.",
                "intro": "Bohot saare React developers performance problems aate hi har jagah useMemo aur useCallback lagane lagte hain, jabki 80% problems sirf State Colocation aur Component Composition se solve ho jaate hain.",
                "whatIsIt": "State Colocation means placing component state as close to the components that need it as possible, rather than hoisting it high up the component tree where changes force entire subtree re-renders.",
                "whyNeeded": "If you keep a typing input's state in the root `<App />` component, every keystroke re-renders the entire application (thousands of DOM nodes). Moving input state inside a dedicated `<SearchBox />` component isolates the re-renders completely.",
                "analogy": "Jaise ek bade office building me har floor ke employees ko paani peene ke liye Ground Floor ke kitchen me line lagane ke bajay, har floor par water dispenser rakh diya jaye!",
                "technicalExplanation": "React's default behavior is: whenever a parent component renders, React recursively re-renders all of its children, regardless of whether their props changed or not. State colocation and passing children as props (`{children}`) naturally prevent children from re-rendering because their JSX was created in the parent scope and didn't change.",
                "syntax": """// Before (Bad - Re-renders entire App on every keystroke)\nfunction App() {\n  const [query, setQuery] = useState('');\n  return (\n    <div>\n      <input value={query} onChange={e => setQuery(e.target.value)} />\n      <VeryHeavyDashboard /> {/* Re-renders every letter typed! */}\n    </div>\n  );\n}\n\n// After (State Colocation - VeryHeavyDashboard never re-renders!)\nfunction App() {\n  return (\n    <div>\n      <SearchBox /> {/* State is isolated inside */}\n      <VeryHeavyDashboard />\n    </div>\n  );\n}""",
                "codeExplanation": "`SearchBox` component ke andar state encapsulate hone ki wajah se, typing re-renders sirf us chote component tak seemit rehte hain.",
                "expectedOutput": "Zero keystroke input latency and 60fps buttery smooth UI responsiveness.",
                "practicalImplementation": """// Passing children as props to bypass re-renders\nfunction ScrollWrapper({ children }) {\n  const [scrollPos, setScrollPos] = React.useState(0);\n  return (\n    <div onScroll={(e) => setScrollPos(e.target.scrollTop)}>\n      <ScrollIndicator pos={scrollPos} />\n      {children} {/* children is NOT re-rendered when scrollPos changes! */}\n    </div>\n  );\n}""",
                "commonMistakes": "1. Storing derived state in useState: """const [fullName, setFullName] = useState(first + ' ' + last)`. (Derive it directly in render or useMemo!).\n2. Hoisting all modal/dialog open/close states to the root application component.",
                "interviewQuestions": [
                    {
                        "q": "What is State Colocation in React and why is it preferred over premature memoization?",
                        "a": "State colocation is moving state down to the lowest common ancestor that actually renders it. It solves the root cause of unnecessary re-renders naturally through component boundaries without the memory overhead and maintenance complexity of `useMemo` or `useCallback`."
                    },
                    {
                        "q": "How does passing components via 'children' prevent re-renders?",
                        "a": "When a component receives JSX via its `children` prop, that child element was created in the parent component. When the wrapper re-renders, React checks `wrapperProps.children === prevWrapperProps.children` and skips re-rendering the children tree."
                    }
                ],
                "assignment": "Refactor a bloated component with 4 unrelated input fields into 4 colocated, self-contained components.",
                "quiz": {
                    "question": "What is the primary rule of State Colocation?",
                    "options": ["Push all state to Redux store", "Keep state as close to where it is used as possible", "Never use useState", "Wrap every child in React.memo"],
                    "answer": 1,
                    "explanation": "State colocation dictates that state should be kept local to the components that directly read and update it."
                },
                "codeTemplate": `function ColocationBenchmarkLab() {\n  const [parentCount, setParentCount] = React.useState(0);\n\n  // Colocated Counter - isolates its own re-renders\n  function IsolatedWidget() {\n    const [localCount, setLocalCount] = React.useState(0);\n    return (\n      <div style={{ padding: '10px', background: '#dcfce7', borderRadius: '6px', marginTop: '8px' }}>\n        <strong>Local Colocated Counter: {localCount}</strong>\n        <button onClick={() => setLocalCount(c => c + 1)} style={{ marginLeft: '10px', padding: '4px 8px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px' }}>\n          Increment Local\n        </button>\n      </div>\n    );\n  }\n\n  return (\n    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <h3 style={{ margin: '0 0 10px 0' }}>State Colocation Demonstration</h3>\n      <p>Parent Counter: <strong>{parentCount}</strong></p>\n      <button onClick={() => setParentCount(c => c + 1)} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>\n        Increment Parent (Re-renders parent scope)\n      </button>\n      <IsolatedWidget />\n    </div>\n  );\n}\nrender(<ColocationBenchmarkLab />);"""
            },
            {
                "id": "m10-virtualization",
                "title": "2. List Virtualization for Large Datasets (react-window)",
                "level": "Advanced",
                "summary": "Render massive lists of 10,000+ items at 60 FPS by rendering only the visible viewport slice using react-window.",
                "intro": "Agar aap DOM me 10,000 items ka array ek sath render kar denge, to browser ka main thread freeze ho jayega aur memory crash ho jayegi. List virtualization iska ultimate solution hai.",
                "whatIsIt": "Virtualization (or Windowing) is a technique where instead of rendering all 10,000 items into the DOM, you only render the tiny slice (e.g. 10 to 15 items) that is currently visible in the user's viewport, swapping elements dynamically as they scroll.",
                "whyNeeded": "Enterprise tables, social media feeds, transaction histories, and contact books require rendering large amounts of data without browser stutter or multi-gigabyte memory consumption.",
                "analogy": "Jaise railway track par train ke aage chalte waqt sirf aage ki 100 meter patri (track) headlights me dikhti hai, poori 1000 km ki track ek sath dekhne ki zaroorat nahi hoti!",
                "technicalExplanation": "`react-window` calculates the total container height mathematically (`totalItems * itemHeight`). It creates an empty outer scroll container with that virtual height, calculates the current `scrollTop`, and renders only items `Math.floor(scrollTop / itemHeight)` through `Math.ceil((scrollTop + windowHeight) / itemHeight)` positioned with `position: absolute; top: ...`.",
                "syntax": """// react-window usage\nimport { FixedSizeList as List } from 'react-window';\n\nconst Row = ({ index, style }) => (\n  <div style={style} className=\"list-row\">\n    Row #{index}: Enterprise Record Data\n  </div>\n);\n\n<List height={400} itemCount={10000} itemSize={35} width=\"100%\">\n  {Row}\n</List>;""",
                "codeExplanation": "`itemCount={10000}` batata hai ki 10,000 records hain. Par DOM me at any given moment sirf ~12 `<div>` nodes hi exist karenge!",
                "expectedOutput": "Instantaneous rendering of 10,000+ records with zero lag and instant scrolling.",
                "practicalImplementation": """// Virtualized Grid for 2D arrays\n// import { FixedSizeGrid as Grid } from 'react-window';\n// <Grid columnCount={100} rowCount={1000} ... />""",
                "commonMistakes": "1. Forgetting to pass the `style` prop to each Row component in `react-window` (without `style`, the virtualization math and positioning completely breaks!).\n2. Using virtualization on small lists (e.g. 20 items). Virtualization introduces overhead and should be reserved for hundreds or thousands of rows.",
                "interviewQuestions": [
                    {
                        "q": "How does List Virtualization (react-window) achieve constant 60 FPS scrolling on 50,000 items?",
                        "a": "It keeps the DOM node count constant (~15-20 nodes) matching the visible screen height. As the user scrolls, it updates the data rendered in those existing nodes and repositions them using CSS `transform` or `top` offsets, keeping browser memory and layout recalculation negligible."
                    },
                    {
                        "q": "What is the difference between react-virtualized and react-window?",
                        "a": "`react-window` is a complete rewrite of `react-virtualized` by the same author (Brian Vaughn). It is significantly smaller (smaller bundle size), faster, and has a simpler API."
                    }
                ],
                "assignment": "Build a custom windowing calculator that calculates which items `[startIndex, endIndex]` should be rendered given `scrollTop=300px`, `containerHeight=400px`, and `itemHeight=40px`.",
                "quiz": {
                    "question": "If a virtualized list has 50,000 items and a viewport showing 12 items, approximately how many DOM nodes are rendered in the HTML?",
                    "options": ["50,000 DOM nodes", "12 to 15 DOM nodes", "1,000 DOM nodes", "0 DOM nodes"],
                    "answer": 1,
                    "explanation": "Only the visible items (plus a small overscan buffer of ~2-3 nodes) are kept in the DOM."
                },
                "codeTemplate": """function VirtualListLab() {\n  const [scrollTop, setScrollTop] = React.useState(0);\n  const totalItems = 5000;\n  const itemHeight = 36;\n  const viewportHeight = 180;\n\n  const startIndex = Math.floor(scrollTop / itemHeight);\n  const visibleCount = Math.ceil(viewportHeight / itemHeight) + 2;\n  const endIndex = Math.min(totalItems - 1, startIndex + visibleCount);\n\n  const visibleItems = [];\n  for (let i = startIndex; i <= endIndex; i++) {\n    visibleItems.push(i);\n  }\n\n  return (\n    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <h3 style={{ margin: '0 0 10px 0' }}>Virtual List Engine (5,000 Items)</h3>\n      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>\n        Total Virtual Records: <strong>{totalItems.toLocaleString()}</strong> | Currently Rendered in DOM: <strong>{visibleItems.length} nodes only!</strong>\n      </div>\n      <div\n        onScroll={(e) => setScrollTop(e.target.scrollTop)}\n        style={{ height: \`\${viewportHeight}px\""", overflowY: 'auto', border: '1px solid #cbd5e1', borderRadius: '6px', position: 'relative', background: '#f8fafc' }}\n      >\n        <div style={{ height: \`\${totalItems * itemHeight}px\`, position: 'relative' }}>\n          {visibleItems.map(idx => (\n            <div\n              key={idx}\n              style={{\n                position: 'absolute',\n                top: \`\${idx * itemHeight}px\`,\n                left: 0, right: 0, height: \`\${itemHeight}px\`,\n                display: 'flex', alignItems: 'center', padding: '0 12px',\n                borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc',\n                fontSize: '13px'\n              }}\n            >\n              🚀 Record #{idx + 1}: Enterprise Database Row (Virtual Offset: {idx * itemHeight}px)\n            </div>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n}\nrender(<VirtualListLab />);`
            }
        ],
        "exercises": [
            {
                "num": 1,
                "title": "Exercise 1: Profile a slow list render and optimize it with memo/useMemo/useCallback",
                "instructions": "Build an interactive benchmark with simulated slow items, showcasing render time dropping from ~200ms to <5ms using React.memo and useCallback.",
                "solutionCode": """const HeavyItem = React.memo(({ id, title, active, onToggle }) => {\n  return (\n    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: active ? '#dcfce7' : '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginBottom: '4px' }}>\n      <span>#{id}: {title}</span>\n      <button onClick={() => onToggle(id)} style={{ padding: '2px 8px', borderRadius: '4px', border: 'none', background: active ? '#16a34a' : '#2563eb', color: '#fff', cursor: 'pointer' }}>\n        {active ? 'Selected ✓' : 'Select'}\n      </button>\n    </div>\n  );\n});\n\nfunction MemoProfilingLab() {\n  const [selectedId, setSelectedId] = React.useState(1);\n  const [parentTick, setParentTick] = React.useState(0);\n\n  const items = React.useMemo(() => [\n    { id: 1, title: 'Server Cache Layer' },\n    { id: 2, title: 'Database Index Optimizer' },\n    { id: 3, title: 'CDN Edge Worker' },\n    { id: 4, title: 'Brotli Compression Stream' }\n  ], []);\n\n  const handleToggle = React.useCallback((id) => {\n    setSelectedId(id);\n  }, []);\n\n  return (\n    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>\n        <h3 style={{ margin: 0 }}>Memoization Benchmark</h3>\n        <button onClick={() => setParentTick(t => t + 1)} style={{ padding: '6px 12px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px' }}>Re-render Parent ({parentTick})</button>\n      </div>\n      {items.map(item => (\n        <HeavyItem key={item.id} id={item.id} title={item.title} active={selectedId === item.id} onToggle={handleToggle} />\n      ))}\n    </div>\n  );\n}\nrender(<MemoProfilingLab />);"""
            },
            {
                "num": 2,
                "title": "Exercise 2: Code-split a large app into lazy-loaded routes",
                "instructions": "Construct a multi-route view using simulated lazy dynamic chunks with Suspense fallback spinners for fast initial load.",
                "solutionCode": """function CodeSplitRoutesLab() {\n  const [tab, setTab] = React.useState('feed');\n  const [loading, setLoading] = React.useState(false);\n\n  const switchTab = (t) => {\n    setLoading(true);\n    setTimeout(() => {\n      setTab(t);\n      setLoading(false);\n    }, 400);\n  };\n\n  return (\n    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>\n        {['feed', 'analytics', 'settings'].map(t => (\n          <button key={t} onClick={() => switchTab(t)} style={{\n            padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',\n            background: tab === t ? '#2563eb' : '#e2e8f0',\n            color: tab === t ? '#fff' : '#1e293b'\n          }}>{t.toUpperCase()}</button>\n        ))}\n      </div>\n      {loading ? (\n        <div style={{ padding: '20px', textAlign: 'center', color: '#2563eb' }}>\n          ⏳ Suspense Fallback: Fetching lazy route chunk...\n        </div>\n      ) : (\n        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>\n          Active Lazy Route: <strong>/{tab}</strong>\n        </div>\n      )}\n    </div>\n  );\n}\nrender(<CodeSplitRoutesLab />);"""
            },
            {
                "num": 3,
                "title": "Exercise 3: Render a 1000+ item list efficiently using virtualization",
                "instructions": "Demonstrate smooth 60fps scrolling over 1,000 records using a custom virtualized container that mounts only 10 DOM elements at any time.",
                "solutionCode": """function Virtual1000Lab() {\n  const [scroll, setScroll] = React.useState(0);\n  const total = 1000;\n  const rowHeight = 32;\n  const viewHeight = 160;\n\n  const start = Math.floor(scroll / rowHeight);\n  const count = Math.ceil(viewHeight / rowHeight) + 1;\n  const slice = Array.from({ length: count }, (_, i) => start + i).filter(i => i < total);\n\n  return (\n    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <h3 style={{ margin: '0 0 10px 0' }}>1,000 Items Virtualized (Memory Optimized)</h3>\n      <div onScroll={(e) => setScroll(e.target.scrollTop)} style={{ height: \`\${viewHeight}px\""", overflowY: 'auto', border: '1px solid #cbd5e1', position: 'relative', background: '#fff' }}>\n        <div style={{ height: \`\${total * rowHeight}px\`, position: 'relative' }}>\n          {slice.map(idx => (\n            <div key={idx} style={{\n              position: 'absolute', top: \`\${idx * rowHeight}px\`, left: 0, right: 0, height: \`\${rowHeight}px\`,\n              display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '13px', borderBottom: '1px solid #f1f5f9'\n            }}>\n              Item #{idx + 1} - Production Asset Data\n            </div>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n}\nrender(<Virtual1000Lab />);`
            }
        ]
    },
    {
        "id": "module-11",
        "number": 11,
        "title": "Testing React Applications",
        "hindiTitle": "React Testing (Jest & React Testing Library)",
        "badge": "Code Quality & Assurance",
        "description": "Jest test runner, React Testing Library philosophy, screen, render, fireEvent, userEvent, unit testing, and snapshot testing.",
        "lessons": [
            {
                "id": "m11-jest-and-rtl",
                "title": "1. Jest & React Testing Library (render, screen, fireEvent)",
                "level": "Intermediate",
                "summary": "Write automated unit tests from the user's perspective using React Testing Library and Jest matchers.",
                "intro": "Production codebases me automated tests ke bina code deploy karna suicidal hota hai. Jest aur React Testing Library (RTL) React testing ke industry benchmark hain.",
                "whatIsIt": "Jest is a JavaScript test runner and assertion library (`expect(val).toBe(...)`). React Testing Library (RTL) is a testing utility that renders components into a virtual DOM and tests them like a real human user interacting with the screen.",
                "whyNeeded": "RTL philosophy: 'The more your tests resemble the way your software is used, the more confidence they can give you.' Avoid testing internal implementation details (state, class methods); test visible text and user interactions.",
                "analogy": "Car safety test jaisa hai: test driver car ke engine ka internal piston haath se nahi hilata, balki steering ghumata hai aur brakes dabata hai (real user testing)!",
                "technicalExplanation": "RTL renders components using JSDOM (a headless browser DOM implementation in Node). The `screen` object exposes accessible query methods: """getByRole""", `getByText`, `getByLabelText`, and `queryByText` (for checking element absence). `fireEvent` and `@testing-library/user-event` dispatch synthetic user events.",
                "syntax": """// RTL Test Case\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport Counter from './Counter';\n\ntest('increments counter on button click', () => {\n  render(<Counter />);\n  const button = screen.getByRole('button', { name: /increment/i });\n  fireEvent.click(button);\n  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();\n});""",
                "codeExplanation": "`render(<Counter />)` component ko virtual DOM me mount karta hai. `screen.getByRole` accessibility tree ke hisab se button dhundta hai. `expect(...).toBeInTheDocument()` assertion verify karti hai.",
                "expectedOutput": "Green passing test suite in terminal: """PASS src/Counter.test.js`.",
                "practicalImplementation": `// Testing Form Submissions\ntest('shows error when username is empty', async () => {\n  render(<LoginForm />);\n  fireEvent.click(screen.getByRole('button', { name: /submit/i }));\n  expect(await screen.findByText(/username is required/i)).toBeInTheDocument();\n});""",
                "commonMistakes": "1. Using `getByTestId` everywhere when accessible queries like `getByRole` or `getByLabelText` are available.\n2. Using `getBy...` to assert that an element is NOT present. (It throws an error immediately! Use `queryBy...` for absence checks: """expect(screen.queryByText('Error')).toBeNull()`).",
                "interviewQuestions": [
                    {
                        "q": "What is the priority order of queries recommended by React Testing Library?",
                        "a": "1. Queries accessible to everyone: `getByRole""", `getByLabelText`, `getByPlaceholderText`, `getByText`. 2. Semantic queries: """getByAltText""", `getByTitle`. 3. Test IDs (last resort): """getByTestId`."
                    },
                    {
                        "q": "What is the difference between getBy, queryBy, and findBy?",
                        "a": "`getBy*` returns the matching node or throws an error if not found. `queryBy*` returns the matching node or `null` if not found (used to assert absence). `findBy*` returns a Promise that resolves when the element appears, used for asynchronous operations."
                    }
                ],
                "assignment": "Write a Jest test suite for a Todo app covering adding a task, toggling a task, and deleting a task.",
                "quiz": {
                    "question": "Which query should you use to check that an error message is NOT rendered on the screen?",
                    "options": ["screen.getByText()", "screen.queryByText()", "screen.findByText()", "screen.notText()"],
                    "answer": 1,
                    "explanation": "queryByText returns null if the element is absent, whereas getByText immediately throws an exception."
                },
                "codeTemplate": `function InteractiveTestSimulator() {\n  const [tests, setTests] = React.useState([\n    { name: 'Renders Counter initial value 0', status: 'idle' },\n    { name: 'Dispatches click and increments to 1', status: 'idle' },\n    { name: 'Resets counter to 0 upon reset button click', status: 'idle' }\n  ]);\n  const [running, setRunning] = React.useState(false);\n\n  const runAllTests = () => {\n    setRunning(true);\n    setTests(tests.map(t => ({ ...t, status: 'running' })));\n    setTimeout(() => {\n      setTests(tests.map(t => ({ ...t, status: 'pass' })));\n      setRunning(false);\n    }, 1200);\n  };\n\n  return (\n    <div style={{ padding: '20px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px' }}>\n      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>\n        <h3 style={{ margin: 0, color: '#38bdf8' }}>Jest + RTL Test Runner Sandbox</h3>\n        <button onClick={runAllTests} disabled={running} style={{ padding: '8px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>\n          {running ? 'Executing Tests in JSDOM...' : '▶ Run Jest Test Suite'}\n        </button>\n      </div>\n      <div style={{ display: 'grid', gap: '8px' }}>\n        {tests.map((test, i) => (\n          <div key={i} style={{ padding: '10px 14px', background: '#1e293b', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>\n            <span>{test.name}</span>\n            <span style={{\n              fontWeight: 'bold', fontSize: '12px',\n              color: test.status === 'pass' ? '#4ade80' : test.status === 'running' ? '#38bdf8' : '#94a3b8'\n            }}>\n              {test.status === 'pass' ? '✓ PASS' : test.status === 'running' ? '⏳ RUNNING' : 'IDLE'}\n            </span>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}\nrender(<InteractiveTestSimulator />);"""
            }
        ],
        "exercises": [
            {
                "num": 1,
                "title": "Exercise 1: Write unit tests for a form component (render + validation + submit)",
                "instructions": "Demonstrate the complete RTL test suite testing empty submit errors, valid input handling, and form submission dispatch.",
                "solutionCode": """function FormTestingSuiteLab() {\n  const [suiteLog, setSuiteLog] = React.useState([\n    'PASS src/components/RegisterForm.test.tsx',\n    '  ✓ renders email and password fields (42 ms)',\n    '  ✓ displays error message when submitted empty (28 ms)',\n    '  ✓ calls onSubmit prop with valid data (35 ms)',\n    'Test Suites: 1 passed, 1 total',\n    'Tests:       3 passed, 3 total'\n  ]);\n\n  return (\n    <div style={{ padding: '20px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px' }}>\n      <h3 style={{ margin: '0 0 12px 0', color: '#38bdf8' }}>Jest Form Unit Test Output</h3>\n      <pre style={{ background: '#1e293b', padding: '14px', borderRadius: '8px', color: '#4ade80', fontSize: '13px', lineHeight: '1.6' }}>\n        {suiteLog.join('\\n')}\n      </pre>\n    </div>\n  );\n}\nrender(<FormTestingSuiteLab />);"""
            },
            {
                "num": 2,
                "title": "Exercise 2: Write a snapshot test for a presentational component",
                "instructions": "Demonstrate Jest Snapshot testing (`expect(tree).toMatchSnapshot()`) that detects unintended visual markup regressions.",
                "solutionCode": """function SnapshotTestingLab() {\n  const snapshot = \`exports[\`ProductCard renders correctly 1\"""] = \\\`\n<div class=\"card shadow\">\n  <h4 class=\"title\">Apple MacBook Air M3</h4>\n  <span class=\"badge\">In Stock</span>\n  <button class=\"btn-buy\">Add to Cart</button>\n</div>\n\\\`;\`;\n\n  return (\n    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <h3 style={{ margin: '0 0 10px 0' }}>Jest Snapshot Testing Artifact</h3>\n      <p style={{ fontSize: '13px', color: '#475569' }}>\n        Snapshot tests serialize the rendered React tree to disk and compare it against future test runs to prevent regressions.\n      </p>\n      <pre style={{ background: '#0f172a', color: '#38bdf8', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>\n        {snapshot}\n      </pre>\n    </div>\n  );\n}\nrender(<SnapshotTestingLab />);`
            }
        ]
    },
    {
        "id": "module-12",
        "number": 12,
        "title": "Deployment, Git & SEO",
        "hindiTitle": "Git Workflow, Cloud Deployment (Vercel/Netlify) & React SEO",
        "badge": "Production Launch",
        "description": "Git setup, push/pull, GitHub CI/CD, production builds, Netlify & Vercel deployment, React Helmet, and meta tag SEO.",
        "lessons": [
            {
                "id": "m12-git-and-deployment",
                "title": "1. Git Workflow, Production Build & Vercel/Netlify Deployment",
                "level": "Intermediate",
                "summary": "Master git version control, production minification (`npm run build`), and automated zero-config deployments on Vercel and Netlify.",
                "intro": "Code ko local machine se nikaal kar poori duniya ke samne live host karna developer journey ka sabse exciting step hota hai.",
                "whatIsIt": "Git is a distributed version control system. `npm run build` runs Vite/Webpack to compile, minify, and bundle your app into static files in the `/dist` directory. Vercel and Netlify provide global edge CDN hosting connected directly to your GitHub repository.",
                "whyNeeded": "You never deploy `npm run dev` to production. Production builds strip development warnings, minify code, enable tree-shaking, and compress assets for lightning-fast worldwide delivery.",
                "analogy": "Local development ghar me khana pakane jaisa hai. Production build khane ko air-tight package me pack karke Amazon delivery vans (CDN) me daalna hai taaki poori duniya me turant pahuch sake!",
                "technicalExplanation": "The `dist/` or `build/` folder contains only static HTML, CSS, JavaScript chunks with content hashes (`app.a8f9c.js`), and media assets. In SPA deployment, the web server (Nginx/Netlify `_redirects`) must redirect all routes back to `index.html` (`/* /index.html 200`) so client-side routing works on hard page refresh.",
                "syntax": """# 1. Git Workflow\ngit init\ngit add .\ngit commit -m \"feat: initial release\"\ngit branch -M main\ngit remote add origin https://github.com/username/repo.git\ngit push -u origin main\n\n# 2. Production Build\nnpm run build""",
                "codeExplanation": "`git push` code ko GitHub par upload karta hai. Vercel/Netlify webhook trigger hota hai aur 30 seconds ke andar live URL generate kar deta hai.",
                "expectedOutput": "Live HTTPS production website accessible globally at `https://my-app.vercel.app`.",
                "practicalImplementation": """// netlify.toml or _redirects for React Router SPA:\n/*    /index.html   200\n\n// vercel.json rewrites:\n{\n  \"rewrites\": [{ \"source\": \"/(.*)\", \"destination\": \"/index.html\" }]\n}""",
                "commonMistakes": "1. Forgetting the SPA redirect rule (`/* /index.html 200`). When users refresh a subpage like `/products/42`, the server returns a 404 Not Found error!\n2. Committing `.env` secret keys or `node_modules` into GitHub (always put them in `.gitignore`).",
                "interviewQuestions": [
                    {
                        "q": "Why does refreshing a React Router page on Netlify or Vercel throw a 404 error without rewrite rules?",
                        "a": "Because React Router is a client-side Single Page Application. Physically, only `index.html` exists on the server. When the browser requests `/about`, the web server looks for a physical folder `/about/index.html` which doesn't exist. The rewrite rule forces the server to return `index.html` for all requests, allowing React Router to inspect the URL and render the correct view."
                    },
                    {
                        "q": "What happens during 'npm run build' in Vite?",
                        "a": "Vite uses Rollup to bundle your code, tree-shakes unused exports, transpiles modern syntax, minifies code (terser/esbuild), hashes filenames for long-term browser cache invalidation, and outputs production assets to `dist/`."
                    }
                ],
                "assignment": "Write a `vercel.json` file configuring SPA route rewrites and security headers.",
                "quiz": {
                    "question": "What is the purpose of adding '/* /index.html 200' in Netlify _redirects?",
                    "options": ["To encrypt all requests", "To allow client-side React Router navigation without 404 errors on page refresh", "To disable JavaScript", "To block search engines"],
                    "answer": 1,
                    "explanation": "It rewrites all incoming URLs to index.html so React Router can process the route on the client side."
                },
                "codeTemplate": """function DeploymentSimulator() {\n  const [deployStep, setDeployStep] = React.useState(0);\n  const steps = [\n    'Ready to Deploy',\n    '1. git push origin main',\n    '2. Vercel GitHub Webhook Received',\n    '3. Running vite build & optimization',\n    '4. Deployed to Global Edge CDN!'\n  ];\n\n  const advance = () => {\n    setDeployStep(s => (s < steps.length - 1 ? s + 1 : 0));\n  };\n\n  return (\n    <div style={{ padding: '20px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px' }}>\n      <h3 style={{ margin: '0 0 12px 0', color: '#38bdf8' }}>CI/CD Cloud Deployment Pipeline</h3>\n      <div style={{ padding: '14px', background: '#1e293b', borderRadius: '8px', marginBottom: '14px' }}>\n        Pipeline Status: <strong style={{ color: deployStep === 4 ? '#4ade80' : '#38bdf8' }}>{steps[deployStep]}</strong>\n      </div>\n      <button onClick={advance} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>\n        {deployStep === 4 ? 'Reset Pipeline' : 'Advance Next CI/CD Step →'}\n      </button>\n      {deployStep === 4 && (\n        <div style={{ marginTop: '12px', padding: '10px', background: '#064e3b', color: '#6ee7b7', borderRadius: '6px', fontSize: '13px' }}>\n          🚀 Live at <strong>https://react-mastery-pro.vercel.app</strong> (Global latency: 18ms)\n        </div>\n      )}\n    </div>\n  );\n}\nrender(<DeploymentSimulator />);"""
            },
            {
                "id": "m12-seo-and-react-helmet",
                "title": "2. SEO for React Apps & React Helmet Meta Tags",
                "level": "Intermediate",
                "summary": "Optimize Single Page Applications for Google Search crawlers, Open Graph social cards, and dynamic document titles using React Helmet.",
                "intro": "Pehle SPAs ka sabse bada drawback SEO (Search Engine Optimization) tha kyunki browser shuru me khali HTML download karta tha. React Helmet dynamic meta tags inject karke SEO optimize karta hai.",
                "whatIsIt": "React Helmet (`react-helmet-async`) is a component that manages your document head (`<head>`). It allows each route to declare its own `<title>`, `<meta name='description'>`, and Open Graph tags for WhatsApp, Twitter, and LinkedIn previews.",
                "whyNeeded": "When someone shares your blog or e-commerce product link on WhatsApp or Twitter, social bots parse the `<head>` meta tags to display rich image cards and titles.",
                "analogy": "Jaise book ka front cover aur summary blurb: agar cover khali hoga to koi dukan me use nahi dekhega. React Helmet har page ke hisab se attractive book cover lagata hai!",
                "technicalExplanation": "React Helmet updates `document.title` and injects meta tags into the DOM head on client-side route transitions. For maximum SEO for e-commerce, frameworks like Next.js (SSR / SSG) pre-render HTML on the server so crawlers don't even need JavaScript enabled.",
                "syntax": """import { Helmet } from 'react-helmet-async';\n\nfunction ProductPage({ product }) {\n  return (\n    <div>\n      <Helmet>\n        <title>{product.name} | Best Prices in India</title>\n        <meta name=\"description\" content={product.description} />\n        <meta property=\"og:title\" content={product.name} />\n        <meta property=\"og:image\" content={product.imageUrl} />\n      </Helmet>\n      <h1>{product.name}</h1>\n    </div>\n  );\n}""",
                "codeExplanation": "`<Helmet>` tags route change hone par dynamically document head me inject hote hain aur previous route ke meta tags ko replace karte hain.",
                "expectedOutput": "Browser tab updates title dynamically; social share preview cards render rich images and descriptions.",
                "practicalImplementation": """// Global Helmet Provider wrapper in App.jsx\n// <HelmetProvider><App /></HelmetProvider>""",
                "commonMistakes": "1. Using legacy `react-helmet` instead of modern `react-helmet-async` in React 18, which causes memory leaks and warnings in concurrent mode.\n2. Forgetting Open Graph (`og:image`) absolute URL requirements (relative paths `/img.png` fail on social scrapers).",
                "interviewQuestions": [
                    {
                        "q": "Why is client-side React traditionally challenged by SEO and how do you solve it?",
                        "a": "Because standard SPAs serve a nearly blank HTML shell (`<div id='root'></div>`) that populates via JS. While modern Googlebot executes JS, social crawlers (Twitter, LinkedIn, WhatsApp) do not. Solutions include React Helmet for meta tags, Pre-rendering (SSG), or migrating to Next.js for Server-Side Rendering (SSR)."
                    },
                    {
                        "q": "Why should you use react-helmet-async instead of react-helmet in React 18?",
                        "a": "`react-helmet` used legacy thread-unsafe patterns that cause race conditions and memory leaks during React 18 concurrent rendering and SSR. `react-helmet-async` safely scopes the head state using React context."
                    }
                ],
                "assignment": "Create a metadata manager component that injects Twitter Card tags (`twitter:card`, `twitter:site`) into the document head.",
                "quiz": {
                    "question": "Which package is the modern, thread-safe successor to react-helmet for React 18?",
                    "options": ["react-head-v2", "react-helmet-async", "next-meta", "react-dom-meta"],
                    "answer": 1,
                    "explanation": "react-helmet-async is the officially recommended concurrent-safe successor to react-helmet."
                },
                "codeTemplate": """function DynamicSeoLab() {\n  const [article, setArticle] = React.useState({\n    title: 'Mastering React 18 & Redux Toolkit',\n    desc: 'The complete enterprise guide to building modern reactive SPAs in 2026.',\n    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'\n  });\n\n  return (\n    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <h3 style={{ margin: '0 0 10px 0' }}>React Helmet & Social Share Preview</h3>\n      <div style={{ padding: '14px', background: '#0f172a', color: '#f8fafc', borderRadius: '8px', fontSize: '12px', marginBottom: '14px' }}>\n        <div style={{ color: '#38bdf8' }}>&lt;title&gt;{article.title}&lt;/title&gt;</div>\n        <div style={{ color: '#94a3b8' }}>&lt;meta name=\"description\" content=\"{article.desc}\" /&gt;</div>\n        <div style={{ color: '#4ade80' }}>&lt;meta property=\"og:image\" content=\"{article.image}\" /&gt;</div>\n      </div>\n      <h4>Social Card Simulation (WhatsApp / Twitter):</h4>\n      <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', maxWidth: '340px' }}>\n        <img src={article.image} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />\n        <div style={{ padding: '10px' }}>\n          <strong style={{ fontSize: '13px' }}>{article.title}</strong>\n          <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>{article.desc}</p>\n        </div>\n      </div>\n    </div>\n  );\n}\nrender(<DynamicSeoLab />);"""
            }
        ],
        "exercises": [
            {
                "num": 1,
                "title": "Exercise 1: Set up a Git repo, push project, and deploy it live on Netlify/Vercel",
                "instructions": "Demonstrate the step-by-step terminal commands for git initialization, commit, push, and cloud build configuration with continuous deployment.",
                "solutionCode": """function GitDeployTerminalLab() {\n  const commands = [\n    '$ git init',\n    '$ git add .',\n    '$ git commit -m \"feat: complete react redux learning suite\"',\n    '$ git remote add origin https://github.com/developer/react-learning-suite.git',\n    '$ git push -u origin main',\n    '---> Vercel Build Triggered Automatically',\n    '---> Build Command: vite build [dist created in 1.4s]',\n    '---> Deployed URL: https://react-mastery.vercel.app [Status: 200 OK]'\n  ];\n\n  return (\n    <div style={{ padding: '20px', background: '#0f172a', color: '#4ade80', borderRadius: '12px', fontFamily: 'monospace', fontSize: '13px' }}>\n      <div style={{ color: '#94a3b8', marginBottom: '8px' }}># Production Deployment Terminal Trace</div>\n      {commands.map((cmd, i) => (\n        <div key={i} style={{ margin: '4px 0' }}>{cmd}</div>\n      ))}\n    </div>\n  );\n}\nrender(<GitDeployTerminalLab />);"""
            },
            {
                "num": 2,
                "title": "Exercise 2: Add SEO meta tags to key pages using react-helmet",
                "instructions": "Build dynamic page title and Open Graph meta switcher that changes document title and description dynamically on tab change.",
                "solutionCode": """function HelmetSeoLab() {\n  const [activePage, setActivePage] = React.useState('Courses');\n\n  const metaData = {\n    Courses: { title: 'React & TypeScript Courses | ReactMastery', desc: 'Explore all 12 modules from fundamentals to advanced patterns.' },\n    Projects: { title: '10 Hands-on React Projects | ReactMastery', desc: 'Build production-ready apps including e-commerce and admin panels.' },\n    Interview: { title: '100+ React Interview Q&A | ReactMastery', desc: 'Ace your next tech interview with job-ready answers.' }\n  };\n\n  return (\n    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <h3 style={{ margin: '0 0 12px 0' }}>Dynamic Helmet Head Manager</h3>\n      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>\n        {Object.keys(metaData).map(p => (\n          <button key={p} onClick={() => setActivePage(p)} style={{\n            padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',\n            background: activePage === p ? '#2563eb' : '#e2e8f0',\n            color: activePage === p ? '#fff' : '#1e293b'\n          }}>{p}</button>\n        ))}\n      </div>\n      <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>\n        <p>Injected Document Title: <strong style={{ color: '#2563eb' }}>{metaData[activePage].title}</strong></p>\n        <p style={{ fontSize: '13px', color: '#64748b' }}>Injected Meta Description: {metaData[activePage].desc}</p>\n      </div>\n    </div>\n  );\n}\nrender(<HelmetSeoLab />);"""
            }
        ]
    }
]
