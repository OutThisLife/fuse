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
