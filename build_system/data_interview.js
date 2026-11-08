/**
 * Comprehensive Interview Preparation Database for ReactMastery
 * Format:
 * - Question: English
 * - Professional Answer: English
 * - Hinglish Explanation: Hinglish (Hindi in Roman script)
 * - Code Example: English syntax
 * - Follow-up Questions: Related technical follow-ups
 * - Pro Tip: Practical interview advice
 */

module.exports = [
  {
    category: "Beginner",
    tag: "React Basics",
    question: "What is the Virtual DOM and how does React's Reconciliation process work?",
    answer: "The Virtual DOM (VDOM) is a lightweight in-memory JavaScript representation of the actual browser DOM. When state or props change in a React component, React creates a new VDOM tree and compares it with the previous snapshot using its heuristic O(n) diffing algorithm (Reconciliation). React identifies the minimal set of changes and applies those updates in a single batched repaint to the real DOM, preventing costly browser layout reflows.",
    hinglish: "Virtual DOM ek halka-phulka in-memory JavaScript object hota hai jo real browser DOM ki copy jaisa hota hai. Jab bhi state ya props change hote hain, React ek naya VDOM tree banata hai aur pichhle VDOM se compare karta hai (ise Diffing ya Reconciliation kehte hain). Jo jo chizein badli hain, sirf wahi Real DOM me update hoti hain, poora page repaint nahi hota.",
    codeExample: `// Conceptual reconciliation flow:
// 1. Initial State: <div><h1>Count: 0</h1></div>
// 2. State updates: count = 1
// 3. New VDOM:      <div><h1>Count: 1</h1></div>
// 4. Diff detected: Text content changed from 0 -> 1
// 5. Real DOM call:  h1Node.textContent = "Count: 1"; (Batch update)`,
    followUp: "1. What is React Fiber and how does it differ from the legacy stack reconciler? 2. Why is direct DOM manipulation slower than Virtual DOM diffing?",
    proTip: "Always mention React 16+ Fiber architecture which allows incremental rendering, prioritization of urgent user inputs, and time-slicing."
  },
  {
    category: "Beginner",
    tag: "React Fundamentals",
    question: "Why can't you mutate state directly in React (e.g., state.count = 5)?",
    answer: "Directly mutating state does not trigger a re-render because React relies on referential equality checks (prevState !== nextState). If you mutate an object in place, its memory reference remains unchanged, causing React's diffing algorithm to bail out of rendering. Furthermore, direct mutation breaks time-travel debugging, undo/redo mechanisms, and React 18 concurrent features.",
    hinglish: "React me state ko directly mutate (jaise state.count = 5) isliye nahi karte kyunki React memory reference compare karta hai. Agar aap usi object ko modify kar doge to memory address same rahega, aur React ko lagega ki koi change hi nahi hua, isliye component re-render nahi hoga. Hamesha setState ya setCount ka use karke naya object return karna chahiye.",
    codeExample: `// ❌ Galat Tareeqa (Direct Mutation - No Re-render):
state.items.push('New Item');

// ✅ Sahi Tareeqa (Immutable Update - Triggers Re-render):
setItems(prevItems => [...prevItems, 'New Item']);`,
    followUp: "1. How does Object.is compare state in React? 2. What is the difference between shallow copy and deep copy when updating nested state?",
    proTip: "Mention that immutable updates allow React to optimize performance through pure component checks and memoization."
  },
  {
    category: "Beginner",
    tag: "JSX & Props",
    question: "What is the difference between Props and State in React?",
    answer: "Props are read-only inputs passed from a parent component down to a child component, enforcing unidirectional data flow. The child cannot modify its own props. State is internal, mutable data owned and managed directly within the component itself. When state updates via its setter function, it automatically triggers a re-render of the component and its children.",
    hinglish: "Props function arguments ki tarah hote hain jo parent component apne child ko pass karta hai. Props read-only hote hain, child unhe badal nahi sakta. Jabki State component ka personal internal data hota hai (local variables ki tarah). Jab user koi button click karta hai ya API se data aata hai, to hum state update karte hain aur UI automatically refresh ho jata hai.",
    codeExample: `// Parent passes Props; Child manages State
function Parent() {
  return <ChildComponent title="User Dashboard" />; // Props
}

function ChildComponent({ title }) {
  const [likes, setLikes] = React.useState(0); // State
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={() => setLikes(l => l + 1)}>Likes: {likes}</button>
    </div>
  );
}`,
    followUp: "1. Can props change over time? (Yes, when the parent re-renders with new values). 2. What is 'prop drilling' and how do you solve it?",
    proTip: "Use the classic analogy: Props are like your birth name (given by parents, immutable), State is like your clothes (you choose and change them yourself)."
  },
  {
    category: "Intermediate",
    tag: "Hooks & Closures",
    question: "What is a 'Stale Closure' in React Hooks and how do you prevent it?",
    answer: "A stale closure occurs when a callback function inside useEffect, useCallback, or an event handler captures a state or prop variable from an earlier render. If that variable changes in subsequent renders but the callback does not re-create (due to an empty or missing dependency array), the callback continues reading the outdated snapshot.",
    hinglish: "Stale Closure tab hota hai jab koi function (jaise useEffect ya setTimeout) pichhle render ki purani state value ko yaad (close over) kar leta hai. Agar hum dependency array me us variable ko nahi daalte, to function ko naye render ki nayi value nahi milti aur wo purana data hi print karta rehta hai. Isko theek karne ke liye: 1. Functional updates use karein `setCount(c => c + 1)`. 2. Dependency array me sabhi variables include karein. 3. `useRef` ka use karein.",
    codeExample: `// ❌ Stale Closure Example:
useEffect(() => {
  const timer = setInterval(() => {
    // count is locked at 0 from mount!
    setCount(count + 1); // Only ever reaches 1
  }, 1000);
  return () => clearInterval(timer);
}, []); // Missing 'count' in deps

// ✅ Fix using Functional Update:
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1); // Always reads latest state!
  }, 1000);
  return () => clearInterval(timer);
}, []);`,
    followUp: "1. Why does eslint-plugin-react-hooks enforce exhaustive-deps? 2. When should you use useRef instead of adding a dependency?",
    proTip: "Demonstrate interval counters: functional updater `setCount(c => c + 1)` doesn't need `count` in the dependency array, avoiding unnecessary interval teardowns."
  },
  {
    category: "Intermediate",
    tag: "TypeScript with React",
    question: "How do you properly type component props, children, and synthetic events in React TypeScript?",
    answer: "Define an interface or type alias for props. For children, use `React.ReactNode` (which accepts strings, numbers, JSX, arrays, null, and fragments). For events, use React's built-in synthetic generic types: `React.ChangeEvent<HTMLInputElement>` for inputs, `React.MouseEvent<HTMLButtonElement>` for buttons, and `React.FormEvent<HTMLFormElement>` for forms.",
    hinglish: "TypeScript me props ke liye `interface` ya `type` banate hain. Agar component ke andar children pass ho rahe hain, to unka type `React.ReactNode` hota hai. Form input ke change event ke liye `React.ChangeEvent<HTMLInputElement>` aur button click ke liye `React.MouseEvent<HTMLButtonElement>` use kiya jata hai.",
    codeExample: `interface CardProps {
  title: string;
  count?: number; // Optional prop
  onAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, count = 0, onAction, children }) => (
  <div className="card">
    <h3>{title} ({count})</h3>
    {children}
    <button onClick={onAction}>Click</button>
  </div>
);`,
    followUp: "1. What is the difference between React.ReactNode, React.ReactElement, and JSX.Element? 2. Why is React.FC sometimes discouraged in modern TypeScript?",
    proTip: "Mention that hovering over JSX event handlers in VS Code automatically displays the exact TypeScript event type to copy."
  },
  {
    category: "Intermediate",
    tag: "State Management",
    question: "When should you use Context API versus Redux Toolkit in real-world applications?",
    answer: "Context API is designed for low-frequency global data that rarely changes across the app (such as active theme, user auth session, language/locale). Redux Toolkit is suited for complex applications with high-frequency state updates, nested relational entities, time-travel debugging requirements, and complex async server caching pipelines via RTK Query.",
    hinglish: "Context API tab use karna chahiye jab data kam badalta ho—jaise Dark/Light theme, logged-in user profile, ya language. Kyunki Context me koi bhi choti si value change hone par uske sabhi consumers re-render ho jaate hain. Redux Toolkit tab use karein jab data baar-baar update hota ho (e-commerce cart, live trading, gaming), complex actions hon, aur Redux DevTools se debugging karni ho.",
    codeExample: `// Context API: Dependency Injection for Theme
const ThemeContext = React.createContext<'light' | 'dark'>('dark');

// Redux Toolkit: Optimized High-Frequency Store
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      // Immer allows direct mutation syntax!
      state.items.push(action.payload);
    }
  }
});`,
    followUp: "1. Why does Context API cause unnecessary re-renders in consuming components? 2. How does RTK Query eliminate the need for manual useEffect data fetching?",
    proTip: "Emphasize: 'Context API is a dependency injection mechanism, not a state manager with selector memoization.'"
  },
  {
    category: "Advanced",
    tag: "Performance & Architecture",
    question: "What is the difference between useMemo and useCallback? When do they actually help and when do they hurt?",
    answer: "useMemo memoizes the returned result of a computation function: useMemo(() => expensiveCalculation(a, b), [a, b]). useCallback memoizes the callback function reference itself: useCallback(() => handleClick(id), [id]). They help when passing callbacks to React.memo wrapped children or avoiding expensive loops. They hurt when used prematurely on trivial operations because allocating closure memory and dependency arrays costs more CPU than re-creating a small function.",
    hinglish: "useMemo kisi bhari calculation ke RESULT ko memory me save karta hai taaki baar-baar calculate na karna pade. useCallback FUNCTION REFERENCE ko save karta hai taaki har render par naya function memory me create na ho. Inka faida tab hota hai jab koi child component React.memo se wrapped ho. Har jagah useMemo lagane se code slow hota hai kyunki dependency array check karne ka bhi apna overhead hota hai.",
    codeExample: `// useMemo caches the result
const filteredList = React.useMemo(() => {
  return bigList.filter(item => item.price > 100);
}, [bigList]);

// useCallback caches the function instance
const handleDelete = React.useCallback((id) => {
  deleteItem(id);
}, []); // Child won't re-render if wrapped in React.memo!`,
    followUp: "1. What is referential equality and how does it relate to React.memo? 2. How can state colocation eliminate the need for useMemo entirely?",
    proTip: "Rule of thumb: 'Measure before optimizing. Use the React Profiler to verify whether a component is actually rendering slowly.'"
  },
  {
    category: "Advanced",
    tag: "React 18 Concurrent",
    question: "Explain Automatic Batching and Transitions in React 18 (startTransition & useTransition).",
    answer: "In React 17, state updates were only batched inside synthetic React event handlers. In React 18, Automatic Batching groups multiple state updates together into a single render across setTimeout, promises, and native event listeners. startTransition allows marking non-urgent state updates (like filtering a 10,000 item list) as 'transitions', ensuring urgent updates (typing in an input field or button clicks) stay responsive at 60 FPS without UI freezing.",
    hinglish: "React 17 me agar setTimeout ya Promise ke andar 2 state updates hote the, to React 2 alag-alag re-renders karta tha. React 18 me Automatic Batching sabhi updates ko ek hi render me batch kar deta hai. Aur startTransition ka use karke hum non-urgent tasks (jaise badi list filter karna) ko background me bhej sakte hain, taaki user ka typing experience bilkul smooth rahe aur keyboard lag na kare.",
    codeExample: `const [input, setInput] = React.useState('');
const [isPending, startTransition] = React.useTransition();

const handleChange = (e) => {
  // Urgent update: Show typed letter immediately!
  setInput(e.target.value);

  // Non-urgent transition: Can be interrupted if user keeps typing!
  startTransition(() => {
    setHeavySearchQuery(e.target.value);
  });
};`,
    followUp: "1. What is the difference between useDeferredValue and useTransition? 2. How does React 18 Suspense work with SSR (Streaming HTML)?",
    proTip: "Highlight that transition updates can be interrupted by React if the user types another keystroke, discarding stale render work automatically."
  },
  {
    category: "Scenario-Based",
    tag: "Deployment & Routing",
    question: "Scenario: A user refreshes a page on a deployed React Router app on Netlify/Vercel and gets a 404 Not Found error. Why does this happen and how do you fix it?",
    answer: "Why it happens: A React SPA serves only a single physical index.html file in dist/. When a user visits /products/42 directly, the web server looks for a physical directory /products/42/index.html, fails to find it, and returns an HTTP 404. Fix it by configuring server URL rewrite rules: Netlify (_redirects file: '/* /index.html 200'), Vercel (vercel.json: rewrites to /index.html), Nginx (try_files $uri $uri/ /index.html). This forces the server to return index.html for all routes, allowing React Router on the client to inspect the URL and render the correct view.",
    hinglish: "Problem yeh hai ki React Router ek Client-Side routing Single Page App hai. Server par physically sirf ek hi file hoti hai: index.html. Jab user `/products/42` par page refresh karta hai, to cloud server us naam ka physical folder dhundhta hai jo exist hi nahi karta, isliye 404 error aata hai. Solution: Server par Rewrite Rule lagana padta hai (jaise Netlify me `/* /index.html 200` ya Vercel me `vercel.json`). Isse server hamesha index.html bhejta hai aur React Router URL padhkar correct screen render karta hai.",
    codeExample: `// Netlify: public/_redirects
/*    /index.html   200

// Vercel: vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}`,
    followUp: "1. What is the difference between HashRouter and BrowserRouter? 2. How does Server-Side Rendering (SSR with Next.js) avoid this issue?",
    proTip: "This is one of the most frequently asked practical DevOps/deployment questions in frontend interviews."
  },
  {
    category: "Scenario-Based",
    tag: "Security & Payments",
    question: "Scenario: How should JWT tokens be stored securely in React, and why must payment fulfillment never be handled directly in frontend callbacks?",
    answer: "1. JWT Storage: Storing JWTs in localStorage exposes them to Cross-Site Scripting (XSS) attacks. The industry standard is storing tokens in an HttpOnly, Secure, SameSite=Strict cookie that client-side JavaScript cannot access. Alternatively, keep access tokens in React in-memory state and use a refresh token in an HttpOnly cookie. 2. Payments: Frontend payment callbacks (Stripe/Razorpay client callbacks) execute on the user's browser, where malicious users can alter network responses or run DevTools scripts. Order fulfillment, user upgrades, and inventory deduction must ONLY occur upon verifying a cryptographically signed Server Webhook received directly from the payment gateway.",
    hinglish: "1. Token Security: JWT ko kabhi bhi localStorage me store nahi karna chahiye kyunki agar site par koi XSS script chali to token chori ho jayega. Sabse secure tareeqa HttpOnly cookie hai jise JavaScript padh hi nahi sakti. 2. Payments: Browser ka code user ke control me hota hai. Koi bhi DevTools se success response fake kar sakta hai. Isliye order confirm karne ke liye hamesha Server Webhook ka wait karein jo Stripe/Razorpay direct aapke backend server ko bhejta hai cryptographically signed secret ke sath.",
    codeExample: `// ❌ Dangerous (Client-side fulfillment):
function onPaymentSuccess(response) {
  // Never fulfill directly from frontend!
  axios.post('/api/grant-subscription', { userId: 123 }); 
}

// ✅ Secure (Server Webhook verification):
// Stripe/Razorpay sends webhook -> Your Backend verifies signature -> Database updates!`,
    followUp: "1. What is Cross-Site Request Forgery (CSRF) and how does SameSite=Strict prevent it? 2. How does Content Security Policy (CSP) protect React apps from XSS?",
    proTip: "Quote the OWASP security guideline: 'Never trust client-side assertions for financial transactions, authorization, or identity verification.'"
  },
  {
    category: "Practical Coding Challenges",
    tag: "Live Coding",
    question: "Coding Challenge: Implement a production-grade 'useDebounce' custom hook with full cleanup and typing.",
    answer: "A debounce hook delays updating a value until a specified duration has elapsed without new changes. It uses useState to store the debounced value and useEffect with a setTimeout. Critically, the effect returns a cleanup function clearTimeout(handler) which cancels any pending timer whenever the input value changes before the delay completes.",
    hinglish: "useDebounce custom hook ka use search bar me API calls ko limit karne ke liye hota hai. Jab tak user lagatar type kar raha hota hai, purana timer cancel hota rehta hai. Jaise hi user 500ms tak rukta hai, tab jakar debounced value update hoti hai aur API call trigger hoti hai.",
    codeExample: `function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    // Start timer for delayed update
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Cancel timer if value changes before delay expires!
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
    followUp: "1. How would you implement a useThrottle hook instead? 2. How does AbortController combine with useDebounce for network request cancellation?",
    proTip: "In live coding interviews, highlight the cleanup function `return () => clearTimeout(timer)`—interviewers specifically look for proper cleanup to avoid memory leaks."
  },
  {
    category: "Practical Coding Challenges",
    tag: "Live Coding",
    question: "Coding Challenge: Implement a compound Modal component using React Portals with keyboard accessibility.",
    answer: "A production Modal uses ReactDOM.createPortal to render outside the main DOM hierarchy (directly into document.body or a dedicated #modal-root), preventing z-index and overflow:hidden clipping issues. It listens to the Escape key to close, locks body scrolling when open, and traps focus for accessibility.",
    hinglish: "Modal dialogs ko hamesha React Portal (`ReactDOM.createPortal`) se render karna chahiye taaki parent component ke CSS (jaise `overflow: hidden` ya `z-index`) modal ko clip na karein. Sath hi Escape key dabane par modal band hona chahiye aur background par click karne par modal dismiss hona chahiye (`e.stopPropagation()` ke sath).",
    codeExample: `interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function AccessibleModal({ isOpen, onClose, title, children }: ModalProps) {
  // Listen for Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}`,
    followUp: "1. Why does React event bubbling still work through Portals even though the DOM node is rendered elsewhere? 2. How do you implement focus trapping using inert or focus-trap-react?",
    proTip: "Mention that React Portal event bubbling follows the React component hierarchy, not the physical DOM hierarchy."
  }
];
