import { useEffect, useRef, useState } from "react";
import { routes } from "../lib/navigation";
import { copy } from "../i18n";

interface MobileNavProps {
  currentPath: string;
}

export function MobileNav({ currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  }, [open]);

  return (
    <div className="mobile-nav-control">
      <button
        type="button"
        ref={toggleRef}
        className="mobile-menu-trigger exn-focusable"
        aria-expanded={open}
        aria-controls="exn-mobile-navigation"
        aria-label={open ? copy.common.closeMenu : copy.common.openMenu}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className={open ? "menu-glyph is-open" : "menu-glyph"}>
          <span />
          <span />
          <span />
        </span>
        <span>{copy.common.menu}</span>
      </button>
      <nav
        ref={panelRef}
        id="exn-mobile-navigation"
        className={open ? "mobile-menu is-open" : "mobile-menu"}
        aria-label={copy.common.mobileNavigation}
        hidden={!open}
      >
        <a className="mobile-home exn-focusable" href="/search/" aria-current={currentPath === "/search/" || currentPath === "/search" ? "page" : undefined}>
          {copy.common.search} <span aria-hidden="true">↗</span>
        </a>
        <a className="mobile-home exn-focusable" href="/" aria-current={currentPath === "/" ? "page" : undefined}>
          {copy.common.home} <span aria-hidden="true">↗</span>
        </a>
        {routes.map((route) => (
          <a
            key={route.slug}
            className="mobile-route exn-focusable"
            href={route.href}
            aria-current={currentPath.replace(/\/+$/, "") === route.href.replace(/\/+$/, "") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">{route.mark}</span>
            {route.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
