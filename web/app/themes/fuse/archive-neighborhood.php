<?php
/**
 * fuse realty
 *
 * Archive Name: Neighborhoods
 */

get_header();
the_post();
?>
<!-- CONTENT -->
<section id="content" role="main">

<!-- MASTHEAD -->
<?php get_template_part('masthead-neighborhood') ?>

<div class="row">

	<!-- Page -->
	<div id="page" class="col s12" itemprop="MainContentOfPage">

        <?php if ($copy = CFS()->get('intro_copy_field', NEIGHBORHOODS)): ?>
        <div class="row page-intro center-align">
        <div class="wrapper skinny">
            <?=$copy?>
        </div>
        </div>
        <?php endif ?>

		<div class="neighborhoods list-map-view">
        <div class="row wrapper">
            <div class="neighborhoods-list image-list">
               <?php
               Template::loop('neighborhood', [
                   'post_type' => 'neighborhood',
               ]);
               ?>
            </div>

            <div class="neighborhoods-map map-area" id="neighborhood-map">
                <?=FrontEnd::svg('map-neighborhoods')?>
            </div>
        </div>
		</div>

		<?php Template::partial('featured-properties.php') ?>
	</div>
</div>
</section>

<?php get_footer() ?>
