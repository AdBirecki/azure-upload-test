terraform {
  required_version = "1.1.7"
  //backend "azurerm" {}
  required_providers {
    azurerem = { 
        source = "hashicorp/azurerm"
        version = "=2.99.0"
    }
  }
}

provider "azurerem" {
    features {
    }
}


locals {
  prefix = azurerm_resource_group.stage.name
  short_prefix = replace(local.prefix, "-", "")
}


resource "azurerm_resource_group" "stage"{
    name = var.stage_name
    location = var.location
}
