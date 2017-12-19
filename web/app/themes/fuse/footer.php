<?php
/**
 * fuse realty
 *
 * Footer
 */
?>

<footer id="footer" itemscope itemtype="http://schema.org/WPFooter">
    <div class="row wrapper skinny">
        <img src="<?=assetDir?>/img/logo-big.png" />

        <div class="footer-copy">
            <h4>What Makes Us Different?</h4>
            <p>What’s in a name? In our case everything. When we work together, opportunities abound. When that bond is FUSED, it becomes an unbreakable foundation for peace of mind and trust. We believe it’s time we bring the Broker, Agent and Client relationship together for a better kind of Real Estate experience, because that’s how it should be.</p>
            <ul><?=BackEnd::getMenu('sm-footer')?></ul>
        </div>

        <div class="footer-nav">
            <ul><?=Backend::getMenu('footer')?></ul>
            <ul class="social"> <?=Backend::getMenu('social')?> </ul>
        </div>
    </div>

    <div class="row wrapper skinny disclaimer">
        <?php
        $tz = 'Europe/London';
        $timestamp = time();
        $dt = new DateTime("now", new DateTimeZone($tz));
        $dt->setTimestamp($timestamp);
        ?>

        <p>The information being provided is for consumers’ personal, non-commercial use and may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing.</p>
        <p>Based on information from the Austin Board of REALTORS® (alternatively, from ACTRIS) from <?=$dt->format('M d Y, H:i:s');?>. Neither the Board nor ACTRIS guarantees or is in any way responsible for its accuracy. The Austin Board of REALTORS®, ACTRIS and their affiliates provide the MLS and all content therein “AS IS” and without any warranty, express or implied. Data maintained by the Board or ACTRIS may not reflect all real estate activity in the market.</p>
        <p>&copy; <?=date('Y')?> Fuse Realty. All rights reserved. <a href="#">Privacy + Terms</a></p>
    </div>
</footer>

<?=BackEnd::getOption('extra-scripts')?>
<?php wp_footer() ?>

<script src="<?=assetDir?>/js/dist/main.js?v=<?=ASSET_VERSION?>"></script>

</body>
</html>
