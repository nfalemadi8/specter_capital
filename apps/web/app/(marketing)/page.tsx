import { HeroSection } from '@/components/marketing/hero-section';
import { TrustBar } from '@/components/marketing/trust-bar';
import { StatsSection } from '@/components/marketing/stats-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { ShowcaseSection } from '@/components/marketing/showcase-section';
import { SocialProofSection } from '@/components/marketing/social-proof-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { CTASection } from '@/components/marketing/cta-section';

export const metadata = {
  title: 'Phantom Treasury — Private Wealth Infrastructure',
  description:
    'A private operating system for family offices. Consolidate complex holdings, automate institutional-grade reporting, and govern multi-entity structures — with the discretion they demand.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <StatsSection />
      <FeaturesSection />
      <ShowcaseSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
