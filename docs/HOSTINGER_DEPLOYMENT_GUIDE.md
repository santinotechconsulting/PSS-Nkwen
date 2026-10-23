# Hostinger Deployment Guide: Presbyterian Secondary School (PSS) Nkwen
**Prepared by Santino Tech Consulting - "We Build Your Digital Presence"**

This guide provides step-by-step instructions for deploying the official PSS Nkwen website using Hostinger hosting services.

---

## 1. Architecture Overview
- **WordPress Backend**: Installed on Hostinger WordPress Hosting (PHP 8.1+ / MySQL 8.0+).
- **Custom Core Plugin**: `pss-nkwen-core` uploaded to `/wp-content/plugins/` to provide REST API endpoints, CORS handling, custom post types, and secure enquiry logging.
- **Frontend**: React SPA built with Vite (`npm run build`), uploaded to Hostinger `public_html` or a dedicated subdomain (e.g., `www.pssnkwen.edu.cm` with backend at `cms.pssnkwen.edu.cm`).

---

## 2. Prerequisites
1. A Hostinger Premium, Business, or Cloud Web Hosting plan.
2. A registered domain name (e.g., `pssnkwen.edu.cm` or `pss-nkwen.org`).
3. Access to Hostinger hPanel.

---

## 3. Step-by-Step Installation

### Step A: Set Up WordPress on Hostinger
1. Log in to Hostinger hPanel.
2. Go to **Websites > Add Website** and choose your domain.
3. Select **Auto Installer > WordPress**.
4. Configure site credentials:
   - **Administrator Username**: (e.g., `pss_admin`)
   - **Administrator Password**: Generate a strong 20+ character password.
   - **Administrator Email**: The official administrative email.
5. In **Security**, activate **Free SSL (HTTPS)** and turn on **Automatic Force HTTPS**.

### Step B: Install the Custom Plugin
1. Compress the `/wordpress-plugin/pss-nkwen-core/` folder into a `.zip` archive named `pss-nkwen-core.zip`.
2. In WordPress Admin, navigate to **Plugins > Add New > Upload Plugin**.
3. Choose `pss-nkwen-core.zip` and click **Install Now**, then **Activate Plugin**.
4. In WP Admin sidebar, verify that **PSS Nkwen Desk** and **Enquiries Log** menu items appear.

### Step C: Configure WordPress Permalinks & REST API
1. Navigate to **Settings > Permalinks**.
2. Select **Post name** (`/%postname%/`) and click **Save Changes**.
   *(Note: This is mandatory for WordPress REST API routing `/wp-json/` to function).*
3. Test your REST API URL in the browser:
   `https://your-wordpress-domain.com/wp-json/pss-nkwen/v1/settings`
   It should return a JSON response with PSS Nkwen verified facts.

### Step D: Build & Deploy the React Frontend
1. On your development machine:
   ```bash
   # Set the production WordPress API URL in .env
   VITE_WORDPRESS_API_BASE_URL=https://your-wordpress-domain.com/wp-json
   
   # Build production assets
   npm run build
   ```
2. The compiled assets will be in the `/dist` directory.
3. In Hostinger hPanel, open **File Manager**:
   - If deploying to a frontend subdomain (e.g. `www.pssnkwen.edu.cm`), upload all files from `/dist` into that folder's `public_html`.
   - Ensure an `.htaccess` file exists to support client-side HTML5 history routing:
     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
     </IfModule>
     ```

### Step E: Configure CORS in Hostinger
If your frontend runs on a separate subdomain or domain from the WordPress installation:
1. Open the plugin file or edit `wp-config.php` to whitelist your frontend URL:
   ```php
   // In wp-config.php or via pss-nkwen-core plugin filter
   add_filter('pss_nkwen_allowed_origins', function($origins) {
       $origins[] = 'https://pssnkwen.edu.cm';
       $origins[] = 'https://www.pssnkwen.edu.cm';
       return $origins;
   });
   ```

### Step F: Setup Automated Daily Backups
1. In Hostinger hPanel, go to **Files > Backups**.
2. Confirm **Daily Backups** is active.
3. Test generating an on-demand snapshot of the database and web files.

---

## 4. Verification Checklist
- [ ] HTTPS lock icon displays without warnings.
- [ ] React frontend loads smoothly on mobile and desktop.
- [ ] News, events, and downloadable documents synchronize from WordPress.
- [ ] Testing admission enquiry form returns a valid reference code and registers securely in WP Admin.
