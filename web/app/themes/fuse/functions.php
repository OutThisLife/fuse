<?php
/**
 * CRM
 *
 * Main Functions
 */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS'):
	$origin = $_SERVER['HTTP_ORIGIN'];
	$whitelist = '/(localhost|chrome-extension|fuse)/';

	if (preg_match($whitelist, $origin)) {
		header('Access-Control-Allow-Origin: ' . $origin);
		header('Access-Control-Allow-Headers: X-Requested-With');
	} else {
		header('HTTP/1.0 401 Unauthorized');
	}
	exit;
endif;

require_once 'classes/sys/autoloader.php';
(new BaseTheme())->debug(isset($_GET['debug']))->adminBar(0)

// -----------------------------------------------

/**
 * Set up the front-end
 */
->addImageSizes([[
	'masthead' => [1920],
	'school_thumb' => [500 * 2, 337 * 2],
]])

// -----------------------------------------------

/**
 * Set up the back-end
 */
->addMenus([[
	'header' => 'Header Menu',
	'footer' => 'Footer Menu',
	'sm-footer' => 'Small Footer Menu',
	'social' => 'Social Menu',
]])

->addSettings([[
	# General settings tab
	'General' => [
		'phone' => [
			'name' => 'Phone #',
			'type' => 'text',
			'desc' => 'Use [phone] to retrieve this value.',
		],
	],

	# Footer settings tab
	'Footer' => [
		'scripts' => [
			'name' => 'Extra Scripts',
			'type' => 'textarea',
			'desc' => 'If used, these scripts will be loaded in the footer. Put things like Google Analytics in here.',
		],
	],
]])

->addShortcodes([[
	# [phone]
	'phone' => function() {
		return BackEnd::getOption('phone');
	},

	# [button]
	'button' => function($args, $content = '') {
		return '<a href="'. $args['url'] .'" class="btn '. $args['style'] .'">'. $content .'</a>';
	},

	# [grid]
	'grid' => function($args, $content) {
		return '<div class="grid grid-'. $args['cols'] .'">'. do_shortcode($content) .'</div>';
	},

	# [grid_item]
	'grid_item' => function($args, $content) {
		return '<div class="item">'. do_shortcode($content) .'</div>';
	},

	# [lead]
	'lead' => function($args, $content) {
		return '<div class="lead">'. $content .'</div>';
	},

	# [youtube]
	'youtube' => function($args, $content) {
		return '<div class="responsive-video"><iframe width="560" height="315" src="https://www.youtube.com/embed/'. $args['id'] .'" frameborder="0" allowfullscreen></iframe></div>';
	},

	# [testimonial]
	'testimonial' => function($args, $content) {
		ob_start();
		include locate_template('partials/shortcode-testimonial.php');
		return ob_get_clean();
	},

	# [search]
	'search' => function($args, $content) {
		ob_start();
		include locate_template('partials/shortcode-search.php');
		return ob_get_clean();
	},
]])

// -----------------------------------------------

->render();

// -----------------------------------------------

remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

add_action('wp_enqueue_scripts', function() {
	if (is_admin()) return;

	wp_deregister_script('wp-embed.min.js');
	wp_deregister_script('wp-embed');
	wp_deregister_script('embed');

	if (strpos(@$post->post_content, 'gravityform')):
		wp_deregister_script('jquery-migrate');
		wp_deregister_script('jquery');
		wp_deregister_script('jquery-easing');
	endif;

	wp_dequeue_style('page-list-style');
	wp_dequeue_style('yoast-seo-adminbar');
}, 999);

add_action('wp_head', function() {
	$adminUrl = admin_url('admin-ajax.php');
	echo '<script>window.ajaxurl = "', $adminUrl, '"</script>';
});

add_filter('excerpt_length', function() {
	return 30;
}, 999);

add_filter('upload_mimes', function($mimes) {
	$mimes['svg'] = 'img/svg+xml';
	return $mimes;
});

add_filter('wp_get_attachment_url', function($url) {
	$url = str_replace('localhost:8000', 'fuse.thegkwco.com', $url);
	return $url;
}, 10, 1);

add_filter('max_srcset_image_width', function() {
	return false;
});

add_filter('wp_calculate_image_srcset_meta', '__return_empty_array');

add_action('init', function() {
	add_rewrite_rule('location/([0-9]+)', 'index.php?location=$matches[1]', 'top');
});

add_filter('query_vars', function($vars) {
	$vars[] = 'location';
	return $vars;
});

add_action('template_redirect', function() {
	if (get_query_var('location')) {
		add_filter('template_include', function() {
			return get_template_directory() . '/single-location.php';
		});
	}
});

