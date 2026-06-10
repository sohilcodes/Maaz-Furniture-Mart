import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — Premium Furniture Store",
  description: "Manage products for Premium Furniture Store",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Admin Banner */}
      <div className="bg-[#1C1008] text-white text-center text-xs py-2 px-4 fixed top-0 left-0 right-0 z-50 font-medium tracking-wide">
        🔒 Admin Panel — Maaz Furniture Mart 
      </div>
      <div className="pt-8">{children}</div>
    </>
  );
}
