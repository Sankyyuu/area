package com.example.area.util

import com.example.area.R
import com.example.area.data.Category
import com.example.area.data.Item

class ProfileDataProvider {

    companion object {
        // Initialize Profile Data
        val profileList = initProfileList()

        private fun initProfileList(): MutableList<Item> {
            val profile = mutableListOf<Item>()

            profile.add(
                    Item(imageId = R.drawable.profile,
                            title = "Macbook PRO",
                            details = "2012 Model Macbook PRO for sell!",
                            price = 1200.00,
                            category = Category.INGREDIENTS,
                            postedOn = System.currentTimeMillis()
                    )
            )

            return profile
        }
    }

    fun addItem(item: Item) {
        profileList.add(0, item)
    }
}