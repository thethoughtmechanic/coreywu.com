import logoImage from '@assets/ChatGPT Image Jun 24, 2025, 10_30_14 AM_1755701754640.png';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 40, className = "" }: LogoProps) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src={logoImage} 
        alt="Boyfriend Material Logo"
        className="w-full h-full object-contain"
        style={{ width: size, height: size }}
      />
    </div>
  );
};