<?php
/**
 * fuse realty
 *
 * Single Neighborhood
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

            <?php if ($stats = CFS()->get('stats')): ?>
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
                <h2><?=the_title()?> Vibe</h2>
                <div class="neighborhood-copy">
                    <?php the_content()?>
                </div>
            </div>

            <div class="col s12 m4 neighborhood-sidebar">
                <?php if ($included = CFS()->get('included')): ?>
                <h5>Yes</h5>
                <ul>
                    <?php foreach($included AS $yes): ?>
                    <li><?=$yes['included_title']?></li>
                    <?php endforeach ?>
                </ul>
                <?php endif ?>

                <?php if ($not_included = CFS()->get('not_included')): ?>
                <h5>No</h5>
                <ul>
                    <?php foreach($not_included AS $no): ?>
                    <li><?=$no['not_included_title']?></li>
                    <?php endforeach ?>
                </ul>
                <?php endif ?>
            </div>
		</div>

        <?php Template::partial('schools.php') ?>

        <div class='disclaimer'>
            <p>*School data provided by GreatSchools. Intended for reference only. GreatSchools Ratings compare a school’s test performance to statewide results. To verify enrollment eligibility, contact the school or district directly.</p>
        </div>

        <?php
        if ($neighborhoods = CFS()->get('neighborhoods')):
            usort($neighborhoods, function($a, $b) {
                return strcmp($a['neighborhood_title'], $b['neighborhood_title']);
            });
        ?>
        <div class="row neighborhoods-row">
            <h2>Neighborhoods</h2>

            <br /><br />

            <ul>
                <?php foreach ($neighborhoods AS $neighborhood): ?>
                <li><?=$neighborhood['neighborhood_title']?></li>
                <?php endforeach ?>
            </ul>

        </div>
        <?php endif ?>
	</div>
</div>
</section>

<?php get_footer() ?>
