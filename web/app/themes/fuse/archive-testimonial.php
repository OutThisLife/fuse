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

<!-- MASTHEAD -->
<?php get_template_part('masthead') ?>

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
