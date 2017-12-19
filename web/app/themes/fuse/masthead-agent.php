<?php
/**
 * fuse realty
 *
 * Agents Master Header
 */

$img = has_post_thumbnail(AGENTS) ? get_the_post_thumbnail_url(AGENTS) : assetDir . '/img/carousel-1.jpg';
?>

<div id="masthead" role="banner">
<div class="hero carousel">
	<figure class="item" style="
		background-image: url(<?=$img?>)">
		<div class="cover"></div>
	</figure>

	<div class="hero-text center">
		<hgroup>
			<h1>The Real Deal</h1>
			<h2>We've got this, and so do you.</h2>
		</hgroup>
	</div>

	<nav>

	</nav>
</div>
</div>