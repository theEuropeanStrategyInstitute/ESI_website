import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/enquiry-form';
import { InnerPage } from '@/components/site-footer';
import { strategicObjectives } from '@/lib/esi-content';

export const metadata: Metadata = {
  title: 'Membership | The European Strategy Institute',
  description:
    'Express your interest in becoming a member of The European Strategy Institute.',
};

export default function MemberPage() {
  return (
    <InnerPage
      eyebrow="Membership"
      title={
        <>
          Help shape change.
          <br />
          <em>Do not simply react to it.</em>
        </>
      }
      intro="Deregulation, competitiveness, industrial policy and geopolitical realignment are reshaping Europe. ESI membership is for organisations ready to participate."
    >
      <section className="content-section membership-case">
        <div>
          <p className="section-number">01 / Why ESI</p>
          <h2>Let’s co-create a better future for Europe.</h2>
          <blockquote>
            The question is not whether Europe will change. The question is who
            will play a decisive role in shaping that change.
          </blockquote>
        </div>
        <ol className="objective-list compact">
          {strategicObjectives.map((objective, index) => (
            <li key={objective}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{objective}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-section form-section">
        <div className="form-intro">
          <p className="section-number">02 / Expression of interest</p>
          <h2>Start the membership conversation.</h2>
          <p>
            Share a few details about you and your organisation. The ESI team
            will follow up directly.
          </p>
        </div>
        <EnquiryForm kind="membership" />
      </section>
    </InnerPage>
  );
}
