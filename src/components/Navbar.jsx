import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Estimate', to: '/estimate' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent
          ? 'bg-transparent border-transparent'
          : 'bg-white border-b border-mid-gray shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo — white on dark hero, full colour on white navbar */}
        <Link to="/" className="shrink-0">
          <img
            src="/logo.png"
            alt="City Stroy Ltd"
            style={{
              height: '60px',
              width: 'auto',
              objectFit: 'contain',
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
                `font-body text-sm font-medium transition-colors duration-200 ${transparent
                  ? isActive ? 'text-white' : 'text-white/75 hover:text-white'
                  : isActive ? 'text-accent' : 'text-navy hover:text-accent'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => navigate('/book')}
          className={`hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-btn transition-all duration-200 ${transparent
              ? 'bg-white text-navy hover:bg-white/90'
              : 'bg-accent text-white hover:bg-blue-700'
            }`}
        >
          Get a Quote
        </button>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-1 transition-colors duration-200 ${transparent ? 'text-white' : 'text-navy'
            }`}
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
                    `font-body text-sm font-medium py-2.5 px-3 rounded-btn transition-colors duration-200 ${isActive
                      ? 'text-accent bg-blue-50'
                      : 'text-navy hover:text-accent hover:bg-light-gray'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <button
                onClick={() => { setOpen(false); navigate('/book') }}
                className="mt-3 px-4 py-2.5 bg-accent text-white text-sm font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 text-center"
              >
                Get a Quote
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
