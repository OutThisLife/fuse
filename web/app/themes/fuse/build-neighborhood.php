<?php
/*
 * Build: Neighborhood
 */

global $post;
?>

<figure class="neighborhood">
    <img src="<?=CFS()->get('neighborhood_image')?>" />

    <a class="cover" href="<?=the_permalink()?>" data-id="<?=$post->post_name?>"></a>

    <figcaption>
        <h4><?=the_title()?></h4>
        <?=CFS()->get('excerpt')?>
    </figcaption>
</figure>
