export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8] p-4">
      {/* Main heading introducing yourself */}
      <h1 className="text-3xl md:text-5xl font-bold text-[#2E2E2E] mb-4 text-center">
        Hi, my name is Dominik
      </h1>
      {/* About me paragraph with placeholder text */}
      <p className="text-[#607D8B] text-lg md:text-xl max-w-xl text-center mb-8">
        I am a passionate developer excited to showcase my work. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.
      </p>
      {/* Button to navigate to the projects page */}
      <a
        href="/projects"
        className="px-6 py-3 rounded bg-[#607D8B] text-[#F8F8F8] font-semibold shadow transition-colors duration-200 hover:bg-[#546E7A] focus:outline-none focus:ring-2 focus:ring-[#A1887F]"
      >
        View My Projects
      </a>
    </main>
  );
}

// this is the main page of the app
// it will be the first thing that loads when the user navigates to the app
// it will display a welcome message and a button to navigate to the about page
// the about page will display information about the app and the developer
// the about page will be linked to the main page


