import { Link } from 'react-router-dom'
import { MapPin, Phone, Hash, Mail, Instagram, MessageCircle } from 'lucide-react'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Estimate', to: '/estimate' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  'Construction',
  'Electrical',
  'Plumbing & HVAC',
  'Fire Fighting',
  'Roads',
  'Finishing Works',
]

export default function Footer() {
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
                style={{
                  height: '48px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Link>
            <p className="text-sm text-white/70 mb-2 font-body leading-relaxed">
              "Let's Build the Future Together!"
            </p>
            <p className="text-sm text-white/50 font-body">Gikondo, City of Kigali, Rwanda</p>

            <div className="flex gap-4 mt-6">
              {[
                { Icon: Mail,          label: 'Email',     href: 'mailto:citystroylimited57@gmail.com' },
                { Icon: Instagram,     label: 'Instagram', href: 'https://www.instagram.com/city_stroy_ltd?igsh=MXU2ajl2bDB0bHJqeg%3D%3D&utm_source=qr' },
                { Icon: MessageCircle, label: 'WhatsApp',  href: 'https://wa.me/250784550282' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 hover:text-accent transition-colors duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm text-white/60 hover:text-accent transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="font-body text-sm text-white/60 hover:text-accent transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contact</h4>
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

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="font-body text-sm text-white/40">
            © 2026 City Stroy Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
