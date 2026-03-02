import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { SocialProofSection } from '@/components/marketing/social-proof-section';
import { CTASection } from '@/components/marketing/cta-section';

export const metadata = {
  title: 'Specter — Unified Family Office Platform',
  description:
    'Portfolios, private investments, entities, tax, compliance, and family governance in one secure platform. Trusted by 200+ family offices.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <CTASection />
    </>
  );
}
