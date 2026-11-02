import AnnouncementBar from "@/components/common/announcement-bar/AnnouncementBar";
import Header from "@/components/headers/Header";
import Footer from "@/components/layout/footer";
import CartDrawerClient from "./CartDrawerClient";

const announcements = [
  { id: "1", text: "🚚 Free Delivery Across Pakistan" },
  { id: "2", text: "💯 No Delivery Charges Nationwide" },
  { id: "3", text: "💵 Cash on Delivery Available" },
];

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar items={announcements} autoPlay interval={3000} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawerClient />
    </>
  );
}
