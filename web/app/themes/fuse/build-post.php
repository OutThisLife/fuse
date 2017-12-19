<?php
/**
 * fuse realty
 *
 * Build: post
 */
?>

<article <?php post_class() ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">
<div class="row blog-block">
    <figure>
        <img src="<?=get_the_post_thumbnail_url()?>" />

        <a href="<?=the_permalink()?>" class="cover"></a>
    </figure>

    <div class="post-meta">
        <strong class="cat-date">
            <?=get_the_category()[0]->cat_name ?>
            <span class="separator"> | </span>
            <?=get_the_date()?>
        </strong>

        <h3>
            <a href="<?=the_permalink()?>">
                <?=the_title()?>
            </a>
        </h3>

        <strong class="share-post">
            <i class="icon-share"></i> Share
        </strong>
    </div>
</div>
</article>