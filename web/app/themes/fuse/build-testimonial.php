<?php
/**
 * fuse realty
 *
 * Build: testimonial
 */
?>

<article <?php post_class() ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">
<div
    class="row testimonial filter-item blog-block center-align wrapper"
    <?php
    array_map(function($t) {
        echo 'data-'. $t->taxonomy .'="'. $t->slug .'" ';
    }, wp_get_object_terms(get_the_ID(), [
        'review_source',
        'testimonial_type',
    ]));
    ?>
>
    <div class="post-meta">
        <strong class="cat-date">
            <?=get_the_date()?>
        </strong>

        <h3>
            <?=the_content()?>
        </h3>

        <?php if ($cite = CFS()->get('citation')): ?>
        <strong class="author">
            - <?=$cite?> -
        </strong>
        <?php endif ?>
    </div>
</div>
</article>
