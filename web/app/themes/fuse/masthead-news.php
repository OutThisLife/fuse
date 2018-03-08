<?php
/**
 * fuse realty
 *
 * Master Header / Page Header
 */

$img = has_post_thumbnail() ? get_the_post_thumbnail_url() : assetDir . '/img/carousel-1.jpg';
?>

<div id="masthead" class="masthead-news" role="banner">
<?php if ($slides = CFS()->get('slides')): ?>
<div class="hero carousel">
	<?php foreach($slides AS $slide): ?>
	<figure class="item" style="background-image: url(<?=$img?>)">
		<div class="cover"></div>
		<figcaption class="hero-text center">
			<h1>News + Events</h1>
			<div class="post-meta">
		        <strong class="cat-date">
		            <?=get_the_category()[0]->cat_name ?>
		            <span class="separator"> | </span>
		            <?=get_the_date()?>
		        </strong>

		        <h2>
	        		<?php the_title()?>
        		</h2>

						<?php Template::partial('share.php') ?>
	    	</div>
		</figcaption>
	</figure>
	<?php endforeach; ?>

	<nav>
	<?php foreach($slides AS $slide): ?>
		<a href="javascript:;"></a>
	<?php endforeach ?>
	</nav>
</div>
<?php endif ?>
</div>
