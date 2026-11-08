/**
 * Modules 4, 5, and 6 Curriculum Data for ReactMastery
 * PART 4: Advanced Component Patterns (4 Exercises + Component Library)
 * PART 5: Forms, Storage & UI Libraries (7 Exercises + Employee Admin Panel)
 * PART 6: React Router (3 Exercises + Multi-Page Admin Dashboard)
 */

module.exports = [
  {
    id: "module-4",
    number: 4,
    title: "Advanced Component Patterns",
    hindiTitle: "Advanced Component Patterns (Context, Portals & Error Boundaries)",
    badge: "Architecture & Reliability",
    description: "Context API deep dive, multiple providers, mini-Redux with useReducer+Context, Error Boundaries, React Portals, and Suspense code-splitting.",
    lessons: [
      {
        id: "m4-context-deep-dive",
        title: "1. Context API Deep Dive & useReducer as Redux Alternative",
        level: "Intermediate",
        summary: "Build a scalable mini-Redux architecture using multiple Context Providers and useReducer without any external library.",
        intro: "React me bina external libraries ke global state manage karne ka sabse powerful native tarika Context API + useReducer combination hai.",
        whatIsIt: "Context API enables passing data through the component tree without having to pass props down manually at every level. When paired with useReducer, it mimics Redux by providing a centralized state object and a global dispatch function.",
        whyNeeded: "Small to medium apps me full Redux Toolkit setup karna boilerplate heavy ho sakta hai. Context API React ka native feature hai jisme zero bundle size add hota hai.",
        analogy: "Context API ek central water tank jaisa hai jahan har floor ka tap direct connected hai, bina har room me alag pipe ghumaye!",
        technicalExplanation: "Context uses a Provider-Consumer pattern. When the value in <MyContext.Provider value={val}> changes, every descendant component that calls useContext(MyContext) will re-render. To avoid massive re-renders, split contexts into <AuthContext> and <ThemeContext> instead of one giant object.",
        syntax: `// Creating Context + Reducer Architecture
const StateContext = React.createContext();
const DispatchContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};`,
        codeExplanation: "State aur Dispatch ko alag alag Context me rakhne se jo components sirf action dispatch karte hain wo unnecessary re-render hone se bach jaate hain.",
        expectedOutput: "Global state accessible anywhere in the component tree via useContext cleanly.",
        practicalImplementation: `export const useAppState = () => {
  const context = React.useContext(StateContext);
  if (!context) throw new Error('useAppState must be used within StoreProvider');
  return context;
};

export const useAppDispatch = () => {
  const context = React.useContext(DispatchContext);
  if (!context) throw new Error('useAppDispatch must be used within StoreProvider');
  return context;
};`,
        commonMistakes: "1. Putting high-frequency state into global Context without memoization, causing every component on the page to re-render.\n2. Forgetting that updating an object inside Context creates a new reference unless memoized with useMemo.",
        interviewQuestions: [
          {
            q: "Can Context API completely replace Redux in large applications?",
            a: "For small to medium applications, yes. But in large enterprise apps, Redux is preferred because Context API re-renders all consumers on any value change, lacks middleware (Thunk/Saga), and lacks Redux DevTools time-travel debugging."
          },
          {
            q: "How do you optimize Context API to prevent re-renders?",
            a: "Split contexts logically, wrap provider values in useMemo, and compose components using children or React.memo."
          }
        ],
        assignment: "Create a multi-provider setup with ThemeProvider (dark/light) and LanguageProvider (en/hi) in a nested React tree.",
        quiz: {
          question: "What happens to all components calling useContext(ThemeContext) when the Provider value changes?",
          options: ["Only components with props change", "All consuming components re-render", "React pauses execution", "Only the root component re-renders"],
          answer: 1,
          explanation: "All components that consume a context will re-render whenever that context's Provider value changes."
        },
        codeTemplate: `const AppStateContext = React.createContext();

function appReducer(state, action) {
  switch(action.type) {
    case 'LOGIN': return { ...state, user: action.name, isAuth: true };
    case 'LOGOUT': return { ...state, user: null, isAuth: false };
    case 'TOGGLE_THEME': return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default: return state;
  }
}

function ContextMiniReduxLab() {
  const [state, dispatch] = React.useReducer(appReducer, { user: null, isAuth: false, theme: 'light' });

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      <div style={{
        padding: '20px',
        background: state.theme === 'dark' ? '#0f172a' : '#f8fafc',
        color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
        borderRadius: '12px',
        border: '1px solid #cbd5e1'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Mini Redux (useReducer + Context)</h3>
        <p>Current Status: <strong>{state.isAuth ? 'Logged In as ' + state.user : 'Logged Out'}</strong></p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {!state.isAuth ? (
            <button onClick={() => dispatch({ type: 'LOGIN', name: 'Alok Gupta' })} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Login Alok
            </button>
          ) : (
            <button onClick={() => dispatch({ type: 'LOGOUT' })} style={{ padding: '8px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Logout
            </button>
          )}
          <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })} style={{ padding: '8px 14px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Switch to {state.theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </div>
    </AppStateContext.Provider>
  );
}
render(<ContextMiniReduxLab />);`
      },
      {
        id: "m4-error-boundaries",
        title: "2. Error Boundaries (componentDidCatch & Fallback UI)",
        level: "Advanced",
        summary: "Catch JavaScript runtime errors anywhere in the component tree and display a graceful fallback UI instead of crashing the entire screen.",
        intro: "Production me agar kisi ek chote widget me JS runtime crash hota hai, to bina Error Boundary ke poori website white blank screen ban jati hai.",
        whatIsIt: "An Error Boundary is a React component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a graceful fallback UI instead of crashing the whole tree.",
        whyNeeded: "In production, an unhandled error inside a component unmounts the entire React root. Error boundaries isolate failures to specific widgets (e.g. sidebar or comment box) while keeping the rest of the application functional.",
        analogy: "Jaise ghar me MCB fuse hota hai: kitchen me short circuit hone par sirf kitchen ka breaker trip hota hai, poore ghar ki bijli band nahi hoti!",
        technicalExplanation: "Error Boundaries MUST be Class components (as of React 18) because there is no Hook equivalent for componentDidCatch or static getDerivedStateFromError. They do NOT catch errors in: 1. Event handlers. 2. Asynchronous code. 3. SSR. 4. Errors thrown in the boundary itself.",
        syntax: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Logged to Sentry:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please reload.</h2>;
    }
    return this.props.children;
  }
}`,
        codeExplanation: "getDerivedStateFromError fallback UI render karne ke liye state update karta hai. componentDidCatch error monitoring tools me log karta hai.",
        expectedOutput: "Graceful fallback card displayed specifically where the component crashed, leaving other page sections intact.",
        practicalImplementation: `function BuggyWidget() {
  const [crash, setCrash] = React.useState(false);
  if (crash) throw new Error('Simulated Production Crash in BuggyWidget!');
  return <button onClick={() => setCrash(true)}>Trigger Error Boundary</button>;
}`,
        commonMistakes: "1. Expecting Error Boundaries to catch errors inside onClick handlers. (Use standard try/catch inside event handlers).\n2. Wrapping the entire website in only one error boundary.",
        interviewQuestions: [
          {
            q: "Why can't Error Boundaries be written as functional components with Hooks?",
            a: "Because the React core team has not yet implemented hook equivalents for getDerivedStateFromError or componentDidCatch lifecycle methods."
          },
          {
            q: "How do you handle errors inside event handlers in React?",
            a: "Use standard try...catch blocks inside the handler function because Error Boundaries do not catch errors inside event handlers."
          }
        ],
        assignment: "Create an ErrorBoundary with a 'Try Again' button that resets its state and re-renders children.",
        quiz: {
          question: "Which types of errors are NOT caught by React Error Boundaries?",
          options: ["Errors in child component render()", "Errors inside event handlers (onClick)", "Errors in child lifecycle methods", "Errors in child constructors"],
          answer: 1,
          explanation: "Error boundaries do not catch errors in event handlers because event handlers run outside of the React render cycle."
        },
        codeTemplate: `class SafeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }
  componentDidCatch(error, info) {
    console.warn('Boundary Caught Error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px', color: '#991b1b' }}>
          <h4 style={{ margin: 0 }}>🛡️ Error Caught by Boundary</h4>
          <p style={{ fontSize: '13px', margin: '6px 0' }}>{this.state.errorMsg}</p>
          <button onClick={() => this.setState({ hasError: false })} style={{ padding: '6px 12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Try Again / Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function CrashSimulator() {
  const [shouldCrash, setShouldCrash] = React.useState(false);
  if (shouldCrash) throw new Error('Fatal Bug: Component render exploded!');

  return (
    <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px' }}>
      <p>Component is currently healthy and functioning.</p>
      <button onClick={() => setShouldCrash(true)} style={{ padding: '6px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Simulate Crash
      </button>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Error Boundary Simulation</h3>
      <SafeErrorBoundary>
        <CrashSimulator />
      </SafeErrorBoundary>
    </div>
  );
}
render(<App />);`
      },
      {
        id: "m4-portals-and-modals",
        title: "3. React Portals (Rendering Modals Outside Root DOM)",
        level: "Intermediate",
        summary: "Render modals, tooltips, and overlays directly into document.body to escape CSS overflow and z-index traps.",
        intro: "CSS me jab kisi parent container par overflow: hidden ya z-index laga ho, to child popup cut jata hai. React Portals iska permanent solution hain.",
        whatIsIt: "React Portals (ReactDOM.createPortal(child, container)) provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component (typically document.body).",
        whyNeeded: "Modals, tooltips, dropdown menus, and toasts need to appear on top of everything without being clipped by parent CSS styles.",
        analogy: "Jaise teleportation: component tree me rehte hue bhi DOM me kisi alag node par render hota hai!",
        technicalExplanation: "Even though a portal is rendered into a different DOM node, event bubbling still flows up the React component tree, NOT the native DOM tree! A click inside a portal will still bubble up to its React parent.",
        syntax: `import ReactDOM from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}`,
        codeExplanation: "ReactDOM.createPortal do cheezein leta hai: JSX content aur target DOM node (document.body). e.stopPropagation() content click par modal close hone se rokta hai.",
        expectedOutput: "A full-screen modal overlay that sits cleanly on top of all other elements without CSS clipping.",
        practicalImplementation: `function EscapableModal({ isOpen, onClose, title, children }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', minWidth: '320px' }}>
        <h3>{title}</h3>
        {children}
        <button onClick={onClose} style={{ marginTop: '14px' }}>Close</button>
      </div>
    </div>,
    document.body
  );
}`,
        commonMistakes: "1. Forgetting to clean up keydown event listeners when modal closes.\n2. Forgetting that events bubble through React Portals up to the React parent.",
        interviewQuestions: [
          {
            q: "How does event bubbling behave with React Portals?",
            a: "An event fired inside a portal will bubble up the React component tree (its logical ancestors), even if those elements are not ancestors in the physical DOM tree."
          },
          {
            q: "Why render modals to document.body rather than inside the component tree?",
            a: "To avoid CSS issues such as overflow: hidden, z-index stacking context traps, and CSS transform on ancestor containers."
          }
        ],
        assignment: "Build a Toast Notification manager that renders toast alerts into document.body using React Portals.",
        quiz: {
          question: "Which method is used to create a React Portal?",
          options: ["React.portal()", "ReactDOM.createPortal()", "React.teleport()", "ReactDOM.renderToBody()"],
          answer: 1,
          explanation: "ReactDOM.createPortal(child, container) is the official API."
        },
        codeTemplate: `function PortalModalDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>React Portal Demonstration</h3>
      <button onClick={() => setIsOpen(true)} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Open Portal Modal
      </button>

      {isOpen && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 99999
        }} onClick={() => setIsOpen(false)}>
          <div style={{
            background: '#fff', padding: '24px', borderRadius: '12px',
            maxWidth: '400px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>⚡ Teleported via Portal</h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
              This modal is rendered directly into document.body, completely escaping any container overflow constraints!
            </p>
            <button onClick={() => setIsOpen(false)} style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Close Modal
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
render(<PortalModalDemo />);`
      },
      {
        id: "m4-suspense-and-lazy-loading",
        title: "4. Suspense, React.lazy & Code Splitting",
        level: "Advanced",
        summary: "Break monolithic bundles into small on-demand chunks using dynamic import(), React.lazy, and Suspense fallback.",
        intro: "Badi applications me shuru me hi poora code download karwane se initial page load bohot slow ho jata hai. Code splitting se hum sirf wahi code load karte hain jo screen par chahiye.",
        whatIsIt: "React.lazy() lets you render a dynamic import as a regular component. Suspense wraps lazy-loaded components and displays a fallback UI while the chunk is being downloaded over the network.",
        whyNeeded: "Improves Core Web Vitals (LCP, FID). Users visiting the home page shouldn't have to download the 5MB heavy admin dashboard chunk.",
        analogy: "Jaise video streaming app (Netflix) poori 4K movie ek sath download nahi karti, balki jaise jaise aap dekhte hain chunks stream karti hai!",
        technicalExplanation: "Under the hood, React.lazy() uses dynamic import('./Component'). When the lazy component is first rendered, it throws a Promise internally. The parent <Suspense fallback={<Loader />}> catches that promise, displays the fallback, and resumes rendering when the promise resolves.",
        syntax: `import React, { Suspense, lazy } from 'react';

// Lazy loaded chunk
const AnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));

