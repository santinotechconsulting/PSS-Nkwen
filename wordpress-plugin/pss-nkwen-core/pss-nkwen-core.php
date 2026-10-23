<?php
/**
 * Plugin Name: PSS Nkwen Core Website Engine
 * Plugin URI: https://pssnkwen.edu.cm
 * Description: Custom post types, REST API endpoints, CORS support, and secure admissions enquiry registry for Presbyterian Secondary School Nkwen.
 * Version: 1.0.0
 * Author: Santino Tech Consulting
 * Author URI: https://santinotech.example
 * License: GPL2 or later
 * Text Domain: pss-nkwen-core
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class PSS_Nkwen_Core_Plugin {

    public function __construct() {
        add_action('init', array($this, 'register_custom_post_types'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('rest_pre_serve_request', array($this, 'add_cors_headers'), 10, 4);
    }

    /**
     * Register Custom Post Types for Events, Documents, and Private Enquiries
     */
    public function register_custom_post_types() {
        // 1. School Events
        register_post_type('pss_event', array(
            'labels' => array(
                'name' => __('School Events', 'pss-nkwen-core'),
                'singular_name' => __('School Event', 'pss-nkwen-core'),
                'add_new_item' => __('Add New School Event', 'pss-nkwen-core'),
            ),
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-calendar-alt',
            'has_archive' => true,
        ));

        // 2. Public Documents & Forms
        register_post_type('pss_document', array(
            'labels' => array(
                'name' => __('Public Documents', 'pss-nkwen-core'),
                'singular_name' => __('Public Document', 'pss-nkwen-core'),
                'add_new_item' => __('Add New Public Document', 'pss-nkwen-core'),
            ),
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'custom-fields'),
            'menu_icon' => 'dashicons-media-document',
            'has_archive' => true,
        ));

        // 3. Private Enquiries (NOT exposed in public REST or front-end search)
        register_post_type('pss_enquiry', array(
            'labels' => array(
                'name' => __('Admissions & Enquiries', 'pss-nkwen-core'),
                'singular_name' => __('Enquiry Submission', 'pss-nkwen-core'),
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => false, // Attached to custom admin page
            'show_in_rest' => false, // STRICT PRIVACY: Never expose in public WP REST API
            'supports' => array('title', 'editor', 'custom-fields'),
            'capabilities' => array(
                'create_posts' => 'do_not_allow', // Only created via verified REST endpoint or admin
            ),
            'map_meta_cap' => true,
        ));
    }

    /**
     * Add CORS Headers for Headless React Frontend
     */
    public function add_cors_headers($value, $result, $request, $server) {
        $origin = get_http_origin();
        $allowed_origins = apply_filters('pss_nkwen_allowed_origins', array(
            'http://localhost:3000',
            'http://localhost:5173',
            'https://pssnkwen.edu.cm',
        ));

        if ($origin && in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        }

        return $value;
    }

    /**
     * Register Custom REST API Endpoints
     */
    public function register_rest_routes() {
        // Public settings & verified school facts
        register_rest_route('pss-nkwen/v1', '/settings', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_public_settings'),
            'permission_callback' => '__return_true',
        ));

        // Public events endpoint
        register_rest_route('pss-nkwen/v1', '/events', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_public_events'),
            'permission_callback' => '__return_true',
        ));

        // Secure submission endpoint for admission and contact inquiries
        register_rest_route('pss-nkwen/v1', '/submit-enquiry', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_enquiry_submission'),
            'permission_callback' => '__return_true', // Validated internally
        ));
    }

    /**
     * Public settings response
     */
    public function get_public_settings() {
        return rest_ensure_response(array(
            'school_name' => 'Presbyterian Secondary School Nkwen',
            'acronym' => 'PSS Nkwen',
            'centre_number' => '11409',
            'location' => 'Nkwen, Bamenda, North-West Region, Cameroon',
            'directory_telephone' => '677866377',
            'telephone_status' => 'Pending school administration confirmation',
            'developer_credit' => 'Website developed by Santino Tech Consulting - We Build Your Digital Presence.',
        ));
    }

    /**
     * Get public events list
     */
    public function get_public_events() {
        $posts = get_posts(array(
            'post_type' => 'pss_event',
            'posts_per_page' => 20,
            'post_status' => 'publish',
        ));

        $data = array();
        foreach ($posts as $post) {
            $data[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'slug' => $post->post_name,
                'description' => wp_strip_all_tags($post->post_content),
                'date' => get_post_meta($post->ID, '_event_date', true) ?: get_the_date('Y-m-d', $post),
                'time' => get_post_meta($post->ID, '_event_time', true) ?: '09:00 AM',
                'venue' => get_post_meta($post->ID, '_event_venue', true) ?: 'PSS Nkwen Campus',
                'category' => get_post_meta($post->ID, '_event_category', true) ?: 'Academic',
                'isUpcoming' => true,
            );
        }

        return rest_ensure_response($data);
    }

    /**
     * Handle Enquiry Submissions with Server-Side Validation & Sanitization
     */
    public function handle_enquiry_submission($request) {
        $params = $request->get_json_params();

        // 1. Sanitization
        $parent_name = isset($params['parentName']) ? sanitize_text_field($params['parentName']) : (isset($params['fullName']) ? sanitize_text_field($params['fullName']) : '');
        $telephone   = isset($params['telephone']) ? sanitize_text_field($params['telephone']) : '';
        $email       = isset($params['email']) ? sanitize_email($params['email']) : '';
        $intended_class = isset($params['intendedClass']) ? sanitize_text_field($params['intendedClass']) : '';
        $message     = isset($params['message']) ? sanitize_textarea_field($params['message']) : '';
        $form_type   = isset($params['formType']) ? sanitize_text_field($params['formType']) : 'general';

        // 2. Server-side validation
        if (strlen($parent_name) < 3) {
            return new WP_Error('invalid_name', 'Please provide a valid full name (at least 3 characters).', array('status' => 400));
        }

        // Cameroon phone validation (+237 or standard 9 digits)
        $clean_phone = preg_replace('/[\s\-\(\)]/', '', $telephone);
        if (!preg_match('/^(\+?237)?[26][2-9][0-9]{7}$/', $clean_phone)) {
            return new WP_Error('invalid_phone', 'Please provide a valid Cameroon telephone number.', array('status' => 400));
        }

        if (strlen($message) < 10) {
            return new WP_Error('invalid_message', 'Message must be at least 10 characters in length.', array('status' => 400));
        }

        // 3. Generate reference ID
        $reference_id = 'PSS-' . strtoupper(substr($form_type, 0, 3)) . '-' . strtoupper(wp_generate_password(6, false));

        // 4. Store in private post type (No public query access)
        $post_id = wp_insert_post(array(
            'post_type'    => 'pss_enquiry',
            'post_title'   => '[' . strtoupper($form_type) . '] ' . $parent_name . ' (' . $reference_id . ')',
            'post_content' => $message,
            'post_status'  => 'private',
        ));

        if (is_wp_error($post_id)) {
            return new WP_Error('save_failed', 'Unable to record submission. Please contact the school directly.', array('status' => 500));
        }

        // Store metadata securely
        update_post_meta($post_id, '_reference_id', $reference_id);
        update_post_meta($post_id, '_telephone', $telephone);
        update_post_meta($post_id, '_email', $email);
        update_post_meta($post_id, '_intended_class', $intended_class);
        update_post_meta($post_id, '_submission_date', current_time('mysql'));

        // Optional: Notify school administrative email if configured
        $admin_email = get_option('admin_email');
        $subject = "[PSS Nkwen] New Online Enquiry: " . $reference_id;
        $body = "A new online inquiry has been submitted:\n\n"
              . "Name: $parent_name\n"
              . "Telephone: $telephone\n"
              . "Email: $email\n"
              . "Class: $intended_class\n"
              . "Reference: $reference_id\n\n"
              . "Message:\n$message\n\n"
              . "Access this enquiry in WordPress Admin > PSS Nkwen Enquiries.";
        @wp_mail($admin_email, $subject, $body);

        return rest_ensure_response(array(
            'success' => true,
            'referenceId' => $reference_id,
            'message' => 'Enquiry successfully submitted and logged with the school administration.',
        ));
    }

    /**
     * Add WordPress Admin Menus for PSS Nkwen Administration
     */
    public function add_admin_menu() {
        add_menu_page(
            __('PSS Nkwen Desk', 'pss-nkwen-core'),
            __('PSS Nkwen', 'pss-nkwen-core'),
            'manage_options',
            'pss-nkwen-admin',
            array($this, 'render_admin_dashboard'),
            'dashicons-welcome-learn-more',
            25
        );

        add_submenu_page(
            'pss-nkwen-admin',
            __('Admissions & Enquiries', 'pss-nkwen-core'),
            __('Enquiries Log', 'pss-nkwen-core'),
            'manage_options',
            'pss-nkwen-enquiries',
            array($this, 'render_enquiries_page')
        );
    }

    public function render_admin_dashboard() {
        ?>
        <div class="wrap">
            <h1>Presbyterian Secondary School (PSS) Nkwen - Web Portal</h1>
            <p>Developed by <strong>Santino Tech Consulting</strong> - <em>We Build Your Digital Presence.</em></p>
            <hr />
            <div style="background:#fff; padding:20px; border:1px solid #ccd0d4; max-width:800px; border-radius:4px;">
                <h2>Verified School Profile Details</h2>
                <ul>
                    <li><strong>Official Name:</strong> Presbyterian Secondary School Nkwen</li>
                    <li><strong>Acronym:</strong> PSS Nkwen</li>
                    <li><strong>Cameroon GCE Board Centre:</strong> Centre No. 11409</li>
                    <li><strong>Location:</strong> Nkwen, Bamenda, North-West Region, Cameroon</li>
                    <li><strong>PEA Directory Telephone:</strong> 677866377 (Pending confirmation)</li>
                </ul>
                <p>Use the left sidebar menus to publish <strong>Posts</strong> (News), <strong>School Events</strong>, and <strong>Public Documents</strong>.</p>
            </div>
        </div>
        <?php
    }

    public function render_enquiries_page() {
        $enquiries = get_posts(array(
            'post_type' => 'pss_enquiry',
            'posts_per_page' => 50,
            'post_status' => 'private',
        ));
        ?>
        <div class="wrap">
            <h1>Admissions & Contact Enquiries Log</h1>
            <p>Confidential submissions received via the public portal enquiry forms.</p>
            <table class="widefat fixed striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reference ID</th>
                        <th>Parent / Applicant</th>
                        <th>Telephone</th>
                        <th>Intended Class</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($enquiries)): ?>
                        <tr><td colspan="6">No enquiries recorded yet.</td></tr>
                    <?php else: foreach ($enquiries as $item): ?>
                        <tr>
                            <td><?php echo esc_html(get_the_date('Y-m-d H:i', $item)); ?></td>
                            <td><code><?php echo esc_html(get_post_meta($item->ID, '_reference_id', true)); ?></code></td>
                            <td><strong><?php echo esc_html($item->post_title); ?></strong></td>
                            <td><?php echo esc_html(get_post_meta($item->ID, '_telephone', true)); ?></td>
                            <td><?php echo esc_html(get_post_meta($item->ID, '_intended_class', true) ?: 'N/A'); ?></td>
                            <td><?php echo esc_html(wp_trim_words($item->post_content, 15)); ?></td>
                        </tr>
                    <?php endforeach; endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
}

new PSS_Nkwen_Core_Plugin();
