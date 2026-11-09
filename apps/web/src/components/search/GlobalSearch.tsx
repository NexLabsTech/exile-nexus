import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import routes from "../../data/routes.json";
import fixtures from "../../data/search-fixtures.json";
import { createSearchIndex, searchRecords } from "../../lib/search-contract";
import { copy } from "../../i18n";

const index = createSearchIndex(routes, fixtures.map((fixture) => ({ ...fixture, fictional: true as const })));
const MAX_QUERY_LENGTH = 80;

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const field = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const response = useMemo(() => searchRecords(index, query, routes, copy.search), [query]);

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
        <label htmlFor="global-site-query">{copy.search.label}</label>
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
            placeholder={copy.search.placeholder}
            autoComplete="off"
          />
          <button type="submit" className="button button-primary">{copy.search.button} <span aria-hidden="true">⌕</span></button>
        </div>
      </form>

      <p id="search-data-notice" className="search-data-notice">
        <span aria-hidden="true">✦</span> {copy.search.warningHeader}
        {copy.search.warningText}
      </p>

      <div className="search-results-heading">
        <div>
          <p className="eyebrow">{copy.search.eyebrow}</p>
          <h2>{query.trim() ? copy.search.results : copy.search.explore}</h2>
        </div>
        <p className="search-results-count" role="status" aria-live="polite">
          {response.state === "error" ? copy.search.rejected : response.message}
        </p>
      </div>

      <div id="global-search-results">
      {response.state === "error" ? (
        <div role="alert" className="search-empty-state search-error">
          <h3>{copy.search.errorTitle}</h3>
          <p>{response.message} {copy.search.errorInfo}</p>
          <button type="button" className="button button-ghost" onClick={() => { setQuery(""); field.current?.focus(); window.history.replaceState(null, "", "/search/"); }}>
            {copy.search.clearQuery}
          </button>
        </div>
      ) : response.state === "empty" ? (
        <div className="search-empty-state" role="status">
          <span className="search-empty-icon" aria-hidden="true">◇</span>
          <h3>{copy.search.emptyTitle}</h3>
          <p>{copy.search.emptyBody}</p>
          <button type="button" className="button button-ghost" onClick={() => { setQuery(""); field.current?.focus(); window.history.replaceState(null, "", "/search/"); }}>{copy.search.clearSearch}</button>
        </div>
      ) : (
        <ul className="search-results-list" aria-label={copy.search.resultsLabel}>
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
                    {item.origin === "synthetic" ? copy.search.fictionalSource : copy.search.internalSource}
                  </span>
                </span>
                <span className="search-result-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      </div>
      <p className="search-keyboard-help">{copy.search.keyboardHelp}</p>
    </div>
  );
}
