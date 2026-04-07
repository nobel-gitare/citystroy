import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { X, MapPin, Tag, Layers, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const projects = [
  {
    id: 1, name: 'APARWA House', location: 'Gisozi, Kigali', category: 'Institutional',
    contractor: 'Blue Fox Company (Main Contractor)', year: '2024',
    scope: 'Design and installation of plumbing and mechanical systems for the APARWA institutional building. Works included full water supply systems, drainage, and mechanical services.',
    images: ['/images/projects/Aparwa/APARWA_1.jpeg', '/images/projects/Aparwa/APARWA_2.jpeg', '/images/projects/Aparwa/APARWA_3.jpeg', '/images/projects/Aparwa/APARWA_4.jpeg'],
  },
  {
    id: 2, name: 'Rubis Gisenyi Fuel Station', location: 'Gisenyi, Rwanda', category: 'Commercial',
    contractor: 'City Stroy Ltd', year: '2024',
    scope: 'Full construction and MEP works for the Rubis Gisenyi fuel station, including structural works, electrical installation, plumbing systems, fire-fighting systems, and site finishing.',
    images: ['/images/projects/Rubis Gisenyi Station/Rubis1.jpeg', '/images/projects/Rubis Gisenyi Station/Rubis2.jpeg', '/images/projects/Rubis Gisenyi Station/Rubis3.jpeg', '/images/projects/Rubis Gisenyi Station/Rubis4.jpeg', '/images/projects/Rubis Gisenyi Station/Rubis5.jpeg', '/images/projects/Rubis Gisenyi Station/Rubis6.jpeg'],
  },
  {
    id: 3, name: 'Apartment Building — NDANGA SEZIRAHIGA Emmanuel', location: 'Kigali, Rwanda', category: 'Residential',
    contractor: 'Blue Fox Company', year: '2023',
    scope: 'Plumbing & mechanical works execution for a residential apartment building, including potable water supply, drainage, and heating systems.',
    images: ['/images/projects/Apartment building/ndanga1.jpeg', '/images/projects/Apartment building/ndanga2.jpeg', '/images/projects/Apartment building/ndanga3.jpeg', '/images/projects/Apartment building/ndanga4.jpeg', '/images/projects/Apartment building/ndanga5.jpeg', '/images/projects/Apartment building/ndanga6.jpeg'],
  },
  {
    id: 4, name: 'Oxford High School', location: 'Kigali, Rwanda', category: 'Institutional',
    contractor: 'City Stroy Ltd', year: '2024',
    scope: 'Full scope construction and MEP works for Oxford High School, including structural works, electrical installation, plumbing systems, and finishing works across all teaching blocks.',
    images: ['/images/projects/Oxford HighSchool/oxford1.jpeg', '/images/projects/Oxford HighSchool/oxford2.jpeg', '/images/projects/Oxford HighSchool/oxford3.jpeg', '/images/projects/Oxford HighSchool/oxford4.jpeg', '/images/projects/Oxford HighSchool/oxford5.jpeg', '/images/projects/Oxford HighSchool/oxford6.jpeg'],
  },
  {
    id: 5, name: 'Yellowstone Development', location: 'Kigali, Rwanda', category: 'Residential',
    contractor: 'City Stroy Ltd', year: '2024',
    scope: 'End-to-end construction of a large residential development including building works, electrical installations, plumbing systems, interior finishing, and site utilities.',
    images: ['/images/projects/Yellowstone/Yellowstone_1 - Photo.jpg', '/images/projects/Yellowstone/Yellowstone_2 - Photo.jpg', '/images/projects/Yellowstone/Yellowstone_3 - Photo.jpg', '/images/projects/Yellowstone/Yellowstone_4 - Photo.jpg', '/images/projects/Yellowstone/Yellowstone_5 - Photo.jpg', '/images/projects/Yellowstone/Yellowstone_6 - Photo.jpg', '/images/projects/Yellowstone/Yellowstone_7 - Photo.jpg', '/images/projects/Yellowstone/Yellowstone_8 - Photo.jpg', '/images/projects/Yellowstone/Yellowstone_9 - Photo.jpg'],
  },
]

const CATEGORY_KEYS = ['All', 'Residential', 'Commercial', 'Institutional']

const categoryColor = {
  Institutional: 'bg-purple-100 text-purple-700',
  Commercial: 'bg-amber-100 text-amber-700',
  Residential: 'bg-green-100 text-green-700',
}

/* ── Slideshow ───────────────────────────────────────────────────────────── */
function Slideshow({ images, aspect = '56.25%', showArrows = 'hover', rounded = '' }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((next) => { setDir(next > idx ? 1 : -1); setIdx(next) }, [idx])
  const prev = (e) => { e?.stopPropagation(); go((idx - 1 + images.length) % images.length) }
  const next = (e) => { e?.stopPropagation(); go((idx + 1) % images.length) }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  const arrowCls = showArrows === 'hover'
    ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
    : 'opacity-100'

  return (
    <div className={`relative overflow-hidden ${rounded}`} style={{ paddingBottom: aspect }}>
      <AnimatePresence initial={false} custom={dir}>
        <motion.img key={idx} src={images[idx]} alt="" custom={dir} variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent pointer-events-none" />
      {images.length > 1 && (
        <>
          <button onClick={prev} className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow text-navy z-10 ${arrowCls}`} aria-label="Previous image"><ChevronLeft size={16} /></button>
          <button onClick={next} className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow text-navy z-10 ${arrowCls}`} aria-label="Next image"><ChevronRight size={16} /></button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); go(i) }} aria-label={`Image ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${i === idx ? 'bg-white w-4 h-1.5' : 'bg-white/50 w-1.5 h-1.5'}`} />
            ))}
          </div>
          <span className="absolute top-3 right-3 bg-navy/60 text-white text-xs px-2 py-0.5 rounded-full z-10">{idx + 1} / {images.length}</span>
        </>
      )}
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)
  const { t } = useLanguage()

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  const catLabel = (key) => key === 'All' ? t.projects.filterAll : (t.projects.categories[key] || key)

  return (
    <>
      <HeroStrip title={t.projects.heroTitle} subtitle={t.projects.heroSub} />

      {/* Filter Bar */}
      <section className="bg-white border-b border-mid-gray px-6 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {CATEGORY_KEYS.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat ? 'bg-accent text-white' : 'bg-light-gray text-navy hover:bg-mid-gray'
              }`}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="bg-light-gray py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id} layout initial="hidden" animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }} variants={fadeUp}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="bg-white rounded-card shadow-card overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                  onClick={() => setModal(project)}
                >
                  <div className="relative">
                    <Slideshow images={project.images} aspect="56.25%" showArrows="hover" />
                    <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full z-10 ${categoryColor[project.category]}`}>
                      {catLabel(project.category)}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-navy text-base leading-snug mb-2">{project.name}</h3>
                    <div className="flex items-center gap-1 text-muted text-sm">
                      <MapPin size={14} className="text-accent" /><span>{project.location}</span>
                    </div>
                    <p className="font-body text-sm text-muted mt-2 line-clamp-2">{project.scope}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted font-body">{t.projects.noProjects}</div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 px-4 py-8"
            onClick={() => setModal(null)}
          >
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-card shadow-card-hover w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Slideshow images={modal.images} aspect="56.25%" showArrows="always" rounded="rounded-t-card" />
                <button onClick={() => setModal(null)}
                  className="absolute top-3 right-12 bg-white rounded-full p-1 shadow-card text-navy hover:text-accent transition-colors duration-200 z-20"
                  aria-label="Close modal"><X size={20} /></button>
                <span className={`absolute bottom-10 left-3 text-xs font-medium px-2 py-1 rounded-full z-20 ${categoryColor[modal.category]}`}>
                  {catLabel(modal.category)}
                </span>
              </div>

              <div className="p-6">
                <h2 className="font-heading font-bold text-navy text-xl mb-4">{modal.name}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                    <div><p className="font-body text-xs text-muted">{t.projects.modal.location}</p><p className="font-body text-sm text-navy">{modal.location}</p></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Tag size={16} className="text-accent mt-0.5 shrink-0" />
                    <div><p className="font-body text-xs text-muted">{t.projects.modal.year}</p><p className="font-body text-sm text-navy">{modal.year}</p></div>
                  </div>
                  <div className="flex items-start gap-2 col-span-2">
                    <Layers size={16} className="text-accent mt-0.5 shrink-0" />
                    <div><p className="font-body text-xs text-muted">{t.projects.modal.contractor}</p><p className="font-body text-sm text-navy">{modal.contractor}</p></div>
                  </div>
                </div>
                <div className="bg-light-gray rounded-btn p-4 mb-6">
                  <p className="font-body text-xs text-muted mb-1">{t.projects.modal.scope}</p>
                  <p className="font-body text-sm text-navy leading-relaxed">{modal.scope}</p>
                </div>
                <button onClick={() => setModal(null)} className="w-full py-2.5 border border-mid-gray text-navy text-sm font-medium rounded-btn transition-all duration-200 hover:bg-light-gray">
                  {t.projects.modal.back}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
