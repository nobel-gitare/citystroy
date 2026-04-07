import { Link } from 'react-router-dom'
import { MapPin, Phone, Hash, Mail, Instagram, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const quickLinkRoutes = ['/', '/about', '/services', '/projects', '/estimate', '/contact']

export default function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { label: t.nav.home,     to: '/' },
    { label: t.nav.about,    to: '/about' },
    { label: t.nav.services, to: '/services' },
    { label: t.nav.projects, to: '/projects' },
    { label: t.nav.estimate, to: '/estimate' },
    { label: t.nav.contact,  to: '/contact' },
  ]

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1 — Logo + tagline */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo.png"
                alt="City Stroy Ltd"
                style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="text-sm text-white/70 mb-2 font-body leading-relaxed">"{t.footer.tagline}"</p>
            <p className="text-sm text-white/50 font-body">{t.footer.location}</p>

            <div className="flex gap-4 mt-6">
              {[
                { Icon: Mail,          label: 'Email',     href: 'mailto:citystroylimited57@gmail.com' },
                { Icon: Instagram,     label: 'Instagram', href: 'https://www.instagram.com/city_stroy_ltd?igsh=MXU2ajl2bDB0bHJqeg%3D%3D&utm_source=qr' },
                { Icon: MessageCircle, label: 'WhatsApp',  href: 'https://wa.me/250784550282' },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="text-white/50 hover:text-accent transition-colors duration-200">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-white/60 hover:text-accent transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">{t.footer.ourServices}</h4>
            <ul className="space-y-2">
              {t.footer.serviceLinks.map((s) => (
                <li key={s}>
                  <Link to="/services" className="font-body text-sm text-white/60 hover:text-accent transition-colors duration-200">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="font-body text-sm text-white/60">+250 784 550 282</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="font-body text-sm text-white/60">Gikondo, Kigali</span>
              </li>
              <li className="flex items-start gap-2">
                <Hash size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="font-body text-sm text-white/60">REG-2023-2015857</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="font-body text-sm text-white/40">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
