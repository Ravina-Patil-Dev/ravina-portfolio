import { Link } from 'react-router-dom';
import { Hop as Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xl md:text-2xl font-medium text-white/60">
              Page Not Found
            </div>
          </div>
        </div>

        <p className="mt-8 text-white/40 text-lg max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
