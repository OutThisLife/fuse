<?php
/**
 * fuse realty
 *
 * Template Name: Process
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

		<?php if ($blocks = CFS()->get('call_out_blocks')): ?>
		<div class="call-out-blocks row">
		<div class="wrapper skinny">
			<?php foreach ($blocks AS $block): ?>
			<figure class="block">
				<img src="<?=$block['call_out_image']?>" />

				<figcaption>
					<h4><?=$block['cob_title']?></h4>
					<p><?=$block['call_out_copy']?></p>

					<?php
					if (
						($url = $block['cob_url']) &&
						($txt = $block['cob_link_text'])
					)	echo '<a href="', $url, '" class="btn">', $txt, '</a>';
					?>
				</figcaption>
			</figure>
			<?php endforeach; ?>
		</div>
		</div>
		<?php endif ?>

		<div class="row newsletter-call-out">
		<div class="wrapper skinny" style="max-width: 700px">
			<form id="search">
				<input type="text" class="search" placeholder="Search by Neighborhood, School or Zipcode" />
				<button class="btn">Search</button>
			</form>
		</div>
		</div>

		<?php Template::partial('featured-properties.php') ?>

		<div class="row wrapper tools-grid">
			<div class="tool half">
				<?=Frontend::svg('money')?>

				<div class="copy">
					<?=CFS()->get('first_copy', HOME)?>
					<a href="javascript:;" class="modal-link btn">Find Out</a>
				</div>
			</div>

			<div class="tool half">
				<?=Frontend::svg('mortgage-calculator')?>

				<div class="copy">
					<?=CFS()->get('second_copy', HOME)?>
				</div>
			</div>
		</div>
	</div>
</div>
</section>

<?php get_footer() ?>
