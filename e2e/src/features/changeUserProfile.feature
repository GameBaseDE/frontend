Feature: Change user profile
    Scenario: User accesses the page via Dashboard
    Given I am on the "Dashboard" page
    When I click on my username on the top right screen
    And I click on the "Change profile" button
    Then I should be redirected to the "Change user profile" page

    Scenario: User changes the password correctly
    Given I am on the "Change user profile" page
    And My current password equals "test12345"
    And My new password should be "my_new_password"
    When I type "test12345" in the text box "Old password"
    And I type "my_new_password" in the text box "New password"
    And I type "my_new_password" in the text box "Repeat new password"
    And I click on the "Apply" button
    Then The password change should be successful

    Scenario: User clears password change form
    Given I am on the "Change user profile" page
    When I type "test12345" in the text box "Old password"
    And I type "my_new_password" in the text box "New password"
    And I type "my_new_password" in the text box "Repeat new password"
    And I clear the password change form
    Then The form should be cleared

    Scenario: User changes e-mail address
    Given I am on the "Change user profile" page
    When I type "test12345@example.de" in the text box "E-mail address"
    And I click on the "Apply" button
    Then The e-mail address should be changed successfully

    Scenario: User changes Gravatar e-mail address
    Given I am on the "Change user profile" page
    When I type "test12345@example.de" in the text box "Gravatar e-mail address"
    Then The Gravatar picture should change
    When I click on the "Apply" button
    Then The Gravatar e-mail address should be changed successfully