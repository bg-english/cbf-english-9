import { useState } from 'react'

const tabs = ['Present & Past Tenses', 'Stative & Dynamic Verbs', 'Conditionals']

function PresPassTab() {
  return (
    <>
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Present Simple</h3>
        <p style={{ color: '#4A4A4A', marginBottom: '1rem', fontSize: '0.9rem' }}>Used for habits, routines, facts, and permanent situations.</p>
        <div className="formula-box">
          <strong>+</strong> Subject + base verb (+ -s/-es for he/she/it)<br/>
          <strong>−</strong> Subject + do/does + not + base verb<br/>
          <strong>?</strong> Do/Does + subject + base verb?
        </div>
        <table className="ex-table">
          <thead><tr><th>Affirmative</th><th>Negative</th><th>Question</th></tr></thead>
          <tbody>
            <tr><td className="hl">She sets herself a goal every year.</td><td>She doesn't set goals often.</td><td>Does she set goals?</td></tr>
            <tr><td className="hl">He runs his own business.</td><td>He doesn't run a company.</td><td>Does he run a company?</td></tr>
            <tr><td className="hl">They rise to the challenge.</td><td>They don't give up easily.</td><td>Do they rise to it?</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Past Simple</h3>
        <p style={{ color: '#4A4A4A', marginBottom: '1rem', fontSize: '0.9rem' }}>Used for completed actions at a specific time in the past.</p>
        <div className="formula-box">
          <strong>+</strong> Subject + verb-ed / irregular past<br/>
          <strong>−</strong> Subject + did + not + base verb<br/>
          <strong>?</strong> Did + subject + base verb?
        </div>
        <div className="info-box">
          <h4>Key time expressions</h4>
          <p>yesterday · last week/month/year · in 2010 · ago · when I was young</p>
        </div>
        <table className="ex-table">
          <thead><tr><th>Affirmative</th><th>Negative</th><th>Question</th></tr></thead>
          <tbody>
            <tr><td className="hl">She broke a record in 2024.</td><td>She didn't break the old record.</td><td>Did she break a record?</td></tr>
            <tr><td className="hl">He exceeded all expectations.</td><td>He didn't fail the test.</td><td>Did he exceed expectations?</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Past Continuous</h3>
        <p style={{ color: '#4A4A4A', marginBottom: '1rem', fontSize: '0.9rem' }}>Used for ongoing actions in the past, often interrupted by a Past Simple action.</p>
        <div className="formula-box">
          <strong>+</strong> Subject + was/were + verb-ing<br/>
          <strong>−</strong> Subject + was/were + not + verb-ing<br/>
          <strong>?</strong> Was/Were + subject + verb-ing?
        </div>
        <div className="info-box">
          <h4>Key pattern: Past Simple vs Past Continuous</h4>
          <ul>
            <li><strong>While</strong> + Past Continuous → Past Simple interrupts it</li>
            <li>She was working with her hands <strong>when</strong> she got the call.</li>
            <li>They were heading straight for the top <strong>while</strong> others were sleeping.</li>
          </ul>
        </div>
      </div>
    </>
  )
}

