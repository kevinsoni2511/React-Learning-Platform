"""
Interview Preparation Database for ReactMastery
Categorized into:
- Beginner
- Intermediate
- Advanced
- Scenario-Based
- Practical Coding Challenges
Covering React Fundamentals, TypeScript, Hooks, Routing, Redux, Performance, and Security.
"""

INTERVIEW_PREP_DATA = [
    {
        "category": "Beginner",
        "tag": "React Basics",
        "question": "What is the Virtual DOM and how does React's Reconciliation process work?",
        "answer": "The Virtual DOM (VDOM) is a lightweight in-memory JavaScript object representation of the real browser DOM. When component state or props change, React creates a new VDOM tree and executes its Reconciliation algorithm (a heuristic O(n) diffing algorithm). It compares the new tree with the previous snapshot, identifies the minimal set of changes (diffs), and applies those updates in a single batched repaint to the Real DOM. This avoids costly full-page DOM reflows and repaints.",
        "proTip": "Highlight that React 16+ replaced the old stack reconciler with the Fiber reconciler, which allows pausing, prioritizing, and aborting rendering work."
    },
    {
        "category": "Beginner",
        "tag": "React Fundamentals",
        "question": "Why can't you mutate state directly in React (e.g. state.count = 5)?",
        "answer": "Directly mutating state (`this.state.count = 5` or modifying state variables in place) does NOT trigger a component re-render because React checks for changes by comparing object references (`prevState !== nextState`). If you mutate the object in place, the reference remains identical, so React's diffing bail-out optimization skips rendering. Furthermore, it breaks time-travel debugging and concurrent rendering features.",
        "proTip": "Always mention that calling `setState` or `setCount` queues a state update and produces a new object reference in memory."
    },
    {
        "category": "Beginner",
        "tag": "JSX & Props",
        "question": "What is the difference between Props and State?",
        "answer": "Props are external inputs passed down from a parent component to a child component (unidirectional data flow). They are read-only and immutable from the child's perspective. State is internal, private data owned and managed by the component itself, which can change over time in response to user actions or network events, triggering automatic UI re-renders.",
        "proTip": "Use the analogy: Props are like function parameters, whereas State is like local variables declared inside the function body."
    },
    {
        "category": "Intermediate",
        "tag": "Hooks & Closures",
        "question": "Explain the concept of 'Stale Closure' in React Hooks and how to fix it.",
        "answer": "A Stale Closure occurs when a hook callback (such as inside `useEffect`, `useCallback`, or a `setTimeout` handler) captures a state or prop variable from a past render. Because JavaScript closures lock in variable values at creation time, if that variable changes on subsequent renders but the effect does not re-run (e.g. missing dependency in the dependency array), the callback will continue referencing the outdated value. Fix it by: 1. Always including all captured variables in the dependency array. 2. Using functional state updates `setCount(prev => prev + 1)` which don't close over the state variable. 3. Using a `useRef` to hold the latest value.",
        "proTip": "Demonstrate understanding by giving an interval example where `count` never exceeds 1 because `setInterval` captures `count=0` forever."
    },
    {
        "category": "Intermediate",
        "tag": "TypeScript with React",
        "question": "How do you correctly type an event handler for an input field and a button in React TypeScript?",
        "answer": "For an input field: `const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value); };`\nFor a button click: `const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); };`\nFor form submission: `const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); };`\nReact provides generic SyntheticEvent wrappers that take the corresponding HTML DOM element as a generic type parameter.",
        "proTip": "Mention that you can also hover over the inline `onChange` attribute in VS Code to see TypeScript's inferred event signature instantly."
    },
    {
        "category": "Intermediate",
        "tag": "State Management",
        "question": "When should you use Context API vs Redux Toolkit in enterprise projects?",
        "answer": "Use Context API for low-frequency global data that doesn't change often across the app (such as active theme, current user auth session, language/locale). Use Redux Toolkit (or Zustand) when you have: 1. High-frequency state updates (keystrokes, animations, stock tickers) because Context re-renders every consuming component on any change. 2. Complex state transitions requiring pure reducers and action payloads. 3. Need for Redux DevTools time-travel debugging. 4. Heavy asynchronous API caching and synchronization via RTK Query.",
        "proTip": "Clarify that Context API is a dependency injection / prop-passing mechanism, NOT a state management tool with selector memoization."
    },
    {
        "category": "Advanced",
        "tag": "Performance & Architecture",
        "question": "What is the difference between useMemo and useCallback? When should they NOT be used?",
        "answer": "`useMemo` memoizes and returns the *result* of an expensive calculation function (`useMemo(() => compute(a, b), [a, b])`). `useCallback` memoizes and returns the *function reference itself* (`useCallback((id) => handleClick(id), [])`) to maintain referential equality across renders.\nThey should NOT be used prematurely on every function or primitive variable because: 1. The memory and computation cost of maintaining dependency arrays and closure wrappers can exceed the cost of re-instantiating small functions. 2. They add code complexity without measurable performance gains unless a child component is wrapped in `React.memo` or the computation is truly CPU-intensive.",
        "proTip": "Emphasize: 'Profile before optimizing. Measure with React Profiler first.'"
    },
    {
        "category": "Advanced",
        "tag": "React 18 Concurrent",
        "question": "Explain Automatic Batching and Transitions in React 18 (startTransition & useTransition).",
        "answer": "In React 17, state updates were only batched inside React event handlers. In React 18, Automatic Batching groups multiple state updates together into a single render across setTimeout, promises, and native event handlers.\n`startTransition` allows marking non-urgent state updates (like filtering a 5,000 item list) as 'transitions', keeping urgent updates (like typing in an input field or button clicks) responsive at 60 FPS. If the user keeps typing, React can interrupt or abandon the in-progress background transition render.",
        "proTip": "Highlight the contrast: Urgent updates (direct typing, hovering, clicks) vs Transition updates (screen transitions, search results calculation)."
    },
    {
        "category": "Scenario-Based",
        "tag": "Real-World Architecture",
        "question": "Scenario: A user reports that refreshing a page on your deployed React Router application returns a 404 Not Found error on Netlify/Vercel. Why is this happening and how do you resolve it?",
        "answer": "Why it happens: A React SPA is a client-side routed app where physically only a single `index.html` file exists in the build output (`dist/`). When a user visits `https://myapp.com/products/42`, the cloud web server searches for a physical file `/products/42/index.html`. Since it doesn't exist, the server throws an HTTP 404.\nHow to fix it: Configure SPA URL rewriting on the host:\n- On Netlify: Add a `public/_redirects` file with `/*  /index.html  200`.\n- On Vercel: Add a `vercel.json` with `\"rewrites\": [{ \"source\": \"/(.*)\", \"destination\": \"/index.html\" }]`.\n- On Nginx: `try_files $uri $uri/ /index.html;`.\nThis instructs the web server to always return `index.html`, allowing React Router to inspect the URL pathname and render the client view.",
        "proTip": "This is one of the most common production issues asked in junior-to-mid level frontend interviews."
    },
    {
        "category": "Scenario-Based",
        "tag": "Security & Payments",
        "question": "Scenario: How do you securely store a JWT authentication token in a React frontend, and why shouldn't you fulfill orders from client-side payment callbacks?",
        "answer": "1. JWT Storage: Storing JWTs in `localStorage` makes them accessible to malicious scripts via Cross-Site Scripting (XSS). The most secure pattern is storing tokens in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie which client JavaScript cannot access. Alternatively, store the access token in memory (React state) and use a refresh token in an HttpOnly cookie to re-issue it silently.\n2. Payment Fulfillment: A client-side payment success callback (like Stripe `handleCardPayment` or Razorpay `handler`) runs on the user's browser, which can be modified or spoofed using DevTools. Therefore, order creation and inventory deduction should ONLY be authorized after verifying a cryptographically signed Server Webhook sent directly from Stripe/Razorpay to your backend server.",
        "proTip": "Mention OWASP guidelines: 'Never trust client-side assertions for financial or security operations.'"
    },
    {
        "category": "Practical Coding Challenges",
        "tag": "Live Coding",
        "question": "Coding Challenge: Write a custom hook 'useDebounce' with full cleanup and explanation.",
        "answer": `function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    // Set up a timer to update value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timer if value changes before delay finishes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
        "proTip": "Explain how the return cleanup function cancels the previous timer whenever the user types again, preventing API spam."
    },
    {
        "category": "Practical Coding Challenges",
        "tag": "Live Coding",
        "question": "Coding Challenge: Implement a generic TypeScript props interface for a custom Modal component.",
        "answer": `interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  size = 'md',
  showCloseButton = true
}) => {
  if (!isOpen) return null;
  return (
    <div className="backdrop" onClick={onClose}>
      <div className={\`modal-card modal-\${size}\`} onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        {showCloseButton && <button onClick={onClose}>Close</button>}
      </div>
    </div>
  );
};`,
        "proTip": "Use `React.ReactNode` for children because it accepts strings, numbers, JSX elements, and null."
    }
]
