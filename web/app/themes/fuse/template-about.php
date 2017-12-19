<?php
/**
 * fuse realty
 *
 * Template Name: About
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

		<?php if ($blocks = CFS()->get('alternating_blocks')): ?>
		<div class="page-content wrapper skinny">
		<div class="alt-blocks">
			<?php foreach ($blocks AS $block): ?>
			<div class="block">
				<figure>
					<img src="<?=$block['block_image']?>" />
				</figure>

				<div class="copy">
					<h2><?=$block['block_heading']?></h2>
					<p><?=$block['block_copy']?></p>

					<a href="<?=$block['block_link']?>" class="btn">
						<?=$block['link_text']?>
					</a>
				</div>
			</div>
			<?php endforeach; ?>
		</div>
		</div>
		<?php endif ?>

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

		<?php if ($blocks = CFS()->get('call_out_blocks')): ?>
		<div class="call-out-blocks row">
		<div class="wrapper skinny">
			<?php foreach ($blocks AS $block): ?>
			<figure class="block">
				<img src="<?=$block['call_out_image']?>" />

				<figcaption>
					<h4><?=$block['cob_title']?></h4>
					<p><?=$block['call_out_copy']?></p>
					<a href="<?=$block['cob_url']?>" class="btn"><?=$block['cob_link_text']?></a>
				</figcaption>
			</figure>
			<?php endforeach; ?>
		</div>
		</div>
		<?php endif ?>
	</div>
</div>
</section>

<?php get_footer() ?>
