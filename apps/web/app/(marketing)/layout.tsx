import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';
import { ScrollAnimations } from '@/components/marketing/scroll-animations';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grain" />
      <div className="scroll-progress" id="scrollProgress" />
      <ScrollAnimations />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
