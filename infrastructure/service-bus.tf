resource "azurerm_servicebus_namespace" "ab23svbnamespace" {
  name                = "absvbnamesapce"
  location            = var.location
  resource_group_name = azurerm_resource_group.stage.name
  sku                 = "Standard"
}

resource "azurerm_servicebus_topic" "sbtopic" {
  name         = "abtopic"
  namespace_id = azurerm_servicebus_namespace.ab23svbnamespace.id
}

resource "azurerm_servicebus_subscription" "sbsub" {
  name               = "absub"
  topic_id           = azurerm_servicebus_topic.sbtopic.id
  max_delivery_count = 3
}

resource "azurerm_servicebus_topic_authorization_rule" "svbauthrization" {
  id = azurerm_servicebus_subscription_rule.sbsub.id
}

