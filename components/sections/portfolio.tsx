'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from '@/components/project-card'
import { ProjectGalleryModal } from '@/components/project-gallery-modal'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    id: 2,
    title: 'Grillo Restaurant',
    description: 'A luxury restaurant project in Saudi Arabia designed with a strong focus on circulation and spatial planning.The layout carefully balances privacy and openness, ensuring smooth movement while maintaining comfortable seating zones.',
    category: 'Commercial',
    thumbnail: '/Project2/1.jpg',
    images: ['/Project2/1.jpg', '/Project2/5.jpg', '/Project2/10.jpg', '/Project2/15.jpg', '/Project2/20.jpg', '/Project2/30.jpg', '/Project2/35.jpg', '/Project2/45+.jpg', '/Project2/50.jpg', '/Project2/55.jpg', '/Project2/60.jpg', '/Project2/65.jpg', '/Project2/70.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-2',
  },
  {
    id: 1,
    title: 'Villa Rooftop',
    description: 'A rooftop retreat designed to reflect the atmosphere of a luxury resort, offering a complete hospitality experience.',
    category: 'Residential',
    thumbnail: '/Project1/1.jpg',
    images: ['/Project1/1.jpg', '/Project1/2.jpg', '/Project1/3.jpg', '/Project1/4.jpg', '/Project1/5.jpg', '/Project1/6.jpg', '/Project1/7.jpg', '/Project1/8.jpg', '/Project1/9.jpg', '/Project1/10.jpg', '/Project1/11.jpg', '/Project1/12.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-1',
  },
  {
    id: 3,
    title: 'Villa Reception',
    description: 'A contemporary luxury majlis designed with a refined neutral palette and sculptural lighting features.The space balances elegance and warmth through custom furniture and layered textures.',
    category: 'Residential',
    thumbnail: '/Project3/1.jpg',
    images: ['/Project3/1.jpg', '/Project3/3.jpg', '/Project3/4.jpg', '/Project3/8.jpg', '/Project3/12.jpg', '/Project3/13.jpg', '/Project3/a.jpg', '/Project3/b.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-3',
  },
  {
    id: 5,
    title: 'Villa Rooftop',
    description: 'The design integrates natural elements through lush greenery and decorative planters, adding freshness and a sense of serenity to the urban rooftop.',
    category: 'Residential',
    thumbnail: '/Project5/000A.jpg',
    images: ['/Project5/000A.jpg', '/Project5/000B.jpg', '/Project5/000C.jpg', '/Project5/000D.jpg', '/Project5/000E.jpg', '/Project5/000F.jpg', '/Project5/000G.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-5',
  },
  {
    id: 8,
    title: 'Chalet Landscape',
    description: 'A chalet garden designed to create a complete sense of privacy and escape.The layout and landscaping were carefully planned to separate users from the outside world while maintaining a refined, resort-inspired atmosphere.',
    category: 'Commercial',
    thumbnail: '/Project4/1.jpg',
    images: ['/Project4/1.jpg', '/Project4/3.jpg', '/Project4/4.jpg', '/Project4/5.jpg', '/Project4/6.jpg', '/Project4/14.jpg', '/Project4/15.jpg', '/Project4/17.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-4',
  },
  {
    id: 7,
    title: 'Living Zone',
    description: 'A sophisticated living space designed in layered dark tones to create depth, contrast, and a bold luxurious atmosphere.Different shades of charcoal, wood, and textured stone were combined to enhance richness and visual interest',
    category: 'Residential',
    thumbnail: '/Project7/1.jpg',
    images: ['/Project7/1.jpg', '/Project7/2.jpg', '/Project7/3.jpg', '/Project7/4.jpg', '/Project7/5.jpg', '/Project7/6.jpg', '/Project7/7.jpg', '/Project7/8.jpg', '/Project7/9.jpg', '/Project7/10.jpg', '/Project7/11.jpg', '/Project7/12.jpg', '/Project7/13.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-7',
  },
  {
    id: 11,
    title: 'Tower Rooftop',
    description: 'Rooftop in a residential tower, designed not only as a entertainment area for residents, but to make real social interaction between them.The true value of this type of project lies in turning space into a way for ',
    category: 'Residential',
    thumbnail: '/Project11/F1.jpg',
    images: ['/Project11/F1.jpg', '/Project11/F2.jpg', '/Project11/F3.jpg', '/Project11/B+.jpg', '/Project11/E+.jpg', '/Project11/O+.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-11',
  },
  {
    id: 6,
    title: 'Living Zone',
    description: 'This interior design concept embraces a refined balance between nature and modern comfort. The space is styled with earthy tones and organic  textures, creating a warm and inviting atmosphere.',
    category: 'Residential',
    thumbnail: '/Project6/1.jpg',
    images: ['/Project6/1.jpg', '/Project6/5.jpg', '/Project6/10.jpg', '/Project6/15.jpg', '/Project6/25.jpg', '/Project6/30.jpg', '/Project6/35.jpg', '/Project6/36.jpg', '/Project6/A.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-6',
  },
  {
    id: 4,
    title: 'Bedroom',
    description: 'A serene bedroom designed with a refined neutral palette and warm natural materials.Wood panels, soft textures, and subtle lighting create a calm and inviting atmosphere.',
    category: 'Residential',
    thumbnail: '/Project8/01.jpg',
    images: ['/Project8/01.jpg', '/Project8/02.jpg', '/Project8/03.jpg', '/Project8/04.jpg', '/Project8/05.jpg', '/Project8/q1.jpg', '/Project8/q2.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-8',
  },



  {
    id: 10,
    title: 'Landscape',
    description: 'A landscape design for a private villa focusing on diverse outdoor seating areas and smooth circulation paths.The layout integrates greenery in a balanced distribution to enhance visual comfort and natural flow. Different textures and elements are combined to create a relaxing and functional outdoor experience.',
    category: 'Residential',
    thumbnail: '/Project10/A.jpg',
    images: ['/Project10/A.jpg', '/Project10/B.jpg', '/Project10/C.jpg', '/Project10/D.jpg', '/Project10/E.jpg', '/Project10/G.jpg', '/Project10/H.jpg', '/Project10/I.jpg', '/Project10/J.jpg', '/Project10/K.jpg', '/Project10/L.jpg', '/Project10/M.jpg', '/Project10/d+.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-10',
  },

  {
    id: 9,
    title: 'Bedroom',
    description: 'A modern bedroom design featuring a dark color palette to create a distinctive and elegant atmosphere.The concept combines different materials and textures within the same tonal range for visual harmony.Lighting elements are carefully integrated to highlight depth and enhance the overall mood.',
    category: 'Residential',
    thumbnail: '/Project9/1.jpg',
    images: ['/Project9/1.jpg', '/Project9/2.jpg', '/Project9/3.jpg', '/Project9/4.jpg', '/Project9/4+.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-9',
  },

  {
    id: 12,
    title: 'Facade Design Collection',
    description: 'A collection of modern facade designs for villas and chalets showcasing different architectural styles and material combinations.The project explores proportions, textures, and lighting to create distinctive and visually appealing exteriors.Each design focuses on balancing aesthetics with functional architectural elements.',
    category: 'Residential',
    thumbnail: '/Project12/001.jpg',
    images: ['/Project12/001.jpg', '/Project12/002.jpg', '/Project12/003.jpg', '/Project12/004.jpg', '/Project12/005.jpg', '/Project12/006.jpg', '/Project12/007.jpg', '/Project12/008.jpg', '/Project12/009.jpg', '/Project12/010.jpg', '/Project12/011.jpg', '/Project12/012.jpg', '/Project12/013.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/project-9',
  },

]

export function Portfolio() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const selectedProject = projects.find(p => p.id === selectedProjectId)

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const handlePrevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNextImage()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevImage()
      } else if (e.key === 'Escape') {
        setSelectedProjectId(null)
      }
    }

    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  return (
    <>
      <section
        id="portfolio"
        className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
        aria-label="Portfolio"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <p className="text-primary font-medium text-lg tracking-widest uppercase">
              Portfolio
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-balance">
              Featured Projects
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
              A selection of interior design projects reflecting diverse design identities.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                imageCount={project.images.length}
                onClick={() => {
                  setSelectedProjectId(project.id)
                  setCurrentImageIndex(0)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedProject && (
        <ProjectGalleryModal
          isOpen={selectedProjectId !== null}
          onClose={() => {
            setSelectedProjectId(null)
            setCurrentImageIndex(0)
          }}
          project={selectedProject}
        />
      )}
    </>
  )
}

