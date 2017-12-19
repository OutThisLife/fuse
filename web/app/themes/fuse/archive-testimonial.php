<?php
/**
 * fuse realty
 *
 * Testimonials Archive
 */
get_header();
?>
<!-- CONTENT -->
<section id="content" role="main">
<?php
/**
 * fuse realty
 *
 * Master Header / Page Header
 */

$img = has_post_thumbnail() ? get_the_post_thumbnail_url() : assetDir . '/img/carousel-1.jpg';
?>

<div id="masthead" role="banner">
<?php if ($slides = CFS()->get('slides', TESTIMONIALS)): ?>
<div class="hero carousel">
	<?php foreach($slides AS $slide): ?>
	<figure class="item" style="
		background-image: url(<?=$slide['background_image']?>)
	">
		<div class="cover"></div>
		<figcaption class="hero-text center">
			<?=$slide['slide_copy']?>
		</figcaption>
	</figure>
	<?php endforeach; ?>

	<div class="company-info">
		<img src="<?=assetDir?>/img/emblem-small.png" /> <span>304th Avenue | Austin 78757</span>
	</div>

	<nav>
	<?php foreach($slides AS $slide): ?>
		<a href="javascript:;"></a>
	<?php endforeach ?>
	</nav>
</div>
<?php endif ?>
</div>

<div class="row">

	<!-- Page -->
	<div id="page" class="col s12" itemprop="MainContentOfPage">

		<?php if ($copy = CFS()->get('intro_copy_field', TESTIMONIALS)): ?>
		<div class="row page-intro center-align">
		<div class="wrapper skinny">
			<?=$copy?>
		</div>
		</div>
		<?php endif ?>

		<div class="row testimonials wrapper">

		<form class="row wrapper dropdown-wrapper">
			<div class="col s12 m6">
				<label for="need-help">
					<select>
						<option>All Review Sources</option>
					</select>
				</label>
			</div>

			<div class="col s12 m6">
				<label for="agent">
					<select name="agent">
						<option>Buyers + Sellers</option>
					</select>
				</label>
			</div>
		</form>

		<?php
		if (have_posts()):
		while (have_posts()):
			the_post();
			get_template_part('build', get_post_type());
		endwhile;

		else:
			echo '<p>Sorry, there are no testimonials at the moment. Please check back again later!</p>';
		endif;
		?>
		</div>
	</div>
</div>
</section>

<?php get_footer() ?>
