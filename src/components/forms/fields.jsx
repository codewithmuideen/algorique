import { cn } from '../../lib/motion'

export function Field({ label, htmlFor, error, hint, optional, children, className }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="field-label">
          {label}
          {optional && <span className="ml-1 font-normal text-stone">(optional)</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1.5 text-[13px] text-stone">{hint}</p>}
      {error && (
        <p className="field-error" id={htmlFor ? `${htmlFor}-error` : undefined} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Radio or checkbox group rendered as pill chips. Native inputs keep it
// keyboard- and screen-reader-friendly.
export function Chips({ legend, name, options, register, error, type = 'radio', optional, className }) {
  return (
    <fieldset className={className} aria-invalid={!!error || undefined}>
      <legend className="field-label">
        {legend}
        {optional && <span className="ml-1 font-normal text-stone">(optional)</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={cn(
              'relative inline-flex min-h-11 cursor-pointer items-center rounded-full border border-ink/15 bg-white px-4 text-sm font-semibold text-ink transition-colors duration-300',
              'hover:border-ink/40 has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-ivory',
              'has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-forest/30',
            )}
          >
            <input type={type} value={opt} className="sr-only" {...register(name)} />
            {opt}
          </label>
        ))}
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
    </fieldset>
  )
}
