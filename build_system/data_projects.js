/**
 * 10 Capstone Projects Data for ReactMastery
 * Fully Enriched with Requirements, Concepts, Code, Steps, and Assessments
 */

module.exports = [
  {
    "id": "proj-1",
    "number": 1,
    "title": "1. Advanced Counter Application",
    "difficulty": "Beginner",
    "badge": "State & Events",
    "summary": "Build a responsive counter with step controls (+1, +5, +10), lower/upper bounds, history undo, and sound effects.",
    "requirements": [
      "Maintain numeric count state initialized to 0",
      "Buttons to increment, decrement, and reset",
      "Configurable step size (+1, +5, +10, +50)",
      "Boundary enforcement (min: -100, max: 1000)",
      "Visual color shifts when count is negative (red), zero (gray), or positive (green)",
      "Recent activity history log with timestamp"
    ],
    "folderStructure": "counter-app/\n├── public/\n│   └── favicon.ico\n├── src/\n│   ├── components/\n│   │   ├── CounterDisplay.jsx\n│   │   ├── StepSelector.jsx\n│   │   └── HistoryList.jsx\n│   ├── App.jsx\n│   ├── main.jsx\n│   └── index.css\n├── package.json\n└── vite.config.js",
    "steps": [
      "Step 1: Scaffold Vite project and initialize useState for count and step size.",
      "Step 2: Create pure helper functions for bounds clamping (Math.max, Math.min).",
      "Step 3: Track history stack of last 5 operations with Array.slice.",
      "Step 4: Style buttons with hover states and active color cues."
    ],
    "explanation": "This project teaches the fundamentals of component memory using useState, functional updates setCount(prev => prev + step), immutability in array history logging, and clean UI state reflection.",
    "expectedResult": "An attractive, interactive counter card that prevents invalid values and displays an undoable move log.",
    "checklist": [
      "Does count increment and decrement by selected step?",
      "Is the reset button resetting count to 0 and clearing history?",
      "Does count change color based on positive/negative value?",
      "Are bounds respected properly without crashing?"
    ],
    "runnableCode": "function ProjectCounterApp() {\n  const [count, setCount] = React.useState(0);\n  const [step, setStep] = React.useState(1);\n  const [history, setHistory] = React.useState([]);\n\n  const updateCount = (delta) => {\n    setCount(prev => {\n      const next = prev + delta;\n      setHistory(h => [{ val: next, delta, time: new Date().toLocaleTimeString() }, ...h.slice(0, 4)]);\n      return next;\n    });\n  };\n\n  return (\n    <div style={{ maxWidth: '420px', margin: '0 auto', padding: '24px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', textAlign: 'center' }}>\n      <h3 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>⚡ Advanced Counter Pro</h3>\n      <div style={{\n        fontSize: '56px', fontWeight: '800', margin: '20px 0',\n        color: count > 0 ? '#16a34a' : count < 0 ? '#dc2626' : '#64748b'\n      }}>\n        {count}\n      </div>\n      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>\n        {[1, 5, 10, 50].map(s => (\n          <button key={s} onClick={() => setStep(s)} style={{\n            padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',\n            background: step === s ? '#2563eb' : '#f1f5f9',\n            color: step === s ? '#fff' : '#475569', fontWeight: 'bold'\n          }}>Step: {s}</button>\n        ))}\n      </div>\n      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>\n        <button onClick={() => updateCount(-step)} style={{ padding: '12px 24px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>-{step}</button>\n        <button onClick={() => { setCount(0); setHistory([]); }} style={{ padding: '12px 18px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Reset</button>\n        <button onClick={() => updateCount(step)} style={{ padding: '12px 24px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>+{step}</button>\n      </div>\n      <div style={{ textAlign: 'left', background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>\n        <strong style={{ fontSize: '12px', color: '#64748b' }}>Action Log:</strong>\n        {history.map((item, i) => (\n          <div key={i} style={{ fontSize: '12px', color: '#334155', marginTop: '4px' }}>\n            • Changed by {item.delta > 0 ? '+' + item.delta : item.delta} → Result: {item.val} at {item.time}\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}\nrender(<ProjectCounterApp />);",
    "conceptsRequired": [
      "useState Hook",
      "Event Handling (onClick)",
      "Immutability in Arrays",
      "Conditional CSS Styling",
      "Bounds Checking"
    ],
    "commonErrors": "1. Directly modifying count (count++ instead of setCount(prev => prev + 1)). 2. Mutating history array directly with push() instead of spread operator. 3. Missing minimum and maximum boundary checks causing overflow.",
    "finalAssessment": "Mini Challenge: Add an auto-play timer that increments the counter automatically every 1 second, with a Pause / Resume button!"
  },
  {
    "id": "proj-2",
    "number": 2,
    "title": "2. Modern Login Form with Authentication Card",
    "difficulty": "Beginner",
    "badge": "Controlled Forms",
    "summary": "Build a responsive login and signup UI with show/hide password, real-time regex validation, remember-me checkbox, and Welcome banner.",
    "requirements": [
      "Controlled inputs for email and password",
      "Show/Hide password toggle visibility icon",
      "Email regex verification and min 6-char password constraint",
      "Remember Me checkbox persisting username in localStorage",
      "Interactive Welcome Card with personalized greeting upon success",
      "Clean error messages displaying inline underneath fields"
    ],
    "folderStructure": "login-auth-card/\n├── src/\n│   ├── components/\n│   │   ├── AuthCard.jsx\n│   │   ├── WelcomeBanner.jsx\n│   │   └── InputField.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Set up controlled state for form inputs and toggleable password visibility.",
      "Step 2: Implement validation logic using regular expressions on submit.",
      "Step 3: Save 'remembered' username into localStorage on success.",
      "Step 4: Render transition to a Welcome Card displaying logged-in credentials."
    ],
    "explanation": "Teaches controlled form state, e.preventDefault(), regular expression input checking, conditional rendering between auth form and authenticated dashboard, and localStorage persistence.",
    "expectedResult": "An attractive auth card that validates input fields, supports toggleable password view, and transitions to a Welcome User screen.",
    "checklist": [
      "Does the password toggle switch between text and password type?",
      "Are invalid email formats rejected with inline error?",
      "Does logging out return the user back to the sign-in form?"
    ],
    "runnableCode": "function ProjectLoginFormApp() {\n  const [auth, setAuth] = React.useState({ email: '', password: '', remember: true });\n  const [showPassword, setShowPassword] = React.useState(false);\n  const [user, setUser] = React.useState(null);\n  const [error, setError] = React.useState('');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!auth.email.includes('@')) { setError('Please enter a valid email address'); return; }\n    if (auth.password.length < 6) { setError('Password must be at least 6 characters'); return; }\n    setError('');\n    setUser({ name: auth.email.split('@')[0], email: auth.email });\n  };\n\n  if (user) {\n    return (\n      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '32px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', borderRadius: '16px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>\n        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#38bdf8', color: '#0f172a', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontWeight: 'bold' }}>\n          {user.name.charAt(0).toUpperCase()}\n        </div>\n        <h2 style={{ margin: '0 0 8px 0', color: '#fff' }}>Welcome, {user.name}! 👋</h2>\n        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Logged in with {user.email}</p>\n        <button onClick={() => { setUser(null); setAuth({ email: '', password: '', remember: true }); }} style={{ padding: '10px 20px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>\n          Sign Out\n        </button>\n      </div>\n    );\n  }\n\n  return (\n    <div style={{ maxWidth: '380px', margin: '0 auto', padding: '28px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>\n      <h3 style={{ margin: '0 0 6px 0', color: '#0f172a', textAlign: 'center' }}>Member Sign In</h3>\n      <p style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', margin: '0 0 16px 0' }}>Enter your credentials to access the workspace</p>\n      {error && <div style={{ padding: '8px 12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '13px', marginBottom: '14px' }}>{error}</div>}\n      <form onSubmit={handleSubmit}>\n        <div style={{ marginBottom: '12px' }}>\n          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Email</label>\n          <input\n            value={auth.email}\n            onChange={e => setAuth({ ...auth, email: e.target.value })}\n            placeholder=\"alex@company.com\"\n            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}\n          />\n        </div>\n        <div style={{ marginBottom: '12px' }}>\n          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Password</label>\n          <div style={{ position: 'relative' }}>\n            <input\n              type={showPassword ? 'text' : 'password'}\n              value={auth.password}\n              onChange={e => setAuth({ ...auth, password: e.target.value })}\n              placeholder=\"••••••••\"\n              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}\n            />\n            <button\n              type=\"button\"\n              onClick={() => setShowPassword(!showPassword)}\n              style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#64748b' }}\n            >\n              {showPassword ? '🙈' : '👁️'}\n            </button>\n          </div>\n        </div>\n        <button type=\"submit\" style={{ width: '100%', padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>\n          Sign In →\n        </button>\n      </form>\n    </div>\n  );\n}\nrender(<ProjectLoginFormApp />);",
    "conceptsRequired": [
      "Controlled Inputs",
      "Form Event Prevention (e.preventDefault)",
      "Regular Expressions (Email Regex)",
      "Password Masking Toggle",
      "Conditional View Rendering"
    ],
    "commonErrors": "1. Forgetting e.preventDefault() causing browser page reload and loss of state. 2. Not setting input value prop making form uncontrolled. 3. Hardcoding authentication credentials in client-side production builds.",
    "finalAssessment": "Mini Challenge: Add a \"Confirm Password\" field and show an inline error message if passwords do not match in real time!"
  },
  {
    "id": "proj-3",
    "number": 3,
    "title": "3. Full-Featured CRUD Application",
    "difficulty": "Intermediate",
    "badge": "State Mutation & Forms",
    "summary": "Build a complete in-memory CRUD app to Create, Read, Update, and Delete items with live search and inline edit mode.",
    "requirements": [
      "Display records in a responsive table",
      "Form to add new items with validation",
      "Inline edit mode for modifying existing items",
      "Delete confirmation with instant state update",
      "Real-time search filter query across title and category",
      "Local storage synchronization to persist entries across reload"
    ],
    "folderStructure": "crud-app/\n├── src/\n│   ├── components/\n│   │   ├── ItemTable.jsx\n│   │   ├── ItemForm.jsx\n│   │   └── SearchBar.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Define initial data array and sync with localStorage.",
      "Step 2: Create add handler with auto-generated unique ID (Date.now()).",
      "Step 3: Implement inline editing state editingId to toggle row into editable inputs.",
      "Step 4: Implement delete with filter and search query."
    ],
    "explanation": "Teaches fundamental data manipulation in React: immutably creating ([...prev, item]), updating (prev.map(i => i.id === id ? ... : i)), and deleting (prev.filter(i => i.id !== id)).",
    "expectedResult": "A production-like database table allowing users to add, search, edit in-place, and delete records seamlessly.",
    "checklist": [
      "Can new items be added without reloading?",
      "Does editing update the exact item without corrupting others?",
      "Does search filter the table immediately as you type?"
    ],
    "runnableCode": "function ProjectCrudApp() {\n  const [items, setItems] = React.useState([\n    { id: 1, title: 'MacBook Pro 16\"', category: 'Hardware', price: 2499 },\n    { id: 2, title: 'Figma Enterprise Seat', category: 'Software', price: 45 }\n  ]);\n  const [search, setSearch] = React.useState('');\n  const [editingId, setEditingId] = React.useState(null);\n  const [editForm, setEditForm] = React.useState({ title: '', category: '', price: '' });\n  const [newForm, setNewForm] = React.useState({ title: '', category: 'Hardware', price: '' });\n\n  const handleAdd = (e) => {\n    e.preventDefault();\n    if (!newForm.title || !newForm.price) return;\n    setItems([...items, { id: Date.now(), title: newForm.title, category: newForm.category, price: Number(newForm.price) }]);\n    setNewForm({ title: '', category: 'Hardware', price: '' });\n  };\n\n  const startEdit = (item) => {\n    setEditingId(item.id);\n    setEditForm({ title: item.title, category: item.category, price: item.price });\n  };\n\n  const saveEdit = (id) => {\n    setItems(items.map(i => i.id === id ? { ...i, ...editForm, price: Number(editForm.price) } : i));\n    setEditingId(null);\n  };\n\n  const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));\n\n  return (\n    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>\n      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>\n        <h3 style={{ margin: 0 }}>📦 Inventory CRUD Manager</h3>\n        <input\n          value={search}\n          onChange={e => setSearch(e.target.value)}\n          placeholder=\"Search inventory...\"\n          style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}\n        />\n      </div>\n      <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '8px', marginBottom: '16px' }}>\n        <input value={newForm.title} onChange={e => setNewForm({ ...newForm, title: e.target.value })} placeholder=\"Item title\" style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />\n        <select value={newForm.category} onChange={e => setNewForm({ ...newForm, category: e.target.value })} style={{ padding: '8px', borderRadius: '6px' }}>\n          <option>Hardware</option><option>Software</option><option>Services</option>\n        </select>\n        <input type=\"number\" value={newForm.price} onChange={e => setNewForm({ ...newForm, price: e.target.value })} placeholder=\"Price ($)\" style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />\n        <button type=\"submit\" style={{ padding: '8px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Add</button>\n      </form>\n      <table style={{ width: '100%', borderCollapse: 'collapse' }}>\n        <thead>\n          <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>\n            <th style={{ padding: '10px' }}>Title</th>\n            <th style={{ padding: '10px' }}>Category</th>\n            <th style={{ padding: '10px' }}>Price</th>\n            <th style={{ padding: '10px' }}>Actions</th>\n          </tr>\n        </thead>\n        <tbody>\n          {filtered.map(item => (\n            <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>\n              {editingId === item.id ? (\n                <>\n                  <td style={{ padding: '8px' }}><input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} style={{ padding: '4px' }} /></td>\n                  <td style={{ padding: '8px' }}><input value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} style={{ padding: '4px' }} /></td>\n                  <td style={{ padding: '8px' }}><input type=\"number\" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} style={{ padding: '4px', width: '80px' }} /></td>\n                  <td style={{ padding: '8px' }}>\n                    <button onClick={() => saveEdit(item.id)} style={{ padding: '4px 8px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', marginRight: '4px' }}>Save</button>\n                    <button onClick={() => setEditingId(null)} style={{ padding: '4px 8px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px' }}>Cancel</button>\n                  </td>\n                </>\n              ) : (\n                <>\n                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.title}</td>\n                  <td style={{ padding: '10px' }}>{item.category}</td>\n                  <td style={{ padding: '10px', color: '#0284c7' }}>${item.price}</td>\n                  <td style={{ padding: '10px' }}>\n                    <button onClick={() => startEdit(item)} style={{ padding: '4px 8px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '4px', marginRight: '6px', cursor: 'pointer' }}>Edit</button>\n                    <button onClick={() => setItems(items.filter(i => i.id !== item.id))} style={{ padding: '4px 8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>\n                  </td>\n                </>\n              )}\n            </tr>\n          ))}\n        </tbody>\n      </table>\n    </div>\n  );\n}\nrender(<ProjectCrudApp />);",
    "conceptsRequired": [
      "State Immutability",
      "Array.map for inline updates",
      "Array.filter for deletions",
      "Search query filter predicates",
      "Modal / Edit Row State Management"
    ],
    "commonErrors": "1. Mutating item directly inside array. 2. Forgetting to provide a unique \"key\" prop on rendered table rows. 3. Not parsing numeric inputs causing string concatenation ($20 + $5 = $205).",
    "finalAssessment": "Mini Challenge: Add a multi-item batch delete checkbox allowing users to select and delete multiple records at once!"
  },
  {
    "id": "proj-4",
    "number": 4,
    "title": "4. Country & State API Cascading Dropdown",
    "difficulty": "Intermediate",
    "badge": "Async API & Dependency",
    "summary": "Build a dependent cascading dropdown fetching real-world country information, currencies, and dependent cities with flag previews.",
    "requirements": [
      "Fetch countries list dynamically from remote REST API (or simulated cloud API)",
      "Dependent secondary dropdown (States/Cities) that automatically updates when Country changes",
      "Display country national flag, currency code, and dial code card",
      "Graceful loading indicators while child data loads",
      "Error recovery button in case network is disconnected"
    ],
    "folderStructure": "country-dropdown/\n├── src/\n│   ├── services/\n│   │   └── countryApi.js\n│   ├── components/\n│   │   ├── CascadingSelect.jsx\n│   │   └── CountryInfoCard.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Fetch country dataset inside useEffect on component mount.",
      "Step 2: Maintain selected country in state; trigger secondary state lookup upon selection.",
      "Step 3: Reset secondary dropdown state when parent selection changes to prevent invalid state.",
      "Step 4: Render national flag SVG and country details card."
    ],
    "explanation": "Teaches dependent effect triggers useEffect(..., [selectedCountry]), data mapping, cascading reset patterns, and handling asynchronous loading states.",
    "expectedResult": "An interactive selector where choosing India shows Indian states and INR currency, while choosing USA immediately switches to US states and USD currency.",
    "checklist": [
      "Does changing the country reset the previously selected state?",
      "Are flag and currency details updated instantly?",
      "Is the state dropdown disabled while loading?"
    ],
    "runnableCode": "function ProjectCountryDropdownApp() {\n  const countryDatabase = {\n    IN: {\n      name: 'India', flag: '🇮🇳', currency: 'INR (₹)', capital: 'New Delhi',\n      states: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Gujarat']\n    },\n    US: {\n      name: 'United States', flag: '🇺🇸', currency: 'USD ($)', capital: 'Washington, D.C.',\n      states: ['California', 'New York', 'Texas', 'Washington', 'Florida']\n    },\n    DE: {\n      name: 'Germany', flag: '🇩🇪', currency: 'EUR (€)', capital: 'Berlin',\n      states: ['Bavaria', 'Berlin', 'Hesse', 'Saxony', 'North Rhine-Westphalia']\n    }\n  };\n\n  const [selectedCountry, setSelectedCountry] = React.useState('IN');\n  const [selectedState, setSelectedState] = React.useState(countryDatabase.IN.states[0]);\n\n  const handleCountryChange = (e) => {\n    const newCode = e.target.value;\n    setSelectedCountry(newCode);\n    setSelectedState(countryDatabase[newCode].states[0]);\n  };\n\n  const info = countryDatabase[selectedCountry];\n\n  return (\n    <div style={{ padding: '24px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '16px', maxWidth: '440px', margin: '0 auto', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>\n      <h3 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>🌍 Cascading Country & State Selector</h3>\n      <div style={{ marginBottom: '14px' }}>\n        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Select Country:</label>\n        <select value={selectedCountry} onChange={handleCountryChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' }}>\n          {Object.keys(countryDatabase).map(code => (\n            <option key={code} value={code}>\n              {countryDatabase[code].flag} {countryDatabase[code].name}\n            </option>\n          ))}\n        </select>\n      </div>\n      <div style={{ marginBottom: '18px' }}>\n        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Select State / Province:</label>\n        <select value={selectedState} onChange={e => setSelectedState(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' }}>\n          {info.states.map(st => (\n            <option key={st} value={st}>{st}</option>\n          ))}\n        </select>\n      </div>\n      <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>\n        <div style={{ fontSize: '32px', marginBottom: '6px' }}>{info.flag}</div>\n        <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>{info.name} - {selectedState}</h4>\n        <div style={{ fontSize: '13px', color: '#475569' }}>\n          Capital: <strong>{info.capital}</strong><br />\n          Official Currency: <strong style={{ color: '#16a34a' }}>{info.currency}</strong>\n        </div>\n      </div>\n    </div>\n  );\n}\nrender(<ProjectCountryDropdownApp />);",
    "conceptsRequired": [
      "useEffect Dependency Arrays",
      "Dependent Cascading State Resets",
      "Asynchronous Mock / REST APIs",
      "Object Key Iteration",
      "Fallback Loading Skeletons"
    ],
    "commonErrors": "1. Forgetting to reset secondary dropdown state when parent country changes, leaving an orphaned state selected. 2. Running infinite loops by setting state inside useEffect without a dependency array.",
    "finalAssessment": "Mini Challenge: Add a third cascading dropdown for Cities under the selected State, with instant temperature / weather display!"
  },
  {
    "id": "proj-5",
    "number": 5,
    "title": "5. Task Management Application (TaskBoard Pro)",
    "difficulty": "Intermediate",
    "badge": "useReducer & Custom Hooks",
    "summary": "Build a multi-column Kanban task manager with task filtering, status columns (Todo, In-Progress, Done), and local storage persistence.",
    "requirements": [
      "useReducer architecture managing task board state",
      "Columns for 'To Do', 'In Progress', and 'Completed'",
      "Modal to add tasks with priority tags (Low, Medium, High)",
      "Move tasks across status columns seamlessly",
      "Filter tasks by search term and priority badge",
      "Persist board to localStorage using a custom hook"
    ],
    "folderStructure": "task-management-app/\n├── src/\n│   ├── hooks/\n│   │   └── useLocalStorage.js\n│   ├── reducer/\n│   │   └── taskReducer.js\n│   ├── components/\n│   │   ├── TaskColumn.jsx\n│   │   ├── TaskCard.jsx\n│   │   └── AddTaskModal.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Set up a taskReducer handling actions: ADD_TASK, MOVE_TASK, DELETE_TASK.",
      "Step 2: Partition task array into status buckets ('todo', 'in-progress', 'done').",
      "Step 3: Add priority tag badges with distinct color indicators.",
      "Step 4: Save state modifications into localStorage automatically."
    ],
    "explanation": "Teaches useReducer for complex relational state transitions, status pipeline transformations, filter chaining, and custom hook encapsulation.",
    "expectedResult": "A full Kanban board allowing tasks to be prioritized, moved between progression stages, and stored indefinitely.",
    "checklist": [
      "Can a task move from Todo to In-Progress to Done?",
      "Are priority colors rendered appropriately?",
      "Does page reload preserve board state?"
    ],
    "runnableCode": "function ProjectTaskManagerApp() {\n  const [tasks, setTasks] = React.useState([\n    { id: 1, title: 'Configure Redux Store', status: 'done', priority: 'High' },\n    { id: 2, title: 'Implement Auth Guards', status: 'in-progress', priority: 'High' },\n    { id: 3, title: 'Write RTL Unit Tests', status: 'todo', priority: 'Medium' }\n  ]);\n  const [newTitle, setNewTitle] = React.useState('');\n  const [priority, setPriority] = React.useState('Medium');\n\n  const addTask = (e) => {\n    e.preventDefault();\n    if (!newTitle) return;\n    setTasks([...tasks, { id: Date.now(), title: newTitle, status: 'todo', priority }]);\n    setNewTitle('');\n  };\n\n  const moveTask = (id, nextStatus) => {\n    setTasks(tasks.map(t => t.id === id ? { ...t, status: nextStatus } : t));\n  };\n\n  const deleteTask = (id) => {\n    setTasks(tasks.filter(t => t.id !== id));\n  };\n\n  return (\n    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px' }}>\n      <h3 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>📋 TaskBoard Pro (Kanban)</h3>\n      <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>\n        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder=\"New task description...\" style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />\n        <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '8px', borderRadius: '6px' }}>\n          <option>Low</option><option>Medium</option><option>High</option>\n        </select>\n        <button type=\"submit\" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Add Task</button>\n      </form>\n      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>\n        {['todo', 'in-progress', 'done'].map(col => (\n          <div key={col} style={{ background: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '220px' }}>\n            <h4 style={{ margin: '0 0 10px 0', textTransform: 'capitalize', color: col === 'done' ? '#16a34a' : col === 'in-progress' ? '#0284c7' : '#475569' }}>\n              {col.replace('-', ' ')} ({tasks.filter(t => t.status === col).length})\n            </h4>\n            <div style={{ display: 'grid', gap: '8px' }}>\n              {tasks.filter(t => t.status === col).map(t => (\n                <div key={t.id} style={{ padding: '10px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' }}>\n                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>\n                    <strong>{t.title}</strong>\n                    <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: t.priority === 'High' ? '#fee2e2' : '#fef3c7', color: t.priority === 'High' ? '#b91c1c' : '#92400e' }}>\n                      {t.priority}\n                    </span>\n                  </div>\n                  <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>\n                    {col !== 'todo' && <button onClick={() => moveTask(t.id, col === 'done' ? 'in-progress' : 'todo')} style={{ fontSize: '11px', padding: '2px 6px' }}>◀</button>}\n                    {col !== 'done' && <button onClick={() => moveTask(t.id, col === 'todo' ? 'in-progress' : 'done')} style={{ fontSize: '11px', padding: '2px 6px' }}>▶</button>}\n                    <button onClick={() => deleteTask(t.id)} style={{ fontSize: '11px', padding: '2px 6px', color: '#dc2626', marginLeft: 'auto' }}>✕</button>\n                  </div>\n                </div>\n              ))}\n            </div>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}\nrender(<ProjectTaskManagerApp />);",
    "conceptsRequired": [
      "useReducer Architecture",
      "Action Types & Payloads",
      "Kanban Column Pipelines",
      "Status Transition Reducers",
      "localStorage Sync Hook"
    ],
    "commonErrors": "1. Mutating state inside reducer function instead of returning new state copies. 2. Not defining a default case in reducer causing state to turn undefined on unknown actions.",
    "finalAssessment": "Mini Challenge: Implement task search filtering and a \"Clear Completed Tasks\" button that archives done tasks!"
  },
  {
    "id": "proj-6",
    "number": 6,
    "title": "6. Reusable Component Design System Library",
    "difficulty": "Intermediate",
    "badge": "Design System & Generics",
    "summary": "Build a production-grade UI design system featuring Button, Badge, Modal, Card, and Input components with variants and compound patterns.",
    "requirements": [
      "Button component supporting variants (primary, secondary, danger, ghost) and sizes (sm, md, lg)",
      "Modal component with compound pattern (Modal.Header, Modal.Body, Modal.Footer)",
      "Badge component with polymorphic colors",
      "Card container component with hover lift effect",
      "Interactive design system preview playground allowing variant inspection"
    ],
    "folderStructure": "component-library/\n├── src/\n│   ├── components/\n│   │   ├── Button/\n│   │   │   ├── Button.jsx\n│   │   │   └── Button.module.css\n│   │   ├── Modal/\n│   │   │   └── Modal.jsx\n│   │   ├── Badge/\n│   │   │   └── Badge.jsx\n│   │   └── Card/\n│   │       └── Card.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Build atomic Button with variant prop mapping and disabled state handling.",
      "Step 2: Construct Compound Modal pattern using React.Children or sub-component exports.",
      "Step 3: Create Badge and Card components with flexible style props.",
      "Step 4: Build a live interactive documentation playground displaying all components in action."
    ],
    "explanation": "Teaches clean component API design, compound component patterns, prop polymorphism, CSS variant structuring, and atomic design system methodology.",
    "expectedResult": "A reusable design system kit that can be imported into any enterprise React application.",
    "checklist": [
      "Do buttons reflect their primary, danger, and secondary variant styling?",
      "Does the compound modal render its header, body, and footer properly?",
      "Are components accessible via keyboard?"
    ],
    "runnableCode": "function DesignSystemShowcase() {\n  const [modalOpen, setModalOpen] = React.useState(false);\n  const [selectedVariant, setSelectedVariant] = React.useState('primary');\n\n  const buttonStyles = {\n    primary: { background: '#2563eb', color: '#fff' },\n    secondary: { background: '#64748b', color: '#fff' },\n    danger: { background: '#ef4444', color: '#fff' },\n    success: { background: '#16a34a', color: '#fff' }\n  };\n\n  return (\n    <div style={{ padding: '24px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>\n      <h3 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>🎨 Reusable UI Design System</h3>\n      <div style={{ marginBottom: '20px' }}>\n        <h4>Buttons & Variants:</h4>\n        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>\n          {Object.keys(buttonStyles).map(variant => (\n            <button\n              key={variant}\n              onClick={() => setSelectedVariant(variant)}\n              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', ...buttonStyles[variant] }}\n            >\n              {variant.toUpperCase()} Button\n            </button>\n          ))}\n        </div>\n      </div>\n      <div style={{ marginBottom: '20px' }}>\n        <h4>Badges & Pills:</h4>\n        <span style={{ padding: '4px 10px', borderRadius: '999px', background: '#dbeafe', color: '#1e40af', fontSize: '12px', marginRight: '6px' }}>Info Badge</span>\n        <span style={{ padding: '4px 10px', borderRadius: '999px', background: '#dcfce7', color: '#166534', fontSize: '12px', marginRight: '6px' }}>Success Badge</span>\n        <span style={{ padding: '4px 10px', borderRadius: '999px', background: '#fee2e2', color: '#991b1b', fontSize: '12px' }}>Critical Alert</span>\n      </div>\n      <div>\n        <h4>Compound Modal Dialog:</h4>\n        <button onClick={() => setModalOpen(true)} style={{ padding: '8px 16px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>\n          Launch Design System Modal\n        </button>\n      </div>\n      {modalOpen && (\n        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setModalOpen(false)}>\n          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', maxWidth: '380px' }} onClick={e => e.stopPropagation()}>\n            <h3>Design System Modal Header</h3>\n            <p style={{ color: '#64748b', fontSize: '14px' }}>This component is constructed using reusable compound patterns.</p>\n            <button onClick={() => setModalOpen(false)} style={{ padding: '6px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px' }}>Close</button>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n}\nrender(<DesignSystemShowcase />);",
    "conceptsRequired": [
      "Component Composition",
      "Compound Component Pattern",
      "Polymorphic Props (variants & sizes)",
      "Accessibility (ARIA)",
      "CSS Design System Architecture"
    ],
    "commonErrors": "1. Creating rigid monolithic components that cannot accept custom children or className overrides. 2. Forgetting to pass ref or rest props down to native button/input elements.",
    "finalAssessment": "Mini Challenge: Build an Avatar and Tooltip component matching the design system colors and export them together!"
  },
  {
    "id": "proj-7",
    "number": 7,
    "title": "7. Employee Admin Panel with Data Table",
    "difficulty": "Advanced",
    "badge": "Data Tables & Pagination",
    "summary": "Build an administrative HR portal with pagination, sorting by column, role-based filtering, CSV data export, and employee onboarding modal.",
    "requirements": [
      "Data table supporting 20+ records with client-side pagination (5 items per page)",
      "Sorting by Name, Department, and Salary ascending/descending",
      "Multi-select role filter (Engineering, Design, Marketing, Sales)",
      "Add employee modal with form validation",
      "CSV Export functionality generating downloadable spreadsheet data"
    ],
    "folderStructure": "employee-admin/\n├── src/\n│   ├── components/\n│   │   ├── EmployeeTable.jsx\n│   │   ├── PaginationControls.jsx\n│   │   ├── RoleFilter.jsx\n│   │   └── ExportButton.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Set up employee dataset with id, name, department, salary, and status.",
      "Step 2: Implement slice math for pagination (page - 1) * perPage to page * perPage.",
      "Step 3: Build dynamic sort function handling string and numeric columns.",
      "Step 4: Create CSV string generator and trigger dynamic client download."
    ],
    "explanation": "Teaches pagination math, complex multi-predicate filter arrays, column sorting comparators, modal forms, and browser blob CSV downloads.",
    "expectedResult": "A full HR admin tool with smooth page navigation, quick column sorting, and instant CSV export.",
    "checklist": [
      "Does pagination navigate through all records accurately?",
      "Does sorting reorder the displayed rows correctly?",
      "Does adding a new employee update total page count?"
    ],
    "runnableCode": "function ProjectEmployeeAdminApp() {\n  const [employees, setEmployees] = React.useState([\n    { id: 1, name: 'Siddharth Roy', dept: 'Engineering', salary: 110000, status: 'Active' },\n    { id: 2, name: 'Ananya Roy', dept: 'Design', salary: 95000, status: 'Active' },\n    { id: 3, name: 'Varun Dhawan', dept: 'Marketing', salary: 85000, status: 'On Leave' },\n    { id: 4, name: 'Karan Johar', dept: 'Executive', salary: 250000, status: 'Active' },\n    { id: 5, name: 'Deepika Padukone', dept: 'Media', salary: 180000, status: 'Active' },\n    { id: 6, name: 'Ranveer Singh', dept: 'Marketing', salary: 120000, status: 'Active' }\n  ]);\n  const [page, setPage] = React.useState(1);\n  const perPage = 3;\n  const [sortAsc, setSortAsc] = React.useState(true);\n\n  const totalPages = Math.ceil(employees.length / perPage);\n  const sorted = [...employees].sort((a, b) => sortAsc ? a.salary - b.salary : b.salary - a.salary);\n  const currentRows = sorted.slice((page - 1) * perPage, page * perPage);\n\n  const exportCsv = () => {\n    const headers = 'ID,Name,Department,Salary,Status\\n';\n    const rows = employees.map(e => `${e.id},${e.name},${e.dept},${e.salary},${e.status}`).join('\\n');\n    const blob = new Blob([headers + rows], { type: 'text/csv' });\n    const url = URL.createObjectURL(blob);\n    const a = document.createElement('a');\n    a.href = url;\n    a.download = 'employees.csv';\n    a.click();\n  };\n\n  return (\n    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>\n      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>\n        <h3 style={{ margin: 0 }}>👥 Employee Admin Portal</h3>\n        <button onClick={exportCsv} style={{ padding: '6px 12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>\n          📥 Export CSV\n        </button>\n      </div>\n      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '14px' }}>\n        <thead>\n          <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>\n            <th style={{ padding: '10px' }}>Name</th>\n            <th style={{ padding: '10px' }}>Department</th>\n            <th onClick={() => setSortAsc(!sortAsc)} style={{ padding: '10px', cursor: 'pointer' }}>Salary {sortAsc ? '▲' : '▼'}</th>\n            <th style={{ padding: '10px' }}>Status</th>\n          </tr>\n        </thead>\n        <tbody>\n          {currentRows.map(emp => (\n            <tr key={emp.id} style={{ borderBottom: '1px solid #e2e8f0' }}>\n              <td style={{ padding: '10px', fontWeight: 'bold' }}>{emp.name}</td>\n              <td style={{ padding: '10px' }}>{emp.dept}</td>\n              <td style={{ padding: '10px', color: '#0284c7' }}>${emp.salary.toLocaleString()}</td>\n              <td style={{ padding: '10px' }}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: emp.status === 'Active' ? '#dcfce7' : '#fee2e2', color: emp.status === 'Active' ? '#166534' : '#991b1b' }}>{emp.status}</span></td>\n            </tr>\n          ))}\n        </tbody>\n      </table>\n      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>\n        <span style={{ fontSize: '13px', color: '#64748b' }}>Page {page} of {totalPages} (Total: {employees.length} records)</span>\n        <div style={{ display: 'flex', gap: '6px' }}>\n          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>‹ Prev</button>\n          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>Next ›</button>\n        </div>\n      </div>\n    </div>\n  );\n}\nrender(<ProjectEmployeeAdminApp />);",
    "conceptsRequired": [
      "Client-Side Pagination Math",
      "Multi-Column Sort Comparators",
      "Multi-Predicate Array Filtering",
      "Blob & URL.createObjectURL for CSV Export",
      "Interactive Modals"
    ],
    "commonErrors": "1. Off-by-one errors in slice pagination math ((page - 1) * perPage). 2. Case-sensitive sorting bugs (string \"Z\" sorting before \"a\"). 3. Not revoking object URLs after CSV download.",
    "finalAssessment": "Mini Challenge: Add a column visibility dropdown allowing users to show or hide specific columns dynamically!"
  },
  {
    "id": "proj-8",
    "number": 8,
    "title": "8. Multi-Page Enterprise Admin Dashboard",
    "difficulty": "Advanced",
    "badge": "Routing & Layouts",
    "summary": "Build a multi-page administrative dashboard featuring nested routing, persistent layout with header & sidebar, authentication protection, and simulated subpages.",
    "requirements": [
      "Client-side routing layout with persistent sidebar and header",
      "Pages for /dashboard (KPI cards), /users (user table), /analytics (charts), and /settings",
      "Protected Route guard checking JWT auth state",
      "Breadcrumb navigation reflecting active route hierarchy",
      "Dynamic route parameter view (/users/:userId)"
    ],
    "folderStructure": "admin-dashboard/\n├── src/\n│   ├── layouts/\n│   │   └── RootLayout.jsx\n│   ├── pages/\n│   │   ├── DashboardHome.jsx\n│   │   ├── UsersPage.jsx\n│   │   ├── UserDetail.jsx\n│   │   └── SettingsPage.jsx\n│   ├── routes/\n│   │   └── ProtectedRoute.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Set up client-side page state simulating React Router v6 navigation.",
      "Step 2: Build KPI metric cards with icons for revenue, users, and conversion rate.",
      "Step 3: Implement Protected Route authentication toggle barrier.",
      "Step 4: Support dynamic URL parameter drill-down for detailed view."
    ],
    "explanation": "Teaches real-world Single Page Application layout nesting, route parameters, authenticated subtrees, and responsive SaaS dashboard user experience.",
    "expectedResult": "A full enterprise SaaS dashboard with sidebar navigation, metric widgets, and guarded screens.",
    "checklist": [
      "Can you switch between Dashboard, Users, and Settings views?",
      "Does logging out block access to protected tabs?",
      "Are KPI metric values displayed clearly?"
    ],
    "runnableCode": "function ProjectAdminDashboardApp() {\n  const [currentTab, setCurrentTab] = React.useState('overview');\n  const [isAuth, setIsAuth] = React.useState(true);\n\n  return (\n    <div style={{ border: '1px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', minHeight: '340px', background: '#f8fafc' }}>\n      <header style={{ padding: '14px 20px', background: '#0f172a', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>\n        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>\n          <span style={{ fontSize: '20px' }}>🏢</span>\n          <strong>Enterprise Cloud Console</strong>\n        </div>\n        <button onClick={() => setIsAuth(!isAuth)} style={{ padding: '4px 10px', background: isAuth ? '#ef4444' : '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>\n          {isAuth ? 'Logout' : 'Login'}\n        </button>\n      </header>\n      <div style={{ display: 'flex' }}>\n        <aside style={{ width: '180px', background: '#1e293b', color: '#94a3b8', padding: '16px 10px', minHeight: '280px' }}>\n          {['overview', 'users', 'billing', 'settings'].map(tab => (\n            <div\n              key={tab}\n              onClick={() => setCurrentTab(tab)}\n              style={{\n                padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', marginBottom: '4px',\n                background: currentTab === tab ? '#2563eb' : 'transparent',\n                color: currentTab === tab ? '#fff' : '#94a3b8', textTransform: 'capitalize', fontSize: '13px'\n              }}\n            >\n              {tab}\n            </div>\n          ))}\n        </aside>\n        <main style={{ flex: 1, padding: '24px', background: '#fff' }}>\n          {!isAuth ? (\n            <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px' }}>\n              🔒 Protected Route Guard: Please log in to view enterprise data.\n            </div>\n          ) : (\n            <>\n              {currentTab === 'overview' && (\n                <div>\n                  <h4 style={{ margin: '0 0 14px 0' }}>Executive Overview</h4>\n                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>\n                    <div style={{ padding: '14px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>\n                      <div style={{ fontSize: '12px', color: '#1e40af' }}>Monthly Revenue</div>\n                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1d4ed8' }}>$142,500</div>\n                    </div>\n                    <div style={{ padding: '14px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>\n                      <div style={{ fontSize: '12px', color: '#166534' }}>Active Users</div>\n                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#15803d' }}>8,420</div>\n                    </div>\n                    <div style={{ padding: '14px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>\n                      <div style={{ fontSize: '12px', color: '#92400e' }}>Conversion Rate</div>\n                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#b45309' }}>3.84%</div>\n                    </div>\n                  </div>\n                </div>\n              )}\n              {currentTab === 'users' && <div><h4>User Management</h4><p>Managing 8,420 provisioned enterprise accounts.</p></div>}\n              {currentTab === 'billing' && <div><h4>Subscription & Invoices</h4><p>Enterprise Plan active (Auto-renews Dec 2026).</p></div>}\n              {currentTab === 'settings' && <div><h4>System Settings</h4><p>API Keys, Webhooks, and SSO identity providers.</p></div>}\n            </>\n          )}\n        </main>\n      </div>\n    </div>\n  );\n}\nrender(<ProjectAdminDashboardApp />);",
    "conceptsRequired": [
      "Client-Side SPA Routing",
      "Layout Nesting & Outlet",
      "Protected Route Guards",
      "Role-Based Access Control",
      "Metric KPI Calculations"
    ],
    "commonErrors": "1. Rendering sensitive components before checking authentication status. 2. Hardcoding relative paths causing route breakage in nested sub-routes.",
    "finalAssessment": "Mini Challenge: Add an activity audit log tab showing which admin user performed which system action with timestamps!"
  },
  {
    "id": "proj-9",
    "number": 9,
    "title": "9. API Product Management System with SWR / Caching",
    "difficulty": "Advanced",
    "badge": "Async & Query Cache",
    "summary": "Build an e-commerce inventory product manager with live remote API integration, debounced search, category filters, and optimistic cache mutations.",
    "requirements": [
      "Fetch products from remote REST API with loading skeletons",
      "Debounced search bar reducing network request rate",
      "Category filter tabs (Electronics, Jewelry, Clothing)",
      "Optimistic UI update when adding or modifying product prices",
      "Stale-while-revalidate background refresh simulation"
    ],
    "folderStructure": "api-product-system/\n├── src/\n│   ├── api/\n│   │   └── productClient.js\n│   ├── hooks/\n│   │   └── useDebounce.js\n│   ├── components/\n│   │   ├── ProductGrid.jsx\n│   │   ├── SearchInput.jsx\n│   │   └── SWRStatusBadge.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Set up asynchronous data fetching simulating SWR / React Query cache.",
      "Step 2: Add custom debounced input hook for instant search typing.",
      "Step 3: Implement category filter buttons and price range slider.",
      "Step 4: Provide instant optimistic update feedback when user edits a record."
    ],
    "explanation": "Teaches modern server-state handling, debouncing high-frequency queries, optimistic updates before network confirmation, and background revalidation.",
    "expectedResult": "A fast, responsive product directory with real-time filtering, debounced input, and optimistic state updating.",
    "checklist": [
      "Does search wait for typing pause before filtering?",
      "Are categories filtered properly?",
      "Does optimistic price update reflect immediately on screen?"
    ],
    "runnableCode": "function ProjectApiProductApp() {\n  const [products, setProducts] = React.useState([\n    { id: 1, title: 'Sony WH-1000XM5 Noise Cancelling', cat: 'Electronics', price: 349, rating: 4.8 },\n    { id: 2, title: 'Apple Watch Ultra 2 Titanium', cat: 'Electronics', price: 799, rating: 4.9 },\n    { id: 3, title: 'Patagonia Down Sweater Jacket', cat: 'Apparel', price: 279, rating: 4.6 },\n    { id: 4, title: 'Bellroy Leather Slim Sleeve Wallet', cat: 'Accessories', price: 79, rating: 4.7 }\n  ]);\n  const [query, setQuery] = React.useState('');\n  const [cat, setCat] = React.useState('All');\n\n  const filtered = products.filter(p => {\n    const matchQuery = p.title.toLowerCase().includes(query.toLowerCase());\n    const matchCat = cat === 'All' || p.cat === cat;\n    return matchQuery && matchCat;\n  });\n\n  const updatePriceOptimistic = (id) => {\n    const newPrice = prompt('Enter new price ($):');\n    if (newPrice && !isNaN(newPrice)) {\n      setProducts(products.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p));\n    }\n  };\n\n  return (\n    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>\n      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>\n        <h3 style={{ margin: 0 }}>🛍️ API Product Inventory System</h3>\n        <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '999px' }}>● SWR Cache Fresh</span>\n      </div>\n      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>\n        <input\n          value={query}\n          onChange={e => setQuery(e.target.value)}\n          placeholder=\"Search products...\"\n          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}\n        />\n        {['All', 'Electronics', 'Apparel', 'Accessories'].map(c => (\n          <button key={c} onClick={() => setCat(c)} style={{\n            padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',\n            background: cat === c ? '#2563eb' : '#f1f5f9',\n            color: cat === c ? '#fff' : '#475569'\n          }}>{c}</button>\n        ))}\n      </div>\n      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>\n        {filtered.map(p => (\n          <div key={p.id} style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>\n            <div>\n              <div style={{ fontSize: '11px', color: '#64748b' }}>{p.cat} • {p.rating} ★</div>\n              <strong style={{ fontSize: '14px', color: '#0f172a' }}>{p.title}</strong>\n            </div>\n            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>\n              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#0284c7' }}>${p.price}</span>\n              <button onClick={() => updatePriceOptimistic(p.id)} style={{ padding: '4px 8px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>\n                Quick Edit Price\n              </button>\n            </div>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}\nrender(<ProjectApiProductApp />);",
    "conceptsRequired": [
      "Asynchronous Cache Invalidation",
      "Debounced Search Querying",
      "Optimistic UI Updates",
      "HTTP Error Boundaries",
      "Stale-While-Revalidate Lifecycle"
    ],
    "commonErrors": "1. Spimming API endpoints on every keystroke without a debounce delay. 2. Not rolling back optimistic updates if the background server request fails.",
    "finalAssessment": "Mini Challenge: Implement automatic retry with exponential backoff if the simulated API request encounters a network failure!"
  },
  {
    "id": "proj-10",
    "number": 10,
    "title": "10. Complete Redux Toolkit E-commerce Shopping Application",
    "difficulty": "Master",
    "badge": "Full Redux Store",
    "summary": "Build a flagship enterprise E-commerce application featuring product catalog, Redux Toolkit cart slice, item quantity controls, discount coupons, and checkout modal.",
    "requirements": [
      "Redux Toolkit configureStore with cartSlice and productSlice",
      "Add to Cart, Remove from Cart, Increment / Decrement quantity",
      "Order summary calculating subtotal, tax (8%), shipping, and total",
      "Promo coupon code verification system ('REACT20' for 20% discount)",
      "Sliding drawer / modal for shopping cart inspection",
      "Simulated checkout with success confirmation screen and order ID"
    ],
    "folderStructure": "redux-ecommerce/\n├── src/\n│   ├── app/\n│   │   ├── store.js\n│   │   └── hooks.js\n│   ├── features/\n│   │   ├── cart/\n│   │   │   ├── cartSlice.js\n│   │   │   └── CartDrawer.jsx\n│   │   └── products/\n│   │       ├── productSlice.js\n│   │       └── ProductCard.jsx\n│   ├── App.jsx\n│   └── main.jsx",
    "steps": [
      "Step 1: Create cartSlice with reducers: addItem, removeItem, changeQuantity, applyCoupon.",
      "Step 2: Render interactive product grid with 'Add to Cart' dispatch buttons.",
      "Step 3: Implement floating cart badge showing dynamic total count via useSelector.",
      "Step 4: Build slide-out Cart Drawer with subtotal, tax calculation, and checkout trigger."
    ],
    "explanation": "This master project synthesizes everything: Redux Toolkit createSlice, selector subscriptions with useSelector, action dispatching with useDispatch, immutable array updates with Immer, coupon math logic, and full e-commerce checkout flow.",
    "expectedResult": "A full-fledged commercial e-commerce storefront with live shopping cart calculations and checkout confirmation.",
    "checklist": [
      "Does adding an item increase cart quantity without duplicates?",
      "Does 'REACT20' coupon deduct 20% from subtotal accurately?",
      "Does checking out clear the cart and display order receipt?"
    ],
    "runnableCode": "function ProjectReduxEcommerceApp() {\n  const catalog = [\n    { id: 1, title: 'Keychron K2 Mechanical Keyboard', price: 89, image: '⌨️' },\n    { id: 2, title: 'Logitech MX Master 3S Mouse', price: 99, image: '🖱️' },\n    { id: 3, title: 'Dell UltraSharp 27\" 4K Monitor', price: 420, image: '🖥️' },\n    { id: 4, title: 'Bose QuietComfort 45 Headphones', price: 279, image: '🎧' }\n  ];\n\n  const [cart, setCart] = React.useState([\n    { id: 1, title: 'Keychron K2 Mechanical Keyboard', price: 89, qty: 1 }\n  ]);\n  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);\n  const [coupon, setCoupon] = React.useState('');\n  const [discountPercent, setDiscountPercent] = React.useState(0);\n  const [orderComplete, setOrderComplete] = React.useState(false);\n\n  const addToCart = (product) => {\n    const existing = cart.find(i => i.id === product.id);\n    if (existing) {\n      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));\n    } else {\n      setCart([...cart, { ...product, qty: 1 }]);\n    }\n    setIsDrawerOpen(true);\n  };\n\n  const updateQty = (id, delta) => {\n    setCart(cart.map(i => {\n      if (i.id === id) {\n        const next = i.qty + delta;\n        return next > 0 ? { ...i, qty: next } : null;\n      }\n      return i;\n    }).filter(Boolean));\n  };\n\n  const applyCoupon = () => {\n    if (coupon.toUpperCase() === 'REACT20') {\n      setDiscountPercent(20);\n      alert('Coupon Applied: 20% OFF!');\n    } else {\n      alert('Invalid coupon code. Try REACT20');\n    }\n  };\n\n  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);\n  const discountAmount = (subtotal * discountPercent) / 100;\n  const tax = (subtotal - discountAmount) * 0.08;\n  const grandTotal = subtotal - discountAmount + tax;\n\n  if (orderComplete) {\n    return (\n      <div style={{ maxWidth: '440px', margin: '0 auto', padding: '32px', background: '#fff', borderRadius: '16px', textAlign: 'center', border: '1px solid #cbd5e1' }}>\n        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎉</div>\n        <h2 style={{ color: '#16a34a', margin: 0 }}>Order Confirmed!</h2>\n        <p style={{ color: '#475569' }}>Thank you for your purchase. Order #{Math.floor(Math.random()*900000 + 100000)} has been placed.</p>\n        <button onClick={() => { setCart([]); setOrderComplete(false); }} style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>\n          Continue Shopping\n        </button>\n      </div>\n    );\n  }\n\n  return (\n    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', maxWidth: '640px', margin: '0 auto' }}>\n      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>\n        <h3 style={{ margin: 0, color: '#0f172a' }}>⚡ Redux Storefront (RTK Master)</h3>\n        <button onClick={() => setIsDrawerOpen(true)} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>\n          🛒 Cart ({cart.reduce((s, i) => s + i.qty, 0)})\n        </button>\n      </header>\n      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>\n        {catalog.map(prod => (\n          <div key={prod.id} style={{ padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>\n            <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '8px' }}>{prod.image}</div>\n            <strong style={{ fontSize: '13px', color: '#0f172a' }}>{prod.title}</strong>\n            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>\n              <span style={{ fontWeight: 'bold', color: '#0284c7' }}>${prod.price}</span>\n              <button onClick={() => addToCart(prod)} style={{ padding: '6px 12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>\n                + Add to Cart\n              </button>\n            </div>\n          </div>\n        ))}\n      </div>\n      {isDrawerOpen && (\n        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'flex-end', zIndex: 9999 }} onClick={() => setIsDrawerOpen(false)}>\n          <div style={{ width: '380px', height: '100%', background: '#fff', padding: '24px', boxSizing: 'border-box', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>\n            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>\n              <h3 style={{ margin: 0 }}>Shopping Cart</h3>\n              <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>\n            </div>\n            {cart.length === 0 ? <p>Your cart is empty.</p> : (\n              <>\n                <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>\n                  {cart.map(item => (\n                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', background: '#f8fafc', borderRadius: '6px' }}>\n                      <div>\n                        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.title}</div>\n                        <div style={{ fontSize: '12px', color: '#64748b' }}>${item.price} ea</div>\n                      </div>\n                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>\n                        <button onClick={() => updateQty(item.id, -1)} style={{ padding: '2px 8px' }}>-</button>\n                        <span>{item.qty}</span>\n                        <button onClick={() => updateQty(item.id, 1)} style={{ padding: '2px 8px' }}>+</button>\n                      </div>\n                    </div>\n                  ))}\n                </div>\n                <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>\n                  <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder=\"Promo code (REACT20)\" style={{ flex: 1, padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />\n                  <button onClick={applyCoupon} style={{ padding: '6px 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>Apply</button>\n                </div>\n                <div style={{ fontSize: '13px', lineHeight: '1.8', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>\n                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>\n                  {discountAmount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}><span>Discount ({discountPercent}%):</span><span>-${discountAmount.toFixed(2)}</span></div>}\n                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Estimated Tax (8%):</span><span>${tax.toFixed(2)}</span></div>\n                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', marginTop: '6px' }}><span>Grand Total:</span><span>${grandTotal.toFixed(2)}</span></div>\n                </div>\n                <button onClick={() => setOrderComplete(true)} style={{ width: '100%', marginTop: '16px', padding: '12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>\n                  Place Order Now →\n                </button>\n              </>\n            )}\n          </div>\n        </div>\n      )}\n    </div>\n  );\n}\nrender(<ProjectReduxEcommerceApp />);",
    "conceptsRequired": [
      "Redux Toolkit configureStore",
      "createSlice with Immer Mutative Syntax",
      "useSelector Selector Optimization",
      "useDispatch Action Dispatching",
      "Coupon & Tax Math Logic"
    ],
    "commonErrors": "1. Calling dispatch inside render phase causing infinite re-render loops. 2. Adding duplicate items to cart array instead of incrementing item quantity.",
    "finalAssessment": "Mini Challenge: Add persistent cart state to localStorage so the shopping cart survives browser refreshes and tab closures!"
  }
];
