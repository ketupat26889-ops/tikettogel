export async function onRequest(context) {
  const url = new URL(context.request.url)

  let slug = url.searchParams.get("search") || url.pathname.replace("/", "")

  const target = `https://boldbettiesoutfitters.com/${slug}`

  const res = await fetch(target)
  let html = await res.text()

  // fix relative assets
  html = html
    .replaceAll('href="/', 'href="https://boldbettiesoutfitters.com/')
    .replaceAll('src="/', 'src="https://boldbettiesoutfitters.com/')

  return new Response(html, {
    headers: {
      "content-type": "text/html"
    }
  })
}