import React from 'react';
import ServiceDetail from '@/components/ServiceDetail.jsx';
import { NAP } from '@/lib/site';

const RespiteCarePage = () => (
  <ServiceDetail
    serviceName="Respite Care"
    metaTitle="Respite Care in Michigan — Short-Term Stays"
    metaDescription="Short-term respite care at Pine Haven in Hemlock, Michigan gives family caregivers a break — for days or weeks. Personal care, meals, and an RN on staff."
    slug="/respite-care"
    eyebrow="Respite Care"
    title="A break for you. Great care for them."
    subtitle="Short-term stays that let family caregivers rest, travel, or recover — knowing their loved one is in warm, capable hands."
    heroImage="/images/facility-5.jpg"
    lead={[
      'Caring for an aging parent or spouse is an act of love \u2014 and it\u2019s exhausting. Pine Haven\u2019s respite care offers much-needed breaks from the daily routine of caregiving, with short-term stays for a few hours, a few days, a few weeks, or longer.',
      'Whether you\u2019re recovering from surgery, taking a long-overdue vacation, or simply need to refill your own cup, your loved one will be welcomed into the same warm home, the same home-cooked meals, and the same attentive care our long-term residents enjoy.',
    ]}
    sections={[
      {
        heading: 'Everything they need, while you step away',
        image: '/images/facility-8.jpg',
        imageAlt: 'Companion animals and warm surroundings at Pine Haven',
        body: [
          'Respite guests receive the full Pine Haven experience: personal care, light housekeeping, meal preparation, medication support, and help with shopping and daily tasks. A registered nurse and LPNs on staff oversee care, so even a short stay comes with real clinical oversight.',
          'It\u2019s also a wonderful, no-pressure way to experience Pine Haven first-hand. Many families use a respite stay to see how their loved one settles in before considering longer-term assisted living or memory care.',
        ],
      },
      {
        heading: 'Caregiver burnout is real \u2014 and preventable',
        body: [
          'Family caregivers who never get a break are at far higher risk of exhaustion, illness, and burnout. Stepping away isn\u2019t a failure; it\u2019s what makes it possible to keep showing up. Respite care exists precisely so you can rest and return as the caregiver your loved one needs.',
          'Stays can be arranged for hours, days, weeks, or longer, depending on availability and your family\u2019s situation. Reach out and we\u2019ll work out the timing together.',
        ],
      },
    ]}
    amenities={{
      title: 'What a respite stay includes',
      items: [
        'Flexible stays \u2014 hours, days, or weeks',
        'Private accommodations',
        'Personal care & assistance',
        'Three home-cooked meals daily',
        'Medication support',
        'Light housekeeping',
        'Meal preparation',
        'Help with shopping & errands',
        'Registered nurse & LPNs on staff',
        'Daily activities & companionship',
        'On-site companion animals',
        '24-hour staff support',
      ],
    }}
    faqs={[
      {
        q: 'What is respite care?',
        a: 'Respite care is short-term care that gives primary family caregivers a temporary break. Your loved one stays at Pine Haven and receives full personal care, meals, and supervision while you rest, travel, work, or recover.',
      },
      {
        q: 'How long can a respite stay last?',
        a: 'Stays are flexible \u2014 from a few hours or days to a few weeks or longer \u2014 depending on your needs and our availability. Call us and we\u2019ll find an arrangement that works for your family.',
      },
      {
        q: 'Can respite care help us decide about long-term care?',
        a: 'Absolutely. Many families use a respite stay as a trial run \u2014 a low-pressure way to see how a loved one settles into Pine Haven before deciding on longer-term assisted living or memory care.',
      },
      {
        q: 'How do we arrange a respite stay?',
        a: `Just call us at ${NAP.phone} or fill out our contact form. We\u2019ll talk through your loved one\u2019s needs, the dates you\u2019re considering, and the cost, and get everything arranged.`,
      },
    ]}
    related={[
      { title: 'Assisted Living', path: '/assisted-living' },
      { title: 'Memory Care', path: '/memory-care' },
      { title: 'Contact Us', path: '/contact' },
    ]}
    ctaTitle="Arrange a respite stay"
  />
);

export default RespiteCarePage;
