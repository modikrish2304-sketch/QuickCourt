import React, { useState } from 'react';
import { OwnerSidebar } from './OwnerSidebar';
import { OwnerHeader } from './OwnerHeader';

export interface OwnerLayoutProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  pageTitle?: string;
  children: React.ReactNode;
}

export const OwnerLayout: React.FC<OwnerLayoutProps> = ({
  currentRoute,
  onNavigate,
  pageTitle,
  children,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F7F9F8] text-[#172033] antialiased">
      {/* Sidebar navigation */}
      <OwnerSidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <OwnerHeader
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
          onNavigate={onNavigate}
          pageTitle={pageTitle}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
