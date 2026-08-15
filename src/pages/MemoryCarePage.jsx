import React from 'react';
import ServiceDetail from '@/components/ServiceDetail.jsx';
import { NAP } from '@/lib/site';

const MemoryCarePage = () => (
  <ServiceDetail
    serviceName="Memory Care"
    metaTitle="Memory Care in Hemlock, MI — Dementia & Alzheimer's"
    metaDescription="Dementia and Alzheimer's memory care at Pine Haven in Hemlock — serving Saginaw County, Midland, and Bay City. Small home, RN on staff, structured routines."
    slug="/memory-care"
    eyebrow="Memory Care"
    title="Memory care, in a place that feels familiar"
    subtitle="Specialized support for dementia and Alzheimer's — in a small, calm home where routine, faces, and surroundings stay reassuringly the same."
    heroImage="/images/facility-3.jpg"
    lead={[
      'Pine Haven provides specialized memory care for residents living with dementia, Alzheimer\u2019s disease, frontotemporal dementia, and Lewy Body Dementia. We meet each person where they are \u2014 with patience, structure, and genuine affection.',
      'For someone living with memory loss, environment is everything. A large, busy facility can be confusing and frightening. Our six-bedroom home offers the opposite: a quiet, consistent setting with the same caregivers, the same routines, and the same gentle faces every day.',
    ]}
    sections={[
      {
        heading: 'Care shaped around the person, not the diagnosis',
        image: '/images/facility-7.jpg',
        imageAlt: 'Pine Haven\u2019s on-site alpacas, part of the home\u2019s calming environment',
        body: [
          'No two people experience dementia the same way, so we don\u2019t treat them the same way. Our caregivers learn each resident\u2019s history, preferences, and the rhythms of their day, then build care around them \u2014 from how they like to be woken to which activities bring them comfort.',
          'A registered nurse and LPNs on staff oversee medications and watch closely for the changes that matter in progressive conditions, coordinating with physicians and keeping families informed every step of the way.',
        ],
      },
      {
        heading: 'A calm, secure environment that lowers anxiety',
        body: [
          'Predictability soothes. Familiar meals served at familiar times, a consistent daily structure, and a small, home-scale setting all work together to reduce the agitation and disorientation that come with memory loss.',
          'Our companion animals play a real role here, too. Time spent with the alpacas, llama, sheep, goats, and chickens is calming and grounding \u2014 a simple, wordless source of joy that reaches residents even on harder days.',
        ],
      },
    ]}
    amenities={{
      title: 'How we support residents with memory loss',
      items: [
        'Care for Alzheimer\u2019s & all dementias',
        'Frontotemporal & Lewy Body Dementia',
        'Consistent caregivers & daily routine',
        'Registered nurse & LPNs on staff',
        'Medication management & monitoring',
        'Calm, home-scale environment',
        'Structured, meaningful activities',
        'Animal-assisted comfort',
        'Home-cooked meals & assistance at mealtimes',
        '24-hour supervision and support',
        'Ongoing family communication',
        'Coordination with physicians',
      ],
    }}
    faqs={[
      {
        q: 'What types of memory loss does Pine Haven care for?',
        a: 'We care for residents living with Alzheimer\u2019s disease and other forms of dementia, including frontotemporal dementia and Lewy Body Dementia. Reach out and we can talk through your loved one\u2019s specific needs and whether Pine Haven is the right fit.',
      },
      {
        q: 'How is memory care different from regular assisted living?',
        a: 'Memory care adds specialized support for the cognitive, behavioral, and safety needs that come with dementia \u2014 consistent routines, a secure and calm environment, trained caregivers, and close monitoring \u2014 on top of the everyday help assisted living provides.',
      },
      {
        q: 'Why is a small home better for someone with dementia?',
        a: 'Large facilities can be overwhelming and disorienting for someone with memory loss. Pine Haven\u2019s six-bedroom homes keep the environment small, quiet, and consistent, with the same caregivers and routines each day \u2014 which helps reduce anxiety and confusion.',
      },
      {
        q: 'How much does memory care cost?',
        a: `Cost depends on the level of care your loved one needs. Semi-private rooms start at ${NAP.priceSemiPrivate} per month and private rooms at ${NAP.pricePrivate} per month, financial assistance is available for those who qualify, and we help families apply long-term care insurance and accept the Medicaid waiver. Call ${NAP.phone} for a personalized quote.`,
      },
    ]}
    related={[
      { title: 'Assisted Living', path: '/assisted-living' },
      { title: 'Respite Care', path: '/respite-care' },
      { title: 'Photo Gallery', path: '/gallery' },
    ]}
    ctaTitle="Talk with us about memory care"
  />
);

export default MemoryCarePage;
