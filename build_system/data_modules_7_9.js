/**
 * Modules 7, 8, and 9 Curriculum Data for ReactMastery
 * PART 7: API Integration & Asynchronous Data (4 Exercises + API Product System)
 * PART 8: Redux State Management - Classic & Toolkit (11 Exercises + E-commerce App)
 * PART 9: Authentication, Authorization & Payments (3 Exercises)
 */

module.exports = [
  {
    id: "module-7",
    number: 7,
    title: "API Integration & Asynchronous Data",
    hindiTitle: "API Integration, Asynchronous Data, Firebase & React Query",
    badge: "Async & Server State",
    description: "Promises, async/await, Fetch API vs Axios, Firebase CRUD, and modern server-state caching with React Query & SWR.",
    lessons: [
      {
        id: "m7-fetch-axios-async",
        title: "1. Promises, async/await, Fetch API vs Axios & Loading States",
        level: "Intermediate",
        summary: "Master asynchronous JavaScript, network requests, HTTP headers, loading/error states, and why Axios is preferred in enterprise teams.",
        intro: "Modern React apps server se data fetch kiye bina adhuri hain. REST APIs ko call karne ke liye hum Fetch API ya Axios ka use karte hain.",
        whatIsIt: "A Promise represents the eventual completion of an asynchronous operation. async/await is syntactic sugar over promises. fetch() is browser-native; axios is an isomorphic HTTP client with automatic JSON parsing and interceptors.",
        whyNeeded: "Network calls take time (50ms - 2000ms). UI must gracefully display Loading skeletons and prevent app crashes while data travels across the network.",
        analogy: "Restaurant me waiter ko order dena ek asynchronous API call jaisa hai: waiter kitchen jata hai (Pending), dish aati hai (Resolved), ya stock khatam hone par error milti hai (Rejected)!",
        technicalExplanation: "The native fetch() API does NOT reject on HTTP 404 or 500 status codes (it only rejects on network failure or DNS timeout). Axios automatically rejects on 4xx/5xx HTTP errors, parses JSON automatically without response.json(), and supports Request/Response Interceptors.",
        syntax: `// Axios vs Fetch
// 1. Fetch API
const res = await fetch('/api/users');
if (!res.ok) throw new Error('HTTP error ' + res.status);
const data = await res.json();

// 2. Axios
const { data } = await axios.get('/api/users');`,
        codeExplanation: "Axios single-step me response data deta hai aur JSON parsing khud handle karta hai. Error handling Axios me standard try/catch se 4xx/5xx code directly catch karti hai.",
        expectedOutput: "Clean API consumption flow: isLoading -> true -> (Fetch) -> data received -> isLoading -> false.",
        practicalImplementation: `function DataFetcher() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
          signal: controller.signal
        });
        if (!res.ok) throw new Error('Failed to load data');
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);
}`,
        commonMistakes: "1. Forgetting to handle race conditions or memory leaks when component unmounts before fetch completes (solve with AbortController).\n2. Expecting native fetch to catch 404 errors in the .catch() block.",
        interviewQuestions: [
          {
            q: "Why doesn't the native browser fetch() reject on 404 or 500 HTTP errors?",
            a: "Native fetch only rejects a promise if there is a network breakdown. An HTTP 404 or 500 is still considered a completed HTTP transaction, so you must explicitly check response.ok."
          },
          {
            q: "What is an Axios Interceptor and what are its main use cases?",
            a: "Interceptors intercept requests or responses before they are handled by .then() or .catch(). Primary use case: automatically injecting JWT Authorization: Bearer tokens into outgoing requests."
          }
        ],
        assignment: "Write an Axios request interceptor that adds a custom header X-Client-Version: 2.0 to every outgoing request.",
        quiz: {
          question: "What is the primary difference between Fetch and Axios regarding JSON parsing?",
          options: ["Fetch parses JSON automatically; Axios needs JSON.parse()", "Axios automatically transforms JSON data; Fetch requires response.json()", "Neither supports JSON", "Axios only supports XML"],
          answer: 1,
          explanation: "Axios automatically parses JSON into res.data, while native fetch requires an explicit await res.json() step."
        },
        codeTemplate: `function ApiFetchSimulator() {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Leanne Graham', email: 'sincere@april.biz', company: 'Romaguera-Crona' },
    { id: 2, name: 'Ervin Howell', email: 'shanna@melissa.tv', company: 'Deckow-Crist' },
    { id: 3, name: 'Clementine Bauch', email: 'nathan@yesenia.net', company: 'Romaguera-Jacobson' }
  ]);
  const [loading, setLoading] = React.useState(false);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Fetched 3 users successfully via simulated API call');
    }, 800);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ margin: 0 }}>API Data Table Integration</h3>
        <button onClick={refetch} disabled={loading} style={{ padding: '6px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          {loading ? 'Fetching...' : '🔄 Refresh API Data'}
        </button>
      </div>
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Loading records from remote server...</div>
      ) : (
        <div style={{ display: 'grid', gap: '8px' }}>
          {users.map(u => (
            <div key={u.id} style={{ padding: '10px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>{u.name}</strong> <small style={{ color: '#64748b' }}>({u.email})</small></div>
              <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px' }}>{u.company}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
render(<ApiFetchSimulator />);`
      },
      {
        id: "m7-firebase-and-react-query",
        title: "2. Firebase CRUD & Modern Data Fetching (React Query / SWR)",
        level: "Advanced",
        summary: "Understand cloud database CRUD with Firebase and modern server-state caching, deduplication, and background refetching with React Query (TanStack Query) and SWR.",
        intro: "Traditional useEffect me data fetch karna repetitive hota hai. React Query (TanStack Query) aur SWR server-state management me industry standards ban chuke hain.",
        whatIsIt: "React Query / SWR manage Server State. They automatically handle background caching, automatic cache invalidation, deduplication, retry on failure, and window focus refetching.",
        whyNeeded: "With plain useEffect, if three components request /api/user, the browser makes three separate HTTP calls. React Query deduplicates them into one request, caches the result, and shares it.",
        analogy: "Jaise WhatsApp kholte hi purane messages cache se turant dikhte hain aur background me new messages sync hote hain bina wait karaye (Stale-While-Revalidate)!",
        technicalExplanation: "The stale-while-revalidate strategy serves cached data immediately (stale), fetches fresh data in the background (revalidate), and updates the UI seamlessly without a full-screen loading spinner.",
        syntax: `// Modern React Query (TanStack Query)
import { useQuery } from '@tanstack/react-query';

function ProductList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });
}`,
        codeExplanation: "queryKey: ['products'] acts as cache key. As long as staleTime is valid, subsequent visits render instantly from cache with zero network lag.",
        expectedOutput: "Instantaneous zero-latency screen transitions powered by smart caching.",
        practicalImplementation: `// Firebase CRUD syntax:
// const db = getDatabase();
// set(ref(db, 'users/' + userId), { name: 'Rohan', email: 'rohan@gmail.com' });`,
        commonMistakes: "1. Using global Redux store to hold server API data when React Query handles caching automatically.\n2. Inconsistent queryKey formats leading to cache invalidation misses.",
        interviewQuestions: [
          {
            q: "What is the difference between Client State and Server State?",
            a: "Client State is ephemeral UI state owned 100% by browser (modals, forms). Server State is persisted on remote servers, asynchronous, and requires fetching, caching, and invalidation."
          },
          {
            q: "What is 'staleTime' vs 'gcTime' in React Query?",
            a: "staleTime defines how long fetched data is considered fresh before needing background revalidation. gcTime defines how long inactive cached data remains in memory."
          }
        ],
        assignment: "Write a mock useQuery custom hook that implements data, loading, and an automatic 10-second background polling interval.",
        quiz: {
          question: "What does the SWR acronym stand for in data fetching?",
          options: ["Single Web Request", "Stale-While-Revalidate", "Synchronous Web Routing", "Server-Wide Redux"],
          answer: 1,
          explanation: "SWR stands for Stale-While-Revalidate, a cache invalidation strategy popularized by HTTP RFC 5861."
        },
        codeTemplate: `function StaleWhileRevalidateLab() {
  const [cache, setCache] = React.useState({ count: 42, timestamp: '12:00:00 PM' });
  const [isRevalidating, setIsRevalidating] = React.useState(false);

  const triggerRevalidate = () => {
    setIsRevalidating(true);
    setTimeout(() => {
      setCache({
        count: Math.floor(Math.random() * 900) + 100,
        timestamp: new Date().toLocaleTimeString()
      });
      setIsRevalidating(false);
    }, 1200);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>SWR / React Query Cache Simulator</h3>
      <div style={{ padding: '14px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '12px' }}>
        <div>Active Server State: <strong style={{ color: '#2563eb', fontSize: '18px' }}>{cache.count} active users</strong></div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Last Revalidated: {cache.timestamp}</div>
      </div>
      <button onClick={triggerRevalidate} disabled={isRevalidating} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        {isRevalidating ? '🔄 Background Revalidating...' : 'Trigger SWR Revalidation'}
      </button>
      {isRevalidating && (
        <p style={{ fontSize: '12px', color: '#0284c7', marginTop: '8px' }}>
          Notice: Screen remains visible with previous data while fresh data is fetched in background!
        </p>
      )}
    </div>
  );
}
render(<StaleWhileRevalidateLab />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Fetch data using both Fetch API and Axios, compare error handling",
        instructions: "Build side-by-side fetching modules comparing how native fetch vs Axios handle a deliberate 404 error response.",
        solutionCode: `function FetchVsAxiosLab() {
  const [fetchLog, setFetchLog] = React.useState('');
  const [axiosLog, setAxiosLog] = React.useState('');

  const testFetch = async () => {
    setFetchLog('Calling fetch...');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/invalid-url-404');
      if (!res.ok) {
        setFetchLog("Fetch caught manually via !res.ok: HTTP " + res.status);
      } else {
        setFetchLog('Success');
      }
    } catch (e) {
      setFetchLog('Fetch error: ' + e.message);
    }
  };

  const testAxios = () => {
    setAxiosLog('Calling simulated Axios...');
    setTimeout(() => {
      setAxiosLog('Axios automatically rejected into catch() block: Request failed with status code 404');
    }, 400);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
      <div style={{ padding: '16px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
        <h4>Native Fetch API</h4>
        <button onClick={testFetch} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>Test Fetch 404</button>
        <p style={{ fontSize: '12px', color: '#1e40af', marginTop: '8px' }}>{fetchLog || 'Click to test'}</p>
      </div>
      <div style={{ padding: '16px', background: '#fdf2f8', borderRadius: '8px', border: '1px solid #fbcfe8' }}>
        <h4>Axios Client</h4>
        <button onClick={testAxios} style={{ padding: '6px 12px', background: '#db2777', color: '#fff', border: 'none', borderRadius: '4px' }}>Test Axios 404</button>
        <p style={{ fontSize: '12px', color: '#9d174d', marginTop: '8px' }}>{axiosLog || 'Click to test'}</p>
      </div>
    </div>
  );
}
render(<FetchVsAxiosLab />);`
      },
      {
        num: 2,
        title: "Exercise 2: Build full CRUD against Firebase (Get/Write/Update/Remove)",
        instructions: "Implement full client CRUD simulation mirroring Firebase Realtime Database methods (set, get, update, remove) with persistent state.",
        solutionCode: `function FirebaseCrudLab() {
  const [db, setDb] = React.useState([
    { key: 'user_1', name: 'Kabir Das', score: 92 },
    { key: 'user_2', name: 'Mira Bai', score: 98 }
  ]);
  const [inputName, setInputName] = React.useState('');

  const writeRecord = () => {
    if (!inputName) return;
    const newKey = 'user_' + Date.now();
    setDb([...db, { key: newKey, name: inputName, score: 75 }]);
    setInputName('');
  };

  const updateScore = (key) => {
    setDb(db.map(item => item.key === key ? { ...item, score: item.score + 5 } : item));
  };

  const removeRecord = (key) => {
    setDb(db.filter(item => item.key !== key));
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Firebase Realtime CRUD Simulator</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <input value={inputName} onChange={e => setInputName(e.target.value)} placeholder="New record name..." style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        <button onClick={writeRecord} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>set() Write</button>
      </div>
      <div style={{ display: 'grid', gap: '6px' }}>
        {db.map(row => (
          <div key={row.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <span><strong>{row.name}</strong> (Score: {row.score})</span>
            <div>
              <button onClick={() => updateScore(row.key)} style={{ padding: '4px 8px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', marginRight: '6px' }}>update()</button>
              <button onClick={() => removeRecord(row.key)} style={{ padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px' }}>remove()</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
render(<FirebaseCrudLab />);`
      },
      {
        num: 3,
        title: "Exercise 3: Integrate an API and display results in a Data Table with loading/error states",
        instructions: "Demonstrate complete API data fetching with realistic loading skeletons, successful table presentation, and error recovery.",
        solutionCode: `function ApiDataTableLab() {
  const [records, setRecords] = React.useState([
    { id: 101, title: 'Serverless Architecture Pattern', status: 'Published' },
    { id: 102, title: 'React 18 Concurrent Features', status: 'Draft' },
    { id: 103, title: 'Micro-frontends with Module Federation', status: 'Published' }
  ]);
  const [loading, setLoading] = React.useState(false);

  const reloadData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ margin: 0 }}>Remote Articles API Table</h3>
        <button onClick={reloadData} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>Reload</button>
      </div>
      {loading ? (
        <div style={{ padding: '30px', textAlign: 'center', color: '#2563eb' }}>
          ⏳ Loading API Data Table records...
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Article ID</th>
              <th style={{ padding: '8px' }}>Title</th>
              <th style={{ padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px' }}>#{r.id}</td>
                <td style={{ padding: '8px' }}>{r.title}</td>
                <td style={{ padding: '8px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', background: r.status === 'Published' ? '#dcfce7' : '#fef3c7', color: r.status === 'Published' ? '#166534' : '#92400e' }}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
render(<ApiDataTableLab />);`
      },
      {
        num: 4,
        title: "Exercise 4: Rebuild one API screen using React Query or SWR and compare with plain useEffect",
        instructions: "Demonstrate the dramatic reduction in boilerplate by comparing traditional useEffect (15 lines) vs SWR / React Query (1 line hook call).",
        solutionCode: `function QueryComparisonLab() {
  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Code Comparison: Plain useEffect vs React Query</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#dc2626', margin: '0 0 6px 0' }}>Plain useEffect (15 lines)</h4>
          <pre style={{ fontSize: '11px', background: '#0f172a', color: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
// Manual state, loading, error, cleanup, race conditions
const [data, setData] = useState();
const [loading, setLoading] = useState(true);
useEffect(() => { ... }, []);
          </pre>
        </div>
        <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#16a34a', margin: '0 0 6px 0' }}>TanStack Query (2 lines)</h4>
          <pre style={{ fontSize: '11px', background: '#0f172a', color: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
// Automatic deduplication, caching & retry
const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => axios.get('/api')
});
          </pre>
        </div>
      </div>
    </div>
  );
}
render(<QueryComparisonLab />);`
      }
    ]
  },
  {
    id: "module-8",
    number: 8,
    title: "Redux State Management",
    hindiTitle: "Redux State Management (Classic Redux Se Redux Toolkit & RTK Query)",
    badge: "Global State Master",
    description: "Store, Reducers, Actions, Dispatch, useSelector, useDispatch, Redux Thunk, Redux Toolkit createSlice, configureStore, and RTK Query.",
    lessons: [
      {
        id: "m8-classic-redux",
        title: "1. Classic Redux: Store, Reducers, Actions, Dispatch & Redux Thunk",
        level: "Intermediate",
        summary: "Understand unidirectional Redux flow, pure reducers, immutable state trees, action creators, and async thunk middleware.",
        intro: "Badi enterprise web applications me 50+ screens ke beech global data share karne ke liye Redux sabse trusted solution hai.",
        whatIsIt: "Redux is a predictable state container for JavaScript apps based on 3 core principles: 1. Single source of truth. 2. State is read-only. 3. Changes are made with pure functions (Reducers).",
        whyNeeded: "Complex applications me jab ek hi shopping cart ya user session ko 10 alag components se modify karna ho, to Redux full predictability provide karta hai.",
        analogy: "Redux ek Bank ke cash transaction jaisa hai: aap direct locker me haath nahi daal sakte. Deposit slip (Action) cashier (Dispatcher) ko dete hain, wo ledger (Reducer) me entry karta hai!",
        technicalExplanation: "Unidirectional data flow: Component dispatches an Action -> Middleware intercepts -> Action reaches Root Reducer -> Reducer returns a brand-new state copy -> Subscribed components re-render.",
        syntax: `// Classic Action & Reducer
const ADD_COUNT = 'counter/add';
const addCount = (amount) => ({ type: ADD_COUNT, payload: amount });

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case ADD_COUNT:
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
}`,
        codeExplanation: "Action ek plain JavaScript object hota hai jisme mandatory type property hoti hai. Reducer current state aur action lekar new state return karta hai.",
        expectedOutput: "Centralized, deterministic state management with 100% auditable history.",
        practicalImplementation: `import { useSelector, useDispatch } from 'react-redux';

function CartCount() {
  const count = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch({ type: 'cart/clear' })}>
      Items in Cart: {count}
    </button>
  );
}`,
        commonMistakes: "1. Directly modifying state in a reducer: state.items.push(item).\n2. Performing side-effects inside a reducer. Reducers must remain 100% pure.",
        interviewQuestions: [
          {
            q: "What are the Three Principles of Redux?",
            a: "1. Single source of truth. 2. State is read-only. 3. Changes are made with pure functions."
          },
          {
            q: "What is Redux Thunk and why is it needed?",
            a: "Redux Thunk is a middleware that allows dispatching functions instead of objects, enabling asynchronous logic like fetching an API before dispatching success actions."
          }
        ],
        assignment: "Write a classic Redux reducer for a bank account with deposit and withdraw actions.",
        quiz: {
          question: "Which of the following operations is FORBIDDEN inside a Redux reducer?",
          options: ["Returning a new object", "Calling Math.random() or an API fetch", "Checking action.type in a switch", "Reading action.payload"],
          answer: 1,
          explanation: "Reducers must be strictly pure functions with zero side effects: no API calls, no random numbers, no DOM mutations."
        },
        codeTemplate: `function ReduxStoreSimulator() {
  const [state, setState] = React.useState({ balance: 5000, transactions: [] });

  const dispatch = (action) => {
    switch(action.type) {
      case 'DEPOSIT':
        setState(s => ({
          balance: s.balance + action.amount,
          transactions: ["Deposit: +$" + action.amount, ...s.transactions.slice(0, 3)]
        }));
        break;
      case 'WITHDRAW':
        if (state.balance < action.amount) {
          alert('Insufficient Funds!');
          return;
        }
        setState(s => ({
          balance: s.balance - action.amount,
          transactions: ["Withdraw: -$" + action.amount, ...s.transactions.slice(0, 3)]
        }));
        break;
      default: break;
    }
  };

  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#38bdf8' }}>Classic Redux Bank Vault</h3>
      <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4ade80', marginBottom: '14px' }}>
        Balance: \${state.balance.toLocaleString()}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <button onClick={() => dispatch({ type: 'DEPOSIT', amount: 500 })} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Dispatch Deposit ($500)
        </button>
        <button onClick={() => dispatch({ type: 'WITHDRAW', amount: 200 })} style={{ padding: '8px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Dispatch Withdraw ($200)
        </button>
      </div>
      <div style={{ background: '#1e293b', padding: '10px', borderRadius: '6px', fontSize: '13px' }}>
        <strong>Audited Transaction Log:</strong>
        {state.transactions.map((t, i) => <div key={i} style={{ color: '#94a3b8' }}>• {t}</div>)}
      </div>
    </div>
  );
}
render(<ReduxStoreSimulator />);`
      },
      {
        id: "m8-redux-toolkit-rtk",
        title: "2. Redux Toolkit (createSlice, configureStore, createAsyncThunk, RTK Query)",
        level: "Advanced",
        summary: "Build modern enterprise state stores with Redux Toolkit (RTK), Immer mutative syntax, async thunks, and RTK Query API caching.",
        intro: "Classic Redux bohot jyada boilerplate mangta tha. Redux Toolkit (RTK) standard ban chuka hai jo code ko 70% chota aur asaan bana deta hai.",
        whatIsIt: "Redux Toolkit is the official toolset for efficient Redux development. It includes createSlice, configureStore, createAsyncThunk, and RTK Query.",
        whyNeeded: "RTK eliminates accidental state mutation bugs via Immer, includes Redux Thunk and DevTools out of the box, and requires zero manual action type constants.",
        analogy: "Classic Redux hath se bricks jod kar diwar banane jaisa tha. RTK pre-fabricated concrete blocks jaisa hai jo turant assemble ho jata hai!",
        technicalExplanation: "Under the hood, createSlice uses Immer. Inside reducer methods, you can write 'mutating' code like state.todos.push(). Immer intercepts changes with JS Proxies and creates an immutable copy.",
        syntax: `import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    addByAmount: (state, action) => { state.value += action.payload; }
  }
});

export const { increment, addByAmount } = counterSlice.actions;
export const store = configureStore({ reducer: { counter: counterSlice.reducer } });`,
        codeExplanation: "createSlice automatically generates action creators (increment()) and action types. configureStore sets up DevTools and Thunk enabled automatically.",
        expectedOutput: "Sleek, powerful global state without boilerplate.",
        practicalImplementation: `import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await fetch('/api/users');
  return response.json();
});`,
        commonMistakes: "1. Writing both mutating code AND returning a new state in an Immer reducer.\n2. Creating multiple Redux stores. Always have only ONE configureStore call per application.",
        interviewQuestions: [
          {
            q: "How does Redux Toolkit allow writing 'mutating' logic safely inside createSlice?",
            a: "Redux Toolkit uses Immer internally. When you write state.value++, Immer wraps the state in a Proxy and produces a brand-new immutable copy behind the scenes."
          },
          {
            q: "What are the three promise lifecycles generated by createAsyncThunk?",
            a: "1. pending (dispatched when async call starts). 2. fulfilled (dispatched on resolve). 3. rejected (dispatched on error)."
          }
        ],
        assignment: "Build a Redux Toolkit slice for managing an E-commerce Shopping Cart with addToCart, removeFromCart, and updateQuantity reducers.",
        quiz: {
          question: "Which library enables Redux Toolkit reducers to write 'mutative' code safely?",
          options: ["Lodash", "Immer", "Reselect", "Ramda"],
          answer: 1,
          explanation: "Immer uses JavaScript Proxies to record mutations and produce completely immutable state snapshots behind the scenes."
        },
        codeTemplate: `function RTKSimulator() {
  const [state, setState] = React.useState({
    cart: [
      { id: 1, title: 'Mechanical Keyboard', qty: 1, price: 89 },
      { id: 2, title: 'USB-C Dock', qty: 2, price: 45 }
    ]
  });

  const updateQty = (id, delta) => {
    setState(prev => ({
      cart: prev.cart.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    }));
  };

  const removeItem = (id) => {
    setState(prev => ({ cart: prev.cart.filter(item => item.id !== id) }));
  };

  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Redux Toolkit Shopping Cart Slice</h3>
      <div style={{ display: 'grid', gap: '8px' }}>
        {state.cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <div>
              <strong>{item.title}</strong> (\${item.price} ea)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => updateQty(item.id, -1)} style={{ padding: '2px 8px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
              <span>Qty: <strong>{item.qty}</strong></span>
              <button onClick={() => updateQty(item.id, 1)} style={{ padding: '2px 8px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
              <button onClick={() => removeItem(item.id)} style={{ padding: '4px 8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '6px' }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', padding: '12px', background: '#dbeafe', color: '#1e40af', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
        <span>Total Items: {state.cart.reduce((s, i) => s + i.qty, 0)}</span>
        <span>Cart Grand Total: \${totalPrice}</span>
      </div>
    </div>
  );
}
render(<RTKSimulator />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Build a To-Do List using classic Redux (store/reducers/actions)",
        instructions: "Implement a classic Redux todo list with explicit action creators, immutable switch-case reducer, and filter controls.",
        solutionCode: `function ClassicReduxTodoLab() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn Redux Actions', done: true },
    { id: 2, text: 'Master Pure Reducers', done: false }
  ]);
  const [text, setText] = React.useState('');

  const dispatch = (action) => {
    switch(action.type) {
      case 'ADD':
        setTodos([...todos, { id: Date.now(), text: action.payload, done: false }]);
        break;
      case 'TOGGLE':
        setTodos(todos.map(t => t.id === action.id ? { ...t, done: !t.done } : t));
        break;
      default: break;
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Classic Redux Todo Architecture</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Task..." style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        <button onClick={() => { if(text) { dispatch({ type: 'ADD', payload: text }); setText(''); } }} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>Dispatch ADD</button>
      </div>
      <div style={{ display: 'grid', gap: '6px' }}>
        {todos.map(t => (
          <div key={t.id} onClick={() => dispatch({ type: 'TOGGLE', id: t.id })} style={{
            padding: '10px', background: t.done ? '#f1f5f9' : '#fff', border: '1px solid #e2e8f0',
            borderRadius: '6px', cursor: 'pointer', textDecoration: t.done ? 'line-through' : 'none'
          }}>
            {t.done ? '✅ ' : '⭕ '} {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
render(<ClassicReduxTodoLab />);`
      },
      {
        num: 2,
        title: "Exercise 2: Rebuild the same To-Do List using Redux Toolkit's createSlice",
        instructions: "Rebuild the previous todo application using createSlice syntax demonstrating Immer direct array push and filter.",
        solutionCode: `function RTKTodoLab() {
  const [todos, setTodos] = React.useState([
    { id: 1, title: 'Built with createSlice', completed: false }
  ]);
  const [val, setVal] = React.useState('');

  const addTodoSlice = () => {
    if (!val) return;
    setTodos(prev => [...prev, { id: Date.now(), title: val, completed: false }]);
    setVal('');
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#16a34a' }}>RTK createSlice Todo System</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <input value={val} onChange={e => setVal(e.target.value)} placeholder="RTK Task..." style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        <button onClick={addTodoSlice} style={{ padding: '8px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>Slice.actions.add()</button>
      </div>
      {todos.map(t => (
        <div key={t.id} style={{ padding: '10px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginBottom: '6px' }}>
          ⚡ {t.title}
        </div>
      ))}
    </div>
  );
}
render(<RTKTodoLab />);`
      },
      {
        num: 3,
        title: "Exercise 3: Build a Calculator using Redux",
        instructions: "Design a calculator engine managed strictly by a Redux reducer handling operations: ADD, SUBTRACT, MULTIPLY, DIVIDE, and CLEAR.",
        solutionCode: `function ReduxCalculatorLab() {
  const [display, setDisplay] = React.useState('0');
  const [prev, setPrev] = React.useState(null);
  const [op, setOp] = React.useState(null);

  const handleDigit = (d) => {
    setDisplay(cur => cur === '0' ? String(d) : cur + d);
  };

  const handleOp = (nextOp) => {
    setPrev(Number(display));
    setOp(nextOp);
    setDisplay('0');
  };

  const compute = () => {
    const current = Number(display);
    let result = 0;
    if (op === '+') result = prev + current;
    if (op === '-') result = prev - current;
    if (op === '×') result = prev * current;
    if (op === '÷') result = current !== 0 ? prev / current : 'Error';
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
  };

  return (
    <div style={{ maxWidth: '280px', margin: '0 auto', padding: '16px', background: '#0f172a', borderRadius: '12px' }}>
      <div style={{ background: '#1e293b', color: '#4ade80', fontSize: '28px', textAlign: 'right', padding: '12px', borderRadius: '8px', marginBottom: '12px', fontFamily: 'monospace' }}>
        {display}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {['7','8','9','÷','4','5','6','×','1','2','3','-','C','0','=','+'].map(btn => (
          <button key={btn} onClick={() => {
            if (btn === 'C') { setDisplay('0'); setPrev(null); setOp(null); }
            else if (btn === '=') compute();
            else if (['+','-','×','÷'].includes(btn)) handleOp(btn);
            else handleDigit(btn);
          }} style={{
            padding: '14px', fontSize: '16px', borderRadius: '6px', border: 'none',
            background: btn === '=' ? '#16a34a' : ['+','-','×','÷'].includes(btn) ? '#2563eb' : btn === 'C' ? '#dc2626' : '#334155',
            color: '#fff', cursor: 'pointer'
          }}>{btn}</button>
        ))}
      </div>
    </div>
  );
}
render(<ReduxCalculatorLab />);`
      },
      {
        num: 4,
        title: "Exercise 4: Create a local JSON file as a mock API and display data in a Data Table via Redux",
        instructions: "Demonstrate dispatching an asynchronous fetch action to read mock API data and storing it into the Redux state tree for Data Table rendering.",
        solutionCode: `function ReduxMockApiTableLab() {
  const [state, setState] = React.useState({ loading: false, data: [] });

  const fetchMockJson = () => {
    setState({ loading: true, data: [] });
    setTimeout(() => {
      setState({
        loading: false,
        data: [
          { id: 'usr_1', name: 'Kabir Verma', dept: 'AI Lab', active: true },
          { id: 'usr_2', name: 'Zoya Akhtar', dept: 'Media', active: true }
        ]
      });
    }, 600);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3>Redux Mock JSON Data Table</h3>
        <button onClick={fetchMockJson} style={{ padding: '6px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>Dispatch Fetch Mock API</button>
      </div>
      {state.loading ? <div>Loading JSON into Redux state...</div> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f1f5f9', textAlign: 'left' }}><th style={{ padding: '8px' }}>User</th><th style={{ padding: '8px' }}>Dept</th></tr></thead>
          <tbody>
            {state.data.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px' }}>{d.name}</td><td style={{ padding: '8px' }}>{d.dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
render(<ReduxMockApiTableLab />);`
      },
      {
        num: 5,
        title: "Exercise 5: Integrate a real API and display a list, managed through Redux",
        instructions: "Wire real asynchronous network queries directly through Redux actions, managing loading, success, and error states.",
        solutionCode: `function ReduxLiveApiLab() {
  const [posts, setPosts] = React.useState([]);
  const [status, setStatus] = React.useState('idle');

  const loadLivePosts = async () => {
    setStatus('loading');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
      const data = await res.json();
      setPosts(data);
      setStatus('succeeded');
    } catch (e) {
      setStatus('failed');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ margin: 0 }}>Redux Live API Stream</h3>
        <button onClick={loadLivePosts} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>Dispatch Live Fetch</button>
      </div>
      <p>Redux State Status: <strong>{status.toUpperCase()}</strong></p>
      {posts.map(p => (
        <div key={p.id} style={{ padding: '10px', background: '#fff', borderRadius: '6px', marginBottom: '6px', border: '1px solid #e2e8f0' }}>
          <strong>#{p.id}: {p.title}</strong>
        </div>
      ))}
    </div>
  );
}
render(<ReduxLiveApiLab />);`
      },
      {
        num: 6,
        title: "Exercise 6: Render a Chart using data stored in Redux",
        instructions: "Connect an interactive charting dashboard to Redux state, updating the visual chart in real-time when new data points are dispatched.",
        solutionCode: `function ReduxChartLab() {
  const [metrics, setMetrics] = React.useState([
    { label: 'Q1', value: 35 }, { label: 'Q2', value: 55 }, { label: 'Q3', value: 80 }
  ]);

  const addMetric = () => {
    const nextQ = 'Q' + (metrics.length + 1);
    const randomVal = Math.floor(Math.random() * 60) + 30;
    setMetrics([...metrics, { label: nextQ, value: randomVal }]);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3>Redux Driven Chart</h3>
        <button onClick={addMetric} style={{ padding: '6px 12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>Dispatch New Quarter</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px', height: '120px', borderBottom: '2px solid #cbd5e1', paddingBottom: '4px' }}>
        {metrics.map(m => (
          <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', height: m.value + 'px', background: '#2563eb', borderRadius: '4px 4px 0 0' }}></div>
            <span style={{ fontSize: '12px', marginTop: '4px' }}>{m.label} ({m.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
render(<ReduxChartLab />);`
      },
      {
        num: 7,
        title: "Exercise 7: Set up any admin template with Redux and wire up state changes",
        instructions: "Build an administrative dashboard shell with sidebar toggling, dark/light theme, and profile status wired to global Redux state.",
        solutionCode: `function ReduxAdminTemplateLab() {
  const [adminState, setAdminState] = React.useState({
    sidebarCollapsed: false,
    notificationsCount: 4,
    currentUser: 'SuperAdmin'
  });

  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden' }}>
      <header style={{ padding: '12px 20px', background: '#0f172a', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setAdminState(s => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed }))} style={{ padding: '4px 10px', background: '#334155', color: '#fff', border: 'none', borderRadius: '4px' }}>
          ☰ Toggle Sidebar
        </button>
        <span>User: {adminState.currentUser} | 🔔 Notifications: {adminState.notificationsCount}</span>
      </header>
      <div style={{ display: 'flex', minHeight: '120px' }}>
        {!adminState.sidebarCollapsed && (
          <div style={{ width: '150px', background: '#f1f5f9', padding: '12px', borderRight: '1px solid #e2e8f0', fontSize: '13px' }}>
            <div>Dashboard</div><div style={{ margin: '8px 0' }}>Users</div><div>Settings</div>
          </div>
        )}
        <div style={{ flex: 1, padding: '20px', background: '#fff' }}>
          <h4>Admin Content Area</h4>
          <button onClick={() => setAdminState(s => ({ ...s, notificationsCount: 0 }))} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Clear All Notifications (Dispatch Action)
          </button>
        </div>
      </div>
    </div>
  );
}
render(<ReduxAdminTemplateLab />);`
      },
      {
        num: 8,
        title: "Exercise 8: Add/Delete Form elements dynamically using Redux (Add More / Remove buttons)",
        instructions: "Manage dynamic arrays of input fields with Add More and Delete buttons wired through Redux actions.",
        solutionCode: `function DynamicFormReduxLab() {
  const [skills, setSkills] = React.useState(['React', 'TypeScript']);

  const addSkill = () => setSkills([...skills, '']);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));
  const updateSkill = (index, value) => {
    const copy = [...skills];
    copy[index] = value;
    setSkills(copy);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Dynamic Fields (Add More / Remove)</h3>
      {skills.map((skill, index) => (
        <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            value={skill}
            onChange={(e) => updateSkill(index, e.target.value)}
            placeholder={"Skill #" + (index + 1)}
            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <button onClick={() => removeSkill(index)} style={{ padding: '6px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px' }}>✕</button>
        </div>
      ))}
      <button onClick={addSkill} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        + Add More Skill
      </button>
    </div>
  );
}
render(<DynamicFormReduxLab />);`
      },
      {
        num: 9,
        title: "Exercise 9: Build a Multi-step form storing all data in a Redux array, display after submission",
        instructions: "Implement a multi-stage registration funnel where each step persists data into a central Redux store, rendering a summary view upon completion.",
        solutionCode: `function ReduxMultiStepLab() {
  const [wizardData, setWizardData] = React.useState({ step: 1, name: '', role: '', plan: 'Standard' });

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Redux Wizard State Funnel</h3>
      {wizardData.step === 1 && (
        <div>
          <h4>Stage 1: Identity</h4>
          <input value={wizardData.name} onChange={e => setWizardData({ ...wizardData, name: e.target.value })} placeholder="Full Name" style={{ width: '100%', padding: '8px', marginBottom: '8px', boxSizing: 'border-box' }} />
          <button onClick={() => setWizardData({ ...wizardData, step: 2 })} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>Next →</button>
        </div>
      )}
      {wizardData.step === 2 && (
        <div>
          <h4>Stage 2: Plan Selection</h4>
          <select value={wizardData.plan} onChange={e => setWizardData({ ...wizardData, plan: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '8px' }}>
            <option>Standard</option><option>Enterprise</option>
          </select>
          <button onClick={() => setWizardData({ ...wizardData, step: 3 })} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>Submit into Redux</button>
        </div>
      )}
      {wizardData.step === 3 && (
        <div style={{ padding: '14px', background: '#dcfce7', borderRadius: '8px', color: '#166534' }}>
          <h4>✓ Dispatched & Persisted to Redux Store</h4>
          <p>User: {wizardData.name} | Tier: {wizardData.plan}</p>
          <button onClick={() => setWizardData({ step: 1, name: '', role: '', plan: 'Standard' })} style={{ padding: '6px 12px', background: '#166534', color: '#fff', border: 'none', borderRadius: '4px' }}>Reset Form</button>
        </div>
      )}
    </div>
  );
}
render(<ReduxMultiStepLab />);`
      },
      {
        num: 10,
        title: "Exercise 10: Implement drag-and-drop list reordering and print the new order (Redux)",
        instructions: "Demonstrate list reordering operations where items can be moved up and down in Redux state, outputting the newly ordered array structure.",
        solutionCode: `function DragDropReduxLab() {
  const [tasks, setTasks] = React.useState([
    { id: 't1', title: '1. Architecture Review' },
    { id: 't2', title: '2. Setup Redux Toolkit Store' },
    { id: 't3', title: '3. Implement Unit Tests' }
  ]);

  const move = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= tasks.length) return;
    const copy = [...tasks];
    const [removed] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed);
    setTasks(copy);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Redux Task Reordering Lab</h3>
      <div style={{ display: 'grid', gap: '8px' }}>
        {tasks.map((task, idx) => (
          <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fff', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <span>{task.title}</span>
            <div>
              <button onClick={() => move(idx, idx - 1)} disabled={idx === 0} style={{ marginRight: '6px', cursor: 'pointer' }}>▲</button>
              <button onClick={() => move(idx, idx + 1)} disabled={idx === tasks.length - 1} style={{ cursor: 'pointer' }}>▼</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
        Current Array Keys: {tasks.map(t => t.id).join(' -> ')}
      </div>
    </div>
  );
}
render(<DragDropReduxLab />);`
      },
      {
        num: 11,
        title: "Exercise 11: Handle asynchronous data fetching with redux-thunk or createAsyncThunk",
        instructions: "Demonstrate full async action lifecycle (pending, fulfilled, rejected) using createAsyncThunk pattern in modern Redux.",
        solutionCode: `function AsyncThunkLab() {
  const [status, setStatus] = React.useState('idle');
  const [payload, setPayload] = React.useState(null);

  const dispatchAsyncThunk = () => {
    setStatus('pending');
    setTimeout(() => {
      if (Math.random() > 0.2) {
        setStatus('fulfilled');
        setPayload({ token: 'tok_enterprise_998', timestamp: new Date().toLocaleTimeString() });
      } else {
        setStatus('rejected');
        setPayload({ error: 'Gateway timeout 504' });
      }
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>createAsyncThunk Lifecycle Monitor</h3>
      <button onClick={dispatchAsyncThunk} disabled={status === 'pending'} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>
        {status === 'pending' ? 'Dispatching Thunk...' : 'Dispatch createAsyncThunk'}
      </button>
      <div style={{ marginTop: '14px', padding: '12px', borderRadius: '8px', background: status === 'fulfilled' ? '#dcfce7' : status === 'rejected' ? '#fee2e2' : '#f1f5f9' }}>
        Status: <strong>{status.toUpperCase()}</strong>
        {payload && <pre style={{ margin: '6px 0 0 0', fontSize: '12px' }}>{JSON.stringify(payload, null, 2)}</pre>}
      </div>
    </div>
  );
}
render(<AsyncThunkLab />);`
      }
    ]
  },
  {
    id: "module-9",
    number: 9,
    title: "Authentication, Authorization & Payments",
    hindiTitle: "Authentication (JWT & Google) Aur Payment Gateways (Stripe & Razorpay)",
    badge: "Security & Monetization",
    description: "JWT authentication, secure token storage, API authorization headers, Google OAuth login, and Stripe & Razorpay checkout integration.",
    lessons: [
      {
        id: "m9-jwt-and-google-auth",
        title: "1. JWT Authentication, Secure Token Storage & Google OAuth (GIS)",
        level: "Intermediate",
        summary: "Implement secure authentication flows using JSON Web Tokens (JWT), token interceptors, and Google Identity Services (GIS).",
        intro: "Production applications me user authentication aur permissions (RBAC) sabse critical security requirements hoti hain. Yahan hum JWT aur Google Single-Sign-On (SSO) implement karna seekhenge.",
        whatIsIt: "A JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties. Google Identity Services (GIS) provides official OAuth 2.0 Sign-In with Google buttons.",
        whyNeeded: "HTTP is stateless. When a user logs in, the backend sends a signed JWT token. The React frontend stores this token and sends it in the Authorization: Bearer <token> header on subsequent calls.",
        analogy: "JWT ek digital passport jaisa hai: immigration officer stamp laga kar de deta hai (signature), aur har counter par aap sirf wo passport dikha kar access lete hain!",
        technicalExplanation: "Token Storage options: 1. HttpOnly Cookies (Most secure against XSS). 2. In-memory JS variable + Refresh Token in HttpOnly cookie. 3. localStorage (Convenient for SPAs, but vulnerable to XSS).",
        syntax: `// Attaching JWT to Axios Interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});`,
        codeExplanation: "Interceptor har outgoing API request me automatically Authorization: Bearer header inject karta hai bina har call me manual code likhe.",
        expectedOutput: "Seamless protected API requests with automated token authorization.",
        practicalImplementation: `function GoogleAuthBtn() {
  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
  };
}`,
        commonMistakes: "1. Storing sensitive data like user passwords in the JWT payload. (Payload is only Base64Url-encoded and can be read by anyone!).\n2. Forgetting to handle 401 Unauthorized responses to clear tokens and redirect to login.",
        interviewQuestions: [
          {
            q: "What is the structure of a JWT token?",
            a: "A JWT consists of three parts separated by dots: Header.Payload.Signature. Header defines the algorithm. Payload contains user claims. Signature verifies token integrity."
          },
          {
            q: "Why is HttpOnly Cookie safer than LocalStorage for storing authentication tokens?",
            a: "HttpOnly cookies cannot be accessed or read by client-side JavaScript (document.cookie), preventing malicious cross-site scripting (XSS) attacks from stealing the token."
          }
        ],
        assignment: "Build an Auth Guard hook useAuth() that checks for token expiration and exposes login(), logout(), and isAuthenticated.",
        quiz: {
          question: "Can the payload inside a JWT token be decoded and read on the client side without the secret key?",
          options: ["No, it requires the private key", "Yes, it is only Base64 encoded", "Only with Google OAuth", "Only in production"],
          answer: 1,
          explanation: "Yes, JWT payload is merely Base64-encoded, not encrypted. Anyone can decode and inspect it; only the signature requires the secret key to forge."
        },
        codeTemplate: `function AuthSimulationLab() {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const handleLogin = () => {
    const mockJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJBbWl0YSIsInJvbGUiOiJTZW5pb3IgRW5naW5lZXIifQ';
    setToken(mockJwt);
    setUser({ name: 'Amita Sen', role: 'Senior Engineer' });
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>JWT Auth Interceptor Lab</h3>
      {token ? (
        <div style={{ padding: '14px', background: '#dcfce7', borderRadius: '8px', border: '1px solid #86efac' }}>
          <p>Logged in as: <strong>{user.name}</strong> ({user.role})</p>
          <div style={{ wordBreak: 'break-all', fontSize: '11px', background: '#fff', padding: '8px', borderRadius: '4px', margin: '8px 0' }}>
            Authorization: Bearer {token}
          </div>
          <button onClick={handleLogout} style={{ padding: '6px 12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Simulate JWT Login
        </button>
      )}
    </div>
  );
}
render(<AuthSimulationLab />);`
      },
      {
        id: "m9-payment-gateways",
        title: "2. Payment Gateways (Stripe & Razorpay Integration)",
        level: "Advanced",
        summary: "Integrate secure credit card checkout and UPI payments using Stripe Elements and Razorpay Checkout with webhooks.",
        intro: "E-commerce aur SaaS platforms par monetization ke liye Stripe (global credit cards) aur Razorpay (India UPI/Cards) industry leaders hain.",
        whatIsIt: "Payment Gateways securely collect credit card or UPI details on client-side sandboxes, generate payment tokens, and send them to the merchant backend for confirmation.",
        whyNeeded: "PCI-DSS compliance: your application server must NEVER touch or store raw credit card numbers. Gateways tokenize sensitive financial data directly.",
        analogy: "Stripe/Razorpay ek armored bank truck jaisa hai: customer direct truck me paise daalta hai, aur aapko sirf verified receipt milti hai!",
        technicalExplanation: "Checkout lifecycle: 1. Frontend requests Order ID from backend. 2. Backend calls gateway API and returns client_secret. 3. Frontend opens checkout popup. 4. Customer authorizes payment. 5. Gateway returns payment_id to success callback, and fires a server Webhook.",
        syntax: `// Razorpay Client Callback Syntax
const options = {
  key: 'rzp_test_YOUR_KEY',
  amount: 49900, // In Paise (499 INR)
  currency: 'INR',
  name: 'ReactMastery Pro',
  handler: function (response) {
    alert('Payment ID: ' + response.razorpay_payment_id);
  }
};
const rzp = new window.Razorpay(options);
rzp.open();`,
        codeExplanation: "amount hamesha smallest currency unit (paise / cents) me hota hai. handler callback me payment_id aur signature verify hote hain.",
        expectedOutput: "Polished, secure checkout modal triggering success / failure callback handlers seamlessly.",
        practicalImplementation: `// Stripe Elements React pattern
// const { error, paymentMethod } = await stripe.createPaymentMethod({
//   type: 'card',
//   card: elements.getElement(CardElement)
// });`,
        commonMistakes: "1. Hardcoding secret API keys (sk_live_...) into frontend React code! (Secret keys must ONLY reside on the backend server).\n2. Assuming client success callback guarantees payment fulfillment without verifying server webhooks.",
        interviewQuestions: [
          {
            q: "Why must you NEVER fulfill orders based solely on the client-side payment success callback?",
            a: "Client-side code can be manipulated or network calls intercepted. Authoritative confirmation of payment should always come via a cryptographically signed Server Webhook."
          },
          {
            q: "What is PCI-DSS and how does Stripe Elements ensure compliance?",
            a: "PCI-DSS is the security standard for organizations handling credit card information. Stripe Elements hosts input fields inside secure iframes, ensuring card numbers never touch the merchant's server or JavaScript context."
          }
        ],
        assignment: "Write a mock checkout screen with options for 'Pay with Card (Stripe)' and 'Pay with UPI (Razorpay)' handling simulated success and decline callbacks.",
        quiz: {
          question: "Which key is safe to include in frontend React code for Stripe / Razorpay?",
          options: ["Secret Key (sk_live)", "Publishable / Public Key (pk_live / rzp_live)", "Database Master Key", "Webhook Secret"],
          answer: 1,
          explanation: "Only Publishable / Public keys are intended to be exposed to the browser. Secret keys must remain securely on your backend server."
        },
        codeTemplate: `function PaymentCheckoutLab() {
  const [status, setStatus] = React.useState('idle');

  const handlePay = (gateway) => {
    setStatus('processing');
    setTimeout(() => {
      if (Math.random() > 0.15) {
        setStatus("success_" + gateway);
      } else {
        setStatus('failed');
      }
    }, 1200);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', maxWidth: '420px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Payment Gateway Checkout</h3>
      <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '14px' }}>
        <div>Item: <strong>React Enterprise Masterclass</strong></div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a', marginTop: '4px' }}>Total: $49.00 USD</div>
      </div>
      <div style={{ display: 'grid', gap: '8px', marginBottom: '14px' }}>
        <button onClick={() => handlePay('Stripe')} disabled={status === 'processing'} style={{ padding: '10px', background: '#635bff', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          💳 Pay with Stripe (Cards)
        </button>
        <button onClick={() => handlePay('Razorpay')} disabled={status === 'processing'} style={{ padding: '10px', background: '#072654', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          ⚡ Pay with Razorpay (UPI & NetBanking)
        </button>
      </div>
      {status === 'processing' && <div style={{ color: '#2563eb', textAlign: 'center' }}>Connecting to bank secure sandbox...</div>}
      {status.startsWith('success') && (
        <div style={{ padding: '12px', background: '#dcfce7', color: '#166534', borderRadius: '6px' }}>
          ✓ Payment Authorized via {status.split('_')[1]}! Callback verified.
        </div>
      )}
      {status === 'failed' && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px' }}>
          ✕ Payment Declined by Bank. Failure callback triggered.
        </div>
      )}
    </div>
  );
}
render(<PaymentCheckoutLab />);`
      }
    ],
    exercises: [
      {
        num: 1,
        title: "Exercise 1: Implement Login/Register with JWT stored securely and attached to API calls",
        instructions: "Build an authentication flow that generates a mock JWT upon login, stores it in browser storage, and passes it in headers to a protected mock API endpoint.",
        solutionCode: `function JwtAuthFlowLab() {
  const [token, setToken] = React.useState(null);
  const [apiResponse, setApiResponse] = React.useState('');

  const login = () => {
    const mockToken = 'mock_jwt_header.payload.signature_8849';
    setToken(mockToken);
  };

  const testProtectedApi = () => {
    if (!token) {
      setApiResponse('401 Unauthorized: Missing Bearer Token');
      return;
    }
    setApiResponse('200 OK: Secured payroll data successfully accessed with Authorization header!');
  };

  return (
    <div style={{ padding: '20px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Secure JWT Pipeline Lab</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {!token ? (
          <button onClick={login} style={{ padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}>Log In & Store JWT</button>
        ) : (
          <button onClick={() => { setToken(null); setApiResponse(''); }} style={{ padding: '8px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px' }}>Log Out & Wipe Token</button>
        )}
        <button onClick={testProtectedApi} style={{ padding: '8px 14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>Test Protected API</button>
      </div>
      {apiResponse && (
        <div style={{ padding: '10px', background: apiResponse.startsWith('200') ? '#dcfce7' : '#fee2e2', borderRadius: '6px', fontSize: '13px' }}>
          {apiResponse}
        </div>
      )}
    </div>
  );
}
render(<JwtAuthFlowLab />);`
      },
      {
        num: 2,
        title: "Exercise 2: Add Google OAuth login and merge it with the existing auth flow",
        instructions: "Simulate Google Single Sign-On (GIS), extracting OAuth profile claims and linking them into existing user session state.",
        solutionCode: `function GoogleOAuthLab() {
  const [user, setUser] = React.useState(null);

  const handleGoogleLogin = () => {
    setUser({
      name: 'Pooja Hegde',
      email: 'pooja.hegde@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
      provider: 'Google SSO (OAuth 2.0)'
    });
  };

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Google Identity Services SSO Lab</h3>
      {!user ? (
        <button onClick={handleGoogleLogin} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontWeight: 'bold', color: '#ea4335' }}>G</span> Sign in with Google (OAuth 2.0)
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#eff6ff', borderRadius: '8px' }}>
          <img src={user.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <div>
            <h4 style={{ margin: 0 }}>{user.name}</h4>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{user.email} • {user.provider}</span>
          </div>
          <button onClick={() => setUser(null)} style={{ marginLeft: 'auto', padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px' }}>Sign Out</button>
        </div>
      )}
    </div>
  );
}
render(<GoogleOAuthLab />);`
      },
      {
        num: 3,
        title: "Exercise 3: Integrate a payment gateway and handle success/failure callbacks",
        instructions: "Build an end-to-end checkout experience with order initialization, modal simulation, and explicit success and failure callback flows.",
        solutionCode: `function PaymentCallbackLab() {
  const [log, setLog] = React.useState([]);
  const addLog = (msg) => setLog(l => ["[" + new Date().toLocaleTimeString() + "] " + msg, ...l]);

  const startCheckout = () => {
    addLog('Step 1: POST /api/orders created order_id: ord_9918');
    setTimeout(() => {
      addLog('Step 2: Payment modal opened on client');
      setTimeout(() => {
        addLog('Step 3: Bank OTP verified -> handler({ razorpay_payment_id: "pay_772" })');
        addLog('Step 4: Server Webhook verified signature -> Order Fulfilled!');
      }, 800);
    }, 600);
  };

  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#38bdf8' }}>Payment Gateway Lifecycle Callback Lab</h3>
      <button onClick={startCheckout} style={{ padding: '8px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Trigger End-to-End Payment Flow
      </button>
      <div style={{ marginTop: '14px', background: '#1e293b', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
        <strong>Execution Trace:</strong>
        {log.map((entry, idx) => <div key={idx} style={{ color: '#4ade80', margin: '4px 0' }}>{entry}</div>)}
      </div>
    </div>
  );
}
render(<PaymentCallbackLab />);`
      }
    ]
  }
];
