export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query ?q=" });
  }

  try {
    const apiUrl = `https://cinesubz.pro/wp-json/dooplay/search/?keyword=${encodeURIComponent(q)}`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch from CineSubz" });
    }

    const data = await response.json();

    // Format output cleanly
    const results = data.map(item => ({
      title: item.title || null,
      type: item.type || null,
      img: item.img || null,
      url: item.url || null,
    }));

    res.status(200).json({
      success: true,
      query: q,
      results
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
