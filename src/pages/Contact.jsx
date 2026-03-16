import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { MapPin, Phone, Hash, Clock, Mail, Instagram, MessageCircle, CheckCircle } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

const inputCls =
  'w-full px-4 py-2.5 rounded-btn border border-mid-gray bg-white font-body text-sm text-navy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://formspree.io/f/xvzwwrrk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: 'New Contact Message — City Stroy Ltd', ...form }),
      })
      if (res.ok) setSubmitted(true)
      else setError(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeroStrip title="Contact Us" subtitle="We'd love to hear from you. Reach out and our team will respond promptly." />

      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-heading font-semibold text-navy text-xl mb-6">Send Us a Message</h2>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm text-navy mb-1 block">Name <span className="text-red-500">*</span></label>
                      <input name="name" type="text" required placeholder="Your full name" value={form.name} onChange={handleChange} className={inputCls} />
                    </div>
                    <div>
                      <label className="font-body text-sm text-navy mb-1 block">Email <span className="text-red-500">*</span></label>
                      <input name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">Phone</label>
                    <input name="phone" type="tel" placeholder="+250 7XX XXX XXX" value={form.phone} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">Subject <span className="text-red-500">*</span></label>
                    <input name="subject" type="text" required placeholder="How can we help?" value={form.subject} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">Message <span className="text-red-500">*</span></label>
                    <textarea name="message" rows={5} required placeholder="Tell us about your project or inquiry…" value={form.message} onChange={handleChange} className={`${inputCls} resize-none`} />
                  </div>
                  {error && (
                    <p className="font-body text-sm text-red-500">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  )}
                  <button type="submit" disabled={loading} className="w-full py-3 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="ok"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.3 }}
                  className="bg-light-gray rounded-card p-8 text-center"
                >
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-navy text-xl mb-2">Message Sent!</h3>
                  <p className="font-body text-sm text-muted">
                    Thank you, {form.name.split(' ')[0]}. We'll get back to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — Company Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-light-gray rounded-card p-6 mb-6">
              <h3 className="font-heading font-semibold text-navy text-lg mb-5">City Stroy Ltd</h3>
              <ul className="space-y-4">
                {[
                  { Icon: MapPin, text: 'Gikondo, City of Kigali, Rwanda' },
                  { Icon: Phone, text: '+250 784 550 282' },
                  { Icon: Hash, text: 'REG-2023-2015857' },
                  { Icon: Clock, text: 'Monday–Friday, 8:00 AM – 5:00 PM' },
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon size={18} className="text-accent mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-navy">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div className="mt-6 pt-5 border-t border-mid-gray">
                <p className="font-body text-xs text-muted mb-3">Follow us</p>
                <div className="flex gap-4">
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
                      className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-muted hover:text-accent transition-colors duration-200"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-card overflow-hidden shadow-card" style={{ height: 280 }}>
              <iframe
                title="City Stroy Ltd Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7976.342576046887!2d30.059!3d-1.986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e3c3%3A0x100400ea3b7c4000!2sGikondo%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
