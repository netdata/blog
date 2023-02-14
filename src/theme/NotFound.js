import React, { useEffect } from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
function URL_add_parameter(url, param, value){
  var hash       = {};
  var parser     = document.createElement('a');

  parser.href    = url;

  var parameters = parser.search.split(/\?|&/);

  for(var i=0; i < parameters.length; i++) {
      if(!parameters[i])
          continue;

      var ary      = parameters[i].split('=');
      hash[ary[0]] = ary[1];
  }

  hash[param] = value;

  var list = [];  
  Object.keys(hash).forEach(function (key) {
      list.push(key + '=' + hash[key]);
  });

  parser.search = '?' + list.join('&');
  return parser.href;
}

export default function NotFound() {
  useEffect(() => {
    window.posthog.capture('page-not-found');
    location.href = URL_add_parameter(location.href, 'q', window.location.pathname.replace('/', ''));
    //window.location.search += '?q=hello';
  }, [])
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
        <script async src="https://cse.google.com/cse.js?cx=9554dfbb026dd4b3c"></script>
        <div class="gcse-search" queryParameterName="xxx"></div>
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">
                <Translate
                  id="theme.NotFound.title"
                  description="The title of the 404 page">
                  Page Not Found
                </Translate>
              </h1>
              <p>
                <Translate
                  id="theme.NotFound.p1"
                  description="The first paragraph of the 404 page">
                  We could not find what you were looking for.
                </Translate>
              </p>
              <p>
                <Translate
                  id="theme.NotFound.p2"
                  description="The 2nd paragraph of the 404 page">
                  Please contact the owner of the site that linked you to the
                  original URL and let them know their link is broken.
                </Translate>
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
