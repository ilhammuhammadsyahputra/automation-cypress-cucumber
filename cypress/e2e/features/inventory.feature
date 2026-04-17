@saucedemo @inventory
Feature: Inventory Page

  Scenario: Inventory page displays all available products
    Given I am logged in as 'standard_user'
    Then I should see 6 products on the inventory page

  Scenario: User can add an item to the cart from the inventory
    Given I am logged in as 'standard_user'
    When I add 'Sauce Labs Backpack' to the cart
    Then the cart badge should show '1'

  Scenario: Unauthenticated user is redirected when accessing the inventory page
    Given I am not logged in
    When I navigate directly to the inventory page
    Then I should be redirected to the login page
    And I should see an error message 'You can only access'

  Scenario: [Bug] problem_user sees broken product images on the inventory page
    Given I am logged in as 'problem_user'
    Then product images should be visible and correctly loaded
