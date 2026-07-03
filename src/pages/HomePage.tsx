import { Link } from 'react-router-dom'
import { forms } from '../data/forms'

export function HomePage() {
  return (
    <div className="min-h-svh px-4 py-14">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 text-left">
        <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) p-8 shadow-(--shadow)">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--accent)">
            Panel de recolección
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-(--text-h)">
            Formularios de Investigación
          </h1>
          <p className="mt-2 text-(--text)">
            Selecciona un formulario para comenzar a capturar respuestas.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {forms.map((entry) => (
            <Link
              key={entry.path}
              to={entry.path}
              className="group rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-(--shadow) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent)"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-(--text-h)">{entry.menuTitle}</h2>
                <span className="text-(--accent) opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </div>
              {entry.menuDescription && (
                <p className="mt-1 text-sm text-(--text)">{entry.menuDescription}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
