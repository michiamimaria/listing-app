import { auth } from "@/auth";
import { HeaderBar } from "@/components/HeaderBar";

export async function SiteHeader() {
  const session = await auth();
  return (
    <HeaderBar
      signedIn={Boolean(session?.user)}
      userEmail={session?.user?.email ?? undefined}
    />
  );
}
