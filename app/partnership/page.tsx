import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/enquiry-form';
import { InnerPage } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Partnerships | The European Strategy Institute',
  description:
    'Partner with ESI to strengthen business participation in European policymaking.',
};

const partnerTypes = [
  'Regional entrepreneurs and employers',
  'Private companies and capital groups',
  'Financial and investment institutions',
  'State-controlled enterprises',
  'International companies with strategic CEE interests',
];

export default function PartnershipPage() {
  return (
    <InnerPage
      eyebrow="Partnerships"
      title={
        <>
          Build presence.
          <br />
          <em>Strengthen credibility.</em>
        </>
      }
      intro="ESI supports European companies in moving from regulatory reaction to strategic influence."
    >
      <section className="content-section split-copy">
        <p className="section-number">01 / The partnership</p>
        <div>
          <h2>A trusted platform for long-term positioning in Brussels.</h2>
          <p>
            We create the conditions for natural, partnership-based
            relationships between businesses and European decision-makers. The
            purpose is not transactional access. It is a credible contribution
            of evidence, sector knowledge and regional perspective.
          </p>
          <p>
            ESI works with organisations that have the ambition and capacity to
            operate at European scale, including:
          </p>
          <ul className="plain-list">
            {partnerTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section form-section">
        <div className="form-intro">
          <p className="section-number">02 / Start a conversation</p>
          <h2>Tell us where your European priorities are taking you.</h2>
          <p>
            You can also contact us directly at{' '}
            <a href="mailto:partnerships@esi-eu.com">partnerships@esi-eu.com</a>
            .
          </p>
        </div>
        <EnquiryForm kind="partnership" />
      </section>
    </InnerPage>
  );
}
