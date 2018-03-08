<?php
/**
 * fuse realty
 *
 * Single post
 */

get_header();
the_post();

$map = CFS()->get('map');
?>

<!-- MASTHEAD -->
<?php get_template_part('masthead') ?>

<!-- CONTENT -->
<section id="content" role="main">
<div class="row wrapper skinny">
	<div class="post-content">
		<div class="post-meta">
	        <strong class="cat-date">
	            <?=get_the_category()[0]->cat_name ?>
	            <span class="separator"> | </span>
	            <?=get_the_date()?>
	        </strong>

	    	<h1><?php the_title() ?></h1>

	    	<div class="meta-columns">
	          <?php Template::partial('share.php') ?>

			  <?php if ($area = CFS()->get('area')): ?>
	          <div class="bath">
	              <strong><?=$area?></strong>
	              <small>AREA</small>
	          </div>
	      	  <?php endif ?>

			  <?php if ($map): ?>
	          <div class="square-foot">
	              <i class="icon-pin"></i>
	              <small>MAP</small>
	          </div>
	      	  <?php endif ?>

	        </div>
	    </div>
		<?php the_content() ?>

		<?php if ($map): ?>
		<div class="center-align">
			<img src="<?=$map?>" />
		</div>
		<?php endif ?>
	</div>
</div>
</section>

<?php get_footer() ?>
