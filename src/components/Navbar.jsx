import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'border-b border-mid-gray'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-btn bg-accent flex items-center justify-center">
            <span className="text-white font-heading font-bold text-sm">CS</span>
          </div>
          <span className="font-heading font-bold text-navy text-lg leading-tight">
            City Stroy Ltd
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-body text-sm font-medium transition-colors duration-200 hover:text-accent ${
                  isActive ? 'text-accent' : 'text-navy'
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
          className="hidden md:inline-flex items-center px-4 py-2 bg-accent text-white text-sm font-medium rounded-btn transition-all duration-200 hover:bg-blue-700"
        >
          Get a Quote
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-navy p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-mid-gray px-6 pb-4">
          <nav className="flex flex-col gap-3 pt-3">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-body text-sm font-medium py-1 transition-colors duration-200 hover:text-accent ${
                    isActive ? 'text-accent' : 'text-navy'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <button
              onClick={() => { setOpen(false); navigate('/book') }}
              className="mt-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 text-left"
            >
              Get a Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
