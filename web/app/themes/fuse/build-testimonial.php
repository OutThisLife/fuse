<?php
/**
 * fuse realty
 *
 * Build: testimonial
 */
?>

<article <?php post_class() ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">
<div class="row testimonial blog-block center-align wrapper">
    <div class="post-meta">
        <strong class="cat-date">
            <?=get_the_date()?>
            <span class="separator"> | </span>
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
