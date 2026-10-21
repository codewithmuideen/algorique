import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/nunito/wght.css'
import './styles/index.css'
import App, { preloadRoute } from './App'
import { images } from './data/images'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

const loadImage = (image) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    if (image.srcSet) {
      img.sizes = '100vw'
      img.srcset = image.srcSet
    }
    img.src = image.src
  })

// The splash screen (in index.html) stays up until the font and the first
// screen's main photo are ready, so the page appears complete and its entrance
// animations play in full view. Never waits longer than 3.5 seconds.
async function ready() {
  const tasks = [document.fonts?.load('800 1em "Nunito Variable"'), document.fonts?.ready]
  if (location.pathname === '/') tasks.push(loadImage(images.heroRoom))
  else tasks.push(preloadRoute(location.pathname).catch(() => {}))
  await Promise.race([Promise.all(tasks), new Promise((r) => setTimeout(r, 3500))])
}

ready().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
  const splash = document.getElementById('splash')
  if (!splash) return
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      splash.classList.add('is-done')
      setTimeout(() => splash.remove(), 700)
    }),
  )
})
