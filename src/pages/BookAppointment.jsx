import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { CheckCircle, Phone } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

const projectTypes = [
  'Residential Building',
  'Commercial Building',
  'Institutional Building',
  'Industrial Project',
  'Roads & Civil Works',
  'HVAC / Mechanical',
  'Electrical Works',
  'Fire Fighting System',
  'Other',
]

const inputCls =
  'w-full px-4 py-2.5 rounded-btn border border-mid-gray bg-white font-body text-sm text-navy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200'

export default function BookAppointment() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', company: '', projectType: '',
    date: '', time: '', description: '', file: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const data = new FormData()
    data.append('_subject', 'New Consultation Request — City Stroy Ltd')
    data.append('name', form.name)
    data.append('phone', form.phone)
    data.append('email', form.email)
    data.append('company', form.company)
    data.append('projectType', form.projectType)
    data.append('date', form.date)
    data.append('time', form.time)
    data.append('description', form.description)
    if (form.file) data.append('file', form.file)
    try {
      const res = await fetch('https://formspree.io/f/xvzwwrrk', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
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
      <HeroStrip title="Book a Consultation" subtitle="Schedule a meeting with our team to discuss your project." />

      <section className="bg-light-gray py-16 px-6 min-h-screen">
        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-card shadow-card p-8 space-y-5"
              >
                <h2 className="font-heading font-semibold text-navy text-xl mb-2">Your Details</h2>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Jean Pierre"
                    value={form.name}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+250 7XX XXX XXX"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">
                    Company / Organization <span className="text-muted text-xs">(optional)</span>
                  </label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">
                    Project Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="time"
                      type="time"
                      required
                      value={form.time}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    required
                    placeholder="Briefly describe your project, location, and requirements…"
                    value={form.description}
                    onChange={handleChange}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">
                    Reference File <span className="text-muted text-xs">(PDF or image, optional)</span>
                  </label>
                  <input
                    name="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
                    className="w-full font-body text-sm text-muted file:mr-3 file:py-2 file:px-4 file:rounded-btn file:border-0 file:bg-accent file:text-white file:text-sm file:font-medium file:cursor-pointer hover:file:bg-blue-700 transition-all duration-200"
                  />
                </div>

                {error && (
                  <p className="font-body text-sm text-red-500 text-center">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send Request'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-card shadow-card p-8 text-center"
              >
                <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                <h2 className="font-heading font-bold text-navy text-2xl mb-2">
                  Thank you, {form.name.split(' ')[0]}!
                </h2>
                <p className="font-body text-muted text-sm mb-3">
                  Your request has been received.
                </p>
                <p className="font-body text-sm text-navy mb-6">
                  Our team will contact you within 24 hours.
                </p>
                <div className="flex items-center justify-center gap-2 text-accent">
                  <Phone size={16} />
                  <span className="font-body font-medium text-sm">+250 784 550 282</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
