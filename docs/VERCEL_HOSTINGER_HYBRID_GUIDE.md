# Hybrid Deployment Guide: Vercel Frontend + Hostinger WordPress
**Prepared by Santino Tech Consulting - "We Build Your Digital Presence"**

This guide provides instructions for the recommended high-performance decoupled architecture:
- **Frontend**: React + TypeScript + Vite hosted on Vercel's global Edge CDN.
- **Backend / CMS**: WordPress hosted on a secure PHP/MySQL Hostinger plan.

---

## 1. Why Decoupled Hybrid?
- **Speed & Global CDN**: The public website loads instantaneously across Cameroon and globally with automated asset caching on Vercel.
- **Editorial Ease**: School teachers and administrators continue to use the standard WordPress admin panel to post news, events, and update documents without touching code.
- **Security**: The WordPress database and backend are isolated from public traffic spikes, reducing attack surfaces.

---

## 2. Deploying Frontend to Vercel

### Step 1: Create GitHub Repository
1. In the project root, initialize and commit the clean codebase:
   ```bash
   git init
   git add .
   git commit -m "Initial release of PSS Nkwen official school website"
   ```
2. Create a private or organizational repository on GitHub: `pss-nkwen-website`.
3. Push the codebase:
   ```bash
   git remote add origin https://github.com/your-org/pss-nkwen-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New... > Project** and select your `pss-nkwen-website` repository.
3. Configure the Project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set Environment Variables:
   - `VITE_WORDPRESS_API_BASE_URL`: `https://cms.pssnkwen.edu.cm/wp-json`
5. Click **Deploy**.

### Step 3: SPA Rewrite Rule for Vercel
Create or verify `vercel.json` in root to support clean client-side routing on nested URL refreshes (`/about`, `/admissions`, `/news/slug`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 3. Configuring Hostinger WordPress for Vercel

1. **Install WordPress** at a dedicated CMS subdomain: `https://cms.pssnkwen.edu.cm`.
2. **Install Custom Plugin**: Upload `/wordpress-plugin/pss-nkwen-core/` and activate it.
3. **Configure CORS**:
   Add your Vercel deployment domains (e.g. `https://pss-nkwen.vercel.app` and `https://pssnkwen.edu.cm`) to the allowed CORS origins in `pss-nkwen-core.php`.
4. **Permalinks**: Ensure WordPress is set to `Settings > Permalinks > Post name`.

---

## 4. End-to-End Testing
1. Visit the Vercel URL.
2. Verify all pages navigate without page flicker.
3. Test refreshing `/admissions` directly in the browser address bar (confirms SPA rewrite).
4. Publish a test announcement in Hostinger WordPress and confirm it appears on the Vercel site's News page.
