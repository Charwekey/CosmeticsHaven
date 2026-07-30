'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Award, ShieldCheck, Heart, MapPin, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="glass-panel rounded-3xl p-8 sm:p-14 text-center space-y-4 border border-white/90 shadow-lg relative overflow-hidden">
        <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-amber-900 border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Established in Accra, Ghana</span>
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-stone-900 leading-tight">
          The Cosmetics Haven Story
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Celebrating African elegance, natural botanical science, and haute-couture beauty formulations tailored specifically for rich melanin skin.
        </p>
      </div>

      {/* Grid Story & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-700">Our Mission</span>
          <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">
            Nourishing Glow From Northern Ghana to the World
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Founded with a passion to redefine luxury cosmetics across West Africa, Cosmetics Haven partners directly with female shea butter cooperatives in Northern Ghana and international cosmetic chemists in Accra.
          </p>
          <p className="text-stone-600 text-sm leading-relaxed">
            Every product in our boutique — from our vitamin C serums infused with Baobab oil to transfer-proof liquid lipsticks — is cruelty-free, dermatologically tested, and packaged with sustainable elegance.
          </p>
        </div>

        <div className="glass-floating-3d rounded-3xl overflow-hidden shadow-xl border border-white/90 aspect-video sm:aspect-square">
          <img
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
            alt="Beauty Botanicals"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-6 space-y-3 border border-white/80 shadow-md">
          <Award className="w-8 h-8 text-amber-600" />
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Certified Quality</h3>
          <p className="text-stone-600 text-xs leading-relaxed">
            Strict quality assurance and FDA-compliant ingredient standards for safe skin results.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 space-y-3 border border-white/80 shadow-md">
          <Heart className="w-8 h-8 text-amber-600" />
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Ethical Sourcing</h3>
          <p className="text-stone-600 text-xs leading-relaxed">
            Supporting local Ghanaian women farming communities with fair-trade shea butter sourcing.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 space-y-3 border border-white/80 shadow-md">
          <ShieldCheck className="w-8 h-8 text-amber-600" />
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Accra Boutique Experience</h3>
          <p className="text-stone-600 text-xs leading-relaxed">
            Visit our physical locations in Oxford Street, Osu and Lagos Avenue, East Legon.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card-dark rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-amber-500/30">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-amber-100">
          Experience Pure Ghanaian Beauty
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto">
          Visit our boutique or order online for same-day Accra express delivery.
        </p>
        <Link
          href="/shop"
          className="gold-gradient-btn px-8 py-3.5 rounded-xl text-xs font-bold inline-flex items-center gap-2"
        >
          Explore Shop <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
