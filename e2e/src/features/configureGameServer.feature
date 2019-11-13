Feature: Configure game server
  Scenario: User changes the configuration and confirms the changes
    Given I am on the detail page for the game server
    And I click on the "Edit" button
    When I fill the form with the required information
    And I click on the "Save" button
    Then the game server is reconfigured
    And I am redirected to the detail page for the game server

  Scenario: User cancels changing the configuration
    Given I am on the detail page for the game server
    And I click on the "Edit" button
    When I may or may not fill the form with the required information
    And I click the "Cancel" button
    Then the game server is not reconfigured
    And I am redirected to the detail page for the game server
