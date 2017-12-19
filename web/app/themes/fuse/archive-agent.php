<?php
/**
 * fuse realty
 *
 * Agent Archive
 */
get_header();
?>

<!-- CONTENT -->
<section id="content" role="main">

<!-- MASTHEAD -->
<?php get_template_part('masthead-agent') ?>

<div class="row">

	<!-- Page -->
	<div id="page" class="col s12" itemprop="MainContentOfPage">

		<div class="row page-intro center-align">
		<div class="wrapper skinny">
			<?=apply_filters('the_content', get_post(AGENTS)->post_content)?>
		</div>
		</div>

		<div class="row agents wrapper">
		<?php
		Template::loop('agent', [
			'post_type' => 'agent'
		]);
		?>
		</div>

		<div class="row newsletter-call-out">
		<div class="wrapper skinny">
			<figure>
				<img src="<?=assetDir?>/img/sign-up.png" />
			</figure>

			<div class="copy">
				<h4>Want to stay in the know?</h4>
				<p>What’s in a name? In our case everything. When we work together, opportunities abound. When that bond</p>
				<a href="javascript:;" class="btn">Sign Up</a>
			</div>
		</div>
		</div>
	</div>
</div>
</section>

<?php get_footer() ?>
