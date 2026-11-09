import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import routes from "../../data/routes.json";
import fixtures from "../../data/search-fixtures.json";
import { createSearchIndex, searchRecords } from "../../lib/search-contract";

const index = createSearchIndex(routes, fixtures.map((fixture) => ({ ...fixture, fictional: true as const })));
const MAX_QUERY_LENGTH = 80;

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const field = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const response = useMemo(() => searchRecords(index, query, routes), [query]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.length > MAX_QUERY_LENGTH) return;
    const url = query.trim() ? `/search/?q=${encodeURIComponent(query.trim())}` : "/search/";
    window.history.replaceState(null, "", url);
  }

  function fieldKeys(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && response.records.length) {
      event.preventDefault();
      resultRefs.current[0]?.focus();
    }
    if (event.key === "Escape" && query) {
      event.preventDefault();
      setQuery("");
      window.history.replaceState(null, "", "/search/");
    }
  }

  function resultKeys(event: ReactKeyboardEvent<HTMLAnchorElement>, position: number) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = event.key === "ArrowDown"
        ? (position + 1) % response.records.length
        : (position - 1 + response.records.length) % response.records.length;
      resultRefs.current[next]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      field.current?.focus();
    }
  }

  return (
    <div className="search-workspace">
      <form className="search-form" role="search" method="get" action="/search/" onSubmit={submit}>
        <label htmlFor="global-site-query">Search local pages and fictional examples</label>
        <div className="search-input-row">
          <input
            ref={field}
            id="global-site-query"
            type="search"
            name="q"
            value={query}
            maxLength={MAX_QUERY_LENGTH}
            onChange={(event) => setQuery(event.currentTarget.value)}
            onKeyDown={fieldKeys}
            aria-controls="global-search-results"
            aria-describedby="search-data-notice"
            placeholder="Find a build page, item area or demo example"
            autoComplete="off"
          />
          <button type="submit" className="button button-primary">Search <span aria-hidden="true">⌕</span></button>
        </div>
      </form>

      <p id="search-data-notice" className="search-data-notice">
        <span aria-hidden="true">✦</span> INDEX: SITE NAVIGATION + FICTIONAL DEMO ONLY.
        No live game data, prices, patch dates or external results. Synthetic entries are not factual records.
      </p>

      <div className="search-results-heading">
        <div>
          <p className="eyebrow">SEARCH THE NEXUS</p>
          <h2>{query.trim() ? "Results" : "Explore the archives"}</h2>
        </div>
        <p className="search-results-count" role="status" aria-live="polite">
          {response.state === "error" ? "Query not accepted" : response.message}
        </p>
      </div>

      <div id="global-search-results">
      {response.state === "error" ? (
        <div role="alert" className="search-empty-state search-error">
          <h3>Search needs a shorter phrase</h3>
          <p>{response.message} No request was sent.</p>
          <button type="button" className="button button-ghost" onClick={() => { setQuery(""); field.current?.focus(); window.history.replaceState(null, "", "/search/"); }}>
            Clear query
          </button>
        </div>
      ) : response.state === "empty" ? (
        <div className="search-empty-state" role="status">
          <span className="search-empty-icon" aria-hidden="true">◇</span>
          <h3>Nothing in the local archive</h3>
          <p>No matching local page or fictional example. Live datasets are not connected.</p>
          <button type="button" className="button button-ghost" onClick={() => { setQuery(""); field.current?.focus(); window.history.replaceState(null, "", "/search/"); }}>Clear search</button>
        </div>
      ) : (
        <ul className="search-results-list" aria-label="Local search results">
          {response.records.map((item, position) => (
            <li key={item.id} className="search-result">
              <a
                ref={(node) => { resultRefs.current[position] = node; }}
                href={item.href}
                className="search-result-link exn-focusable"
                onKeyDown={(event) => resultKeys(event, position)}
              >
                <span className="search-result-mark" aria-hidden="true">{item.origin === "synthetic" ? "✧" : "◇"}</span>
                <span className="search-result-copy">
                  <span className="search-result-category">{item.category}</span>
                  <strong>{item.title}</strong>
                  <span className="search-result-summary">{item.summary}</span>
                  <span className="search-result-source">
                    {item.origin === "synthetic" ? "FICTIONAL EXAMPLE · NO REAL GAME DATA" : "INTERNAL SITE PAGE · CURRENT STATIC BUILD"}
                  </span>
                </span>
                <span className="search-result-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      </div>
      <p className="search-keyboard-help">Keyboard: Tab through links, ↓ from the search field, ↑/↓ between results, Escape to return to the field.</p>
    </div>
  );
}
