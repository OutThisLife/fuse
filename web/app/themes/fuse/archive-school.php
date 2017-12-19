<?php
/**
 * fuse realty
 *
 * Archive Name: Schools
 */

get_header();
the_post();
error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
<!-- CONTENT -->
<section id="content" role="main">

<!-- MASTHEAD -->
<?php get_template_part('masthead-school') ?>

<div class="row">

	<!-- Page -->
	<div id="page" class="col s12" itemprop="MainContentOfPage">

        <?php if ($copy = CFS()->get('intro_copy_field', SCHOOLS)): ?>
        <div class="row page-intro center-align">
        <div class="wrapper skinny">
            <?=$copy?>
        </div>
        </div>
        <?php endif ?>

		<div class="schools list-map-view">
        <div class="row wrapper">
            <div class="schools-list image-list">
               <?php
               Template::loop('school', [
                   'post_type' => 'school',
               ]);
               ?>
            </div>

            <div class="schools-map map-area">
                <img src="<?=assetDir?>/img/school-map.png" />
            </div>
        </div>
		</div>

		<?php Template::partial('featured-properties.php') ?>
	</div>
</div>
</section>

<?php get_footer() ?>
