<?php
/*
 * Build: School
 */
?>

<figure class="school">
    <img src="<?=CFS()->get('school_image')?>" />

    <a class="cover" href="<?=the_permalink()?>"></a>
    <figcaption>
        <h4><?=the_title()?></h4>
        <?=CFS()->get('excerpt')?>
    </figcaption>
</figure>
