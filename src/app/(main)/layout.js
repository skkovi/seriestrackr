import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";

export const metadata = {};

export default async function MainLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar user={user} />
      <main> {children}</main>
    </>
  );
}
