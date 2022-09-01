import React from 'react';

export function StickyHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 py-6 bg-base-100 z-20 before:absolute before:bg-base-100 before:w-6 before:inset-y-0 before:-left-6 after:absolute after:bg-base-100 after:w-6 after:inset-y-0 after:-right-6 md:before:hidden md:after:hidden">
      {children}
    </div>
  );
}
