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
    slug: "hamming-15-11-error-correction",
    title: "Decoding the Power of Hamming (15, 11) Code for Error Correction",
    excerpt:
      "Explore the principles, structure, and application of the Hamming (15, 11) code, a robust method for single-bit error detection and correction in digital communications.",
    date: "November 3, 2025",
    readTime: "5 min read",
    tags: ["Error Correction", "Coding Theory", "Digital Systems", "Data Integrity"],
    content: `
      <p>In digital communication and data storage, maintaining <strong>data integrity</strong> is crucial. Noise, interference, and hardware defects can flip a bit (0 to 1, or 1 to 0), causing a single-bit error. <strong>Hamming codes</strong> are a family of linear error-correcting codes designed to effectively detect and correct these single-bit errors.</p>
      
      <h2>The Hamming (n, k) Principle</h2>
      <p>A Hamming code is denoted as <em>(n, k)</em>, where:</p>
      <ul>
        <li><em>n</em>: The <strong>total number of bits</strong> in the codeword (the encoded message).</li>
        <li><em>k</em>: The <strong>number of data bits</strong> being encoded.</li>
        <li><em>m = n - k</em>: The <strong>number of parity bits</strong> (or check bits) added.</li>
      </ul>
      <p>The general relationship is determined by the number of parity bits, <em>m</em>, and must satisfy the condition: <em>2<sup>m</sup> &ge; n + 1</em>. This ensures there are enough parity bit combinations to identify the location of any single-bit error, or confirm no error occurred.</p>
      
      <h2>Structure of Hamming (15, 11)</h2>
      <p>The Hamming (15, 11) code is a powerful instance where:</p>
      <ul>
        <li><strong>Total bits (<em>n</em>):</strong> 15</li>
        <li><strong>Data bits (<em>k</em>):</strong> 11 (the original information)</li>
        <li><strong>Parity bits (<em>m</em>):</strong> <em>15 - 11 = 4</em></li>
      </ul>
      <p>For <em>m=4</em> parity bits, the requirement <em>2<sup>4</sup> &ge; 15 + 1</em> is satisfied, since <em>16 &ge; 16</em>. This allows the code to uniquely identify one of the 15 possible bit positions that could be in error, plus the one position indicating no error (total 16 states).</p>
      
      <h3>Positioning of Parity Bits</h3>
      <p>The 4 parity bits (<em>P<sub>1</sub>, P<sub>2</sub>, P<sub>3</sub>, P<sub>4</sub></em>) are placed at the positions corresponding to powers of 2 (1, 2, 4, 8) within the 15-bit codeword. The remaining 11 positions are used for the data bits (<em>D<sub>1</sub></em> through <em>D<sub>11</sub></em>):</p>
      
      <div class="overflow-x-auto my-6">
        <table class="w-full border-collapse border border-gray-700 text-sm text-center">
          <thead>
            <tr class="bg-gray-800 text-gray-200">
              <th class="border border-gray-600 p-2">1</th>
              <th class="border border-gray-600 p-2">2</th>
              <th class="border border-gray-600 p-2">3</th>
              <th class="border border-gray-600 p-2">4</th>
              <th class="border border-gray-600 p-2">5</th>
              <th class="border border-gray-600 p-2">6</th>
              <th class="border border-gray-600 p-2">7</th>
              <th class="border border-gray-600 p-2">8</th>
              <th class="border border-gray-600 p-2">9</th>
              <th class="border border-gray-600 p-2">10</th>
              <th class="border border-gray-600 p-2">11</th>
              <th class="border border-gray-600 p-2">12</th>
              <th class="border border-gray-600 p-2">13</th>
              <th class="border border-gray-600 p-2">14</th>
              <th class="border border-gray-600 p-2">15</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-gray-900 text-gray-300">
              <td class="border border-gray-600 p-2 font-mono text-blue-500">P<sub>1</sub></td>
              <td class="border border-gray-600 p-2 font-mono text-blue-500">P<sub>2</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>1</sub></td>
              <td class="border border-gray-600 p-2 font-mono text-blue-500">P<sub>3</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>2</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>3</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>4</sub></td>
              <td class="border border-gray-600 p-2 font-mono text-blue-500">P<sub>4</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>5</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>6</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>7</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>8</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>9</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>10</sub></td>
              <td class="border border-gray-600 p-2 font-mono">D<sub>11</sub></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>The Parity Calculation and Error Correction</h2>
      <p>Each parity bit is calculated based on the <strong>XOR</strong> sum of a specific set of data bits. A bit is covered by a parity check if its position number has a '1' in the binary representation corresponding to that parity position.</p>

      <h3>Parity Set Coverage (Example)</h3>
      <p>The <em>P<sub>1</sub></em> bit (position <em>1 = 0001<sub>2</sub></em>) checks all positions where the least significant bit is 1:</p>
      <ul>
        <li><em>P<sub>1</sub></em> checks: 1, 3, 5, 7, 9, 11, 13, 15</li>
        <li><em>P<sub>2</sub></em> checks: 2, 3, 6, 7, 10, 11, 14, 15</li>
        <li><em>P<sub>3</sub></em> checks: 4, 5, 6, 7, 12, 13, 14, 15</li>
        <li><em>P<sub>4</sub></em> checks: 8, 9, 10, 11, 12, 13, 14, 15</li>
      </ul>
    
      <h3>Syndrome Calculation</h3>
      <p>At the receiver, the parity check is re-calculated. The result of these four checks forms a 4-bit value called the <strong>syndrome</strong>. If the syndrome is 0000, there is no error. If the syndrome is non-zero, its binary value directly corresponds to the <strong>position of the bit in error</strong> (from 1 to 15). For example:</p>
    
      <ul>
        <li>Syndrome <em>0110<sub>2</sub></em> (decimal 6) indicates the <strong>6th bit</strong> is flipped and must be corrected.</li>
        <li>Syndrome <em>1000<sub>2</sub></em> (decimal 8) indicates the <strong>8th bit</strong> (<em>P<sub>4</sub></em>) is flipped and must be corrected.</li>
      </ul>
      <p>This self-locating error property makes Hamming codes a highly efficient single-bit error correction mechanism foundational to memory ECC (Error-Correcting Code) and reliable data transmission protocols.</p>
    `,
  },
  {
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics",
    excerpt:
      "A deep dive into TypeScript generics and how they can help you write more reusable and type-safe code.",
    date: "November 1, 2024",
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
