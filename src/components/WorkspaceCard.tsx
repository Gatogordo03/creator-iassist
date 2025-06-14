
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Workspace } from '@/api/types';
import { ArrowRight } from 'lucide-react';

interface WorkspaceCardProps {
  workspace: Workspace;
}

const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <Link to={`/workspace/${workspace.id}`} className="block">
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.07)" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-white p-6 rounded-lg border border-slate-200 hover:border-accent transition-colors group"
        >
          <h3 className="text-lg font-bold text-slate-800">{workspace.title}</h3>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2">{workspace.description}</p>
          <div className="flex items-center justify-end text-sm font-semibold text-accent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ver detalles <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default WorkspaceCard;
