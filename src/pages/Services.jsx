import { motion } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import {
  Building2, Zap, Droplets, Flame, Route, HardHat, PaintBucket, Wrench,
} from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const services = [
  {
    Icon: Building2,
    name: 'Construction of Buildings',
    desc: 'Design and construction of residential, commercial, and institutional buildings to international standards. We manage the full project lifecycle from concept and planning through execution and handover.',
  },
  {
    Icon: Zap,
    name: 'Electrical Installation',
    desc: 'Full electrical systems design, wiring, panel installation, and commissioning for all building types. Our engineers ensure safe, code-compliant installations for every project.',
  },
  {
    Icon: Droplets,
    name: 'Plumbing, Heating & Air-Conditioning',
    desc: 'End-to-end plumbing systems, hot water supply, and HVAC installation for multistory buildings. We design and install robust systems that meet performance and efficiency standards.',
  },
  {
    Icon: Flame,
    name: 'Fire Fighting Systems',
    desc: 'Design and installation of fire suppression and detection systems compliant with all applicable safety regulations. We protect lives and assets through expert fire engineering.',
  },
  {
    Icon: Route,
    name: 'Roads & Civil Works',
    desc: 'Infrastructure works including road construction, drainage, earthworks, and related civil engineering. We deliver durable solutions for urban and peri-urban environments.',
  },
  {
    Icon: HardHat,
    name: 'Demolition & Site Preparation',
    desc: 'Safe demolition, excavation, and site clearing ahead of new construction. Our team follows strict safety protocols to minimise disruption and hazards.',
  },
  {
    Icon: PaintBucket,
    name: 'Specialized Finishing Works',
    desc: 'Interior finishing, tiling, painting, and specialized structural works. We deliver premium finishes that complete a project and exceed client expectations.',
  },
  {
    Icon: Wrench,
    name: 'Utility Projects',
    desc: 'Water supply, sewage, and utility infrastructure engineering. We design and install utility systems that support sustainable urban development.',
  },
]

export default function Services() {
  return (
    <>
      <HeroStrip title="Our Services" subtitle="Comprehensive engineering and construction solutions across all sectors." />

      <div>
        {services.map(({ Icon, name, desc }, i) => (
          <motion.section
            key={name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className={`py-16 px-6 ${i % 2 === 0 ? 'bg-white' : 'bg-light-gray'}`}
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-card bg-accent/10 flex items-center justify-center">
                  <Icon size={32} className="text-accent" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-heading font-semibold text-navy text-xl md:text-2xl mb-3">
                  {name}
                </h2>
                <p className="font-body text-base text-navy/70 leading-relaxed max-w-2xl">{desc}</p>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <span className="font-heading font-extrabold text-7xl text-mid-gray select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </>
  )
}
