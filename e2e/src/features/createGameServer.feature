Feature: Create game server
  Scenario: User creates a game server
    Given I am logged in
    And I am on the dashboard page
    And I click on the "Create game server" button
    When I fill the form with the required information
    And I click on the "Create" button
    Then the game server is created
    And I am redirected to the configuration page for the game server

  Scenario: User cancels creation of a game server
    Given I am on the dashboard page
    And I click on the "Create game server" button
    When I may or may not fill the form with the required information
    And I click the "Cancel" button
    Then the game server is not created
    And I stay on the dashboard page
