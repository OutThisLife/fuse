<?php
/*
 * Build: Neighborhood
 */
global $post;
?>
<figure class="neighborhood">
<img src="<?=CFS()->get('neighborhood_image')?>" />

<a class="cover" href="<?=the_permalink()?>" data-neighborhood="<?=$post->post_name?>"></a>
<figcaption>
    <h4><?=the_title()?></h4>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quisquam sunt, architecto non dicta nihil</p>
</figcaption>
</figure>
