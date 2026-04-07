import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

// Calculation keys — always English, never change
const PROJECT_TYPE_KEYS = ['Residential', 'Commercial', 'Institutional', 'Industrial']
const SERVICE_KEYS      = ['Plumbing & Water Systems', 'Electrical Installation', 'HVAC / Air-Conditioning', 'Fire Fighting System', 'Building Construction', 'Roads & Civil Works', 'Finishing Works']
const TIMELINE_KEYS     = ['Urgent', 'Standard', 'Flexible']

const BASE_RATE     = { Residential: 350000, Commercial: 500000, Institutional: 480000, Industrial: 420000 }
const SERVICE_MULT  = { 'Plumbing & Water Systems': 0.08, 'Electrical Installation': 0.10, 'HVAC / Air-Conditioning': 0.12, 'Fire Fighting System': 0.07, 'Building Construction': 0.30, 'Roads & Civil Works': 0.15, 'Finishing Works': 0.06 }
const TIMELINE_MULT = { Urgent: 1.2, Standard: 1.0, Flexible: 0.92 }

function calcEstimate(typeKey, serviceKeys, area, timelineKey) {
  const base = (BASE_RATE[typeKey] || 400000) * area
  const serviceBonus = serviceKeys.reduce((sum, s) => sum + (SERVICE_MULT[s] || 0.08) * base, 0)
  const total = (base + serviceBonus) * (TIMELINE_MULT[timelineKey] || 1.0)
  return { low: Math.round(total * 0.85), high: Math.round(total * 1.15) }
}

function fmt(n) { return n.toLocaleString('en-RW') }

