import { Link } from 'react-router-dom'
import { MapPin, Phone, Hash, Linkedin, Facebook, Instagram, MessageCircle } from 'lucide-react'

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
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-btn bg-accent flex items-center justify-center shrink-0">
                <span className="text-white font-heading font-bold text-sm">CS</span>
              </div>
              <span className="font-heading font-bold text-white text-lg">City Stroy Ltd</span>
            </div>
            <p className="text-sm text-white/70 mb-2 font-body leading-relaxed">
              "Let's Build the Future Together!"
            </p>
            <p className="text-sm text-white/50 font-body">Gikondo, City of Kigali, Rwanda</p>

            <div className="flex gap-4 mt-6">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: MessageCircle, label: 'WhatsApp' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-white/50 hover:text-accent transition-colors duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 */}
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

          {/* Column 3 */}
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

          {/* Column 4 */}
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
