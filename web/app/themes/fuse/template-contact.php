<?php
/**
 * fuse realty
 *
 * Template Name: Contact
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

	<div class="page-content wrapper center-align skinny">
		<?php the_content() ?>

		<div class="contact-footer">
		<img src="<?=assetDir?>/img/contact-logo.png" />

		<div class="contact-info left-align">
			<?=CFS()->get('contact_info')?>

			<ul class="social">
				<?=Backend::getMenu('social')?>
			</ul>
		</div>
	</div>
</div>

</div>
</section>

<?php get_footer() ?>
