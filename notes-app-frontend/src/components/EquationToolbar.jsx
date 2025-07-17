import { useState } from 'react';

const SYMBOL_GROUPS = [
  {
    label: 'Greek',
    symbols: [
      { label: 'α', latex: '\\alpha' },
      { label: 'β', latex: '\\beta' },
      { label: 'γ', latex: '\\gamma' },
      { label: 'δ', latex: '\\delta' },
      { label: 'ε', latex: '\\epsilon' },
      { label: 'θ', latex: '\\theta' },
      { label: 'λ', latex: '\\lambda' },
      { label: 'μ', latex: '\\mu' },
      { label: 'π', latex: '\\pi' },
      { label: 'ρ', latex: '\\rho' },
      { label: 'σ', latex: '\\sigma' },
      { label: 'φ', latex: '\\phi' },
      { label: 'ω', latex: '\\omega' },
      { label: 'Δ', latex: '\\Delta' },
      { label: 'Φ', latex: '\\Phi' },
      { label: 'Ω', latex: '\\Omega' },
    ],
  },
  {
    label: 'Operators',
    symbols: [
      { label: '+', latex: '+' },
      { label: '−', latex: '-' },
      { label: '×', latex: '\\times' },
      { label: '÷', latex: '\\div' },
      { label: '=', latex: '=' },
      { label: '≠', latex: '\\neq' },
      { label: '∓', latex: '\\mp' },
      { label: '∑', latex: '\\sum_{i=1}^n' },
      { label: '∏', latex: '\\prod_{i=1}^n' },
      { label: '∫', latex: '\\int_{a}^{b}' },
      { label: '√', latex: '\\sqrt{x}' },
      { label: '∂', latex: '\\partial' },
      { label: '∞', latex: '\\infty' },
      { label: 'd/dx', latex: '\\frac{d}{dx}' },
      { label: 'lim', latex: '\\lim_{x \\to 0}' },
      { label: '∇', latex: '\\nabla' },
      { label: '!', latex: '!' },
    ],
  },
  {
    label: 'Arrows',
    symbols: [
      { label: '→', latex: '\\rightarrow' },
      { label: '←', latex: '\\leftarrow' },
      { label: '↑', latex: '\\uparrow' },
      { label: '↓', latex: '\\downarrow' },
      { label: '↔', latex: '\\leftrightarrow' },
      { label: '⇒', latex: '\\Rightarrow' },
      { label: '⇐', latex: '\\Leftarrow' },
      { label: '⇌', latex: '\\rightleftharpoons' },
      { label: '↦', latex: '\\mapsto' },
    ],
  },
  {
    label: 'Relations',
    symbols: [
      { label: '=', latex: '=' },
      { label: '≠', latex: '\\neq' },
      { label: '≈', latex: '\\approx' },
      { label: '≅', latex: '\\cong' },
      { label: '<', latex: '<' },
      { label: '>', latex: '>' },
      { label: '≤', latex: '\\leq' },
      { label: '≥', latex: '\\geq' },
      { label: '∝', latex: '\\propto' },
      { label: '≡', latex: '\\equiv' },
      { label: '⊆', latex: '\\subseteq' },
      { label: '⊇', latex: '\\supseteq' },
      { label: '∈', latex: '\\in' },
      { label: '∉', latex: '\\notin' },
    ],
  },
  {
    label: 'Brackets',
    symbols: [
      { label: '( )', latex: '\\left( x \\right)' },
      { label: '[ ]', latex: '\\left[ x \\right]' },
      { label: '{ }', latex: '\\left\\{ x \\right\\}' },
      { label: '| |', latex: '\\left| x \\right|' },
      { label: '⟨ ⟩', latex: '\\langle x \\rangle' },
      { label: '‖ ‖', latex: '\\left\\| x \\right\\|' },
    ],
  },
  {
    label: 'Templates',
    symbols: [
      { label: 'Fraction', latex: '\\frac{a}{b}' },
      { label: 'Superscript', latex: 'x^{2}' },
      { label: 'Subscript', latex: 'x_{i}' },
      { label: 'nth Root', latex: '\\sqrt[n]{x}' },
      { label: 'Binomial', latex: '\\binom{n}{k}' },
      { label: 'Matrix', latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}' },
      { label: 'Cases', latex: '\\begin{cases} a & x < 0 \\\\ b & x \\geq 0 \\end{cases}' },
      { label: 'Aligned', latex: '\\begin{aligned} a &= b + c \\\\ x &= y - z \\end{aligned}' },
    ],
  },
  {
    label: 'Chemistry',
    symbols: [
      { label: 'H₂O', latex: 'H_2O' },
      { label: 'CO₂', latex: 'CO_2' },
      { label: 'O₂', latex: 'O_2' },
      { label: '→', latex: '\\rightarrow' },
      { label: '⇌', latex: '\\rightleftharpoons' },
      { label: 'Na⁺', latex: 'Na^+' },
      { label: 'Cl⁻', latex: 'Cl^-' },
      { label: 'NH₃', latex: 'NH_3' },
      { label: 'CH₄', latex: 'CH_4' },
    ],
  },
  {
    label: 'Misc',
    symbols: [
      { label: '°', latex: '^\\circ' },
      { label: '⋅', latex: '\\cdot' },
      { label: '…', latex: '\\ldots' },
      { label: '∈', latex: '\\in' },
      { label: '∉', latex: '\\notin' },
      { label: '⊕', latex: '\\oplus' },
      { label: '⊗', latex: '\\otimes' },
      { label: 'ℝ', latex: '\\mathbb{R}' },
      { label: 'ℤ', latex: '\\mathbb{Z}' },
      { label: 'ℕ', latex: '\\mathbb{N}' },
      { label: 'ℚ', latex: '\\mathbb{Q}' },
    ],
  },
];