function ProgressBar({ step }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${s <= step ? 'bg-accent text-white' : 'bg-mid-gray text-muted'}`}>{s}</div>
          {s < 4 && <div className={`flex-1 h-1 transition-all duration-300 ${s < step ? 'bg-accent' : 'bg-mid-gray'}`} />}
        </div>
      ))}
    </div>
  )
}

export default function Estimate() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [step, setStep]         = useState(1)
  const [typeKey, setTypeKey]   = useState('')      // English key
  const [services, setServices] = useState([])      // array of SERVICE_KEYS
  const [area, setArea]         = useState(200)
  const [timelineKey, setTimelineKey] = useState('') // English key
  const [done, setDone]         = useState(false)

  const toggleService = (key) =>
    setServices((prev) => prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key])

  const result = done ? calcEstimate(typeKey, services, area, timelineKey) : null

  // Display helpers
  const typeLabel     = (key) => t.estimate.projectTypeLabels[PROJECT_TYPE_KEYS.indexOf(key)] || key
  const serviceLabel  = (key) => t.estimate.serviceLabels[SERVICE_KEYS.indexOf(key)] || key
  const timelineLabel = (i)   => t.estimate.timelines[i]

  return (
    <>
      <HeroStrip title={t.estimate.heroTitle} subtitle={t.estimate.heroSub} />

      <section className="bg-light-gray py-16 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial="hidden" animate="visible" exit={{ opacity: 0, y: -12 }} variants={fadeUp} transition={{ duration: 0.25 }} className="bg-white rounded-card shadow-card p-8">
                <ProgressBar step={step} />

                {step === 1 && (
                  <>
                    <h2 className="font-heading font-semibold text-navy text-xl mb-6">{t.estimate.step1}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {PROJECT_TYPE_KEYS.map((key, i) => (
                        <button key={key} onClick={() => setTypeKey(key)}
                          className={`p-4 rounded-card border-2 text-left transition-all duration-200 font-body font-medium text-sm ${typeKey === key ? 'border-accent bg-accent/5 text-accent' : 'border-mid-gray text-navy hover:border-accent/50'}`}>
                          {t.estimate.projectTypeLabels[i]}
                        </button>
                      ))}
                    </div>
                    <button disabled={!typeKey} onClick={() => setStep(2)}
                      className="mt-8 w-full py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed">
                      {t.estimate.next}
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="font-heading font-semibold text-navy text-xl mb-6">{t.estimate.step2}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_KEYS.map((key, i) => (
                        <button key={key} onClick={() => toggleService(key)}
                          className={`p-3 rounded-card border-2 text-left transition-all duration-200 font-body text-sm ${services.includes(key) ? 'border-accent bg-accent/5 text-accent' : 'border-mid-gray text-navy hover:border-accent/50'}`}>
                          {t.estimate.serviceLabels[i]}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => setStep(1)} className="flex-1 py-2.5 border border-mid-gray text-navy font-medium rounded-btn transition-all duration-200 hover:bg-light-gray text-sm">{t.estimate.back}</button>
                      <button disabled={services.length === 0} onClick={() => setStep(3)} className="flex-1 py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm">{t.estimate.next}</button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="font-heading font-semibold text-navy text-xl mb-2">{t.estimate.step3}</h2>
                    <p className="font-body text-muted text-sm mb-6">{t.estimate.step3Sub}</p>
                    <div className="text-center mb-4">
                      <span className="font-heading font-extrabold text-navy text-4xl">{area}</span>
                      <span className="font-body text-muted text-lg ml-1">{t.estimate.sqm}</span>
                    </div>
                    <input type="range" min={20} max={5000} step={10} value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full" />
                    <div className="flex justify-between font-body text-xs text-muted mt-1">
                      <span>20 {t.estimate.sqm}</span><span>5,000 {t.estimate.sqm}</span>
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => setStep(2)} className="flex-1 py-2.5 border border-mid-gray text-navy font-medium rounded-btn transition-all duration-200 hover:bg-light-gray text-sm">{t.estimate.back}</button>
                      <button onClick={() => setStep(4)} className="flex-1 py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 text-sm">{t.estimate.next}</button>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className="font-heading font-semibold text-navy text-xl mb-6">{t.estimate.step4}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {TIMELINE_KEYS.map((key, i) => {
                        const tl = timelineLabel(i)
                        return (
                          <button key={key} onClick={() => setTimelineKey(key)}
                            className={`p-4 rounded-card border-2 text-left transition-all duration-200 ${timelineKey === key ? 'border-accent bg-accent/5' : 'border-mid-gray hover:border-accent/50'}`}>
                            <p className={`font-body font-semibold text-sm ${timelineKey === key ? 'text-accent' : 'text-navy'}`}>{tl.label}</p>
                            <p className="font-body text-xs text-muted mt-1">{tl.sub}</p>
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => setStep(3)} className="flex-1 py-2.5 border border-mid-gray text-navy font-medium rounded-btn transition-all duration-200 hover:bg-light-gray text-sm">{t.estimate.back}</button>
                      <button disabled={!timelineKey} onClick={() => setDone(true)} className="flex-1 py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm">{t.estimate.getEstimate}</button>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div key="result" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.3 }} className="bg-white rounded-card shadow-card p-8 text-center">
                <CheckCircle size={48} className="text-accent mx-auto mb-4" />
                <h2 className="font-heading font-bold text-navy text-2xl mb-2">{t.estimate.resultHeading}</h2>
                <p className="font-body text-sm text-muted mb-6">
                  {t.estimate.basedOn} {typeLabel(typeKey)} · {area} {t.estimate.sqm} · {services.map(serviceLabel).join(', ')} · {timelineLabel(TIMELINE_KEYS.indexOf(timelineKey)).label}
                </p>

                <div className="bg-accent/5 border border-accent/20 rounded-card p-6 mb-6">
                  <p className="font-body text-sm text-muted mb-1">{t.estimate.rangeLabel}</p>
                  <p className="font-heading font-extrabold text-accent text-3xl">{fmt(result.low)} – {fmt(result.high)} RWF</p>
                </div>

                <p className="font-body text-xs text-muted leading-relaxed mb-8">{t.estimate.disclaimer}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => { setDone(false); setStep(1); setTypeKey(''); setServices([]); setArea(200); setTimelineKey('') }}
                    className="flex-1 py-2.5 border border-mid-gray text-navy font-medium rounded-btn transition-all duration-200 hover:bg-light-gray text-sm">
                    {t.estimate.startOver}
                  </button>
                  <button onClick={() => navigate('/book')} className="flex-1 py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 text-sm">
                    {t.estimate.bookCta}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
