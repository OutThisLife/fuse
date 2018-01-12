<?php
/**
 * fuse realty
 *
 * Master Header / Page Header
 */

$id = get_the_ID();

if (is_archive('testimonial')) {
	$id = TESTIMONIALS;
}

$img = has_post_thumbnail($id) ? get_the_post_thumbnail_url() : assetDir . '/img/carousel-1.jpg';
?>

<div id="masthead" role="banner">
<?php if ($slides = CFS()->get('slides', $id)): ?>
<div class="hero carousel">
	<?php foreach($slides AS $slide): ?>
	<figure class="item" style="
		background-image: url(<?=FrontEnd::getSrc($slide['background_image'], 'masthead')?>)
	">
		<div class="cover"></div>
		<figcaption class="hero-text center">
			<?=$slide['slide_copy']?>
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
