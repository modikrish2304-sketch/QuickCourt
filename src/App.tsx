import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast, ToastProps } from './components/Toast';

import { LandingPage } from './pages/LandingPage';
import { VenuesPage } from './pages/VenuesPage';
import { VenueDetailsPage } from './pages/VenueDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { PaymentPage } from './pages/PaymentPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OtpVerificationPage } from './pages/OtpVerificationPage';

import { OwnerDashboard } from './pages/owner/OwnerDashboard';
import { FacilityManagement } from './pages/owner/FacilityManagement';
import { CourtManagement } from './pages/owner/CourtManagement';
import { TimeSlotManagement } from './pages/owner/TimeSlotManagement';
import { BookingOverview } from './pages/owner/BookingOverview';
import { OwnerProfile } from './pages/owner/OwnerProfile';
import { OwnerSettingsPage } from './pages/owner/OwnerSettings';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { FacilityApprovalPage } from './pages/admin/FacilityApprovalPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { BookingsOverviewPage } from './pages/admin/BookingsOverviewPage';
import { ReportsManagementPage } from './pages/admin/ReportsManagementPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { PlatformSettingsPage } from './pages/admin/PlatformSettingsPage';

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname + window.location.search || '/';
  });

  const [activeToast, setActiveToast] = useState<{
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message?: string;
  } | null>(null);

  const showToast = (
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    message?: string
  ) => {
    setActiveToast({ id: Date.now(), type, title, message });
  };

  // Sync route on browser back/forward
  useEffect(() => {
    const onPopState = () => {
      setCurrentRoute(window.location.pathname + window.location.search || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
  };

  // Route matching
  const pathname = currentRoute.split('?')[0];
  const searchParams = new URLSearchParams(
    currentRoute.includes('?') ? currentRoute.split('?')[1] : ''
  );

  const renderPage = () => {
    // 1. Venue Booking: /booking/:venueId or /venues/:venueId/book
    const bookingMatch =
      pathname.match(/^\/booking\/([^/]+)$/) || pathname.match(/^\/venues\/([^/]+)\/book$/);
    if (bookingMatch) {
      const venueId = bookingMatch[1];
      return (
        <BookingPage
          venueId={venueId}
          onNavigate={navigate}
          onShowToast={showToast}
        />
      );
    }

    // 2. Payment: /payment/:bookingId
    const paymentMatch = pathname.match(/^\/payment\/([^/]+)$/);
    if (paymentMatch) {
      const bookingId = paymentMatch[1];
      return (
        <PaymentPage
          bookingId={bookingId}
          onNavigate={navigate}
          onShowToast={showToast}
        />
      );
    }

    // 3. Venue Detail: /venues/:venueId
    const venueMatch = pathname.match(/^\/venues\/([^/]+)$/);
    if (venueMatch) {
      const venueId = venueMatch[1];
      return (
        <VenueDetailsPage
          venueId={venueId}
          onNavigate={navigate}
          onShowToast={showToast}
        />
      );
    }

    // 4. Venues Catalog: /venues
    if (pathname === '/venues') {
      const sportParam = searchParams.get('sport') || 'all';
      const cityParam = searchParams.get('city') || 'All Cities';
      const qParam = searchParams.get('q') || '';
      return (
        <VenuesPage
          onNavigate={navigate}
          initialSport={sportParam}
          initialCity={cityParam}
          initialQuery={qParam}
        />
      );
    }

    // 5. My Bookings: /my-bookings
    if (pathname === '/my-bookings') {
      return <MyBookingsPage onNavigate={navigate} onShowToast={showToast} />;
    }

    // 6. Profile: /profile
    if (pathname === '/profile') {
      return <ProfilePage onNavigate={navigate} onShowToast={showToast} />;
    }

    // 7. Auth: Login: /login or /auth/login
    if (pathname === '/login' || pathname === '/auth/login') {
      const redirectUrl = searchParams.get('redirect') || '/venues';
      return (
        <LoginPage
          onNavigate={navigate}
          redirectUrl={redirectUrl}
          onShowToast={showToast}
        />
      );
    }

    // 8. Auth: Signup: /signup or /auth/signup
    if (pathname === '/signup' || pathname === '/auth/signup') {
      const redirectUrl = searchParams.get('redirect') || '/venues';
      return (
        <SignupPage
          onNavigate={navigate}
          redirectUrl={redirectUrl}
          onShowToast={showToast}
        />
      );
    }

    // 9. Auth: OTP: /verify-otp or /auth/verify-otp
    if (pathname === '/verify-otp' || pathname === '/auth/verify-otp') {
      const emailParam = searchParams.get('email') || '';
      const redirectUrl = searchParams.get('redirect') || '/venues';
      return (
        <OtpVerificationPage
          email={emailParam}
          redirectUrl={redirectUrl}
          onNavigate={navigate}
          onShowToast={showToast}
        />
      );
    }

    // 10. Owner Portal Routes
    if (pathname === '/owner' || pathname === '/owner/dashboard') {
      return (
        <OwnerDashboard onNavigate={navigate} onShowToast={showToast} />
      );
    }

    if (pathname === '/owner/facility') {
      return (
        <FacilityManagement onNavigate={navigate} onShowToast={showToast} />
      );
    }

    if (pathname === '/owner/courts' || pathname.startsWith('/owner/courts/')) {
      return (
        <CourtManagement onNavigate={navigate} onShowToast={showToast} />
      );
    }

    if (pathname === '/owner/timeslots') {
      return (
        <TimeSlotManagement onNavigate={navigate} onShowToast={showToast} />
      );
    }

    if (pathname === '/owner/bookings') {
      return (
        <BookingOverview onNavigate={navigate} onShowToast={showToast} />
      );
    }

    if (pathname === '/owner/profile') {
      return (
        <OwnerProfile onNavigate={navigate} onShowToast={showToast} />
      );
    }

    if (pathname === '/owner/settings' || pathname === '/owner/notifications') {
      return (
        <OwnerSettingsPage onNavigate={navigate} onShowToast={showToast} />
      );
    }

    // Default: Landing Page: /
    return <LandingPage onNavigate={navigate} />;
  };

  const isOwnerRoute = pathname.startsWith('/owner');

  if (isOwnerRoute) {
    return (
      <div className="min-h-screen bg-[#F7F9F8] text-[#172033] font-sans antialiased">
        {activeToast && (
          <Toast
            key={activeToast.id}
            type={activeToast.type}
            title={activeToast.title}
            message={activeToast.message}
            onClose={() => setActiveToast(null)}
          />
        )}
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-600 selection:text-white font-sans antialiased">
      {/* Toast notifications */}
      {activeToast && (
        <Toast
          key={activeToast.id}
          type={activeToast.type}
          title={activeToast.title}
          message={activeToast.message}
          onClose={() => setActiveToast(null)}
        />
      )}

      {/* Primary Navigation Bar */}
      <Navbar currentRoute={currentRoute} onNavigate={navigate} />

      {/* Dynamic Viewport */}
      <main className="flex-1">{renderPage()}</main>

      {/* Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
