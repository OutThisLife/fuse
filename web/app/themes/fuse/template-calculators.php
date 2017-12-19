<?php
/**
 * fuse realty
 *
 * Template Name: Calculators
 */

get_header();
the_post();
?>
<!-- CONTENT -->
<section id="content" role="main">

<div class="row">

	<!-- Page -->
	<div id="page" class="col s12" itemprop="MainContentOfPage">

        <?php Template::partial('intro-copy.php'); ?>
        <div class="row calculator-row mortgage-calculator">
            <div class="wrapper">
                <div class="mortgage-intro center-align">
                    <img src="<?=assetDir?>/img/mortgage-calculator.png" />
                    <h3>Mortgage Calculator</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <div id="mortgage-calculator"></div>
        </div>

        <div class="row calculator-row mortgage-calculator">
            <div class="wrapper">
                <div class="mortgage-intro center-align">
                    <img src="<?=assetDir?>/img/closing-calculator.png" />
                    <h3>Closing Calculator</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div class="row">
                    <ul class="tabs">
                        <li class="active">Buyer</li>
                        <li>Seller</li>
                    </ul>

                    <div class="contents">
                        <div class="tab-content">
                            <form class="calculator-form">
                                <div class="row form-row">
                                    <div class="col m6 s12">
                                        <label for="purchase-price">
                                            <span>Purchase Price</span>
                                            <input type="text" name="purchase-price" placeholder="$250,000" />
                                        </label>

                                        <label for="down-payment">
                                            <span>Down Payment <a href="javascript:;">?</a></span>
                                            <select name="down-payment">
                                                <option>5%</option>
                                                <option>10%</option>
                                            </select>
                                        </label>

                                        <label for="down-payment-amount">
                                            <span>Down Payment Amount</span>
                                            <p>$12,500</p>
                                        </label>

                                        <label for="total-loan-amount">
                                            <span>Down Payment Amount</span>
                                            <p>237,500%</p>
                                        </label>
                                    </div>
                                    <div class="col m6 s12">
                                        <label for="loan-term">
                                            <span>Loan Term <a href="javascript:;">?</a></span>
                                            <select name="loan-type">
                                                <option>30 Years</option>
                                                <option>No Loan</option>
                                            </select>
                                        </label>
                                        <label for="loan-type">
                                            <span>Loan Type <a href="javascript:;">?</a></span>
                                            <select name="loan-type">
                                                <option>Fixed Rate</option>
                                                <option>No Loan</option>
                                            </select>
                                        </label>

                                        <label for="zipcode">
                                            <span>Zipcode</span>
                                            <input type="text" name="zipcode" placeholder="Property Zipcode" />
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="tab-content">
                            <p>This is the seller form Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nihil tenetur qui? Sequi, modi reiciendis ut dolor quibusdam totam labore id consectetur</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grey-banner center-align">
                <strong>$<span class="price">917</span> /mo</strong><br />
                <small>
                    <span class="loan-type">30 - Year Fixed</span> |
                    <span class="interest-rate">3.43% Interest</span>
                </small>
            </div>

            <div class="center-align">
                <a href="javascript:;" class="btn calculate">Calculate</a>
            </div>
        </div>

        <div class="row center-align agent-row">
            <div class="wrapper">
                <img src="<?=assetDir?>/img/our-agents.png" />
                <h3>Ask My Agent</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse dolores accusantium cupiditate nulla repellendus similique aut, voluptatibus obcaecati totam beatae omnis in voluptatem neque ex ipsa! Facilis quam nisi illo!</p>

                <form>
                    <div class="row">
                        <div class="col s12 m6">
                            <label for="need-help">
                                <span>I Need Help With</span>
                                <select name="loan-type" class="background-left">
                                    <option>Lenders</option>
                                    <option>Mortgage</option>
                                </select>
                            </label>
                        </div>

                        <div class="col s12 m6">
                            <label for="agent">
                                <span>Agent</span>
                                <select name="agent" class="background-left">
                                    <?php 
                                    $agents = Backend::getPostType('agent');
                                    foreach ($agents->posts as $agent):
                                    ?>
                                    <option value="<?=$agent->ID?>"><?=$agent->post_title?></option>
                                    <?php endforeach;?>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>

        <?php Template::partial('featured-properties.php') ?>
	</div>
</div>
</section>

<?php get_footer() ?>
