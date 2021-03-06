<?php
/**
 * fuse realty
 *
 * Profile page
 */

$userId = get_current_user_id();
$info = get_userdata($userId);
?>

<form name='profileForm' method="post" action="javascript:;">

<div class="row page-intro">
<div class="wrapper">
    <h2><?=$current_user->display_name?></h2>

    <ul>
      <?php if ($phone = get_user_meta($userId, 'phone', true)): ?>
      <li>
        <i class="icon-phone"></i>
        <?=$phone?>
      </li>
      <?php endif ?>

      <?php if ($email = $info->user_email): ?>
      <li>
        <i class="icon-email"></i>
        <?=$email?>
      </li>
      <?php endif ?>
    </ul>
</div>
</div>

<?php if ($saved = get_user_meta($userId, 'saved_listings', true)): ?>
<div class="row">
<div class="wrapper skinny">
  <h4>Saved Homes</h4>

  <div
    id="featured-listings"
    data-perPage="2"
    data-id="<?=$saved?>"
  ></div>
</div>
</div>
<?php endif ?>

<div
  class="row subscriptions"
  data-email='<?=@$email?>'
  data-md5='<?=md5(@$email)?>'
>
<div class="wrapper skinny">
  <h4>Email Subscriptions</h4>

  <table>
    <thead>
      <th></th>
      <th>Subscribe</th>
      <th>Unsubscribe</th>
    </thead>

    <tbody>
      <tr>
        <td>Weekly Properties</td>
        <td>
          <div>
            <input type="radio" name="weekly" value="1" id="weekly-1" />
            <label for="weekly-1"></label>
          </div>
        </td>

        <td>
          <div>
            <input type="radio" name="weekly" value="0" id="weekly-0" />
            <label for="weekly-0"></label>
          </div>
        </td>

      </tr>

      <tr>
        <td>Fuse Newsletter</td>
        <td>
          <div>
            <input type="radio" name="newsletter" value="1" id="newsletter-1" />
            <label for="newsletter-1"></label>
          </div>
        </td>

        <td>
          <div>
            <input type="radio" name="newsletter" value="0" id="newsletter-0" />
            <label for="newsletter-0"></label>
          </div>
        </td>

      </tr>
    </tbody>
  </table>
</div>
</div>

</form>
