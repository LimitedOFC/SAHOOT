// ── STORAGE ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'limited_quizzes';

function getQuizzes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveQuizzes(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
function getQuiz(id)      { return getQuizzes().find(q => q.id === id) || null; }
function saveQuiz(quiz) {
  const all = getQuizzes();
  const i   = all.findIndex(q => q.id === quiz.id);
  if (i >= 0) all[i] = quiz; else all.push(quiz);
  saveQuizzes(all);
}
function deleteQuiz(id)   { saveQuizzes(getQuizzes().filter(q => q.id !== id)); }

function newQuiz() {
  return { id:'quiz_'+Date.now(), title:'Untitled Quiz', description:'', emoji:'📚', createdAt:Date.now(), questions:[] };
}
function newQuestion() {
  return { id:'q_'+Date.now()+'_'+Math.random().toString(36).slice(2), question:'', answers:['','','',''], correct:0, timeLimit:20 };
}

// ── SEED ─────────────────────────────────────────────────────────────────────

function seedIfEmpty() {
  if (getQuizzes().length) return;
  saveQuizzes([
    {
      id:'sample_geo', title:'Geography', description:'World capitals & facts', emoji:'🌍', createdAt:Date.now(),
      questions:[
        {id:'g1',question:'Capital of France?',         answers:['Berlin','Madrid','Paris','Rome'],          correct:2,timeLimit:20},
        {id:'g2',question:'Largest ocean?',             answers:['Atlantic','Indian','Arctic','Pacific'],    correct:3,timeLimit:20},
        {id:'g3',question:'Capital of Japan?',          answers:['Beijing','Seoul','Tokyo','Bangkok'],       correct:2,timeLimit:20},
        {id:'g4',question:'Longest river in the world?',answers:['Amazon','Nile','Yangtze','Mississippi'],   correct:1,timeLimit:20},
        {id:'g5',question:'How many continents?',       answers:['5','6','7','8'],                          correct:2,timeLimit:15},
        {id:'g6',question:'Capital of Australia?',      answers:['Sydney','Melbourne','Canberra','Perth'],   correct:2,timeLimit:20},
      ]
    },
    {
      id:'sample_math', title:'Quick Maths', description:'Fast mental maths', emoji:'🔢', createdAt:Date.now(),
      questions:[
        {id:'m1',question:'12 × 12 = ?',    answers:['132','144','154','124'],   correct:1,timeLimit:15},
        {id:'m2',question:'√144 = ?',       answers:['11','12','13','14'],       correct:1,timeLimit:15},
        {id:'m3',question:'25% of 200 = ?', answers:['40','50','60','25'],       correct:1,timeLimit:15},
        {id:'m4',question:'7³ = ?',         answers:['343','343','512','216'],   correct:0,timeLimit:20},
        {id:'m5',question:'1000 ÷ 8 = ?',  answers:['115','125','135','120'],   correct:1,timeLimit:15},
        {id:'m6',question:'What is π ≈ ?',  answers:['3.14','3.12','3.16','3.18'],correct:0,timeLimit:15},
      ]
    },
    {
      id:'sample_gaming', title:'Gaming Facts', description:'Test your gaming knowledge', emoji:'🎮', createdAt:Date.now(),
      questions:[
        {id:'v1',question:'Which company made Minecraft?',        answers:['EA','Mojang','Ubisoft','Valve'],         correct:1,timeLimit:20},
        {id:'v2',question:'What year did Fortnite BR release?',   answers:['2016','2017','2018','2019'],             correct:1,timeLimit:20},
        {id:'v3',question:'Which game has a "Victory Royale"?',   answers:['PUBG','Warzone','Fortnite','Apex'],      correct:2,timeLimit:15},
        {id:'v4',question:'GTA stands for?',                      answers:['Great Train Auto','Grand Theft Auto','Giant Tech Arena','Global Task Army'],correct:1,timeLimit:20},
        {id:'v5',question:'Mario\'s brother is?',                 answers:['Wario','Waluigi','Luigi','Toad'],        correct:2,timeLimit:15},
        {id:'v6',question:'Which console uses Joy-Cons?',         answers:['PS5','Xbox','Switch','Wii U'],           correct:2,timeLimit:20},
      ]
    }
  ]);
}

// ── GAME MODES ────────────────────────────────────────────────────────────────

const GAME_MODES = [
  { id:'classic',        name:'Classic',        emoji:'📝', color:'#6d28d9', badge:'badge-purple', desc:'Answer questions to earn gold. Most gold wins!' },
  { id:'gold_hunt',      name:'Gold Hunt',      emoji:'💰', color:'#f59e0b', badge:'badge-yellow', desc:'Answer fast — speed gives bonus gold!' },
  { id:'battle_royale',  name:'Battle Royale',  emoji:'⚔️', color:'#ef4444', badge:'badge-red',    desc:'Wrong answers cost a life. Survive to win!' },
  { id:'racing',         name:'Racing',         emoji:'🏎️', color:'#22c55e', badge:'badge-green',  desc:'Answer to move your car. First to finish wins!' },
  { id:'tower_defense',  name:'Tower Defense',  emoji:'🏰', color:'#8b5cf6', badge:'badge-purple', desc:'Defend your tower — correct answers stop enemies!' },
  { id:'cafe',           name:'Café',           emoji:'☕', color:'#ec4899', badge:'badge-pink',   desc:'Serve customers by answering correctly!' },
  { id:'crypto',         name:'Crypto Hack',    emoji:'💻', color:'#0ea5e9', badge:'badge-cyan',   desc:'Hack servers to earn crypto with correct answers!' },
  { id:'factory',        name:'Factory',        emoji:'🏭', color:'#f97316', badge:'badge-orange', desc:'Keep your factory running by answering questions!' },
];

// ── UTILS ─────────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function $(id)  { return document.getElementById(id); }
function qs(sel){ return document.querySelector(sel); }

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls)              e.className  = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function fmtNum(n) {
  return n >= 1000 ? (n/1000).toFixed(1)+'k' : n;
}
