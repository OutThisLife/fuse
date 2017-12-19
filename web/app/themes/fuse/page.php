<?php
/**
 * fuse realty
 *
 * Single page
 */

get_header();
the_post();
?>
<!-- CONTENT -->
<section id="content" role="main">

<!-- MASTHEAD -->
<?php get_template_part('masthead') ?>

<div class="row">
	<!-- Page -->
	<div id="page" class="col s12" itemprop="MainContentOfPage">

		<?php Template::partial('intro-copy.php'); ?>

		<div class="wrapper">
			<div class="page-content">
				<div class="page-title">
					<h2><?php the_title()?></h2>
				</div>

				<?php the_content()?>
			</div>
		</div>
	</div>
</div>
</section>

<?php get_footer() ?>
