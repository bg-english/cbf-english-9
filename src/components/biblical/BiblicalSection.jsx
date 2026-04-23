const principles = [
  { title: 'Principle 1: Your dreams are God-given', body: 'Just as Joseph\'s dreams came from God, the ambitions in your heart — to succeed, to build something, to help others — are not accidents. They are seeds God planted. "For we are God\'s handiwork, created in Christ Jesus to do good works." (Ephesians 2:10)' },
  { title: 'Principle 2: Setbacks are not the end of the story', body: 'Joseph set himself a goal and rose to every challenge — even when circumstances were against him. When you face your fears and keep going, you are living out Genesis 50:20. What seems like harm can become your greatest breakthrough.' },
  { title: 'Principle 3: Excellence honors God', body: 'To exceed expectations and break records is not about pride — it\'s about stewarding your God-given potential. "Whatever you do, work at it with all your heart, as working for the Lord." (Colossians 3:23)' },
  { title: 'Principle 4: Your success serves others', body: 'Joseph\'s promotion didn\'t just benefit him — it saved his entire family and a nation. When you run your own business or achieve your dreams, your success can be a feather in God\'s cap by blessing others around you.' },
]

export default function BiblicalSection() {
  return (
    <div className="section-wrap">
      <div className="section-title">Biblical Principles</div>
      <div className="section-sub">Faith · Dreams · Purpose · Genesis 50:20 &amp; 1:27-28</div>

      {/* Verse 1 */}
      <div style={{ background: '#1A2744', borderRadius: 12, padding: '2.5rem', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-1rem', left: '1rem', fontFamily: 'var(--font-display)', fontSize: '10rem', color: 'rgba(201,168,76,0.07)', lineHeight: 1, pointerEvents: 'none' }}>"</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#fff', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '1rem', position: 'relative' }}>
          "You intended to harm me, but God intended it for good to accomplish what is now being done, the saving of many lives."
        </p>
        <cite style={{ color: '#C9A84C', fontSize: '0.84rem', fontStyle: 'normal', fontWeight: 600, letterSpacing: '0.08em' }}>Genesis 50:20 (NIV) — Unit Verse</cite>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.6rem', fontSize: '1.2rem' }}>The Story of Joseph: Dreaming with Purpose</h3>
        <p style={{ color: '#4A4A4A', marginBottom: '1.2rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Genesis 50:20 comes from one of the most powerful stories of ambition, adversity, and divine purpose in Scripture. Joseph was a dreamer — literally. As a teenager, he dreamed of his future greatness. But his path to success involved betrayal, slavery, false accusation, and prison. Yet through it all, God was turning every setback into a setup.
        </p>
        {principles.map((p, i) => (
          <div key={i} style={{ borderLeft: '4px solid #C9A84C', padding: '1.1rem 1.4rem', background: 'rgba(201,168,76,0.05)', borderRadius: '0 10px 10px 0', marginBottom: '1rem' }}>
            <h4 style={{ color: '#1A2744', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem' }}>{p.title}</h4>
            <p style={{ color: '#4A4A4A', fontSize: '0.88rem', lineHeight: 1.6 }}>{p.body}</p>
          </div>
        ))}
      </div>

      {/* Verse 2 */}
      <div style={{ background: '#1A2744', borderRadius: 12, padding: '2.5rem', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-1rem', left: '1rem', fontFamily: 'var(--font-display)', fontSize: '10rem', color: 'rgba(201,168,76,0.07)', lineHeight: 1, pointerEvents: 'none' }}>"</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '1rem', position: 'relative' }}>
          "So God created mankind in his own image, in the image of God he created them; male and female he created them. God blessed them and said to them, 'Be fruitful and increase in number; fill the earth and subdue it.'"
        </p>
        <cite style={{ color: '#C9A84C', fontSize: '0.84rem', fontStyle: 'normal', fontWeight: 600, letterSpacing: '0.08em' }}>Genesis 1:27-28 (NIV) — School Verse 2026 · Año de la Pureza</cite>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.6rem', fontSize: '1.2rem' }}>Imago Dei: Created with Purpose and Identity</h3>
        <p style={{ color: '#4A4A4A', marginBottom: '1.2rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
          The phrase "Imago Dei" means "image of God." It is the foundation of human dignity and purpose. You are not an accident. You are made in the image of the Creator — which means creativity, ambition, and the desire to build something great are in your spiritual DNA.
        </p>
        <div style={{ borderLeft: '4px solid #C9A84C', padding: '1.1rem 1.4rem', background: 'rgba(201,168,76,0.05)', borderRadius: '0 10px 10px 0', marginBottom: '1rem' }}>
          <h4 style={{ color: '#1A2744', fontWeight: 600, marginBottom: '0.4rem' }}>Connection to Your Dreams</h4>
          <p style={{ color: '#4A4A4A', fontSize: '0.88rem', lineHeight: 1.6 }}>The command to "be fruitful and subdue the earth" is God's original mandate for human ambition. Every time you work with your hands, head straight for the top, or set yourself a goal, you are fulfilling this creation mandate. Your career, your creativity, your ambition — these are acts of worship when aligned with God's purpose.</p>
        </div>
        <div style={{ borderLeft: '4px solid #C9A84C', padding: '1.1rem 1.4rem', background: 'rgba(201,168,76,0.05)', borderRadius: '0 10px 10px 0', marginBottom: '1rem' }}>
          <h4 style={{ color: '#1A2744', fontWeight: 600, marginBottom: '0.4rem' }}>Purity in Pursuit: Año de la Pureza 2026</h4>
          <p style={{ color: '#4A4A4A', fontSize: '0.88rem', lineHeight: 1.6 }}>Pursuing dreams with purity means: choosing integrity over shortcuts, honoring God in how you rise, and remembering that a feather in your cap is only truly valuable when earned with a pure heart. Joseph maintained moral purity even in Potiphar's house — and God honored him for it.</p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '1rem', fontSize: '1.2rem' }}>Reflection Questions</h3>
        <div className="info-box">
          <ul>
            <li>What is one big dream you have for your future? How might it connect to Genesis 1:27-28?</li>
            <li>Have you ever experienced a "Genesis 50:20 moment" — when something bad turned out to be good?</li>
            <li>How can your ambitions serve others, not just yourself?</li>
            <li>What does it mean for you personally to be made in the image of God?</li>
            <li>How can you pursue your goals with purity this year at CBF?</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
