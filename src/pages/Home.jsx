import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2, Zap, Droplets, Flame, Wind,
  Route, HardHat, PaintBucket, Wrench,
  ChevronDown, ArrowRight, MapPin,
  BadgeCheck, Award, Clock, Shield, Layers, Users,
  Quote,
} from 'lucide-react'

/* ─── Animation helpers ──────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

function SectionHeading({ label, subtitle, center = false }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      <h2 className="font-heading font-bold text-navy text-2xl md:text-3xl">{label}</h2>
      <div className={`mt-3 w-12 h-1 bg-accent rounded-full ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`font-body text-muted mt-4 max-w-xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ─── Animated counter ───────────────────────────────────── */
function AnimatedCount({ target, suffix = '', duration = 1600, startFrom }) {
  const [count, setCount] = useState(startFrom ?? 0)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) setTriggered(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [triggered])

  useEffect(() => {
    if (!triggered) return
    const from = startFrom ?? 0
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(from + (target - from) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, target, duration, startFrom])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Data ───────────────────────────────────────────────── */
const stats = [
  { id: 'year', numeric: true, target: 2023, startFrom: 2010, label: 'Year Founded' },
  { id: 'proj', numeric: true, target: 3, suffix: '+', label: 'Projects Delivered' },
  { id: 'loc', numeric: false, display: 'Kigali', label: 'Based In' },
  { id: 'std', numeric: false, display: 'Intl.', label: 'Quality Standard' },
]

const services = [
  { Icon: Building2, name: 'Construction of Buildings', desc: 'Residential, commercial & institutional builds to international standards.' },
  { Icon: Zap, name: 'Electrical Installation', desc: 'Full electrical design, wiring, panel installation & commissioning.' },
  { Icon: Droplets, name: 'Plumbing, Heating & A/C', desc: 'End-to-end plumbing and HVAC for multistory buildings.' },
  { Icon: Flame, name: 'Fire Fighting Systems', desc: 'Fire suppression & detection systems meeting safety regulations.' },
  { Icon: Wind, name: 'HVAC Systems', desc: 'Energy-efficient air handling and climate control installations.' },
  { Icon: Route, name: 'Roads & Civil Works', desc: 'Road construction, drainage & related civil engineering.' },
  { Icon: HardHat, name: 'Demolition & Site Prep', desc: 'Safe demolition, excavation & site clearing before new builds.' },
  { Icon: PaintBucket, name: 'Specialized Finishing', desc: 'Interior finishing, tiling, painting & structural finishing works.' },
  { Icon: Wrench, name: 'Utility Projects', desc: 'Water supply, sewage & utility infrastructure engineering.' },
]

const projects = [
  { id: 1, name: 'APARWA House', location: 'Gisozi, Kigali', category: 'Institutional', scope: 'Plumbing & Mechanical Systems', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: 2, name: 'Commercial Building — SEBIKWEKWE Cyprien', location: 'Kigali, Rwanda', category: 'Commercial', scope: 'Plumbing & Mechanical Works', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80' },
  { id: 3, name: 'Apartment Building — NDANGA SEZIRAHIGA Emmanuel', location: 'Kigali, Rwanda', category: 'Residential', scope: 'Plumbing & Mechanical Works', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
]

const whyUs = [
  { Icon: BadgeCheck, title: 'RDB Registered', desc: 'Officially registered with Rwanda Development Board — REG-2023-2015857.' },
  { Icon: Award, title: 'International Standards', desc: 'All engineering works comply with recognised international quality standards.' },
  { Icon: Clock, title: 'On-Time Delivery', desc: 'Disciplined project management to meet every agreed milestone and deadline.' },
  { Icon: Users, title: 'Expert Engineering Team', desc: 'Certified professionals across mechanical, electrical, and civil disciplines.' },
  { Icon: Shield, title: 'Safety-First Culture', desc: 'Rigorous on-site safety protocols on every project, every single day.' },
  { Icon: Layers, title: 'End-to-End Management', desc: 'From design and procurement through to handover and aftercare.' },
]

const testimonials = [
  { quote: 'City Stroy Ltd delivered our plumbing systems ahead of schedule and with exceptional quality. Their professionalism set them apart from everyone else we considered.', author: 'Emmanuel N.', role: 'Building Owner, Kigali' },
  { quote: 'The HVAC installation was handled with real expertise. Communication throughout the project was clear, consistent, and reliable — exactly what we needed.', author: 'Sarah K.', role: 'Facility Manager, Kigali' },
  { quote: 'From site preparation all the way to finishing, every stage was managed efficiently. We would not hesitate to recommend City Stroy Ltd to any developer in Rwanda.', author: 'Jean-Pierre M.', role: 'Property Developer, Rwanda' },
]

const partners = ['Blue Fox Company', 'City of Kigali', 'Rwanda Dev. Board', 'Ministry of Infra.', 'REG Rwanda']

/* ─── Component ──────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      {/* ── Hero (transparent navbar overlays top) ───────── */}
      <section
        className="relative -mt-16 min-h-screen flex flex-col justify-center items-center text-center px-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(27,42,74,0.82) 0%, rgba(27,42,74,0.45) 55%, rgba(27,42,74,0.72) 100%),
            url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
          className="max-w-3xl"
        >
          {/* Pill badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 font-body text-sm px-4 py-1.5 rounded-full mb-6"
          >
            <MapPin size={13} className="text-accent" />
            Kigali, Rwanda &nbsp;·&nbsp; Est. 2023
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            Let's Build the Future Together!
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-white/70 font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            City Stroy Ltd is Rwanda's trusted partner for mechanical, electrical, civil, and
            construction engineering — delivering precision from start to finish.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/estimate')}
              className="px-7 py-3 bg-accent text-white font-body font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
            >
              Get a Free Estimate
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="px-7 py-3 border-2 border-white/70 text-white font-body font-medium rounded-btn transition-all duration-200 hover:bg-white hover:text-navy"
            >
              View Our Projects
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-8 text-white/50"
        >
          <ChevronDown size={30} />
        </motion.div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <section className="bg-white border-b border-mid-gray">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-mid-gray">
          {stats.map(({ id, numeric, target, suffix, startFrom, display, label }) => (
            <motion.div
              key={id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.3 }}
              className="text-center px-4"
            >
              <p className="font-heading font-extrabold text-navy text-3xl md:text-4xl">
                {numeric
                  ? <AnimatedCount target={target} suffix={suffix} startFrom={startFrom} />
                  : display}
              </p>
              <p className="font-body text-sm text-muted mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services Overview ────────────────────────────── */}
      <section className="bg-light-gray py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.3 }}>
            <SectionHeading label="What We Do" subtitle="Comprehensive engineering and construction services tailored to your project." center />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ Icon, name, desc }, i) => (
              <motion.div
                key={name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group bg-white rounded-card shadow-card p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
                onClick={() => navigate('/services')}
              >
                <div className="w-11 h-11 rounded-lg bg-blue-50 group-hover:bg-accent flex items-center justify-center mb-4 transition-all duration-200">
                  <Icon size={20} className="text-accent group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-heading font-semibold text-navy text-base mb-1">{name}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.3 }}>
            <SectionHeading label="Why Choose Us" subtitle="Certified expertise, international standards, and genuine commitment to every project." center />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex gap-4 p-6 bg-light-gray rounded-card"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-navy text-base mb-1">{title}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      <section className="bg-light-gray py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className="flex items-end justify-between"
          >
            <SectionHeading label="Recent Work" subtitle="A glimpse of what we've delivered across Kigali." />
            <button
              onClick={() => navigate('/projects')}
              className="hidden md:flex items-center gap-1 text-accent font-body font-medium text-sm hover:underline mb-10"
            >
              View all <ArrowRight size={15} />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(({ id, name, location, category, scope, image }, i) => (
              <motion.div
                key={id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="group bg-white rounded-card shadow-card overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
                onClick={() => navigate('/projects')}
              >
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <img
                    src={image}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-accent text-white text-xs font-body font-medium px-2.5 py-1 rounded-full">
                    {category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-navy text-base leading-snug">{name}</h3>
                  <p className="font-body text-sm text-muted mt-1">{scope}</p>
                  <p className="font-body text-xs text-muted mt-1.5 flex items-center gap-1">
                    <MapPin size={11} /> {location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex md:hidden justify-center mt-6">
            <button onClick={() => navigate('/projects')} className="flex items-center gap-1 text-accent font-body font-medium text-sm hover:underline">
              View all projects <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.3 }} className="text-center mb-10">
            <h2 className="font-heading font-bold text-white text-2xl md:text-3xl">What Our Clients Say</h2>
            <div className="mt-3 w-12 h-1 bg-accent rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, author, role }, i) => (
              <motion.div
                key={author}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-card p-6 flex flex-col gap-4"
              >
                <Quote size={22} className="text-accent" />
                <p className="font-body text-white/80 text-sm leading-relaxed flex-1 italic">
                  "{quote}"
                </p>
                <div className="pt-3 border-t border-white/10">
                  <p className="font-heading font-semibold text-white text-sm">{author}</p>
                  <p className="font-body text-white/50 text-xs mt-0.5">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted Partners ──────────────────────────────── */}
      <section className="bg-white py-10 px-6 border-b border-mid-gray">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className="font-body text-xs text-muted uppercase tracking-widest text-center mb-6"
          >
            Trusted Partners &amp; Clients
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {partners.map((p) => (
              <div key={p} className="px-6 py-2.5 bg-light-gray text-navy font-body font-medium text-sm rounded-btn border border-mid-gray">
                {p}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="bg-light-gray py-16 px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-heading font-bold text-navy text-2xl md:text-3xl">
            Ready to start your project?
          </h2>
          <p className="font-body text-muted mt-3 text-sm">
            Our team is available Monday–Friday, 8 AM – 5 PM
          </p>
          <button
            onClick={() => navigate('/book')}
            className="mt-6 px-8 py-3 bg-accent text-white font-body font-medium rounded-btn transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
          >
            Book a Consultation
          </button>
        </motion.div>
      </section>
    </>
  )
}
