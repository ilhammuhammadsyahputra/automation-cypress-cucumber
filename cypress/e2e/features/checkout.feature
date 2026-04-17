@saucedemo @checkout
Feature: Checkout Flow

  Background:
    Given I am logged in as 'standard_user'
    And I have added 'Sauce Labs Backpack' to the cart

  Scenario: Successfully fill in checkout information and proceed to step two
    Given I am on the checkout step one page
    When I enter first name 'John'
    And I enter last name 'Doe'
    And I enter postal code '12345'
    And I click Continue
    Then I should be on the checkout step two page

  Scenario: Cannot proceed to checkout when the form is empty
    Given I am on the checkout step one page
    When I click Continue
    Then I should see a checkout error 'First Name is required'

  Scenario: Order summary displays the correct item and price
    Given I have completed checkout step one with 'John' 'Doe' '12345'
    Then I should see 'Sauce Labs Backpack' in the order summary
    And the item total should show '$29.99'
    And a tax amount should be displayed

  Scenario: User can complete the order by clicking Finish
    Given I have completed checkout step one with 'John' 'Doe' '12345'
    When I click the Finish button
    Then I should be on the checkout complete page

  Scenario: [Bug] Accessing checkout step two directly results in an empty order summary
    When I navigate directly to checkout step two
    Then the cart items section should be empty or show no items

  Scenario: Order confirmation is displayed after a successful checkout
    Given I have completed a full checkout with 'John' 'Doe' '12345'
    Then I should see the 'Thank you for your order!' message
    And the Pony Express delivery image should be visible

  Scenario: Clicking Back Home returns to the inventory with an empty cart
    Given I have completed a full checkout with 'John' 'Doe' '12345'
    When I click the 'Back Home' button
    Then I should be redirected back to the inventory page
    And the cart badge should not be visible

  Scenario: [Bug] Checkout complete page is accessible without completing an order
    When I navigate directly to the checkout complete page
    Then I should see the complete page
