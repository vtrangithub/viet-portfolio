import { useState, useEffect } from "react";

const TechNews = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("top");
  const [hoveredId, setHoveredId] = useState(null);

  const ENDPOINTS = {
    top: "https://hacker-news.firebaseio.com/v0/topstories.json",
    new: "https://hacker-news.firebaseio.com/v0/newstories.json",
    best: "https://hacker-news.firebaseio.com/v0/beststories.json",
  };

  const timeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() / 1000 - timestamp) / 60);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const getDomain = (url) => {
    if (!url) return "news.ycombinator.com";
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "ycombinator.com";
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(ENDPOINTS[filter]);
        const ids = await res.json();
        const top12 = ids.slice(0, 12);
        const storyData = await Promise.all(
          top12.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (r) => r.json()
            )
          )
        );
        setStories(storyData.filter((s) => s && s.title));
      } catch (err) {
        setError("Failed to load stories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [filter]);

  return (
    <section id="tech-news" style={styles.section}>
      {/* Background grid effect */}
      <div style={styles.gridOverlay} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.terminalDot}>
              <span style={{ ...styles.dot, background: "#ff5f57" }} />
              <span style={{ ...styles.dot, background: "#febc2e" }} />
              <span style={{ ...styles.dot, background: "#28c840" }} />
            </div>
            <h2 style={styles.title}>
              <span style={styles.titleAccent}>//</span> TECH_FEED
            </h2>
          </div>
          <p style={styles.subtitle}>Live from Hacker News</p>
        </div>

        {/* Filter tabs */}
        <div style={styles.filterRow}>
          {["top", "new", "best"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterBtnActive : {}),
              }}
            >
              {f === "top" && "▲ "}
              {f === "new" && "◆ "}
              {f === "best" && "★ "}
              {f.toUpperCase()}
            </button>
          ))}
          <div style={styles.liveBadge}>
            <span style={styles.liveDot} />
            LIVE
          </div>
        </div>

        {/* Content */}
        {loading && (
          <div style={styles.loadingWrap}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ ...styles.skeleton, animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠</span> {error}
          </div>
        )}

        {!loading && !error && (
          <div style={styles.grid}>
            {stories.map((story, i) => (
              <a
                key={story.id}
                href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.card,
                  ...(hoveredId === story.id ? styles.cardHovered : {}),
                }}
                onMouseEnter={() => setHoveredId(story.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Rank */}
                <div style={styles.rank}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div style={styles.cardBody}>
                  <p style={styles.domain}>{getDomain(story.url)}</p>
                  <h3 style={styles.cardTitle}>{story.title}</h3>

                  <div style={styles.cardMeta}>
                    <span style={styles.metaItem}>
                      <span style={styles.metaIcon}>▲</span>
                      {story.score}
                    </span>
                    <span style={styles.metaDivider}>·</span>
                    <span style={styles.metaItem}>
                      <span style={styles.metaIcon}>💬</span>
                      {story.descendants ?? 0}
                    </span>
                    <span style={styles.metaDivider}>·</span>
                    <span style={styles.metaItem}>{timeAgo(story.time)}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  ...styles.arrow,
                  ...(hoveredId === story.id ? styles.arrowHovered : {}),
                }}>
                  →
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <a
            href="https://news.ycombinator.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerLink}
          >
            View all on Hacker News →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    position: "relative",
    padding: "80px 0",
    background: "#0a0e17",
    overflow: "hidden",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "12px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  terminalDot: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
  },
  title: {
    fontSize: "clamp(20px, 3vw, 28px)",
    fontWeight: 700,
    color: "#e8f4f8",
    margin: 0,
    letterSpacing: "0.08em",
  },
  titleAccent: {
    color: "#00ff88",
    marginRight: "8px",
  },
  subtitle: {
    fontSize: "12px",
    color: "#4a6580",
    margin: 0,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "32px",
    flexWrap: "wrap",
  },
  filterBtn: {
    background: "transparent",
    border: "1px solid #1e2d3d",
    color: "#4a6580",
    padding: "6px 14px",
    fontSize: "11px",
    fontFamily: "inherit",
    letterSpacing: "0.1em",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "all 0.2s ease",
  },
  filterBtnActive: {
    border: "1px solid #00ff88",
    color: "#00ff88",
    background: "rgba(0,255,136,0.05)",
  },
  liveBadge: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    color: "#00ff88",
    letterSpacing: "0.15em",
  },
  liveDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#00ff88",
    display: "inline-block",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  loadingWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "16px",
  },
  skeleton: {
    height: "110px",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #111b27 25%, #1a2840 50%, #111b27 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  },
  errorBox: {
    padding: "20px",
    border: "1px solid #ff4444",
    borderRadius: "4px",
    color: "#ff6666",
    fontSize: "13px",
    background: "rgba(255,68,68,0.05)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  errorIcon: {
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "12px",
  },
  card: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "18px 20px",
    background: "#0d1520",
    border: "1px solid #1a2840",
    borderRadius: "4px",
    textDecoration: "none",
    transition: "all 0.2s ease",
    animation: "fadeUp 0.4s ease both",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  cardHovered: {
    background: "#111d2e",
    border: "1px solid #00ff8840",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,255,136,0.1)",
  },
  rank: {
    fontSize: "11px",
    color: "#00ff8860",
    fontWeight: 700,
    minWidth: "24px",
    paddingTop: "2px",
    letterSpacing: "0.05em",
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
  },
  domain: {
    fontSize: "10px",
    color: "#4a6580",
    margin: "0 0 6px",
    letterSpacing: "0.08em",
    textTransform: "lowercase",
  },
  cardTitle: {
    fontSize: "13px",
    color: "#c8dde8",
    margin: "0 0 12px",
    lineHeight: 1.5,
    fontWeight: 500,
    fontFamily: "system-ui, sans-serif",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexWrap: "wrap",
  },
  metaItem: {
    fontSize: "11px",
    color: "#4a6580",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    letterSpacing: "0.05em",
  },
  metaIcon: {
    fontSize: "10px",
    color: "#00ff8880",
  },
  metaDivider: {
    color: "#1e2d3d",
    fontSize: "14px",
  },
  arrow: {
    fontSize: "16px",
    color: "#1e2d3d",
    transition: "all 0.2s ease",
    paddingTop: "2px",
    flexShrink: 0,
  },
  arrowHovered: {
    color: "#00ff88",
    transform: "translateX(3px)",
  },
  footer: {
    marginTop: "32px",
    textAlign: "center",
  },
  footerLink: {
    fontSize: "12px",
    color: "#4a6580",
    textDecoration: "none",
    letterSpacing: "0.1em",
    transition: "color 0.2s",
  },
};

export default TechNews;
