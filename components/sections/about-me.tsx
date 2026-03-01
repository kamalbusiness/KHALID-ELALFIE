'use client'

import { Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function AboutMe() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section
      id="about-me"
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 flex items-center"
      aria-label="About me with portrait and biography"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Bio Content - Full Width */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat mb-3 sm:mb-4">
                About <span className="text-accent">Me</span>
              </h2>
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-accent to-primary"
                initial={{ width: 0 }}
                animate={inView ? { width: 80 } : { width: 0 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div
              className="space-y-6 text-foreground/80 text-base sm:text-lg leading-relaxed"
            >
              <motion.p variants={itemVariants}>
                Design Lead and Interior Designer with 8+ years of experience creating high-quality, photorealistic renders for premium residential and commercial projects. KSE-registered supervision engineer with expertise in space planning, technical drawings, leading 3D visualization teams, and site coordination.
              </motion.p>

              {/* <motion.p variants={itemVariants}>
                My work focuses on space planning, furniture layouts, circulation flow, and mood boards that connect materials, colors, and atmosphere with the client's lifestyle and the overall vision for the space. My goal is to create interiors that feel elegant, functional, and comfortable.
              </motion.p> */}

              <motion.div variants={itemVariants} className="space-y-3 pt-4">
                <p className="font-semibold text-foreground">Areas of Expertise:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>High-End Photorealistic 3D Visualization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Strategic Interior Design Solutions & Problem Solving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Advanced Space Planning & Functional Layout Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Technical Drawing Review & Detailing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>3D Visualization Team Leadership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Design Presentation & Client Communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Site Supervision & Coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Project Coordination & Design Management</span>
                  </li>
                </ul>
              </motion.div>
              {/* CV Download Button */}
              <motion.a
                href="/cv.pdf"
                download="Khalid_Elalfie_CV.pdf"
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
