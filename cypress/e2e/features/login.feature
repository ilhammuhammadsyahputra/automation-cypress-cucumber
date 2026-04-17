@saucedemo @login
Feature: Login Page

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter username 'standard_user' and password 'secret_sauce'
    And I click the login button
    Then I should be redirected to the inventory page

  Scenario: Login fails with invalid credentials
    When I enter username 'invalid_user' and password 'wrong_password'
    And I click the login button
    Then I should see an error message 'Username and password do not match any user in this service'

  Scenario: Login fails for a locked out user
    When I enter username 'locked_out_user' and password 'secret_sauce'
    And I click the login button
    Then I should see an error message 'Sorry, this user has been locked out'
