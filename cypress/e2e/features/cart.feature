@saucedemo @cart
Feature: Cart Page

  Background:
    Given I am logged in as 'standard_user'

  Scenario: Added item is displayed correctly in the cart
    Given I have added 'Sauce Labs Backpack' to the cart
    When I navigate to the cart page
    Then I should see 'Sauce Labs Backpack' in the cart
    And the cart should contain 1 item

  Scenario: User can proceed to checkout from the cart
    Given I have added 'Sauce Labs Backpack' to the cart
    When I navigate to the cart page
    And I click 'Checkout'
    Then I should be on the checkout step one page

  Scenario: User can remove an item from the cart
    Given I have added 'Sauce Labs Backpack' to the cart
    When I navigate to the cart page
    And I remove 'Sauce Labs Backpack' from the cart
    Then the cart should be empty
    And the cart badge should not be visible
