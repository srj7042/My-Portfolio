'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import { cn } from '@/lib/utils';

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
}

type RippleItem = {
  x: number;
  y: number;
  size: number;
  key: number;
};

function ButtonRipple({
  ripple,
  duration,
  rippleColor,
  onDone,
}: {
  ripple: RippleItem;
  duration: string;
  rippleColor: string;
  onDone: (key: number) => void;
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDone(ripple.key);
    }, parseInt(duration, 10));

    return () => {
      clearTimeout(timeout);
    };
  }, [duration, onDone, ripple.key]);

  return (
    <span
      className="animate-rippling absolute rounded-full pointer-events-none"
      style={
        {
          width: `${ripple.size}px`,
          height: `${ripple.size}px`,
          top: `${ripple.y}px`,
          left: `${ripple.x}px`,
          backgroundColor: rippleColor,
          transform: 'scale(0)',
          WebkitTransform: 'scale(0)',
          '--duration': duration,
        } as React.CSSProperties
      }
    />
  );
}

export const RippleButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  RippleButtonProps
>(
  (
    {
      className,
      children,
      rippleColor = '#ADD8E6',
      duration = '600ms',
      onClick,
      href,
      target,
      rel,
      download,
      type,
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState<Array<RippleItem>>([]);
    const nextKeyRef = useRef(0);

    const removeRipple = useCallback((key: number) => {
      setButtonRipples((prevRipples) =>
        prevRipples.filter((ripple) => ripple.key !== key)
      );
    }, []);

    const handleClick = (
      event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      createRipple(event);
      onClick?.(event as MouseEvent<HTMLButtonElement>);
    };

    const createRipple = (
      event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      const targetElement = event.currentTarget;
      const rect = targetElement.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      nextKeyRef.current += 1;
      const newRipple = { x, y, size, key: nextKeyRef.current };
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    const ripplesOverlay = (
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        {buttonRipples.map((ripple) => (
          <ButtonRipple
            key={ripple.key}
            duration={duration}
            onDone={removeRipple}
            ripple={ripple}
            rippleColor={rippleColor}
          />
        ))}
      </span>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          download={download}
          className={cn(
            'relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-lg transition-all',
            className
          )}
          onClick={handleClick}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {children}
          </span>
          {ripplesOverlay}
        </a>
      );
    }

    return (
      <button
        type={type || 'button'}
        className={cn(
          'relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-lg transition-all',
          className
        )}
        onClick={handleClick}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
        {ripplesOverlay}
      </button>
    );
  }
);

RippleButton.displayName = 'RippleButton';

export function RippleButtonDemo() {
  return <RippleButton rippleColor="#ADD8E6">Click me</RippleButton>;
}
