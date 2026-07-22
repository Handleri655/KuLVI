import { useEffect } from 'react'

type PageMeta = {
  title: string
  description: string
  path?: string
}

const SITE = 'https://kulvi.fi'
const DEFAULT_IMAGE = `${SITE}/logo.png`

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function usePageMeta({ title, description, path = '/' }: PageMeta) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} · KuLVI`
    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', `${SITE}${path}`)
    setMeta('property', 'og:image', DEFAULT_IMAGE)
    setMeta('property', 'og:locale', 'fi_FI')
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
  }, [title, description, path])
}
