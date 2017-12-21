<?php
/*
 * Build: School
 */

global $post;
$src = FrontEnd::getSrc(CFS()->get('school_image'), 'school_thumb');
?>

<figure class="school" style="background-image: url(<?=$src?>)">
    <a class="cover" href="<?=the_permalink()?>" data-id="<?=$post->post_name?>"></a>

    <figcaption>
        <h4><?=the_title()?></h4>
        <?=CFS()->get('excerpt')?>
    </figcaption>
</figure>
