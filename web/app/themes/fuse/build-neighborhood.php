<?php
/*
 * Build: Neighborhood
 */

global $post;
$src = FrontEnd::getSrc(CFS()->get('neighborhood_image'), 'school_thumb');
?>

<figure class="neighborhood" style="background: url(<?=$src?>) center / cover no-repeat">
    <img src="<?=$src?>" />

    <a class="cover" href="<?=the_permalink()?>" data-id="<?=$post->post_name?>"></a>

    <figcaption>
        <h4><?=the_title()?></h4>
        <?=CFS()->get('excerpt')?>
    </figcaption>
</figure>