function App() {
  return (
    <Suspense fallback={<div className="spinner">Loading dashboard...</div>}>
      <AnalyticsDashboard />
    </Suspense>
  );
}`,
        codeExplanation: "lazy() dynamic import return karta hai jo ek separate JS bundle chunk generate karta hai. Suspense chunk download hone tak fallback spinner dikhata hai.",
        expectedOutput: "Instant initial page render with zero lag; components stream in seamlessly on demand.",
        practicalImplementation: `const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));

function RouterWithSuspense() {
  return (
    <React.Suspense fallback={<div className="p-4">Loading view...</div>}>
      {/* Routes rendered here */}
    </React.Suspense>
  );
}`,
        commonMistakes: "1. Using React.lazy inside the component render function instead of declaring it at the module top level.\n2. Forgetting to provide a fallback prop to <Suspense>.",
        interviewQuestions: [
          {
            q: "How does React Suspense work internally under the hood?",
            a: "When a lazy component renders before its chunk is downloaded, it throws a pending Promise. The nearest <Suspense> boundary catches the thrown promise, renders the fallback UI, and subscribes to the promise resolution to re-render the resolved component."
          },
          {
            q: "What are the common strategies for code splitting in React?",
            a: "1. Route-based code splitting. 2. Component-based code splitting (lazy loading heavy widgets like charts or editors)."
          }
        ],
        assignment: "Simulate a lazy component with a 2-second fake network delay and display an animated pulsing skeleton while loading.",
        quiz: {
          question: "What is the mandatory prop required by <Suspense>?",
          options: ["loader", "fallback", "placeholder", "pendingUI"],
          answer: 1,
          explanation: "The fallback prop specifies the JSX to render while children are suspended."
        },
        codeTemplate: `function FakeHeavyComponent() {
  return (
    <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px' }}>
      <h4 style={{ color: '#166534', margin: 0 }}>📊 Heavy Analytics Loaded!</h4>
      <p style={{ fontSize: '13px', color: '#15803d' }}>Rendered 10,000 data points smoothly after lazy import resolution.</p>
    </div>
  );
}

