import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { X, MapPin, Tag, Layers } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const projects = [
  {
    id: 1,
    name: 'APARWA House',
    location: 'Gisozi, Kigali',
    category: 'Institutional',
    contractor: 'Blue Fox Company (Main Contractor)',
    scope: 'Design and installation of plumbing and mechanical systems for the APARWA institutional building. Works included full water supply systems, drainage, and mechanical services.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
  },
  {
    id: 2,
    name: 'Commercial Building — SEBIKWEKWE Cyprien',
    location: 'Kigali, Rwanda',
    category: 'Commercial',
    contractor: 'Blue Fox Company',
    scope: 'Full plumbing & mechanical works execution for a multi-floor commercial building. Scope covered cold and hot water systems, drainage, and sanitary fixtures installation.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=80',
  },
  {
    id: 3,
    name: 'Apartment Building — NDANGA SEZIRAHIGA Emmanuel',
    location: 'Kigali, Rwanda',
    category: 'Residential',
    contractor: 'Blue Fox Company',
    scope: 'Plumbing & mechanical works execution for a residential apartment building, including potable water supply, drainage, and heating systems.',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
  },
]

const categories = ['All', 'Residential', 'Commercial', 'Institutional']

const categoryColor = {
  Institutional: 'bg-purple-100 text-purple-700',
  Commercial: 'bg-amber-100 text-amber-700',
  Residential: 'bg-green-100 text-green-700',
}

export default function Projects() {
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <HeroStrip title="Our Work" subtitle="A portfolio of projects reflecting our expertise and commitment to quality." />

      {/* Filter Bar */}
      <section className="bg-white border-b border-mid-gray px-6 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${active === cat
                  ? 'bg-accent text-white'
                  : 'bg-light-gray text-navy hover:bg-mid-gray'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="bg-light-gray py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  variants={fadeUp}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="bg-white rounded-card shadow-card overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                  onClick={() => setModal(project)}
                >
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${categoryColor[project.category]}`}
                    >
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-navy text-base leading-snug mb-2">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted text-sm">
                      <MapPin size={14} className="text-accent" />
                      <span>{project.location}</span>
                    </div>
                    <p className="font-body text-sm text-muted mt-2 line-clamp-2">{project.scope}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted font-body">No projects found.</div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 px-4 py-8"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-card shadow-card-hover w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <img
                  src={modal.image}
                  alt={modal.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  onClick={() => setModal(null)}
                  className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-card text-navy hover:text-accent transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
                <span
                  className={`absolute bottom-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${categoryColor[modal.category]}`}
                >
                  {modal.category}
                </span>
              </div>

              <div className="p-6">
                <h2 className="font-heading font-bold text-navy text-xl mb-4">{modal.name}</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-xs text-muted">Location</p>
                      <p className="font-body text-sm text-navy">{modal.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Tag size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-xs text-muted">Year</p>
                      <p className="font-body text-sm text-navy">{modal.year}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 col-span-2">
                    <Layers size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-xs text-muted">Main Contractor</p>
                      <p className="font-body text-sm text-navy">{modal.contractor}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-light-gray rounded-btn p-4 mb-6">
                  <p className="font-body text-xs text-muted mb-1">Scope of Work</p>
                  <p className="font-body text-sm text-navy leading-relaxed">{modal.scope}</p>
                </div>

                <button
                  onClick={() => setModal(null)}
                  className="w-full py-2.5 border border-mid-gray text-navy text-sm font-medium rounded-btn transition-all duration-200 hover:bg-light-gray"
                >
                  ← Back to Projects
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
