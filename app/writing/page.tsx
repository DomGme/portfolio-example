import Parser from 'rss-parser';

// Define a type for RSS items for better type safety
interface RSSItem {
  title?: string;
  link?: string;
  content?: string;
  'content:encoded'?: string;
  enclosure?: { url: string };
}

function getImageFromItem(item: RSSItem) {
  if (item.enclosure?.url) return item.enclosure.url;
  const match = item['content:encoded']?.match(/<img[^>]+src=\"([^\"]+)\"/);
  if (match) return match[1];
  return null;
}

// Helper function to extract the first two sentences from a string
function getFirstTwoSentences(text: string): string {
  // This regex splits the text into sentences by looking for punctuation followed by a space or end of string
  const sentences = text.match(/[^.!?]+[.!?]+[\s]?/g);
  if (!sentences) return text; // fallback if no sentences found
  // Join the first two sentences, or as many as are available
  return sentences.slice(0, 2).join(' ').trim();
}

export default async function Writing() {
  let feed;
  try {
    const parser = new Parser();
    feed = await parser.parseURL('https://dominiksnotebook.substack.com/feed');
  } catch (e) {
    return (
      <main className="max-w-5xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-[#2E2E2E]">Writing</h1>
        <p className="text-[#607D8B]">Could not load articles. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-[#2E2E2E]">Writing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feed.items.slice(0, 8).map((item: RSSItem, idx: number) => {
          // Fallbacks for missing title or link (shouldn't happen, but safe for type)
          const title = item.title || 'Untitled';
          const link = item.link || '#';
          const image = getImageFromItem(item);
          // Extract the article content (prefer content:encoded, fallback to content)
          const content = item['content:encoded'] || item.content || '';
          // Get the first two sentences for the excerpt
          const excerpt = getFirstTwoSentences(content.replace(/<[^>]+>/g, ''));
          return (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group border-2 border-[#E1E1E1] overflow-hidden flex items-center justify-center"
              style={{
                background: image ? `url(${image}) center/cover no-repeat` : '#607D8B',
              }}
            >
              {image && (
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-200" />
              )}
              <span
                className="relative z-10 text-white text-xl md:text-2xl font-bold uppercase text-center px-4"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  letterSpacing: '0.05em',
                }}
              >
                {title}
              </span>
              {/* Overlay for excerpt, only visible on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#A1887F]/90 p-4"
              >
                <p className="text-white text-base font-sans leading-snug">
                  {/* Show the first two sentences as an excerpt */}
                  {excerpt}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
} 