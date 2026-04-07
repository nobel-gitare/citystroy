import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { lang, setLang, t } = useLanguage()

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  const navLinks = [
    { label: t.nav.home,     to: '/' },
    { label: t.nav.about,    to: '/about' },
    { label: t.nav.services, to: '/services' },
    { label: t.nav.projects, to: '/projects' },
    { label: t.nav.estimate, to: '/estimate' },
    { label: t.nav.contact,  to: '/contact' },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent border-transparent' : 'bg-white border-b border-mid-gray shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src="/logo.png"
            alt="City Stroy Ltd"
            style={{
              height: '60px', width: 'auto', objectFit: 'contain',
              filter: transparent ? 'brightness(0) invert(1)' : 'none',
              transition: 'filter 0.3s ease',
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-body text-sm font-medium transition-colors duration-200 ${
                  transparent
                    ? isActive ? 'text-white' : 'text-white/75 hover:text-white'
                    : isActive ? 'text-accent' : 'text-navy hover:text-accent'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right — CTA + Language switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <div className={`flex items-center gap-1 text-xs font-medium font-body ${transparent ? 'text-white/70' : 'text-muted'}`}>
            <button
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 rounded transition-colors duration-150 ${
                lang === 'en'
                  ? transparent ? 'text-white font-semibold' : 'text-accent font-semibold'
                  : 'hover:text-navy'
              }`}
            >
              EN
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => setLang('fr')}
              className={`px-1.5 py-0.5 rounded transition-colors duration-150 ${
                lang === 'fr'
                  ? transparent ? 'text-white font-semibold' : 'text-accent font-semibold'
                  : 'hover:text-navy'
              }`}
            >
              FR
            </button>
          </div>

          <button
            onClick={() => navigate('/book')}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-btn transition-all duration-200 ${
              transparent ? 'bg-white text-navy hover:bg-white/90' : 'bg-accent text-white hover:bg-blue-700'
            }`}
          >
            {t.nav.getQuote}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-1 transition-colors duration-200 ${transparent ? 'text-white' : 'text-navy'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-mid-gray overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-body text-sm font-medium py-2.5 px-3 rounded-btn transition-colors duration-200 ${
                      isActive ? 'text-accent bg-blue-50' : 'text-navy hover:text-accent hover:bg-light-gray'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Language toggle — mobile */}
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <span className="font-body text-xs text-muted">Language:</span>
                {['en', 'fr'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-xs font-medium px-2 py-1 rounded-btn transition-colors duration-150 ${
                      lang === l ? 'bg-accent text-white' : 'bg-light-gray text-navy hover:bg-mid-gray'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setOpen(false); navigate('/book') }}
                className="mt-2 px-4 py-2.5 bg-accent text-white text-sm font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 text-center"
              >
                {t.nav.getQuote}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
