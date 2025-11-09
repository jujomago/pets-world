import { TabBar } from "@/components";

// export const metadata = {
//   title: "SEO Title",
//   description: "SEO Title",
// };
export default function WithTabbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
}
