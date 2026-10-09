import { useEffect, useRef, useState } from 'react'
import { THEMES, type Theme, useThemeStore } from '@/stores/themeStore'

/* ============================================================
   PALETTE DIAL — The Curio Theme Switcher
   
   A compact three-gem dial in the header. Each gem represents
   one theme. The active gem pulses with a soft glow ring.
   Hovering opens a floating card with theme name + description.
   Keyboard: Tab to focus the container, Arrow keys to cycle.
   ============================================================ */

export function PaletteDial() {
  const { theme, setTheme } = useThemeStore()
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleGemClick = (id: Theme) => {
    if (id !== theme) setTheme(id)
  }

  const handleGemHover = (id: Theme) => {
    setHoveredTheme(id)
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current)
    tooltipTimer.current = setTimeout(() => setTooltipVisible(true), 120)
  }

  const handleGemLeave = () => {
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current)
    setTooltipVisible(false)
    setTimeout(() => setHoveredTheme(null), 200)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const themeIds = THEMES.map(t => t.id)
    const currentIndex = themeIds.indexOf(theme)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = themeIds[(currentIndex + 1) % themeIds.length]
      setTheme(next)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = themeIds[(currentIndex - 1 + themeIds.length) % themeIds.length]
      setTheme(prev)
    }
  }

  useEffect(() => {
    return () => {
      if (tooltipTimer.current) clearTimeout(tooltipTimer.current)
    }
  }, [])

  const displayedTheme = hoveredTheme
    ? THEMES.find(t => t.id === hoveredTheme)
    : null

  return (
    <div
      ref={containerRef}
      className="palette-dial"
      role="group"
      aria-label="Theme selector"
      onKeyDown={handleKeyDown}
    >
      {/* Gem buttons */}
      <div className="palette-dial__gems">
        {THEMES.map((t) => {
          const isActive = theme === t.id
          const isHovered = hoveredTheme === t.id

          return (
            <button
              key={t.id}
              className={`palette-dial__gem ${isActive ? 'palette-dial__gem--active' : ''}`}
              onClick={() => handleGemClick(t.id)}
              onMouseEnter={() => handleGemHover(t.id)}
              onMouseLeave={handleGemLeave}
              aria-pressed={isActive}
              aria-label={`Switch to ${t.name} theme — ${t.label}`}
              title={t.name}
            >
              <span
                className="palette-dial__gem-inner"
                style={{
                  background: getGemBackground(t.id),
                  boxShadow: isActive
                    ? `0 0 0 2px var(--color-bg), 0 0 0 3.5px ${t.gemColor}, 0 0 12px ${t.gemGlow}`
                    : isHovered
                    ? `0 0 0 2px var(--color-bg), 0 0 0 2px ${t.gemColor}80`
                    : 'none',
                }}
              />
              {isActive && (
                <span className="palette-dial__gem-pulse" style={{ background: t.gemGlow }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Tooltip card */}
      <div
        className={`palette-dial__tooltip ${tooltipVisible && displayedTheme ? 'palette-dial__tooltip--visible' : ''}`}
        role="tooltip"
        aria-live="polite"
      >
        {displayedTheme && (
          <>
            <span className="palette-dial__tooltip-name">{displayedTheme.name}</span>
            <span className="palette-dial__tooltip-label">{displayedTheme.label}</span>
          </>
        )}
      </div>

      <style>{palettDialStyles}</style>
    </div>
  )
}

function getGemBackground(id: Theme): string {
  switch (id) {
    case 'atelier':
      return 'linear-gradient(135deg, #C9A96E 0%, #8B6914 60%, #5C4010 100%)'
    case 'obsidian':
      return 'linear-gradient(135deg, #3A3A3A 0%, #1A1A1A 60%, #0A0A0A 100%)'
    case 'studio':
      return 'linear-gradient(135deg, #818CF8 0%, #5B6EF5 50%, #3B4DE0 100%)'
  }
}

const palettDialStyles = `
  .palette-dial {
    position: relative;
    display: flex;
    align-items: center;
  }

  .palette-dial__gems {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    padding: 5px 10px;
  }

  .palette-dial__gem {
    position: relative;
    width: 22px;
    height: 22px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .palette-dial__gem:hover {
    transform: scale(1.15);
  }

  .palette-dial__gem--active {
    transform: scale(1.1);
  }

  .palette-dial__gem--active:hover {
    transform: scale(1.18);
  }

  .palette-dial__gem:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: 50%;
  }

  .palette-dial__gem-inner {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: block;
    transition:
      box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .palette-dial__gem-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    animation: gem-pulse 2.5s ease-in-out infinite;
  }

  @keyframes gem-pulse {
    0%, 100% { opacity: 0; transform: scale(1); }
    50%       { opacity: 1; transform: scale(1.6); }
  }

  @media (prefers-reduced-motion: reduce) {
    .palette-dial__gem-pulse { animation: none; opacity: 0; }
    .palette-dial__gem,
    .palette-dial__gem--active,
    .palette-dial__gem--active:hover,
    .palette-dial__gem:hover { transform: none; }
  }

  .palette-dial__tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 7px 12px;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition:
      opacity 150ms ease,
      transform 150ms ease;
    z-index: 200;
  }

  .palette-dial__tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--color-border);
  }

  .palette-dial__tooltip--visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .palette-dial__tooltip-name {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-primary);
    line-height: 1.2;
  }

  .palette-dial__tooltip-label {
    font-size: 10px;
    color: var(--color-text-muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 500;
  }
`