function displet($endpoint = '') {
	Header('Content-Type: application/json');

	$endpoint = 'search?' . $endpoint;
	$key = 'displet_' . $endpoint;
	// delete_transient($key);

	if (!($result = get_transient($key))):
		$url = 'https://api.displet.com/residentials/' . $endpoint;
		$url .= '&authentication_token=' . getenv('DISPLET_TOKEN');

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HTTPHEADER,  array('referer: ' . getenv('DISPLET_REFERRER')));
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$result = curl_exec($ch);

		if (!$result) {
			die('Curl error: ' . curl_error($ch));
		}

		curl_close($ch);
		set_transient($key, $result, 60 * 60 * 24);
	endif;

	$result = json_decode($result);
	$range = range(73301, 88589);

	$cache = $result->results;
	$result->results = [];

	foreach ($cache AS $key => &$item):
		if (in_array($item->zip, $range)):
			$item->on_wishlist = in_array($item->id, getWishlist(true));
			$result->results[] = $item;
		endif;
	endforeach;

	$result->results = array_unique($result->results, SORT_REGULAR);

	return json_encode($result);
}

function parseQuery($tag = 'query') {
	return substr(explode(''. $tag .'":', urldecode($_SERVER['QUERY_STRING']))[1], 1, -2);
}

function getProperties() {
	echo displet();
	wp_die();
}

function getPropertiesByCustomQuery() {
	echo displet(parseQuery());
	wp_die();
}

function getPropertiesByZip() {
	echo displet('zip=' . parseQuery('zip'));
	wp_die();
}

function getPropertiesByKeyword() {
	echo displet('keyword=' . parseQuery('keyword'));
	wp_die();
}

function getPropertiesByIds() {
	echo displet('id=' . parseQuery('listingids'));
	wp_die();
}

function getPropertiesByAgentId() {
	echo displet('listing_agent_id=' . parseQuery('agentid'));
	wp_die();
}

function getWishlist($toArray = false) {
	$wishlist = get_user_meta(get_current_user_id(), 'saved_listings', true);

	if ($toArray) {
		$arr = explode(',', $wishlist);

		if ($arr[0] === '') {
			return [];
		}

		return $arr;
	}

	return $wishlist;
}

function toggleWishList ($add = true) {
	$id = parseQuery('listing_id');
	$wishlist = getWishlist(true);
	$contains = in_array($id, $wishlist);

	if ($add && !$contains) {
		array_push($wishlist, $id);
	} else if ($add && $contains) {
		unset($wishlist[$id]);
	}

	echo json_encode(['ids' => $wishlist]);
	update_user_meta(get_current_user_id(), 'saved_listings', implode(',', $wishlist));

	wp_die();
}

function addToWishlist() { return toggleWishList(true); }
function removeFromWishlist() { return toggleWishList(false); }

foreach ([
	'getProperties', 'getPropertiesByCustomQuery',
	'getPropertiesByCustomQuery', 'getPropertiesByZip',
	'getPropertiesByKeyword', 'getPropertiesByAgentId',
	'getPropertiesByIds', 'addToWishlist', 'removeFromWishlist'
] AS $fn):
	add_action('wp_ajax_' . $fn, $fn);
	add_action('wp_ajax_nopriv_' . $fn, $fn);
endforeach;

function getSchools($key, $parent) {
	$schools = [];
	$order = ['Elementary School', 'Middle School', 'High School'];

	Template::loop(function() use (&$schools) {
		array_push($schools, array_merge(CFS()->get(), [
			'id' => get_the_ID(),
			'title' => get_the_title(),
			'type' => end(CFS()->get('school_type')),
			'rating' => getSchoolRating(CFS()->get('gsid')) ?: false,
		]));
	}, [
		'post_type' => 'school_meta',
		'meta_query' => [[
				'key' => $key,
				'value' => [$parent],
				'compare' => 'IN',
		]]
	]);

	usort($schools, function($a, $b) use ($order) {
		$p1 = array_search($a['type'], $order);
		$p2 = array_search($b['type'], $order);

		return $p1 - $p2;
	});

	return array_group_by($schools, 'type');
}

function getSchoolRating($gsid) {
	if (!$gsid) {
		return false;
	}

	$key = 'rating_for_' . $gsid;
	delete_transient($key);

	if (!($result = get_transient($key))):
		$url = 'https://api.greatschools.org/schools/TX/' . $gsid;
		$url .= '?key=' . getenv('GREATSCHOOLS_TOKEN');

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$result = curl_exec($ch);

		if (!$result) {
			die('Curl error: ' . curl_error($ch));
		} else {
			$result = json_encode(simplexml_load_string($result));
		}

		curl_close($ch);
		set_transient($key, $result, 60 * 60 * 24);
	endif;

	return json_decode($result)->gsRating;
}

add_action('init', function($id) {
	$pipedrive = new PipedriveAPI(getenv('PIPEDRIVE_TOKEN'));
	die(print_r($pipedrive->persons->getPersons()));
});
