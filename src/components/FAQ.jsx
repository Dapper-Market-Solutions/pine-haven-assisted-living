import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Visible FAQ section. Pass the SAME array to faqSchema() in the page's MetaTags
// jsonLd so the structured data mirrors what's on screen (no schema drift).
const FAQ = ({ faqs, title = 'Frequently Asked Questions', heading = 'h2' }) => {
  const Heading = heading;
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">{title}</Heading>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
