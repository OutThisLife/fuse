<?php if ($schools = getSchools(get_post_type() === 'school' ? 'district' : 'neighborhood', get_the_ID())): ?>
<div class="row school-info">
    <?php
    foreach ($schools AS $type => $grouped):
        $long = count($grouped) > 3;
    ?>
    <h2 style='text-transform: capitalize'><?=$type?></h2>

    <div class="school-row">
        <div class="school-labels">
            <h5>Great Schools Rating (0-10)</h5>

            <div class="grades-distance">
                <div class="grades">
                    <h5>Grades</h5>
                </div>
            </div>
        </div>

        <div class="school-wrapper <?=$long ? 'show-fade' : ''?>">
            <?php foreach ($grouped AS $school): ?>
            <div class="school">
                <div class="rating-name">
                    <span class="rating"><?=$school['rating'] ?></span>
                    <h6><?=$school['title']?></h6>
                </div>

                <div class="grades-distance">
                    <div class="grades"><?=$school['grades']?></div>
                </div>
            </div>
            <?php endforeach ?>
        </div>

        <?php if ($long): ?>
        <div class="expand-school expand-list" data-selector=".school-wrapper">
            <a href="javascript:;">
                <i class="icon-down-arrow"></i>
                Expand all <?=$school_type['school_type']?>
            </a>
        </div>
        <?php endif ?>

        <?php if ($school_copy = CFS()->get('schools_copy')): ?>
        <div class="school-copy">
            <?=$school_copy?>
        </div>
        <?php endif ?>
    </div>
    <?php endforeach ?>
</div>
<?php endif ?>
