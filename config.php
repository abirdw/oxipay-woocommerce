<?php
define ('ENVIRONMENT', 'DEVELOPMENT');
define ('PLATFORM_NAME', 'woocommerce');
define ('CWD', basename( __DIR__ ));
define ('ABSPATH', dirname(__FILE__).'/');
define ("OXIPAY_DISPLAYNAME", "Oxipay");
define ("WAIT_URL", "processing.php");
define ('OXIPAY_CHECKOUT_URL', '/Checkout?platform=WooCommerce');
define ('TEST', true);
define ('CURRENCY', 'AUD');