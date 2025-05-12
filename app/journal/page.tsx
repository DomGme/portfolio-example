// app/journal/page.tsx
// Mimics the brutalist grid design of https://andersen-andersen.com/blogs/journal
// 3-column grid, edge-to-edge, each article is a large tile (image or color), title centered, excerpt at the bottom, no card shadow, just borders.

import Parser from 'rss-parser';

// Define a type for RSS items for better type safety
interface RSSItem {
  title?: string;
  link?: string;
  content?: string;
  'content:encoded'?: string;
  enclosure?: { url: string };
}

// Helper function to extract the first two sentences from a string
function getFirstTwoSentences(text: string): string {
  // This regex splits the text into sentences by looking for punctuation followed by a space or end of string
  const sentences = text.match(/[^.!?]+[.!?]+[\s]?/g);
  if (!sentences) return text; // fallback if no sentences found
  // Join the first two sentences, or as many as are available
  return sentences.slice(0, 2).join(' ').trim();
}

// Helper to extract an image from the RSS item (if available)
function getImageFromItem(item: RSSItem) {
  if (item.enclosure?.url) return item.enclosure.url;
  const match = item['content:encoded']?.match(/<img[^>]+src=\"([^\"]+)\"/);
  if (match) return match[1];
  return null;
}

// The main Journal page is now an async function so we can fetch the RSS feed
export default async function Journal() {
  let feed;
  try {
    const parser = new Parser();
    feed = await parser.parseURL('https://dominiksnotebook.substack.com/feed');
  } catch (e) {
    return (
      <main className="w-full min-h-screen p-0 m-0 flex items-center justify-center">
        <p className="text-[#607D8B] text-xl">Could not load journal articles. Please try again later.</p>
      </main>
    );
  }

  // Color palette for fallback/alternating backgrounds
  const PLACEHOLDER_COLORS = [
    '#FF6600', // Andersen-Andersen orange
    '#607D8B', // Muted Slate Blue
    '#A1887F', // Warm Taupe
    '#90A4AE', // Cool Mist Blue
    '#C8E6C9', // Pale Muted Green
  ];

  return (
    <main className="w-full min-h-screen p-0 m-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full">
        {feed.items.slice(0, 12).map((item: RSSItem, idx: number) => {
          // Fallbacks for missing title or link (shouldn't happen, but safe for type)
          const title = item.title || 'Untitled';
          const link = item.link || '#';
          // Try to get an image from the article, fallback to a color
          const image = getImageFromItem(item);
          // Extract the article content (prefer content:encoded, fallback to content)
          const content = item['content:encoded'] || item.content || '';
          // Get the first two sentences for the excerpt
          const excerpt = getFirstTwoSentences(content.replace(/<[^>]+>/g, ''));
          const color = PLACEHOLDER_COLORS[idx % PLACEHOLDER_COLORS.length];
          return (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex flex-col justify-between border border-[#E1E1E1] aspect-square min-h-[250px] w-full overflow-hidden"
              style={{
                background: image ? `url(${image}) center/cover no-repeat` : color,
              }}
            >
              {/* Overlay: transparent by default, orange on hover */}
              <div
                className={`absolute inset-0 flex flex-col justify-between transition-all duration-300 bg-transparent group-hover:bg-[#FF6600] z-10`}
              >
                {/* Centered title, always visible but turns white on hover */}
                <div className="flex-1 flex items-center justify-center">
                  <span
                    className="text-black group-hover:text-white text-xl md:text-2xl font-bold uppercase text-center px-4 w-full transition-colors duration-300"
                    style={{
                      letterSpacing: '0.05em',
                      textShadow: image ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {title}
                  </span>
                </div>
                {/* Excerpt/description: only visible on hover, bottom justified */}
                {excerpt && (
                  <div className="w-full px-4 pb-8 pt-2 text-base md:text-lg font-normal text-white text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {excerpt}
                  </div>
                )}
              </div>
              {/* For accessibility, keep the title visible off-hover for screen readers */}
              <span className="sr-only">{title}</span>
            </a>
          );
        })}
      </div>
    </main>
  );
} 