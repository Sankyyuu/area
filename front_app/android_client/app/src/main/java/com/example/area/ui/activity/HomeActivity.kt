package com.example.area.ui.activity

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.design.widget.BottomNavigationView
import android.support.v7.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import android.view.View
import com.example.area.R
import com.example.area.data.Category
import com.example.area.data.Item
import com.example.area.login.MainActivity
import com.example.area.ui.IngredientsFragment
import com.example.area.ui.ProfileFragment
import com.example.area.ui.adapter.ItemsAdapter
import com.example.area.util.IngredientsDataProvider
import com.example.area.util.KitchenDataProvider
import com.example.area.util.ProfileDataProvider
import kotlinx.android.synthetic.main.activity_home.*

open class HomeActivity : AppCompatActivity(), ItemsAdapter.OnItemClickListener,
    BottomNavigationView.OnNavigationItemSelectedListener {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_home)

    if (savedInstanceState == null) {
      supportFragmentManager
              .beginTransaction()
              .replace(R.id.rootLayout, IngredientsFragment())
              .commit()
    }

    populateItemList(Category.INGREDIENTS)
    bottomNavigationView.setOnNavigationItemSelectedListener(this)
  }

  private fun populateItemList(category: Category) {
    val items = when (category) {
      Category.INGREDIENTS -> IngredientsDataProvider.ingredientsList
      Category.KITCHEN -> KitchenDataProvider.kitchenList
      Category.PROFILE -> ProfileDataProvider.profileList
    }
    if (items.isNotEmpty()) {
//      itemsRecyclerView.adapter = ItemsAdapter(items, this)
    }
  }

  override fun onItemClick(item: Item, itemView: View) {
    val detailsIntent = Intent(this, DetailsActivity::class.java)
    detailsIntent.putExtra(getString(R.string.bundle_extra_item), item)
    startActivity(detailsIntent)
  }

  override fun onNavigationItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
      R.id.nav_ingredients -> {
        supportFragmentManager.beginTransaction()
                .replace(R.id.rootLayout, IngredientsFragment())
                .commit()
      }
      R.id.nav_kitchen -> {
        //supportFragmentManager.beginTransaction()
         //       .replace(R.id.rootLayout, KitchenFragment())
         //       .commit()
        startActivity(Intent(this, KitchenActivity::class.java))
      }
      R.id.nav_profile -> {
        supportFragmentManager.beginTransaction()
                .replace(R.id.rootLayout, ProfileFragment())
                .commit()
      }
      else -> return false
    }
    return true
  }

  override fun onCreateOptionsMenu(menu: Menu?): Boolean {
    menuInflater.inflate(R.menu.logout_menu, menu)
    return true
  }

  override fun onMenuOpened(featureId: Int, menu: Menu?): Boolean {
    val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
    prefs?.edit()?.remove("uid")?.apply()
    startActivity(Intent(this, MainActivity::class.java))
    return super.onMenuOpened(featureId, menu)
  }

}
