const fs = require('fs');

let projects = require('./data_projects.js');

const projectEnrichments = [
  {
    conceptsRequired: ['useState Hook', 'Event Handling (onClick)', 'Immutability in Arrays', 'Conditional CSS Styling', 'Bounds Checking'],
    commonErrors: '1. Directly modifying count (count++ instead of setCount(prev => prev + 1)). 2. Mutating history array directly with push() instead of spread operator. 3. Missing minimum and maximum boundary checks causing overflow.',
    finalAssessment: 'Mini Challenge: Add an auto-play timer that increments the counter automatically every 1 second, with a Pause / Resume button!'
  },
  {
    conceptsRequired: ['Controlled Inputs', 'Form Event Prevention (e.preventDefault)', 'Regular Expressions (Email Regex)', 'Password Masking Toggle', 'Conditional View Rendering'],
    commonErrors: '1. Forgetting e.preventDefault() causing browser page reload and loss of state. 2. Not setting input value prop making form uncontrolled. 3. Hardcoding authentication credentials in client-side production builds.',
    finalAssessment: 'Mini Challenge: Add a "Confirm Password" field and show an inline error message if passwords do not match in real time!'
  },
  {
    conceptsRequired: ['State Immutability', 'Array.map for inline updates', 'Array.filter for deletions', 'Search query filter predicates', 'Modal / Edit Row State Management'],
    commonErrors: '1. Mutating item directly inside array. 2. Forgetting to provide a unique "key" prop on rendered table rows. 3. Not parsing numeric inputs causing string concatenation ($20 + $5 = $205).',
    finalAssessment: 'Mini Challenge: Add a multi-item batch delete checkbox allowing users to select and delete multiple records at once!'
  },
  {
    conceptsRequired: ['useEffect Dependency Arrays', 'Dependent Cascading State Resets', 'Asynchronous Mock / REST APIs', 'Object Key Iteration', 'Fallback Loading Skeletons'],
    commonErrors: '1. Forgetting to reset secondary dropdown state when parent country changes, leaving an orphaned state selected. 2. Running infinite loops by setting state inside useEffect without a dependency array.',
    finalAssessment: 'Mini Challenge: Add a third cascading dropdown for Cities under the selected State, with instant temperature / weather display!'
  },
  {
    conceptsRequired: ['useReducer Architecture', 'Action Types & Payloads', 'Kanban Column Pipelines', 'Status Transition Reducers', 'localStorage Sync Hook'],
    commonErrors: '1. Mutating state inside reducer function instead of returning new state copies. 2. Not defining a default case in reducer causing state to turn undefined on unknown actions.',
    finalAssessment: 'Mini Challenge: Implement task search filtering and a "Clear Completed Tasks" button that archives done tasks!'
  },
  {
    conceptsRequired: ['Component Composition', 'Compound Component Pattern', 'Polymorphic Props (variants & sizes)', 'Accessibility (ARIA)', 'CSS Design System Architecture'],
    commonErrors: '1. Creating rigid monolithic components that cannot accept custom children or className overrides. 2. Forgetting to pass ref or rest props down to native button/input elements.',
    finalAssessment: 'Mini Challenge: Build an Avatar and Tooltip component matching the design system colors and export them together!'
  },
  {
    conceptsRequired: ['Client-Side Pagination Math', 'Multi-Column Sort Comparators', 'Multi-Predicate Array Filtering', 'Blob & URL.createObjectURL for CSV Export', 'Interactive Modals'],
    commonErrors: '1. Off-by-one errors in slice pagination math ((page - 1) * perPage). 2. Case-sensitive sorting bugs (string "Z" sorting before "a"). 3. Not revoking object URLs after CSV download.',
    finalAssessment: 'Mini Challenge: Add a column visibility dropdown allowing users to show or hide specific columns dynamically!'
  },
  {
    conceptsRequired: ['Client-Side SPA Routing', 'Layout Nesting & Outlet', 'Protected Route Guards', 'Role-Based Access Control', 'Metric KPI Calculations'],
    commonErrors: '1. Rendering sensitive components before checking authentication status. 2. Hardcoding relative paths causing route breakage in nested sub-routes.',
    finalAssessment: 'Mini Challenge: Add an activity audit log tab showing which admin user performed which system action with timestamps!'
  },
  {
    conceptsRequired: ['Asynchronous Cache Invalidation', 'Debounced Search Querying', 'Optimistic UI Updates', 'HTTP Error Boundaries', 'Stale-While-Revalidate Lifecycle'],
    commonErrors: '1. Spimming API endpoints on every keystroke without a debounce delay. 2. Not rolling back optimistic updates if the background server request fails.',
    finalAssessment: 'Mini Challenge: Implement automatic retry with exponential backoff if the simulated API request encounters a network failure!'
  },
  {
    conceptsRequired: ['Redux Toolkit configureStore', 'createSlice with Immer Mutative Syntax', 'useSelector Selector Optimization', 'useDispatch Action Dispatching', 'Coupon & Tax Math Logic'],
    commonErrors: '1. Calling dispatch inside render phase causing infinite re-render loops. 2. Adding duplicate items to cart array instead of incrementing item quantity.',
    finalAssessment: 'Mini Challenge: Add persistent cart state to localStorage so the shopping cart survives browser refreshes and tab closures!'
  }
];

projects.forEach((p, i) => {
  if (projectEnrichments[i]) {
    p.conceptsRequired = projectEnrichments[i].conceptsRequired;
    p.commonErrors = projectEnrichments[i].commonErrors;
    p.finalAssessment = projectEnrichments[i].finalAssessment;
  }
});

// Format with proper string output
const output = '/**\n * 10 Capstone Projects Data for ReactMastery\n * Fully Enriched with Requirements, Concepts, Code, Steps, and Assessments\n */\n\nmodule.exports = ' + JSON.stringify(projects, null, 2) + ';\n';

fs.writeFileSync(__dirname + '/data_projects.js', output, 'utf8');
console.log('✓ Successfully enriched all 10 projects in data_projects.js!');
