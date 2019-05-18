package com.example.area.util

import com.example.area.R
import com.example.area.data.Category
import com.example.area.data.Item

class IngredientsDataProvider {

    companion object {
        // Initialize Ingredients Data
        val ingredientsList = initIngredientList()

        private fun initIngredientList(): MutableList<Item> {
            val ingredients = mutableListOf<Item>()

            ingredients.add(
                    Item(imageId = R.drawable.ingredients,
                            title = "Macbook PRO",
                            details = "2012 Model Macbook PRO for sell!",
                            price = 1200.00,
                            category = Category.INGREDIENTS,
                            postedOn = System.currentTimeMillis()
                    )
            )

            return ingredients
        }
    }

    fun addItem(item: Item) {
        ingredientsList.add(0, item)
    }
}