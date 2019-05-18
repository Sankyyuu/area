package com.example.area.login

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.Toast
import com.example.area.R
import com.example.area.ui.activity.HomeActivity
import com.github.kittinunf.fuel.httpPost
import kotlinx.android.synthetic.main.activity_login.*
import org.json.JSONObject

const val clientID = "438137435190-pdco6e4oj31tmus32o004ll325p4c2v0.apps.googleusercontent.com"

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
//        val toolBar = findViewById<Toolbar>(R.id.app_bar)
//        setSupportActionBar(toolBar)
//        getSupportActionBar()?.setTitle("Login")
    }

    fun setUid(data: String) {
//        println(data)
//        val klaxon = Klaxon()
//        val parsed = klaxon.parseJsonObject(StringReader(data))
//        val uid = parsed["_id"].toString()
        val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        prefs.edit().putString("uid", data).apply()
    }

    fun backToSignUp(view: View) {
        val signupActivity = Intent(this, SignUpActivity::class.java)
        startActivity(signupActivity)
    }

    fun login(view: View) {
        val email = loginEmail.text.toString()
        val password = loginPassword.text.toString()

        val rootObject = JSONObject()
        rootObject.put("email", email)
        rootObject.put("password", password)

        "https://areaserver.herokuapp.com/login".httpPost().header("Content-Type" to "application/json").body(rootObject.toString()).responseString { request, response, result ->
            //do something with response
            print("SENDED")
            result.fold({ d ->
                //do something with data
                println("RECEIVED SUCCES:" + d)
                setUid(d)
                Toast.makeText(this, "Succesfully connected", Toast.LENGTH_SHORT).show()
                startActivity(Intent(this, HomeActivity::class.java))
            }, { err ->
                //do something with error
                println("receiveed ERRRROOOR: " + err);
                Toast.makeText(this, "Invalid email or password", Toast.LENGTH_SHORT).show()
            })

        }
    }


}
