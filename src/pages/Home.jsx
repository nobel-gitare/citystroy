import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2, Zap, Droplets, Flame, Wind,
  Route, HardHat, PaintBucket, Wrench,
  ChevronDown, ArrowRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const services = [
  {
    Icon: Building2,
    name: 'Construction of Buildings',
    desc: 'Residential, commercial & institutional builds to international standards.',
  },
  {
    Icon: Zap,
    name: 'Electrical Installation',
    desc: 'Full electrical design, wiring, panel installation & commissioning.',
  },
  {
    Icon: Droplets,
    name: 'Plumbing, Heating & A/C',
    desc: 'End-to-end plumbing and HVAC for multistory buildings.',
  },
  {
    Icon: Flame,
    name: 'Fire Fighting Systems',
    desc: 'Fire suppression & detection systems meeting safety regulations.',
  },
  {
    Icon: Wind,
    name: 'HVAC Systems',
    desc: 'Energy-efficient air handling and climate control installations.',
  },
  {
    Icon: Route,
    name: 'Roads & Civil Works',
    desc: 'Road construction, drainage & related civil engineering.',
  },
  {
    Icon: HardHat,
    name: 'Demolition & Site Prep',
    desc: 'Safe demolition, excavation & site clearing before new builds.',
  },
  {
    Icon: PaintBucket,
    name: 'Specialized Finishing',
    desc: 'Interior finishing, tiling, painting & structural finishing works.',
  },
  {
    Icon: Wrench,
    name: 'Utility Projects',
    desc: 'Water supply, sewage & utility infrastructure engineering.',
  },
]

const projects = [
  {
    id: 1,
    name: 'APARWA House',
    location: 'Gisozi, Kigali',
    category: 'Institutional',
    scope: 'Plumbing & Mechanical Systems',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: 2,
    name: 'Commercial Building — SEBIKWEKWE Cyprien',
    location: 'Kigali, Rwanda',
    category: 'Commercial',
    scope: 'Plumbing & Mechanical Works',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
  },
  {
    id: 3,
    name: 'Apartment Building — NDANGA SEZIRAHIGA Emmanuel',
    location: 'Kigali, Rwanda',
    category: 'Residential',
    scope: 'Plumbing & Mechanical Works',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
]

const stats = [
  { value: '2023', label: 'Registered' },
  { value: '3+', label: 'Projects Completed' },
  { value: 'Kigali, Rwanda', label: 'Location' },
  { value: 'International', label: 'Standard' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(27,42,74,0.75) 0%, rgba(27,42,74,0.4) 100%),
            url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-3xl"
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            Let's Build the Future Together!
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-white/70 font-body text-lg md:text-xl max-w-2xl mx-auto"
          >
            City Stroy Ltd is Rwanda's trusted partner for mechanical, electrical, civil, and
            construction engineering — delivering precision from start to finish.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/estimate')}
              className="px-6 py-3 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700"
            >
              Get a Free Estimate
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 border-2 border-white text-white font-medium rounded-btn transition-all duration-200 hover:bg-white hover:text-navy"
            >
              View Our Projects
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 text-white/60"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section className="bg-white border-b border-mid-gray">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="font-heading font-extrabold text-navy text-3xl">{value}</p>
              <p className="font-body text-sm text-muted mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services Overview ──────────────────────────────── */}
      <section className="bg-light-gray py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <h2 className="font-heading font-semibold text-navy text-2xl md:text-3xl">
              What We Do
            </h2>
            <p className="font-body text-muted mt-2 max-w-xl mx-auto">
              Comprehensive engineering and construction services tailored to your needs.
            </p>
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
                className="bg-white rounded-card shadow-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover cursor-pointer"
                onClick={() => navigate('/services')}
              >
                <Icon size={24} className="text-accent mb-3" />
                <h3 className="font-heading font-semibold text-navy text-base mb-1">{name}</h3>
                <p className="font-body text-sm text-muted">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ──────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="font-heading font-semibold text-navy text-2xl md:text-3xl">
                Recent Work
              </h2>
              <p className="font-body text-muted mt-2">A glimpse of what we've delivered.</p>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="hidden md:flex items-center gap-1 text-accent font-medium text-sm hover:underline"
            >
              View all <ArrowRight size={16} />
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
                className="group bg-white rounded-card shadow-card overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover cursor-pointer"
                onClick={() => navigate('/projects')}
              >
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <img
                    src={image}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
                    {category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-navy text-base leading-snug">{name}</h3>
                  <p className="font-body text-sm text-muted mt-1">{scope}</p>
                  <p className="font-body text-xs text-muted mt-1">{location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex md:hidden justify-center mt-6">
            <button
              onClick={() => navigate('/projects')}
              className="flex items-center gap-1 text-accent font-medium text-sm hover:underline"
            >
              View all projects <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="bg-navy py-16 px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-heading font-bold text-white text-2xl md:text-3xl">
            Ready to start your project?
          </h2>
          <p className="font-body text-white/60 mt-3 text-sm">
            Our team is available Monday–Friday, 8AM–5PM
          </p>
          <button
            onClick={() => navigate('/book')}
            className="mt-6 px-6 py-3 bg-accent text-white font-medium rounded-btn transition-all duration-200 hover:bg-blue-700"
          >
            Book a Consultation
          </button>
        </motion.div>
      </section>
    </>
  )
}
