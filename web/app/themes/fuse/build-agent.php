<?php
/**
 * fuse realty
 *
 * Build: agent
 */
?>

<figure class="agent">
    <div class='image' style='background-image: url(<?=FrontEnd::getSrc(get_post_thumbnail_id(), 'agent_thumb')?>)'></div>

    <figcaption>
        <h3>
            <a href="<?php the_permalink()?>">
                <?php the_title(); ?>
            </a>
        </h3>

        <?php if ($titles = CFS()->get('titles')): ?>
        <small class="titles">
            <?php foreach ($titles AS $title): ?>
            <span><?=$title['title']?></span>
            <?php endforeach ?>
        </small>
        <?php endif ?>

        <div class="contact-info">
            <div class="property">
                <img src="<?=assetDir?>/img/commercial-small.png" />
            </div>

            <div class="email">
                <a href="mailto:<?=CFS()->get('email_address')?>"><img src="<?=assetDir?>/img/email-small.png" /></a>
            </div>

            <div class="phone">
                <img src="<?=assetDir?>/img/phone-small.png" />
                <strong><?=CFS()->get('phone_number')?></strong>
            </div>
        </div>
    </figcaption>
</figure>
