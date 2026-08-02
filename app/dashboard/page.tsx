import { redirect } from 'next/navigation';

/**
 * /dashboard redirects to /admin
 * This is a convenience alias for the Admin Management Dashboard.
 */
export default function DashboardPage() {
  redirect('/admin');
}
