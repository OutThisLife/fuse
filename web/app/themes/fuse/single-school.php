<?php
/**
 * fuse realty
 *
 * Single School
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

        <div class="neighborhood-intro">
            <?php Template::partial('intro-copy.php'); ?>

            <?php if ($stats = CFS()->get('school_stats')): ?>
            <div class="wrapper skinny neighborhood-stats">
                <?php foreach($stats AS $stat): ?>
                <div>
                    <strong><?=$stat['stat_number']?></strong>
                    <small><?=$stat['stat_title']?></small>
                </div>
                <?php endforeach ?>
            </div>
            <?php endif ?>
        </div>

		<div class="page-content wrapper skinny">
        <div class="row neighborhood-info">
            <div class="col s12 m8">
                <h2>About <?=the_title()?></h2>
                <div class="neighborhood-copy">
                    <?php the_content()?>
                </div>
            </div>
		</div>


        <?php Template::partial('schools.php') ?>

        <?php if ($neighborhoods = CFS()->get('neighborhoods')): ?>
        <div class="row neighborhoods-row">
            <h2>Neighborhoods</h2>

            <ul>
                <?php foreach($neighborhoods AS $neighborhood): ?>
                <li><?=$neighborhood['neighborhood_title']?></li>
                <?php endforeach ?>
            </ul>

        </div>
        <?php endif ?>
	</div>
</div>

<div class="single-listings">
    <div class="center-align">
        <img src="<?=assetDir?>/img/emblem.png" />
        <h3><?php the_title() ?>'s Listings</h3>
    </div>

    <div id="featured-listings" data-school_district='<?=get_the_title()?>'></div>
</div>
</section>

</section>

<?php get_footer() ?>
