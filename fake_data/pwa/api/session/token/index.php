<?php
$rand_token = openssl_random_pseudo_bytes(16);
$token = bin2hex($rand_token);
setcookie("TestCookie", "45612377");
setcookie("JSESSIONID", $token);

?>
{
  "success":true
}