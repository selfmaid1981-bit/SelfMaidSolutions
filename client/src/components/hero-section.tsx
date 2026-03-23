import heroLogo from '@assets/hero-logo-transparent.png';
import { GoldParticles } from './gold-particles';
import { getRotatingSubtext, getRotatingTrustSignals } from '@/lib/dynamic-content';
import { Shield, CheckCircle, Clock, Star, Heart, Leaf, Zap, Award } from 'lucide-react';

const iconMap: Record<string, typeof Shield> = { shield: Shield, check: CheckCircle, clock: Clock, star: Star, heart: Heart, leaf: Leaf, zap: Zap, award: Award };

export function HeroSection() {
  const subtext = getRotatingSubtext();
  const trustSignals = getRotatingTrustSignals(3);

  return (
    <section className="hero-section">
      <GoldParticles />
      <div className="hero-container">
        <div className="hero-content">
          <h1>Spotless Homes.<br />Zero Stress.</h1>
          <p className="hero-subtext">
            {subtext}
          </p>
          <ul className="hero-trust">
            <li>&#10004; Licensed, bonded, and insured</li>
            <li>&#10004; 100% satisfaction guaranteed</li>
            <li>&#10004; Serving Montgomery, AL & surrounding areas</li>
          </ul>
          <div className="hero-actions">
            <a
              href="#instant-quote"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('instant-quote');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hero-outline-btn"
              data-testid="hero-get-quote"
            >
              GET A QUOTE
            </a>
            <a href="tel:334-877-9513" className="hero-phone">
              Or Call (334) 877-9513
            </a>
          </div>

          <div className="hero-trust-signals">
            {trustSignals.map((signal) => {
              const Icon = iconMap[signal.icon] || Shield;
              return (
                <span key={signal.text} className="hero-trust-signal">
                  <Icon className="w-3.5 h-3.5" style={{ color: '#f5c542' }} />
                  {signal.text}
                </span>
              );
            })}
          </div>
        </div>

        <div className="hero-image">
          <img
            src={heroLogo}
            alt="Self-Maid Cleaning Solutions"
          />
        </div>
      </div>
    </section>
  );
}
