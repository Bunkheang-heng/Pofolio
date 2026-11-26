import { useState } from "react";
import "./ReeltimeDemo.css";

const SAMPLE_MOVIES = [
  { id: "m1", title: "Dune: Part Two", genre: "Sci-Fi · 4K", rating: "8.8", tag: "Featured" },
  { id: "m2", title: "Cyberpunk: Edgerunners", genre: "Anime · HDR", rating: "8.6", tag: "Trending" },
  { id: "m3", title: "Interstellar", genre: "Adventure · IMAX", rating: "8.7", tag: "Classic" },
  { id: "m4", title: "Blade Runner 2049", genre: "Cyberpunk · 4K", rating: "8.0", tag: "Cult" },
];

export default function ReeltimeDemo() {
  const [activeTab, setActiveTab] = useState("catalog"); // "catalog" | "watchlist" | "player"
  const [watchlist, setWatchlist] = useState(["m1", "m2"]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resolution, setResolution] = useState("4K UHD");

  const toggleWatchlist = (id) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="reeltime-demo" role="region" aria-label="REELTIME Media Interactive App Prototype">
      {/* Phone Header Bar */}
      <div className="phone-topbar">
        <div className="phone-brand">
          <span className="phone-dot" aria-hidden="true" />
          <span>REELTIME MEDIA // MOBILE STREAMING PROTOTYPE</span>
        </div>
        <span className="phone-tag">Cross-Platform Web &amp; Mobile</span>
      </div>

      {/* Screen Navigation Tabs */}
      <div className="phone-nav-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "catalog"}
          className={`tab-btn ${activeTab === "catalog" ? "active" : ""}`}
          onClick={() => setActiveTab("catalog")}
        >
          🎬 Catalog
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "watchlist"}
          className={`tab-btn ${activeTab === "watchlist" ? "active" : ""}`}
          onClick={() => setActiveTab("watchlist")}
        >
          🔖 Watchlist ({watchlist.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "player"}
          className={`tab-btn ${activeTab === "player" ? "active" : ""}`}
          onClick={() => setActiveTab("player")}
        >
          ▶ Stream Player
        </button>
      </div>

      {/* Screen Content Viewport */}
      <div className="phone-screen">
        {activeTab === "catalog" && (
          <div className="screen-catalog">
            <div className="catalog-search-fake">
              <span>⌕</span>
              <span>Search 10,000+ movies &amp; series...</span>
            </div>

            <div className="movies-grid">
              {SAMPLE_MOVIES.map((movie) => {
                const isSaved = watchlist.includes(movie.id);
                return (
                  <div key={movie.id} className="movie-card-mini">
                    <div className="movie-poster-mock">
                      <span className="poster-tag">{movie.tag}</span>
                      <span className="poster-icon">🍿</span>
                    </div>
                    <div className="movie-info-mini">
                      <strong>{movie.title}</strong>
                      <small>{movie.genre} · ★ {movie.rating}</small>
                      <button
                        type="button"
                        className={`save-btn-mini ${isSaved ? "saved" : ""}`}
                        onClick={() => toggleWatchlist(movie.id)}
                      >
                        {isSaved ? "✓ In Watchlist" : "+ Add to Watchlist"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "watchlist" && (
          <div className="screen-watchlist">
            <div className="watchlist-header-bar">
              <span>Synced Profile Watchlist</span>
              <small>Cloud Sync via Firebase</small>
            </div>

            {watchlist.length === 0 ? (
              <div className="watchlist-empty">
                <p>Your watchlist is empty.</p>
                <button type="button" onClick={() => setActiveTab("catalog")}>
                  Browse Catalog ↗
                </button>
              </div>
            ) : (
              <div className="watchlist-list">
                {SAMPLE_MOVIES.filter((m) => watchlist.includes(m.id)).map((movie) => (
                  <div key={movie.id} className="watchlist-row">
                    <span className="watchlist-title"><strong>{movie.title}</strong> ({movie.genre})</span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => toggleWatchlist(movie.id)}
                      title="Remove from list"
                    >
                      Remove ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "player" && (
          <div className="screen-player">
            <div className="mock-video-box">
              <div className="player-overlay">
                <span className="player-title">NOW STREAMING: Dune: Part Two</span>
                <span className="player-quality">{resolution} · HLS Adaptive</span>
              </div>
              <div className="player-center-btn">
                <button
                  type="button"
                  className="play-toggle-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause stream" : "Play stream"}
                >
                  {isPlaying ? "❚❚ Pause" : "▶ Play 4K"}
                </button>
              </div>
            </div>

            <div className="player-controls-row">
              <div className="res-selector" role="group" aria-label="Stream Resolution">
                {["1080p", "4K UHD", "HDR"].map((res) => (
                  <button
                    key={res}
                    type="button"
                    className={`res-pill ${resolution === res ? "active" : ""}`}
                    onClick={() => setResolution(res)}
                  >
                    {res}
                  </button>
                ))}
              </div>
              <span className="buffer-metric">Buffer: 45.2 MB (Stable)</span>
            </div>
          </div>
        )}
      </div>

      {/* Phone Footer */}
      <div className="phone-footer">
        <span>
          ✓ Demonstrates cross-platform media streaming architecture &amp; reactive client-state synchronization.
        </span>
      </div>
    </div>
  );
}
