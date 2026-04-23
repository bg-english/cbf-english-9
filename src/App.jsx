import { useState } from 'react'
import LoginGate from './components/auth/LoginGate.jsx'
import Nav from './components/layout/Nav.jsx'
import Hero from './components/layout/Hero.jsx'
import Footer from './components/layout/Footer.jsx'
import VocabSection from './components/vocabulary/VocabSection.jsx'
import GrammarSection from './components/grammar/GrammarSection.jsx'
import PracticeSection from './components/practice/PracticeSection.jsx'
import BiblicalSection from './components/biblical/BiblicalSection.jsx'
import WorkshopSection from './components/workshop/WorkshopSection.jsx'

export default function App() {
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState('vocabulary')

  if (!user) return <LoginGate onLogin={setUser} />

  const sections = { vocabulary: VocabSection, grammar: GrammarSection, practice: PracticeSection, biblical: BiblicalSection, workshop: WorkshopSection }
  const ActiveComponent = sections[activeSection]

  return (
    <>
      <Nav active={activeSection} onNav={setActiveSection} />
      <Hero />
      <main>
        <ActiveComponent user={user} />
      </main>
      <Footer />
    </>
  )
}
