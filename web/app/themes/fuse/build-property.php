<?php
/*
 *  Build name: Property
 */

?>

<div class="listing js_slide">
    <figure>
        <img src="<?=assetDir?>/img/featured-listing.jpg" />

        <span class="tag"><strong>NEW</strong></span>
        <span class="wishlist"></span>
    </figure>

    <div class="listing-details">
        <div class="price-location">
            <span class="price">$<?=CFS()->get('price')?></span>
            <div class="address">
                <span class="street"><?=CFS()->get('street_address')?></span> | <span class="city-zip"><?=CFS()->get('city')?> <?=CFS()->get('zipcode')?></span>
            </div>
        </div>
        <div class="bed-bath-beyond">
            <div class="bed">
                <strong><?=CFS()->get('bedrooms')?></strong>
                <small>BR</small>
            </div>

            <div class="bath">
                <strong><?=CFS()->get('bathrooms')?></strong>
                <small>BA</small>
            </div>

            <div class="square-foot">
                <strong><?=CFS()->get('square_feet')?></strong>
                <small>SQ/FT</small>
            </div>
        </div>
    </div>
</div>