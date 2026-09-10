import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/enquiry-form';
import { InnerPage } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Contact | The European Strategy Institute',
  description: 'Contact The European Strategy Institute in Brussels.',
};

export default function ContactPage() {
  return (
    <InnerPage
      eyebrow="Contact"
      title={
        <>
          A conversation
          <br />
          <em>starts here.</em>
        </>
      }
      intro="For partnership, programme, membership or media enquiries, contact the Institute directly."
    >
      <section className="content-section contact-layout">
        <div className="contact-details">
          <p className="section-number">The Institute</p>
          <h2>The European Strategy Institute AISBL</h2>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:partnerships@esi-eu.com">
                  partnerships@esi-eu.com
                </a>
              </dd>
            </div>
            <div>
              <dt>Presence</dt>
              <dd>Brussels · Warsaw</dd>
            </div>
            <div>
              <dt>Representatives</dt>
              <dd>
                Agnieszka Sitek-Kobosko
                <br />
                Daria Smolarek
              </dd>
            </div>
            <div>
              <dt>Registration details</dt>
              <dd>Pending confirmation before public launch</dd>
            </div>
            <div>
              <dt>EU Transparency Register</dt>
              <dd>Pending confirmation before public launch</dd>
            </div>
          </dl>
        </div>
        <EnquiryForm kind="contact" />
      </section>
    </InnerPage>
  );
}