function StativeTab() {
  return (
    <div className="card">
      <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Stative vs. Dynamic Verbs</h3>
      <p style={{ color: '#4A4A4A', marginBottom: '1.2rem', fontSize: '0.9rem' }}>This distinction is essential for 9th grade. Get this right and your writing will immediately improve.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="info-box" style={{ borderLeft: '4px solid #1A2744' }}>
          <h4>⚓ Stative Verbs</h4>
          <p>Describe <strong>states</strong>, not actions. <em>Never use in continuous tenses.</em></p>
          <br/>
          <ul>
            <li>believe, know, understand, remember</li>
            <li>love, hate, want, need, prefer</li>
            <li>have (possession), own, belong</li>
            <li>see, hear, smell, taste, seem</li>
          </ul>
        </div>
        <div className="info-box" style={{ borderLeft: '4px solid #C9A84C' }}>
          <h4>⚡ Dynamic Verbs</h4>
          <p>Describe <strong>actions</strong> or processes. Can be used in simple or continuous tenses.</p>
          <br/>
          <ul>
            <li>run, work, go, break, build</li>
            <li>set, rise, face, exceed, head</li>
            <li>speak, write, study, try, play</li>
          </ul>
        </div>
      </div>
      <table className="ex-table">
        <thead><tr><th>❌ Incorrect</th><th>✅ Correct</th><th>Why?</th></tr></thead>
        <tbody>
          <tr><td style={{ color: '#8B1A11' }}>I am knowing the answer.</td><td className="hl">I know the answer.</td><td><em>know</em> = stative</td></tr>
          <tr><td style={{ color: '#8B1A11' }}>She is wanting to succeed.</td><td className="hl">She wants to succeed.</td><td><em>want</em> = stative</td></tr>
          <tr><td style={{ color: '#8B1A11' }}>He is having a dream.</td><td className="hl">He has a dream.</td><td><em>have</em> (possess) = stative</td></tr>
          <tr><td className="hl">She is having lunch. ✅</td><td className="hl">She has lunch at noon. ✅</td><td><em>have</em> (action) = dynamic</td></tr>
        </tbody>
      </table>
    </div>
  )
}

function ConditionalsTab() {
  return (
    <>
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Zero Conditional</h3>
        <p style={{ color: '#4A4A4A', marginBottom: '1rem', fontSize: '0.9rem' }}>Used for <strong>universal truths</strong> and facts. The result is always true when the condition is true.</p>
        <div className="formula-box">If + <strong>Present Simple</strong> , + <strong>Present Simple</strong></div>
        <table className="ex-table">
          <thead><tr><th>Condition</th><th>Result</th></tr></thead>
          <tbody>
            <tr><td>If you work with your hands,</td><td className="hl">you develop practical skills.</td></tr>
            <tr><td>If early birds start the day early,</td><td className="hl">they accomplish more.</td></tr>
            <tr><td>If you don't face your fears,</td><td className="hl">they stay with you forever.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.8rem', fontSize: '1.2rem' }}>First Conditional</h3>
        <p style={{ color: '#4A4A4A', marginBottom: '1rem', fontSize: '0.9rem' }}>Used for <strong>real and possible</strong> future situations. The result is likely if the condition happens.</p>
        <div className="formula-box">If + <strong>Present Simple</strong> , + <strong>will + base verb</strong></div>
        <table className="ex-table">
          <thead><tr><th>Condition</th><th>Result</th></tr></thead>
          <tbody>
            <tr><td>If you set yourself a goal,</td><td className="hl">you will rise to the challenge.</td></tr>
            <tr><td>If she exceeds expectations,</td><td className="hl">it will be a feather in her cap.</td></tr>
            <tr><td>If he doesn't face his fears,</td><td className="hl">he won't run his own business.</td></tr>
          </tbody>
        </table>
        <div className="info-box" style={{ marginTop: '1rem' }}>
          <h4>Zero vs First — Quick Comparison</h4>
          <ul>
            <li><strong>Zero:</strong> "If water boils, it becomes steam." — always true, scientific fact</li>
            <li><strong>First:</strong> "If I study hard, I will pass." — possible, future, likely</li>
          </ul>
        </div>
      </div>
    </>
  )
}

const tabComponents = [PresPassTab, StativeTab, ConditionalsTab]

export default function GrammarSection() {
  const [active, setActive] = useState(0)
  const ActiveTab = tabComponents[active]

  return (
    <div className="section-wrap">
      <div className="section-title">Grammar Review</div>
      <div className="section-sub">Tenses · Verbs · Conditionals · 9th Grade</div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            style={{
              background: active === i ? '#1A2744' : '#FAF7F0',
              border: `1px solid ${active === i ? '#1A2744' : '#EDE8DC'}`,
              color: active === i ? '#C9A84C' : '#4A4A4A',
              borderRadius: 8, padding: '0.5rem 1.1rem', fontSize: '0.84rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <ActiveTab />
    </div>
  )
}
