import { useRef, useState, useEffect } from 'react'
import { useLineage } from '@/context/LineageContext'
import { ILineage } from '@/types'
import './DocRuler.css'

interface NavItem {
  id: string
  label: string
}

interface DocRulerProps {
  activeSection: string
  onNavigate: (id: string) => void
}

/** Build nav items from the current lineage data. */
function buildNavItems(lineage: ILineage[]): NavItem[] {
  const items: NavItem[] = []

  for (const family of lineage) {
    const familyId = family.root?.familyStarted
    if (!familyId) continue

    if (family.parents && family.parents.length > 0) {
      items.push({ id: `${familyId}-parent`, label: 'Parents' })
    }

    items.push({
      id: `${familyId}-root`,
      label: family.root.name,
    })

    if (family.children && family.children.length > 0) {
      items.push({ id: `${familyId}-children`, label: 'Children' })
    }
  }

  return items
}

export default function DocRuler({ activeSection, onNavigate }: DocRulerProps) {
  const rootRef = useRef<HTMLElement>(null)
  const [viewTop, setViewTop] = useState(0)
  const [viewHeight, setViewHeight] = useState(2)
  const [markTops, setMarkTops] = useState<Record<string, number>>({})

  const { lineage } = useLineage()
  const navItems = buildNavItems(lineage)

  useEffect(() => {
    let raf = 0

    function measure() {
      const ruler = rootRef.current
      if (!ruler) return

      const rulerHeight = ruler.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollY = window.scrollY

      setViewHeight(Math.max((winHeight / scrollHeight) * rulerHeight, 2))
      setViewTop(
        Math.min(
          (scrollY / scrollHeight) * rulerHeight,
          rulerHeight - Math.max((winHeight / scrollHeight) * rulerHeight, 2),
        ),
      )

      const items = buildNavItems(lineage)
      const tops: Record<string, number> = {}
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + scrollY
        tops[item.id] = Math.min(
          Math.max((top / scrollHeight) * rulerHeight, 0),
          rulerHeight,
        )
      }
      setMarkTops(tops)
    }

    function onScrollOrResize() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    window.addEventListener('load', onScrollOrResize)
    measure()

    // Re-measure once the cover reveal finishes shifting the layout
    const settleTimer = setTimeout(measure, 3300)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      window.removeEventListener('load', onScrollOrResize)
      cancelAnimationFrame(raf)
      clearTimeout(settleTimer)
    }
  }, [lineage])

  return (
    <nav ref={rootRef} className="doc-ruler" aria-label="On this page">
      <span className="doc-ruler-sensor" aria-hidden="true" />
      <span className="doc-ruler-spine" aria-hidden="true">
        <span className="doc-ruler-cap doc-ruler-cap--top" />
        <span className="doc-ruler-cap doc-ruler-cap--bottom" />
      </span>
      <span
        className="doc-ruler-view"
        aria-hidden="true"
        style={{ top: `${viewTop}px`, height: `${viewHeight}px` }}
      />
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`doc-ruler-mark${activeSection === item.id ? ' is-active' : ''}`}
          style={{ top: `${markTops[item.id] ?? 0}px` }}
          onClick={(e) => {
            e.preventDefault()
            onNavigate(item.id)
          }}
        >
          <span className="doc-ruler-tick" aria-hidden="true" />
          <span className="doc-ruler-label">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
