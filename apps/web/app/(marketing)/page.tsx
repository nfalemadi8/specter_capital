import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { SocialProofSection } from '@/components/marketing/social-proof-section';
import { CTASection } from '@/components/marketing/cta-section';

export const metadata = {
  title: 'Phantom Treasury — The Operating System for Generational Wealth',
  description:
    'Portfolio intelligence, deal pipeline, entity management, treasury operations, tax & compliance, and family governance in one secure platform. Built for family offices.',
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
