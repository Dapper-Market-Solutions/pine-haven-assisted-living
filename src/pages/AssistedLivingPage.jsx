import React from 'react';
import ServiceDetail from '@/components/ServiceDetail.jsx';
import { NAP } from '@/lib/site';

const AssistedLivingPage = () => (
  <ServiceDetail
    serviceName="Assisted Living"
    metaTitle="Assisted Living in Hemlock, MI — Small Home, from $3,500/mo"
    metaDescription="Assisted living in Hemlock, MI — small six-bedroom home, RN on staff, home-cooked meals, companion animals. Serving Saginaw, Midland & Bay City. From $3,500/mo."
    slug="/assisted-living"
    eyebrow="Assisted Living"
    title="Assisted living that feels like home"
    subtitle="Help with the everyday things, the freedom to keep living your way — in a real house just outside Saginaw."
    heroImage="/images/facility-2.jpg"
    lead={[
      'Pine Haven\u2019s assisted living gives older adults exactly as much help as they need \u2014 and not a bit of the independence they want to keep. Residents have their own private studios, share home-cooked meals, and have professional staff on hand 24 hours a day.',
      'Because our homes have just six bedrooms, the ratio of care to residents is something a large facility simply can\u2019t match. Our team knows every resident by name, knows how they take their coffee, and knows when something\u2019s a little off.',
    ]}
    sections={[
      {
        heading: 'Daily support, delivered with dignity',
        image: '/images/facility-6.jpg',
        imageAlt: 'A bright, comfortable common room at Pine Haven Assisted Living',
        body: [
          'Some days call for a little help; some days call for more. Our caregivers assist with bathing, dressing, grooming, mobility, and other activities of daily living \u2014 always at the resident\u2019s pace and always with respect.',
          'A registered nurse and LPNs on staff oversee medication management and coordinate with each resident\u2019s physicians, so families have real clinical peace of mind. Emergency call systems in every room mean help is never more than a moment away, around the clock.',
        ],
      },
      {
        heading: 'A full, social life \u2014 not just a safe one',
        image: '/images/facility-4.jpg',
        imageAlt: 'Sun-filled gathering space at Pine Haven',
        body: [
          'Staying mentally, socially, and physically active is what keeps people well. Pine Haven plans daily activities, games, hobby programs, and Bible study, and our sun-filled courtyards and patios invite residents outdoors in good weather.',
          'And then there are the alpacas. Our on-site companion animals \u2014 alpacas, a llama, sheep, goats, and chickens \u2014 give residents something to look forward to, someone to care for, and a daily dose of the calm that only animals seem to bring.',
        ],
      },
    ]}
    amenities={{
      title: 'What\u2019s included at Pine Haven',
      items: [
        'Private studio apartments',
        'Utilities and basic cable TV included',
        'Three home-cooked meals daily',
        'Medication management by an RN',
        '24-hour professional staff',
        'Weekly housekeeping & on-site laundry',
        'Emergency call systems in every room',
        'Planned daily activities & Bible study',
        'Sun-filled courtyards and patios',
        'Scheduled transportation',
        'Landscaping & grounds maintenance',
        'On-site companion animals',
      ],
    }}
    faqs={[
      {
        q: 'What is the difference between assisted living and a nursing home?',
        a: 'Assisted living is for older adults who need help with daily activities \u2014 like meals, medication, bathing, and housekeeping \u2014 but do not require round-the-clock skilled nursing or medical care. Pine Haven offers a homelike assisted living setting with a registered nurse and LPNs on staff, rather than the clinical environment of a nursing home.',
      },
      {
        q: 'How much does assisted living cost at Pine Haven?',
        a: `Semi-private rooms start at ${NAP.priceSemiPrivate} a month and private rooms at ${NAP.pricePrivate} a month \u2014 including housing, meals, utilities, housekeeping, and daily care. Financial assistance is available for those who qualify, and we streamline long-term care insurance and accept the Medicaid waiver. Call ${NAP.phone} for a personalized quote.`,
      },
      {
        q: 'Does Pine Haven accept long-term care insurance or Medicaid?',
        a: 'Yes. We work with families to streamline the long-term care insurance acceptance process, and we accept the Medicaid waiver, so coverage can be applied toward the cost of care.',
      },
      {
        q: 'Can residents bring their own furniture and belongings?',
        a: 'Yes \u2014 we encourage it. Personalizing a private studio with familiar furniture, photos, and keepsakes helps a new place feel like home from day one.',
      },
    ]}
    related={[
      { title: 'Memory Care', path: '/memory-care' },
      { title: 'Respite Care', path: '/respite-care' },
      { title: 'Photo Gallery', path: '/gallery' },
    ]}
    ctaTitle="See assisted living at Pine Haven for yourself"
  />
);

export default AssistedLivingPage;
