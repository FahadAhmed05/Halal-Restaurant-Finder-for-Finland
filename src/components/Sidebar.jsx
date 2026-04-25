import { SidebarIcon } from './icons'

function Sidebar({ title, subtitle, menuItems, actionLabel }) {
  return (
    <aside className="sidebar-panel">
      <div>
        <div className="border-b border-emerald-950/6 px-7 pb-5 pt-7">
          <div className="text-[2rem] font-semibold tracking-[-0.06em] text-emerald-900">
            {title}
          </div>
          <p className="mt-1 text-sm font-medium text-emerald-900/55">{subtitle}</p>
        </div>

        <nav className="space-y-2 px-4 py-5">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`nav-item ${item.active ? 'nav-item-active' : 'nav-item-idle'}`}
            >
              <SidebarIcon type={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="px-5 pb-5">
        <button type="button" className="primary-sidebar-button">
          <span className="text-lg leading-none">+</span>
          {actionLabel}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
