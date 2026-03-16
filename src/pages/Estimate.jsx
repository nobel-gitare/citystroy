import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { CheckCircle } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

const projectTypes = ['Residential', 'Commercial', 'Institutional', 'Industrial']
const serviceOptions = [
  'Plumbing & Water Systems',
  'Electrical Installation',
  'HVAC / Air-Conditioning',
  'Fire Fighting System',
  'Building Construction',
  'Roads & Civil Works',
  'Finishing Works',
]
const timelines = [
  { label: 'Urgent', sub: 'Under 1 month' },
  { label: 'Standard', sub: '1 to 3 months' },
  { label: 'Flexible', sub: '3 months or more' },
]

// Rough costing constants (RWF per sqm)
const BASE_RATE = { Residential: 350000, Commercial: 500000, Institutional: 480000, Industrial: 420000 }
const SERVICE_MULT = { 'Plumbing & Water Systems': 0.08, 'Electrical Installation': 0.10, 'HVAC / Air-Conditioning': 0.12, 'Fire Fighting System': 0.07, 'Building Construction': 0.30, 'Roads & Civil Works': 0.15, 'Finishing Works': 0.06 }
const TIMELINE_MULT = { Urgent: 1.2, Standard: 1.0, Flexible: 0.92 }

function calcEstimate(type, services, area, timeline) {
  const base = (BASE_RATE[type] || 400000) * area
  const serviceBonus = services.reduce((sum, s) => sum + (SERVICE_MULT[s] || 0.08) * base, 0)
  const total = (base + serviceBonus) * (TIMELINE_MULT[timeline] || 1.0)
  const low = Math.round(total * 0.85)
  const high = Math.round(total * 1.15)
  return { low, high }
}

function fmt(n) {
  return n.toLocaleString('en-RW')
}

function ProgressBar({ step }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center flex-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${s <= step ? 'bg-accent text-white' : 'bg-mid-gray text-muted'
              }`}
          >
            {s}
          </div>
          {s < 4 && (
            <div
              className={`flex-1 h-1 transition-all duration-300 ${s < step ? 'bg-accent' : 'bg-mid-gray'}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Estimate() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [type, setType] = useState('')
  const [services, setServices] = useState([])
  const [area, setArea] = useState(200)
  const [timeline, setTimeline] = useState('')
  const [done, setDone] = useState(false)

  const toggleService = (s) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  const result = done ? calcEstimate(type, services, area, timeline) : null

  return (
    <>
      <HeroStrip
        title="Get a Free Estimate"
        subtitle="Fill in your project details for an approximate cost range. Final pricing is subject to site assessment."
      />

      <section className="bg-light-gray py-16 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12 }}
                variants={fadeUp}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-card shadow-card p-8"
              >
                <ProgressBar step={step} />

                {step === 1 && (
                  <>
                    <h2 className="font-heading font-semibold text-navy text-xl mb-6">
                      What type of project?
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {projectTypes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setType(t)}
                          className={`p-4 rounded-card border-2 text-left transition-all duration-200 font-body font-medium text-sm ${type === t
                              ? 'border-accent bg-accent/5 text-accent'
                              : 'border-mid-gray text-navy hover:border-accent/50'
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={!type}
                      onClick={() => setStep(2)}
                      className="mt-8 w-full py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="font-heading font-semibold text-navy text-xl mb-6">
                      Which services do you need?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleService(s)}
                          className={`p-3 rounded-card border-2 text-left transition-all duration-200 font-body text-sm ${services.includes(s)
                              ? 'border-accent bg-accent/5 text-accent'
                              : 'border-mid-gray text-navy hover:border-accent/50'
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-2.5 border border-mid-gray text-navy font-medium rounded-btn transition-all duration-200 hover:bg-light-gray text-sm"
                      >
                        ← Back
                      </button>
                      <button
                        disabled={services.length === 0}
                        onClick={() => setStep(3)}
                        className="flex-1 py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                      >
                        Next →
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="font-heading font-semibold text-navy text-xl mb-2">
                      Estimated floor area
                    </h2>
                    <p className="font-body text-muted text-sm mb-6">Drag to set the area in square metres.</p>
                    <div className="text-center mb-4">
                      <span className="font-heading font-extrabold text-navy text-4xl">{area}</span>
                      <span className="font-body text-muted text-lg ml-1">sqm</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={5000}
                      step={10}
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between font-body text-xs text-muted mt-1">
                      <span>20 sqm</span>
                      <span>5,000 sqm</span>
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 py-2.5 border border-mid-gray text-navy font-medium rounded-btn transition-all duration-200 hover:bg-light-gray text-sm"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => setStep(4)}
                        className="flex-1 py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 text-sm"
                      >
                        Next →
                      </button>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className="font-heading font-semibold text-navy text-xl mb-6">
                      What's your timeline?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {timelines.map(({ label, sub }) => (
                        <button
                          key={label}
                          onClick={() => setTimeline(label)}
                          className={`p-4 rounded-card border-2 text-left transition-all duration-200 ${timeline === label
                              ? 'border-accent bg-accent/5'
                              : 'border-mid-gray hover:border-accent/50'
                            }`}
                        >
                          <p className={`font-body font-semibold text-sm ${timeline === label ? 'text-accent' : 'text-navy'}`}>
                            {label}
                          </p>
                          <p className="font-body text-xs text-muted mt-1">{sub}</p>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 py-2.5 border border-mid-gray text-navy font-medium rounded-btn transition-all duration-200 hover:bg-light-gray text-sm"
                      >
                        ← Back
                      </button>
                      <button
                        disabled={!timeline}
                        onClick={() => setDone(true)}
                        className="flex-1 py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                      >
                        Get Estimate
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-card shadow-card p-8 text-center"
              >
                <CheckCircle size={48} className="text-accent mx-auto mb-4" />
                <h2 className="font-heading font-bold text-navy text-2xl mb-2">Your Estimate</h2>
                <p className="font-body text-sm text-muted mb-6">
                  Based on: {type} · {area} sqm · {services.join(', ')} · {timeline}
                </p>

                <div className="bg-accent/5 border border-accent/20 rounded-card p-6 mb-6">
                  <p className="font-body text-sm text-muted mb-1">Estimated Range</p>
                  <p className="font-heading font-extrabold text-accent text-3xl">
                    {fmt(result.low)} – {fmt(result.high)} RWF
                  </p>
                </div>

                <p className="font-body text-xs text-muted leading-relaxed mb-8">
                  This is an approximate estimate based on your inputs. Actual cost depends on site
                  conditions, materials, and detailed scope. Contact us for a confirmed quotation.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => { setDone(false); setStep(1); setType(''); setServices([]); setArea(200); setTimeline('') }}
                    className="flex-1 py-2.5 border border-mid-gray text-navy font-medium rounded-btn transition-all duration-200 hover:bg-light-gray text-sm"
                  >
                    Start Over
                  </button>
                  <button
                    onClick={() => navigate('/book')}
                    className="flex-1 py-2.5 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 text-sm"
                  >
                    Book a Consultation
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
