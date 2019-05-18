package com.example.area.ui.activity

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.Toast
import com.example.area.R
import com.example.area.reactionsActivity
import kotlinx.android.synthetic.main.action_meteo_layout.*
import org.json.JSONObject

class ActionMeteoActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.action_meteo_layout)
        val actName: String = intent.getStringExtra("actionName")
        actionName.text = actName
    }

    fun nextStep (view: View) {
        if (city.text.toString() == "" || temperature.text.toString() == "") {
            Toast.makeText(this, "Please fill the data", Toast.LENGTH_SHORT).show()
            return
        }
        val intent = Intent(this, reactionsActivity::class.java)

        val rootObject = JSONObject()
        rootObject.put("name", actionName.text.toString())
        rootObject.put("city", city.text.toString())
        rootObject.put("targetTemp", temperature.text.toString().toInt())
        if (isHotSwitch.isChecked) {
            rootObject.put("isHot", true)
        } else {
            rootObject.put("isHot", false)
        }

        intent.putExtra("actionName", actionName.text.toString())
        intent.putExtra("actionObj", rootObject.toString())
        startActivity(intent)
    }
}