<?php
/**
 * fuse realty
 *
 * Front page
 */

get_header();
?>

<!-- CONTENT -->
<section id="content" role="main" itemprop="MainContentOfPage">
	<?php if ($slides = CFS()->get('slides')): ?>
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

		<nav>
		<?php foreach($slides AS $slide): ?>
			<a href="javascript:;"></a>
		<?php endforeach ?>
		</nav>
	</div>
	<?php endif ?>

	<?php if ($cta_blocks = CFS()->get('cta_blocks')): ?>
	<div class="call-out-grid">
		<?php foreach ($cta_blocks AS $block): ?>
		<figure>
			<img src="<?=$block['cta_bg']?>" />
			<a class="cover" href="<?=$block['cta_url']?>"></a>

			<figcaption>
				<img src="<?=$block['cta_icon']?>" />
				<small>Search By</small>
				<strong><?=$block['cta_heading']?></strong>
			</figcaption>
		</figure>
		<?php endforeach; ?>
	</div>
	<?php endif ?>

	<?php if ($copy = CFS()->get('intro_copy_field')): ?>
	<div class="row page-intro center-align">
	<div class="wrapper skinny">
		<?=$copy?>
	</div>
	</div>
	<?php endif ?>

	<?php Template::partial('featured-properties.php') ?>

	<div class="row wrapper tools-grid">
		<div class="tool half">
			<?=Frontend::svg('money')?>

			<div class="copy">
				<h4>How much is it worth?</h4>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aut cupiditate enim numquam maxime sunt voluptatum</p>
				<form>
					<input type="email" class="email" placeholder="Email Address">
					<button class="btn">Next</button>
				</form>
			</div>
		</div>

		<div class="tool quarter">
			<?=Frontend::svg('mortgage-calculator')?>

			<div class="copy">
				<h4>Mortgage Calculator</h4>
				<a href="<?=get_permalink(352)?>" class="btn">Go</a>
			</div>
		</div>

		<div class="tool quarter">
			<?=Frontend::svg('closing-calculator')?>

			<div class="copy">
				<h4>Closing Cost Calculator</h4>
				<a href="<?=get_permalink(355)?>" class="btn">Go</a>
			</div>
		</div>

		<div class="tool property-tool half">
			<?=Frontend::svg('properties')?>

			<div class="copy">
				<h4>Interested in Commercial Properties?</h4>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aut cupiditate enim numquam maxime sunt voluptatum</p>
				<a href="javascript:;" class="btn">Contact</a>
			</div>
		</div>

		<div class="tool half">
			<?=Frontend::svg('sign-up')?>

			<div class="copy">
				<h4>Want to stay in the know?</h4>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio aut cupiditate enim numquam maxime sunt voluptatum</p>
				<a href="javscript:;" class="btn">Sign Up</a>
			</div>
		</div>
	</div>
</section>

<?php get_footer() ?>
