
import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ quote, author, role, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-8 shadow-lg"
    >
      <Quote className="w-10 h-10 text-primary/20 mb-4" />
      <blockquote className="text-card-foreground leading-relaxed mb-6 italic">
        "{quote}"
      </blockquote>
      <div className="border-t border-border pt-4">
        <p className="font-semibold text-card-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
