<?php
/**
 * fuse realty
 *
 * Single post
 */

get_header();
the_post();

$getSocial = function () {
    $urls = [];
    $services = ['facebook', 'instagram', 'linkedin', 'youtube'];

    foreach (['facebook', 'instagram', 'linkedin', 'youtube'] AS $service)
        if ($url = CFS()->get($service))
            $urls[$service] = $url;

    return !empty($urls) ? $urls : false;
};
?>

<!-- CONTENT -->
<section id="content" role="main">

<div class="row agent-header">
<div class="wrapper">
<figure class="agent">
    <?=FrontEnd::getImg(get_post_thumbnail_id(), 'agent_headshot')?>

    <figcaption>
        <h3><?php the_title(); ?></h3>
        <?php if ($titles = CFS()->get('titles')): ?>
        <small class="titles">
            <?php foreach ($titles AS $title): ?>
            <span><?=$title['title']?></span>
            <?php endforeach ?>
        </small>
        <?php endif?>

        <?php if ($type = CFS()->get('property_types')): ?>
        <div class="property-types">
            <img src="<?=CFS()->get('property_type_icon')?>" />
            <small><?=$type?></small>
        </div>
        <?php endif ?>

        <div class="contact-info">
            <?php if ($email = CFS()->get('email_address')): ?>
            <div class="email">
                <a href="mailto:<?=$email?>">
                    <img src="<?=assetDir?>/img/email-small.png" />
                </a>
            </div>
            <?php endif ?>

            <?php if ($phone = CFS()->get('phone_number')): ?>
            <div class="phone">
                <img src="<?=assetDir?>/img/phone-small.png" />
                <strong><a href='tel:<?=$phone?>'><?=$phone?></a></strong>
            </div>
            <?php endif ?>

            <?php if ($socialLinks = $getSocial()): ?>
            <div class="social-media">
                <ul class="social">
                <?php
                foreach ($socialLinks AS $service => $url)
                    echo '<li class="ss-', $service, '">
                        <a href="', $url, '" target="_blank">', $service, '</a>
                    </li>';
                ?>
                </ul>
            </div>
            <?php endif ?>
        </div>
    </figcaption>
</figure>
</div>
</div>

<div class="row wrapper agent-content">
    <div class="col s12 m8 agent-copy">
        <h3>About <?=CFS()->get('first_name')?></h3>
	    <?php the_content()?>
    </div>

    <div class="col s12 m4 agent-sidebar">
        <h4>Designations</h4>

        <ul>
            <?php foreach (CFS()->get('credentials') AS $credential): ?>
            <li><?=$credential['credential']?></li>
            <?php endforeach ?>
        </ul>
    </div>
</div>

<?php if ($copy = CFS()->get('end_copy')): ?>
<div class="row wrapper">
    <?=$copy?>
</div>
<?php endif ?>

<?php if ($agentid = CFS()->get('agentid')): ?>
<div class="single-listings">
    <div class="center-align">
        <img src="<?=assetDir?>/img/emblem.png" />
        <h3><?=CFS()->get('first_name')?>'s Listings</h3>
    </div>

    <div id="featured-listings" data-listing_agent_id='<?=$agentid?>'></div>
</div>
<?php endif ?>
</section>

<?php get_footer() ?>
