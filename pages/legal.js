import React, { useState, useEffect } from 'react'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import Template from '../components/Template'

export default () => (
  <Template>
    <Layout>
      <Box paddingTop={10} paddingBottom={10}>
        <h1>Legal Notice</h1>
        <Spacer size={6} />
        <p style={{ fontSize: 18 }}>
          Robin Weser
          <br />
          Rintheimer Hauptstraße 25
          <br />
          76131 Karlsruhe
          <br />
          Germany
          <br />
          <br />
          E-Mail:{' '}
          <a style={{ color: 'black' }} href="mailto@contact@weser.io">
            contact@weser.io
          </a>
          <br />
          Phone:{' '}
          <a style={{ color: 'black' }} href="tel:+4915164330341">
            +49 151 6433 0341
          </a>
          <br />
          Website:{' '}
          <a style={{ color: 'black' }} href="https://weser.io">
            weser.io
          </a>
          <br />
          <br />
          VAT ID: DE321944442
          <br />
          <br />
          <br />
          <h2 id="privacy-policy">Privacy Policy</h2>
          <br />
          Personal data (usually referred to just as "data" below) will only be
          processed by us to the extent necessary and for the purpose of
          providing a functional and user-friendly website, including its
          contents, and the services offered there.
          <br />
          <br />
          Per Art. 4 No. 1 of Regulation (EU) 2016/679, i.e. the General Data
          Protection Regulation (hereinafter referred to as the "GDPR"),
          "processing" refers to any operation or set of operations such as
          collection, recording, organization, structuring, storage, adaptation,
          alteration, retrieval, consultation, use, disclosure by transmission,
          dissemination, or otherwise making available, alignment, or
          combination, restriction, erasure, or destruction performed on
          personal data, whether by automated means or not.
          <br />
          <br />
          The following privacy policy is intended to inform you in particular
          about the type, scope, purpose, duration, and legal basis for the
          processing of such data either under our own control or in conjunction
          with others. We also inform you below about the third-party components
          we use to optimize our website and improve the user experience which
          may result in said third parties also processing data they collect and
          control.
          <br />
          <br />
          Our privacy policy is structured as follows:
          <br />
          <br />
          I. Information about us as controllers of your data
          <br />
          II. The rights of users and data subjects
          <br />
          III. Information about the data processing
          <br />
          <br />
          <h3>I. Information about us as controllers of your data</h3>
          <br />
          The party responsible for this website (the "controller") for purposes
          of data protection law is:
          <br />
          <br />
          Robin Weser
          <br />
          Rintheimer Hauptstraße 25
          <br />
          76131 Karlsruhe
          <br />
          Germany
          <br />
          <br />
          E-Mail:{' '}
          <a style={{ color: 'black' }} href="mailto@contact@weser.io">
            contact@weser.io
          </a>
          <br />
          Phone:{' '}
          <a style={{ color: 'black' }} href="tel:+4915164330341">
            +49 151 6433 0341
          </a>
          <br />
          Website:{' '}
          <a style={{ color: 'black' }} href="https://weser.io">
            weser.io
          </a>
          <br />
          <br />
          The controller's data protection officer is:
          <br />
          Robin Weser
          <br />
          <br />
          <h3>II. The rights of users and data subjects</h3>
          <br />
          With regard to the data processing to be described in more detail
          below, users and data subjects have the right
          <br />
          <br />
          to confirmation of whether data concerning them is being processed,
          information about the data being processed, further information about
          the nature of the data processing, and copies of the data (cf. also
          Art. 15 GDPR);
          <br />
          to correct or complete incorrect or incomplete data (cf. also Art. 16
          GDPR);
          <br />
          to the immediate deletion of data concerning them (cf. also Art. 17
          DSGVO), or, alternatively, if further processing is necessary as
          stipulated in Art. 17 Para. 3 GDPR, to restrict said processing per
          Art. 18 GDPR;
          <br />
          to receive copies of the data concerning them and/or provided by them
          and to have the same transmitted to other providers/controllers (cf.
          also Art. 20 GDPR);
          <br />
          to file complaints with the supervisory authority if they believe that
          data concerning them is being processed by the controller in breach of
          data protection provisions (see also Art. 77 GDPR).
          <br />
          In addition, the controller is obliged to inform all recipients to
          whom it discloses data of any such corrections, deletions, or
          restrictions placed on processing the same per Art. 16, 17 Para. 1, 18
          GDPR. However, this obligation does not apply if such notification is
          impossible or involves a disproportionate effort. Nevertheless, users
          have a right to information about these recipients.
          <br />
          <br />
          Likewise, under Art. 21 GDPR, users and data subjects have the right
          to object to the controller's future processing of their data pursuant
          to Art. 6 Para. 1 lit. f) GDPR. In particular, an objection to data
          processing for the purpose of direct advertising is permissible.
          <br />
          <br />
          <h3>III. Information about the data processing</h3>
          <br />
          Your data processed when using our website will be deleted or blocked
          as soon as the purpose for its storage ceases to apply, provided the
          deletion of the same is not in breach of any statutory storage
          obligations or unless otherwise stipulated below.
          <br />
          <br />
          <h4 id="privacy-policy">Contact</h4>
          <br />
          If you contact us via email or the contact form, the data you provide
          will be used for the purpose of processing your request. We must have
          this data in order to process and answer your inquiry; otherwise we
          will not be able to answer it in full or at all.
          <br />
          <br />
          The legal basis for this data processing is Art. 6 Para. 1 lit. b)
          GDPR.
          <br />
          <br />
          Your data will be deleted once we have fully answered your inquiry and
          there is no further legal obligation to store your data, such as if an
          order or contract resulted therefrom.
          <br />
          <br />
          <h4 id="tracking">Tracking</h4>
          <br />
          To get critical information about the behavior of our visitors, we use{' '}
          <a
            href="https://simpleanalytics.com"
            target="_blank"
            style={{ color: 'black' }}>
            Simple Analytics
          </a>
          .<br />
          This analytics software gives us insight about our visitors only in
          general, but not about individuals per say, as it does not track
          visitors and does not store any personal identifiable information.
          <br />
          <a
            href="https://docs.simpleanalytics.com/what-we-collect"
            target="_blank"
            style={{ color: 'black' }}>
            Go to their documentation
          </a>{' '}
          to find out what Simple Analytics collects (and most importantly what
          they don't).
        </p>
      </Box>
    </Layout>
  </Template>
)
