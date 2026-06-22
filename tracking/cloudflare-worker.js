export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }

    if (url.pathname === "/track" && request.method === "POST") {
      return cors(await track(request, env));
    }

    if (url.pathname === "/stats" && request.method === "GET") {
      return cors(await stats(request, env));
    }

    return cors(Response.json({ ok: false, error: "Not found" }, { status: 404 }));
  },
};

async function track(request, env) {
  const payload = await request.json().catch(() => null);
  if (!payload?.event || !payload?.visitorId) {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  await env.DB.prepare(
    `insert into events
      (event, path, search, referrer, visitor_id, params_json, user_agent, ip_country, created_at)
      values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      String(payload.event).slice(0, 80),
      String(payload.path || "").slice(0, 500),
      String(payload.search || "").slice(0, 500),
      String(payload.referrer || "").slice(0, 500),
      String(payload.visitorId).slice(0, 120),
      JSON.stringify(payload.params || {}),
      request.headers.get("user-agent") || "",
      request.cf?.country || "",
      payload.timestamp || new Date().toISOString(),
    )
    .run();

  return Response.json({ ok: true });
}

async function stats(request, env) {
  const auth = request.headers.get("authorization") || "";
  if (env.ADMIN_TOKEN && auth !== `Bearer ${env.ADMIN_TOKEN}`) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const [summary, topPhotos, music, pages] = await Promise.all([
    env.DB.prepare(
      `select
        count(*) as events,
        count(distinct visitor_id) as visitors
       from events`,
    ).first(),
    env.DB.prepare(
      `select json_extract(params_json, '$.photo_title') as title,
        json_extract(params_json, '$.photo_src') as src,
        count(*) as views
       from events
       where event = 'photo_open'
       group by title, src
       order by views desc
       limit 50`,
    ).all(),
    env.DB.prepare(
      `select event, count(*) as count
       from events
       where event in ('music_play', 'music_pause')
       group by event`,
    ).all(),
    env.DB.prepare(
      `select path, count(*) as views, count(distinct visitor_id) as visitors
       from events
       where event = 'page_view'
       group by path
       order by views desc
       limit 50`,
    ).all(),
  ]);

  return Response.json({
    ok: true,
    summary,
    topPhotos: topPhotos.results,
    music: music.results,
    pages: pages.results,
  });
}

function cors(response) {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
