
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, description, items, cta, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        {Icon && <Icon className="w-7 h-7 text-primary" />}
      </div>
      <h3 className="text-xl font-semibold text-card-foreground mb-3">{title}</h3>
      {description && (
        <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
      )}
      {Array.isArray(items) && items.length > 0 && (
        <ul className="space-y-2 mb-6 flex-grow">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
      {cta !== false && (
        <div className="mt-auto">
          <Button variant="ghost" className="group p-0 h-auto font-medium text-primary hover:text-primary/80">
            {cta || 'Learn More'}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceCard;
