import './MiniMap.css'

type MiniMapProps = {
  query: string
  title: string
  /** Compact for footer / inline rows */
  size?: 'sm' | 'md'
}

export default function MiniMap({ query, title, size = 'md' }: MiniMapProps) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`

  return (
    <div className={`mini-map mini-map--${size}`}>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
