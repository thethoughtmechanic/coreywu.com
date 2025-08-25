
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CopyEmailProps {
  email?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CopyEmail({ 
  email = 'coreydavidwu@gmail.com', 
  className = '',
  children 
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track email copy if analytics is available
      if (window.gtag) {
        window.gtag('event', 'email_copy', {
          email_address: email,
          event_category: 'contact',
          event_label: 'Email copied to clipboard'
        });
      }
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "bg-transparent border-none cursor-pointer p-0 font-inherit relative overflow-hidden",
        "text-warm-brown hover:text-hover-brown transition-colors duration-200 underline",
        className
      )}
    >
      <span className={cn(
        "transition-all duration-300 ease-in-out",
        copied 
          ? "transform -translate-y-full opacity-0" 
          : "transform translate-y-0 opacity-100"
      )}>
        {children || email}
      </span>
      <span className={cn(
        "absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out",
        "text-green-600 font-medium",
        copied 
          ? "transform translate-y-0 opacity-100" 
          : "transform translate-y-full opacity-0"
      )}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="m9 14 2 2 4-4"/>
        </svg>
        Copied!
      </span>
    </button>
  );
}