function SuspenseSimulator() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLazyLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 1500);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>React.lazy & Suspense Simulator</h3>
      {!isLoaded && !isLoading && (
        <button onClick={handleLazyLoad} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Click to Lazy Load Heavy Module
        </button>
      )}
      {isLoading && (
        <div style={{ padding: '16px', background: '#e0f2fe', borderRadius: '8px', color: '#0369a1' }}>
          ⏳ <strong>Suspense Fallback:</strong> Streaming chunk over network (1.5s delay)...
        </div>
      )}
      {isLoaded && <FakeHeavyComponent />}
    </div>
  );
}
render(<SuspenseSimulator />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Build a theme + auth Context with useReducer (mini Redux pattern)",
        instructions: "Combine ThemeContext and AuthContext with useReducer to create a complete mini-Redux state tree capable of handling theme switches and authentication state.",
        solutionCode: `const GlobalStoreContext = React.createContext();

const rootReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN': return { ...state, user: { name: action.payload, token: 'jwt_mock_889' } };
    case 'LOGOUT': return { ...state, user: null };
    case 'TOGGLE_THEME': return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default: return state;
  }
};

function MiniReduxApp() {
  const [state, dispatch] = React.useReducer(rootReducer, {
    user: null,
    theme: 'light'
  });

  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      <div style={{
        padding: '24px',
        background: state.theme === 'dark' ? '#0f172a' : '#f8fafc',
        color: state.theme === 'dark' ? '#fff' : '#0f172a',
        borderRadius: '12px',
        border: '1px solid #cbd5e1'
      }}>
        <h3>Mini Redux: Combined Theme & Auth Context</h3>
        <p>Theme: <strong>{state.theme.toUpperCase()}</strong> | User: <strong>{state.user ? state.user.name : 'Anonymous'}</strong></p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })} style={{ padding: '8px 14px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px' }}>
            Toggle Theme
          </button>
          {state.user ? (
            <button onClick={() => dispatch({ type: 'LOGOUT' })} style={{ padding: '8px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px' }}>
              Logout
            </button>
          ) : (
            <button onClick={() => dispatch({ type: 'LOGIN', payload: 'Dev Priya' })} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>
              Login Priya
            </button>
          )}
        </div>
      </div>
    </GlobalStoreContext.Provider>
  );
}
render(<MiniReduxApp />);`
      },
      {
        num: 2,
        title: "Exercise 2: Wrap an app section in an Error Boundary and show a fallback UI on crash",
        instructions: "Create a robust Error Boundary class and wrap an isolated financial widget inside it, demonstrating how a localized error does not break the parent page.",
        solutionCode: `class LocalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err, info) {
    console.error('Caught error in widget:', err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '16px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', color: '#be123c' }}>
          <h4>⚠️ Stock Widget Crashed</h4>
          <p style={{ fontSize: '12px' }}>This specific widget failed, but the surrounding application remains completely intact.</p>
          <button onClick={() => this.setState({ hasError: false })} style={{ padding: '4px 10px', background: '#be123c', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function StockWidget() {
  const [exploded, setExploded] = React.useState(false);
  if (exploded) throw new Error('API Rate limit 429');
  return (
    <div style={{ padding: '14px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
      <p>NIFTY 50: <strong>24,530.80 (+0.8%)</strong></p>
      <button onClick={() => setExploded(true)} style={{ padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Simulate API Crash
      </button>
    </div>
  );
}

function MultiWidgetDashboard() {
  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Main Application (Stable)</h3>
      <LocalErrorBoundary>
        <StockWidget />
      </LocalErrorBoundary>
    </div>
  );
}
render(<MultiWidgetDashboard />);`
      },
      {
        num: 3,
        title: "Exercise 3: Build a Modal using React Portals",
        instructions: "Construct a full-featured Modal Dialog utilizing ReactDOM.createPortal that closes on backdrop click and on Esc key press.",
        solutionCode: `function ProPortalModal() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') setVisible(false); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>React Portal Modal Implementation</h3>
      <button onClick={() => setVisible(true)} style={{ padding: '10px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Open Portal Modal
      </button>

      {visible && ReactDOM.createPortal(
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000 }} onClick={() => setVisible(false)}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '10px', maxWidth: '420px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: 0 }}>Portal Dialog</h3>
            <p style={{ color: '#475569', fontSize: '14px' }}>Press ESC or click outside to dismiss this modal.</p>
            <button onClick={() => setVisible(false)} style={{ padding: '6px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
render(<ProPortalModal />);`
      },
      {
        num: 4,
        title: "Exercise 4: Lazy-load a route/component using React.lazy and Suspense with a loading fallback",
        instructions: "Implement dynamic loading of an admin reporting view wrapped inside React.Suspense with a customized spinner fallback.",
        solutionCode: `function LazyLoadingReportLab() {
  const [view, setView] = React.useState('home');
  const [isPending, setIsPending] = React.useState(false);

  const loadReport = () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setView('report');
    }, 1200);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <button onClick={() => setView('home')} style={{ padding: '6px 12px', background: view === 'home' ? '#2563eb' : '#e2e8f0', color: view === 'home' ? '#fff' : '#1e293b', border: 'none', borderRadius: '6px' }}>Home View</button>
        <button onClick={loadReport} style={{ padding: '6px 12px', background: view === 'report' ? '#2563eb' : '#e2e8f0', color: view === 'report' ? '#fff' : '#1e293b', border: 'none', borderRadius: '6px' }}>Load Heavy Report</button>
      </div>
      {isPending ? (
        <div style={{ padding: '20px', textAlign: 'center', background: '#fff', borderRadius: '8px', border: '1px dashed #3b82f6' }}>
          <div style={{ fontSize: '18px', color: '#2563eb', fontWeight: 'bold' }}>⏳ Suspense is streaming component...</div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Simulating dynamic import() network delay</p>
        </div>
      ) : view === 'report' ? (
        <div style={{ padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h4>📈 Quarterly Financial Report (Lazy Chunk)</h4>
          <p>Revenue: $4.2M (+18% YoY) | Net Profit: $1.1M</p>
        </div>
      ) : (
        <div style={{ padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          Welcome to the lightweight Home view.
        </div>
      )}
    </div>
  );
}
render(<LazyLoadingReportLab />);`
      }
    ]
  },
  {
    id: "module-5",
    number: 5,
    title: "Forms, Storage & UI Libraries",
    hindiTitle: "Forms, Validation, UI Libraries & Data Tables",
    badge: "Enterprise UI",
    description: "Controlled vs Uncontrolled components, multiselect, datepicker, multi-step forms, Bootstrap, React Select, Data Tables, and Charts.",
    lessons: [
      {
        id: "m5-forms-controlled-vs-uncontrolled",
        title: "1. Controlled vs Uncontrolled Components & Form Validation",
        level: "Intermediate",
        summary: "Master controlled inputs with state, uncontrolled inputs with refs, real-time schema validation, and multi-step forms.",
        intro: "Forms kisi bhi business application ka heart hote hain. React me form handling do tarike se hoti hai: Controlled (React state ke zariye) aur Uncontrolled (DOM refs ke zariye).",
        whatIsIt: "A Controlled Component is an input element whose value is driven by React state. An Uncontrolled Component lets the browser DOM handle its own internal value, read when needed using a ref.",
        whyNeeded: "Controlled components allow real-time validation, instant formatting, conditional disabling of submit buttons, and dynamic field dependencies.",
        analogy: "Controlled component ek remote controlled car jaisi hai. Uncontrolled component ek traditional toy car jaisi hai!",
        technicalExplanation: "Controlled forms maintain a Single Source of Truth in React state. In high-frequency input forms, performance can be optimized using debouncing or libraries like React Hook Form.",
        syntax: `// Controlled Component
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />;

// Uncontrolled Component
const inputRef = useRef();
const handleSubmit = () => alert(inputRef.current.value);
<input ref={inputRef} defaultValue="Initial" />;`,
        codeExplanation: "Controlled input me value aur onChange mandatory hote hain. Uncontrolled me defaultValue use hota hai aur reading ref.current.value se hoti hai.",
        expectedOutput: "Immediate validation feedback with errors appearing directly underneath invalid fields.",
        practicalImplementation: `function MultiStepForm() {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({ step1: '', step2: '' });

  return (
    <div>
      <h3>Step {step} of 2</h3>
      {step === 1 && <input value={data.step1} onChange={e => setData({ ...data, step1: e.target.value })} placeholder="Personal Info" />}
      {step === 2 && <input value={data.step2} onChange={e => setData({ ...data, step2: e.target.value })} placeholder="Payment Info" />}
      <button onClick={() => setStep(s => s === 1 ? 2 : 1)}>{step === 1 ? 'Next' : 'Back'}</button>
    </div>
  );
}`,
        commonMistakes: "1. Switching an input from uncontrolled to controlled by starting with value={undefined}.\n2. Not resetting error states when the user corrects the input.",
        interviewQuestions: [
          {
            q: "What is the difference between Controlled and Uncontrolled components?",
            a: "In controlled components, the input's current value is held in React state with an onChange handler updating that state. In uncontrolled components, the input's value is stored natively in the browser DOM, accessed imperatively using a React ref."
          },
          {
            q: "Why does React warn 'A component is changing an uncontrolled input to be controlled'?",
            a: "This happens when an input's value prop is initially undefined or null, and later updates to a defined string value. Initialize state to '' (empty string)."
          }
        ],
        assignment: "Build a registration form with Password and Confirm Password fields, showing an error if they don't match.",
        quiz: {
          question: "Which prop must you pass to an uncontrolled input to set its initial default value?",
          options: ["value", "defaultValue", "initialText", "defaultContent"],
          answer: 1,
          explanation: "uncontrolled inputs use defaultValue to avoid locking the field as controlled."
        },
        codeTemplate: `function ControlledFormLab() {
  const [values, setValues] = React.useState({ username: '', email: '', role: 'Junior' });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const err = {};
    if (!values.username.trim()) err.username = 'Username is required';
    if (!values.email.includes('@')) err.email = 'Valid email is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) alert('Form valid! Submitted: ' + JSON.stringify(values));
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '380px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Controlled Form with Live Validation</h3>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            placeholder="Username"
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: errors.username ? '1px solid #ef4444' : '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          {errors.username && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.username}</span>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="Email"
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: errors.email ? '1px solid #ef4444' : '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          {errors.email && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.email}</span>}
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}
render(<ControlledFormLab />);`
      },
      {
        id: "m5-ui-libraries-overview",
        title: "2. UI Libraries & Component Ecosystem",
        level: "Intermediate",
        summary: "Explore modern UI libraries: Bootstrap, styled-components, React Select, Data Tables, and Chart visualizations.",
        intro: "Production web apps me har button aur dropdown scratch se nahi banate. Industry libraries jaise React-Bootstrap, React-Select, Data-Table-Component aur Chart.js development ko 10x fast kar dete hain.",
        whatIsIt: "A curated overview of popular UI packages: react-bootstrap, styled-components, react-select, react-data-table-component, and Chart.js / Recharts.",
        whyNeeded: "Enterprise dashboards demand complex features like CSV export, column reordering, multi-tag searching, and animated graphs.",
        analogy: "Jaise building banate waqt har pipe ya hardware khud nahi banate balki certified standard material use karte hain!",
        technicalExplanation: "UI libraries integrate with React via declarative props. react-data-table-component takes column definitions and handles sorting, pagination, and accessibility automatically.",
        syntax: `const columns = [
  { name: 'ID', selector: row => row.id, sortable: true },
  { name: 'Name', selector: row => row.name, sortable: true },
  { name: 'Role', selector: row => row.role }
];

<DataTable columns={columns} data={data} pagination />;`,
        codeExplanation: "columns array define karta hai headers aur sorting properties. data prop records ka array leta hai.",
        expectedOutput: "A searchable, sortable, paginated enterprise data table with clean visual styling.",
        practicalImplementation: `// Example styled-components structure:
// const Button = styled.button\`
//   background: #2563eb;
//   color: white;
//   padding: 8px 16px;
// \`;`,
        commonMistakes: "1. Importing the entire library without tree-shaking.\n2. Over-relying on heavy external frameworks for trivial components that can be built in 5 lines of CSS.",
        interviewQuestions: [
          {
            q: "What are the advantages and drawbacks of CSS-in-JS (e.g. styled-components)?",
            a: "Advantages: Scoped styling, dynamic props-based styling, dead-code elimination. Drawbacks: Runtime CSS generation overhead and larger JS bundle size."
          },
          {
            q: "How does React-Select handle asynchronous remote searching?",
            a: "It provides AsyncSelect which accepts a loadOptions promise callback that triggers an API call on debounce as the user types."
          }
        ],
        assignment: "Design a dashboard widget that displays a mock bar chart showing monthly user registrations.",
        quiz: {
          question: "Which React charting library is specifically built around SVG and declarative React components?",
          options: ["Chart.js", "Recharts", "D3 pure DOM", "Canvas2D"],
          answer: 1,
          explanation: "Recharts is a declarative charting library built natively on top of React components and SVG elements."
        },
        codeTemplate: `function DataTableSimulator() {
  const [data, setData] = React.useState([
    { id: 1, name: 'Anil Ambani', role: 'Executive', salary: 120000 },
    { id: 2, name: 'Ratan Tata', role: 'Chairman', salary: 350000 },
    { id: 3, name: 'Sudha Murty', role: 'Author & Trustee', salary: 280000 }
  ]);
  const [sortKey, setSortKey] = React.useState('name');
  const [sortAsc, setSortAsc] = React.useState(true);

  const sorted = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Sortable Data Table Simulator</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <th onClick={() => handleSort('id')} style={{ padding: '10px', cursor: 'pointer' }}>ID {sortKey === 'id' && (sortAsc ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('name')} style={{ padding: '10px', cursor: 'pointer' }}>Name {sortKey === 'name' && (sortAsc ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('role')} style={{ padding: '10px', cursor: 'pointer' }}>Role {sortKey === 'role' && (sortAsc ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('salary')} style={{ padding: '10px', cursor: 'pointer' }}>Salary {sortKey === 'salary' && (sortAsc ? '▲' : '▼')}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(row => (
            <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px' }}>#{row.id}</td>
              <td style={{ padding: '10px' }}><strong>{row.name}</strong></td>
              <td style={{ padding: '10px' }}>{row.role}</td>
              <td style={{ padding: '10px', color: '#16a34a', fontWeight: 'bold' }}>\${row.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
render(<DataTableSimulator />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Design a full form using all element types (input, multiselect, checkbox, radio, date picker)",
        instructions: "Build an exhaustive form incorporating text inputs, number, email, date picker, radio group, checkbox terms, and a multiselect tag picker.",
        solutionCode: `function ComprehensiveFormLab() {
  const [form, setForm] = React.useState({
    fullName: '',
    dob: '2000-01-01',
    gender: 'Female',
    newsletter: true,
    interests: ['React']
  });

  const toggleInterest = (val) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(val) 
        ? prev.interests.filter(i => i !== val)
        : [...prev.interests, val]
    }));
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '440px' }}>
      <h3 style={{ margin: '0 0 14px 0' }}>All-Element Form Showcase</h3>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontSize: '13px' }}>Full Name:</label>
        <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontSize: '13px' }}>Date of Birth:</label>
        <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Gender:</label>
        {['Female', 'Male', 'Non-Binary'].map(g => (
          <label key={g} style={{ marginRight: '12px', fontSize: '13px' }}>
            <input type="radio" name="gender" checked={form.gender === g} onChange={() => setForm({ ...form, gender: g })} /> {g}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Interests (Multiselect):</label>
        {['React', 'TypeScript', 'Redux', 'GraphQL'].map(tech => (
          <button key={tech} type="button" onClick={() => toggleInterest(tech)} style={{
            padding: '4px 10px', borderRadius: '999px', fontSize: '12px', marginRight: '6px', border: 'none', cursor: 'pointer',
            background: form.interests.includes(tech) ? '#2563eb' : '#e2e8f0',
            color: form.interests.includes(tech) ? '#fff' : '#1e293b'
          }}>{tech}</button>
        ))}
      </div>
      <div style={{ marginTop: '12px', padding: '10px', background: '#fff', borderRadius: '6px', fontSize: '12px', border: '1px solid #e2e8f0' }}>
        <strong>Live Preview State:</strong> {JSON.stringify(form)}
      </div>
    </div>
  );
}
render(<ComprehensiveFormLab />);`
      },
      {
        num: 2,
        title: "Exercise 2: Build a multi-step form with validation on each step",
        instructions: "Create a 3-step Wizard Form (Step 1: Account, Step 2: Profile, Step 3: Confirmation) preventing progression unless current step passes validation.",
        solutionCode: `function MultiStepWizardLab() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({ username: '', password: '', role: '', terms: false });
  const [err, setErr] = React.useState('');

  const nextStep = () => {
    if (step === 1) {
      if (!formData.username || !formData.password) { setErr('All credentials required'); return; }
    } else if (step === 2) {
      if (!formData.role) { setErr('Select your job role'); return; }
    }
    setErr('');
    setStep(s => s + 1);
  };

  return (
    <div style={{ padding: '24px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '420px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        {[1, 2, 3].map(i => (
          <span key={i} style={{
            width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: step === i ? '#2563eb' : step > i ? '#16a34a' : '#e2e8f0',
            color: step >= i ? '#fff' : '#64748b', fontWeight: 'bold'
          }}>{i}</span>
        ))}
      </div>
      {err && <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '10px' }}>{err}</div>}

      {step === 1 && (
        <div>
          <h4>Step 1: Credentials</h4>
          <input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} placeholder="Username" style={{ width: '100%', padding: '8px', marginBottom: '8px', boxSizing: 'border-box' }} />
          <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Password" style={{ width: '100%', padding: '8px', marginBottom: '8px', boxSizing: 'border-box' }} />
        </div>
      )}
      {step === 2 && (
        <div>
          <h4>Step 2: Profile</h4>
          <input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="Job Title (e.g. Architect)" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
      )}
      {step === 3 && (
        <div>
          <h4>Step 3: Confirmation</h4>
          <p>User: <strong>{formData.username}</strong></p>
          <p>Role: <strong>{formData.role}</strong></p>
          <button onClick={() => alert('Wizard complete!')} style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>Finish & Submit</button>
        </div>
      )}

      {step < 3 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <button disabled={step === 1} onClick={() => setStep(s => s - 1)} style={{ padding: '8px 14px', background: '#94a3b8', color: '#fff', border: 'none', borderRadius: '6px' }}>Back</button>
          <button onClick={nextStep} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>Next →</button>
        </div>
      )}
    </div>
  );
}
render(<MultiStepWizardLab />);`
      },
      {
        num: 3,
        title: "Exercise 3: Add/Edit a record in a Modal and display it in a Data Table",
        instructions: "Build an administrative Data Table with 'Add Record' and 'Edit' buttons that open a modal dialog to update records in state.",
        solutionCode: `function ModalCrudTableLab() {
  const [rows, setRows] = React.useState([
    { id: 1, name: 'Siddharth Rao', dept: 'DevOps' },
    { id: 2, name: 'Megha Nair', dept: 'Product' }
  ]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingRow, setEditingRow] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', dept: '' });

  const openAdd = () => {
    setEditingRow(null);
    setForm({ name: '', dept: '' });
    setIsModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingRow(row.id);
    setForm({ name: row.name, dept: row.dept });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingRow) {
      setRows(rows.map(r => r.id === editingRow ? { ...r, ...form } : r));
    } else {
      setRows([...rows, { id: Date.now(), ...form }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ margin: 0 }}>Modal Data Table Manager</h3>
        <button onClick={openAdd} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Add Member</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Department</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px' }}>{r.name}</td>
              <td style={{ padding: '10px' }}>{r.dept}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => openEdit(r)} style={{ padding: '4px 8px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
            <h4>{editingRow ? 'Edit Record' : 'Add New Record'}</h4>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" style={{ width: '100%', padding: '8px', marginBottom: '8px', boxSizing: 'border-box' }} />
            <input value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} placeholder="Dept" style={{ width: '100%', padding: '8px', marginBottom: '12px', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleSave} style={{ flex: 1, padding: '8px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px' }}>Save</button>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '8px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '4px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
render(<ModalCrudTableLab />);`
      },
      {
        num: 4,
        title: "Exercise 4: Implement Search, Filter and Sort on a Dropdown/Data Table",
        instructions: "Build comprehensive table search across multiple columns, category filtering, and bidirectional sorting.",
        solutionCode: `function SearchFilterSortLab() {
  const initial = [
    { id: 1, title: 'iPad Air M2', cat: 'Tablet', price: 599 },
    { id: 2, title: 'ThinkPad X1', cat: 'Laptop', price: 1400 },
    { id: 3, title: 'AirPods Max', cat: 'Audio', price: 549 },
    { id: 4, title: 'Dell XPS 15', cat: 'Laptop', price: 1650 }
  ];
  const [search, setSearch] = React.useState('');
  const [cat, setCat] = React.useState('All');
  const [sortField, setSortField] = React.useState('price');
  const [sortAsc, setSortAsc] = React.useState(true);

  const filtered = initial.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === 'All' || item.cat === cat;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search gadgets..." style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        <select value={cat} onChange={e => setCat(e.target.value)} style={{ padding: '8px', borderRadius: '6px' }}>
          <option>All</option><option>Laptop</option><option>Tablet</option><option>Audio</option>
        </select>
        <button onClick={() => setSortAsc(!sortAsc)} style={{ padding: '8px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>
          Sort {sortAsc ? 'Asc ⬆️' : 'Desc ⬇️'}
        </button>
      </div>
      <div style={{ display: 'grid', gap: '6px' }}>
        {filtered.map(i => (
          <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <span>{i.title} ({i.cat})</span>
            <strong>\${i.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
render(<SearchFilterSortLab />);`
      },
      {
        num: 5,
        title: "Exercise 5: Build a Modal popup, Carousel Slider, Nav & Navbar using react-bootstrap",
        instructions: "Demonstrate Bootstrap UI components: responsive Navigation header with dropdowns and an interactive Carousel slider.",
        solutionCode: `function BootstrapSuiteLab() {
  const [slide, setSlide] = React.useState(0);
  const slides = [
    { title: '⚡ Supercharged React 18', desc: 'Concurrent rendering and automatic batching.' },
    { title: '🛡️ Robust TypeScript Types', desc: 'Catch bugs at compile time with zero runtime overhead.' },
    { title: '🏪 Scalable Redux Toolkit', desc: 'Predictable state management with RTK Query.' }
  ];

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#0f172a', color: '#fff', borderRadius: '8px', marginBottom: '16px' }}>
        <div style={{ fontWeight: 'bold' }}>⚛️ Bootstrap Navbar</div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
          <span style={{ cursor: 'pointer' }}>Home</span>
          <span style={{ cursor: 'pointer' }}>Features</span>
          <span style={{ cursor: 'pointer' }}>Pricing</span>
        </div>
      </nav>
      <div style={{ padding: '30px', background: '#f1f5f9', borderRadius: '8px', textAlign: 'center', minHeight: '100px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>{slides[slide].title}</h3>
        <p style={{ color: '#64748b', fontSize: '14px' }}>{slides[slide].desc}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          <button onClick={() => setSlide(s => (s === 0 ? slides.length - 1 : s - 1))} style={{ padding: '4px 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>‹ Prev</button>
          <button onClick={() => setSlide(s => (s === slides.length - 1 ? 0 : s + 1))} style={{ padding: '4px 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>Next ›</button>
        </div>
      </div>
    </div>
  );
}
render(<BootstrapSuiteLab />);`
      },
      {
        num: 6,
        title: "Exercise 6: Build a multiselect File Upload component",
        instructions: "Build an interactive Drag-and-Drop / Multi-file upload component that lists uploaded file names, sizes, and provides removal buttons.",
        solutionCode: `function MultiFileUploadLab() {
  const [files, setFiles] = React.useState([
    { name: 'resume_v2.pdf', size: '240 KB' },
    { name: 'portfolio_screenshot.png', size: '1.2 MB' }
  ]);

  const handleFileChange = (e) => {
    const uploaded = Array.from(e.target.files).map(f => ({
      name: f.name,
      size: Math.round(f.size / 1024) + ' KB'
    }));
    setFiles(prev => [...prev, ...uploaded]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Multi-File Upload Manager</h3>
      <div style={{ border: '2px dashed #3b82f6', padding: '24px', textAlign: 'center', borderRadius: '8px', background: '#eff6ff', marginBottom: '14px' }}>
        <input type="file" multiple onChange={handleFileChange} style={{ display: 'block', margin: '0 auto' }} />
        <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#1e40af' }}>Select multiple files to add to upload queue</p>
      </div>
      <div style={{ display: 'grid', gap: '6px' }}>
        {files.map((file, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}>
            <span>📄 {file.name} <strong>({file.size})</strong></span>
            <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>✕ Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
render(<MultiFileUploadLab />);`
      },
      {
        num: 7,
        title: "Exercise 7: Render a Chart from API data",
        instructions: "Simulate API data retrieval and render a dynamic SVG/Bar Chart representation with interactive hover and responsive bars.",
        solutionCode: `function ChartDataLab() {
  const [data, setData] = React.useState([
    { month: 'Jan', revenue: 45 },
    { month: 'Feb', revenue: 60 },
    { month: 'Mar', revenue: 85 },
    { month: 'Apr', revenue: 70 },
    { month: 'May', revenue: 95 }
  ]);

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 16px 0' }}>Monthly Revenue Bar Chart</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '140px', borderBottom: '2px solid #94a3b8', paddingBottom: '4px' }}>
        {data.map(d => (
          <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>\${d.revenue}k</span>
            <div style={{
              width: '100%', height: (d.revenue * 1.2) + 'px',
              background: 'linear-gradient(to top, #2563eb, #38bdf8)',
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.3s'
            }}></div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '6px' }}>{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
render(<ChartDataLab />);`
      }
    ]
  },
  {
    id: "module-6",
    number: 6,
    title: "React Router",
    hindiTitle: "React Router (Multi-Page SPA Navigation)",
    badge: "Client-Side Routing",
    description: "Routes, Route, Link, NavLink, nested layouts, dynamic route params, protected private routes, and programmatic navigation.",
    lessons: [
      {
        id: "m6-router-foundations",
        title: "1. React Router Setup, Routes, Route, Link & NavLink",
        level: "Intermediate",
        summary: "Build Single Page Application multi-page navigation without browser reloads using React Router v6.",
        intro: "Traditional multi-page websites me har link click par browser naya page download karta hai. React Router bina page reload kiye instant client-side transitions create karta hai.",
        whatIsIt: "React Router is the standard routing library for React. It synchronizes the browser URL with the component tree using HTML5 History API (pushState, replaceState).",
        whyNeeded: "SPAs need clean shareable URLs, browser back/forward button support, and bookmarking capability while maintaining instantaneous client-side navigation speed.",
        analogy: "Jaise TV ka remote button dabane par TV switch off nahi hota balki turant agla channel display kar deta hai!",
        technicalExplanation: "React Router v6 uses a ranked matching algorithm. <Routes> checks the current window.location.pathname against its <Route path='...' element={<Comp />} /> children and renders the best matching component.",
        syntax: `import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        codeExplanation: "BrowserRouter HTML5 history API use karta hai. NavLink automatically isActive boolean pass karta hai taaki active tab ko highlight kiya ja sake.",
        expectedOutput: "Instant seamless route navigation without the browser tab reloading or flashing.",
        practicalImplementation: `import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="dashboard-grid">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}`,
        commonMistakes: "1. Using standard <a href='/about'> tags instead of <Link to='/about'>. (<a> tags force a full browser page refresh, dumping all React state in memory!).\n2. Forgetting <Outlet /> inside layout routes.",
        interviewQuestions: [
          {
            q: "What is the difference between Link and NavLink in React Router?",
            a: "Link is a standard navigation link. NavLink is a special version of Link that knows whether or not its target URL matches the current location, providing an isActive property to easily apply active CSS styles."
          },
          {
            q: "What is the role of <Outlet /> in React Router v6?",
            a: "An <Outlet /> should be used in parent route components to render their child route components, enabling nested UI layouts."
          }
        ],
        assignment: "Configure a 404 Not Found route catch-all (path='*') in React Router v6.",
        quiz: {
          question: "Which component is used inside parent routes to render nested child routes?",
          options: ["<ChildRoutes />", "<Outlet />", "<NestedView />", "<RouteHolder />"],
          answer: 1,
          explanation: "<Outlet /> acts as a placeholder where child route elements are rendered in nested layouts."
        },
        codeTemplate: `function RouterSimulator() {
  const [path, setPath] = React.useState('/dashboard');

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ background: '#1e293b', color: '#38bdf8', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Browser URL Bar: <strong>https://myapp.dev{path}</strong></span>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>HTML5 History API Active</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {['/dashboard', '/products', '/settings'].map(p => (
          <button
            key={p}
            onClick={() => setPath(p)}
            style={{
              padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              background: path === p ? '#2563eb' : '#e2e8f0',
              color: path === p ? '#fff' : '#1e293b'
            }}
          >
            {p.replace('/', '').toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
        {path === '/dashboard' && <div><h3>📊 Analytics Dashboard View</h3><p>Metrics updated real-time.</p></div>}
        {path === '/products' && <div><h3>📦 Product Inventory View</h3><p>Listing 128 active items.</p></div>}
        {path === '/settings' && <div><h3>⚙️ Application Settings</h3><p>Configure API keys and credentials.</p></div>}
      </div>
    </div>
  );
}
render(<RouterSimulator />);`
      },
      {
        id: "m6-dynamic-and-protected-routes",
        title: "2. Dynamic Route Params & Protected Private Routes (Auth Guard)",
        level: "Advanced",
        summary: "Extract URL parameters with useParams, navigate programmatically with useNavigate, and restrict unauthorized access with Protected Route guards.",
        intro: "E-commerce me /product/:id dynamic routes hote hain. Aur admin pages ko unauthorized users se protect karna hota hai.",
        whatIsIt: "Dynamic Route parameters (/product/:id) allow a single route pattern to match variable values, extracted via useParams(). Protected Routes check user authentication state and either render the requested view or redirect to /login via <Navigate to='/login' replace />.",
        whyNeeded: "Security & User Experience. Preventing unauthenticated users from seeing confidential admin screens.",
        analogy: "Protected route VIP club ke security guard jaisa hai: wristband (token) hone par hi entry milti hai!",
        technicalExplanation: "A Protected Route is typically created as a wrapper component: if isAuthenticated is true, it returns <Outlet />; if false, it returns <Navigate to='/login' replace />.",
        syntax: `// Protected Route Pattern in React Router v6
const ProtectedRoute = ({ isAuth }) => {
  const location = useLocation();
  return isAuth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

// Reading dynamic param
const { id } = useParams();
const navigate = useNavigate();`,
        codeExplanation: "useParams() object returns { id: '123' }. useNavigate() allows programmatic redirects like after login navigate('/dashboard').",
        expectedOutput: "Unauthorized visitors are seamlessly redirected to login with preserved redirect history.",
        practicalImplementation: `<Routes>
  <Route path="/login" element={<Login />} />
  <Route element={<ProtectedRoute isAuth={user !== null} />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
  </Route>
</Routes>`,
        commonMistakes: "1. Forgetting replace prop on <Navigate />, creating an infinite back-button loop.\n2. Accessing dynamic params without converting types (id === 10 fails if id is a string '10').",
        interviewQuestions: [
          {
            q: "How do you implement a Protected Route in React Router v6?",
            a: "Create a wrapper component that inspects authentication state. If authenticated, render <Outlet />; otherwise, render <Navigate to='/login' replace />."
          },
          {
            q: "What is programmatic navigation and how do you achieve it?",
            a: "Programmatic navigation is changing the URL in response to code execution (e.g. after form submission) rather than user click on a link, implemented using const navigate = useNavigate(); navigate('/target');."
          }
        ],
        assignment: "Build a simulated breadcrumb component that parses the current route pathname into clickable breadcrumb links.",
        quiz: {
          question: "Which hook is used to extract dynamic URL parameters like /user/:userId?",
          options: ["useRoute()", "useParams()", "useQuery()", "useLocationParams()"],
          answer: 1,
          explanation: "useParams() returns an object of key/value pairs of URL parameters from the current URL matched by the <Route path>."
        },
        codeTemplate: `function ProtectedRouteLab() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState('/profile');

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ margin: 0 }}>Protected Route Simulator</h3>
        <button
          onClick={() => setIsAuth(!isAuth)}
          style={{ padding: '6px 12px', background: isAuth ? '#ef4444' : '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          {isAuth ? 'Log Out' : 'Authenticate (Log In)'}
        </button>
      </div>
      <div style={{ padding: '16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
        <p>Attempting to view: <code>{currentRoute}</code></p>
        {isAuth ? (
          <div style={{ padding: '12px', background: '#dcfce7', color: '#15803d', borderRadius: '6px' }}>
            🛡️ <strong>Access Granted:</strong> Welcome to your secret user profile dashboard.
          </div>
        ) : (
          <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px' }}>
            🔒 <strong>401 Unauthorized:</strong> Redirected to <code>/login</code> by Protected Route Guard!
          </div>
        )}
      </div>
    </div>
  );
}
render(<ProtectedRouteLab />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Set up multi-page routing with a shared layout (Header/Sidebar/Footer)",
        instructions: "Build a responsive master layout featuring Header, dynamic Sidebar navigation, and persistent Footer wrapping multiple pages.",
        solutionCode: `function MultiPageLayoutLab() {
  const [view, setView] = React.useState('home');
  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden' }}>
      <header style={{ padding: '12px 20px', background: '#0f172a', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
        <strong>Enterprise Portal</strong>
        <span>Logged in as Admin</span>
      </header>
      <div style={{ display: 'flex', minHeight: '160px' }}>
        <aside style={{ width: '160px', background: '#f1f5f9', padding: '12px', borderRight: '1px solid #e2e8f0' }}>
          {['home', 'billing', 'security'].map(v => (
            <div key={v} onClick={() => setView(v)} style={{
              padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', marginBottom: '4px',
              background: view === v ? '#2563eb' : 'transparent',
              color: view === v ? '#fff' : '#1e293b'
            }}>{v.toUpperCase()}</div>
          ))}
        </aside>
        <main style={{ flex: 1, padding: '20px', background: '#fff' }}>
          {view === 'home' && <h4>Welcome Home (Shared Layout active)</h4>}
          {view === 'billing' && <h4>Invoices & Subscriptions</h4>}
          {view === 'security' && <h4>Security Keys & 2FA Settings</h4>}
        </main>
      </div>
      <footer style={{ padding: '8px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b' }}>
        © 2026 Enterprise React Portal. All rights reserved.
      </footer>
    </div>
  );
}
render(<MultiPageLayoutLab />);`
      },
      {
        num: 2,
        title: "Exercise 2: Create a dynamic route (e.g., /product/:id) and read the param",
        instructions: "Simulate dynamic parameter reading where clicking any product card displays a dedicated detail view with that specific product ID.",
        solutionCode: `function DynamicRouteLab() {
  const [activeParam, setActiveParam] = React.useState('prod_99');
  const products = [
    { id: 'prod_99', name: 'Logitech MX Master 3S', desc: 'Precision ergonomic wireless mouse' },
    { id: 'prod_100', name: 'Keychron Q1 Pro', desc: 'Custom mechanical keyboard' }
  ];

  const current = products.find(p => p.id === activeParam);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {products.map(p => (
          <button key={p.id} onClick={() => setActiveParam(p.id)} style={{
            padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
            background: activeParam === p.id ? '#2563eb' : '#e2e8f0',
            color: activeParam === p.id ? '#fff' : '#1e293b'
          }}>/product/{p.id}</button>
        ))}
      </div>
      <div style={{ padding: '16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
        <span style={{ fontSize: '12px', color: '#64748b' }}>useParams() Result: <code>{JSON.stringify({ id: activeParam })}</code></span>
        <h3>{current.name}</h3>
        <p style={{ color: '#475569' }}>{current.desc}</p>
      </div>
    </div>
  );
}
render(<DynamicRouteLab />);`
      },
      {
        num: 3,
        title: "Exercise 3: Build a Protected Route that redirects unauthenticated users to Login",
        instructions: "Demonstrate complete login gatekeeper flow: user attempts to visit /admin, gets blocked, logs in, and gets redirected back seamlessly.",
        solutionCode: `function ProtectedRedirectLab() {
  const [token, setToken] = React.useState(null);
  const [route, setRoute] = React.useState('/admin');

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span>Current Auth Token: <strong>{token ? 'Bearer jwt_883...' : 'None (Guest)'}</strong></span>
        {token ? (
          <button onClick={() => setToken(null)} style={{ padding: '4px 10px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px' }}>Logout</button>
        ) : (
          <button onClick={() => setToken('mock_token')} style={{ padding: '4px 10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px' }}>Log In</button>
        )}
      </div>
      <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        {token ? (
          <div>
            <h4 style={{ color: '#16a34a', margin: '0 0 6px 0' }}>✅ Private /admin Dashboard Access Granted</h4>
            <p style={{ margin: 0, fontSize: '13px' }}>Welcome! You have root administration privileges.</p>
          </div>
        ) : (
          <div>
            <h4 style={{ color: '#dc2626', margin: '0 0 6px 0' }}>⛔ Protected Route Guard Triggered</h4>
            <p style={{ margin: 0, fontSize: '13px' }}>Unauthenticated users are blocked and redirected to /login with state={{ from: '/admin' }}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
render(<ProtectedRedirectLab />);`
      }
    ]
  }
];
