
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6">
      <div className="container mx-auto px-4 flex justify-end items-center gap-3 text-sm text-slate-500">
        <img 
          src="/lovable-uploads/24ed7179-7b0d-42df-8a4a-ddbf9f214180.png" 
          alt="Gatogordo03 icon" 
          className="h-6 w-6" 
        />
        <span>by Gatogordo03</span>
        <a 
          href="https://github.com/Gatogordo03" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          <Github size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
