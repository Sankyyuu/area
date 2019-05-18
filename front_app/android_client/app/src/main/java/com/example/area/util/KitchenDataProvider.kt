package com.example.area.util

import com.example.area.R
import com.example.area.data.Category
import com.example.area.data.Item

class KitchenDataProvider {

    companion object {
        // Initialize Kitchen Data
        val kitchenList = initKitchenList()

        private fun initKitchenList(): MutableList<Item> {
            val kitchen = mutableListOf<Item>()

            kitchen.add(
                    Item(imageId = R.drawable.kitchen,
                            title = "Macbook PRO",
                            details = "2012 Model Macbook PRO for sell!",
                            price = 1200.00,
                            category = Category.INGREDIENTS,
                            postedOn = System.currentTimeMillis()
                    )
            )

            return kitchen
        }
    }

    fun addItem(item: Item) {
        kitchenList.add(0, item)
    }
}