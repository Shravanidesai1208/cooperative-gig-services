import React from 'react';
import { WorkNestProvider, useWorkNest } from './context/WorkNestContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { DemoGuideBar } from './components/layout/DemoGuideBar';

// Page Views
import { LandingPage } from './pages/LandingPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { ServiceDiscoveryPage } from './pages/ServiceDiscoveryPage';
import { BookingFlowPage } from './pages/BookingFlowPage';
import { SmartMatchingPage } from './pages/SmartMatchingPage';
import { BookingTrackingPage } from './pages/BookingTrackingPage';
import { WorkerProfilePage } from './pages/WorkerProfilePage';
import { WorkerDashboardPage } from './pages/WorkerDashboardPage';
import { WorkerJobRequestsPage } from './pages/WorkerJobRequestsPage';
import { WorkerAvailabilityPage } from './pages/WorkerAvailabilityPage';
import { WorkerEarningsPage } from './pages/WorkerEarningsPage';
import { RatingsReviewsPage } from './pages/RatingsReviewsPage';
import { CoOpModelPage } from './pages/CoOpModelPage';
import { AdminVerificationPage } from './pages/AdminVerificationPage';

const AppContent: React.FC = () => {
  const { currentView } = useWorkNest();

  const renderCurrentPage = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'discovery':
        return <ServiceDiscoveryPage />;
      case 'booking-flow':
        return <BookingFlowPage />;
      case 'smart-matching':
        return <SmartMatchingPage />;
      case 'booking-tracking':
        return <BookingTrackingPage />;
      case 'worker-profile':
        return <WorkerProfilePage />;
      case 'worker-dashboard':
        return <WorkerDashboardPage />;
      case 'worker-requests':
        return <WorkerJobRequestsPage />;
      case 'worker-availability':
        return <WorkerAvailabilityPage />;
      case 'worker-earnings':
        return <WorkerEarningsPage />;
      case 'ratings-reviews':
        return <RatingsReviewsPage />;
      case 'coop-model':
        return <CoOpModelPage />;
      case 'admin-verification':
        return <AdminVerificationPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-slate-800">
      {/* SIH 2026 Presentation Demo Assistant Bar */}
      <DemoGuideBar />

      {/* Main Responsive Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Cooperative Community Footer */}
      <Footer />

      {/* Mobile-first bottom navigation */}
      <MobileNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <WorkNestProvider>
      <AppContent />
    </WorkNestProvider>
  );
};

export default App;
