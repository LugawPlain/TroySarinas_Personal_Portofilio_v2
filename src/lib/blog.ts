export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
  tags: string[];
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-nextjs-is-the-future",
    title: "Why Next.js is the Future of React Development",
    excerpt:
      "Explore how Next.js simplifies React development with server-side rendering, static site generation, and API routes.",
    date: "December 2, 2024",
    readTime: "5 min read",
    tags: ["Next.js", "React", "Web Development"],
    content: `
      <p>Next.js has revolutionized the way we build React applications. By providing a framework that handles server-side rendering (SSR) and static site generation (SSG) out of the box, it solves many of the performance and SEO challenges associated with traditional Single Page Applications (SPAs).</p>
      
      <h2>Server-Side Rendering vs. Static Site Generation</h2>
      <p>One of the key features of Next.js is its ability to pre-render pages. This means that the HTML is generated on the server for each request (SSR) or at build time (SSG), resulting in faster initial page loads and better SEO.</p>
      
      <h2>API Routes</h2>
      <p>Next.js also allows you to create API endpoints as Node.js serverless functions. This makes it incredibly easy to build full-stack applications without needing a separate backend server.</p>
      
      <h2>Conclusion</h2>
      <p>With its robust feature set and excellent developer experience, Next.js is undoubtedly a top choice for modern web development.</p>
    `,
  },
  {
    slug: "automating-workflows-with-n8n",
    title: "Automating Workflows with n8n",
    excerpt:
      "Learn how to streamline your business processes and save time by automating repetitive tasks using n8n.",
    date: "November 28, 2024",
    readTime: "7 min read",
    tags: ["Automation", "n8n", "Productivity"],
    content: `
      <p>Automation is no longer a luxury; it's a necessity for businesses looking to scale. n8n is a powerful workflow automation tool that allows you to connect different apps and services together.</p>
      
      <h2>What is n8n?</h2>
      <p>n8n is a fair-code workflow automation tool. It allows you to build complex workflows using a visual node-based editor. You can connect to hundreds of different services, from Google Sheets to Slack to custom APIs.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li><strong>Lead Generation:</strong> Automatically capture leads from your website and add them to your CRM.</li>
        <li><strong>Social Media:</strong> Schedule and cross-post content across multiple platforms.</li>
        <li><strong>Data Sync:</strong> Keep your databases in sync without manual data entry.</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>You can self-host n8n or use their cloud version. Once set up, the possibilities are endless.</p>
    `,
  },
  {
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics",
    excerpt:
      "A deep dive into TypeScript generics and how they can help you write more reusable and type-safe code.",
    date: "November 15, 2024",
    readTime: "6 min read",
    tags: ["TypeScript", "Programming", "Guide"],
    content: `
      <p>TypeScript generics are a powerful feature that allows you to write flexible, reusable code while maintaining type safety. If you've ever found yourself writing duplicate code for different types, generics are the answer.</p>
      
      <h2>What are Generics?</h2>
      <p>Generics allow you to define a component (function, class, or interface) that can work over a variety of types rather than a single one. It's like a variable for types.</p>
      
      <h2>Example</h2>
      <pre><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}</code></pre>
      
      <p>In this example, <code>T</code> captures the type of the argument provided, allowing us to use it as the return type.</p>
      
      <h2>Why Use Them?</h2>
      <p>Generics provide a way to create reusable components that are still type-safe. They are essential for building robust libraries and applications.</p>
    `,
  },
];
