package com.example.area.ui.activity

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.Toast
import com.example.area.R
import com.example.area.reactionsActivity
import kotlinx.android.synthetic.main.action_meteo2_layout.*
import org.json.JSONObject

class ActionMeteo2Activity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.action_meteo2_layout)
        val actName: String = intent.getStringExtra("actionName")
        actionName.text = actName

        when (actName) {
            "weather_rain" -> switcherHint.text = "Is raining?"
            "weather_wind" -> switcherHint.text = "Is there wind?"
        }
    }

    fun nextStep (view: View) {
        if (city.text.toString() == "") {
            Toast.makeText(this, "Please fill the data", Toast.LENGTH_SHORT).show()
            return
        }
        val intent = Intent(this, reactionsActivity::class.java)

        val rootObject = JSONObject()
        rootObject.put("name", actionName.text.toString())
        rootObject.put("city", city.text.toString())
        when (actionName.text) {
            "weather_rain" -> if (isSwitch.isChecked) {
                rootObject.put("isRaining", true)
            } else {
                rootObject.put("isRaining", false)
            }
            "weather_wind" -> if (isSwitch.isChecked) {
                rootObject.put("isWind", true)
            } else {
                rootObject.put("isWind", false)
            }
        }

        intent.putExtra("actionName", actionName.text.toString())
        intent.putExtra("actionObj", rootObject.toString())
        startActivity(intent)
    }
}