import { Link, NavLink } from "react-router-dom";
import { SidebarIcon } from "./icons";

function Sidebar({ title, subtitle, menuItems, actionLabel }) {
  return (
    <aside className="sidebar-panel">
      <div>
        <div className="border-b border-emerald-950/6 px-7 pb-5 pt-7">
          <Link to="/">
            <div className="text-[2rem] font-semibold tracking-[-0.06em] text-emerald-900">
              {title}
            </div>
          </Link>
          <p className="mt-1 text-sm font-medium text-emerald-900/55">
            {subtitle}
          </p>
        </div>

        <nav className="space-y-2 px-4 py-5">
          {menuItems.map((item) =>
            item.path ? (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "nav-item-active" : "nav-item-idle"}`
                }
              >
                <SidebarIcon type={item.icon} />
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate">{item.label}</span>
                  {typeof item.badge === "number" && item.badge > 0 ? (
                    <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-emerald-950 px-2 py-0.5 text-[0.7rem] font-bold text-white shadow-[0_12px_20px_rgba(20,66,40,0.18)]">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
              </NavLink>
            ) : (
              <button
                type="button"
                key={item.id}
                className={`nav-item ${item.active ? "nav-item-active" : "nav-item-idle"}`}
              >
                <SidebarIcon type={item.icon} />
                <span>{item.label}</span>
              </button>
            ),
          )}
        </nav>
      </div>

      <div className="px-5 pb-5">
        <button type="button" className="primary-sidebar-button">
          <span className="text-lg leading-none">+</span>
          {actionLabel}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
