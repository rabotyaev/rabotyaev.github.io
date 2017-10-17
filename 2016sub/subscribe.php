<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Ivan
 * Date: 12.11.14
 * Time: 18:10
 * To change this template use File | Settings | File Templates.
 */

include 'MailChimp.php';
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
$MailChimp = new Drewm\MailChimp('95ff717d3e14f5f2e8e774ee492b8dd9-us11');
$result = $MailChimp->call('lists/subscribe', array(
    'id'                => '4787cb2793',
    'email'             => array('email'=>$_POST['email']),
    'merge_vars'        => array('FNAME'=>$_POST['name']),
    'double_optin'      => false,
    'update_existing'   => true,
    'replace_interests' => false,
    'send_welcome'      => false,
));

print json_encode($result);
        }