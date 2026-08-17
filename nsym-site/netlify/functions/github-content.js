// Server-side proxy for GitHub's Contents API. The real GitHub token lives
// only here, as a Netlify environment variable (GITHUB_TOKEN) — it never
// reaches the browser, unlike the earlier approach of embedding it directly
// in admin.html (which GitHub's own secret-scanning promptly revoked).
//
// Called by admin.html as:
//   GET  /.netlify/functions/github-content?path=choirs.html
//   PUT  /.netlify/functions/github-content?path=choirs.html   (JSON body: {content, sha, message})

const REPO = "Thisistorq/nsym-website";

exports.handler = async (event) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { statusCode: 500, body: JSON.stringify({ error: "GITHUB_TOKEN not set in Netlify environment variables" }) };
  }

  const path = event.queryStringParameters && event.queryStringParameters.path;
  if (!path) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing ?path= parameter" }) };
  }

  const url = "https://api.github.com/repos/" + REPO + "/contents/" + path;
  const headers = {
    "Authorization": "token " + token,
    "Accept": "application/vnd.github+json",
    "User-Agent": "nsym-admin-panel"
  };

  try {
    if (event.httpMethod === "GET") {
      const res = await fetch(url, { headers });
      const data = await res.text();
      return { statusCode: res.status, headers: { "Content-Type": "application/json" }, body: data };
    }

    if (event.httpMethod === "PUT") {
      headers["Content-Type"] = "application/json";
      const res = await fetch(url, { method: "PUT", headers, body: event.body });
      const data = await res.text();
      return { statusCode: res.status, headers: { "Content-Type": "application/json" }, body: data };
    }

    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
