'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';


import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function LandingPage() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [-50, 50, -50],
                y: [-50, 50, -50],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[80%] h-[80%] bg-primary/30 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [50, -50, 50],
                y: [50, -50, 50],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 w-[90%] h-[90%] bg-secondary/20 rounded-full blur-[120px]"
            />
          </div>

          {/* Immersive Background Image */}
          <div className="absolute inset-0 bg-muted/20">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2680&auto=format&fit=crop')] bg-cover bg-center opacity-40 dark:opacity-50 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/30 to-background" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center h-full py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 px-6 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg"
          >
            ✨ AI-Powered Gifting is Here
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8"
          >
            Curate Perfect Gifts <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x py-2">
              for Every Occasion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-3xl mx-auto text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-12 font-medium"
          >
            Say goodbye to generic presents. We help you remember every milestone and suggest thoughtful, personalized gifts your loved ones will actually cherish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
          >
            <Button size="lg" className="w-full sm:w-64 h-16 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-105 group" asChild>
              <Link href="/signup">
                Get Started Free
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3 inline-block"
                >
                  →
                </motion.span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-64 h-16 text-xl font-bold rounded-2xl backdrop-blur-md border-secondary/50 hover:bg-secondary/10 transition-all hover:scale-105" asChild>
              <Link href="#features">
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* Floating Feature Tags */}
          <div className="hidden xl:block">
            <motion.div
              animate={{ y: [0, -30, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-24 top-1/4 p-5 rounded-3xl bg-card/80 border border-primary/20 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl">🎁</div>
                <div className="text-left">
                  <p className="text-sm font-bold">Smart Reminder</p>
                  <p className="text-xs text-muted-foreground">Anniversary in 3 days</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 30, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-24 bottom-1/4 p-5 rounded-3xl bg-card/80 border border-secondary/20 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-2xl">🎯</div>
                <div className="text-left">
                  <p className="text-sm font-bold">Perfect Match</p>
                  <p className="text-xs text-muted-foreground">Curated by AI for you</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-50"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-muted-foreground rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Social Proof Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-12 bg-primary/5 border-y border-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              Trusted by 10,000+ gift curators
            </p>
            <div className="mt-6 flex justify-center items-center gap-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.365-2.446a1 1 0 00-1.175 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">4.9/5 from 2,000+ reviews</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Problem-Solution Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Stop the Gift-Giving Guesswork</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              See how GiftCurator transforms a stressful task into a delightful experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 border rounded-lg bg-card">
              <h3 className="text-2xl font-bold mb-4">😫 Without GiftCurator (The Pain)</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start"><span className="text-red-500 mr-2">&#10007;</span> Forgetting important dates</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">&#10007;</span> Wondering what gift to buy</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">&#10007;</span> Overspending on last-minute gifts</li>
                <li className="flex items-start"><span className="text-red-500 mr-2">&#10007;</span> Last-minute panic and stress</li>
              </ul>
            </div>
            <div className="p-8 border rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
              <h3 className="text-2xl font-bold mb-4">🎉 With GiftCurator (The Solution)</h3>
              <ul className="space-y-4 text-foreground">
                <li className="flex items-start"><span className="text-green-500 mr-2">&#10003;</span> Automated reminders for every occasion</li>
                <li className="flex items-start"><span className="text-green-500 mr-2">&#10003;</span> AI-powered, personalized suggestions</li>
                <li className="flex items-start"><span className="text-green-500 mr-2">&#10003;</span> Smart budget tracking and deals</li>
                <li className="flex items-start"><span className="text-green-500 mr-2">&#10003;</span> Plan ahead and enjoy peace of mind</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        id="features"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -ml-48 -mb-48" />
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Everything You Need for Perfect Gifting</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Our powerful features make gift-giving effortless and enjoyable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-8 rounded-2xl bg-card border border-primary/10 shadow-lg hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300 group">
                <div className={`flex items-center justify-center h-14 w-14 rounded-2xl mb-8 group-hover:scale-110 transition-transform ${i % 2 === 0 ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]' : 'bg-secondary/10 text-secondary shadow-[0_0_20px_rgba(var(--secondary),0.2)]'}`}>
                  {/* Placeholder for icon */}
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Feature {i + 1}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">A brief description of the feature goes here. It should be concise and to the point.</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Get Started in 3 Simple Steps</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Start curating the perfect gifts in minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-8 group">
              <div className="flex items-center justify-center h-20 w-20 rounded-3xl bg-primary text-primary-foreground mx-auto mb-8 text-3xl font-bold shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">1</div>
              <h3 className="text-2xl font-bold mb-4">Add Beneficiaries</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Upload contacts, add manually, or import from Google/LinkedIn. Add preferences and important dates.</p>
            </div>
            <div className="p-8 group">
              <div className="flex items-center justify-center h-20 w-20 rounded-3xl bg-secondary text-secondary-foreground mx-auto mb-8 text-3xl font-bold shadow-xl shadow-secondary/20 group-hover:scale-110 transition-transform">2</div>
              <h3 className="text-2xl font-bold mb-4">Create Events</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Select an occasion, set your budget and frequency, and add a special message.</p>
            </div>
            <div className="p-8 group">
              <div className="flex items-center justify-center h-20 w-20 rounded-3xl bg-primary text-primary-foreground mx-auto mb-8 text-3xl font-bold shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">3</div>
              <h3 className="text-2xl font-bold mb-4">Get Gift Ideas</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Our AI suggests the perfect gifts. Compare prices, buy, or save for later.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Use Case Carousel Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">For Every Moment, Big or Small</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              GiftCurator is perfect for any occasion you want to make special.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-8 border rounded-lg bg-card text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🎂</div>
                <h3 className="text-xl font-bold mb-2">Use Case {i + 1}</h3>
                <p className="text-muted-foreground">A brief description of the use case.</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Loved by Gift-Givers Everywhere</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Don&apos;t just take our word for it. Here&apos;s what our users are saying.
            </p>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                  <div className="p-8 border rounded-lg bg-card h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mr-4">SJ</div>
                      <div>
                        <p className="font-bold">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Busy Mom</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">&quot;GiftCurator saved me from forgetting my mother-in-law&apos;s 60th! The AI suggestions were spot on.&quot;</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.365-2.446a1 1 0 00-1.175 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Find the Perfect Plan</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Choose the plan that&apos;s right for you and start your free trial today.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`p-8 border rounded-2xl bg-card h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col ${i === 1 ? 'border-secondary shadow-secondary/10 relative scale-105 z-10' : 'border-primary/10'}`}>
                {i === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">Plan {i + 1}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$ {10 * (i + 1)}</span>
                  <span className="text-muted-foreground ml-1">/mo</span>
                </div>
                <ul className="space-y-4 text-muted-foreground mb-8 flex-grow">
                  <li className="flex items-start"><span className="text-secondary mr-2 font-bold">&#10003;</span> Feature A</li>
                  <li className="flex items-start"><span className="text-secondary mr-2 font-bold">&#10003;</span> Feature B</li>
                  <li className="flex items-start"><span className="text-secondary mr-2 font-bold">&#10003;</span> Feature C</li>
                </ul>
                <Button className={`w-full h-12 rounded-xl font-bold ${i === 1 ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`} asChild>
                  <Link href="/signup">Choose Plan</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Have questions? We&apos;ve got answers.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-xl font-bold mb-2">Category {i + 1}</h3>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="p-4 border rounded-lg bg-card">
                      <p className="font-semibold">Question {j + 1}?</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Blog/Resources Preview Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">From Our Blog</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Get the latest tips and tricks for thoughtful gifting.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-8 border rounded-lg bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">Blog Post Title {i + 1}</h3>
                <p className="text-muted-foreground">A brief excerpt of the blog post goes here.</p>
                <Button variant="link" className="mt-4">Read More</Button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mobile App Promo Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Take Gifting on the Go</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Download our mobile app and manage your gifts from anywhere.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button>App Store</Button>
            <Button>Google Play</Button>
          </div>
        </div>
      </motion.section>

      {/* Newsletter Signup Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -ml-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -mr-32 -mb-32" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Get Weekly Gift Ideas</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl opacity-90 mb-12">
            No spam, only gift inspiration. Join 5,000+ others getting curated ideas every week.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all" 
            />
            <Button size="lg" className="w-full sm:w-auto px-8 h-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-2xl shadow-xl shadow-black/20 transition-all hover:scale-105">
              Subscribe
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Social</h3>
            <div className="flex gap-4">
              <Link href="#">X</Link>
              <Link href="#">Facebook</Link>
              <Link href="#">Instagram</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GiftCurator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