export default function EquationToolbar({ onInsert, onClear, onUndo, onRedo }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="mb-2">
      
      {/* Divider */}
      <div className="h-4 flex items-center mb-2">
        <div className="flex-1 border-t border-neutral-200"></div>
      </div>
      {/* LaTeX Groups Row */}
      <div className="flex flex-col gap-2 items-center">
        <div className='flex flex-wrap gap-2'>
        {SYMBOL_GROUPS.map((group, idx) => (
          <div key={group.label} className="relative">
            <button
              type="button"
              className="px-3 py-1 bg-neutral-200 rounded hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm font-medium"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-haspopup="true"
              aria-expanded={open === idx}
            >
              {group.label}
            </button>
            {open === idx && (
              <div className="absolute z-20 mt-2 left-0 bg-white border border-neutral-200 rounded shadow-lg p-2 grid grid-cols-4 gap-2 min-w-[180px]">
                {group.symbols.map(sym => (
                  <button
                    key={sym.label}
                    type="button"
                    className="px-2 py-1 bg-neutral-100 rounded hover:bg-indigo-100 focus:outline-none text-base"
                    onClick={() => { onInsert(`$${sym.latex}$`); setOpen(null); }}
                    title={sym.latex}
                    aria-label={sym.latex}
                  >
                    {sym.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        </div>
        {/* Control Buttons Row */}
      <div className="flex gap-2 mb-2 items-center">
        <button
          type="button"
          className="px-3 py-1  bg-neutral-700 text-white py-1.5 rounded font-semibold hover:bg-neutral-800 transition gap-1"
          onClick={onUndo}
          title="Undo"
          aria-label="Undo"
        >
          <span className="material-icons text-base">Undo</span>
        </button>
        <button
          type="button"
          className="px-3 py-1  bg-neutral-700 text-white py-1.5 rounded font-semibold hover:bg-neutral-800 transition gap-1"
          onClick={onRedo}
          title="Redo"
          aria-label="Redo"
        >
          <span className="material-icons text-base">Redo</span>
        </button>
        <button
          type="button"
          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm font-medium ml-2"
          onClick={onClear}
          title="Clear Editor"
          aria-label="Clear Editor"
        >
          <span className="material-icons text-base">Clear</span>
        </button>
        {/* <span className="ml-4 text-xs text-neutral-500">Tip: Use <span className="font-mono">$$...$$</span> for large/complex equations.</span> */}
      </div>
      </div>
    </div>
  );
} 