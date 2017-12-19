<?php
/**
 * fuse realty
 *
 * Template Name: Closing Calculator
 */

get_header();
the_post();
?>
<!-- CONTENT -->
<section id="content" role="main">

<div class="row">

	<!-- Page -->
	<div id="page" class="col s12" itemprop="MainContentOfPage">

        <?php Template::partial('intro-copy.php'); ?>

        <div class="row calculator-row mortgage-calculator">
            <div class="wrapper">
                <div class="mortgage-intro center-align">
                    <img src="<?=assetDir?>/img/mortgage-calculator.png" />
                    <h3>Closing Cost Calculator</h3>
                    <?php the_content() ?>
                </div>
            </div>

            <div id="closing-calculator"></div>
        </div>

        <?php Template::partial('ask-agent.php') ?>
        <?php Template::partial('featured-properties.php') ?>
	</div>
</div>
</section>

<?php get_footer() ?>
