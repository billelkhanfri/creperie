import BenevolesDashboardLayout from "../components/BenevolesDashboardLayout";

export default function AdminLayout({ children, showDashboard = true }) {
  return (
    <div className="flex min-h-screen">
      {/* Dashboard seulement si showDashboard = true */}
      {showDashboard && <BenevolesDashboardLayout />}

      <main className="flex-1 p-2 bg-base-200">{children}</main>
    </div>
  );
}
