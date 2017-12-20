<?php
/*
 * Build: School
 */

global $post;
?>

<figure class="school">
    <?=FrontEnd::getImg(CFS()->get('school_image'), 'school-thumb')?>

    <a class="cover" href="<?=the_permalink()?>" data-id="<?=$post->post_name?>"></a>

    <figcaption>
        <h4><?=the_title()?></h4>
        <?=CFS()->get('excerpt')?>
    </figcaption>
</figure>
