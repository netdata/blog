import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import { PageMetadata } from '@docusaurus/theme-common';

export default function NotFound() {
  useEffect(() => {
    window.posthog.capture('page-not-found');
    var url = location.href

    var [first, second, three, ...query] = url.split('/')


    query = query.toString().replace(",", " ")
    var target = query.replaceAll("\/", " ")
    var base = url.split(query)[0]
    var redirectLocation = base + '#gsc.tab=0&gsc.q=' + target

    // Page location and redirectLocation should not be the same
    if (location.href !== redirectLocation) {
      // Redirect logic
      console.log(location.href)
      window.location.href = redirectLocation;
    }
  }, [])
  return null
}
