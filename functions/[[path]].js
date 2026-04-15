export async function onRequest(context) {
  const url = new URL(context.request.url)

  // PRIORITAS: pakai query dulu
  let slug = url.searchParams.get("search")

  // kalau tidak ada, pakai path
  if (!slug) {
    slug = url.pathname.replace("/", "")
  }

  if (!slug) {
    return new Response("No search / path provided")
  }

  const target = `https://tikettogel.com/${slug}`

  let res
  try {
    res = await fetch(target)
  } catch (e) {
    return new Response("Fetch error: " + e.message)
  }

  const html = await res.text()

  const title =
    html.match(/<title>(.*?)<\/title>/i)?.[1] || "No Title"

  const desc =
    html.match(/<meta name="description" content="(.*?)"/i)?.[1] || ""

  return new Response(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="description" content="${desc}">
</head>
<body>
  <h1>${title}</h1>
  <p>${desc}</p>
</body>
</html>
  `, {
    headers: {
      "content-type": "text/html"
    }
  })
}