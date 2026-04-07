import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { CheckCircle, Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

const inputCls =
  'w-full px-4 py-2.5 rounded-btn border border-mid-gray bg-white font-body text-sm text-navy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200'

export default function BookAppointment() {
  const { t } = useLanguage()

  const [form, setForm] = useState({
    name: '', phone: '', email: '', company: '', projectType: '',
    date: '', time: '', description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const data = new FormData()
    data.append('_subject', 'New Consultation Request — City Stroy Ltd')
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    try {
      const res = await fetch('https://formspree.io/f/xvzwwrrk', {
        method: 'POST', headers: { Accept: 'application/json' }, body: data,
      })
      if (res.ok) setSubmitted(true)
      else setError(true)
    } catch { setError(true) }
    finally { setLoading(false) }
  }

  return (
    <>
      <HeroStrip title={t.book.heroTitle} subtitle={t.book.heroSub} />

      <section className="bg-light-gray py-16 px-6 min-h-screen">
        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.3 }}
                onSubmit={handleSubmit} className="bg-white rounded-card shadow-card p-8 space-y-5"
              >
                <h2 className="font-heading font-semibold text-navy text-xl mb-2">{t.book.sectionHeading}</h2>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">{t.book.name} <span className="text-red-500">*</span></label>
                  <input name="name" type="text" required placeholder={t.book.namePlaceholder} value={form.name} onChange={handleChange} className={inputCls} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">{t.book.phone} <span className="text-red-500">*</span></label>
                    <input name="phone" type="tel" required placeholder={t.book.phonePlaceholder} value={form.phone} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">{t.book.email} <span className="text-red-500">*</span></label>
                    <input name="email" type="email" required placeholder={t.book.emailPlaceholder} value={form.email} onChange={handleChange} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">{t.book.company} <span className="text-muted text-xs">{t.book.companyOptional}</span></label>
                  <input name="company" type="text" placeholder={t.book.companyPlaceholder} value={form.company} onChange={handleChange} className={inputCls} />
                </div>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">{t.book.projectType} <span className="text-red-500">*</span></label>
                  <select name="projectType" required value={form.projectType} onChange={handleChange} className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">{t.book.selectType}</option>
                    {t.book.projectTypes.map((pt) => <option key={pt} value={pt}>{pt}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">{t.book.date} <span className="text-red-500">*</span></label>
                    <input name="date" type="date" required value={form.date} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className="font-body text-sm text-navy mb-1 block">{t.book.time} <span className="text-red-500">*</span></label>
                    <input name="time" type="time" required value={form.time} onChange={handleChange} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm text-navy mb-1 block">{t.book.description} <span className="text-red-500">*</span></label>
                  <textarea name="description" rows={4} required placeholder={t.book.descPlaceholder} value={form.description} onChange={handleChange} className={`${inputCls} resize-none`} />
                </div>

                {error && <p className="font-body text-sm text-red-500 text-center">{t.book.error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? t.book.sending : t.book.submit}
                </button>
              </motion.form>
            ) : (
              <motion.div key="success" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.3 }} className="bg-white rounded-card shadow-card p-8 text-center">
                <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                <h2 className="font-heading font-bold text-navy text-2xl mb-2">
                  {t.book.thankYou}, {form.name.split(' ')[0]}!
                </h2>
                <p className="font-body text-muted text-sm mb-3">{t.book.successSub}</p>
                <p className="font-body text-sm text-navy mb-6">{t.book.successContact}</p>
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
