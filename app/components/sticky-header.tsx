import React from 'react';

export function StickyHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 py-6 bg-blue-100 z-20 before:absolute before:bg-blue-100 before:w-8 before:inset-y-0 before:-left-8 after:absolute after:bg-blue-100 after:w-8 after:inset-y-0 after:-right-8 md:before:hidden md:after:hidden">
      {children}
    </div>
  );
}
