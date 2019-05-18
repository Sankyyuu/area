package com.example.area.login

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.Toast
import com.beust.klaxon.Klaxon
import com.example.area.R
import com.example.area.ui.activity.HomeActivity
import com.github.kittinunf.fuel.httpPost
import io.oauth.OAuth
import io.oauth.OAuthCallback
import org.json.JSONObject
import java.io.StringReader


class MainActivity : AppCompatActivity() {

    var oauth = OAuth(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        val uid = prefs?.getString("uid", "")

        if (uid != "") {
            println(uid)
            startActivity(Intent(this, HomeActivity::class.java))
        }

        oauth.initialize("68_EKct8MEGwo7LWSApzFB8Pqf8")
    }

    fun setUid(data: String) {
        val klaxon = Klaxon()
        val parsed = klaxon.parseJsonObject(StringReader(data))
        val uid = parsed["_id"].toString()
        val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        prefs.edit().putString("uid", uid).apply()
    }

    fun signUpButton(view: View) {
        val signUpActivity = Intent(this, SignUpActivity::class.java)
        startActivity(signUpActivity)
    }

    fun loginButton(view: View) {
        val loginActivity = Intent(this, LoginActivity::class.java)
        startActivity(loginActivity)
    }

    fun loginGoogle(view: View) {
        oauth.popup("google", OAuthCallback { data ->
            if (data.status == "error")
            else {
                // Do API calls with data
                println(data)
            }
        })
    }

    fun loginGithub(view: View) {
        oauth.popup("github") { data ->
            if (data.status == "error")
            else {
                // Do API calls with data
                println("SUCESSSS")

                val rootObject = JSONObject()
                rootObject.put("access_token", data.token.toString())
                "https://areaserver.herokuapp.com/login/github".httpPost().header("Content-Type" to "application/json", "access_token" to data.token).body(rootObject.toString()).responseString { request, response, result ->
                    //do something with response
                    print("SENDED");
                    result.fold({ d ->
                        //do something with data
                        println("RECEIVED SUCCES:" + d)
                        setUid(d)
                        Toast.makeText(this, "Succesfully github connected", Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this, HomeActivity::class.java))
                    }, { err ->
                        //do something with error
                        println("receiveed ERRRROOOR: " + err);
                        Toast.makeText(this, "Invalid github connection", Toast.LENGTH_SHORT).show()
                    })

                }
            }
        }
    }

    fun loginTwitter(view: View) {
        oauth.popup("twitter") { data ->
            if (data.status == "error")
            else {
                // Do API calls with data
                println("SUCESSSS")

                val rootObject = JSONObject()
                rootObject.put("access_token", data.token.toString())
                "https://areaserver.herokuapp.com/login/twitter".httpPost().header("Content-Type" to "application/json", "access_token" to data.token).body(rootObject.toString()).responseString { request, response, result ->
                    //do something with response
                    print("SENDED");
                    result.fold({ d ->
                        //do something with data
                        println("RECEIVED SUCCES:" + d)
                        setUid(d)
                        Toast.makeText(this, "Succesfully twitter connected", Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this, HomeActivity::class.java))
                    }, { err ->
                        //do something with error
                        println("receiveed ERRRROOOR: " + err);
                        Toast.makeText(this, "Invalid twitter connection", Toast.LENGTH_SHORT).show()

                    })

                }
            }
        }
    }

}
