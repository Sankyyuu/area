package com.example.area.ui.activity

import android.content.Context
import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Toast
import com.example.area.R
import com.github.kittinunf.fuel.httpPost
import org.json.JSONObject

class ReactionYoutubeCommentActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reaction_youtube_comment)
    }

    fun createArea (view: View) {
        val channelName = this.findViewById<EditText>(R.id.channelName)
        val comment = this.findViewById<EditText>(R.id.comment)
        val areaName = this.findViewById<EditText>(R.id.areaName)

        val actionObj = intent.getStringExtra("actionObj")

        val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        var user = prefs!!.getString("uid", "uid")
        user = user.replace("\"", "")

        val area = JSONObject()

        val rootObject = JSONObject()
        rootObject.put("name", "youtube_comment")
        rootObject.put("channelName", channelName.text.toString())
        rootObject.put("message", comment.text.toString())

        area.put("reaction", rootObject)
        area.put("action", actionObj)
        area.put("name", areaName.text.toString())
        area.put("userId", user)
        println("AREA FINAL = " + area.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}"))
        val req = area.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")

        "https://areaserver.herokuapp.com/area/create".httpPost().header("Content-Type" to "application/json").body(req).responseString { request, response, result ->
            //do something with response
            print("SENDED")
            result.fold({ d ->
                //do something with data
                println("RECEIVED SUCCES:" + d)
                Toast.makeText(this, "Area succesfully created", Toast.LENGTH_SHORT).show()
                startActivity(Intent(this, KitchenActivity::class.java))
            }, { err ->
                //do something with error
                println("receiveed ERRRROOOR: " + err);
                Toast.makeText(this, "Area creation failed", Toast.LENGTH_SHORT).show()
            })
        }
    }
}
