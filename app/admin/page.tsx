import AdminLogin from "@/app/admin/AdminLogin";
import AdminDashboard from "@/app/admin/AdminDashboard";
import { cookies } from "next/headers";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("nifty_admin")?.value === "true";

  if (!isLoggedIn) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}