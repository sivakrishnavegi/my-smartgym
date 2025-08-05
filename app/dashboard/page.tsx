import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/lib/auth'; // server-side helper

export default async function DashboardPage() {
  const user = await getUserFromToken(); // decode JWT on server

  if (!user) {
    redirect('/login');
  }

  // Redirect based on role
  switch (user.role) {
    case 'admin':
      redirect('/dashboard/admin');
    case 'user':
      redirect('/dashboard/user');
    case 'trainer':
      redirect('/dashboard/trainer');
    default:
      redirect('/unauthorized');
  }
}
