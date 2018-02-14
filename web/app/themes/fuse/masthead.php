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
?>

<?php if ($slides = CFS()->get('slides', $id)): ?>
<div id="masthead" role="banner">
	<div class="hero carousel">
		<?php foreach ($slides AS $slide): ?>
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
		<?php
		foreach($slides AS $slide)
			echo '<a href="javascript:;"></a>';
		?>
		</nav>
	</div>
</div>
<?php endif ?>
