<?php
/**
 * Theme Name: fuse realty
 * Version: 1.0
 * Author: Talasan Nicholson
 * Author URI: http://www.nwsco.org
 */

get_header();
?>

<!-- MASTHEAD -->
<?php get_template_part('masthead-news') ?>

<div class="row newsletter-call-out">
<div class="wrapper skinny">
	<figure>
		<img src="<?=assetDir?>/img/sign-up.png" />
	</figure>

	<div class="copy">
		<h4>Want to stay in the know?</h4>
		<p>What’s in a name? In our case everything. When we work together, opportunities abound. When that bond</p>
		<a href="<?=get_permalink(249)?>" class="btn">Sign Up</a>
	</div>
</div>
</div>
<!-- CONTENT -->
<section id="content" role="main">
<div class="the-posts row wrapper skinny">
<?php
if (have_posts()):
while (have_posts()):
	the_post();
	get_template_part('build', get_post_type());
endwhile;

else:
	echo '<p>Sorry, there are no posts at the moment. Please check back again later!</p>';
endif;
?>
</div>
</section>

<?php get_footer() ?>
