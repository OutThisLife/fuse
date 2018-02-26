<?php
if (!$args['copy']):

Template::loop(function() { ?>
<div class="row testimonial-call-out center-align">
  <h5><?=get_the_content()?></h5>

  <?php if ($cite = CFS()->get('citation')): ?>
  <strong> - <?=$cite?> - </strong>
  <?php endif ?>
</div>
<?php
}, [
  'post_type' => 'testimonial',
  'posts_per_page' => 1,
]);

else:
?>
<div class="row testimonial-call-out center-align">
  <h5><?=$args['copy']?>?></h5>
  <strong> - <?=$args['cite']?> - </strong>
</div>
<?php endif ?>
