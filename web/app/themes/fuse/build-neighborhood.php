<?php
/*
 * Build: Neighborhood
 */

global $post;
?>

<figure class="neighborhood">
    <?=FrontEnd::getImg(CFS()->get('neighborhood_image'), 'school-thumb')?>

    <a class="cover" href="<?=the_permalink()?>" data-id="<?=$post->post_name?>"></a>

    <figcaption>
        <h4><?=the_title()?></h4>
        <?=CFS()->get('excerpt')?>
    </figcaption>
</figure>
