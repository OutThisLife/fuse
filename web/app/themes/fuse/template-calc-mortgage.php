<?php
/**
 * fuse realty
 *
 * Template Name: Mortgage Calculator
 */

get_header();
the_post();
?>
<!-- CONTENT -->
<section id="content" role="main">

<div class="row">

	<!-- Page -->
	<div id="page" class="col s12" itemprop="MainContentOfPage">

        <?php Template::partial('intro-copy.php') ?>

        <div class="row calculator-row mortgage-calculator">
            <div class="wrapper">
                <div class="mortgage-intro center-align">
                    <img src="<?=assetDir?>/img/mortgage-calculator.png" />
                    <h3>Mortgage Calculator</h3>
                    <?php the_content() ?>
                </div>
            </div>

            <div id="mortgage-calculator"></div>
        </div>

        <?php Template::partial('ask-agent.php') ?>
        <?php Template::partial('featured-properties.php') ?>
	</div>
</div>
</section>

<?php get_footer() ?>
