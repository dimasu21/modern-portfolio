import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables or use hardcoded fallbacks (matching src/lib/supabase.js)
const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://xbqwppphtplntjtbzruk.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhicXdwcHBodHBsbnRqdGJ6cnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTE4NzksImV4cCI6MjA4MjQ4Nzg3OX0.clmUoYGNIUIdliGKfg1N4GIZt2l4chHIMNWmBXlfi3M";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BASE_URL = "https://dimasu.site";

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/skills', priority: '0.8', changefreq: 'monthly' },
  { path: '/experience', priority: '0.8', changefreq: 'monthly' },
  { path: '/certificate', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/guestbook', priority: '0.6', changefreq: 'daily' },
  { path: '/service', priority: '0.7', changefreq: 'monthly' },
];

async function generateSitemap() {
  console.log('🔄 Generating sitemap...');

  try {
    // Fetch blog posts from Supabase
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, created_at')
      .eq('published', true);

    if (error) {
      console.error('❌ Error fetching blog posts:', error);
      process.exit(1);
    }

    console.log(`✅ Found ${posts.length} published blog posts.`);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add Static Routes
    STATIC_ROUTES.forEach(route => {
      sitemap += `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    // Add Dynamic Blog Posts
    posts.forEach(post => {
      sitemap += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.created_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    // Write to file
    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✨ Sitemap generated successfully at public/sitemap.xml');

  } catch (err) {
    console.error('❌ Sitemap generation failed:', err);
    process.exit(1);
  }
}

generateSitemap();
