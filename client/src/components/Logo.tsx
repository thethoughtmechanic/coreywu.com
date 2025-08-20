import { Heart } from 'lucide-react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 40, className = "" }: LogoProps) => {
  return (
    <div 
      className={`flex items-center justify-center bg-coral-600 rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Heart 
        className="text-white" 
        size={size * 0.6} 
        fill="currentColor"
      />
    </div>
  );
};