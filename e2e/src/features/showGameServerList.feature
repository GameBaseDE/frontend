Feature: Show game server list
  Scenario: User can see list
    Given I am on the dashboard page
    Then I can see 2 game servers
    And The game server details are collapsed

  Scenario: User can expand one of the game server details
    Given I am on the dashboard page
    And I can see 2 game servers
    And The game server details are collapsed
    When I click on a game server entry
    Then The clicked game server entry expands itself
