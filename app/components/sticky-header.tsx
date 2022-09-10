import React from 'react';

export function StickyHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-20 bg-base-100 py-6 before:absolute before:inset-y-0 before:-left-6 before:w-6 before:bg-base-100 after:absolute after:inset-y-0 after:-right-6 after:w-6 after:bg-base-100 md:before:hidden md:after:hidden">
      {children}
    </div>
  );
}
