/**
 * Renders a JSON-LD graph into the static HTML. This is a server component on
 * purpose: the schema must be present in the initial response, not injected by
 * a useEffect after hydration.
 */
const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
