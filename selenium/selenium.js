var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('opera')
    .build();

driver.manage().timeouts().implicitlyWait(5000);
	
driver.get('http://54.252.165.134/?post_type=product');

/* Checkout first product on WooCommerce */ 

driver.findElement(By.css('.first')).click();
driver.findElement(By.css('button.single_add_to_cart_button')).click();
driver.findElement(By.linkText('View cart')).click();

// Ensure Cart total is above Oxipay minimum
checkoutBelowMinimum = driver.findElement(By.css('.order-total .woocommerce-Price-amount')).getText().then(
	function(text) {
		const MINIMUM_FOR_OXIPAY = 20.00;						// Minimum checkout value allowed by Oxipay
		var checkoutS = text.toString();						// Checkout in String format
		var checkoutF = parseFloat(checkoutS.slice(1));			// Checkout in Float format

		if (checkoutF < MINIMUM_FOR_OXIPAY) {

			// Greater than one if checkout total is less that the minimum
			while ((MINIMUM_FOR_OXIPAY/checkoutF) > 1.00) {
				driver.navigate().back();
				driver.findElement(By.css('button.single_add_to_cart_button')).click();
				driver.findElement(By.linkText('View cart')).click();
				checkoutF += checkoutF;
			}
			// last run to get the cart above the minimum if not already
			if (checkoutF < MINIMUM_FOR_OXIPAY) {
				
				driver.navigate().back();
				driver.findElement(By.css('button.single_add_to_cart_button')).click();
				driver.findElement(By.linkText('View cart')).click();
			}
		}
	}
);

driver.findElement(By.linkText('Proceed to checkout')).click();


// Filling out checkout page
driver.findElement(By.id('billing_first_name')).sendKeys('Sam');
driver.findElement(By.id('billing_last_name')).sendKeys('Al-Khalfa');
driver.findElement(By.id('billing_company')).sendKeys('Certegy Ezi-Pay');

// TO-DO: Support for NZ addresses

driver.findElement(By.id('billing_address_1')).sendKeys('97 Pirie St');
driver.findElement(By.id('billing_address_2')).sendKeys('Level 6');
driver.findElement(By.id('billing_city')).sendKeys('Certegy Ezi-Pay');



driver.findElement(By.id('select2-billing_state-container')).click();
driver.findElement(By.css('.select2-search__field')).sendKeys('Queensland');
driver.findElement(By.css('.select2-search__field')).sendKeys(webdriver.Key.ENTER);


driver.findElement(By.id('billing_postcode')).sendKeys('5000');
driver.findElement(By.id('billing_phone')).sendKeys('0407229128');
driver.findElement(By.id('billing_email')).sendKeys('Sam.Al-Khalfa@certegy.com.au');
driver.findElement(By.css('.wc_payment_method.payment_method_oxipay')).click();

driver.findElement(By.id('place_order')).click();

/* Checkout on Oxipay SPA */ 
driver.findElement(By.id('identity')).clear();
driver.findElement(By.id('identity')).sendKeys('0407229128');
driver.findElement(By.id('password')).sendKeys('Password1');
driver.findElement(By.css('.btn-primary')).click();
driver.findElement(By.css('#confirm-modal-wrapper > div > div > div > div > button')).click();
driver.findElement(By.css('form-input > div:nth-child(2) > input')).click();


//driver.quit();
