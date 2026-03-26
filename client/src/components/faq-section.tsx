const faqs = [
  {
    q: 'How do I get a quote?',
    a: 'Use the form on this page or call us at <a href="tel:3348779513">(334) 877-9513</a>. We\'ll ask a few quick questions and provide a transparent, no-obligation estimate \u2014 usually within minutes.',
  },
  {
    q: 'What cleaning products do you use?',
    a: 'We use professional-grade, eco-friendly products that are safe for children, pets, and all surfaces. If you have specific product preferences or allergies, just let us know.',
  },
  {
    q: 'Are your cleaners background-checked?',
    a: 'Yes. Every team member undergoes a thorough background check, is fully insured, and receives ongoing training. Your home is in safe, trusted hands.',
  },
  {
    q: 'What if I\u2019m not satisfied with the cleaning?',
    a: 'We offer a 100% satisfaction guarantee. If anything isn\'t right, contact us within 24 hours and we\'ll re-clean the area at no additional charge.',
  },
  {
    q: 'Do I need to be home during the cleaning?',
    a: 'No. Many clients provide a key, garage code, or lockbox access. We treat every entry with the same care and security protocols, and we lock up when we leave.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Montgomery, Prattville, Millbrook, Wetumpka, Pike Road, Selma, Homewood, Clanton, Alabaster, and surrounding communities. Call us to confirm service in your area.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="faq-section section" aria-labelledby="faq-h2">
      <div className="sm-container">
        <div className="section-intro">
          <div className="section-eyebrow">FAQ</div>
          <h2 id="faq-h2" className="section-title">Common <span className="gold-text">Questions</span></h2>
          <div className="section-divider-line"><span>&mdash; Quick Answers &mdash;</span></div>
        </div>
        <div className="faq-inner">
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details key={i} className="faq-item">
                <summary>{f.q}</summary>
                <p dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
