import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — Maaz Furniture Mart",
  description: "Manage products for Maaz Furniture Mart",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#1C1008] text-white text-center text-xs py-2 px-4 font-medium tracking-wide">
        🔒 Admin Panel — Maaz Furniture Mart
      </div>
      <div>{children}</div>
    </>
  );
}
