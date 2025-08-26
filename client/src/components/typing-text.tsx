
'use client';
 
import * as React from 'react';
import { motion, useInView, type UseInViewOptions } from 'framer-motion';
 
import { cn } from '@/lib/utils';
 
function CursorBlinker({ className }: { className?: string }) {
  return (
    <motion.span
      data-slot="cursor-blinker"
      variants={{
        blinking: {
          opacity: [0, 0, 1, 1],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'linear',
            times: [0, 0.5, 0.5, 1],
          },
        },
      }}
      animate="blinking"
      className={cn(
        'inline-block h-5 w-[1px] translate-y-1 bg-black dark:bg-white',
        className,
      )}
    />
  );
}
 
type TypingTextProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  duration?: number;
  delay?: number;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  cursor?: boolean;
  loop?: boolean;
  holdDelay?: number;
  text: string | string[];
  cursorClassName?: string;
  animateOnChange?: boolean;
};
 
function TypingText({
  ref,
  duration = 100,
  delay = 0,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  cursor = false,
  loop = false,
  holdDelay = 1000,
  text,
  cursorClassName,
  animateOnChange = true,
  ...props
}: TypingTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLSpanElement);
 
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;
 
  const [started, setStarted] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState<string>('');
  const [isComplete, setIsComplete] = React.useState(false);
  
  // Get the full text to reserve space
  const fullText = typeof text === 'string' ? text : text[0] || '';
 
  React.useEffect(() => {
    // Reset animation when text changes (if animateOnChange is true)
    if (animateOnChange) {
      setStarted(false);
      setDisplayedText('');
      setIsComplete(false);
    }
 
    if (isInView) {
      const timeoutId = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, delay, ...(animateOnChange ? [text] : [])]);
 
  React.useEffect(() => {
    if (!started) return;
    const timeoutIds: Array<ReturnType<typeof setTimeout>> = [];
    const texts: string[] = typeof text === 'string' ? [text] : text;
 
    const typeText = (str: string, onComplete: () => void) => {
      let currentIndex = 0;
      const type = () => {
        if (currentIndex <= str.length) {
          setDisplayedText(str.substring(0, currentIndex));
          currentIndex++;
          const id = setTimeout(type, duration);
          timeoutIds.push(id);
        } else {
          setIsComplete(true);
          onComplete();
        }
      };
      type();
    };
 
    const eraseText = (str: string, onComplete: () => void) => {
      let currentIndex = str.length;
      const erase = () => {
        if (currentIndex >= 0) {
          setDisplayedText(str.substring(0, currentIndex));
          currentIndex--;
          const id = setTimeout(erase, duration);
          timeoutIds.push(id);
        } else {
          onComplete();
        }
      };
      erase();
    };
 
    const animateTexts = (index: number) => {
      typeText(texts[index] ?? '', () => {
        const isLast = index === texts.length - 1;
        if (isLast && !loop) {
          return;
        }
        const id = setTimeout(() => {
          eraseText(texts[index] ?? '', () => {
            const nextIndex = isLast ? 0 : index + 1;
            animateTexts(nextIndex);
          });
        }, holdDelay);
        timeoutIds.push(id);
      });
    };
 
    animateTexts(0);
 
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [text, duration, started, loop, holdDelay]);
 
  // Function to apply special effects to words
  const formatTextWithEffects = (text: string) => {
    if (!isComplete) {
      return text;
    }
    
    let formattedText = text;
    let elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Check for "digital" and add HyperText effect
    const digitalIndex = text.toLowerCase().indexOf('digital');
    if (digitalIndex !== -1) {
      const beforeDigital = text.substring(lastIndex, digitalIndex);
      const digital = text.substring(digitalIndex, digitalIndex + 7);
      
      elements.push(beforeDigital);
      elements.push(
        <span
          key="digital-hover"
          className="relative inline-block cursor-pointer"
          style={{ 
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
            color: 'inherit'
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            const originalText = 'digital';
            const duration = 800; // Match original HyperText duration
            const characterSet = "abcdefghijklmnopqrstuvwxyz".split("");
            
            // Clear any existing animation
            if (target.dataset.animating === 'true') {
              return;
            }
            
            target.dataset.animating = 'true';
            const startTime = performance.now();
            let animationFrameId;
            
            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const iterationCount = progress * originalText.length;
              
              const newText = originalText
                .split("")
                .map((letter, index) => {
                  if (letter === " ") return letter;
                  if (index <= iterationCount) return originalText[index];
                  return characterSet[Math.floor(Math.random() * characterSet.length)];
                })
                .join("");
              
              target.textContent = newText;
              
              if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
              } else {
                target.textContent = originalText;
                target.dataset.animating = 'false';
              }
            };
            
            animationFrameId = requestAnimationFrame(animate);
          }}
        >
          {digital}
        </span>
      );
      
      lastIndex = digitalIndex + 7;
    }

    // Check for "garden" and add glow effect
    const gardenIndex = text.toLowerCase().indexOf('garden');
    if (gardenIndex !== -1) {
      const beforeGarden = text.substring(lastIndex, gardenIndex);
      const garden = text.substring(gardenIndex, gardenIndex + 6);
      const afterGarden = text.substring(gardenIndex + 6);
      
      elements.push(beforeGarden);
      elements.push(
        <span key="garden-glow" className="garden-text-glow relative inline-block cursor-pointer">
          {garden}
        </span>
      );
      elements.push(afterGarden);
    } else if (lastIndex < text.length) {
      // Add remaining text if no garden found
      elements.push(text.substring(lastIndex));
    }
    
    // If no special words found, return original text
    return elements.length > 0 ? elements : text;
  };

  return (
    <span ref={localRef} data-slot="typing-text" {...props} className={cn("relative inline-block whitespace-nowrap", props.className)}>
      {/* Invisible placeholder to reserve space and prevent layout shift */}
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {fullText}
      </span>
      {/* Actual typing text - positioned absolutely over the invisible text */}
      <motion.span className="absolute inset-0 whitespace-nowrap">
        {formatTextWithEffects(displayedText)}
      </motion.span>
      {cursor && <CursorBlinker className={cursorClassName} />}
    </span>
  );
}
 
export { TypingText, type TypingTextProps };
