import { Star } from 'lucide-react';

export function TrustBar() {
  return (
    <div className="bg-white py-5 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap text-sm font-semibold text-gray-700">
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[#C6A969] fill-[#C6A969]" />
            5.0 Rated
          </span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>500+ Cleanings</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>16+ Years Experience</span>
        </div>
      </div>
    </div>
  );
}
