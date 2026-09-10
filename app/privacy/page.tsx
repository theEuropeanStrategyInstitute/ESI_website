import type { Metadata } from 'next';
import { InnerPage } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Privacy | The European Strategy Institute',
  description:
    'Privacy information for The European Strategy Institute website.',
};

export default function PrivacyPage() {
  return (
    <InnerPage
      eyebrow="Privacy"
      title={
        <>
          Clear handling.
          <br />
          <em>Responsible communication.</em>
        </>
      }
      intro="This page describes how the current private website prototype handles information."
    >
      <section className="content-section policy-copy">
        <p className="section-number">Draft notice</p>
        <div>
          <h2>No form data is stored by this website.</h2>
          <p>
            The enquiry and membership forms in this prototype prepare a message
            in your own email application. Information entered into those forms
            is not submitted to, or stored by, the website.
          </p>
          <h3>Direct email</h3>
          <p>
            If you choose to send the prepared email, the information is
            transmitted through your email provider to ESI. It may then be used
            to respond to your enquiry and manage the relationship you
            requested.
          </p>
          <h3>Before public launch</h3>
          <p>
            ESI’s complete privacy notice—including the legal entity’s contact
            details, lawful bases, retention periods, data-subject rights,
            processors, transfers, cookies and complaint route—must be approved
            and published before this prototype becomes a public website.
          </p>
          <p className="draft-note">
            This is implementation copy for a private prototype, not the
            organisation’s final legal privacy notice.
          </p>
        </div>
      </section>
    </InnerPage>
  );
}
